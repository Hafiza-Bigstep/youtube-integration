import EventEmitter from 'eventemitter3';

// the user has specifically logged out.
export const EVENT_LOGOUT = 'logout';
// the user no longer has a valid auth token.
export const EVENT_AUTH_TOKEN_INVALID = 'authTokenInvalid';
export const EVENT_AUTH_TOKEN = 'authToken';
export const EVENT_NAVIGATE = 'navigate-route';
const emitter = new EventEmitter();

(emitter as any).EVENT_LOGOUT = EVENT_LOGOUT;
(emitter as any).EVENT_AUTH_TOKEN = EVENT_AUTH_TOKEN;
(emitter as any).EVENT_NAVIGATE = EVENT_NAVIGATE;

export default emitter;
