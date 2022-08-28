import { Request, Response } from 'express';
import FilterProductService from '../../../services/FilterProductService';

export default class FilterProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const filter = request.query.filter as string;

    const filterService = new FilterProductService();

    const results = await filterService.execute(filter);

    return response.json(results);
  }
}
