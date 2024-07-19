import 'reflect-metadata';
import { YoutubeService } from '../services/youtube.service';
import { google, youtube_v3 } from 'googleapis';
import {
  checkIfRedisKeyExists,
  setRedisKey,
} from '../../../shared/utils/helper';

// Mock the google.youtube API
jest.mock('googleapis', () => {
  const mSearch = {
    list: jest.fn(),
  };
  return {
    google: {
      youtube: jest.fn(() => ({
        search: mSearch,
      })),
    },
  };
});

describe('YoutubeService', () => {
  let youtubeService: YoutubeService;
  let mockYoutube: jest.Mocked<youtube_v3.Youtube>;

  beforeAll(() => {
    youtubeService = new YoutubeService();
    // Initialize mockYoutube after creating the YoutubeService instance
    mockYoutube = google.youtube({
      version: 'v3',
    }) as jest.Mocked<youtube_v3.Youtube>;
    (checkIfRedisKeyExists as jest.Mock) = jest.fn();
    (setRedisKey as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return cached result if available', async () => {
    const req = {
      query: { searchTerm: 'test', type: '', maxResults: '10', pageToken: '' },
    } as any;
    const cacheKey = `youtube_search:test::10:`;
    const cachedResult = {
      items: [
        {
          id: '1',
          title: 'Test Video',
          description: 'This is a test video.',
          publishedAt: '2023-07-19',
          thumbnail: 'http://example.com/thumbnail.jpg',
        },
      ],
      pageToken: 'pageToken',
    };

    (checkIfRedisKeyExists as jest.Mock).mockResolvedValue(
      JSON.stringify(cachedResult)
    );
    const result = await youtubeService.searchVideos(req);
    mockYoutube = google.youtube({
      version: 'v3',
    }) as jest.Mocked<youtube_v3.Youtube>;

    expect(checkIfRedisKeyExists).toHaveBeenCalledWith(cacheKey);
    expect(result).toEqual(cachedResult);
    expect(mockYoutube.search.list).not.toHaveBeenCalledWith();
  });

  it('should fetch and cache result if not cached', async () => {
    // Mock successful API response
    const mockResponse = {
      data: {
        items: [
          {
            id: { videoId: '1' },
            snippet: {
              title: 'Test Video',
              description: 'This is a test video.',
              publishedAt: '2023-07-19',
              thumbnails: {
                default: { url: 'http://example.com/thumbnail.jpg' },
              },
            },
          },
        ],
        nextPageToken: 'nextPageToken',
      },
    };

    // Mock the response for search.list
    (mockYoutube.search.list as jest.Mock).mockResolvedValue(mockResponse);

    const req = {
      query: {
        searchTerm: 'test',
        maxResults: '5',
      },
    } as any;

    const cacheKey = `youtube_search:test::5:`;

    // Mock Redis cache miss
    (checkIfRedisKeyExists as jest.Mock).mockResolvedValue(null);

    const result = await youtubeService.searchVideos(req);

    expect(result).toEqual({
      items: [
        {
          id: '1',
          title: 'Test Video',
          description: 'This is a test video.',
          publishedAt: '2023-07-19',
          thumbnail: 'http://example.com/thumbnail.jpg',
        },
      ],
      pageToken: 'nextPageToken',
    });

    expect(mockYoutube.search.list).toHaveBeenCalledWith({
      part: ['id', 'snippet'],
      q: 'test',
      maxResults: '5',
    });

    // Check that the result was cached
    expect(setRedisKey).toHaveBeenCalledWith(
      cacheKey,
      JSON.stringify(result),
      3600
    );
  });
});
