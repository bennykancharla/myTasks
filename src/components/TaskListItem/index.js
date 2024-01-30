import './index.css'

const TaskListItem = props => {
  const {taskDetails} = props
  const {task, category} = taskDetails
  return (
    <li className="task-list-item">
      <p className="task-para">{task}</p>
      <p className="category-para">{category}</p>
    </li>
  )
}

export default TaskListItem
