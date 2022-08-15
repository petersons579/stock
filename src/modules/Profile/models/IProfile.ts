export interface IProfile {
  id: string;
  active: boolean;
  description: string;
  admin: boolean;
  manager: boolean;
  employee: boolean;
  plataform: boolean;
  app: boolean;
  created_at?: Date;
  updated_at?: Date;
}
