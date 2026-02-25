import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー — キフトギフト',
  description: 'キフトギフトのプライバシーポリシー',
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
