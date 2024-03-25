import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class Common {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @Exclude()
  @VersionColumn({ name: 'version', default: 0 })
  version: number;
}
