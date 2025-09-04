import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'subsidiary',
  title: 'Subsidiary',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      options: {
        list: [
          { title: 'MPS (Blue)', value: 'mps' },
          { title: 'LABRIG\'Ad (Red)', value: 'labrigad' },
          { title: 'Gamius (Purple)', value: 'gamius' },
          { title: 'Mouje-Leell (Green)', value: 'moujeleell' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
      media: 'logo',
      colorScheme: 'colorScheme',
    },
    prepare({ title, media, colorScheme }) {
      const colorNames = {
        mps: 'MPS',
        labrigad: 'LABRIG\'Ad',
        gamius: 'Gamius',
        moujeleell: 'Mouje-Leell',
      };

      return {
        title,
        subtitle: colorNames[colorScheme as keyof typeof colorNames] || colorScheme,
        media,
      };
    },
  },
}); 