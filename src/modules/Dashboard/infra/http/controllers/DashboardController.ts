import { Request, Response } from 'express';
import LowStockService from '../../../services/LowStockService';
import LastStocksService from '../../../services/LasStocksService';
import ListTotalsService from '../../../services/ListTotalsService';

export default class DashboardController {
  public async index(request: Request, response: Response): Promise<Response> {
    const lowService = new LowStockService();

    const results = await lowService.execute();

    return response.json(results);
  }

  public async last(request: Request, response: Response): Promise<Response> {
    const latService = new LastStocksService();

    const results = await latService.execute();

    return response.json(results);
  }

  public async total(request: Request, response: Response): Promise<Response> {
    const totalService = new ListTotalsService();

    const results = await totalService.execute();

    return response.json(results);
  }
}
