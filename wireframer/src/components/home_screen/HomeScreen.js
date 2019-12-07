import React, { Component } from 'react'
import {Select, Button, Icon} from 'react-materialize'
export default class HomeScreen extends Component {
    // I'd like to get a preview of the wireframe shown beneath when the option is selected.
    // The biggest problem right now is accessing the wireframes themselves, connecting with the database, and getting map state to props to work.
    render() {
        console.log(this.props)
        // Need to disable the MOVE-TO button if there are no wireframes made yet.
        return (
            <div className = "centerPage">
                <Select
                onChange={function noRefCheck(){}}
                options={{
                    classes: '',
                    dropdownOptions: {
                    alignment: 'left',
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    container: null,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250,
                    }
                }}
                value=""
                >
                <option value="1">
                    Option 1
                </option>
                <option value="2">
                    Option 2
                </option>
                <option value="3">
                    Option 3
                </option>
                </Select>
                <Button
                    node="button"
                    type="submit"
                    waves="light"
                    >
                    Move to Wireframe
                    <Icon right>
                        send
                    </Icon>
                    </Button>
            </div>
        )
    }
}
