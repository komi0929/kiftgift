'use client';

import { motion } from 'framer-motion';
import { Users, MapPin } from 'lucide-react';
import type { Circle } from '@/types';

interface CircleCardProps {
  circle: Circle;
  index?: number;
  onJoin?: (circle: Circle) => void;
}

export default function CircleCard({ circle, index = 0, onJoin }: CircleCardProps) {
  const isFull = circle.member_count >= circle.max_members;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card"
      style={{ padding: 20, marginBottom: 12 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{circle.name}</h3>
          <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: 8 }}>
            {circle.description}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 12,
              color: '#b0b0b0',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <MapPin size={12} />
              {circle.location_name}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Users size={12} />
              {circle.member_count}/{circle.max_members}人
            </span>
          </div>
        </div>
        {onJoin && (
          <button
            onClick={() => onJoin(circle)}
            disabled={isFull}
            className={`btn ${isFull ? 'btn-ghost' : 'btn-primary'} btn-small`}
            style={{
              opacity: isFull ? 0.5 : 1,
              cursor: isFull ? 'not-allowed' : 'pointer',
              flexShrink: 0,
            }}
          >
            {isFull ? '満員' : '参加する'}
          </button>
        )}
      </div>

      {/* Member progress */}
      <div className="progress-bar" style={{ marginTop: 12 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(circle.member_count / circle.max_members) * 100}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
          className="progress-fill"
          style={{ background: isFull ? '#b0b0b0' : 'linear-gradient(90deg, #4ABFDD, #7DD3E8)' }}
        />
      </div>
    </motion.div>
  );
}
