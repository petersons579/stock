import { getCustomRepository } from 'typeorm';
import { IProduct } from '../models';
import AppError from '../../../shared/errors/AppError';
import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

export default class ShowProductService {
  public async execute(id: string): Promise<IProduct> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findById(id);

    if (!product) throw new AppError('Produto não encontrado');

    delete product.created_at;
    delete product.updated_at;

    return product;
  }
}
