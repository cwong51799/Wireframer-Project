import React, { Component } from 'react'
import {TextInput} from 'react-materialize'
//https://casesandberg.github.io/react-color/  --v
import { SliderPicker } from 'react-color';

export default class PropertyEditor extends Component {
    render() {
        console.log(this.props.wireframe);
        return (
            <div className ="propertyEditor">
                Properties
                <TextInput placeholder="Control Text" />
                <div className ="property">
                Font-size: 
                <TextInput type = "number" placeholder="Font Size" />
                </div>
                <div className ="property">
                Background:
                <SliderPicker/>
                </div>
                <div className ="property">
                Border Color:
                <SliderPicker/>
                </div>
                <div className ="property">
                Border Thickness: 
                <TextInput type = "number" placeholder="Thickness" />
                </div>
                <div className ="property">
                Border Radius: 
                <TextInput type = "number" placeholder="Radius" />
                </div>
            </div>
        )
    }
}
