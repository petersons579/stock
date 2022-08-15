import { EntityRepository, Repository } from 'typeorm';
import Profile from '../entities/Profile';
import { IPaginate, IProfile, IFilter } from 'src/modules/Profile/models';

@EntityRepository(Profile)
export default class Profilerepository extends Repository<Profile> {
  public async findAllPaginate({
    page,
    per_page,
    filter,
    active,
  }: IFilter): Promise<IPaginate> {
    const query = this.createQueryBuilder('profile')
      .select([
        'profile.id as id',
        'profile.active as active',
        'profile.description as description',
        'profile.admin as admin',
        'profile.manager as manager',
        'profile.employee as employee',
        'profile.plataform as plataform',
        'profile.app as app',
        'DATE_FORMAT(profile.created_at,"%d/%m/%Y %H:%i") as created_at',
        'DATE_FORMAT(profile.updated_at,"%d/%m/%Y %H:%i") as updated_at',
      ])
      .limit(per_page)
      .offset((page - 1) * per_page);

    if (filter)
      query.where('description LIKE :filter', {
        filter: `%${filter}%`,
      });

    if (filter && active !== undefined) {
      query.andWhere('active = :active', { active });
    } else if (active !== undefined) {
      query.where('active = :active', { active });
    }

    const total = await query.getCount();
    const { raw } = await query.getRawAndEntities();

    return {
      total,
      data: raw,
    };
  }

  public async findById(id: string): Promise<IProfile | undefined> {
    const profile = await this.findOne({ where: { id } });

    return profile;
  }
}
