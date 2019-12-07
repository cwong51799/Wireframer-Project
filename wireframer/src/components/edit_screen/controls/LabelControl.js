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
        const style = {
            // Need to find the appropriate official name properties
            backgroundColor : control.backgroundColor,
            // Need to get border working
            border : control.borderThickness + " solid " + control.borderColor,
            left : control.positionX,
            top : control.positionY,
            size : control.size,
            // Font size updates but nothing changes.
            fontSize : control.textSize,
        }
        return (
            <div style = {style} onClick = {(e)=>this.props.setControlBeingEdited(control.key)}>
                {control.text}
            </div>
        )
    }
}
