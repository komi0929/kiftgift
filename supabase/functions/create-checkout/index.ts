// KiftGift — Stripe Checkout Edge Function
// Supabase Edge Function: create-checkout
// Creates a Stripe Checkout session for ¥490/month Premium

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || '';
const STRIPE_PRICE_ID = Deno.env.get('STRIPE_PRICE_ID') || ''; // ¥490/month price
const APP_URL = Deno.env.get('APP_URL') || 'http://localhost:3000';

serve(async (req) => {
  try {
    const { user_id, email } = await req.json();

    if (!user_id) {
      return new Response(JSON.stringify({ error: 'user_id required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create Stripe Checkout session
    const params = new URLSearchParams();
    params.append('mode', 'subscription');
    params.append('success_url', `${APP_URL}/premium?success=true`);
    params.append('cancel_url', `${APP_URL}/premium?cancelled=true`);
    params.append('line_items[0][price]', STRIPE_PRICE_ID);
    params.append('line_items[0][quantity]', '1');
    params.append('metadata[user_id]', user_id);
    if (email) params.append('customer_email', email);

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: errorData.error?.message || 'Stripe error' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const session = await response.json();

    return new Response(JSON.stringify({ url: session.url, session_id: session.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
