import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CartItems, Product } from '../../../payload-types'
import { getPayload } from 'payload'
import configPromise from '@/app/(payload)/payload.config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const { cartItems }: { cartItems: CartItems } = await req.json()

  try {
    const items = cartItems?.map((item) => ({
      product: (item.product as Product).id,
      quantity: item.quantity as number,
    }))

    const total = cartItems!.reduce(
      (acc, item) => acc + (item.product as Product).price * item.quantity!,
      0,
    )

    const lineItems = cartItems?.map((item) => ({
      price_data: {
        currency: 'rub',
        product_data: {
          name: (item.product as Product).name,
        },
        unit_amount: (item.product as Product).price * 100,
      },
      quantity: item.quantity as number,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    })

    await payload.create({
      collection: 'orders',
      data: {
        total,
        isPaid: false,
        items,
        stripeSessionId: session.id,
      },
    })

    return NextResponse.json({ id: session.id }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Error creating checkout session' },
      { status: 500 },
    )
  }
}
