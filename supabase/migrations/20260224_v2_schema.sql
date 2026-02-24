-- ============================================================
-- KiftGift v2.0 — Full PostgreSQL Schema
-- Migration: 20260224_v2_schema
-- Removes ALL yen-related columns, adds circles, T&S, Premium
-- ============================================================

-- ============================================================
-- Circles (輪) — Local community groups (max 150 members)
-- ============================================================
CREATE TABLE IF NOT EXISTS circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  location_name TEXT DEFAULT '',
  latitude REAL,
  longitude REAL,
  max_members INTEGER DEFAULT 150,
  member_count INTEGER DEFAULT 0,
  creator_id UUID, -- FK added after users table
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT UNIQUE,
  email TEXT UNIQUE,
  verified BOOLEAN DEFAULT FALSE,
  positivity_score INTEGER DEFAULT 0,
  give_count INTEGER DEFAULT 0,
  receive_count INTEGER DEFAULT 0,
  free_receives_remaining INTEGER DEFAULT 3,
  current_circle_id UUID REFERENCES circles(id) ON DELETE SET NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  badges TEXT[] DEFAULT '{}',
  response_rate REAL DEFAULT 1.0,
  average_rating REAL DEFAULT 5.0,
  agreed_guidelines_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add FK for circles.creator_id now that users exists
ALTER TABLE circles ADD CONSTRAINT fk_circles_creator
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL;

-- ============================================================
-- Circle Members (join requests + membership)
-- ============================================================
CREATE TABLE IF NOT EXISTS circle_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID REFERENCES circles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'MEMBER' CHECK (role IN ('MEMBER', 'ADMIN', 'CREATOR')),
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (circle_id, user_id)
);

-- ============================================================
-- Gifts (Wants & Gives)
-- ============================================================
CREATE TABLE IF NOT EXISTS gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  circle_id UUID REFERENCES circles(id) ON DELETE SET NULL,
  post_type TEXT NOT NULL CHECK (post_type IN ('WANT', 'GIVE')),
  gift_type TEXT NOT NULL CHECK (gift_type IN ('PHYSICAL', 'SKILL', 'TIME', 'KNOWLEDGE')),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  -- Gift Guardian AI results
  burden_score INTEGER CHECK (burden_score BETWEEN 1 AND 5),
  is_heavy BOOLEAN DEFAULT FALSE,
  -- Matching
  ai_match_score REAL,
  ai_match_reason TEXT,
  -- Status
  status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'MATCHED', 'COMPLETED', 'CANCELLED')),
  -- Physical gift flag (MVP: always false)
  physical_handoff_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Matches (1-to-1 chat pairing)
-- ============================================================
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  want_id UUID REFERENCES gifts(id),
  give_id UUID REFERENCES gifts(id),
  giver_id UUID REFERENCES users(id),
  receiver_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'CHATTING' CHECK (status IN ('CHATTING', 'COMPLETED', 'CANCELLED')),
  ripple_count INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Messages (in-match chat)
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Gratitude Stats (singleton counter — no yen values)
-- ============================================================
CREATE TABLE IF NOT EXISTS gratitude_stats (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  total_gifts INTEGER DEFAULT 0,
  total_ripples INTEGER DEFAULT 0,
  total_stories INTEGER DEFAULT 0,
  active_participants INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO gratitude_stats (id, total_gifts, total_ripples, total_stories, active_participants)
VALUES (1, 0, 0, 0, 0)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Reports (Trust & Safety)
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id),
  reported_user_id UUID REFERENCES users(id),
  reported_gift_id UUID REFERENCES gifts(id),
  reason TEXT NOT NULL CHECK (reason IN (
    'SPAM', 'HARASSMENT', 'INAPPROPRIATE', 'FRAUD', 'DANGEROUS', 'OTHER'
  )),
  comment TEXT DEFAULT '',
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'REVIEWED', 'RESOLVED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Blocks & Mutes
-- ============================================================
CREATE TABLE IF NOT EXISTS blocks (
  blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blocked_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (blocker_id, blocked_id)
);

CREATE TABLE IF NOT EXISTS mutes (
  muter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  muted_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (muter_id, muted_id)
);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gratitude_stats ENABLE ROW LEVEL SECURITY;

-- Users
CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Gifts
CREATE POLICY "Gifts are publicly readable"
  ON gifts FOR SELECT USING (true);
CREATE POLICY "Users can insert own gifts"
  ON gifts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own gifts"
  ON gifts FOR UPDATE USING (auth.uid() = user_id);

-- Matches
CREATE POLICY "Match participants can read"
  ON matches FOR SELECT USING (
    auth.uid() = giver_id OR auth.uid() = receiver_id
  );
CREATE POLICY "Users can insert matches"
  ON matches FOR INSERT WITH CHECK (
    auth.uid() = giver_id OR auth.uid() = receiver_id
  );
CREATE POLICY "Match participants can update"
  ON matches FOR UPDATE USING (
    auth.uid() = giver_id OR auth.uid() = receiver_id
  );

-- Messages
CREATE POLICY "Message participants can read"
  ON messages FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = messages.match_id
      AND (matches.giver_id = auth.uid() OR matches.receiver_id = auth.uid())
    )
  );
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Reports
CREATE POLICY "Users can create reports"
  ON reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Users can read own reports"
  ON reports FOR SELECT USING (auth.uid() = reporter_id);

-- Blocks
CREATE POLICY "Users can manage own blocks"
  ON blocks FOR ALL USING (auth.uid() = blocker_id);

-- Mutes
CREATE POLICY "Users can manage own mutes"
  ON mutes FOR ALL USING (auth.uid() = muter_id);

-- Circles
CREATE POLICY "Circles are publicly readable"
  ON circles FOR SELECT USING (true);
CREATE POLICY "Users can create circles"
  ON circles FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Circle creator can update"
  ON circles FOR UPDATE USING (auth.uid() = creator_id);

-- Circle Members
CREATE POLICY "Circle members are readable"
  ON circle_members FOR SELECT USING (true);
CREATE POLICY "Users can request to join"
  ON circle_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Gratitude Stats
CREATE POLICY "Stats are publicly readable"
  ON gratitude_stats FOR SELECT USING (true);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX idx_gifts_circle ON gifts(circle_id);
CREATE INDEX idx_gifts_user ON gifts(user_id);
CREATE INDEX idx_gifts_status ON gifts(status);
CREATE INDEX idx_gifts_type ON gifts(gift_type);
CREATE INDEX idx_circle_members_circle ON circle_members(circle_id);
CREATE INDEX idx_circle_members_user ON circle_members(user_id);
CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_matches_giver ON matches(giver_id);
CREATE INDEX idx_matches_receiver ON matches(receiver_id);
