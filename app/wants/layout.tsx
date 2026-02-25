import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wants — キフトギフト',
  description: '欲しいギフトを見つけて、感謝の連鎖に参加しよう',
};

export default function WantsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
