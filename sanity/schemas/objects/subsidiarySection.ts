import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'subsidiarySection',
  title: 'Subsidiary Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'subsidiaries',
      title: 'Subsidiaries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'subsidiary' }],
        },
      ],
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Tabs', value: 'tabs' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'showLogos',
      title: 'Show Logos',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Enter a valid hex color code (e.g., #f8f8f8)',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'Optional call-to-action text',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'link',
      description: 'Optional call-to-action link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subsidiaryCount: 'subsidiaries.length',
    },
    prepare({ title, subsidiaryCount = 0 }) {
      return {
        title: title || 'Subsidiary Section',
        subtitle: `${subsidiaryCount} subsidiar${subsidiaryCount === 1 ? 'y' : 'ies'}`,
      };
    },
  },
}); 