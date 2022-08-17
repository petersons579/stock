import { getCustomRepository } from 'typeorm';
import { IStock, IStockUpdate } from '../models';
import AppError from '../../../shared/errors/AppError';
import StockRepository from '../infra/typeorm/repositories/StockRepository';
import ProductRepository from '../../Product/infra/typeorm/repositories/ProductRepository';

export default class UpdateStockService {
  public async execute({
    id,
    id_product,
    id_user,
    quantity,
    type,
  }: IStockUpdate): Promise<IStock> {
    const stockRepository = getCustomRepository(StockRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const productVerify = await productRepository.verifyStock(id_product);

    if (productVerify && type === 'exit')
      throw new AppError(
        'O produto informado está com o estoque abaixo da quantidade minima',
      );

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
