import { Request, Response } from 'express';
import FilterProfileService from '../../../services/FilterProfileService';

export default class FilterProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const filterService = new FilterProfileService();

    const results = await filterService.execute();

    return response.json(results);
  }
}
