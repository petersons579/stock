import { getCustomRepository } from 'typeorm';
import { IFilterResponse } from '../models';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

export default class FilterUserService {
  public async execute(): Promise<IFilterResponse[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.filter();

    return users;
  }
}
