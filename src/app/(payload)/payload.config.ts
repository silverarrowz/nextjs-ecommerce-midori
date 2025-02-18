// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import {postgresAdapter} from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import fs from 'fs'
import { buildConfig } from 'payload/config'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Products from './collections/Products'
import Categories from './collections/Categories'
import Orders from './collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
// const isProd = process.env.NODE_ENV === 'production'

// const certPath = isProd ? '/tmp/root.crt' : path.join(__dirname, 'root.crt')
// fs.writeFileSync(certPath, Buffer.from(process.env.MONGODB_CERT as string, 'base64'))

// const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  cors: ['https://checkout.stripe.com', `${process.env.NEXT_PUBLIC_SERVER_URL}` || ''],
  csrf: ['https://checkout.stripe.com', process.env.NEXT_PUBLIC_SERVER_URL || ''],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [Users, Media, Products, Categories, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DB_CONNECTION_STRING_POOLER,
    }
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        ['media']: {
          prefix: 'products',
          generateFileURL: (args: any) => {
            return `https://${process.env.S3_HOST}/${process.env.S3_PATHNAME}/${args.prefix}/${args.filename}`
          },
          disableLocalStorage: true,
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
        endpoint: process.env.S3_ENDPOINT!,
      },
      disableLocalStorage: true,
    }),
  ],
})
