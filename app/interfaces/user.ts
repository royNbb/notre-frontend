export interface User {
  id: number;
  isSuperuser: boolean;
  email: string;
  username: string;
  name: string;
  role: string;
  isActive: boolean;
}
