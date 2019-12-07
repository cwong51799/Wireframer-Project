import React, { Component } from 'react'
import {TextInput} from 'react-materialize'
import Draggable from 'react-draggable'

export default class TextFieldControl extends Component {
    state = {
        control : this.props.control
    }
    // This shows the data x / y relative to it's starting position. When saving, do current X - data.x, current Y - data.y to get the relative value
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
            position: "absolute",
            left : control.positionX+"px",
            top : control.positionY+"px",
            size : control.size +"px",
            fontSize : control.textSize +"px",
        }
        return (
            <Draggable
            bounds = "parent"
            onStop={this.handleStop}
            >   
                <div className = "thinner" style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}>
                <TextInput label={control.text}  disabled />
                </div>
            </Draggable>
        )
    }
}
