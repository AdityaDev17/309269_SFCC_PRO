export default {
  name: 'testimonialSection',
  type: 'object',
  title: 'Testimonial Section',
  fields: [
    {name: 'testimonials', type: 'array', title: 'Testimonials', of: [{type: 'testimonial'}]},
  ],
}
