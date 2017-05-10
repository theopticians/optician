import React, {Component} from 'react'
import Compare from './Compare'
import BatchList from './BatchList'
import BatchView from './BatchView'
import Header from './Header'

import fetch from 'isomorphic-fetch'

import $ from './App.scss'

class App extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      selectedBatch: null,
      selectedTest: null,
      batches: []
    }

    this.handleBatchSelect = this.handleBatchSelect.bind(this)
    this.handleTestSelect = this.handleTestSelect.bind(this)
  }

  fetchBatches () {
    fetch(`${process.env.OPTICIAN_API_URL}/batches`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }

        return response.json()
      })
      .then(response => {
        this.setState({selectedBatch: response[0].id, batches: response})
      })
  }

  handleBatchSelect (id) {
    this.setState({selectedTest: null, selectedBatch: id})
  }

  handleTestSelect (id) {
    this.setState({selectedTest: id})
  }

  componentWillMount () {
    this.fetchBatches()
  }

  render () {
    return (
      <div className={$.App}>
        <div className={$.header}>
          <Header />
        </div>
        <div className={$.navTests}>
          {this.state.batches.length &&
            <BatchList
              items={this.state.batches}
              selected={this.state.selectedBatch}
              onClick={this.handleBatchSelect}
            />}
        </div>
        <div className={$.mainWrapper}>
          <div className={$.main}>
            {this.state.selectedTest == null
              ? <BatchView
                id={this.state.selectedBatch}
                onSelectTest={this.handleTestSelect}
                />
              : <Compare id={this.state.selectedTest} />}
          </div>
        </div>
      </div>
    )
  }
}

export default App
