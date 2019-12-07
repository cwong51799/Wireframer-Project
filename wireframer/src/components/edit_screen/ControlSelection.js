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
                        <div id = "containerControlOption"></div>
                        Container 
                    </div>
                    <div className="controlOption">
                        <div id = "labelControlOption"> Prompt for Input</div>
                        Label
                    </div>
                    <div className="controlOption">
                        <div id = "buttonControlOption">  
                        <Button
                            node="a"
                            small
                            style={{
                            marginRight: '5px'
                            }}
                            waves="light"
                        > Submit
                        </Button>
                    </div>
                    Button
                    </div>
                    <div className="controlOption">
                        <div id = "textFieldControlOption">
                            <TextInput label="Input" disabled/>
                        </div>
                    </div>
                    Textfield
                 </div>
            </div>
        )
    }
}
