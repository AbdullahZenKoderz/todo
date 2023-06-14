import { UserEntity } from 'src/Modules/Users/Entity/user.entity';
import { TODO_STATUS } from 'src/Utilities/types';

export interface RegisterTodo {
  name: string;
  description: string;
  assinged_to?: UserEntity[];
  status: string;
  createdAt: Date;
  createdBy: UserEntity
}
