import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'blindai.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,
    looking_for TEXT NOT NULL,
    city TEXT NOT NULL,
    questionnaire_data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user1_id INTEGER NOT NULL,
    user2_id INTEGER NOT NULL,
    compatibility_score REAL NOT NULL,
    ai_reasoning TEXT NOT NULL,
    status TEXT DEFAULT 'proposed',
    user1_response TEXT,
    user2_response TEXT,
    date_time DATETIME,
    date_location TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    attended INTEGER NOT NULL,
    chemistry_rating INTEGER,
    would_meet_again INTEGER,
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_matches_users ON matches(user1_id, user2_id);
  CREATE INDEX IF NOT EXISTS idx_feedback_match ON feedback(match_id);
`);

export default db;
