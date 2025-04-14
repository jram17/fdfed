// src/types/express/index.d.ts

import { Language, User } from "../custom";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      id: string;
      isAdmin: boolean;
      userDetails: {
        username: string;
        email: string;
      };
    }
  }
}
