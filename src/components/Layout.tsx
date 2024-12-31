import React from 'react';
import { Sun, Moon, Bell, User, LayoutGrid, ListTodo, Calendar, Notebook, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-sage-50 flex">
      {/* Sidebar */}
      <aside className="w-16 bg-sage-200 p-4 flex flex-col gap-8">
        <div className="text-sage-700">
          <LayoutGrid size={24} />
        </div>
        <nav className="flex flex-col gap-6">
          <button className="text-sage-700 hover:text-sage-900">
            <LayoutGrid size={24} />
          </button>
          <button className="text-sage-700 hover:text-sage-900">
            <ListTodo size={24} />
          </button>
          <button className="text-sage-700 hover:text-sage-900">
            <Calendar size={24} />
          </button>
          <button className="text-sage-700 hover:text-sage-900">
            <Notebook size={24} />
          </button>
        </nav>
        <button className="mt-auto text-sage-700 hover:text-sage-900">
          <LogOut size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-sage-700 hover:text-sage-900">
                <Sun size={20} />
              </button>
              <button className="p-2 text-sage-700 hover:text-sage-900 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="w-8 h-8 rounded-full bg-sage-300 flex items-center justify-center">
                <User size={20} />
              </button>
            </div>
          </header>

          {children}
        </div>
      </main>
    </div>
  );
}