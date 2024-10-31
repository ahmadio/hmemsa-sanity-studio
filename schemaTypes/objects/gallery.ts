// schemas/objects/gallery.ts
import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      of: [{type: 'media'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'caption',
      title: 'Gallery Caption',
      type: 'string',
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Carousel', value: 'carousel'},
          {title: 'Masonry', value: 'masonry'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'columns',
      title: 'Grid Columns',
      type: 'number',
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4},
        ],
      },
      initialValue: 3,
      hidden: ({parent}) => parent?.layout !== 'grid',
    }),
  ],
  preview: {
    select: {
      items: 'items',
      layout: 'layout',
    },
    prepare({items, layout}) {
      return {
        title: `Gallery - ${layout}`,
        subtitle: `${items?.length || 0} items`,
        media: ImagesIcon,
      }
    },
  },
})
