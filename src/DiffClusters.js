import React, {Component} from 'react'

import $ from './DiffClusters.scss'

class DiffClusters extends Component {
  render () {
    return (
      <div className={$.root}>
        {this.props.clusters &&
          this.props.clusters.map((cluster, i) => {
            return (
              <div
                key={i}
                className={$.square}
                style={{
                  top: cluster.y,
                  left: cluster.x,
                  width: cluster.width,
                  height: cluster.height
                }}
              />
            )
          })}
      </div>
    )
  }
}

export default DiffClusters
