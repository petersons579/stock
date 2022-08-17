import { getCustomRepository } from 'typeorm';
import ProductRepository from '../../Product/infra/typeorm/repositories/ProductRepository';

export default class LowStockService {
  public async execute(): Promise<any> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.listLowStock();

    return products;
  }
}
