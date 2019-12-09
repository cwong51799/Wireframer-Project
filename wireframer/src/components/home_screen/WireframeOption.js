import React, { Component } from 'react'

export default class WireframeOption extends Component {
    render() {
        return (
            <option default key = {this.props.key}>{this.props.wireframe.name}</option>
        )
    }
}
