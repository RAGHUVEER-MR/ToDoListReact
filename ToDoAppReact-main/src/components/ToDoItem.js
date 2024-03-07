import React from 'react'

class ToDoItem extends React.Component {
  render () {
  const { task, deleteTask, taskToggled, editTask } = this.props;

  return (
    <div className='task'>
      <input type="checkbox" checked={task.completed} onChange={() => taskToggled(task.id)} className='checkBoxInput' style={{backgroundColor:'black'}}/>
        <label style={task.completed?{textDecoration:'line-through'}:{textDecoration:'none'}}> {task.title}</label>
        <div className='icons'>
          <i className="fa-solid fa-pen" onClick={() => editTask(task)}></i>
          <i className="fa-solid fa-trash-can" onClick={() => deleteTask(task.id)}></i>
        </div>
    </div>
  )
  }  
  
}

export default ToDoItem
