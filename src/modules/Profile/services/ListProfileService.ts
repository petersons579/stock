import { getCustomRepository } from 'typeorm';
import { IPaginate, IFilter } from '../models';
import Profilerepository from '../infra/typeorm/repositories/ProfileRepository';

export default class ListProfileService {
  public async execute({
    page,
    per_page,
    filter,
    active,
  }: IFilter): Promise<IPaginate> {
    const profileRepository = getCustomRepository(Profilerepository);

    const profiles = await profileRepository.findAllPaginate({
      page,
      per_page,
      filter,
      active,
    });

    return profiles;
  }
}
