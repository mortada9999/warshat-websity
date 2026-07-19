-- Add sort_order column to workshops table
ALTER TABLE workshops ADD COLUMN sort_order INTEGER DEFAULT 0;
