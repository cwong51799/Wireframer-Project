import React, { Component } from 'react'

export default class ButtonControl extends Component {
    render() {
        return (
            <div><Button
                node="a"
                small
                style={{
                marginRight: '5px'
                }}
                waves="light"
            > Submit
            </Button>
            </div>
        )
    }
}
