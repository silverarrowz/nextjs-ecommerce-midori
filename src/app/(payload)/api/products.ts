// import { getPayload } from 'payload'
// import configPromise from '@/app/(payload)/payload.config'
// import { NextRequest, NextResponse } from 'next/server'
// import { ParsedUrlQuery } from 'querystring'
// import { NextApiRequest, NextApiResponse } from 'next'

// // interface ProductsQuery extends ParsedUrlQuery {
// //     search?: string;
// //     limit?: string;
// //     page?: string;
// //   }

// export default async function handler(req: NextRequest) {
//   const search = req.nextUrl.searchParams.get('search')
//   const limit = req.nextUrl.searchParams.get('limit')
//   const page = req.nextUrl.searchParams.get('page')

//   const payload = await getPayload({ config: configPromise })

//   const limitNumber = parseInt(limit as string, 10)
//   const pageNumber = parseInt(page as string, 10)
//   try {
//     const products = await payload.find({
//       collection: 'products',
//       where: {
//         name: {
//           contains: search,
//         },
//       },
//       limit: limitNumber,
//     })

//     if (products.docs.length) {
//       return NextResponse.json(products, { status: 200 })
//     } else {
//       return NextResponse.json({ status: 404, error: 'No products found matching the query' })
//     }
//   } catch (error) {
//     return NextResponse.json({ status: 500, error: 'Server error' })
//   }
// }
