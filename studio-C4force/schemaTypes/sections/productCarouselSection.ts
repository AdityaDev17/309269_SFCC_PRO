export default {
  name: 'productCarouselSection',
  type: 'object',
  title: 'Product Carousel Section',
  fields: [
    {name: 'title', type: 'string', title: 'Carousel Title'},
    {
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    },
  ],
}
