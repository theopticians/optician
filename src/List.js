import React, { PropTypes, Component } from 'react'
import moment from 'moment'
import cx from 'classnames'

import $ from './List.css'

class ListItem extends Component {
  render () {
    const {result, active, onClick} = this.props
    const style = cx($.result, {
      [$.passed]: result.diffscore === 0,
      [$.failed]: result.diffscore > 0,
      [$.active]: active
    })
    return <li
      className={style}
      onClick={() => onClick(result.id)}
    >
      <p className={$.id}>
        {result.id}
      </p>
      <p className={$.time}>
        {moment(result.timestamp).fromNow()}
      </p>
      {result.diffscore > 0 &&
        <div className={$.failedIndicator} />
      }
      {active &&
        <div className={$.triangle} />
      }
    </li>
  }
}

class List extends Component {
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
          this.props.items.map((result) => {
            return <ListItem key={result.id} result={result} active={result.id === selected} onClick={this.handleClick} />
          })
        }
      </ul>
    )
  }
}

List.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func
}

export default List

