import React, { Component } from 'react'
import LabelControl from './LabelControl';
import TextFieldControl from './TextFieldControl';
import ButtonControl from './ButtonControl';
import ContainerControl from './ContainerControl';

export default class ControlGenerator extends Component {
    constructor(props){
        super(props);
    }
    // If the control is default set to outside the bounds of the wireframe, it will show there at first and need to be snapped in.
    // I dont know if I need to accoutn for this however, since the wireframe is to be made by the user, not loaded using a cfg.
    render() {
        //console.log("ControlGenerator Render called.");
        const control = this.props.control;
        if (control.type === "container"){
            return (
                <ContainerControl control = {control} setControlBeingEdited = {this.props.setControlBeingEdited} theChosenControl = {this.props.theChosenControl}/>
            )
        }
        if (control.type === "label"){
            return (
                <LabelControl control = {control} setControlBeingEdited = {this.props.setControlBeingEdited} theChosenControl = {this.props.theChosenControl}/>
            )
        }
        if (control.type === "button"){
            return (
                <ButtonControl control = {control} setControlBeingEdited = {this.props.setControlBeingEdited} theChosenControl = {this.props.theChosenControl}/>
            )
        }
        if (control.type === "textfield"){
            return (
                <TextFieldControl control = {control} setControlBeingEdited = {this.props.setControlBeingEdited} theChosenControl = {this.props.theChosenControl}/>
            )
        }
    }
}
