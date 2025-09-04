import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
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
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        filter: 'role == "client"',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Under Review', value: 'review' },
          { title: 'Revisions', value: 'revisions' },
          { title: 'Approved', value: 'approved' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'planning',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'subsidiary',
      title: 'Subsidiary',
      type: 'reference',
      to: [{ type: 'subsidiary' }],
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
          options: {
            filter: 'role == "team" || role == "admin"',
          },
        },
      ],
    }),
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'array',
      of: [{ type: 'projectAsset' }],
    }),
    defineField({
      name: 'messages',
      title: 'Messages',
      type: 'array',
      of: [{ type: 'projectMessage' }],
    }),
    defineField({
      name: 'approvals',
      title: 'Approvals',
      type: 'array',
      of: [{ type: 'approval' }],
    }),
    defineField({
      name: 'meetings',
      title: 'Meetings',
      type: 'array',
      of: [{ type: 'meeting' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      client: 'client.name',
    },
    prepare({ title, subtitle, client }) {
      return {
        title,
        subtitle: `${subtitle} | Client: ${client || 'Unknown'}`,
      };
    },
  },
}); 