import { getCustomRepository } from 'typeorm';
import { IFilter, IPaginate } from '../models';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

export default class ListUserService {
  public async execute({
    active,
    filter,
    page,
    per_page,
  }: IFilter): Promise<IPaginate> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.findAllPaginate({
      active,
      filter,
      page,
      per_page,
    });

    return users;
  }
}
