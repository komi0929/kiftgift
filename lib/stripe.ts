// KiftGift v2.0 — Stripe Integration
// Checkout redirect + subscription helpers

import { supabase } from '@/lib/supabase/client';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

/**
 * Create a Stripe Checkout session via Edge Function and redirect
 */
export async function redirectToCheckout(userId: string, email?: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token || '';

  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: userId, email }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Checkout failed');
  }

  const { url } = await res.json();
  if (url) {
    window.location.href = url;
  }
}

/**
 * Check premium status from user profile
 */
export async function checkPremiumStatus(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('is_premium')
    .eq('id', userId)
    .single();

  if (error) return false;
  return data?.is_premium ?? false;
}

/**
 * Premium plan details
 */
export const PREMIUM_PLAN = {
  id: 'premium-monthly',
  name: 'キフトギフト Premium',
  price: 490,
  currency: 'jpy' as const,
  features: [
    '輪（サークル）を無制限に作成',
    'AIマッチングの優先表示',
    '詳細な感謝統計レポート',
    'プレミアムバッジの表示',
    '限定コミュニティへのアクセス',
  ],
};
