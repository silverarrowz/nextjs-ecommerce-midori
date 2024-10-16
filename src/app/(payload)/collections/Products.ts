import { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
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
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Цена в рублях',
      required: true,
    },
    {
      name: 'amount',
      type: 'text',
      label: 'Количество (например, в граммах)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Products
