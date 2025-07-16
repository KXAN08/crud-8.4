import React, { Component } from 'react'

export default class Todolist extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubit} action="">
            <input type='text' placeholder='todo'/>
            <button></button>
        </form>
      </div>
    )
  }  
}
