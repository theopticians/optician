import React, { Component } from 'react'

class Save extends Component {
  constructor (...args) {
    super(...args)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    console.log(this.props.box)
  }

  render () {
    return (
      <button onClick={this.handleClick}>Save!</button>
    )
  }
}

export default Save

