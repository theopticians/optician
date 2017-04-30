import React, { Component } from 'react'
import $ from './Header.css'

class Header extends Component {
  render () {
    return (
      <div className={$.root}>
        <div className={$.brand}>
          <div className={$.logo} />
          <h1>Optician</h1>
        </div>
      </div>
    )
  }
}

export default Header

