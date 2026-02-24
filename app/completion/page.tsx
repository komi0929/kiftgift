'use client';

import CompletionCelebration from '@/components/CompletionCelebration';

export default function CompletionPage() {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'キフトギフト — 感謝の連鎖',
          text: '感謝の連鎖が広がりました！🌊 キフトギフトで、あなたも誰かの笑顔をつくりませんか？',
          url: window.location.origin,
        })
        .catch(() => {});
    }
  };

  return <CompletionCelebration rippleCount={3} onShare={handleShare} />;
}
