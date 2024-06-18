import { CategoriesByTypeAndLetter, CategoriesByLetter, Categories } from "../interfaces/category";


export const splitCategoriesByTypeAndLetter = (
  categories: Categories
): CategoriesByTypeAndLetter => {
  // Sort categories alphabetically by name first
  const sortedCategories = categories.data.sort((a, b) => a.name.localeCompare(b.name));

  const result = sortedCategories.reduce((result, category) => {
    const type = category.type;
    const firstLetter = category.name.charAt(0).toUpperCase();

    if (!result[type]) {
      result[type] = {};
    }

    if (!result[type][firstLetter]) {
      result[type][firstLetter] = [];
    }

    result[type][firstLetter].push(category);

    return result;
  }, {} as CategoriesByTypeAndLetter);

  // Sort each group again to ensure they are alphabetically ordered
  for (const type in result) {
    for (const letter in result[type]) {
      result[type][letter].sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return result;
};

export const splitCategoriesByLetter = (
  categories: Categories
): CategoriesByLetter => {
  // Sort categories alphabetically by name first
  const sortedCategories = categories.data.sort((a, b) => a.name.localeCompare(b.name));

  const result = sortedCategories.reduce((result, category) => {
    const firstLetter = category.name.charAt(0).toUpperCase();

    if (!result[firstLetter]) {
      result[firstLetter] = [];
    }

    result[firstLetter].push(category);

    return result;
  }, {} as CategoriesByLetter);

  // Sort each group again to ensure they are alphabetically ordered
  for (const letter in result) {
    result[letter].sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
};
