export default {
  name: 'homepage',
  type: 'document',
  title: 'Homepage Content',
  fields: [
    {
      name: 'banners',
      type: 'array',
      title: 'Banners',
      of: [
        {
          type: 'object',
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
              name: 'buttonText',
              type: 'string',
              title: 'Button Text',
            },
            {
              name: 'alignment',
              type: 'string',
              title: 'Text Alignment',
              options: {
                list: ['left', 'center', 'right'],
              },
            },
            {
              name: 'backgroundImage',
              type: 'image',
              title: 'Background Image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'statementBanner',
      type: 'object',
      title: 'Statement Banner',
      fields: [
        {
          name: 'imageSrc',
          type: 'image',
          title: 'Image',
        },
        {
          name: 'imageAlt',
          type: 'string',
          title: 'Image Alt Text',
        },
        {
          name: 'imagePosition',
          type: 'string',
          title: 'Image Position',
          options: {
            list: ['left', 'right'],
          },
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
        },
        {
          name: 'subheading',
          type: 'string',
          title: 'Subheading',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
        },
      ],
    },
  ],
}
