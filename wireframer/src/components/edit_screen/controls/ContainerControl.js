import React, { Component } from 'react'
import {Rnd} from 'react-rnd'


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
    handleDragStop = (e, data) =>{
        const control = this.state.control;
        control.positionX = data.x;
        control.positionY = data.y;
    }
    handleResizeStop = (e,dir, ref, delta, position) =>{
        let widthChange = delta.width;
        let heightChange = delta.height;
        const control = this.props.control;
        control.width = control.width + widthChange;
        control.height = control.height + heightChange;
        this.setState({});
    }
    render() {
        const control = this.state.control;
        const style = {
            backgroundColor : control.backgroundColor,
            borderWidth : control.borderThickness + "px " + control.borderThickness+"px",
            borderRadius : control.borderRadius +"px",
            borderStyle: "solid",
            borderColor: control.borderColor,
            position : "absolute",
            width : control.width +"px",
            height : control.height + "px",
            fontSize : control.textSize +"px",
        }
        return (
            <Rnd
                onDragStop = {this.handleDragStop}
                onResizeStop = {this.handleResizeStop}
                bounds = "parent"
                stop-propagation="true"
                default={{
                    x: control.positionX,
                    y: control.positionY,
                    width: style.width,
                    height: style.height,
                  }}
            >
            <div className = {this.props.theChosenControl ? "box" : ""} style = {{width : (parseInt(control.width) + 20) + "px", height: (parseInt(control.height)) +"px"}}>
                <div className = "containerControl" style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key,e)}>{control.text}</div>
            </div>
            </Rnd>
        )
    }
}
