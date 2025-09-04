import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
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
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Grid', value: 'grid' },
          { title: 'Single', value: 'single' },
        ],
      },
      initialValue: 'carousel',
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
      name: 'showCompanyLogos',
      title: 'Show Company Logos',
      type: 'boolean',
      initialValue: false,
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
      testimonialCount: 'testimonials.length',
    },
    prepare({ title, testimonialCount = 0 }) {
      return {
        title: title || 'Testimonial Section',
        subtitle: `${testimonialCount} testimonial${testimonialCount === 1 ? '' : 's'}`,
      };
    },
  },
}); 