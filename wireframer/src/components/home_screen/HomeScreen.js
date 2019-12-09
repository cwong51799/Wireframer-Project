import React, { Component } from 'react'
import {Select, Button, Icon} from 'react-materialize'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { compose } from 'redux';
import { Redirect} from 'react-router-dom';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeOption from './WireframeOption';


class HomeScreen extends Component {
    // I'd like to get a preview of the wireframe shown beneath when the option is selected.
    // The biggest problem right now is accessing the wireframes themselves, connecting with the database, and getting map state to props to work.
    state = {
        usersWireframes : null,
        moveToWireframe : null,
    }

    getUsersWireframes(){
        const {auth} = this.props;
        const userID = auth.uid;
        const firestore = getFirestore();
        firestore.collection('users').doc(userID).get()
        .then(doc =>
            //console.log(doc.data().wireframes)
            this.setState({
                usersWireframes : doc.data().wireframes
            })
        )
    }

    handleNewWireframe = (e) =>{
        const firestore = getFirestore();
        const {auth} = this.props;
        var userID= auth.uid;
        const userWireframes = this.state.usersWireframes;
        // Push the new wireframe then update the database.
        userWireframes.push({
            controls : [],
            dimensionX : 1200,
            dimensionY : 900,
            name : "New Wireframe",
            key : userWireframes.length
        })
        firestore.collection("users").doc(userID).update({
            wireframes : userWireframes
        })
    }

    getWireframeOfName(name){
        const usersWireframes = this.state.usersWireframes;
        for (var i=0;i<usersWireframes.length;i++){
            if (usersWireframes[i].name === name){
                return usersWireframes[i];
            }
        }
    }
    // Currently (The value of the the selector) goes by the name of the wireframe. 
    // This can be a problem if two wireframes have the same name.
    // diff between let / const? const is global?

    // So the idea is that this updates the state and in the render method theres a check where
    // if there is a wireframe to move to, it'll move to it.
    moveToWireframe = (e) =>{
        let nameOfSelectedWireframe = document.getElementById("wireframeSelector").value;
        let wireframe = this.getWireframeOfName(nameOfSelectedWireframe);
        this.setState({
            moveToWireframe : wireframe
        })
    }

    render() {
        const moveToWireframe = this.state.moveToWireframe;
        if (moveToWireframe != null){
            return <Redirect to ={{pathname: "/editScreen", state : {wireframe : moveToWireframe}}}></Redirect>
        }
        const {auth} = this.props;
        const usersWireframes = this.state.usersWireframes;
        // Need to try to map each wireframe to an option.
        // Need to disable the MOVE-TO button if there are no wireframes made yet.
        if (auth.uid){
            // At first the wireframes ar empty, call this method to fill them in
            if (this.state.usersWireframes == null){
                this.getUsersWireframes();
                return <div></div>
            }
            return (
                <div className = "centerPage">
                    <Select
                    onChange = {function noRefCheck(){}}
                    id = "wireframeSelector"
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
                    {usersWireframes.map(wireframe => (
                        <WireframeOption wireframe = {wireframe} key = {wireframe.key}></WireframeOption>
                    ))
                    }
                    </Select>
                    <Button
                        node="button"
                        type="submit"
                        waves="light"
                        onClick = {(e)=>this.moveToWireframe(e)}
                        >
                        Move to Wireframe
                        <Icon right>
                            send
                        </Icon>
                        </Button>
                    <Button
                        node="button"
                        type="submit"
                        waves="light"
                        onClick = {this.handleNewWireframe}
                        >
                        Create a new wireframe!
                    </Button>
                </div>
            )
        }
        else{
            return <div>Log in to get started!</div>
        }
    }

}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);