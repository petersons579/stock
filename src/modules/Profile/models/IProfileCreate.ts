export interface IProfileCreate {
  active: boolean;
  description: string;
  admin?: boolean;
  manager?: boolean;
  employee?: boolean;
  plataform?: boolean;
  app?: boolean;
}
