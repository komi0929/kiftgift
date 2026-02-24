'use client';

interface CultureMessageProps {
  variant?: 'receive' | 'give' | 'general';
  compact?: boolean;
}

const MESSAGES = {
  receive: {
    text: '受け取ることも立派なギフトです',
    sub: '相手の「贈りたい気持ち」を受け止めてあげてください。お返しの義務はありません。',
  },
  give: {
    text: 'お返しは完全に自由です',
    sub: '見返りを求めないことが、このコミュニティの約束です。金銭的価値の評価は一切行いません。',
  },
  general: {
    text: '感謝の連鎖をつなげよう',
    sub: 'あなたの小さなギフトが、誰かの大きな一歩になります',
  },
};

export default function CultureMessage({
  variant = 'general',
  compact = false,
}: CultureMessageProps) {
  const msg = MESSAGES[variant];

  if (compact) {
    return (
      <div
        style={{ fontSize: 12, color: '#4ABFDD', display: 'flex', alignItems: 'center', gap: 4 }}
      >
        💎 {msg.text}
      </div>
    );
  }

  return (
    <div
      className="card"
      style={{
        padding: '14px 16px',
        background: '#FFF9E0',
        borderColor: '#F0E8A0',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{msg.text}</div>
      <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{msg.sub}</div>
    </div>
  );
}
