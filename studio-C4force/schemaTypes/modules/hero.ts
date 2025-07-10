export default {
  name: 'hero',
  type: 'object',
  title: 'Hero',
  fields: [
    {name: 'heading', type: 'string', title: 'Heading'},
    {name: 'subheading', type: 'string', title: 'Subheading'},
    {name: 'backgroundImage', type: 'image', title: 'Background Image'},
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'backgroundImage',
    },
    // prepare({title, subtitle, media}) {
    //   return {
    //     title: title || 'Hero Section',
    //     subtitle: subtitle || 'No subheading',
    //     media: media,
    //   }
    // },
  },
}
