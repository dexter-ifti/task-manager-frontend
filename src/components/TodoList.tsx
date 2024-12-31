import React from 'react';
import { Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const todos: Todo[] = [
    { id: '1', text: 'Project 1', completed: false },
    { id: '2', text: '5 To 6 LeetCode', completed: true },
    { id: '3', text: 'Meeting At 7pm', completed: false },
    { id: '4', text: 'Morning Routines', completed: true },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="New Reminder"
          className="flex-1 px-4 py-2 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
        <button className="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700">
          ADD
        </button>
      </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-sage-400' : ''}`}>
              {todo.text}
            </span>
            <button className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}