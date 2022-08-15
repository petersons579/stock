import { getCustomRepository } from 'typeorm';
import { IStock, IStockUpdate } from '../models';
import AppError from '../../../shared/errors/AppError';
import StockRepository from '../infra/typeorm/repositories/StockRepository';

export default class UpdateStockService {
  public async execute({
    id,
    id_product,
    id_user,
    quantity,
    type,
  }: IStockUpdate): Promise<IStock> {
    const stockRepository = getCustomRepository(StockRepository);

    const stock = await stockRepository.findById(id);

    if (!stock) throw new AppError('Estoque não encontrado');

    stock.id_product = id_product;
    stock.id_user = id_user;
    stock.quantity = quantity;
    stock.type = type;

    await stockRepository.save(stock);

    return stock;
  }
}
