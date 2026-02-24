// ============================================================
// KiftGift v2.0 — Complete Type System
// ============================================================

// --- Enums ---
export type GiftType = 'PHYSICAL' | 'SKILL' | 'TIME' | 'KNOWLEDGE';
export type PostMode = 'GIVE' | 'WANT';
export type GiftStatus = 'OPEN' | 'MATCHED' | 'COMPLETED' | 'CANCELLED';
export type MatchStatus = 'CHATTING' | 'COMPLETED' | 'CANCELLED';
export type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'INAPPROPRIATE'
  | 'FRAUD'
  | 'DANGEROUS'
  | 'OTHER';
export type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED';
export type CircleRole = 'MEMBER' | 'ADMIN' | 'CREATOR';
export type CircleMemberStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type BurdenScore = 1 | 2 | 3 | 4 | 5;

// --- Users ---
export interface User {
  id: string;
  display_name: string;
  avatar_url?: string;
  phone?: string;
  email?: string;
  verified: boolean;
  positivity_score: number;
  give_count: number;
  receive_count: number;
  free_receives_remaining: number;
  current_circle_id?: string;
  is_premium: boolean;
  stripe_customer_id?: string;
  badges: Badge[];
  response_rate: number;
  average_rating: number;
  agreed_guidelines_at?: string;
  created_at: string;
  updated_at: string;
}

// --- Badges ---
export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  earned_at?: string;
}

// --- Gifts ---
export interface Gift {
  id: string;
  user_id: string;
  user?: User;
  circle_id?: string;
  post_type: PostMode;
  gift_type: GiftType;
  title: string;
  description: string;
  burden_score?: BurdenScore;
  is_heavy: boolean;
  ai_match_score?: number;
  ai_match_reason?: string;
  status: GiftStatus;
  physical_handoff_available: boolean;
  created_at: string;
  updated_at: string;
}

// --- Circles (輪) ---
export interface Circle {
  id: string;
  name: string;
  description: string;
  location_name: string;
  latitude?: number;
  longitude?: number;
  max_members: number;
  member_count: number;
  creator_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CircleMember {
  id: string;
  circle_id: string;
  user_id: string;
  user?: User;
  role: CircleRole;
  status: CircleMemberStatus;
  joined_at?: string;
  created_at: string;
}

// --- Matches ---
export interface Match {
  id: string;
  want_id: string;
  give_id: string;
  giver_id: string;
  receiver_id: string;
  giver?: User;
  receiver?: User;
  status: MatchStatus;
  ripple_count: number;
  completed_at?: string;
  created_at: string;
}

// --- Messages ---
export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  sender?: User;
  content: string;
  created_at: string;
}

// --- Reports ---
export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id?: string;
  reported_gift_id?: string;
  reason: ReportReason;
  comment: string;
  status: ReportStatus;
  created_at: string;
}

// --- AI Results ---
export interface GuardianResult {
  burden_score: BurdenScore;
  reason: string;
  alternatives?: string[];
}

export interface NudgeMessage {
  show: boolean;
  message: string;
  emoji: string;
  type: 'celebration' | 'nudge' | 'welcome' | 'none';
}

// --- Gratitude Stats ---
export interface GratitudeStats {
  total_gifts: number;
  total_ripples: number;
  total_stories: number;
  active_participants: number;
}

// --- Stripe ---
export interface PremiumPlan {
  id: string;
  name: string;
  price: number; // 490
  currency: 'jpy';
  features: string[];
}
