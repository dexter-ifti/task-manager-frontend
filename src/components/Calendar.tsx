import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">December 2023</h2>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-sage-100 rounded">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 hover:bg-sage-100 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-sm">
        {days.map(day => (
          <div key={day} className="text-center font-medium text-sage-600">
            {day}
          </div>
        ))}
        {Array.from({ length: 31 }, (_, i) => (
          <button
            key={i + 1}
            className={`h-8 flex items-center justify-center rounded-full
              ${i + 1 === 15 ? 'bg-blue-500 text-white' : 'hover:bg-sage-100'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}