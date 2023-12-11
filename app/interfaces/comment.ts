import { User } from "./user";
import { Material } from "./material";

export interface Comment {
  id: number;
  content: string;
  owner: User;
  material: Material; // Reference to the Material object
  createdAt: number;
  updatedAt: number;
}

export interface Comments {
  data: Comment[];
}