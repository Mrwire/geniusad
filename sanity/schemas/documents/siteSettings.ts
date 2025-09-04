import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
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
      name: 'logoAlt',
      title: 'Alternative Logo (Light)',
      type: 'image',
      description: 'Alternative logo for dark backgrounds',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'contactInfo',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'socialMedia',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
        }),
        defineField({
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [{ type: 'footerColumn' }],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO Settings',
      type: 'seo',
    }),
    defineField({
      name: 'analyticsSettings',
      title: 'Analytics Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        }),
        defineField({
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'cookieConsent',
      title: 'Cookie Consent',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Cookie Consent',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'message',
          title: 'Consent Message',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'acceptButtonText',
          title: 'Accept Button Text',
          type: 'string',
        }),
        defineField({
          name: 'declineButtonText',
          title: 'Decline Button Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
      };
    },
  },
}); 