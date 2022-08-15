import { getCustomRepository } from 'typeorm';
import { IProfileCreate, IProfile } from '../models';
import AppError from '../../../shared/errors/AppError';
import Profilerepository from '../infra/typeorm/repositories/ProfileRepository';

export default class CreateProfileService {
  public async execute({
    active,
    description,
    admin,
    app,
    employee,
    manager,
    plataform,
  }: IProfileCreate): Promise<IProfile> {
    const profileRepository = getCustomRepository(Profilerepository);

    if (!admin && !manager && !employee)
      throw new AppError(
        'Selecione um dos campos (Administrador ou Gerente ou Empregado)',
      );

    if (!plataform && !app)
      throw new AppError('Selecione um dos campos (Plataforma ou Aplicativo)');

    const profile = profileRepository.create({
      active,
      admin,
      app,
      description,
      employee,
      manager,
      plataform,
    });

    await profileRepository.save(profile);

    return profile;
  }
}
