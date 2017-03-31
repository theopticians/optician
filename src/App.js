import React, { Component } from 'react'
import Rnd from 'react-rnd'

import './App.css'
import a from './../base-images/a.jpg'

import Save from './Save'

const initialPosition = {
  x: 0,
  y: 0,
  width: 50,
  height: 50
}

const style = {
  textAlign: 'center',
  border: '1px solid #fff',
  borderRadius: '3px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'red',
  justifyContent: 'center'
}

class App extends Component {
  constructor (...args) {
    super(...args)

    this.onResize = this.onResize.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
    this.addMask = this.addMask.bind(this)
    this.state = { masks: [] }
  }

  addMask () {
    this.setState({
      masks: [
        ...this.state.masks,
        {
          id: this.state.masks.length,
          ...initialPosition
        }
      ]
    })
  }

  onResize (id, dimensions) {
    const masks = this.state.masks.map((obj) => {
      if (obj.id !== id) {
        return obj
      }

      return {
        ...obj,
        width: dimensions.width,
        height: dimensions.height
      }
    })

    this.setState({masks})
  }

  onDragStop (id, ui) {
    const masks = this.state.masks.map((obj) => {
      if (obj.id !== id) {
        return obj
      }
      return {
        ...obj,
        x: ui.position.left,
        y: ui.position.top
      }
    })
    this.setState({masks})
  }

  render () {
    return (
      <div className='App'>
        <h1>Optician</h1>
        <div className='menu'>
          <Save box={this.state.masks} />
          <button onClick={this.addMask}>Add new mask</button>
        </div>
        <div className='content'>
          <span className='image'>
            { this.state.masks && this.state.masks.map((mask, i) => {
              return <Rnd
                key={i}
                initial={initialPosition}
                style={style}
                bounds={'parent'}
                onResizeStop={(dir, dim) => this.onResize(i, dim)}
                onDragStop={(e, ui) => this.onDragStop(i, ui)}
              />
            })
            }
            <img className='bg-image' src={a} alt='original base' />
          </span>
        </div>
      </div>
    )
  }
}

export default App

