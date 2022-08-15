import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { IUser, IUserCreate } from '../models';
import AppError from '../../../shared/errors/AppError';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

export default class CreateUserService {
  public async execute({
    active,
    id_profile,
    login,
    name,
  }: IUserCreate): Promise<IUser> {
    const userRepository = getCustomRepository(UserRepository);
    const verifyLogin = await userRepository.findByLogin(login);

    if (verifyLogin) throw new AppError('Login já existe');

    const hashPassword = await hash('123456', 8);

    const user = userRepository.create({
      active,
      id_profile,
      login,
      name,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
