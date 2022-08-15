import { getCustomRepository } from 'typeorm';
import { IStockCreate, IStock } from '../models';
import StockRepository from '../infra/typeorm/repositories/StockRepository';

export default class CreateStockService {
  public async execute({
    id_product,
    id_user,
    quantity,
    type,
  }: IStockCreate): Promise<IStock> {
    const stockRepository = getCustomRepository(StockRepository);

    const stock = stockRepository.create({
      id_product,
      id_user,
      type,
      quantity,
    });

    await stockRepository.save(stock);

    return stock;
  }
}
