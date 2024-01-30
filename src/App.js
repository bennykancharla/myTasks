import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TagsListItem from './components/TagsListItem'
import TaskListItem from './components/TaskListItem'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    input: '',
    tagItem: tagsList[0].optionId,
    taskList: [],
    isActiveCategory: 'INITIAL',
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {input, tagItem} = this.state
    const displayTagItem = tagsList.find(each => each.optionId === tagItem)
    const newTask = {
      id: uuidv4(),
      task: input,
      category: displayTagItem.displayText,
    }
    this.setState(prev => ({
      taskList: [...prev.taskList, newTask],
      input: '',
      tagItem: tagsList[0].optionId,
    }))
  }

  onChangeInput = event => {
    this.setState({input: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({tagItem: event.target.value})
  }

  onClickTagBtn = text => {
    this.setState(prev => ({
      isActiveCategory: prev.isActiveCategory === text ? 'INITIAL' : text,
    }))
  }

  render() {
    const {input, taskList, tagItem, isActiveCategory} = this.state
    const filteredList =
      isActiveCategory === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.category === isActiveCategory)
    return (
      <div className="main-bg">
        <div className="first-half-container">
          <h1 className="first-half-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onSubmitTask}>
            <label className="label-ele" htmlFor="inputTask">
              Task
            </label>
            <input
              className="input-element"
              id="inputTask"
              placeholder="Enter the task here"
              type="text"
              value={input}
              onChange={this.onChangeInput}
            />
            <label className="label-ele" htmlFor="selectTask">
              Tags
            </label>
            <select
              className="input-element"
              id="selectTask"
              onChange={this.onChangeSelect}
              value={tagItem}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <button className="add-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="second-half-container">
          <h1 className="second-half-heading">Tags</h1>
          <ul className="tag-list-container">
            {tagsList.map(eachTag => (
              <TagsListItem
                key={eachTag.optionId}
                isActiveCategory={isActiveCategory}
                onClickTagBtn={this.onClickTagBtn}
                tagDetails={eachTag}
              />
            ))}
          </ul>
          <h1 className="second-half-heading">Tasks</h1>
          <ul className="task-list-container">
            {filteredList.length === 0 ? (
              <p className="no-tasks-heading">No Tasks Added Yet</p>
            ) : (
              filteredList.map(eachTask => (
                <TaskListItem key={eachTask.id} taskDetails={eachTask} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
