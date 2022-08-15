import { getCustomRepository } from 'typeorm';
import { IProduct, IUpdateProduct } from '../models';
import AppError from '../../../shared/errors/AppError';
import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

export default class UpdateProductService {
  public async execute({
    active,
    description,
    id,
    minimum,
    barcode,
    unity,
  }: IUpdateProduct): Promise<IProduct> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findById(id);

    if (!product) throw new AppError('Produto não encontrado');

    product.active = active ?? product.active;
    product.barcode = barcode ?? product.barcode;
    product.description = description;
    product.minimum = minimum;
    product.unity = unity ?? product.unity;

    await productRepository.save(product);

    return product;
  }
}
