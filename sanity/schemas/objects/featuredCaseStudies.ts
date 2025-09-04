import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'featuredCaseStudies',
  title: 'Featured Case Studies',
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
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
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
          { title: 'Featured', value: 'featured' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'numberOfItems',
      title: 'Number of Items to Show',
      type: 'number',
      initialValue: 3,
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
      caseStudyCount: 'caseStudies.length',
    },
    prepare({ title, caseStudyCount = 0 }) {
      return {
        title: title || 'Featured Case Studies',
        subtitle: `${caseStudyCount} case stud${caseStudyCount === 1 ? 'y' : 'ies'}`,
      };
    },
  },
}); 