import React, { Component } from 'react'

export default class EditArea extends Component {
    state = {
        wireframe : this.props.wireframe
    }
    // How can I get this area to be centered no matter what?
    render() {
        const wireframe = this.props.wireframe;
        const wireframeAttatched = (wireframe != null);
        console.log(wireframe);
        return (
            <div id = "editArea">
                <div id = "wireframeZone" style = {wireframeAttatched ? {width: wireframe.dimensionX, height: wireframe.dimensionY} : {}}>izan is cool </div>
            </div>
        )
    }
}
