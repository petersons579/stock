import { getCustomRepository } from 'typeorm';
import { IFilterResponse } from '../models';
import Profilerepository from '../infra/typeorm/repositories/ProfileRepository';

export default class FilterProfileService {
  public async execute(): Promise<IFilterResponse[]> {
    const profileRepository = getCustomRepository(Profilerepository);

    const profiles = await profileRepository.filter();

    return profiles;
  }
}
