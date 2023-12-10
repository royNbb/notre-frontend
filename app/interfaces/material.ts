import { Categories } from "./category";
import { Tags } from "./tag";
import { User } from "./user";

export interface Material {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  owner: User;
  categories: Categories;
  tags: Tags[];
  createdAt: number;
  updatedAt: number;
}

export interface Materials {
  data: Material[];
}
