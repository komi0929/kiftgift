'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { getBurdenInfo } from '@/lib/ai/gift-guardian';
import type { GuardianResult } from '@/types';

interface GuardianFeedbackProps {
  result: GuardianResult | null;
}

export default function GuardianFeedback({ result }: GuardianFeedbackProps) {
  if (!result) return null;

  const info = getBurdenInfo(result.burden_score);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="card"
      style={{
        padding: '14px 16px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        borderColor: `${info.color}40`,
      }}
    >
      <Shield size={16} color={info.color} style={{ flexShrink: 0, marginTop: 2 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: '#b0b0b0', marginBottom: 4 }}>
          Gift Guardian チェック
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: info.color, marginBottom: 4 }}>
          {info.icon} 負担度: {info.label}
        </div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: result.alternatives ? 8 : 0 }}>
          {result.reason}
        </div>

        {result.alternatives && (
          <div
            style={{
              padding: '8px 10px',
              borderRadius: 8,
              background: '#FFF9E0',
              border: '1px solid #F0E8A0',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: '#D4B82A', marginBottom: 6 }}>
              💡 もっと軽いバージョンはどうですか？
            </div>
            {result.alternatives.map((alt, i) => (
              <div key={i} style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>
                • {alt}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
