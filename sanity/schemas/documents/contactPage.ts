import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
      name: 'mainOffice',
      title: 'Main Office',
      type: 'contactInfo',
    }),
    defineField({
      name: 'additionalOffices',
      title: 'Additional Offices',
      type: 'array',
      of: [{ type: 'contactInfo' }],
    }),
    defineField({
      name: 'formSettings',
      title: 'Form Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Form Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'string',
        }),
        defineField({
          name: 'errorMessage',
          title: 'Error Message',
          type: 'string',
        }),
        defineField({
          name: 'projectTypes',
          title: 'Project Types',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Options for project type dropdown',
        }),
        defineField({
          name: 'budgetRanges',
          title: 'Budget Ranges',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Options for budget range dropdown',
        }),
        defineField({
          name: 'referralSources',
          title: 'Referral Sources',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Options for "How did you hear about us?" dropdown',
        }),
      ],
    }),
    defineField({
      name: 'mapSettings',
      title: 'Map Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
          description: 'Latitude coordinate for office location',
        }),
        defineField({
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          description: 'Longitude coordinate for office location',
        }),
        defineField({
          name: 'zoom',
          title: 'Zoom Level',
          type: 'number',
          initialValue: 15,
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
        title: title || 'Contact Page',
        media,
      };
    },
  },
}); 