import React, { Component } from 'react'
import {Button} from 'react-materialize'
export default class ButtonControl extends Component {
    state = {
        control : this.props.control
    }
    render() {
        const control = this.props.control;
        const style = {
            position : "absolute",
            left : control.positionX+"px",
            top : control.positionY+"px",
            size : control.size+"px",
            // Font size updates but nothing changes.
            fontSize : control.textSize +"px",
        }
        return (
            <div style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}><Button className = "buttonControl"
                node="a"
                small
                style={{
                backgroundColor : control.backgroundColor,
                borderWidth : control.borderThickness + "px " + control.borderThickness+"px",
                borderRadius : control.borderRadius +"px",
                borderStyle: "solid",
                borderColor: control.borderColor,
                }}
                waves="light"
            > {control.text}
            </Button>
            </div>
        )
    }
}
