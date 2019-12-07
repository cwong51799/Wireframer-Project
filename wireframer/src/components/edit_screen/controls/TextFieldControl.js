import React, { Component } from 'react'
import {TextInput} from 'react-materialize'
export default class TextFieldControl extends Component {
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
            <div>
                <TextInput label="Input" disabled/>
            </div>
        )
    }
}
