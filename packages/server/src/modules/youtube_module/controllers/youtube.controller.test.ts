import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from '../services/youtube.service';

describe('YoutubeController', () => {
  let youtubeService: YoutubeService;
  let youtubeController: YoutubeController;

  beforeEach(() => {
    youtubeService = {
      searchVideos: jest.fn(),
    } as unknown as YoutubeService;
    youtubeController = new YoutubeController(youtubeService);
  });

  describe('Function: search', () => {
    it('should return search results on success', async () => {
      const mockReq = {
        query: {
          searchTerm: 'test',
          maxResults: 5,
        },
      } as unknown as Request;

      const mockRes = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockNext = jest.fn() as NextFunction;

      const mockResult = {
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
      };

      (youtubeService.searchVideos as jest.Mock).mockResolvedValue(mockResult);

      await youtubeController.search(mockReq, mockRes, mockNext);

      expect(mockRes.send).toHaveBeenCalledWith(mockResult);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });
});
