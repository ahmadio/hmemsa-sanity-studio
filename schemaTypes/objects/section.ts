// schemaTypes/objects/section.ts
import {defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons'

export const section = defineType({
  name: 'section',
  title: 'Content Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          {title: 'Content', value: 'content'},
          {title: 'Statistics', value: 'stats'},
          {title: 'Initiative', value: 'initiative'},
          {title: 'CTA', value: 'cta'},
          {title: 'Media', value: 'media'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Embed', value: 'embed'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      hidden: ({parent}) => parent?.type !== 'content',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.parent?.type === 'content' && !field) {
            return 'Content is required for content sections'
          }
          return true
        }),
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'stat'}]}],
      hidden: ({parent}) => parent?.type !== 'stats',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.parent?.type === 'stats' && (!field || !field.length)) {
            return 'At least one statistic is required for stats sections'
          }
          return true
        }),
    }),
    defineField({
      name: 'initiatives',
      title: 'Initiatives',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'initiative'}]}],
      hidden: ({parent}) => parent?.type !== 'initiative',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.parent?.type === 'initiative' && (!field || !field.length)) {
            return 'At least one initiative is required for initiative sections'
          }
          return true
        }),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      hidden: ({parent}) => parent?.type !== 'cta',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.parent?.type === 'cta' && !field) {
            return 'CTA content is required for CTA sections'
          }
          return true
        }),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context.document?.sections?.some((section) => section.type === 'cta' && !field)) {
                return 'Title is required for CTA sections'
              }
              return true
            }),
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Description',
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context.document?.sections?.some((section) => section.type === 'cta' && !field)) {
                return 'Description is required for CTA sections'
              }
              return true
            }),
        }),
        defineField({
          name: 'button',
          title: 'Button',
          type: 'object',
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context.document?.sections?.some((section) => section.type === 'cta' && !field)) {
                return 'Button is required for CTA sections'
              }
              return true
            }),
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              type: 'string',
              title: 'Button Type',
              options: {
                list: [
                  {title: 'Internal Link', value: 'internal'},
                  {title: 'External Link', value: 'external'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'internalLink',
              title: 'Internal Link',
              type: 'reference',
              to: [{type: 'page'}, {type: 'initiative'}, {type: 'project'}],
              hidden: ({parent}) => parent?.type !== 'internal',
              validation: (Rule) =>
                Rule.custom((field, context) => {
                  if (context.parent?.type === 'internal' && !field) {
                    return 'Internal link is required when type is internal'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'externalLink',
              title: 'External Link',
              type: 'url',
              hidden: ({parent}) => parent?.type !== 'external',
              validation: (Rule) =>
                Rule.custom((field, context) => {
                  if (context.parent?.type === 'external' && !field) {
                    return 'External URL is required when type is external'
                  }
                  return true
                }),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'media',
      hidden: ({parent}) => parent?.type !== 'media',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.sections?.some((section) => section.type === 'media' && !field)) {
            return 'Media content is required for media sections'
          }
          return true
        }),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
      hidden: ({parent}) => parent?.type !== 'gallery',
    }),
    defineField({
      name: 'embed',
      title: 'Embed',
      type: 'object',
      hidden: ({parent}) => parent?.type !== 'embed',
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'URL',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
      ],
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.parent?.type === 'embed' && !field) {
            return 'Embed content is required for embed sections'
          }
          return true
        }),
    }),
    defineField({
      name: 'theme',
      title: 'Section Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Primary', value: 'primary'},
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'spacing',
      title: 'Section Spacing',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Compact', value: 'compact'},
          {title: 'Comfortable', value: 'comfortable'},
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      theme: 'theme',
    },
    prepare({title, type, theme}) {
      const typeIcons = {
        content: '📝',
        stats: '📊',
        initiative: '💡',
        cta: '🔔',
        media: '🖼️',
        embed: '🔗',
      }
      return {
        title: title || `${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
        subtitle: `${typeIcons[type]} ${type} • ${theme} theme`,
      }
    },
  },
})
