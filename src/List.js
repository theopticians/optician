import React, { PropTypes, Component } from 'react'

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
            return <li key={result.id}>
              <a href='#' onClick={() => this.handleClick(result.id)}>{result.id}</a>
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

