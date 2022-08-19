import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { IPassword, IUser } from '../models';
import AppError from '../../../shared/errors/AppError';

import UserRepository from '../infra/typeorm/repositories/UserRepository';

export default class AlterPasswordService {
  public async execute({
    confirm_password,
    id,
    password,
  }: IPassword): Promise<IUser> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado');

    if (password !== confirm_password)
      throw new AppError(
        'Informe a mesma senha no campo nova senha e confirmação de senha.',
      );

    const hashPassword = await hash(password, 8);

    user.password = hashPassword;
    user.first_acess = false;

    userRepository.save(user);

    return user;
  }
}
