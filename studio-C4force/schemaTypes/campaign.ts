export default {
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    { name: 'campaignId', title: 'Campaign ID', type: 'string', validation: Rule => Rule.required() },
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required(), readOnly: true }, // user-facing title
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'enabled', title: 'Enabled', type: 'boolean' },
    {name: 'coupons', title: 'Coupons', type: 'array',  of: [{ type: 'string' }]},
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'promotions',
      title: 'Promotions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'promotion' }] }]
    }, 
    {name:'startDate', title:'Start Date', type: 'datetime'},
    {name:'endDate', title:'End Date', type: 'datetime'},
    { name: 'creationDate', title: 'Created At', type: 'datetime' },
    { name: 'lastModified', title: 'Last Modified', type: 'datetime' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'campaignId',
      media: 'image'
    }
  }
}
