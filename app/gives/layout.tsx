import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ギフト一覧 — キフトギフト',
  description: 'みんなが贈りたいギフトの一覧。あなたの「もらいたい」を見つけよう',
};

export default function GivesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
