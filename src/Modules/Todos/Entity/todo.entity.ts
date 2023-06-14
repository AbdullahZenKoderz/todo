import { UserEntity } from 'src/Modules/Users/Entity/user.entity';
import { TODO_STATUS, USER_STATUS } from 'src/Utilities/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TODO_STATUS,
    default: TODO_STATUS.PENDING,
  })
  status: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: 'CASCADE' })
  assinged_to: UserEntity;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;
}


