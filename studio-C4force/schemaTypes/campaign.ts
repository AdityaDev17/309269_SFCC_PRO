export default {
  name: 'campaign',
  title: 'Campaign Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Campaign Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO',
          validation: Rule => Rule.required().error('Alt text is important for accessibility.')
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string'
    },
    {
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'url'
    },
    {
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ]
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'showCountdown',
      title: 'Show Countdown Timer?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'countdownEnd',
      title: 'Countdown Ends At',
      type: 'datetime',
      hidden: ({ parent }) => !parent?.showCountdown,
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.showCountdown && !value) {
            return 'Countdown end date is required when countdown is enabled.';
          }
          return true;
        })
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'bannerImage'
    }
  }
}
