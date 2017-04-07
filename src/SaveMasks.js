import React, { Component } from 'react'

class SaveMasks extends Component {
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

export default SaveMasks

