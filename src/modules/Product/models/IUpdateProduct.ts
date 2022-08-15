export interface IUpdateProduct {
  id: string;
  active: boolean;
  description: string;
  minimum: number;
  barcode?: string;
  unity?: string;
}
