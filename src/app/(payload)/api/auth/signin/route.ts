import { getPayload } from 'payload'
import configPromise from '@/app/(payload)/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (data) {
      return NextResponse.json(data, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Login failed' }, { status: 500 })
  }
}
