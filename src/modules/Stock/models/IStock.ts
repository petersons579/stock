enum StockType {
  ENT = 'entrance',
  EXIT = 'exit',
}

export interface IStock {
  id: string;
  quantity: number;
  type: StockType;
  id_user: string;
  id_product: string;
  created_at?: Date;
  updated_at?: Date;
}
