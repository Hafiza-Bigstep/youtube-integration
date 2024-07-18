import 'reflect-metadata';
import { YoutubeService } from '../services/youtube.service';
import { google, youtube_v3 } from 'googleapis';

// Mock the google.youtube API
jest.mock('googleapis', () => {
  const mSearch = {
   search: {
    list: jest.fn()
   },
  };
  return {
    google: {
      youtube: jest.fn(() => mSearch),
    },
  };
});

describe('YoutubeService', () => {
  let youtubeService: YoutubeService;
  let mockYoutube: jest.Mocked<youtube_v3.Youtube>;

  beforeEach(() => {
    youtubeService = new YoutubeService();
    mockYoutube = google.youtube({ version: 'v3' }) as jest.Mocked<youtube_v3.Youtube>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return search results on success', async () => {
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

    // Type assertion to mock the response
    (mockYoutube.search.list as jest.Mock).mockResolvedValue(mockResponse);

    const req = {
      query: {
        searchTerm: 'test',
        maxResults: '5',
      },
    } as any;

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
  });
});
