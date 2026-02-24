'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { NudgeMessage } from '@/types';

interface PositivityNudgeProps {
  nudge: NudgeMessage | null;
  onDismiss?: () => void;
}

export default function PositivityNudge({ nudge, onDismiss }: PositivityNudgeProps) {
  if (!nudge || !nudge.show) return null;

  const bgMap: Record<string, string> = {
    celebration: '#E8F9ED',
    nudge: '#E8F6FA',
    welcome: '#FFF9E0',
  };

  const borderMap: Record<string, string> = {
    celebration: '#D0F0D8',
    nudge: '#d0eef5',
    welcome: '#F0E8A0',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        className="card"
        style={{
          padding: '12px 14px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: bgMap[nudge.type] || bgMap.nudge,
          borderColor: borderMap[nudge.type] || borderMap.nudge,
        }}
      >
        <span style={{ fontSize: 24, flexShrink: 0 }}>{nudge.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: '#1a1a1a', lineHeight: 1.5 }}>{nudge.message}</div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              color: '#b0b0b0',
              padding: 4,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
