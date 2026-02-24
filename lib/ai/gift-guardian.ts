// Gift Guardian AI
// Pre-submission burden check for Wants/Gives posts

import { BurdenScore, GuardianResult } from '@/types';

// Keyword-based burden estimation (MVP)
// Will be replaced by Gemini 3 Flash API call in production
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

const BURDEN_RANGES: Record<string, { min: BurdenScore; max: BurdenScore }> = {
  KNOWLEDGE: { min: 1, max: 2 },
  TIME: { min: 2, max: 4 },
  SKILL: { min: 2, max: 3 },
  PHYSICAL: { min: 3, max: 5 },
};

const ALTERNATIVES: Record<string, string[]> = {
  引っ越し: ['引っ越しの荷造りのコツを教えてもらう', '荷造りチェックリストを共有してもらう'],
  家具: ['家具の選び方のアドバイスをもらう', 'おすすめの家具ショップを教えてもらう'],
  ガジェット: ['ガジェット選びの相談に乗ってもらう', 'おすすめアプリを教えてもらう'],
  DEFAULT: ['もう少し軽いバージョンで投稿してみませんか？', '短時間でできる内容に絞ってみましょう'],
};

export function checkBurden(giftType: string, title: string, description: string): GuardianResult {
  const text = `${title} ${description}`.toLowerCase();
  const range = BURDEN_RANGES[giftType] || { min: 2, max: 3 };

  // Count heavy/light keyword matches
  let heavyCount = 0;
  let lightCount = 0;
  let matchedHeavyKeyword = '';

  for (const kw of HEAVY_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) {
      heavyCount++;
      matchedHeavyKeyword = kw;
    }
  }
  for (const kw of LIGHT_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) {
      lightCount++;
    }
  }

  // Calculate burden score
  let score: number = (range.min + range.max) / 2;
  score += heavyCount * 0.8;
  score -= lightCount * 0.5;
  score = Math.max(range.min, Math.min(5, Math.round(score))) as BurdenScore;

  const burdenScore = score as BurdenScore;
  const isHeavy = burdenScore >= 4;

  // Generate reason
  let reason: string;
  if (burdenScore <= 2) {
    reason = '軽い参加で素敵なギフトです ✨';
  } else if (burdenScore === 3) {
    reason = '一般的な負担度のギフトです';
  } else {
    reason = '応じる方にとって少し負担が大きいかもしれません';
  }

  // Generate alternatives for heavy posts
  let alternatives: string[] | undefined;
  if (isHeavy) {
    alternatives = ALTERNATIVES[matchedHeavyKeyword] || ALTERNATIVES['DEFAULT'];
  }

  return {
    burden_score: burdenScore,
    reason,
    alternatives,
  };
}

// Burden score display info
export function getBurdenInfo(score: BurdenScore) {
  const info = {
    1: { label: 'とても軽い', color: '#10b981', icon: '🍃', example: 'おすすめの本を教えて' },
    2: { label: '軽い', color: '#06d6a0', icon: '🌿', example: '30分のZoom相談' },
    3: { label: 'ふつう', color: '#fbbf24', icon: '🌳', example: 'カメラの使い方レッスン' },
    4: { label: 'やや重い', color: '#f59e0b', icon: '⚠️', example: '引っ越しの荷造り手伝い' },
    5: { label: '非常に重い', color: '#ef4444', icon: '🚫', example: '最新のiPhoneが欲しい' },
  };
  return info[score];
}
