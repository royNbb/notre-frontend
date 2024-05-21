import { Category } from "./category";
import { Tag } from "./tag";
import { User } from "./user";

export interface Material {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  owner: User;
  categories: Category[];
  tags: Tag[];
  createdAt: number;
  updatedAt: number;
}

export interface Materials {
  data: Material[];
}

export interface UploadedMaterial {
  fileUrl: string;
  contentType: string;
}
