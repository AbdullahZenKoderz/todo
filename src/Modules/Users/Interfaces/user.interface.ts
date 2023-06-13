import { USER_STATUS } from 'src/Utilities/types';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  status: USER_STATUS;
}
