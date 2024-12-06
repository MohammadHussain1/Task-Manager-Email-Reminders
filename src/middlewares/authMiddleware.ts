import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

interface JwtPayload {
  id: string;
}

export interface CustomRequest extends Request {
  user?: any
}
const authMiddleware = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];  
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      req.user = await User.findById(decoded.id).select('-password');
      next();  
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

export { authMiddleware };
