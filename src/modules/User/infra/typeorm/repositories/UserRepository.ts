import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';
import { IFilter, IPaginate, IUser, IFilterResponse } from '../../../models';
import Profile from '../../../../Profile/infra/typeorm/entities/Profile';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.findOne({ where: { id }, relations: ['profile'] });

    return user;
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { login },
      relations: ['profile'],
    });

    return user;
  }

  public async findAllPaginate({
    active,
    filter,
    page,
    per_page,
  }: IFilter): Promise<IPaginate> {
    const query = this.createQueryBuilder('user')
      .select([
        'user.id as id',
        'user.active as active',
        'user.name as name',
        'user.login as login',
        'user.id_profile as id_profile',
        'profile.description as perfil',
        'DATE_FORMAT(user.created_at,"%d/%m/%Y %H:%i") as created_at',
        'DATE_FORMAT(user.updated_at,"%d/%m/%Y %H:%i") as updated_at',
      ])
      .innerJoin(Profile, 'profile', 'user.id_profile = profile.id')
      .limit(per_page)
      .offset((page - 1) * per_page);

    if (active !== undefined)
      query.where('user.active = :active', {
        active,
      });

    if (active !== undefined && filter) {
      query.andWhere('(user.name LIKE :filter OR user.login LIKE :filter)', {
        filter: `%${filter}%`,
      });
    } else if (filter) {
      query.where('(user.name LIKE :filter OR user.login LIKE :filter)', {
        filter: `%${filter}%`,
      });
    }

    const total = await query.getCount();
    const { raw } = await query.getRawAndEntities();

    return {
      total,
      data: raw,
    };
  }

  public async filter(): Promise<IFilterResponse[]> {
    const { raw } = await this.createQueryBuilder('user')
      .select(['id', 'name'])
      .where('active = 1')
      .getRawAndEntities();

    return raw;
  }
}
