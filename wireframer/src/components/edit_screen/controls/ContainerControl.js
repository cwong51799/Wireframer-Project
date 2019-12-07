import React, { Component } from 'react'



// Have a control component that will read in a control and pass in one of these bad
// boys based on their label. It should only get here if it
// is a container.
export default class ContainerControl extends Component {
    state = {
        control : this.props.control
    }
    render() {
        const control = this.props.control;
        const style = {
            backgroundColor : control.backgroundColor,
            borderWidth : control.borderThickness + "px " + control.borderThickness+"px",
            borderRadius : control.borderRadius +"px",
            borderStyle: "solid",
            borderColor: control.borderColor,
            left : control.positionX,
            top : control.positionY,
            size : control.size,
            // Font size updates but nothing changes.
            fontSize : control.textSize +"px",
        }
        return (
            <div className = "containerControlOption" style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}>{control.text}</div>
        )
    }
}
