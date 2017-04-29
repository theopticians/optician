import React, { Component } from 'react'
import cx from 'classnames'

import $ from './ImageCompare.css'

class ImageCompare extends Component {
	constructor () {
		super()

		this.state = { scale: 0.9, translate: {x: 0, y: 0} }
	}

  render () {
    let transformStyle = `scale(${this.state.scale}) translateX(${this.state.translate.x}px) translateY(${this.state.translate.y}px)`

    return (
      <div className={$.imageCompare}>
        <div className={$.imageWrapper}>
          <div className={$.image} style={{transform: transformStyle, backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.baseimage})`}}/>
          <div className={cx($.image, $.diff)} style={{transform: transformStyle, backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage})`}}/>
        </div>
        <div className={$.imageWrapper}>
          <div className={$.image} style={{transform: transformStyle, backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.image})`}}/>
          <div className={cx($.image, $.diff)} style={{transform: transformStyle, backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage})`}}/>
        </div>
      </div>

    )
  }
}

export default ImageCompare

