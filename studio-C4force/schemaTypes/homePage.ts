export default {
  name: 'homepage',
  type: 'document',
  title: 'Home',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'banners',
      type: 'array',
      title: 'Banners',
      of: [
        {
          type: 'reference',
          to: [{type: 'banner'}],
        },
      ],
    },
  ],
}
