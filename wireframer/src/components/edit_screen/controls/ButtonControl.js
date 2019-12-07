import React, { Component } from 'react'
import {Button} from 'react-materialize'
export default class ButtonControl extends Component {
    state = {
        control : this.props.control
    }
    render() {
        const control = this.props.control;
        const style = {
            // Need to find the appropriate official name properties
            // Need to get border working
            border : control.borderThickness + " solid " + control.borderColor,
            left : control.positionX,
            top : control.positionY,
            size : control.size,
            fontSize : control.textSize,
        }
        return (
            <div style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}><Button
                node="a"
                small
                style={{
                backgroundColor : control.backgroundColor,
                }}
                waves="light"
            > {control.text}
            </Button>
            </div>
        )
    }
}
