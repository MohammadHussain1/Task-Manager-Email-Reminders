import express from 'express';
import {
  createTodo,
  getTodosByDate,
  updateTodo,
  deleteTodo,
  markTodoCompleted,
  unmarkTodoCompleted,
  setReminder,
} from '../controllers/todoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createTodoValidation, deleteTodoValidation, getTodoByDateValidation, markTodoCompletedValidation, setReminderValidation, unmarkTodoCompletedValidation, updateTodoValidation } from '../validation/todoValidator';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.post('/', authMiddleware, validate(createTodoValidation),createTodo);
router.get('/:date', authMiddleware, validate(getTodoByDateValidation),getTodosByDate);
router.put('/:id', authMiddleware,validate(updateTodoValidation), updateTodo);
router.delete('/:id', authMiddleware,validate(deleteTodoValidation), deleteTodo);
router.put('/:id/complete', authMiddleware,validate(markTodoCompletedValidation), markTodoCompleted);
router.put('/:id/uncomplete', authMiddleware, validate(unmarkTodoCompletedValidation),unmarkTodoCompleted);
router.post('/:id/reminder', authMiddleware,validate(setReminderValidation),setReminder);

export default router;
