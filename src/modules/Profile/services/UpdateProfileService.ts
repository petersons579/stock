import { getCustomRepository } from 'typeorm';
import { IProfile, IProfileUpdate } from '../models';
import AppError from '../../../shared/errors/AppError';
import Profilerepository from '../infra/typeorm/repositories/ProfileRepository';

export default class UpdateProfileService {
  public async execute({
    active,
    description,
    id,
    admin,
    app,
    employee,
    manager,
    plataform,
  }: IProfileUpdate): Promise<IProfile> {
    const profileRepository = getCustomRepository(Profilerepository);

    const profile = await profileRepository.findById(id);

    if (!profile) throw new AppError('Perfil não encontrado');

    if (!admin && !manager && !employee)
      throw new AppError(
        'Selecione um dos campos (Administrador ou Gerente ou Empregado)',
      );

    if (!plataform && !app)
      throw new AppError('Selecione um dos campos (Plataforma ou Aplicativo)');

    profile.active = active;
    profile.admin = admin ?? profile.admin;
    profile.app = app ?? profile.app;
    profile.description = description;
    profile.employee = employee ?? profile.employee;
    profile.manager = manager ?? profile.manager;
    profile.plataform = plataform ?? profile.plataform;

    await profileRepository.save(profile);

    return profile;
  }
}
