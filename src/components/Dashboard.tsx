import React from 'react';
import { Edit2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
}

export default function Dashboard() {
  const notes: Note[] = [
    {
      id: '1',
      title: 'Recently added Notes',
      content: 'Some of your recently added Notes (readOnly)...',
      color: 'bg-orange-200',
    },
    {
      id: '2',
      title: 'About Queensland',
      content: 'Queensland is a state in northeastern Australia. It\'s the second-largest and third-most populous state in the country. Queensland is known for its warm, tropical climate, sandy beaches, rainforests, open plains.',
      color: 'bg-teal-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Notes Section */}
      <div className="bg-sage-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Notes</h2>
          <button className="text-sage-600 hover:text-sage-800">
            <Edit2 size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {notes.map(note => (
            <div
              key={note.id}
              className={`${note.color} p-4 rounded-lg shadow-sm`}
            >
              <h3 className="font-medium mb-2">{note.title}</h3>
              <p className="text-sm">{note.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Todo Section */}
      <div className="bg-sage-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Todo's</h2>
          <button className="text-sage-600 hover:text-sage-800">
            <Edit2 size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-200 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">Robust encryption measures.</h3>
            <p className="text-sm">"Your task todo's in safe hands."</p>
          </div>
          <div className="bg-orange-200 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">ThemeOptions.</h3>
            <p className="text-sm">Minimalist layout and user friendly navigations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}