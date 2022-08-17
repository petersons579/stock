import { getCustomRepository } from 'typeorm';
import { IStockCreate, IStock } from '../models';
import AppError from '../../../shared/errors/AppError';
import StockRepository from '../infra/typeorm/repositories/StockRepository';
import ProductRepository from '../../Product/infra/typeorm/repositories/ProductRepository';

export default class CreateStockService {
  public async execute({
    id_product,
    id_user,
    quantity,
    type,
  }: IStockCreate): Promise<IStock> {
    const stockRepository = getCustomRepository(StockRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const productVerify = await productRepository.verifyStock(id_product);

    if (productVerify && type === 'exit')
      throw new AppError(
        'O produto informado está com o estoque abaixo da quantidade minima',
      );

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
