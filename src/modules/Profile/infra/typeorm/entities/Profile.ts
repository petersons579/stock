import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export default class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('tinyint')
  active: boolean;

  @Column()
  description: string;

  @Column('tinyint')
  admin: boolean;

  @Column('tinyint')
  manager: boolean;

  @Column('tinyint')
  employee: boolean;

  @Column('tinyint')
  plataform: boolean;

  @Column('tinyint')
  app: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
