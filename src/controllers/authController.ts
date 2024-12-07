import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../utils/tokenUtils';
import bcrypt from 'bcryptjs';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const userExists = await User.findOne({ username }) || await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with that username or email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
    email,
  });

  if (user) {
    res.status(201).json({
      message: 'User registered successfully',
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id as string),  
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      message: 'User logged in successfully',
      _id: user._id,
      username: user.username,
      token: generateToken(user._id as string),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

export { registerUser, loginUser };
