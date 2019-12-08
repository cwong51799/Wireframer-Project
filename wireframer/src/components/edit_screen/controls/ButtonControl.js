import React, { Component } from 'react'
import {Button} from 'react-materialize'
import {Rnd} from 'react-rnd'
export default class ButtonControl extends Component {
    state = {
        control : this.props.control,
        newPositionX : this.props.control.positionX,
        newPositionY : this.props.control.positionY,
    }
    handleDragStop = (e, data) =>{
        const control = this.state.control;
        control.positionX = data.x;
        control.positionY = data.y;
    }
    handleResizeStop = (e,dir, ref, delta, position) =>{
        let widthChange = delta.width;
        let heightChange = delta.height;
        const control = this.props.control;
        control.width = control.width + widthChange;
        control.height = control.height + heightChange;
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
        >   <div className = {this.props.theChosenControl ? "box" : ""} style = {{width : (parseInt(control.width) + 20) + "px", height: (parseInt(control.height)) +"px"}}>
                <Button className = "buttonControl"
                    node="a"
                    small
                    style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key,e)}
                    waves="light"
                > {control.text}
                </Button>
            </div>
            </Rnd>
        )
    }
}
