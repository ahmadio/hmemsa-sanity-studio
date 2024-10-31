import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const initiative = defineType({
  name: 'initiative',
  title: 'Initiative',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Initiative Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'richText',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'media',
    }),
    defineField({
      name: 'projects',
      title: 'Related Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'coverImage',
      isActive: 'isActive',
    },
    prepare({title, subtitle, media, isActive}) {
      return {
        title,
        subtitle: `${isActive ? '✓ ' : '✗ '}${subtitle || ''}`,
        media: media?.image || media?.video?.thumbnail,
      }
    },
  },
})
