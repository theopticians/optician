import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'

import BatchMatrix from './BatchMatrix'

import $ from './BatchView.scss'

class BatchViewHeader extends Component {
  render () {
    const {project, branch} = this.props

    return (
      <div className={$.header}>
        <div className={$.title}>
          {project}
        </div>
        <div className={$.branch}>
          {branch}
        </div>
      </div>
    )
  }
}

class BatchView extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      results: []
    }

    this.onSelectTest = this.onSelectTest.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.id !== this.props.id) {
      this.fetchBatch(nextProps.id)
    }
  }

  componentWillMount () {
    this.fetchBatch(this.props.id)
  }

  onSelectTest (id) {
    this.props.onSelectTest(id)
  }

  fetchBatch (id) {
    fetch(`${process.env.OPTICIAN_API_URL}/batches/${id}`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }

        return response.json()
      })
      .then(response => {
        this.setState({results: response})
      })
  }

  render () {
    if (this.state.results.length === 0) {
      return <p> Loading... </p>
    }

    return (
      <div className={$.root}>
        <BatchViewHeader
          project={this.state.results[0].project}
          branch={this.state.results[0].branch}
        />
        <BatchMatrix
          results={this.state.results}
          onSelectTest={this.onSelectTest}
        />
      </div>
    )
  }
}

export default BatchView
