import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'コミュニティガイドライン — キフトギフト',
  description: 'キフトギフトを安全に楽しむためのルール',
};

export default function GuidelinesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
