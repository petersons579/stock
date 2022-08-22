import { Request, Response } from 'express';
import FilterProductService from '../../../services/FilterProductService';

export default class FilterProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const filterService = new FilterProductService();

    const results = await filterService.execute();

    return response.json(results);
  }
}
