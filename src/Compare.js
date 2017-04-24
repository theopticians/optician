import React, { Component } from 'react'
import Rnd from 'react-rnd'

import fetch from 'isomorphic-fetch'

import './Compare.css'

import SaveMasks from './SaveMasks'
import AcceptBaseImage from './AcceptBaseImage'
import ImageCompare from './ImageCompare.js'

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

class Compare extends Component {
  constructor (...args) {
    super(...args)

    this.onResize = this.onResize.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
    this.addMask = this.addMask.bind(this)
    this.state = { id: this.props.id, test: {}, masks: [] }
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

  fetchTest (id) {
    fetch(`${process.env.OPTICIAN_API_URL}/results/${id}`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }

        return response.json()
      })
      .then((compareResult) => {
        this.setState({ result: compareResult, id: id })
      })
  }

  componentWillMount () {
    this.fetchTest(this.props.id)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.id !== nextState.id) {
      this.fetchTest(nextProps.id)
    }
  }

  render () {
    return (
      <div className='compare'>
        <div className='menu'>
          <SaveMasks box={this.state.masks} />
          <button onClick={this.addMask}>Add new mask</button>
          <AcceptBaseImage id={this.props.id} />
        </div>
        <div className='content'>
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
          { this.state.result &&
              <ImageCompare
                image={this.state.result.image}
                baseimage={this.state.result.baseimage}
                diffimage={this.state.result.diffimage}
              />
          }
        </div>
      </div>
    )
  }
}

export default Compare

