import React, { Component } from 'react'

import fetch from 'isomorphic-fetch'

import $ from './Compare.css'

import ImageCompare from './ImageCompare'

const initialPosition = {
  x: 0,
  y: 0,
  width: 50,
  height: 50
}

class Compare extends Component {
  constructor (...args) {
    super(...args)

    this.handleMaskChange = this.handleMaskChange.bind(this)
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

  handleMaskChange (mask) {
    this.setState({masks: mask})
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
          { this.state.result &&
              <ImageCompare
                image={this.state.result.image}
                baseimage={this.state.result.baseimage}
                diffimage={this.state.result.diffimage}
                mask={this.state.masks}
                onMaskChange={this.handleMaskChange}
              />
          }
        </div>
      </div>
    )
  }
}

export default Compare

