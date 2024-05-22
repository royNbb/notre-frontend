import { CategoriesByTypeAndLetter, Categories } from "../interfaces/category";

export const splitCategoriesByTypeAndLetter = (
  categories: Categories
): CategoriesByTypeAndLetter => {
  return categories.data.reduce((result, category) => {
    const type = category.type;
    const firstLetter = category.name.charAt(0).toUpperCase();

    if (!result[type]) {
      result[type] = {};
    }

    if (!result[type][firstLetter]) {
      result[type][firstLetter] = [];
    }

    result[type][firstLetter].push(category);
    result[type][firstLetter] = result[type][firstLetter].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return result;
  }, {} as CategoriesByTypeAndLetter);
};
