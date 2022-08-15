import { getCustomRepository } from 'typeorm';
import { IProduct, ICreateProduct } from '../models';
import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

export default class CreateProductService {
  public async execute({
    active,
    barcode,
    description,
    minimum,
    unity,
  }: ICreateProduct): Promise<IProduct> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = productRepository.create({
      active,
      barcode,
      description,
      minimum,
      unity,
    });

    await productRepository.save(product);

    return product;
  }
}
