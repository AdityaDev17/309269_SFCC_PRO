// schemas/product.ts
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'sku', title: 'SKU', type: 'string', validation: Rule => Rule.required() },
    { name: 'productId', title: 'Product ID', type: 'string', validation: Rule => Rule.required() },
    { name: 'title', title: 'Product Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'category', title: 'Category', type: 'string' }, 
    { name: 'price', title: 'Price', type: 'number', validation: Rule => Rule.required() },
    { name: 'currency', title: 'Currency', type: 'string' },
    { name: 'orderable', title: 'Orderable/In Stock', type: 'boolean' },
    { name: 'variants', title: 'Variants', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true, },},
    { name: 'lastModified', title: 'Last Modified Date', type: 'datetime' },
    { name: 'importedAt', title: 'Imported At', type: 'datetime', readOnly: true },
  ],
};
