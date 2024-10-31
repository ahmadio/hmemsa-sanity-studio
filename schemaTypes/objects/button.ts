// schemaTypes/objects/button.ts
import {defineField, defineType} from 'sanity'
import {ControlsIcon} from '@sanity/icons'

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Button Type',
      type: 'string',
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
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'external',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
          {title: 'Ghost', value: 'ghost'},
          {title: 'Link', value: 'link'},
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
        ],
      },
      initialValue: 'md',
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Optional Lucide icon name',
    }),
    defineField({
      name: 'iconPosition',
      type: 'string',
      title: 'Icon Position',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
      hidden: ({parent}) => !parent?.icon,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      type: 'type',
      variant: 'variant',
      icon: 'icon',
    },
    prepare({label, type, variant, icon}) {
      return {
        title: label,
        subtitle: `${type} • ${variant}${icon ? ` • ${icon}` : ''}`,
      }
    },
  },
})
