import React from 'react';
import type { Todo } from '@/types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const progressPercentage = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const stats = [
    { label: 'Всего', value: todos.length, color: 'text-blue-600' },
    { label: 'Активные', value: activeCount, color: 'text-green-600' },
    { label: 'Выполненные', value: completedCount, color: 'text-gray-600' },
    { label: 'Прогресс', value: `${progressPercentage}%`, color: 'text-orange-600' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};