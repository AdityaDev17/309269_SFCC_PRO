export default {
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    { name: 'promotionId', title: 'Promotion ID', type: 'string', validation: Rule => Rule.required() },
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    {
      name: 'name',
      title: 'Name (localized)',
      type: 'object',
      fields: [
        { name: 'default', title: 'Default Name', type: 'string' },
        // add other locales if needed
      ]
    },
    { name: 'promotionClass', title: 'Promotion Class', type: 'string' },
    { name: 'enabled', title: 'Enabled', type: 'boolean' },
    { name: 'archived', title: 'Archived', type: 'boolean' },
    { name: 'creationDate', title: 'Created At', type: 'datetime' },
    { name: 'lastModified', title: 'Last Modified', type: 'datetime' },
    {
      name: 'calloutMsg',
      title: 'Callout Message (localized)',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'fr', title: 'French', type: 'string' }
      ]
    },
    {
      name: 'campaignAssignments',
      title: 'Assigned Campaigns',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'campaign' }] }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'promotionClass'
    }
  }
}
