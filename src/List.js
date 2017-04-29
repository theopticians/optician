import React, { PropTypes, Component } from 'react'
import moment from 'moment'
import cx from 'classnames'

import $ from './List.css'

class ListItem extends Component {
  render(){
    const {result, active} = this.props
    const style = cx($.result,{
      [$.passed]: result.diffscore === 0,
      [$.failed]: result.diffscore > 0,
      [$.active]: active
    })
    return <li
      className={style}
      key={result.id}
      onClick={() => this.handleClick(result.id)}
    >
      <p className={$.id}>
        {result.id} 
      </p>
      <p className={$.time}>
        {moment(result.timestamp).fromNow()} 
      </p>
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
            return <ListItem result={result} active={result.id === selected} />
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

