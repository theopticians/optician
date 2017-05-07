import React, { PropTypes, Component } from 'react'
import moment from 'moment'
import cx from 'classnames'

import $ from './BatchList.css'

class ListItem extends Component {
  render () {
    const {batch, active, onClick} = this.props
    const style = cx($.batch, {
      [$.failed]: batch.failed > 0,
      [$.active]: active
    })
    return <li
      className={style}
      onClick={() => onClick(batch.id)}
    >
      <p className={$.project}>
        {batch.project}
      </p>
      <p className={$.time}>
        {moment(batch.timestamp).fromNow()}
      </p>
      {batch.failed > 0 &&
        <div className={$.failedIndicator} />
      }
      {active &&
        <div className={$.triangle} />
      }
    </li>
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
        {
          this.props.items.map((batch) => {
            return <ListItem key={batch.id} batch={batch} active={batch.id === selected} onClick={this.handleClick} />
          })
        }
      </ul>
    )
  }
}

BatchList.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func
}

export default BatchList
