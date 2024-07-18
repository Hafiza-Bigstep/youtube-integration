import { check, query } from 'express-validator';

const searchQueryValidation = [
  query('searchTerm')
    .exists()
    .isString()
    .withMessage('Search query is required.'),
  query('type')
    .optional()
    .isIn(['channel', 'video', 'playlist'])
    .withMessage('Invalid Type: Must be one of: channel, video, playlist'),
  query('maxResults')
    .optional()
    .isNumeric()
    .isInt({ min: 0, max: 50 })
    .default(10)
    .withMessage('MaxResult must be between 0 to 50'),
  query('pageToken').optional().isString(),
];

export { searchQueryValidation };
