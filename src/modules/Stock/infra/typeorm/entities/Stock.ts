import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../../../../User/infra/typeorm/entities/User';
import Product from '../../../../Product/infra/typeorm/entities/Product';

enum StockType {
  ENT = 'entrance',
  EXIT = 'exit',
}

@Entity('stocks')
export default class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  quantity: number;

  @Column({
    type: 'enum',
    enum: StockType,
  })
  type: StockType;

  @Column()
  id_user: string;

  @Column()
  id_product: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
