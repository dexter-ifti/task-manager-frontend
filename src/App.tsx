import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import TodoList from './components/TodoList';

function App() {
  return (
    <Layout>
      <div className="space-y-8">
        <Dashboard />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <TaskList />
          </div>
          <div className="space-y-6">
            <Calendar />
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <blockquote className="italic text-sage-600">
                "The Greatest Danger For Most Of Us Is Not That Our Aim Is Too High And We Miss It, But That It Is Too Low And We Reach It."
                <footer className="mt-2 text-right">- Michelangelo</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;