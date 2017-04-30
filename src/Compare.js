import React, { Component } from 'react'
import Rnd from 'react-rnd'

import fetch from 'isomorphic-fetch'

import $ from './Compare.css'

import ImageCompare from './ImageCompare'

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

class Compare extends Component {
  constructor (...args) {
    super(...args)

    this.onResize = this.onResize.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
    this.addMask = this.addMask.bind(this)
    this.acceptBaseImage = this.acceptBaseImage.bind(this)
    this.saveMasks = this.saveMasks.bind(this)
    this.state = { test: {}, masks: [] }
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

  acceptBaseImage () {
    fetch(`${process.env.OPTICIAN_API_URL}/results/${this.props.id}/accept`, {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      if (response.status >= 400) {
        return response.json()
      }

      console.log('Accepted!')
    })
  }

  saveMasks () {
    console.log(this.props.box)
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
      <div className={$.root}>
        <div className={$.toolbar}>
          <button className={$.button} onClick={this.addMask}>Add Mask</button>
          <button className={$.button} onClick={this.saveMaSave}>Save Masks</button>
          <button className={$.button} onClick={this.acceptBaseImage}>Accept</button>
        </div>
        <div className={$.content}>
          { this.state.masks && this.state.masks.map((mask, i) => {
            return <Rnd
              key={i}
              initial={initialPosition}
              style={maskStyle}
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

