import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'For internal reference only',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainMenu',
      title: 'Main Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
            defineField({
              name: 'children',
              title: 'Child Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'link',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'link.href',
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link.href',
              hasChildren: 'children',
            },
            prepare({ title, subtitle, hasChildren }) {
              return {
                title,
                subtitle: hasChildren?.length
                  ? `${subtitle} (${hasChildren.length} children)`
                  : subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link.href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'mobileMenu',
      title: 'Mobile Menu',
      type: 'array',
      description: 'Optional: Override main menu for mobile devices',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link.href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'subsidiariesMenu',
      title: 'Subsidiaries Menu',
      type: 'array',
      description: 'Links to subsidiary pages',
      of: [
        {
          type: 'reference',
          to: [{ type: 'subsidiary' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}); 