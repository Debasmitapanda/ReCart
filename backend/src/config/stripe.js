// backend/src/config/stripe.js
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
}

export const stripe = new Stripe(stripeSecretKey);
