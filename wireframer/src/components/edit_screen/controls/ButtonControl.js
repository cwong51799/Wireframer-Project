import React, { Component } from 'react'
import {Button} from 'react-materialize'
import {Rnd} from 'react-rnd'
export default class ButtonControl extends Component {
    state = {
        control : this.props.control
    }
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
            width : control.width +"px",
            height : control.height + "px",
            fontSize : control.textSize +"px",
            backgroundColor : control.backgroundColor,
            borderWidth : control.borderThickness + "px " + control.borderThickness+"px",
            borderRadius : control.borderRadius +"px",
            borderStyle: "solid",
            borderColor: control.borderColor,
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
                <Button className = "buttonControl"
                    node="a"
                    small
                    style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key,e)}
                    waves="light"
                > {control.text}
                </Button>
            </Rnd>
        )
    }
}
