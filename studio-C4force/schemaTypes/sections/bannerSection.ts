export default {
  name: 'bannerSection',
  type: 'object',
  title: 'Banner Section',
  fields: [
    {name: 'title', type: 'string', title: 'Section Title'},
    {
      name: 'banners',
      type: 'array',
      title: 'Banners',
      of: [{type: 'reference', to: [{type: 'banner'}]}],
    },
  ],
}
