import React from 'react';
import ToDoItem from './ToDoItem';

class ToDoList extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks:[],
      work:'',
      itemToUpdate:null
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/todos').
    then((response) => response.json()).
    then((data) => this.setState({tasks: data.splice(0, 20)}))
  }

  render () {  
    const {tasks, itemToUpdate, work} = this.state;

    // Change input
    const changeMessage = (e) => {
        this.setState({work:e.target.value})       
    }

    // Delete task
    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        this.setState({ tasks: updatedTasks });
    }
    
    // Update task
    const updateTask = (taskId, newTitle) => {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        );
        this.setState({ tasks: updatedTasks });
    };

    // handle event when enter key is pressed
    const handleKeyDown = (e) => {
      if(e.key === 'Enter'){
        // If nothing is given in task
        if(e.target.value === ''){
          return alert('task can not be empty')
        }

        if(itemToUpdate === null){
            // Add task
            const task={
                title : work,
                id: Date.now(),
                completed:false
            }
            this.setState({tasks: [task,  ...tasks]})
        } else {
            // Update task
            updateTask(itemToUpdate.id, work);
            this.setState({itemToUpdate:null})
        }
        this.setState({work:''})
      }
    }

    // toggle task
    const toggleTaskCompletion = (taskId) => {
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }));
    };

    // When edit button is clicked, edit task
    const editTask = (task) => {
      this.setState({work:task.title});
      this.setState({itemToUpdate:task});
    }

    return (
      <div id="container">
        <input placeholder='Add a Task' className='add-task' value={this.state.work} onChange={changeMessage} onKeyDown={handleKeyDown}/>
        <h1> Total tasks : {tasks.length} </h1>
        {tasks.map((task, index) => {
          return (
              <ToDoItem task={task} deleteTask={deleteTask} key={index} taskToggled={toggleTaskCompletion} editTask={editTask}/>
          )
        })}
      </div>
    )
  }

  
}

export default ToDoList;
 