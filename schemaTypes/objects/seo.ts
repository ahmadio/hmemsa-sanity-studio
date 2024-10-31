// schemaTypes/objects/seo.ts
import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Page title for search engines (50-60 characters)',
      validation: (Rule) =>
        Rule.max(60).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Page description for search engines (150-160 characters)',
      validation: (Rule) =>
        Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords relevant to this content (optional)',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Video', value: 'video'},
            ],
          },
          initialValue: 'image',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          hidden: ({parent}) => parent?.type !== 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (context.parent?.asset?._ref && !value) {
                    return 'Alternative text is required for images'
                  }
                  return true
                }),
            }),
          ],
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'object',
          hidden: ({parent}) => parent?.type !== 'video',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'Video URL',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (context.parent?.parent?.type === 'video' && !value) {
                    return 'Video URL is required for videos'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'thumbnail',
              type: 'image',
              title: 'Video Thumbnail',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Hide this page from search engines',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The preferred version of this page for search engines',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      noIndex: 'noIndex',
    },
    prepare({title, description, noIndex}) {
      return {
        title: title || 'SEO Settings',
        subtitle: `${noIndex ? '🚫 No Index • ' : ''}${description || 'No description set'}`,
      }
    },
  },
})
