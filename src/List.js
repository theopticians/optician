import React, { PropTypes, Component } from 'react'
import moment from 'moment'

import './List.css'

class List extends Component {
  constructor (...args) {
    super(...args)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    this.props.onClick(id)
  }

  render () {
    return (
      <ul className='root'>
        {
          this.props.items.map((result) => {
            return <li
              className={'result ' + (result.diffscore === 0 ? 'passed' : 'failed')}
              key={result.id}
              onClick={() => this.handleClick(result.id)}
            >
              <p className='id'>
                {result.id} 
              </p>
              <p className='time'>
                {moment(result.timestamp).fromNow()} 
              </p>
            </li>
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

