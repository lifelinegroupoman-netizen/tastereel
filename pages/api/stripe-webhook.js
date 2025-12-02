import Stripe from 'stripe'
import { buffer } from 'micro'
import { supabase } from '../../lib/supabaseClient'

export const config = { api: { bodyParser: false } }
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)
  let event
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch(e){
    return res.status(400).send(`Webhook Error: ${e.message}`)
  }
  // Minimal handling: echo received
  console.log('Stripe event:', event.type)
  res.json({received:true})
}
