import React, { Component } from 'react'
import Draggable from 'react-draggable'



// Have a control component that will read in a control and pass in one of these bad
// boys based on their label. It should only get here if it
// is a container.
export default class ContainerControl extends Component {
    state = {
        control : this.props.control,
    }
    // Add difference in X / Y 
    handleStop = (e, data) =>{
        console.log(data.x, data.y);
       /* const target = e.target;
        const movementData = target.style.transform;
        const control = this.props.control;
        if (movementData == ""){
            console.log("No movement data, exiting.");
            console.log(control.positionX, control.positionY);
            return;
        }
        // Extracts the movement in the X/Y direction from format "translate(0px, 0px)"
        let movementX = movementData.slice(10, movementData.indexOf("px")+2);
        let movementY = movementData.slice(movementData.indexOf("px")+4, movementData.length-1);
        control.positionX = parseInt(control.positionX) + parseInt(movementX);
        control.positionY = parseInt(control.positionY) + parseInt(movementY);
        target.style.transform = "translate(0px, 0px)"; */
    }
    render() {
        const control = this.props.control;
        const style = {
            backgroundColor : control.backgroundColor,
            borderWidth : control.borderThickness + "px " + control.borderThickness+"px",
            borderRadius : control.borderRadius +"px",
            borderStyle: "solid",
            borderColor: control.borderColor,
            position : "absolute",
            left : control.positionX+"px",
            top : control.positionY+"px",
            size : control.size+"5px",
            // Font size updates but nothing changes.
            fontSize : control.textSize +"px",
        }
        return (
            <Draggable
                bounds = "parent"
                onStop={this.handleStop}
            >
            <div className = "containerControlOption" style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}>{control.text}</div>
            </Draggable>
        )
    }
}
