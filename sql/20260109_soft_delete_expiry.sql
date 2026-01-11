-- Migration: Update RPCs for Soft Delete and Expiry Logic
-- Author: Sofia (CTO) / Marcos (Backend)
-- Date: 2026-01-09
-- Purpose: Filter out ARCHIVED proposals and strictly enforce Expiry

-- 1. Update public metadata fetch (Locked View)
CREATE OR REPLACE FUNCTION get_proposal_public_metadata(p_id UUID)
RETURNS TABLE(
  id UUID,
  client_name VARCHAR(255),
  project_title VARCHAR(255),
  status VARCHAR(50),
  expires_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.client_name,
    p.project_title,
    p.status,
    p.expires_at
  FROM proposals p
  WHERE p.id = p_id 
  AND p.status != 'ARCHIVED' -- Soft Delete Check
  AND (p.expires_at IS NULL OR p.expires_at > now()); -- Expiry Check
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update full proposal fetch (Unlock Action)
CREATE OR REPLACE FUNCTION get_proposal_by_code(p_code TEXT)
RETURNS SETOF proposals AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM proposals
  WHERE access_code = p_code
  AND status != 'ARCHIVED' -- Soft Delete Check
  AND (expires_at IS NULL OR expires_at > now()); -- Expiry Check
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
