import { Material } from "./material";

export interface History {
  id: number;
  owner: number;
  historyType: string;
  historyOf: Material;
}

export interface Histories {
  data: History[];
}
