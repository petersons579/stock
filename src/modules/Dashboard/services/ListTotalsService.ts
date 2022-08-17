import { getCustomRepository } from 'typeorm';
import StockRepository from '../../Stock/infra/typeorm/repositories/StockRepository';

export default class ListTotalsService {
  public async execute(): Promise<any> {
    const stockRepository = getCustomRepository(StockRepository);

    const stocks = stockRepository.listTotal();

    return stocks;
  }
}
