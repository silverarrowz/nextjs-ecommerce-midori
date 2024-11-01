// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

const certPath = path.join(__dirname, 'root.crt')
fs.writeFileSync(certPath, Buffer.from(process.env.MONGODB_CERT as string, 'base64'))

const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  cors: ['https://checkout.stripe.com', `${process.env.NEXT_PUBLIC_SERVER_URL}` || ''],
  collections: [Users, Media, Products, Categories, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: connectionString,
    connectOptions: {
      tls: true,
      tlsCAFile: certPath,
      authSource: process.env.DB_NAME,
    },
  }),
  sharp,
  plugins: [],
})
