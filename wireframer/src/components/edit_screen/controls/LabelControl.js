import React, { Component } from 'react'
import {Rnd} from 'react-rnd'


export default class LabelControl extends Component {
    constructor(props){
        super(props);
    }
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
            backgroundColor : control.backgroundColor,
            borderWidth : control.borderThickness + "px " + control.borderThickness+"px",
            borderRadius : control.borderRadius +"px",
            borderStyle: "solid",
            borderColor: control.borderColor,
            position : "absolute",
            width : control.width +"px",
            height : control.height + "px",
            fontSize : control.textSize +"px",
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
                <div className = "labelControl" style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key,e)}>
                {control.text}
            </div>
            </Rnd>
        )
    }
}
