import React, { Component } from 'react'
import LabelControl from './LabelControl';
import TextFieldControl from './TextFieldControl';
import ButtonControl from './ButtonControl';
import ContainerControl from './ContainerControl';

export default class ControlGenerator extends Component {
    constructor(props){
        super(props);
    }
    render() {
        //console.log("ControlGenerator Render called.");
        const control = this.props.control;
        if (control.type === "container"){
            return (
                <ContainerControl control = {control} setControlBeingEdited = {this.props.setControlBeingEdited}/>
            )
        }
        if (control.type === "label"){
            return (
                <LabelControl control = {control} setControlBeingEdited = {this.props.setControlBeingEdited}/>
            )
        }
        if (control.type === "button"){
            return (
                <ButtonControl control = {control} setControlBeingEdited = {this.props.setControlBeingEdited}/>
            )
        }
        if (control.type === "textfield"){
            return (
                <TextFieldControl control = {control} setControlBeingEdited = {this.props.setControlBeingEdited}/>
            )
        }
    }
}
