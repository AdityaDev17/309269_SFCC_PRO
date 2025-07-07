import {defineField} from 'sanity'

export default {
  name: 'article',
  type: 'document',
  title: 'Articles',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'author', type: 'string', title: 'Author'},
    {name: 'publishedAt', type: 'datetime', title: 'Published At'},
    {name: 'excerpt', type: 'text', title: 'Excerpt'},
    {name: 'body', type: 'array', title: 'Content', of: [{type: 'block'}]},
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      fields: [
        defineField({
          name: 'promptForImage',
          type: 'text',
          title: 'Image Prompt',
          rows: 2,
        }),
      ],
      options: {
        aiAssist: {
          imageInstructionField: 'promptForImage',
        },
        hotspot: true,
      },
    },
  ],
}
