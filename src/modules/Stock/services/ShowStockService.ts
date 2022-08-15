import { getCustomRepository } from 'typeorm';
import { IStock } from '../models';
import AppError from '../../../shared/errors/AppError';
import StockRepository from '../infra/typeorm/repositories/StockRepository';

export default class ShowStockService {
  public async execute(id: string): Promise<IStock> {
    const stockRepository = getCustomRepository(StockRepository);

    const stock = await stockRepository.findById(id);

    if (!stock) throw new AppError('Estoque não encontrado');

    delete stock.created_at;
    delete stock.updated_at;

    return stock;
  }
}
