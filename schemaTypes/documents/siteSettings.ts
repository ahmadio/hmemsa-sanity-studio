import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General Settings'},
    {name: 'header', title: 'Header'},
    {name: 'footer', title: 'Footer'},
    {name: 'social', title: 'Social Media'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'media',
      group: 'general',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      group: 'general',
    }),
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'navigation',
      group: 'header',
    }),
    defineField({
      name: 'footerNav',
      title: 'Footer Navigation',
      type: 'navigation',
      group: 'footer',
    }),
    defineField({
      name: 'social',
      title: 'Social Media Links',
      type: 'array',
      of: [{type: 'link'}],
      group: 'social',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
    prepare({title, media}) {
      return {
        title: title || 'Site Settings',
        media: media?.image || media?.video?.thumbnail,
      }
    },
  },
})
