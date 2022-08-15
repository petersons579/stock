export interface IProduct {
  id: string;
  active: boolean;
  description: string;
  minimum: number;
  barcode: string;
  unity: string;
  created_at?: Date;
  updated_at?: Date;
}
