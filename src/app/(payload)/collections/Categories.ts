import { CollectionConfig } from 'payload'
import { admins } from '../access/admins'

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
    create: admins,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Название',
      required: true,
    },
  ],
}

export default Categories
