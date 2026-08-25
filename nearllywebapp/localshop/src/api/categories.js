import { categoryColumns, categories } from "../data/categories";

export const fetchCategories = async () => {
  return categoryColumns;
};

export const fetchFlatCategories = async () => {
  return categories;
};

export const fetchCategoryBySlug = async (slug) => {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) throw new Error("Category not found");
  return cat;
};
