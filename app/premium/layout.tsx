import type { Metadata } from 'next';
import AuthGuard from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: 'Premium — キフトギフト',
  description: 'Premium プランで感謝の輪をもっと広げよう',
};

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
