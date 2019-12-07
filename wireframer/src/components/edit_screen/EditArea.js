import React, { Component } from 'react'
import ControlGenerator from './controls/ControlGenerator';

export default class EditArea extends Component {
    constructor(props){
        super(props);
    }
    state = {
        wireframe : this.props.wireframe
    }
    // How can I get this area to be centered no matter what?
    render() {
        console.log("EditArea Render called.");
        const wireframe = this.props.wireframe;
        const wireframeAttached = (wireframe != null);
        const setControlBeingEdited = this.props.setControlBeingEdited;
        if (wireframeAttached) {
            return (
            <div id = "editArea">
                <div id = "wireframeZone" style = {{width : wireframe.dimensionX, height: wireframe.dimensionY}}>
                        {wireframe.controls.map(function(control) { 
                        return (
                        <ControlGenerator control ={control} key = {control.key} setControlBeingEdited = {setControlBeingEdited}/>
                        );
                    })}
                </div>
            </div>
            )
        }
        else{
            return (
                <div id = "editArea">
                    <div id = "wireframeZone">
                        
                    </div>
                </div>
                )
        }
    }
}
