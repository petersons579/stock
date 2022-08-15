import { Request, Response } from 'express';
import ListStockService from '../../../services/ListStockService';
import ShowStockService from '../../../services/ShowStockService';
import CreateStockService from '../../../services/CreateStockService';
import UpdateStockService from '../../../services/UpdateStockService';

export default class StockController {
  public async index(request: Request, response: Response): Promise<Response> {
    const filter = request.query.filter as string;
    const page = request.query.page as string;
    const per_page = request.query.per_page as string;

    const listService = new ListStockService();

    const results = await listService.execute({
      filter,
      page: Number(page),
      per_page: Number(per_page),
    });

    return response.json(results);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showService = new ShowStockService();

    const results = await showService.execute(id);

    return response.json(results);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const id_user = request.user.id;
    const { quantity, type, id_product } = request.body;

    const createService = new CreateStockService();

    const results = await createService.execute({
      id_product,
      id_user,
      quantity,
      type,
    });

    return response.json(results);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id_user = request.user.id;
    const { id } = request.params;
    const { quantity, type, id_product } = request.body;

    const updateService = new UpdateStockService();

    const results = await updateService.execute({
      id,
      id_product,
      id_user,
      quantity,
      type,
    });

    return response.json(results);
  }
}
