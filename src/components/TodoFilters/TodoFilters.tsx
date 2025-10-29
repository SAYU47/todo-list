import React from 'react';
import type { FilterType } from '@/types/todo';
import { Button } from '@/components/ui/Button';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  completedCount: number;
  onClearCompleted: () => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  completedCount,
  onClearCompleted
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'completed', label: 'Выполненные' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          variant={currentFilter === filter.key ? 'primary' : 'secondary'}
        >
          {filter.label}
        </Button>
      ))}
      {completedCount > 0 && (
        <Button
          onClick={onClearCompleted}
          variant="danger"
        >
          Очистить выполненные
        </Button>
      )}
    </div>
  );
};