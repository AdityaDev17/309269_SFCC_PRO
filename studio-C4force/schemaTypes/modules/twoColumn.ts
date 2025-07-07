export default {
  name: 'twoColumnText',
  type: 'object',
  title: 'Two Column Text',
  fields: [
    {name: 'leftText', type: 'text', title: 'Left Column Text'},
    {name: 'rightText', type: 'text', title: 'Right Column Text'},
    {
      name: 'previewImage',
      type: 'image',
      title: 'Preview Image',
      hidden: true, // So it won't show up in the form
    },
  ],
  preview: {
    select: {
      title: 'leftText',
      media: 'previewImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Two Column Text',
        media: media,
      }
    },
  },
}
