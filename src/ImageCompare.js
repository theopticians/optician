import React, { Component } from 'react'
import cx from 'classnames'

import $ from './ImageCompare.css'

class ImageCompare extends Component {
  render () {
    return (
      <div className={$.imageCompare}>
        <div className={$.imageWrapper}>
          <div className={$.image} style={{backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.baseimage})`}}/>
          <div className={cx($.image, $.diff)} style={{backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage})`}}/>
        </div>
        <div className={$.imageWrapper}>
          <div className={$.image} style={{backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.image})`}}/>
          <div className={cx($.image, $.diff)} style={{backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage})`}}/>
        </div>
      </div>

    )
  }
}

export default ImageCompare

