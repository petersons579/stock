import { Request, Response } from 'express';
import FilterUserService from '../../../services/FilterUserService';

export default class FilterUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const filterService = new FilterUserService();

    const results = await filterService.execute();

    return response.json(results);
  }
}
