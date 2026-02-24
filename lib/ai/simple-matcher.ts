// Simple Matcher
// Text-based matching (no embeddings)

import { Gift } from '@/types';

interface SimpleMatchResult {
  want: Gift;
  score: number;
  reason: string;
}

const SKILL_KEYWORDS: Record<string, string[]> = {
  カメラ: ['写真', 'フォト', '撮影', '一眼'],
  プログラミング: ['Python', 'JavaScript', 'コード', 'エンジニア', 'Web'],
  英語: ['English', '翻訳', '発音', 'TOEIC', '英会話'],
  料理: ['離乳食', 'レシピ', '調理', '食事'],
  デザイン: ['Figma', 'UI', 'UX', 'Webデザイン', 'グラフィック'],
  子育て: ['子供', '育児', 'ベビー', '赤ちゃん'],
  会計: ['確定申告', '経理', '税金', '帳簿'],
};

export function findMatches(wants: Gift[]): SimpleMatchResult[] {
  return wants
    .map((want) => {
      // If already has an AI match score from mock data, use it
      if (want.ai_match_score) {
        return {
          want,
          score: want.ai_match_score,
          reason: want.ai_match_reason || 'あなたのスキルに近いWantsです',
        };
      }

      // Simple keyword matching
      const text = `${want.title} ${want.description}`;
      let maxScore = 0;
      let matchReason = '';

      for (const [skill, keywords] of Object.entries(SKILL_KEYWORDS)) {
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            const score = 0.5 + Math.random() * 0.4;
            if (score > maxScore) {
              maxScore = score;
              matchReason = `${skill}スキルにマッチ`;
            }
          }
        }
      }

      return {
        want,
        score: maxScore,
        reason: matchReason,
      };
    })
    .sort((a, b) => b.score - a.score);
}
