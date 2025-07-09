import VisualSectionPickerButton from '../components/VisualSectionPickerButton'
import VisualSectionPicker from '../components/VisualSectionPicker'
import CustomArrayInput from '../components/CustomArrayInput'

export default {
  name: 'landingPage',
  type: 'document',
  title: 'Landing Pages',
  fields: [
    {name: 'title', type: 'string', title: 'Landing Page Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}},
    {name: 'publishDate', type: 'datetime', title: 'Publish Date'},
    {
      name: 'content',
      type: 'array',
      title: 'Page Sections',
      of: [
        // {type: 'bannerSection'},
        // {type: 'productCarouselSection'},
        // {type: 'testimonialSection'},
        // {type: 'editorialSection'},
        {type: 'hero'},
        {type: 'twoColumnText'},
      ],
      components: {
        input: CustomArrayInput,
      },
    },
  ],
}
