import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'meeting',
  title: 'Meeting',
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
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Physical location or virtual meeting URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meetingType',
      title: 'Meeting Type',
      type: 'string',
      options: {
        list: [
          { title: 'In Person', value: 'in-person' },
          { title: 'Video Conference', value: 'video' },
          { title: 'Phone Call', value: 'phone' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organizer',
      title: 'Organizer',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attendees',
      title: 'Attendees',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    }),
    defineField({
      name: 'agenda',
      title: 'Agenda',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notes',
      title: 'Meeting Notes',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'attachments',
      title: 'Attachments',
      type: 'array',
      of: [{ type: 'file' }],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Rescheduled', value: 'rescheduled' },
        ],
      },
      initialValue: 'scheduled',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      status: 'status',
    },
    prepare({ title, date, status }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title,
        subtitle: `${formattedDate} - ${status}`,
      };
    },
  },
}); 