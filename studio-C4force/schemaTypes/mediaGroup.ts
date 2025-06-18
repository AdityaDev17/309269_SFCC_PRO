export default {
  name: 'mediaGroup',
  type: 'document',
  title: 'Media Group',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Group Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'assets',
      type: 'array',
      title: 'Media Files',
      of: [{type: 'image'}, {type: 'file'}],
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags (optional)',
      of: [{type: 'string'}],
    },
  ],
}
