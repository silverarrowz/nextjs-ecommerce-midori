import { CollectionConfig } from 'payload/types'
import { admins } from '../../access/admins'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'

const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    read: adminsOrOrderedBy,
    create: () => true,
    update: adminsOrOrderedBy,
    delete: admins,
  },
  admin: {
    useAsTitle: 'total',
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        {
          name: 'quantity',
          type: 'number',
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'isPaid',
      type: 'checkbox',
      defaultValue: 'false',
    },
  ],
}

export default Orders
