import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  user: mongoose.Schema.Types.ObjectId;
  reminderTime?: Date;
}

const todoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  reminderTime: { type: Date, required: false },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
