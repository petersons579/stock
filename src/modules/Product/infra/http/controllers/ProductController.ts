import { Request, Response } from 'express';
import ListProductService from '../../../services/ListProductService';
import ShowProductService from '../../../services/ShowProductService';
import CreateProductService from '../../../services/CreateProductService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const active = request.query.active as string;
    const filter = request.query.filter as string;
    const page = request.query.page as string;
    const per_page = request.query.per_page as string;

    const listService = new ListProductService();

    const results = await listService.execute({
      active,
      filter,
      page: Number(page),
      per_page: Number(per_page),
    });

    return response.json(results);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showService = new ShowProductService();

    const results = await showService.execute(id);

    return response.json(results);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { active, description, minimum, barcode, unity } = request.body;

    const createService = new CreateProductService();

    const results = await createService.execute({
      active,
      description,
      minimum,
      barcode,
      unity,
    });

    return response.json(results);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { active, description, minimum, barcode, unity } = request.body;

    const updateService = new UpdateProductService();

    const results = await updateService.execute({
      id,
      active,
      description,
      minimum,
      barcode,
      unity,
    });

    return response.json(results);
  }
}
