import React, { Component } from 'react'
import Draggable from 'react-draggable'



// Have a control component that will read in a control and pass in one of these bad
// boys based on their label. It should only get here if it
// is a container.
export default class ContainerControl extends Component {
    state = {
        control : this.props.control,
        // Save the new positions only if the save is clicked.
        newPositionX : this.props.control.positionX,
        newPositionY : this.props.control.positionY,
    }
    // Every control knows it's last possibly new positionX and Y.
    handleStop = (e, data) =>{
        this.setState({
            newPositionX : data.x,
            newPositionY : data.y
        })
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
