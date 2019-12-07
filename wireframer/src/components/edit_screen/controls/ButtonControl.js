import React, { Component } from 'react'
import {Button} from 'react-materialize'
export default class ButtonControl extends Component {
    state = {
        control : this.props.control
    }
    render() {
        const control = this.props.control;
        const style = {
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
            <div style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}><Button className = "buttonTest"
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
