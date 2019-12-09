import React, { Component } from 'react'

export default class WireframeOption extends Component {
    render() {
        return (
            <option key = {this.props.key}>{this.props.wireframe.name}</option>
        )
    }
}
