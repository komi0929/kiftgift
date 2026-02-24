// KiftGift v2.0 — AI Engine Tests
// Tests for Gift Guardian AI and Positivity Nudge Engine

import { describe, it, expect } from 'vitest';
import { checkBurden, getBurdenInfo } from '@/lib/ai/gift-guardian';
import { calculateNudge } from '@/lib/ai/positivity-nudge';

// ============================================================
// Gift Guardian AI Tests
// ============================================================
describe('Gift Guardian AI', () => {
  it('should rate light knowledge requests as low burden', () => {
    const result = checkBurden(
      'KNOWLEDGE',
      'おすすめの本を教えて',
      '読書が好きなので良い本があれば知りたいです',
    );
    expect(result.burden_score).toBeLessThanOrEqual(2);
    expect(result.alternatives).toBeUndefined();
  });

  it('should rate physical items higher', () => {
    const result = checkBurden('PHYSICAL', '家具をください', '引っ越し先に家具がありません');
    expect(result.burden_score).toBeGreaterThanOrEqual(4);
    expect(result.alternatives).toBeDefined();
    expect(result.alternatives!.length).toBeGreaterThan(0);
  });

  it('should provide alternatives for heavy posts', () => {
    const result = checkBurden(
      'TIME',
      '引っ越し手伝い',
      '引っ越しの荷造りを一日手伝ってほしいです',
    );
    if (result.burden_score >= 4) {
      expect(result.alternatives).toBeDefined();
    }
  });

  it('should return burden info for each score level', () => {
    for (let score = 1; score <= 5; score++) {
      const info = getBurdenInfo(score as 1 | 2 | 3 | 4 | 5);
      expect(info).toBeDefined();
      expect(info.label).toBeTruthy();
      expect(info.color).toBeTruthy();
      expect(info.icon).toBeTruthy();
    }
  });
});

// ============================================================
// Positivity Nudge Engine Tests
// ============================================================
describe('Positivity Nudge Engine', () => {
  it('should celebrate when user gives', () => {
    const result = calculateNudge({
      give_count: 5,
      receive_count: 3,
      free_receives_remaining: 0,
      is_giving: true,
    });
    expect(result.show).toBe(true);
    expect(result.emoji).toBeTruthy();
  });

  it('should show free receives message for new users', () => {
    const result = calculateNudge({
      give_count: 0,
      receive_count: 1,
      free_receives_remaining: 2,
      is_giving: false,
    });
    expect(result.show).toBe(true);
    expect(result.message).toContain('2');
  });

  it('should nudge when receives exceed gives by 3+', () => {
    const result = calculateNudge({
      give_count: 1,
      receive_count: 5,
      free_receives_remaining: 0,
      is_giving: false,
    });
    expect(result.show).toBe(true);
    expect(result.message.length).toBeGreaterThan(0);
  });

  it('should NOT nudge when balance is healthy', () => {
    const result = calculateNudge({
      give_count: 5,
      receive_count: 5,
      free_receives_remaining: 0,
      is_giving: false,
    });
    expect(result.show).toBe(false);
  });

  it('should NEVER restrict or penalize users', () => {
    // Even with extreme imbalance, only a message — never a restriction
    const result = calculateNudge({
      give_count: 0,
      receive_count: 100,
      free_receives_remaining: 0,
      is_giving: false,
    });
    expect(result.show).toBe(true);
    // No penalty field should exist
    expect((result as Record<string, unknown>)['penalty']).toBeUndefined();
    expect((result as Record<string, unknown>)['restricted']).toBeUndefined();
  });
});
