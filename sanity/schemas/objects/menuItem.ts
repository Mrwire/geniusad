import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional icon identifier',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight',
      type: 'boolean',
      description: 'Highlight this menu item',
      initialValue: false,
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
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional icon identifier',
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
}); 