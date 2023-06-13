import * as bcrypt from 'bcrypt';

export function encodePassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}
