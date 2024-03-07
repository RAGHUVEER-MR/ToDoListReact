import React from "react";
import ToDoList from "./components/ToDoList";

class App extends React.Component {
  render(){
    return (
      <div>
        <h1> To Do List App </h1>
        <ToDoList />
      </div>
    );
  }
}

export default App;
