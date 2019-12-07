import React, { Component } from 'react'

export default class LabelControl extends Component {
    constructor(props){
        super(props);
    }
    state = {
        control : this.props.control
    }
    render() {
        const control = this.props.control;
        console.log(control);
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
            <div style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}>
                {control.text}
            </div>
        )
    }
}
