import { Metadata } from 'next'

declare module '@payloadcms/next/views' {
  export type Args = {
    params: {
      segments: string[]
    }
    searchParams: {
      [key: string]: string | string[]
    }
  }
}
