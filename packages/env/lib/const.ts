export const IS_DEV = process.env['CLI_CEB_DEV'] === 'true';
export const IS_PROD = !IS_DEV;
export const IS_FIREFOX = process.env['CLI_CEB_FIREFOX'] === 'true';
export const IS_CI = process.env['CEB_CI'] === 'true';
export const API_ENDPOINT = process.env['CEB_API_URL'] || 'http://localhost:3000';
export const API_SECRET_KEY = process.env['CEB_API_SECRET_KEY'];
