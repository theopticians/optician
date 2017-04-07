import React, { Component } from 'react'

import fetch from 'isomorphic-fetch'

class AcceptBaseImage extends Component {
  constructor (...args) {
    super(...args)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    fetch(`//localhost:8080/tests/${this.props.id}/accept`, {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      if (response.status >= 400) {
        return response.json()
      }

      console.log('Accepted!')
    })
  }

  render () {
    return (
      <button onClick={this.handleClick}>Accept base image</button>
    )
  }
}

export default AcceptBaseImage

