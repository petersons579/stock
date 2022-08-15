import { getCustomRepository } from 'typeorm';
import { IUser } from '../models';
import AppError from '../../../shared/errors/AppError';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

export default class ShowUserService {
  public async execute(id: string): Promise<IUser> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado');

    delete user.created_at;
    delete user.updated_at;

    return user;
  }
}
