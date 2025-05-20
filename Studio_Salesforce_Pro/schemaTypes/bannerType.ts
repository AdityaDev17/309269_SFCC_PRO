import {defineField, defineType} from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Homepage Banner',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'buttonText', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'backgroundImage', type: 'image'}),
    defineField({
      name: 'alignment',
      type: 'string',
      options: {list: ['left-top', 'center', 'right-bottom']},
    }),
    defineField({name: 'order', type: 'number'}), // so you can sort
  ],
})
