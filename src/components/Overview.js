import React, { Component } from 'react';
import uniqid from 'uniqid';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkIfWritten = this.checkIfWritten.bind(this);
    this.isEdit = false;
  }

  handleDeleteClick(e) {
    const newTasksArray = [];
    const taskText = e.target.parentElement.children[0].textContent;

    this.props.tasks.forEach((element, index) => {
      if (taskText.includes(`${index + 1}`)) return;
      newTasksArray.push(element);
    });

    this.props.setStateTasksOfParent(newTasksArray);
  }

  handleEditClick(e) {
    this.isEdit = !this.isEdit;
    const siblingInput = e.target.nextElementSibling;
    siblingInput.style.display = this.isEdit ? 'inline' : 'none';
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleEditClick(e);

    const targetedLi = e.target.parentElement.childNodes[0].textContent;
    const targetedInput = [...e.target.parentElement.childNodes].at(-1);

    if (this.checkIfWritten(targetedInput)) return;

    let targetedTask = targetedLi.slice(3);

    this.props.tasks.forEach((task) => {
      if (targetedTask === task.text) {
        task.text = targetedInput.value;
      }
    });

    this.props.setStateTasksOfParent(this.props.tasks);
  }

  checkIfWritten(targetedInput) {
    let isAlreadyWritten = false;

    this.props.tasks.forEach((task) => {
      if (targetedInput.value === task.text) {
        isAlreadyWritten = true;
      }
    });

    return isAlreadyWritten;
  }

  render() {
    const Task = this.props.tasks.map((task, index) => {
      return (
        <div key={uniqid()}>
          <li key={index}>
            {' '}
            {index + 1} {task.text}
          </li>
          <button
            id={`btn1-${index}`}
            type="button"
            onClick={this.handleDeleteClick}
          >
            Delete
          </button>
          <button
            id={`btn2-${index}`}
            type="button"
            onClick={(e) =>
              this.isEdit ? this.handleSubmit(e) : this.handleEditClick(e)
            }
          >
            Edit
          </button>
          <input type="text" style={{ display: 'none' }} />
        </div>
      );
    });

    return <ul>{Task}</ul>;
  }
}
