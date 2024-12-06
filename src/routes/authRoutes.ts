import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { validate } from '../middlewares/validate';
import { userRegistrationValidation, userLoginSchemaValidation } from '../validation/authValidator';

const router = express.Router();

router.post('/register',validate(userRegistrationValidation),registerUser);
router.post('/login',validate(userLoginSchemaValidation),loginUser);

export default router;
