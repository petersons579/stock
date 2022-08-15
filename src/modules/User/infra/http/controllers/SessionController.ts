import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateSessionService from '../../../services/CreateSessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password, device } = request.body;

    const createService = new CreateSessionService();

    const result = await createService.execute({
      login,
      password,
      device,
    });

    return response.json(instanceToInstance(result));
  }
}
