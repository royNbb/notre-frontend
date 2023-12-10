import { CategoriesByLetter, Categories } from "../interfaces/category";

export const splitCategoriesByLetter = (
  categories: Categories
): CategoriesByLetter => {
  return categories.data.reduce((result, category) => {
    const firstLetter = category.name.charAt(0).toUpperCase();

    if (!result[firstLetter]) {
      result[firstLetter] = [];
    }

    result[firstLetter].push(category);
    result[firstLetter] = result[firstLetter].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return result;
  }, {} as CategoriesByLetter);
};
