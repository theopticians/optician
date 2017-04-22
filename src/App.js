import React, { Component } from 'react'
import Compare from './Compare'
import List from './List'

import fetch from 'isomorphic-fetch'

import './App.css'

class App extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      id: null,
      tests: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  fetchTests () {
    fetch(`${process.env.OPTICIAN_API_URL}/results`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }

        return response.json()
      })
      .then((response) => {
        this.setState({ tests: response })
      })
  }

  handleClick (id) {
    this.setState({ id })
  }

  componentWillMount () {
    this.fetchTests()
  }

  render () {
    return (
      <div className='App'>
        <div className='header'>
          <h1>Optician</h1>
        </div>
        <div className='nav-tests'>
          { this.state.tests.length &&
              <List items={this.state.tests} onClick={this.handleClick} />
          }
        </div>
        <div className='content'>
          { this.state.id &&
              <Compare id={this.state.id} />
          }
        </div>
      </div>
    )
  }
}

export default App

