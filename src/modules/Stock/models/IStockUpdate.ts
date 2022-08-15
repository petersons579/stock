enum StockType {
  ENT = 'entrance',
  EXIT = 'exit',
}

export interface IStockUpdate {
  id: string;
  quantity: number;
  type: StockType;
  id_user: string;
  id_product: string;
}
