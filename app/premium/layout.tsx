import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium — キフトギフト',
  description: 'Premium プランで感謝の輪をもっと広げよう',
};

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
