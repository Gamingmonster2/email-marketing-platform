DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    telegram_id TEXT PRIMARY KEY,
    secret_token TEXT UNIQUE NOT NULL,
    created_at INTEGER NOT NULL
);
