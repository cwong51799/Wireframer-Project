import React, { Component } from 'react'
import {Icon, Button, TextInput} from 'react-materialize'
export default class ControlSelection extends Component {
    render() {
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
                    >
                        Save
                    </Button>
                    <Button
                        large
                        flat
                        node="button"
                        waves="light"
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
