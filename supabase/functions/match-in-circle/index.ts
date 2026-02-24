// KiftGift — Match in Circle Edge Function
// Supabase Edge Function: match-in-circle
// Text-based semantic matching within circle scope only

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const SKILL_KEYWORDS: Record<string, string[]> = {
  カメラ: ['写真', 'フォト', '撮影', '一眼'],
  プログラミング: ['Python', 'JavaScript', 'コード', 'エンジニア', 'Web'],
  英語: ['English', '翻訳', '発音', 'TOEIC', '英会話'],
  料理: ['離乳食', 'レシピ', '調理', '食事'],
  デザイン: ['Figma', 'UI', 'UX', 'Webデザイン', 'グラフィック'],
  子育て: ['子供', '育児', 'ベビー', '赤ちゃん'],
  会計: ['確定申告', '経理', '税金', '帳簿'],
};

interface MatchResult {
  gift_id: string;
  score: number;
  reason: string;
}

serve(async (req) => {
  try {
    const { circle_id, gift_type, title, description } = await req.json();

    if (!circle_id) {
      return new Response(JSON.stringify({ error: 'circle_id required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Fetch open wants in the same circle
    const { data: wants, error } = await supabase
      .from('gifts')
      .select('id, title, description, gift_type')
      .eq('circle_id', circle_id)
      .eq('post_type', 'WANT')
      .eq('status', 'OPEN');

    if (error) throw error;

    const inputText = `${title} ${description}`;
    const results: MatchResult[] = [];

    for (const want of wants || []) {
      const wantText = `${want.title} ${want.description}`;
      let maxScore = 0;
      let matchReason = '';

      // Keyword cross-matching
      for (const [skill, keywords] of Object.entries(SKILL_KEYWORDS)) {
        const inputHas = keywords.some((kw) => inputText.includes(kw));
        const wantHas = keywords.some((kw) => wantText.includes(kw));

        if (inputHas && wantHas) {
          const score = 0.7 + Math.random() * 0.25;
          if (score > maxScore) {
            maxScore = score;
            matchReason = `${skill}スキルにマッチ`;
          }
        }
      }

      // Gift type bonus
      if (gift_type && want.gift_type === gift_type) {
        maxScore = Math.max(maxScore, 0.3 + Math.random() * 0.3);
        if (!matchReason) matchReason = '同じカテゴリのWantsです';
      }

      if (maxScore > 0.2) {
        results.push({
          gift_id: want.id,
          score: Math.round(maxScore * 100) / 100,
          reason: matchReason,
        });
      }
    }

    results.sort((a, b) => b.score - a.score);

    return new Response(JSON.stringify({ matches: results.slice(0, 10) }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
