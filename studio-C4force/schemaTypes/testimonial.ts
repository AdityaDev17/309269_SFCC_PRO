export default {
  name: 'testimonial',
  type: 'object',
  title: 'Testimonial',
  fields: [
    {name: 'author', type: 'string', title: 'Author Name'},
    {name: 'quote', type: 'text', title: 'Quote'},
    {
      name: 'image',
      type: 'image',
      title: 'Author Image',
      options: {hotspot: true},
    },
  ],
}
