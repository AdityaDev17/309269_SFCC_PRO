import FilteredImageSelector from '../components/FilteredImageSelector'

export default {
  name: 'banner',
  type: 'document',
  title: 'Banners',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'mediaFolder',
      type: 'reference',
      to: [{type: 'mediaGroup'}],
      title: 'Select Media Folder',
      description: 'Choose a folder where the asset is grouped',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
        // filter: ({document}) => {
        //   if (!document.mediaFolder || !document.mediaFolder._ref) {
        //     return {
        //       filter: '_type == "sanity.imageAsset"', // Default filter if no mediaFolder is selected
        //     }
        //   }
        //   return {
        //     filter:
        //       '_type == "sanity.imageAsset" && _id in *[_type == "mediaGroup" && _id == $mediaFolderId][0].assets[].asset._ref',
        //     params: {
        //       mediaFolderId: document.mediaFolder._ref,
        //     },
        //   }
        // },
      },
      components: {
        input: FilteredImageSelector,
      },
      description: 'Select an image from the chosen Media Folder',
      // validation: (Rule) =>
      //   Rule.custom((value, context) => {
      //     const {document} = context
      //     if (!document.mediaFolder || !document.mediaFolder._ref) {
      //       return 'Please select a Media Folder first.'
      //     }
      //     const query = `*[_type == "mediaGroup" && _id == $mediaFolderId][0].assets[].asset._ref`
      //     const params = {mediaFolderId: document.mediaFolder._ref}
      //     return window.client.fetch(query, params).then((refs) => {
      //       if (!refs.includes(value?._ref)) {
      //         return 'Selected image does not belong to the chosen Media Folder.'
      //       }
      //       return true
      //     })
      //   }),
    },
    {
      name: 'video',
      type: 'file',
      title: 'Video File',
      options: {
        accept: 'video/*', // restrict to video uploads
      },
    },
    {
      name: 'altText',
      type: 'string',
      title: 'Alt Text',
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Banner Variant',
      options: {
        list: ['Hero', 'Promo', 'Statement', 'Announcement'],
        layout: 'radio',
      },
    },
    {
      name: 'visibility',
      type: 'boolean',
      title: 'Visible?',
    },
    {
      name: 'priority',
      type: 'number',
      title: 'Priority',
      description: 'Lower number = higher priority in carousel',
    },
  ],
}
