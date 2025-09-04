import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'projectMessage',
  title: 'Project Message',
  type: 'object',
  fields: [
    defineField({
      name: 'sender',
      title: 'Sender',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sentAt',
      title: 'Sent At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readBy',
      title: 'Read By',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    }),
    defineField({
      name: 'attachments',
      title: 'Attachments',
      type: 'array',
      of: [{ type: 'file' }],
    }),
    defineField({
      name: 'isInternal',
      title: 'Is Internal',
      description: 'If enabled, this message will only be visible to team members',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      sender: 'sender.name',
      content: 'content',
      date: 'sentAt',
    },
    prepare({ sender, content, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: sender || 'Unknown',
        subtitle: `${content?.substring(0, 50)}${content?.length > 50 ? '...' : ''} (${formattedDate})`,
      };
    },
  },
}); 