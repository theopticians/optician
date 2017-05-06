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
    this.handleWheel = this.handleWheel.bind(this)
  }

  onMaskDragStart (e) {
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation()
    }
  }

  handleWheel (e) {
    let newScale = this.state.scale / (1 + e.deltaY * 0.002)
    if (newScale > 3) {
      newScale = 3
    }

    if (newScale < 0.2) {
      newScale = 0.2
    }

    this.setState({scale: newScale})
  }

  handleMouseDown () {
    this.setState({ dragging: true })
  }

  handleMouseUp () {
    this.setState({ dragging: false })
  }

  handleMouseMove (e) {
    if (this.state.dragging) {
      if (e.buttons <= 0) {
        this.setState({ dragging: false })
        return
      }

      this.setState({
        translate: {
          x: this.state.translate.x + (e.screenX - this.lastMouseX) / this.state.scale,
          y: this.state.translate.y + (e.screenY - this.lastMouseY) / this.state.scale
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
        onWheel={this.handleWheel}
      >
        <div className={$.imageSplit} >
          <div className={cx($.imageWrapper, smoothTransform)} style={{transform: transformStyle}} >
            <img className={cx($.image)} src={`${process.env.OPTICIAN_API_URL}/image/${this.props.baseimage}`} />
            <img className={cx($.image, $.diff)} src={`${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage}`} />
            {this.props.children.map((child, i) => {
              return <div key={i} className={$.layersWrapper}>
                {child}
              </div>
            })}
          </div>
        </div>
        <div className={$.imageSplit} >
          <div className={cx($.imageWrapper, smoothTransform)} style={{transform: transformStyle}} >
            <img className={cx($.image)} src={`${process.env.OPTICIAN_API_URL}/image/${this.props.image}`} />
            <img className={cx($.image, $.diff)} src={`${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage}`} />
            {this.props.children.map((child, i) => {
              return <div key={i} className={$.layersWrapper}>
                {child}
              </div>
            })}
          </div>
        </div>
      </div>

    )
  }
  }

export default ImageCompare
