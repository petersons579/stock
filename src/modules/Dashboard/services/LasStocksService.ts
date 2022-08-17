import { getCustomRepository } from 'typeorm';
import StockRepository from '../../Stock/infra/typeorm/repositories/StockRepository';

export default class LastStocksService {
  public async execute(): Promise<any> {
    const stockRepository = getCustomRepository(StockRepository);

    const stocks = await stockRepository.lastStocks();

    return stocks;
  }
}
