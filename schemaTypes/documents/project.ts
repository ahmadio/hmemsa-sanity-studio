import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
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
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(160),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    defineField({
      name: 'initiative',
      title: 'Parent Initiative',
      type: 'reference',
      to: [{type: 'initiative'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planning', value: 'planning'},
          {title: 'In Progress', value: 'inProgress'},
          {title: 'Continues', value: 'continues'},
          {title: 'Completed', value: 'completed'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'region', title: 'Region', type: 'string'}),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
    }),
    defineField({
      name: 'content',
      title: 'Project Content',
      type: 'richText',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      initiative: 'initiative.name',
      status: 'status',
      city: 'location.city',
    },
    prepare({title, initiative, status, city}) {
      const statusEmoji = {
        planning: '📋',
        inProgress: '🚧',
        completed: '✅',
      }
      return {
        title,
        subtitle: `${statusEmoji[status]} ${initiative}${city ? ` • ${city}` : ''}`,
      }
    },
  },
})
