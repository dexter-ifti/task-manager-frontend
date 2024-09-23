import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import React from 'react'

function page() {
  return (
    <div>
        <h1>Tasks Page</h1>
        <TaskForm/>
        <TaskList/>
    </div>
  )
}

export default page