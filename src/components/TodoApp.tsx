import React from 'react';
import type { Todo, FilterType } from '@/types/todo';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TodoStats } from '@/components/TodoStats/TodoStats';
import { TodoForm } from '@/components/TodoForm/TodoForm';
import { TodoFilters } from '@/components/TodoFilters/TodoFilters';
import { TodoList } from '@/components/TodoList/TodoList';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = React.useState<FilterType>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleDateString('ru-RU')
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
        </div>
        <TodoStats todos={todos} />
        <TodoForm onAddTodo={addTodo} />
        <TodoFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />
        <TodoList
          todos={todos}
          filter={filter}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Задачи автоматически сохраняются в вашем браузере</p>
        </div>
      </div>
    </div>
  );
};