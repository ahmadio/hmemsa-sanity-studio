// schemaTypes/components/stat.ts
import {defineField, defineType} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Internal Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "users", "building", "heart")',
    }),
    defineField({
      name: 'trend',
      title: 'Trend',
      type: 'object',
      fields: [
        defineField({
          name: 'direction',
          title: 'Direction',
          type: 'string',
          options: {
            list: [
              {title: 'Up', value: 'up'},
              {title: 'Down', value: 'down'},
              {title: 'Neutral', value: 'neutral'},
            ],
          },
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      value: 'value',
      label: 'label',
      isActive: 'isActive',
      trend: 'trend',
    },
    prepare({title, value, label, isActive, trend}) {
      const trendIcon = {
        up: '↑',
        down: '↓',
        neutral: '→',
      }
      return {
        title: title || 'Unnamed Statistic',
        subtitle: `${isActive ? '✓' : '✗'} ${value} ${label} ${
          trend ? `${trendIcon[trend.direction]} ${trend.value}` : ''
        }`,
      }
    },
  },
})
