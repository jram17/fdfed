import bcrypt from 'bcrypt';

const saltRounds = 10;

export const generateHash = (password: string): { salt: string; hash: string } => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return { salt, hash };
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

