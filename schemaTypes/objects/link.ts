import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Link', value: 'internal'},
          {title: 'External Link', value: 'external'},
          {title: 'Path', value: 'path'},
          {title: 'Dropdown', value: 'dropdown'},
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
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'external',
    }),
    defineField({
      name: 'path',
      title: 'URL Path',
      type: 'string',
      description: 'Enter the URL path (e.g., "/impact" or "/segment/sub-segment")',
      hidden: ({parent}) => parent?.type !== 'path',
      validation: (Rule) =>
        Rule.custom((path, context) => {
          if (context.parent?.type !== 'path') return true
          if (!path) return 'Path is required'
          if (!path.startsWith('/')) return 'Path must start with /'
          // Optional: add more validation rules
          // - No trailing slash
          // - Only allowed characters
          // - Maximum depth
          return true
        }),
    }),
    defineField({
      name: 'dropdownItems',
      title: 'Dropdown Items',
      type: 'array',
      of: [{type: 'link'}],
      hidden: ({parent}) => parent?.type !== 'dropdown',
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if (parent?.link?.type === 'dropdown' && (!value || value.length === 0)) {
            return 'A dropdown must have at least one item'
          }
          return true
        }),
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Optional Lucide icon name',
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
      text: 'text',
      type: 'type',
      internalLink: 'internalLink.title',
      externalLink: 'externalLink',
      path: 'path',
      isActive: 'isActive',
      icon: 'icon',
    },
    prepare({text, type, internalLink, externalLink, path, isActive, icon}) {
      let destination
      switch (type) {
        case 'internal':
          destination = internalLink
          break
        case 'external':
          destination = externalLink
          break
        case 'path':
          destination = path
          break
        default:
          destination = ''
      }

      return {
        title: text,
        subtitle: `${isActive ? '✓' : '✗'} ${type}${destination ? ` • ${destination}` : ''}${
          icon ? ` • ${icon}` : ''
        }`,
      }
    },
  },
})
