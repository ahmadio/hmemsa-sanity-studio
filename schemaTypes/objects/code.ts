// schemaTypes/objects/code.ts
import {defineField, defineType} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'

export const code = defineType({
  name: 'code',
  title: 'Code',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'SCSS', value: 'scss'},
          {title: 'PHP', value: 'php'},
          {title: 'Python', value: 'python'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'Shell', value: 'shell'},
          {title: 'JSON', value: 'json'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'Plain text', value: 'text'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'filename',
      language: 'language',
      code: 'code',
    },
    prepare({title, language, code}) {
      return {
        title: title || 'Untitled',
        subtitle: `${language} • ${code?.substring(0, 30)}...`,
      }
    },
  },
})
