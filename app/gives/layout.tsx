import type { Metadata } from 'next';
import AuthGuard from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: 'ギフト一覧 — キフトギフト',
  description: 'みんなが贈りたいギフトの一覧。あなたの「もらいたい」を見つけよう',
};

export default function GivesLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
