import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'currency',
      type: 'string',
      initialValue: 'USD',
    }),
    defineField({
      name: 'longDescription',
      type: 'text',
    }),
    defineField({
      name: 'imageGroups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'images',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'image',
                      type: 'image',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'metaTags',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', type: 'string'},
            {name: 'value', type: 'text'},
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})
