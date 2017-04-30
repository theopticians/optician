import React, { Component } from 'react'
import Rnd from 'react-rnd'

import $ from './Mask.css'

const initialPosition = {
  x: 0,
  y: 0,
  width: 50,
  height: 50
}

const maskStyle = {
  textAlign: 'center',
  border: '2px solid rgb(255, 113, 113)',
  borderRadius: '3px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 113, 113, 0.5)',
  justifyContent: 'center'
}

class Mask extends Component {
  constructor (...args) {
    super(...args)

    this.onResize = this.onResize.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
    this.onMaskDragStart = this.onMaskDragStart.bind(this)
  }

  onMaskDragStart (e) {
    if (typeof e.stopPropagation == "function") {
      e.stopPropagation()
    }
  }

  onResize (id, dimensions) {
    const masks = this.props.masks.map((obj) => {
      if (obj.id !== id) {
        return obj
      }

      return {
        ...obj,
        width: dimensions.width,
        height: dimensions.height
      }
    })

    this.props.onChange(masks)
  }

  onDragStop (id, ui) {
    const masks = this.props.masks.map((obj) => {
      if (obj.id !== id) {
        return obj
      }
      return {
        ...obj,
        x: ui.position.left,
        y: ui.position.top
      }
    })
    this.props.onChange(masks)
  }

  render () {
    return (
      <div className={$.root}>
        { this.props.masks && this.props.masks.map((mask, i) => {
          return <Rnd
            key={i}
            initial={initialPosition}
            style={maskStyle}
            bounds={'parent'}
            onResizeStop={(dir, dim) => this.onResize(i, dim)}
            onDragStop={(e, ui) => this.onDragStop(i, ui)}
            onDragStart={(e, ui) => this.onMaskDragStart(e)}
          />
        })
        }
      </div>
    )
  }
}

export default Mask
