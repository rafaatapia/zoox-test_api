import {
  ObjectID,
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Estado from '@modules/estados/infra/typeorm/schemas/Estado';
import { ObjectId } from 'mongodb';

@Entity('cidades')
class Cidade {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Exclude()
  estadoId: ObjectId;

  estado: Estado;

  @Column()
  nome: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Cidade;
