export interface Categories {
  data: Category[];
}

export interface Category {
  id: number;
  name: string;
  type: string;
}

export interface CategoriesByLetter {
  [letter: string]: Category[];
}
