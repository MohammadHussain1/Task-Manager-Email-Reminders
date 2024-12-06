import Joi from 'joi';

const createTodoValidation = {
  body: Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    dueDate: Joi.date().required(),
  }),
};

const updateTodoValidation = {
  body: Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(5),
    dueDate: Joi.date(),
  }),
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const deleteTodoValidation = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const getTodoByDateValidation = {
  params: Joi.object({
    date: Joi.date().required(),
  }),
};

const markTodoCompletedValidation = {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  };

  const unmarkTodoCompletedValidation = {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  };

  const setReminderValidation = {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
        reminderTime: Joi.date().required(),
      }),
  };

const createReminderValidation = {
    body: Joi.object({
      taskId: Joi.string().required(),
      reminderTime: Joi.date().required(),
      email: Joi.string().email().required(),
    }),
  };
  
export { createTodoValidation,setReminderValidation,unmarkTodoCompletedValidation,updateTodoValidation, deleteTodoValidation, markTodoCompletedValidation,getTodoByDateValidation,createReminderValidation };
