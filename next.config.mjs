import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.S3_HOST,
        port: '',
        pathname: `/${process.env.S3_PATHNAME}/**`,
      },
    ],
  },
}

export default withPayload(nextConfig)
