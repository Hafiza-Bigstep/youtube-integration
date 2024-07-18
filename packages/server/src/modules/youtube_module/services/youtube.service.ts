import { google, youtube_v3 } from 'googleapis';
import { injectable } from 'inversify';

@injectable()
export class YoutubeService {
  private youtube;

  constructor() {
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });
  }

  async searchVideos(req) {
    const { searchTerm: q, type, maxResults, pageToken } = req.query;
    const params: youtube_v3.Params$Resource$Search$List = {
      part: ['id', 'snippet'],
      q,
      maxResults,
    };

    if (type) {
      params.type = [type];
    } else if (pageToken) {
      params.pageToken = pageToken;
    }
    const response = await this.youtube.search.list(params);
    const items = response.data.items.map(item => ({
      id: item?.id?.videoId || item?.id?.channelId || item?.id?.playlistId,
      title: item?.snippet?.title,
      description: item?.snippet?.description,
      publishedAt: item?.snippet?.publishedAt,
      thumbnail: item?.snippet?.thumbnails?.default?.url,
    }));
    return {
      items,
      pageToken: response?.data?.nextPageToken,
    };
  }
}
