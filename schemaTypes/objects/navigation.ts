// schemaTypes/objects/navigation.ts
import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'link',
              type: 'link',
              title: 'Link',
            }),
          ],
          preview: {
            select: {
              title: 'link.text',
              type: 'link.type',
              isActive: 'link.isActive',
              internalLink: 'link.internalLink.title',
              externalLink: 'link.externalLink',
              dropdownCount: 'dropdownItems.length',
            },
            prepare({title, type, isActive, internalLink, externalLink, dropdownCount}) {
              const typeIcons = {
                internal: '🔗',
                external: '↗️',
                dropdown: '⌄',
              }
              const subtitle =
                type === 'dropdown'
                  ? `Dropdown (${dropdownCount} items)`
                  : type === 'internal'
                    ? internalLink
                    : externalLink

              return {
                title: `${typeIcons[type]} ${title}`,
                subtitle: `${isActive ? '✓' : '✗'} ${subtitle || type}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
