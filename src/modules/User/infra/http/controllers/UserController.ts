import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import ListUserService from '../../../services/ListUserService';
import ShowUserService from '../../../services/ShowUserService';
import CreateUserService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const active = request.query.active as string;
    const filter = request.query.filter as string;
    const page = request.query.page as string;
    const per_page = request.query.per_page as string;

    const listService = new ListUserService();

    const result = await listService.execute({
      active,
      filter,
      page: Number(page),
      per_page: Number(per_page),
    });

    return response.json(instanceToInstance(result));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showService = new ShowUserService();

    const result = await showService.execute(id);

    return response.json(instanceToInstance(result));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { login, name, active, id_profile } = request.body;

    const createService = new CreateUserService();

    const result = await createService.execute({
      login,
      active,
      id_profile,
      name,
    });

    return response.json(instanceToInstance(result));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { login, name, active, id_profile } = request.body;

    const updateService = new UpdateUserService();

    const result = await updateService.execute({
      id,
      login,
      active,
      id_profile,
      name,
    });

    return response.json(instanceToInstance(result));
  }
}
