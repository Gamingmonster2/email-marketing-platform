DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    to_email TEXT NOT NULL,
    from_email TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_to_email ON messages(to_email);
