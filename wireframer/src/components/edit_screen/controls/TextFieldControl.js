import React, { Component } from 'react'
import {TextInput} from 'react-materialize'
export default class TextFieldControl extends Component {
    state = {
        control : this.props.control
    }
    // I guess the top left should determine it's position and from there it's just size.
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
            // Font size updates but nothing changes.
            fontSize : control.textSize +"px",
        }
        return (
            <div className = "thinner" style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}>
            <TextInput label={control.text}  disabled />
            </div>
        )
    }
}
