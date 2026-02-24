'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Users } from 'lucide-react';
import type { Circle } from '@/types';

const MOCK_CIRCLES: Circle[] = [
  {
    id: 'c1',
    name: '天神エリア',
    description: '天神周辺のギフトコミュニティ',
    location_name: '福岡市中央区',
    max_members: 150,
    member_count: 87,
    creator_id: 'u1',
    is_public: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'c2',
    name: '博多駅前',
    description: '博多駅エリアのご近所さん',
    location_name: '福岡市博多区',
    max_members: 150,
    member_count: 45,
    creator_id: 'u2',
    is_public: true,
    created_at: '',
    updated_at: '',
  },
];

interface CircleSelectorProps {
  currentCircleId?: string;
  onSelect?: (circle: Circle) => void;
}

export default function CircleSelector({ currentCircleId, onSelect }: CircleSelectorProps) {
  const [open, setOpen] = useState(false);
  const current = MOCK_CIRCLES.find((c) => c.id === currentCircleId) || MOCK_CIRCLES[0];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 10,
          background: '#E8F6FA',
          border: '1px solid #d0eef5',
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 600,
          color: '#1a1a1a',
          transition: 'all 0.15s',
        }}
      >
        <Users size={14} color="#4ABFDD" />
        {current.name}
        <ChevronDown
          size={12}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 4,
              width: 200,
              background: '#ffffff',
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f0f0f0',
              overflow: 'hidden',
              zIndex: 50,
            }}
          >
            {MOCK_CIRCLES.map((circle) => (
              <button
                key={circle.id}
                onClick={() => {
                  onSelect?.(circle);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  textAlign: 'left',
                  border: 'none',
                  background: circle.id === current.id ? '#E8F6FA' : 'transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#1a1a1a',
                  transition: 'background 0.15s',
                }}
              >
                <Users size={14} color="#b0b0b0" />
                <div>
                  <div style={{ fontWeight: 600 }}>{circle.name}</div>
                  <div style={{ fontSize: 11, color: '#b0b0b0' }}>{circle.member_count}人</div>
                </div>
              </button>
            ))}

            <div style={{ borderTop: '1px solid #f0f0f0' }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#4ABFDD',
                }}
              >
                <Plus size={14} />
                新しい輪を作る
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
