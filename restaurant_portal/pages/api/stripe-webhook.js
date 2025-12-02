import Stripe from 'stripe'
import { buffer } from 'micro'
import { supabase } from '../../lib/supabaseClient'

export const config = { api: { bodyParser: false } }
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)
  let event
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'invoice.paid' || event.type === 'customer.subscription.created') {
    const obj = event.data.object
    const customerId = obj.customer
    // update subscriptions table accordingly (server-side)
    try {
      // find subscription row and update — implement with service role key
    } catch (e) {
      console.error('Failed to update subscription in Supabase', e)
    }
  }

  res.json({ received: true })
}
