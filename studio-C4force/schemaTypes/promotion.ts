export default {
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    { name: 'promotionId', title: 'Promotion ID', type: 'string', validation: Rule => Rule.required() },
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'promotionClass', title: 'Promotion Class', type: 'string' },
    { name: 'enabled', title: 'Enabled', type: 'boolean' },
    { name: 'archived', title: 'Archived', type: 'boolean' },
    { name: 'calloutMsg',title: 'Callout Message', type: 'string'},
    {
      name: 'campaignAssignments',
      title: 'Assigned Campaigns',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'campaign' }] }]
    },
    { name: 'creationDate', title: 'Created At', type: 'datetime' },
    { name: 'lastModified', title: 'Last Modified', type: 'datetime' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'promotionClass'
    }
  }
}
