import { getCustomRepository } from 'typeorm';
import { IFilterResponse } from '../models';
import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

export default class FilterProductService {
  public async execute(): Promise<IFilterResponse[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.filter();

    return products;
  }
}
