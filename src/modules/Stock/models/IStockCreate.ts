enum StockType {
  ENT = 'entrance',
  EXIT = 'exit',
}

export interface IStockCreate {
  quantity: number;
  type: StockType;
  id_user: string;
  id_product: string;
}
