import { Request, Response } from 'express';
import ListProfileService from '../../../services/ListProfileService';
import ShowProfileService from '../../../services/ShowProfileService';
import CreateProfileService from '../../../services/CreateProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';

export default class ProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const filter = request.query.filter as string;
    const active = request.query.active as string;
    const page = request.query.page as string;
    const per_page = request.query.per_page as string;

    const listService = new ListProfileService();

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

    const showService = new ShowProfileService();

    const results = await showService.execute(id);

    return response.json(results);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { active, description, admin, manager, employee, plataform, app } =
      request.body;

    const createService = new CreateProfileService();

    const results = await createService.execute({
      active,
      description,
      admin,
      app,
      employee,
      manager,
      plataform,
    });

    return response.json(results);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { active, description, admin, manager, employee, plataform, app } =
      request.body;

    const updateService = new UpdateProfileService();

    const results = await updateService.execute({
      id,
      active,
      description,
      admin,
      app,
      employee,
      manager,
      plataform,
    });

    return response.json(results);
  }
}
