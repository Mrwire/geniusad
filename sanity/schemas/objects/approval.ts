import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'approval',
  title: 'Approval',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'Revisions Requested', value: 'revisions' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items for Approval',
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
              name: 'asset',
              title: 'Asset',
              type: 'reference',
              to: [{ type: 'projectAsset' }],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'asset.file',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approvedBy',
      title: 'Approved By',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        filter: 'role == "client"',
      },
    }),
    defineField({
      name: 'approvedAt',
      title: 'Approved At',
      type: 'datetime',
    }),
    defineField({
      name: 'feedback',
      title: 'Feedback',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'dueDate',
      title: 'Due Date',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
    },
    prepare({ title, status }) {
      return {
        title,
        subtitle: `Status: ${status}`,
      };
    },
  },
}); 