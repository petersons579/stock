export interface IProfileUpdate {
  id: string;
  active: boolean;
  description: string;
  admin?: boolean;
  manager?: boolean;
  employee?: boolean;
  plataform?: boolean;
  app?: boolean;
}
