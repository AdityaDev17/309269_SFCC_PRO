export default {
  name: 'variant',
  title: 'Variant',
  type: 'document',
  fields: [
    { name: 'sku', type: 'string', title: 'SKU', readOnly: true},
    { name: 'productId', type: 'string', title: 'Variant ID' , readOnly: true},
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'categoryId', type: 'string', title: 'Category ID', readOnly: true },
    { name: 'price', type: 'number', title: 'Price', readOnly: true },
    { name: 'currency', type: 'string', title: 'Currency', readOnly: true },
    { name: 'isOnline', type: 'boolean', title: 'Is Online?' },
    { name: 'productKind', type: 'string', title: 'Product Kind', initialValue: 'variant', readOnly: true },
    { name: 'variationAttributes', type: 'array', of: [{ type: 'string' }], title: 'Variation Attributes',readOnly: true },
    { name: 'size', type: 'string', title: 'Size' , readOnly: true },
    { name: 'colorHex', type: 'string', title: 'Color Hex' },
    {
      name: 'parentProduct',
      title: 'Parent Product',
      type: 'reference',
      to: [{ type: 'product' }], 
      readOnly: true,
    },
    { name: 'lastModified', type: 'datetime', title: 'Last Modified' },
    { name: 'importedAt', type: 'datetime', title: 'Imported At' },
  ],
};