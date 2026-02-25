'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { sendOTP, verifyOTP } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formatPhone = (raw: string) => {
    // Convert Japanese format 090-xxxx-xxxx → +8190xxxxxxxx
    const digits = raw.replace(/[^0-9]/g, '');
    if (digits.startsWith('0')) {
      return '+81' + digits.slice(1);
    }
    if (digits.startsWith('81')) {
      return '+' + digits;
    }
    return '+' + digits;
  };

  const handleSendOTP = async () => {
    if (!phone.trim()) {
      setError('電話番号を入力してください');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendOTP(formatPhone(phone));
      setStep('otp');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'エラーが発生しました';
      if (msg.includes('Phone logins are disabled')) {
        setError(
          '電話番号認証はまだ有効化されていません。Supabase Dashboard → Auth → Providers → Phone で有効化してください。',
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('6桁のコードを入力してください');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await verifyOTP(formatPhone(phone), otp);
      if (result.user) {
        // Ensure user record exists in users table
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', result.user.id)
          .single();

        if (!existingUser) {
          await supabase.from('users').insert({
            id: result.user.id,
            display_name: '新しいユーザー',
            phone: result.user.phone,
          });
        }
        router.replace('/wants');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '認証に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}
      >
        {/* Logo */}
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎁</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>キフトギフト</h1>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 32 }}>感謝の連鎖を、あなたから</p>

        {step === 'phone' ? (
          <motion.div key="phone" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 8,
                textAlign: 'left',
              }}
            >
              電話番号
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="090-1234-5678"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: 16,
                border: '1px solid #e0e0e0',
                borderRadius: 12,
                outline: 'none',
                marginBottom: 16,
                textAlign: 'center',
                letterSpacing: 1,
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: 14,
                fontSize: 15,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? '送信中...' : '認証コードを送信'}
            </button>
          </motion.div>
        ) : (
          <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
              <strong>{phone}</strong> に送信された6桁のコードを入力
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="000000"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: 24,
                border: '1px solid #e0e0e0',
                borderRadius: 12,
                outline: 'none',
                marginBottom: 16,
                textAlign: 'center',
                letterSpacing: 8,
                fontWeight: 700,
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleVerifyOTP()}
              autoFocus
            />
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: 14,
                fontSize: 15,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'wait' : 'pointer',
                marginBottom: 12,
              }}
            >
              {loading ? '確認中...' : 'ログイン'}
            </button>
            <button
              onClick={() => {
                setStep('phone');
                setOtp('');
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              電話番号を変更する
            </button>
          </motion.div>
        )}

        {error && (
          <div
            style={{
              marginTop: 16,
              padding: '10px 16px',
              borderRadius: 10,
              background: '#FFF0F0',
              color: '#cc0000',
              fontSize: 12,
              textAlign: 'left',
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}

        <p style={{ fontSize: 11, color: '#b0b0b0', marginTop: 32, lineHeight: 1.6 }}>
          ログインすることで、
          <a href="/guidelines" style={{ color: '#4ABFDD' }}>
            利用規約
          </a>
          と
          <a href="/privacy" style={{ color: '#4ABFDD' }}>
            プライバシーポリシー
          </a>
          に同意したものとみなされます。
        </p>
      </motion.div>
    </div>
  );
}
