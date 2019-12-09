import React, { Component } from 'react'
import {Icon, Button, TextInput} from 'react-materialize'
import { Redirect} from 'react-router-dom';

export default class ControlSelection extends Component {
    state = {
        closing : false
    }
    // Sets the state and indicates this needs to be closed.
    closeWireframe = (e) =>{
        this.setState({
            closing : true
        })
    }
    render() {
        if (this.state.closing){
            return <Redirect to="/"></Redirect>
        }
        return (
            <div>
                <div className = "controlsRow1">
                    <Button
                        large
                        flat
                        node="button"
                        waves="light"
                    >
                        <Icon small>
                        zoom_in
                        </Icon>
                    </Button>
                    <Button
                        large
                        flat
                        node="button"
                        waves="light"
                    >
                        <Icon small>
                        zoom_out
                        </Icon>
                    </Button>
                    <Button
                        large
                        flat
                        node="button"
                        waves="light"
                        onClick = {(e)=>this.props.saveData(e)}
                    >
                        Save
                    </Button>
                    <Button
                        large
                        flat
                        node="button"
                        waves="light"
                        onClick = {(e)=>this.closeWireframe(e)}
                    >
                        Close
                    </Button>
                </div>
                <div className ="controlsRow2"> 
                    <div className="controlOption">
                        <div className = "containerControlOption" onClick={(e)=>this.props.createNewControl(e)}></div>
                        Container 
                    </div>
                    <div className="controlOption">
                        <div className = "labelControlOption" onClick={(e)=>this.props.createNewControl(e)}> Prompt for Input</div>
                        Label
                    </div>
                    <div className="controlOption">
                        <div className = "buttonControlOption">  
                        <Button
                            node="a"
                            small
                            style={{
                            marginRight: '5px'
                            }}
                            waves="light"
                            // Had to put it in here, the button is an exception.
                            onClick={(e)=>this.props.createNewControl(e)}
                        > Submit
                        </Button>
                    </div>
                    Button
                    </div>
                    <div className="controlOption">
                        <div className = "textFieldControlOption" onClick={(e)=>this.props.createNewControl(e)}>
                            <TextInput className = "textFieldControlOption" disabled label="Input"/>
                        </div>
                    </div>
                    Textfield
                 </div>
            </div>
        )
    }
}
