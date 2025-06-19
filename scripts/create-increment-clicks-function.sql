-- Create a function to increment clicks for an idea
CREATE OR REPLACE FUNCTION increment_clicks(idea_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE ideas 
  SET clicks = clicks + 1, updated_at = NOW()
  WHERE id = idea_id;
END;
$$ LANGUAGE plpgsql;
