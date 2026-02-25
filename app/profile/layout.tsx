import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プロフィール — キフトギフト',
  description: 'あなたのプロフィールと活動履歴',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
