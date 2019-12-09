import React, { Component } from 'react'
import ControlGenerator from './controls/ControlGenerator';
import Button from 'react-materialize/lib/Button';

export default class EditArea extends Component {
    constructor(props){
        super(props);
    }
    state = {
        wireframe : this.props.wireframe,
        controlBeingEdited : this.props.controlBeingEdited,
        updatable : false,
    }
    updateDimensions = () =>{
        let wireframe = this.props.wireframe;
        let dimensionXinput = document.getElementById("dimensionXchange");
        let dimensionYinput = document.getElementById("dimensionYchange");
        let newDimensionX = parseInt(dimensionXinput.value);
        let newDimensionY = parseInt(dimensionYinput.value);
        // Capped at 1200 X and 1500 Y
        if (newDimensionX > 5000 || newDimensionX < 1){
            return;
        }
        if (newDimensionY > 5000 || newDimensionY < 1){
            return;
        }
        wireframe.dimensionX = newDimensionX;
        wireframe.dimensionY = newDimensionY;
        this.setState({
            wireframe : wireframe,
            updatable : false,
        })
    }



    makeUpdatable = () =>{
        this.setState({
            updatable : true,
        })
    }

    render() {
        const wireframe = this.props.wireframe;
        const setControlBeingEdited = this.props.setControlBeingEdited;
        const controlBeingEdited = this.props.controlBeingEdited;
        //this.logicallyOrderControls();
        return (
        <div id = "editArea">
            {this.props.preview ? <div></div> : <div className = "wireframeDetails">
                <p className = "wireframeName">{wireframe.name}</p>
                <p>Width: </p>
                <input className = "numberInput" type ="number" id ="dimensionXchange" defaultValue = {wireframe.dimensionX} onChange = {this.makeUpdatable}></input>
                <p>Height: </p>
                <input className = "numberInput" type ="number" id="dimensionYchange" defaultValue = {wireframe.dimensionY} onChange = {this.makeUpdatable}></input>
                <p><Button id = "updateBtn" onClick = {this.updateDimensions} disabled = {!this.state.updatable}>Update</Button></p>
            </div>}
            <div id = "wireframeZone" onClick = {(e)=>this.props.deselectControl(e)} className = "normalZoom" style = {{width : wireframe.dimensionX, height: wireframe.dimensionY}}>
                    {wireframe.controls.map(function(control) { 
                        // If it's the control being edited, flag it to be 
                        return (
                        <ControlGenerator control ={control} key = {control.key} setControlBeingEdited = {setControlBeingEdited} theChosenControl = {control === controlBeingEdited ? true : false} />
                        );
                    }
                )}
            </div>
        </div>
        )
    }
}
