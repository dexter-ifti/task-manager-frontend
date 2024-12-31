import React from 'react';
import { Trash2 } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  priority: 'Low' | 'Average' | 'Top';
  deadline: string;
  completed: boolean;
}

export default function TaskList() {
  const tasks: Task[] = [
    { id: '1', name: 'Meet John', priority: 'Top', deadline: '2023-12-23', completed: true },
    { id: '2', name: 'Party', priority: 'Low', deadline: '2023-12-28', completed: true },
    { id: '3', name: 'Project', priority: 'Average', deadline: '2023-12-16', completed: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Current Tasks</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left bg-sage-100">
              <th className="py-2 px-4 rounded-l">NAME</th>
              <th className="py-2 px-4">PRIORITY</th>
              <th className="py-2 px-4">DEADLINE</th>
              <th className="py-2 px-4 rounded-r">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => !task.completed).map(task => (
              <tr key={task.id} className="border-b border-sage-100">
                <td className="py-3 px-4">{task.name}</td>
                <td className="py-3 px-4">{task.priority}</td>
                <td className="py-3 px-4">{task.deadline}</td>
                <td className="py-3 px-4">
                  <button className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200">
                    Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left bg-sage-100">
              <th className="py-2 px-4 rounded-l">NAME</th>
              <th className="py-2 px-4">PRIORITY</th>
              <th className="py-2 px-4">DEADLINE</th>
              <th className="py-2 px-4 rounded-r">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => task.completed).map(task => (
              <tr key={task.id} className="border-b border-sage-100">
                <td className="py-3 px-4">{task.name}</td>
                <td className="py-3 px-4">{task.priority}</td>
                <td className="py-3 px-4">{task.deadline}</td>
                <td className="py-3 px-4">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}