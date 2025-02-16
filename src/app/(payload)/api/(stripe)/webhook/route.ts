import { getPayload } from 'payload'
import configPromise from '@/app/(payload)/payload.config'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const payload = await getPayload({ config: configPromise })
  const signature = req.headers.get('stripe-signature') as string
  let event


  try {
    const rawBody = await req.arrayBuffer()

    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      signature,
      process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
    )
  } catch (error) {
    console.error('Error occurred while constructing event', error)
    return new Response(`Webhook error: ${(error as Error).message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      await payload.update({
        collection: 'orders',
        where: {
          id: {
            equals: session.metadata!.orderId,
          },
        },
        data: {
          isPaid: true,
        },
      })
    } catch (error) {
      console.error('Error occurred while updating order', error)
      return new Response(JSON.stringify({ error: 'Failed to update order' }), { status: 500 })
    }

    try {
      await payload.update({
        collection: 'users',
        where: {
          id: { equals: session.metadata!.userId }, 
        },
        data: {
          cart: {
            items: []
          }
        }
      })
      
    } catch (error) {
      console.error('Error occurred while updating user cart', error)
      return new Response(JSON.stringify({ error: 'Failed to update user cart' }), { status: 500 })
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
}
