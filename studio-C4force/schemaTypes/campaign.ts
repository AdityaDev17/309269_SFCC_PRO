export default {
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    { name: 'campaignId', title: 'Campaign ID', type: 'string', validation: Rule => Rule.required() },
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }, // user-facing title
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'enabled', title: 'Enabled', type: 'boolean' },
    { name: 'creationDate', title: 'Created At', type: 'datetime' },
    { name: 'lastModified', title: 'Last Modified', type: 'datetime' },
    {
      name: 'promotions',
      title: 'Promotions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'promotion' }] }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'campaignId'
    }
  }
}
