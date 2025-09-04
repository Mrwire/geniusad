import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'link' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      linkCount: 'links.length',
    },
    prepare({ title, linkCount = 0 }) {
      return {
        title: title || 'Untitled Column',
        subtitle: `${linkCount} link${linkCount === 1 ? '' : 's'}`,
      };
    },
  },
}); 