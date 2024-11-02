import type { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // If the file was just uploaded, ensure it has a URL
        if (doc.filename && !doc.url) {
          const generatedUrl = `${process.env.S3_HOST}/products/${doc.filename}`

          // Update the document in the database with the URL
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: { url: generatedUrl },
          })
        }
      },
    ],
  },
}
