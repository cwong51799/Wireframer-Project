import React, { Component } from 'react'
import {TextInput} from 'react-materialize'
//https://casesandberg.github.io/react-color/  --v
import { SliderPicker } from 'react-color';
import { getFirestore } from 'redux-firestore';



// Need access to user's ID and the wireframe this is coming from
export default class PropertyEditor extends Component {
    state = {
        control : this.props.controlToEdit
    }

    // Once map state to props is working, set state won't be necessary and I can just update the database.
    // Maybe add the option to wipe background color.
    handleChange = (e) => {
        if (this.props.controlToEdit == undefined){
            return;
        }
        const {target} = e;
        const control = this.props.controlToEdit;
        const fireStore = getFirestore();
        if (target.id === "controlText"){
            control.text = target.value;
            this.props.handlePropertyChange();
            this.setState({
                control: control
            })
        }
        if (target.id === "controlTextSize"){
            control.textSize = target.value;
            this.props.handlePropertyChange();
            this.setState({
                control: control
            })
        }
        if (target.id === "controlBorderThickness"){
            control.borderThickness = target.value;
            this.props.handlePropertyChange();
            this.setState({
                control: control
            })
        }
        if (target.id === "controlBorderRadius"){
            control.borderRadius= target.value;
            this.props.handlePropertyChange();
            this.setState({
                control: control
            })
        }
    }
    handleBackgroundColorChange = (color, e) =>{
        if (this.props.controlToEdit == undefined){
            return;
        }
        const control = this.props.controlToEdit;
        control.backgroundColor = color.hex;
        this.props.handlePropertyChange();
        this.setState({
            control : control
        })
    }
    handleBorderColorChange = (color, e) =>{
        if (this.props.controlToEdit == undefined){
            return;
        }
        const control = this.props.controlToEdit;
        control.borderColor = color.hex;
        this.props.handlePropertyChange();
        this.setState({
            control : control
        })
    }
    render() {
        //console.log("PropertyEditor Render called.");
        const control = this.props.controlToEdit;
        const controlSelected = (this.props.controlToEdit != null);
        return (
            <div className ="propertyEditor">
                Properties
                <TextInput placeholder="Control Text" value = {controlSelected ? control.text : ""} id="controlText" onChange={this.handleChange}/>
                <div className ="property">
                Font-size: 
                <TextInput type = "number" value = {controlSelected ? control.textSize : 0} id = "controlTextSize" onChange={this.handleChange}/>
                </div>
                <div className ="property">
                Background:
                <SliderPicker color = {controlSelected ? control.backgroundColor : "white"} id = "backgroundColor" onChange={this.handleBackgroundColorChange}/>
                </div>
                <div className ="property">
                Border Color:
                <SliderPicker color = {controlSelected ? control.borderColor : "black"} id = "borderColor" onChange={this.handleBorderColorChange}/>
                </div>
                <div className ="property">
                Border Thickness: 
                <TextInput type = "number" placeholder="Thickness" value = {controlSelected ? control.borderThickness : 0} id = "controlBorderThickness" onChange={this.handleChange}/>
                </div>
                <div className ="property">
                Border Radius: 
                <TextInput type = "number" placeholder="Radius" value = {controlSelected ? control.borderRadius : 0} id = "controlBorderRadius" onChange={this.handleChange}/>
                </div>
            </div>
        )
    }
}
