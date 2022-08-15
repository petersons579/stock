import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import AlterPasswordService from '../../../services/AlterPasswordService';

export default class PasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { password, old_password, confirm_password } = request.body;

    const alterPassword = new AlterPasswordService();

    const result = await alterPassword.execute({
      id,
      confirm_password,
      old_password,
      password,
    });

    return response.json(instanceToInstance(result));
  }
}
