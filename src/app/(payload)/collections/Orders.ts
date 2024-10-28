import { CollectionConfig } from 'payload/types'

const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'text',
      defaultValue: 'paid',
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      required: true,
    },
  ],
}

export default Orders
