import { getPayload } from 'payload'
import configPromise from '@/app/(payload)/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  try {
    const userId = req.nextUrl.searchParams.get('userId') as string
    const data = await payload.find({
      collection: 'orders',
      where: {
        orderedBy: {
          equals: userId,
        },
      },
      depth: 2,
    })

    if (data.docs.length) {
      return NextResponse.json(data, { status: 200 })
    } else {
      return NextResponse.json({ status: 404, error: 'No orders found matching the query' })
    }
  } catch (error) {
    return NextResponse.json({ status: 500, error: (error as Error).message })
  }
}
