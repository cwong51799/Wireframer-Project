import React, { Component } from 'react'
import {TextInput} from 'react-materialize'
import {Rnd} from 'react-rnd'


export default class TextFieldControl extends Component {
    state = {
        control : this.props.control
    }
    // This shows the data x / y relative to it's starting position. When saving, do current X - data.x, current Y - data.y to get the relative value
    handleDragStop = (e, data) =>{
        this.setState({
            newPositionX : data.x,
            newPositionY : data.y
        })
    }
    handleResizeStop = (e,dir, ref, delta, position) =>{
        let widthChange = delta.width;
        let heightChange = delta.height;
        const control = this.props.control;
        control.width = control.width + widthChange;
        control.height = control.height + heightChange;
        this.setState({
            control : control,
            newPositionX : position.x,
            newPositionY : position.y
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
            position: "absolute",
            width : control.width +"px",
            height : control.height + "px",
            fontSize : control.textSize +"px",
        }
        return (
            <Rnd
            onDragStop = {this.handleDragStop}
            onResizeStop = {this.handleResizeStop}
            bounds = "parent"
            default={{
                x: control.positionX,
                y: control.positionY,
                width: style.width,
                height: style.height,
              }}
        >
            <div className = {this.props.theChosenControl ? "box" : ""} style = {{width : (parseInt(control.width) + 20) + "px", height: (parseInt(control.height)) +"px"}}>
                <div className = "textfieldControl" style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key,e)}>
                <TextInput label={control.text}  disabled />
                </div>
            </div>
            </Rnd>
        )
    }
}
