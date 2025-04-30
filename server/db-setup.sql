-- File: server/setup_db.sql
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  event_id VARCHAR(255) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  venue TEXT,
  image_url TEXT,
  classification TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_city ON events(city);
CREATE INDEX IF NOT EXISTS idx_events_genre ON events(genre);

CREATE TABLE venues (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'Ireland',
  address TEXT,
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE events 
ADD COLUMN venue_id VARCHAR(255) REFERENCES venues(id),
ADD COLUMN youtube_url VARCHAR(255),
ADD COLUMN spotify_url VARCHAR(255),
ADD COLUMN instagram_url VARCHAR(255),
ADD COLUMN twitter_url VARCHAR(255),
ADD COLUMN facebook_url VARCHAR(255);