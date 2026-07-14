-- Warshat Websity — D1 Migration 0001
-- Run: wrangler d1 execute warshat-db --local --file=migrations/0001_create_workshops.sql

CREATE TABLE IF NOT EXISTS workshops (
  id TEXT PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  category TEXT NOT NULL CHECK(category IN ('open_activity','workshop','kids','course')),
  price INTEGER,
  image_url TEXT,
  is_active INTEGER DEFAULT 1,
  tags TEXT,
  seats INTEGER,
  branch TEXT CHECK(branch IN ('zayouna','yarmouk','both')),
  created_at TEXT DEFAULT (datetime('now'))
);
