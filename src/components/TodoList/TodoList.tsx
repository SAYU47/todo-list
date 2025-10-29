import React, { useMemo } from 'react';
import type { Todo, FilterType } from '@/types/todo';
import { TodoItem } from '@/components/TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

const EMPTY_STATE_MESSAGES = {
  all: 'Добавьте свою первую задачу!',
  active: 'Нет активных задач',
  completed: 'Нет выполненных задач',
} as const;

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onToggleTodo,
  onDeleteTodo,
}) => {
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed)
    );
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-lg">{EMPTY_STATE_MESSAGES[filter]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};