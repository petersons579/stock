import { getCustomRepository } from 'typeorm';
import { IProfile } from '../models';
import AppError from '../../../shared/errors/AppError';
import Profilerepository from '../infra/typeorm/repositories/ProfileRepository';

export default class ShowProfileService {
  public async execute(id: string): Promise<IProfile> {
    const profileRepository = getCustomRepository(Profilerepository);

    const profile = await profileRepository.findById(id);

    if (!profile) throw new AppError('Perfil não encontrado');

    delete profile.created_at;
    delete profile.updated_at;

    return profile;
  }
}
