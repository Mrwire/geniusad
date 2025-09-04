import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'socialMedia',
  title: 'Social Media',
  type: 'object',
  fields: [
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      description: 'Instagram profile URL',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      description: 'Facebook page URL',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      description: 'LinkedIn profile or company page URL',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter',
      type: 'url',
      description: 'Twitter profile URL',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      description: 'YouTube channel URL',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      description: 'TikTok profile URL',
    }),
    defineField({
      name: 'pinterest',
      title: 'Pinterest',
      type: 'url',
      description: 'Pinterest profile URL',
    }),
    defineField({
      name: 'behance',
      title: 'Behance',
      type: 'url',
      description: 'Behance profile URL',
    }),
    defineField({
      name: 'dribbble',
      title: 'Dribbble',
      type: 'url',
      description: 'Dribbble profile URL',
    }),
  ],
}); 