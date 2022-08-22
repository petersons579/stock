import { getCustomRepository } from 'typeorm';
import { IPaginate, IFilter } from '../models';
import StockRepository from '../infra/typeorm/repositories/StockRepository';

export default class ListStockService {
  public async execute({
    page,
    per_page,
    filter,
    id_user,
  }: IFilter): Promise<IPaginate> {
    const stockRepository = getCustomRepository(StockRepository);

    const stocks = await stockRepository.findAllPaginate({
      page,
      per_page,
      filter,
      id_user,
    });

    return stocks;
  }
}
