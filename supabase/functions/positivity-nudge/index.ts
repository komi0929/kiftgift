// KiftGift — Positivity Nudge Edge Function
// Supabase Edge Function: positivity-nudge
// Generates gentle encouragement messages on gift completion

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const NUDGE_MESSAGES = [
  '最近たくさんのギフトを受け取りましたね！✨ 今日はあなたが誰かの力になれるかも。Wantsフィードを覗いてみませんか？',
  'あなたの経験や知識、きっと誰かの助けになります。気軽にシェアしてみませんか？',
  '素敵なギフトをたくさん受け取りましたね！感謝の連鎖を広げてみませんか？',
];

const CELEBRATION_MESSAGES = [
  '素晴らしい！あなたのギフトが誰かの一日を明るくしました 🎉',
  'ありがとうの連鎖がまた一つ広がりました！ 🌊',
  '感謝の輪が広がっています。あなたの優しさに感謝！ ✨',
  'あなたのギフトがまた誰かを笑顔にしました 😊',
];

interface NudgeResult {
  show: boolean;
  message: string;
  emoji: string;
  type: 'celebration' | 'nudge' | 'welcome' | 'none';
}

serve(async (req) => {
  try {
    const { give_count, receive_count, free_receives_remaining, is_giving } = await req.json();

    let result: NudgeResult;

    // Celebration for giving
    if (is_giving) {
      const msg = CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];
      result = { show: true, message: msg, emoji: '🎉', type: 'celebration' };
    }
    // New user welcome (free receives)
    else if (free_receives_remaining > 0) {
      result = {
        show: true,
        message: `受け取ることも立派なギフトです 🎁 あと${free_receives_remaining}回、安心して受け取れます！`,
        emoji: '🎁',
        type: 'welcome',
      };
    }
    // Gentle nudge when imbalanced (receives > gives by 3+)
    else if (receive_count - give_count >= 3) {
      const msg = NUDGE_MESSAGES[Math.floor(Math.random() * NUDGE_MESSAGES.length)];
      result = { show: true, message: msg, emoji: '🌟', type: 'nudge' };
    }
    // No nudge needed
    else {
      result = { show: false, message: '', emoji: '', type: 'none' };
    }

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
