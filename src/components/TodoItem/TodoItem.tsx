import React from 'react';
import type { Todo } from '@/types/todo';
import { TrashIcon } from '../ui/icons';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
      />
      
      <div className="flex-1 ml-4">
        <p className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.text}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Создано: {todo.createdAt}
        </p>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 cursor-pointer text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
        aria-label="Удалить задачу"
      >
    <TrashIcon/>
      </button>
    </div>
  );
};