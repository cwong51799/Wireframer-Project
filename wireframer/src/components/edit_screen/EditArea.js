import React, { Component } from 'react'
import ControlGenerator from './controls/ControlGenerator';

export default class EditArea extends Component {
    constructor(props){
        super(props);
    }
    state = {
        wireframe : this.props.wireframe,
        controlBeingEdited : this.props.controlBeingEdited,
    }
    // I guess containers should alway's be behind everything else, therefore they must be rendered last.
    // Ensures that containers are rendered first and behind everything else.
    // Could add more logic to ths but eh, right now everything beyond containers are up to the order they're placed.
    logicallyOrderControls(){
        const wireframeControls = this.props.wireframe.controls;
        wireframeControls.sort((control1, control2)=>{
            if (control1.type == "container"){
                return -1;
            }
            else{
                return 1;
            }
        });
    }
    // How can I get this area to be centered no matter what?
    render() {
        //console.log("EditArea Render called.");
        const wireframe = this.props.wireframe;
        const wireframeAttached = (wireframe != null);
        const setControlBeingEdited = this.props.setControlBeingEdited;
        const controlBeingEdited = this.props.controlBeingEdited;
        if (wireframeAttached) {
            this.logicallyOrderControls();
            return (
            <div id = "editArea">
                <div id = "wireframeZone" style = {{width : wireframe.dimensionX, height: wireframe.dimensionY}}>
                        {wireframe.controls.map(function(control) { 
                            // If it's the control being edited, flag it to be 
                            return (
                            <ControlGenerator control ={control} key = {control.key} setControlBeingEdited = {setControlBeingEdited} theChosenControl = {control == controlBeingEdited ? true : false} />
                            );
                        }
                    )}
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
