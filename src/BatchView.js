import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'

import cx from 'classnames'

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

class BatchViewItem extends Component {
  constructor (...args) {
    super(...args)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.onClick(this.props.result.id)
  }

  render () {
    const {result} = this.props

    const style = cx($.result, {
      [$.failed]: result.diffscore > 0
    })

    return (
      <div className={style} onClick={this.onClick}>
        {result.diffscore > 0 ? result.diffclusters.length + ' changes' : 'ok'}
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

    const browsers = [...new Set(this.state.results.map(r => r.browser))].sort()
    const targets = [...new Set(this.state.results.map(r => r.target))].sort()

    return (
      <div className={$.root}>
        <BatchViewHeader
          project={this.state.results[0].project}
          branch={this.state.results[0].branch}
        />
        <table className={$.table}>
          <thead>
            <tr>
              <th className={$.edge} />
              {browsers.map(browser => {
                return <th className={$.browser} key={browser}>{browser}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {targets.map(target => {
              return (
                <tr key={target}>
                  <td className={$.target}>{target}</td>
                  {browsers.map((browser, i) => {
                    const test = this.state.results.find(
                      r => r.browser === browser && r.target === target
                    )
                    if (test == null) {
                      return <td key={i} />
                    }

                    const testStyle = cx($.test, {
                      [$.failed]: test.diffscore > 0
                    })

                    return (
                      <td className={testStyle} key={i}>
                        <BatchViewItem
                          result={test}
                          onClick={this.onSelectTest}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default BatchView
