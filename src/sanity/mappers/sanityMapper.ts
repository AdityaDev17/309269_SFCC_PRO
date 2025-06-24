// Raw Sanity types from GROQ query (optional typing can be improved further)
interface RawFaqItem {
  question: string;
  answer: string;
  slug: { current: string };
  category: {
    title: string;
    slug: { current: string };
  };
}

interface RawFaqCategory {
  _id: string;
  title: string;
  slug: { current: string };
  icon?: string;
  faqs: RawFaqItem[];
}

// Mapped types (frontend-friendly)
interface MappedFaqItem {
  question: string;
  answer: string;
  slug: string;
  categoryTitle: string;
  categorySlug: string;
}

interface MappedFaqCategory {
  id: string;
  title: string;
  slug: string;
  icon?: string;
  faqs: MappedFaqItem[];
}

export const sanityMapper = {
  mapFaqItem: (item: RawFaqItem): MappedFaqItem => ({
    question: item.question,
    answer: item.answer,
    slug: item.slug.current,
    categoryTitle: item.category?.title ?? "",
    categorySlug: item.category?.slug?.current ?? "",
  }),

  mapFaqCategory: (category: RawFaqCategory): MappedFaqCategory => ({
    id: category._id,
    title: category.title,
    slug: category.slug.current,
    icon: category.icon,
    faqs: category.faqs.map((faq) => sanityMapper.mapFaqItem(faq)),
  }),
};
