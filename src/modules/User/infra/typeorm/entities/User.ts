import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Profile from '../../../../Profile/infra/typeorm/entities/Profile';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('tinyint')
  active: boolean;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  id_profile: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'id_profile' })
  profile: Profile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
