import { EntityRepository, Repository } from 'typeorm';
import Stock from '../entities/Stock';
import { IPaginate, IStock, IFilter } from '../../../models';
import User from '../../../../User/infra/typeorm/entities/User';
import Product from '../../../../Product/infra/typeorm/entities/Product';

@EntityRepository(Stock)
export default class StockRepository extends Repository<Stock> {
  public async findAllPaginate({
    page,
    per_page,
    filter,
  }: IFilter): Promise<IPaginate> {
    const query = this.createQueryBuilder('stock')
      .select([
        'stock.id as id',
        'stock.quantity as quantity',
        'stock.type as type',
        'stock.id_user as id_user',
        'stock.id_product as id_product',
        'us.name as user',
        'product.description as product',
        'DATE_FORMAT(stock.created_at,"%d/%m/%Y %H:%i") as created_at',
        'DATE_FORMAT(stock.updated_at,"%d/%m/%Y %H:%i") as updated_at',
      ])
      .innerJoin(User, 'us', 'stock.id_user = us.id')
      .innerJoin(Product, 'product', 'stock.id_product = product.id')
      .limit(per_page)
      .offset((page - 1) * per_page);

    if (filter)
      query.where(
        '(product.description LIKE :filter OR us.name LIKE :filter)',
        { filter: `%${filter}%` },
      );

    const total = await query.getCount();
    const { raw } = await query.getRawAndEntities();

    return {
      total,
      data: raw,
    };
  }

  public async findById(id: string): Promise<IStock | undefined> {
    const stock = await this.findOne({ where: { id } });

    return stock;
  }
}
