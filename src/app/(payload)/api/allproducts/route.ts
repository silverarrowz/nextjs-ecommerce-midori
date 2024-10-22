import { getPayload } from 'payload'
import configPromise from '@/app/(payload)/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search') || ''
  const categoryId = req.nextUrl.searchParams.get('categoryId') || ''
  const limit = req.nextUrl.searchParams.get('limit') || '6'
  const page = req.nextUrl.searchParams.get('page') || '1'

  const payload = await getPayload({ config: configPromise })

  const limitNumber = parseInt(limit as string, 10)
  const pageNumber = parseInt(page as string, 10)

  try {
    const whereQuery: any = {}

    if (search) {
      whereQuery.name = {
        contains: search,
      }
    }

    if (categoryId) {
      whereQuery.categories = {
        in: [categoryId],
      }
    }

    const products = await payload.find({
      collection: 'products',
      where: whereQuery,
      // limit: limitNumber,
      // page: pageNumber,
    })

    if (products.docs.length) {
      return NextResponse.json(products, { status: 200 })
    } else {
      return NextResponse.json({ status: 404, error: 'No products found matching the query' })
    }
  } catch (error) {
    return NextResponse.json({ status: 500, error: 'Server error' })
  }

  // try {
  //   const products = await payload.find({
  //     collection: 'products',
  //     where: {
  //       name: {
  //         contains: search,
  //       },
  //       categories: {
  //         in: [categoryId],
  //       },
  //     },
  //     limit: limitNumber,
  //   })

  //   if (products.docs.length) {
  //     return NextResponse.json(products, { status: 200 })
  //   } else {
  //     return NextResponse.json({ status: 404, error: 'No products found matching the query' })
  //   }
  // } catch (error) {
  //   return NextResponse.json({ status: 500, error: 'Server error' })
  // }
}
