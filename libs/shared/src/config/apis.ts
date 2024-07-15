const HttpMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;

export default {
  AUTH: {
    INFO: { method: HttpMethod.GET, url: '/auth/info' },
    LOGIN: { method: HttpMethod.POST, url: '/auth/login' },
  },
  USER: {
    CREATE: { method: HttpMethod.POST, url: '/user' },
    UPDATE: (userId: string) => ({
      method: HttpMethod.PUT,
      url: `/user/${userId}`,
    }),
    DELETE: (userId: string) => ({
      method: HttpMethod.DELETE,
      url: `/user/${userId}`,
    }),
    GET_ALL: { method: HttpMethod.GET, url: '/user' },
    GET: (userId: string) => ({
      method: HttpMethod.GET,
      url: `/user/${userId}`,
    }),
  },
} as const;
