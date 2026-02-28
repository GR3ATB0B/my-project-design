import data from '@/../product/sections/tasks/data.json'
import { TaskBoard } from './components/TaskBoard'

export default function TaskBoardView() {
  return (
    <TaskBoard
      columns={data.columns}
      agents={data.agents}
      tasks={data.tasks}
      onTaskMove={(taskId, columnId) => console.log('Move task:', taskId, '→', columnId)}
      onTaskCreate={(task) => console.log('Create task:', task)}
      onTaskUpdate={(taskId, updates) => console.log('Update task:', taskId, updates)}
      onTaskSelect={(taskId) => console.log('Select task:', taskId)}
      onTaskDeselect={() => console.log('Deselect task')}
    />
  )
}
