import React, { Component } from 'react'
import {TextInput, Button} from 'react-materialize'
export default class RegisterScreen extends Component {
    render() {
        return (
            <div>
                 <TextInput
                    icon="email"
                    label="Email"
                />
                <TextInput
                    icon="lock"
                    label="Password"
                />
                <TextInput
                    icon="person_pin"
                    label="First Name"
                />
                <TextInput
                    icon="person_pin"
                    label="Last Name"
                />
                  <Button
                    node="button"
                    style={{
                    marginRight: '5px'
                    }}
                    waves="light"
                >
                    Register
                </Button>
            </div>
        )
    }
}
