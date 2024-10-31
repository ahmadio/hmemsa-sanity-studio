// schemaTypes/objects/media.ts
import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const media = defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: ImageIcon,
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
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context?.document?.type === 'image' && !field) {
                return 'Alternative text is required for images'
              }
              return true
            }),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
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
          description: 'YouTube or Vimeo URL',
          validation: (Rule) =>
            Rule.custom((field, context) => {
              // Only validate if parent type is video
              const parentType = context?.parent?.parent?.type
              if (parentType === 'video' && !field) {
                return 'Video URL is required'
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
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
        defineField({
          name: 'autoplay',
          type: 'boolean',
          title: 'Autoplay',
          initialValue: false,
        }),
      ],
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields, context) => {
      // Only validate if this is being used within a section
      if (context?.parent?.type !== 'media') {
        return true
      }

      // Validate based on media type
      if (fields?.type === 'image' && !fields?.image) {
        return 'Image is required when type is set to image'
      }

      if (fields?.type === 'video' && !fields?.video?.url) {
        return 'Video URL is required when type is set to video'
      }

      return true
    }),
  preview: {
    select: {
      type: 'type',
      imageUrl: 'image.asset.url',
      videoUrl: 'video.url',
      caption: 'image.caption',
      videoCaption: 'video.caption',
    },
    prepare({type, imageUrl, videoUrl, caption, videoCaption}) {
      const title = type === 'image' ? 'Image' : 'Video'
      const subtitle =
        type === 'image'
          ? caption || imageUrl || 'No image selected'
          : videoCaption || videoUrl || 'No video selected'
      return {
        title,
        subtitle,
      }
    },
  },
})
