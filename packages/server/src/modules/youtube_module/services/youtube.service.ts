import { google, youtube_v3 } from 'googleapis';
import { injectable } from 'inversify';
import { checkIfRedisKeyExists,setRedisKey } from '../../../shared/utils/helper';

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
    const cacheKey = `youtube_search:${q}:${type || ''}:${maxResults}:${pageToken || ''}`;
    
    //check if there's a cached result for this request
    const cachedResult = await checkIfRedisKeyExists(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }

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
    const { data } = await this.youtube.search.list(params);
    const result = {
      items: (data.items || []).map(item => {
        const { id, snippet } = item;
        return {
          id: id?.videoId || id?.channelId || id?.playlistId,
          title: snippet?.title,
          description: snippet?.description,
          publishedAt: snippet?.publishedAt,
          thumbnail: snippet?.thumbnails?.default?.url,
        };
      }),
      pageToken: data.nextPageToken || null,
    };

    // Cache the result for future requests
    await setRedisKey(cacheKey, JSON.stringify(result), 3600); 

    return result;
  }
}
