// Positivity Nudge Engine
// No penalties, no restrictions — only gentle encouragement

import { NudgeMessage } from '@/types';

const NUDGE_MESSAGES = [
  {
    message:
      '最近たくさんのギフトを受け取りましたね！✨ 今日はあなたが誰かの力になれるかも。Wantsフィードを覗いてみませんか？',
    emoji: '🌟',
  },
  {
    message: 'あなたの経験や知識、きっと誰かの助けになります。気軽にシェアしてみませんか？',
    emoji: '💡',
  },
  {
    message: '素敵なギフトをたくさん受け取りましたね！感謝の連鎖を広げてみませんか？',
    emoji: '🌊',
  },
];

const CELEBRATION_MESSAGES = [
  {
    message: '素晴らしい！あなたのギフトが誰かの一日を明るくしました 🎉',
    emoji: '🎉',
  },
  {
    message: 'ありがとうの連鎖がまた一つ広がりました！',
    emoji: '🌊',
  },
  {
    message: '感謝の輪が広がっています。あなたの優しさに感謝！',
    emoji: '✨',
  },
];

interface NudgeInput {
  give_count: number;
  receive_count: number;
  free_receives_remaining: number;
  is_giving: boolean; // true if user just gave, false if received
}

export function calculateNudge(input: NudgeInput): NudgeMessage {
  const { give_count, receive_count, free_receives_remaining, is_giving } = input;

  // If user just gave a gift, always celebrate
  if (is_giving) {
    const msg = CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];
    return { show: true, type: 'celebration' as const, ...msg };
  }

  // New user perk: first 3 receives are free (no nudge)
  if (free_receives_remaining > 0) {
    return {
      show: true,
      type: 'welcome' as const,
      message: `受け取ることも立派なギフトです 🎁 あと${free_receives_remaining}回、安心して受け取れます！`,
      emoji: '🎁',
    };
  }

  // Only nudge when receives exceed gives by 3+
  const imbalance = receive_count - give_count;
  if (imbalance >= 3) {
    const msg = NUDGE_MESSAGES[Math.floor(Math.random() * NUDGE_MESSAGES.length)];
    return { show: true, type: 'nudge' as const, ...msg };
  }

  // Default: no nudge needed
  return { show: false, type: 'none' as const, message: '', emoji: '' };
}
