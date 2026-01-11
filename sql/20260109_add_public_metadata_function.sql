-- Migration: Add public metadata fetch function
-- Author: Sofia (CTO)
-- Date: 2026-01-09
-- Purpose: Enable secure ID-based routing without exposing sensitive content

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
  AND (p.expires_at IS NULL OR p.expires_at > now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to anon (public access)
GRANT EXECUTE ON FUNCTION get_proposal_public_metadata(UUID) TO anon;

COMMENT ON FUNCTION get_proposal_public_metadata IS 
'Fetches ONLY public metadata for locked proposal view. Does NOT expose content_json or access_code.';
