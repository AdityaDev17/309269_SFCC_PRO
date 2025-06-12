// schemas/banner.ts
export default {
  name: 'banner',
  type: 'document',
  title: 'Banner',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Image',
      options: {hotspot: true},
    },
    {
      name: 'video',
      type: 'file',
      title: 'Video File',
      options: {
        accept: 'video/*', // restrict to video uploads
      },
    },
    {
      name: 'altText',
      type: 'string',
      title: 'Alt Text',
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Banner Variant',
      options: {
        list: ['Hero', 'Promo', 'Statement', 'Announcement'],
        layout: 'radio',
      },
    },
    {
      name: 'visibility',
      type: 'boolean',
      title: 'Visible?',
    },
    {
      name: 'priority',
      type: 'number',
      title: 'Priority',
      description: 'Lower number = higher priority in carousel',
    },
  ],
}
