import React, { Component } from 'react'
import Compare from './Compare'
import List from './List'
import Header from './Header'

import fetch from 'isomorphic-fetch'

import $ from './App.css'

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
      <div className={$.App}>
        <div className={$.header}>
          <Header />
        </div>
        <div className={$.navTests}>
          { this.state.tests.length &&
          <List items={this.state.tests} selected={this.state.id} onClick={this.handleClick} />
          }
        </div>
        <div className={$.mainWrapper}>
          <div className={$.main}>
            { this.state.id &&
            <Compare id={this.state.id} />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App

