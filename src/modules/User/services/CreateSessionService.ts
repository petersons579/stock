import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { ISession, ISessionRequest } from '../models';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

export default class CreateSessionService {
  public async execute({
    login,
    password,
    device,
  }: ISessionRequest): Promise<ISession> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByLogin(login);

    if (!user) throw new AppError('Email ou senha incorretos.');

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError('Email ou senha incorretos.');

    if (!user.active) throw new AppError('Usuário desabilitado.');

    if (device === 'web' && !user.profile.plataform)
      throw new AppError('Usuário não tem permissão de acesso a plataforma');

    if (device === 'mobile' && !user.profile.app)
      throw new AppError('Usuário não tem permissão de acesso ao aplicativo');

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
