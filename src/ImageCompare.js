import React, { Component } from 'react'
import cx from 'classnames'

import $ from './ImageCompare.css'

class ImageCompare extends Component {
  constructor () {
    super()

    this.state = { dragging: false, scale: 0.9, translate: {x: 0, y: 0} }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseDown () {
    this.setState({ dragging: true })
  }

  handleMouseUp () {
    this.setState({ dragging: false })
  }

  handleMouseMove (e) {
    if (this.state.dragging) {
      this.setState({
        translate: {
          x: this.state.translate.x + e.screenX - this.lastMouseX,
          y: this.state.translate.y + e.screenY - this.lastMouseY,
        }
      })
    }

    this.lastMouseX = e.screenX
    this.lastMouseY = e.screenY
  }

  render () {
    let transformStyle = `scale(${this.state.scale}) translateX(${this.state.translate.x}px) translateY(${this.state.translate.y}px)`

    let smoothTransform = { [$.smoothTransform]: !this.state.dragging }

    return (
      <div
        className={$.imageCompare}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <div className={$.imageSplit} >
          <div className={cx($.imageWrapper, smoothTransform)}  style={{transform: transformStyle}} >
            <img className={cx($.image)} src={`${process.env.OPTICIAN_API_URL}/image/${this.props.baseimage}`}/>
            <img className={cx($.image, $.diff)} src={`${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage}`}/>
          </div>
        </div>
        <div className={$.imageSplit} >
          <div className={cx($.imageWrapper, smoothTransform)}  style={{transform: transformStyle}} >
            <img className={cx($.image)} src={`${process.env.OPTICIAN_API_URL}/image/${this.props.image}`}/>
            <img className={cx($.image, $.diff)} src={`${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage}`}/>
          </div>
        </div>
      </div>

    )
  }
}

export default ImageCompare

