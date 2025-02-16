import type { CollectionConfig } from 'payload/types'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { admins } from '../../access/admins'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: adminsAndUser,
    update: adminsAndUser,
    delete: adminsAndUser,
    admin: ({ req: { user } }) => checkRole(['admin'], user!),
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'Покупатель',
          value: 'customer',
        },
        {
          label: 'Администратор',
          value: 'admin',
        },
      ],
      access: {
        read: ({ req: { user } }) => checkRole(['admin'], user!),
        create: ({ req: { user } }) => checkRole(['admin'], user!),
        update: ({ req: { user } }) => checkRole(['admin'], user!),
      },
    },
    {
      label: 'Cart',
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
        },
      ],
    },
    {
      label: 'Заказы',
      name: 'orders',
      type: 'relationship',
      relationTo: 'orders',
      hasMany: true,
    },
  ],
}
