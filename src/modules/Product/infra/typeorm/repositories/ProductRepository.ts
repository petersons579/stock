import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';
import { IPaginate, IProduct, IFilter } from '../../../models';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findAllPaginate({
    active,
    filter,
    page,
    per_page,
  }: IFilter): Promise<IPaginate> {
    const query = this.createQueryBuilder('product')
      .select([
        'product.id as id',
        'product.active as active',
        'product.description as description',
        'product.minimum as minimum',
        'product.barcode as barcode',
        'product.unity as unity',
        'count_stock(product.id) as stock',
        'DATE_FORMAT(product.created_at,"%d/%m/%Y %H:%i") as created_at',
        'DATE_FORMAT(product.updated_at,"%d/%m/%Y %H:%i") as updated_at',
      ])
      .limit(per_page)
      .offset((page - 1) * per_page);

    if (active !== undefined) query.where('active = :active', { active });

    if (active !== undefined && filter) {
      query.andWhere('(description LIKE :filter OR barcode LIKE :filter)', {
        filter: `%${filter}%`,
      });
    } else if (filter) {
      query.where('(description LIKE :filter OR barcode LIKE :filter)', {
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

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = await this.findOne({ where: { id } });

    return product;
  }

  public async listLowStock(): Promise<any> {
    const products = await this.query(`SELECT pr.id, pr.description, pr.minimum,
    (SELECT SUM(st.quantity) AS quantity FROM stocks AS st WHERE  st.type = 'entrance' AND st.id_product = pr.id GROUP BY st.id_product) -
    (SELECT SUM(st.quantity) AS quantity FROM stocks AS st WHERE  st.type = 'exit' AND st.id_product = pr.id GROUP BY st.id_product) AS stock
    FROM products AS pr WHERE (SELECT SUM(st.quantity) AS quantity FROM stocks AS st WHERE  st.type = 'entrance' AND st.id_product = pr.id GROUP BY st.id_product) -
    (SELECT SUM(st.quantity) AS quantity FROM stocks AS st WHERE  st.type = 'exit' AND st.id_product = pr.id GROUP BY st.id_product) < pr.minimum;`);

    return products;
  }

  public async verifyStock(id: string): Promise<IProduct | undefined> {
    const product = await this.createQueryBuilder('pr')
      .where('id = :id', {
        id,
      })
      .andWhere('count_stock(pr.id) < pr.minimum')
      .getOne();

    return product;
  }
}
