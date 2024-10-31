import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CartItems, Media, Product, User } from '../../../payload-types'
import { getPayload } from 'payload'
import configPromise from '@/app/(payload)/payload.config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const { cartItems, user }: { cartItems: CartItems; user: User } = await req.json()

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

    const order = await payload.create({
      collection: 'orders',
      data: {
        total,
        isPaid: false,
        orderedBy: user.id,
        items,
      },
    })

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        orders: [
          ...(user.orders?.map((order) => (typeof order === 'string' ? order : order.id)) || []),
          order.id as string,
        ],
      },
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      metadata: {
        orderId: order.id,
        userId: user.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    })

    return NextResponse.json({ id: session.id }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Error creating checkout session' },
      { status: 500 },
    )
  }
}
