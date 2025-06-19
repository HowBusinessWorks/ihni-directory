-- Create the ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategories TEXT[] DEFAULT '{}',
  type VARCHAR(100) NOT NULL,
  "sourceName" VARCHAR(255) NOT NULL,
  "sourceLogo" TEXT,
  "sourceDate" DATE NOT NULL,
  "sourceLink" TEXT,
  "startTime" VARCHAR(20),
  "endTime" VARCHAR(20),
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_ideas_category ON ideas(category);

-- Create an index on type for faster filtering
CREATE INDEX IF NOT EXISTS idx_ideas_type ON ideas(type);

-- Create an index on sourceDate for faster sorting
CREATE INDEX IF NOT EXISTS idx_ideas_source_date ON ideas("sourceDate");

-- Create an index on clicks for faster sorting
CREATE INDEX IF NOT EXISTS idx_ideas_clicks ON ideas(clicks);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_ideas_updated_at ON ideas;
CREATE TRIGGER update_ideas_updated_at
    BEFORE UPDATE ON ideas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
