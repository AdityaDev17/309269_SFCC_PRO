import {Icon} from './../src/components/atomic/Icons/Icons'
import {
  CogIcon,
  HomeIcon,
  DocumentIcon,
  PackageIcon,
  TagIcon,
  ImageIcon,
  PresentationIcon,
  BooksIcon,
  ComponentIcon,
} from '@sanity/icons'

export const myStructure = (S) =>
  S.list()
    .title('Base')
    .items([
      // S.listItem()
      //   .title('Settings')
      //   .icon(CogIcon)
      //   .child(
      //     S.list()
      //       // Sets a title for our new list
      //       .title('Settings Documents')
      //       // Add items to the array
      //       // Each will pull one of our new singletons
      //       .items([
      //         S.listItem()
      //           .title('Metadata')
      //           .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      //         S.listItem()
      //           .title('Site Colors')
      //           .child(S.document().schemaType('colors').documentId('colors')),
      //         S.listItem()
      //           .title('Main Navigation')
      //           .child(S.document().schemaType('navigation').documentId('navigation')),
      //       ]),
      //   ),

      // Pages Group
      S.listItem()
        .title('Pages')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .schemaType('homepage')
                .icon(HomeIcon)
                .child(S.documentTypeList('homepage').title('Home Page')),

              S.listItem()
                .title('Landing Pages')
                .schemaType('landingPage')
                .icon(ImageIcon)
                .child(S.documentTypeList('landingPage').title('Landing Pages')),

              S.listItem()
                .title('Campaign Pages')
                .schemaType('campaign')
                .icon(PresentationIcon)
                .child(S.documentTypeList('campaign').title('Campaign Pages')),
            ]),
        ),

      // Products Group
      S.listItem()
        .title('Products')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Products')
            .items([
              S.listItem()
                .title('Products')
                .schemaType('product')
                .icon(PackageIcon)
                .child(S.documentTypeList('product').title('Products')),

              S.listItem()
                .title('Variants')
                .schemaType('variant')
                .icon(TagIcon)
                .child(S.documentTypeList('variant').title('Variants')),
            ]),
        ),

      // Exclude Singletons and Duplicates from the Main List
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteSettings',
            'colors',
            'navigation',
            'product',
            'variant',
            'campaign',
            'homepage',
            'landingPage',
          ].includes(listItem.getId()),
      ),
      // AI Context
      // S.listItem()
      //   .title('AI Tools')
      //   .schemaType('aiContext')
      //   .child(S.documentTypeList('AI context').title('AI Context')),
    ])
