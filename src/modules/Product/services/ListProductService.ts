import { getCustomRepository } from 'typeorm';
import { IFilter, IPaginate } from '../models';
import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

export default class ListProductService {
  public async execute({
    active,
    filter,
    page,
    per_page,
  }: IFilter): Promise<IPaginate> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.findAllPaginate({
      active,
      filter,
      page,
      per_page,
    });

    return products;
  }
}
