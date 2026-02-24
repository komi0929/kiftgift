'use client';

import { create } from 'zustand';
import { GRATITUDE_STATS } from '@/lib/mock-data';

interface GratitudeState {
  totalGifts: number;
  totalRipples: number;
  totalStories: number;
  activeParticipants: number;

  // Ripple animation
  showRipple: boolean;
  rippleChainCount: number;
  triggerRipple: (chainCount: number) => void;
  dismissRipple: () => void;

  // Counter increment
  incrementGifts: () => void;
}

export const useGratitudeStore = create<GratitudeState>((set) => ({
  totalGifts: GRATITUDE_STATS.total_gifts,
  totalRipples: GRATITUDE_STATS.total_ripples,
  totalStories: GRATITUDE_STATS.total_stories,
  activeParticipants: GRATITUDE_STATS.active_participants,

  showRipple: false,
  rippleChainCount: 0,

  triggerRipple: (chainCount: number) =>
    set((state) => ({
      showRipple: true,
      rippleChainCount: chainCount,
      totalGifts: state.totalGifts + 1,
      totalRipples: state.totalRipples + chainCount,
      totalStories: state.totalStories + 1,
    })),

  dismissRipple: () => set({ showRipple: false, rippleChainCount: 0 }),

  incrementGifts: () =>
    set((state) => ({
      totalGifts: state.totalGifts + 1,
      totalStories: state.totalStories + 1,
    })),
}));
