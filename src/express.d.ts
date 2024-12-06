import { User } from '../models/userModel';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
