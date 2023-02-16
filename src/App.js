import React, { Component } from 'react';
import Overview from './components/Overview';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      newTask: {
        text: '',
        order: 1,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setStateTasksOfParent = this.setStateTasksOfParent.bind(this);
    this.checkIfWritten = this.checkIfWritten.bind(this);
  }
  handleChange(e) {
    this.setState({
      newTask: {
        text: e.target.value,
        order: this.state.newTask.order, // putting the same order value as before
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTask.text) return;

    if (this.checkIfWritten()) return;

    this.setState({
      tasks: [...this.state.tasks, this.state.newTask],
      newTask: {
        text: '',
        order: this.state.newTask.order + 1,
      },
    });
  }

  checkIfWritten() {
    let isAlreadyWritten = false;
    this.state.tasks.forEach((task) => {
      if (this.state.newTask.text === task.text) {
        isAlreadyWritten = true;
      }
    });

    return isAlreadyWritten;
  }

  setStateTasksOfParent(newTasksArray) {
    this.setState({
      tasks: newTasksArray,
    });
  }

  render() {
    return (
      <div>
        <div>
          <form>
            <label htmlFor="task-input">Task</label>
            <input
              type="text"
              name="task-input"
              id="task-input"
              value={this.state.newTask.text}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
        <div>
          <Overview
            tasks={this.state.tasks}
            setStateTasksOfParent={this.setStateTasksOfParent}
          />
        </div>
      </div>
    );
  }
}

export default App;
