import React, { Component } from 'react'
import {Button} from 'react-materialize'
import Draggable from 'react-draggable'
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
            <Draggable
            bounds = "parent"
            onStop={this.handleStop}
            >
                <Button className = "buttonControl"
                    node="a"
                    small
                    style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}
                    waves="light"
                > {control.text}
                </Button>
            </Draggable>
        )
    }
}
