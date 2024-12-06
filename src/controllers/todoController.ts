import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Todo from '../models/todoModel';
import { CustomRequest } from '../middlewares/authMiddleware';
import cron from 'node-cron';
import { sendEmailReminder } from '../utils/email';

const createTodo = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { title, description, dueDate } = req.body;
  const todo = new Todo({
    title,
    description,
    dueDate,
    user: req.user._id,
  });

  const createdTodo = await todo.save();
  res.status(201).json(createdTodo);
});

const getTodosByDate = asyncHandler(async (req: CustomRequest, res: Response) => {
  const date = new Date(req.params.date);
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  const todos = await Todo.find({
    user: req.user._id,
    dueDate: { $gte: date, $lt: nextDay },
  });

  res.json(todos);
});

const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);
  const { title, description, dueDate, reminderTime } = req.body;

  if (todo) {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, reminderTime },
      { new: true }
    );
  
    res.json(updatedTodo);
  } else {
    res.status(404);
    throw new Error('Todo not found');
  }
});

const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    await todo.deleteOne();
    res.json({ message: 'Todo removed' });
  } else {
    res.status(404);
    throw new Error('Todo not found');
  }
});

const markTodoCompleted = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    todo.completed = true;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404);
    throw new Error('Todo not found');
  }
});

const unmarkTodoCompleted = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    todo.completed = false;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404);
    throw new Error('Todo not found');
  }
});

export const setReminder = async (req: CustomRequest, res: Response): Promise<void> => {
  const { reminderTime } = req.body;
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    const reminderDate = new Date(reminderTime);
    if (reminderDate <= new Date()) {
      res.status(400).json({ message: 'Reminder time must be in the future' });
      return;
    }

    todo.reminderTime = reminderDate;
    await todo.save();

    const cronTime = `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${reminderDate.getMonth() + 1} *`;
    cron.schedule(cronTime, () => {
      sendEmailReminder(
        req.user?.email!, 
        'Todo Reminder',
        `Reminder for your Todo task: ${todo.title} - Due: ${todo.dueDate}.`
      );
    });

    res.status(200).json({ message: 'Reminder set successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error setting reminder' });
  }
};


export { createTodo, getTodosByDate, updateTodo, deleteTodo, markTodoCompleted, unmarkTodoCompleted };

