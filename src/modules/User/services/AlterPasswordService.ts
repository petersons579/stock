import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { IPassword, IUser } from '../models';
import AppError from '../../../shared/errors/AppError';

import UserRepository from '../infra/typeorm/repositories/UserRepository';

export default class AlterPasswordService {
  public async execute({
    confirm_password,
    id,
    old_password,
    password,
  }: IPassword): Promise<IUser> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado');

    const passwordConfirmed = await compare(old_password, user.password);

    if (!passwordConfirmed) throw new AppError('Senha atual está incorreta.');

    if (password !== confirm_password)
      throw new AppError(
        'Informe a mesma senha no campo nova senha e confirmação de senha.',
      );

    const hashPassword = await hash(password, 8);

    user.password = hashPassword;

    userRepository.save(user);

    return user;
  }
}
