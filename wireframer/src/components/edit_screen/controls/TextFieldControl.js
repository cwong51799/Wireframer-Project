import React, { Component } from 'react'
import {TextInput} from 'react-materialize'
export default class TextFieldControl extends Component {
    state = {
        control : this.props.control
    }
    render() {
        const control = this.props.control;
        const style = {
            // Need to find the appropriate official name properties
            backgroundColor : control.backgroundColor,
            // Need to get border working
            border : control.borderThickness + " solid " + control.borderColor,
            left : control.positionX,
            top : control.positionY,
            size : control.size,
            fontSize : control.textSize,
        }
        return (
            <div>
                <TextInput label="Input" disabled/>
            </div>
        )
    }
}
