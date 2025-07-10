export default {
  name: 'editorialSection',
  type: 'object',
  title: 'Editorial Section',
  fields: [
    {name: 'title', type: 'string', title: 'Section Title'},
    {
      name: 'articles',
      type: 'array',
      title: 'Articles',
      of: [{type: 'reference', to: [{type: 'article'}]}],
    },
  ],
}
