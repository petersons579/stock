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
    id_user,
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
      .orderBy('stock.created_at', 'DESC')
      .limit(per_page)
      .offset((page - 1) * per_page);

    if (filter)
      query.where(
        '(product.description LIKE :filter OR us.name LIKE :filter)',
        { filter: `%${filter}%` },
      );

    if (filter && id_user) {
      query.andWhere('stock.id_user = :id_user', { id_user });
    } else if (id_user) {
      query.where('stock.id_user = :id_user', { id_user });
    }

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

  public async lastStocks(): Promise<any> {
    const { raw } = await this.createQueryBuilder('st')
      .select([
        'st.id AS id',
        'st.quantity AS quantity',
        'pr.description AS product',
        'us.name AS user',
        'case when st.type = "entrance" then "entrada" when st.type = "exit" then "saída" END AS type',
      ])
      .innerJoin(Product, 'pr', 'st.id_product = pr.id')
      .innerJoin(User, 'us', 'st.id_user = us.id')
      .where('DATE(st.created_at) = CURDATE()')
      .getRawAndEntities();

    return raw;
  }

  public async listTotal(): Promise<any> {
    const entrances = await this.createQueryBuilder('stock')
      .select(['SUM(quantity) AS total', 'created_at as created_date'])
      .where('created_at >= DATE_SUB(NOW(),INTERVAL 31 DAY)')
      .andWhere('type = "entrance"')
      .groupBy('DATE(created_at)')
      .getRawAndEntities();

    const exits = await this.createQueryBuilder('stock')
      .select(['SUM(quantity) AS total', 'created_at as created_date'])
      .where('created_at >= DATE_SUB(NOW(),INTERVAL 31 DAY)')
      .andWhere('type = "exit"')
      .groupBy('DATE(created_at)')
      .getRawAndEntities();

    return {
      entrances: entrances.raw,
      exits: exits.raw,
    };
  }
}
