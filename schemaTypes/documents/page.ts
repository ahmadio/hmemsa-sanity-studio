import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO & Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'reference',
      to: [{type: 'hero'}],
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
      group: 'content',
    }),
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    },
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [{type: 'section'}],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      hero: 'hero.name',
    },
    prepare({title, slug, hero}) {
      return {
        title: title || 'Untitled Page',
        subtitle: `/${slug} ${hero ? `• Hero: ${hero}` : ''}`,
      }
    },
  },
})
