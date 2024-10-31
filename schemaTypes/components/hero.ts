import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Internal Name',
      type: 'string',
      description: 'Used to identify this hero in the CMS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Hero Style',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'With Background Image', value: 'withBg'},
          {title: 'Split', value: 'split'},
          {title: 'Minimal', value: 'minimal'},
          {title: 'Centered', value: 'centered'},
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'object',
      fields: [
        defineField({name: 'prefix', title: 'Prefix', type: 'string'}),
        defineField({name: 'highlight', title: 'Highlighted Text', type: 'string'}),
        defineField({name: 'suffix', title: 'Suffix', type: 'string'}),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'media',
      hidden: ({parent}) => parent?.style === 'minimal',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{type: 'button'}],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      style: 'style',
      headline: 'headline',
      media: 'media',
    },
    prepare({title, style, headline, media}) {
      const fullHeadline = [headline?.prefix, headline?.highlight, headline?.suffix]
        .filter(Boolean)
        .join(' ')
      return {
        title: title || 'Untitled Hero',
        subtitle: `${style} ${fullHeadline ? `• ${fullHeadline}` : ''}`,
        media: media?.image || media?.video?.thumbnail,
      }
    },
  },
})
