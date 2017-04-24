import React, { Component } from 'react'

import './ImageCompare.css'

class ImageCompare extends Component {
  render () {
    return (
      <div className='image-compare'>
        <div className='image-wrapper'>
          <div className='image' style={{backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.baseimage})`}}/>
          <div className='image diff' style={{backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage})`}}/>
        </div>
        <div className='image-wrapper'>
          <div className='image' style={{backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.image})`}}/>
          <div className='image diff' style={{backgroundImage: `url(${process.env.OPTICIAN_API_URL}/image/${this.props.diffimage})`}}/>
        </div>
      </div>

    )
  }
}

export default ImageCompare

