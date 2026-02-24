// KiftGift v2.0 — Supabase Realtime
// Circle-scoped gift notifications + gratitude counter updates

import { supabase } from './client';
import type { Gift } from '@/types';

type GiftCallback = (gift: Gift) => void;
type CountCallback = (count: number) => void;

/**
 * Subscribe to new gifts in a specific circle
 */
export function subscribeCircleGifts(circleId: string, onNewGift: GiftCallback) {
  const channel = supabase
    .channel(`circle-gifts-${circleId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'gifts',
        filter: `circle_id=eq.${circleId}`,
      },
      (payload) => {
        onNewGift(payload.new as Gift);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to gift status changes (OPEN→MATCHED→COMPLETED)
 */
export function subscribeGiftUpdates(giftId: string, onUpdate: (gift: Partial<Gift>) => void) {
  const channel = supabase
    .channel(`gift-${giftId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'gifts',
        filter: `id=eq.${giftId}`,
      },
      (payload) => {
        onUpdate(payload.new as Partial<Gift>);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to gratitude chain counter updates (global)
 */
export function subscribeGratitudeCounter(onUpdate: CountCallback) {
  const channel = supabase
    .channel('gratitude-counter')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'gratitude_stats',
      },
      (payload) => {
        const stats = payload.new as { total_ripples?: number };
        if (stats.total_ripples !== undefined) {
          onUpdate(stats.total_ripples);
        }
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Unsubscribe from all channels
 */
export function unsubscribeAll() {
  supabase.removeAllChannels();
}
