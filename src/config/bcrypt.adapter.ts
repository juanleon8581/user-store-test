import { compareSync, genSaltSync, hash } from "bcryptjs";

export const bcryptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync();
    return hash(password, salt);
  },

  compate: (password: string, hashed: string) => {
    return compareSync(password, hashed);
  },
};
