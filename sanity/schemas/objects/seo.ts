import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO & Social',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for search engines and browser tabs (50-60 characters recommended)',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters recommended)',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Image',
      type: 'image',
      description: 'Image for social media sharing (1200×630px recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialTitle',
      title: 'Social Title',
      type: 'string',
      description: 'Title used for social media sharing (falls back to Meta Title if empty)',
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social Description',
      type: 'text',
      rows: 3,
      description: 'Description used for social media sharing (falls back to Meta Description if empty)',
    }),
  ],
}); 