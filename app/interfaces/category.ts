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

export interface CategoriesByTypeAndLetter {
  [type: string]: {
    [letter: string]: Category[];
  };
}