
// export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'fallback-secret-32-chars-1234567890abc';

export const DB_USER = process.env.DB_USER
export const DB_HOST = process.env.DB_HOST
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_PORT = process.env.DB_PORT

export const POSTGRES_USER = process.env.POSTGRES_USER
export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE

export const URL = process.env.URL

export const POSTGRES_URL = process.env.POSTGRES_URL

export const PORT = process.env.PORT || 4000;
