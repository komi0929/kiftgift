// KiftGift — Mock Data

import { User, Gift, Badge, GratitudeStats } from '@/types';

// ============================================================
// Users
// ============================================================
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    display_name: 'マサキ',
    avatar_url: '',
    verified: true,
    positivity_score: 8,
    give_count: 8,
    receive_count: 3,
    free_receives_remaining: 0,
    response_rate: 0.95,
    average_rating: 4.8,
    badges: [
      {
        id: 'b1',
        name: 'First Give',
        emoji: '🌱',
        description: '最初のギフトを贈った',
        earned_at: '2026-01-15',
      },
      {
        id: 'b2',
        name: 'Ripple Maker',
        emoji: '🌊',
        description: 'ギフトが3人以上に連鎖した',
        earned_at: '2026-02-01',
      },
    ],
    agreed_guidelines_at: '2026-01-10T00:00:00Z',
    is_premium: false,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-02-24T00:00:00Z',
  },
  {
    id: 'u2',
    display_name: 'ユカリ',
    avatar_url: '',
    verified: true,
    positivity_score: 5,
    give_count: 5,
    receive_count: 4,
    free_receives_remaining: 0,
    response_rate: 0.88,
    average_rating: 4.6,
    badges: [
      {
        id: 'b1',
        name: 'First Give',
        emoji: '🌱',
        description: '最初のギフトを贈った',
        earned_at: '2026-01-20',
      },
    ],
    agreed_guidelines_at: '2026-01-18T00:00:00Z',
    is_premium: false,
    created_at: '2026-01-18T00:00:00Z',
    updated_at: '2026-02-24T00:00:00Z',
  },
  {
    id: 'u3',
    display_name: 'タツヤ',
    avatar_url: '',
    verified: true,
    positivity_score: 12,
    give_count: 12,
    receive_count: 2,
    free_receives_remaining: 0,
    response_rate: 0.92,
    average_rating: 4.9,
    badges: [
      {
        id: 'b1',
        name: 'First Give',
        emoji: '🌱',
        description: '最初のギフトを贈った',
        earned_at: '2026-01-05',
      },
      {
        id: 'b2',
        name: 'Ripple Maker',
        emoji: '🌊',
        description: 'ギフトが3人以上に連鎖した',
        earned_at: '2026-01-20',
      },
      {
        id: 'b3',
        name: 'Trusted Member',
        emoji: '⭐',
        description: 'Verified＋Give 5回以上',
        earned_at: '2026-02-01',
      },
    ],
    agreed_guidelines_at: '2026-01-01T00:00:00Z',
    is_premium: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-02-24T00:00:00Z',
  },
  {
    id: 'u4',
    display_name: 'サクラ',
    avatar_url: '',
    verified: false,
    positivity_score: 1,
    give_count: 1,
    receive_count: 2,
    free_receives_remaining: 1,
    response_rate: 0.75,
    average_rating: 4.2,
    badges: [],
    agreed_guidelines_at: '2026-02-20T00:00:00Z',
    is_premium: false,
    created_at: '2026-02-20T00:00:00Z',
    updated_at: '2026-02-24T00:00:00Z',
  },
];

// ============================================================
// Current User
// ============================================================
export const CURRENT_USER: User = MOCK_USERS[0];

// ============================================================
// Wants (v2.0: burden_score replaces estimated_value_jpy)
// ============================================================
export const MOCK_WANTS: Gift[] = [
  {
    id: 'w1',
    user_id: 'u2',
    user: MOCK_USERS[1],
    post_type: 'WANT',
    gift_type: 'SKILL',
    title: 'カメラの使い方を教えてほしい',
    description:
      '初心者向けに一眼レフの基本操作を30分ほど教えてほしいです。Zoomでも対面でも大丈夫です。',
    burden_score: 2,
    is_heavy: false,
    ai_match_score: 0.92,
    ai_match_reason: 'あなたのカメラスキルにマッチ 📸',
    physical_handoff_available: false,
    status: 'OPEN',
    created_at: '2026-02-22T10:00:00Z',
    updated_at: '2026-02-22T10:00:00Z',
  },
  {
    id: 'w2',
    user_id: 'u4',
    user: MOCK_USERS[3],
    post_type: 'WANT',
    gift_type: 'KNOWLEDGE',
    title: '離乳食のおすすめレシピが知りたい',
    description: '5ヶ月の赤ちゃんの離乳食を始めたいのですが、何から作ればいいか分かりません。',
    burden_score: 1,
    is_heavy: false,
    ai_match_score: 0.75,
    ai_match_reason: 'お料理の知識が活かせそう 🍳',
    physical_handoff_available: false,
    status: 'OPEN',
    created_at: '2026-02-21T15:30:00Z',
    updated_at: '2026-02-21T15:30:00Z',
  },
  {
    id: 'w3',
    user_id: 'u3',
    user: MOCK_USERS[2],
    post_type: 'WANT',
    gift_type: 'TIME',
    title: '確定申告の相談に乗ってほしい',
    description:
      'フリーランス1年目で確定申告のやり方がわかりません。30分くらいZoomで教えてほしいです。',
    burden_score: 3,
    is_heavy: false,
    physical_handoff_available: false,
    status: 'OPEN',
    created_at: '2026-02-20T09:00:00Z',
    updated_at: '2026-02-20T09:00:00Z',
  },
  {
    id: 'w4',
    user_id: 'u2',
    user: MOCK_USERS[1],
    post_type: 'WANT',
    gift_type: 'SKILL',
    title: '英語の発音チェックをしてほしい',
    description: 'プレゼン前に英語の発音をネイティブの方にチェックしてほしいです。15分でOK。',
    burden_score: 2,
    is_heavy: false,
    physical_handoff_available: false,
    status: 'OPEN',
    created_at: '2026-02-19T14:00:00Z',
    updated_at: '2026-02-19T14:00:00Z',
  },
  {
    id: 'w5',
    user_id: 'u4',
    user: MOCK_USERS[3],
    post_type: 'WANT',
    gift_type: 'PHYSICAL',
    title: 'サイズアウトした子供服（80cm）が欲しい',
    description: '子供の成長が早くて…もし不要な80cmのお洋服があれば嬉しいです。',
    burden_score: 3,
    is_heavy: false,
    physical_handoff_available: false,
    status: 'OPEN',
    created_at: '2026-02-18T11:00:00Z',
    updated_at: '2026-02-18T11:00:00Z',
  },
];

// ============================================================
// Gives (v2.0: burden_score replaces estimated_value_jpy)
// ============================================================
export const MOCK_GIVES: Gift[] = [
  {
    id: 'g1',
    user_id: 'u1',
    user: MOCK_USERS[0],
    post_type: 'GIVE',
    gift_type: 'SKILL',
    title: 'Webデザインの基礎講座',
    description: 'HTML/CSSの基礎を1時間で一緒にやりましょう。初心者大歓迎！',
    burden_score: 2,
    is_heavy: false,
    physical_handoff_available: false,
    status: 'OPEN',
    created_at: '2026-02-22T09:00:00Z',
    updated_at: '2026-02-22T09:00:00Z',
  },
  {
    id: 'g2',
    user_id: 'u3',
    user: MOCK_USERS[2],
    post_type: 'GIVE',
    gift_type: 'KNOWLEDGE',
    title: 'フリーランスの確定申告テンプレート',
    description: '自分が使っている確定申告のテンプレートとメモを共有します。',
    burden_score: 1,
    is_heavy: false,
    physical_handoff_available: false,
    status: 'OPEN',
    created_at: '2026-02-21T08:00:00Z',
    updated_at: '2026-02-21T08:00:00Z',
  },
  {
    id: 'g3',
    user_id: 'u1',
    user: MOCK_USERS[0],
    post_type: 'GIVE',
    gift_type: 'TIME',
    title: '引越しの荷造りアドバイス',
    description: '引越し5回経験者として、効率的な荷造りのコツを電話で教えます。',
    burden_score: 2,
    is_heavy: false,
    physical_handoff_available: false,
    status: 'COMPLETED',
    created_at: '2026-02-15T12:00:00Z',
    updated_at: '2026-02-15T12:00:00Z',
  },
  {
    id: 'g4',
    user_id: 'u2',
    user: MOCK_USERS[1],
    post_type: 'GIVE',
    gift_type: 'PHYSICAL',
    title: 'キッチン家電（トースター）',
    description: '新しいのを買ったので、まだ使えるトースターをお譲りします。',
    burden_score: 2,
    is_heavy: false,
    physical_handoff_available: false,
    status: 'OPEN',
    created_at: '2026-02-20T16:00:00Z',
    updated_at: '2026-02-20T16:00:00Z',
  },
];

// ============================================================
// Badges (v2.0: updated definitions)
// ============================================================
export const ALL_BADGES: Badge[] = [
  { id: 'b1', name: 'First Give', emoji: '🌱', description: '最初のギフトを贈った' },
  { id: 'b2', name: 'Ripple Maker', emoji: '🌊', description: 'ギフトが3人以上に連鎖した' },
  { id: 'b3', name: 'Trusted Member', emoji: '⭐', description: 'Verified＋Give 5回以上' },
  { id: 'b4', name: 'Kind Supporter', emoji: '💬', description: '応援コメント10回以上' },
];

// ============================================================
// Gratitude Stats (v2.0: no yen values)
// ============================================================
export const GRATITUDE_STATS: GratitudeStats = {
  total_gifts: 847,
  total_ripples: 2341,
  total_stories: 412,
  active_participants: 156,
};
