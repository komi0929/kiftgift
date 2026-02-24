// KiftGift — Gift Guardian Edge Function
// Supabase Edge Function: gift-guardian
// Uses Gemini 3 Flash for burden scoring, falls back to keyword-based

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || '';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const HEAVY_KEYWORDS = [
  '引っ越し',
  '引越し',
  '家具',
  'ガジェット',
  'iPhone',
  'パソコン',
  'PC',
  '車',
  'バイク',
  '大型',
  '高額',
  '長期',
  '毎日',
  '毎週',
];

const LIGHT_KEYWORDS = [
  'おすすめ',
  '教えて',
  'コツ',
  'アドバイス',
  '相談',
  '30分',
  '本',
  'レシピ',
  'コーヒー',
  'お話',
  'チャット',
];

interface GuardianResult {
  burden_score: number;
  reason: string;
  alternatives?: string[];
}

// Fallback: keyword-based scoring
function keywordFallback(giftType: string, title: string, description: string): GuardianResult {
  const text = `${title} ${description}`.toLowerCase();
  const ranges: Record<string, { min: number; max: number }> = {
    KNOWLEDGE: { min: 1, max: 2 },
    TIME: { min: 2, max: 4 },
    SKILL: { min: 2, max: 3 },
    PHYSICAL: { min: 3, max: 5 },
  };
  const range = ranges[giftType] || { min: 2, max: 3 };
  let heavyCount = 0;
  let lightCount = 0;
  for (const kw of HEAVY_KEYWORDS) if (text.includes(kw.toLowerCase())) heavyCount++;
  for (const kw of LIGHT_KEYWORDS) if (text.includes(kw.toLowerCase())) lightCount++;

  let score = (range.min + range.max) / 2 + heavyCount * 0.8 - lightCount * 0.5;
  score = Math.max(range.min, Math.min(5, Math.round(score)));

  const isHeavy = score >= 4;
  return {
    burden_score: score,
    reason: isHeavy
      ? '応じる方にとって少し負担が大きいかもしれません'
      : '軽い参加で素敵なギフトです ✨',
    alternatives: isHeavy
      ? ['もう少し軽いバージョンで投稿してみませんか？', '短時間でできる内容に絞ってみましょう']
      : undefined,
  };
}

serve(async (req) => {
  try {
    const { title, description, gift_type } = await req.json();

    if (!title || !gift_type) {
      return new Response(JSON.stringify({ error: 'title and gift_type required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Try Gemini first
    if (GEMINI_API_KEY) {
      try {
        const prompt = `あなたはギフトコミュニティの投稿ガイドです。
以下の投稿の「負担度」を1〜5で判定してください。
金銭的価値ではなく、応じる人にかかる時間・労力・心理的負担で判断します。

タイトル: ${title}
説明: ${description || '(なし)'}
カテゴリ: ${gift_type}

JSON形式で返してください:
{
  "burden_score": number,
  "reason": "判定理由（1文）",
  "alternatives": ["代替案1", "代替案2"] // score >= 4 の場合のみ
}`;

        const geminiRes = await fetch(GEMINI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.3,
            },
          }),
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const result = JSON.parse(text) as GuardianResult;
            result.burden_score = Math.max(1, Math.min(5, Math.round(result.burden_score)));
            return new Response(JSON.stringify(result), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
      } catch {
        // Fall through to keyword fallback
      }
    }

    // Keyword fallback
    const result = keywordFallback(gift_type, title, description || '');
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
