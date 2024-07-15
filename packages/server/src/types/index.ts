import { Request as ExpressRequest } from 'express';

type Request = ExpressRequest & { user: { id: string } };

export type { Request };
