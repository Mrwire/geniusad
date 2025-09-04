import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featuredCaseStudy',
      title: 'Featured Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
      description: 'Select a case study to feature at the top of the page',
    }),
    defineField({
      name: 'filters',
      title: 'Filter Options',
      type: 'object',
      fields: [
        defineField({
          name: 'showIndustryFilter',
          title: 'Show Industry Filter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showCategoryFilter',
          title: 'Show Category Filter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showSubsidiaryFilter',
          title: 'Show Subsidiary Filter',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'customFilterOptions',
          title: 'Custom Filter Options',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Add custom filter options (optional)',
        }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'ctaSection',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Case Studies Page',
        media,
      };
    },
  },
}); 