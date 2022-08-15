import { getCustomRepository } from 'typeorm';
import { IUser, IUserUpdate } from '../models';
import AppError from '../../../shared/errors/AppError';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

export default class UpdateUserService {
  public async execute({
    id,
    active,
    id_profile,
    login,
    name,
  }: IUserUpdate): Promise<IUser> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado');

    const verifyLogin = await userRepository.findByLogin(login);

    if (verifyLogin && user.id !== verifyLogin.id)
      throw new AppError('Login já existe');

    user.active = active ?? user.active;
    user.id_profile = id_profile;
    user.login = login;
    user.name = name;

    await userRepository.save(user);

    return user;
  }
}
