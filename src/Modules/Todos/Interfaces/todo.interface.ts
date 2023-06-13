import { TODO_STATUS } from 'src/Utilities/types';

export interface RegisterTodo {
  name: string;
  description: string;
  status: TODO_STATUS;
}
