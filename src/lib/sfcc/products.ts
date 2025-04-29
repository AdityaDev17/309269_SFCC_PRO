export async function getProductsByCategory(slug: string) {
  // This should call Salesforce SDK with the slug/category ID
  // Replace this with actual SFCC logic in future
  const imagePath = "/images/perfume.svg";
  const products = [];
  for (let i = 1; i <= 31; i++) {
    products.push({
      id: String(i),
      name: `Mock Product ${i} from "${slug}"`,
      image: imagePath,
      price: 99 + i,
    });
  }
  return products;
}
