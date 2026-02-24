// KiftGift v2.0 — Supabase Auth Helpers
// Phone Auth + guideline agreement flow

import { supabase } from './client';

/**
 * Send OTP to phone number
 */
export async function sendOTP(phone: string) {
  const { data, error } = await supabase.auth.signInWithOtp({ phone });
  if (error) throw error;
  return data;
}

/**
 * Verify OTP code
 */
export async function verifyOTP(phone: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });
  if (error) throw error;
  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get current session
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

/**
 * Record guideline agreement timestamp
 */
export async function agreeToGuidelines(userId: string) {
  const { error } = await supabase
    .from('users')
    .update({ agreed_guidelines_at: new Date().toISOString() })
    .eq('id', userId);
  if (error) throw error;
}

/**
 * Check if user has agreed to guidelines
 */
export async function hasAgreedGuidelines(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('agreed_guidelines_at')
    .eq('id', userId)
    .single();
  if (error) return false;
  return !!data?.agreed_guidelines_at;
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback: (event: string, session: unknown) => void) {
  return supabase.auth.onAuthStateChange(callback);
}
