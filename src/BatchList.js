import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cx from 'classnames'

import $ from './BatchList.scss'

class ListItem extends Component {
  render () {
    const {batch, active, onClick} = this.props
    const style = cx($.batch, {
      [$.failed]: batch.failed > 0,
      [$.active]: active
    })
    return (
      <li className={style} onClick={() => onClick(batch.id)}>
        <p className={$.project}>
          {batch.project}
        </p>
        <p className={$.time} title={moment(batch.timestamp).format('llll')}>
          {moment(batch.timestamp).fromNow()}
        </p>
        {batch.failed > 0 && <div className={$.failedIndicator} />}
        {active && <div className={$.triangle} />}
      </li>
    )
  }
}

class BatchList extends Component {
  constructor (...args) {
    super(...args)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    this.props.onClick(id)
  }

  render () {
    const {selected} = this.props
    return (
      <ul className={$.root}>
        {this.props.items.sort((a, b) => {
          return moment(b.timestamp).format('x') - moment(a.timestamp).format('x')
        }).map(batch => {
          return (
            <ListItem
              key={batch.id}
              batch={batch}
              active={batch.id === selected}
              onClick={this.handleClick}
            />
          )
        })}
      </ul>
    )
  }
}

BatchList.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func
}

export default BatchList
