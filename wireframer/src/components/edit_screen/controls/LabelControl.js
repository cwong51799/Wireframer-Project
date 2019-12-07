import React, { Component } from 'react'
import Draggable from 'react-draggable'

export default class LabelControl extends Component {
    constructor(props){
        super(props);
    }
    state = {
        control : this.props.control
    }
    handleStop = (e, data) =>{
        this.setState({
            newPositionX : data.x,
            newPositionY : data.y
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
            left : control.positionX+"px",
            top : control.positionY+"px",
            size : control.size+"px",
            fontSize : control.textSize +"px",
        }
        return (
            <Draggable
                bounds = "parent"
                onStop={this.handleStop}
            >
                <div className = "labelControl" style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}>
                {control.text}
            </div>
            </Draggable> 
        )
    }
}
