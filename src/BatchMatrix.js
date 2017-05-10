import React, {Component} from 'react'

import cx from 'classnames'

import $ from './BatchMatrix.scss'

class MatrixElement extends Component {
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

class BatchMatrix extends Component {
  render () {
    const browsers = [...new Set(this.props.results.map(r => r.browser))].sort()
    const targets = [...new Set(this.props.results.map(r => r.target))].sort()

    return (
      <div className={$.root}>
        <div className={$.table}>
          <div className={$.firstRow}>
            <div className={$.edge} />
            {browsers.map(browser => {
              return <div className={$.browser} key={browser}>{browser}</div>
            })}
            <div className={$.rowGrow} />
          </div>
          {targets.map(target => {
            return (
              <div className={$.row}>
                <div className={$.target}>{target}</div>
                {browsers.map((browser, i) => {
                  const test = this.props.results.find(
                    r => r.browser === browser && r.target === target
                  )
                  if (test == null) {
                    return <div className={$.empty} key={i} />
                  }

                  const testStyle = cx($.test, {
                    [$.failed]: test.diffscore > 0
                  })

                  return (
                    <div className={testStyle} key={i}>
                      <MatrixElement
                        result={test}
                        onClick={this.props.onSelectTest}
                      />
                    </div>
                  )
                })}

                <div className={$.rowGrow} />
              </div>
            )
          })}

          <div className={$.lastRow}>
            <div className={$.target} />
            {browsers.map((browser, i) => {
              return <div className={$.empty} key={i} />
            })}
            <div className={$.rowGrow} />

          </div>
        </div>
      </div>
    )
  }
}

export default BatchMatrix
