import React, { Component } from 'react'
import {Select, Button, Icon, Modal} from 'react-materialize'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { compose } from 'redux';
import { Redirect} from 'react-router-dom';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeOption from './WireframeOption';
import EditArea from '../edit_screen/EditArea';


class HomeScreen extends Component {
    // I'd like to get a preview of the wireframe shown beneath when the option is selected.
    state = {
        usersWireframes : null,
        moveToWireframe : null,
        wireframeSelected : null,
        refresh : false,
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
            name : "Wireframe " + (userWireframes.length+1),
            key : userWireframes.length
        })
        firestore.collection("users").doc(userID).update({
            wireframes : userWireframes
        })
        // Update after adding.
        this.setState({})
    }

    getWireframeOfName(name){
        const usersWireframes = this.state.usersWireframes;
        for (var i=0;i<usersWireframes.length;i++){
            if (usersWireframes[i].name === name){
                return usersWireframes[i];
            }
        }
    }

    handleSelectChange = (e) =>{
        let wireframeName = document.getElementById("wireframeSelector").M_FormSelect.input.value;
        let wireframeSelected = this.getWireframeOfName(wireframeName);
        this.setState({
            wireframeSelected : wireframeSelected
        })
    }
    // Currently (The value of the the selector) goes by the name of the wireframe. 
    // This can be a problem if two wireframes have the same name.
    // diff between let / const? const is global?

    // So the idea is that this updates the state and in the render method theres a check where
    // if there is a wireframe to move to, it'll move to it.
    // IT'S ONLY GOING TO THE FIRST ONE
    moveToWireframe = (e) =>{
        let wireframe = this.state.wireframeSelected;
        this.setState({
            moveToWireframe : wireframe
        })
    }
    // Same with this
    deleteWireframe = (e) =>{
        const usersWireframes = this.state.usersWireframes;
        let wireframe = this.state.wireframeSelected;
        let key = wireframe.key;
        usersWireframes.splice(key, 1);
        // Update the key of the remaining elements
        for (var i = key; i<usersWireframes.length;i++){
            usersWireframes[i].key = usersWireframes[i].key-1;
        }
        // update the database
        const {auth} = this.props;
        const userID = auth.uid;
        const firestore = getFirestore();
        firestore.collection('users').doc(userID).update({
            wireframes : usersWireframes
        })
        this.setState({
            redirect : !this.state.redirect
        });
    }



    render() {
        const moveToWireframe = this.state.moveToWireframe;
        const usersWireframes = this.state.usersWireframes;
        const wireframeSelected = this.state.wireframeSelected;
        const EditAreaPreview = wireframeSelected != null ? <EditArea wireframe = {wireframeSelected}/> : <div></div>
        if (this.state.refresh){
            return <Redirect to='/' />
        }
        if (moveToWireframe != null){
            return <Redirect to ={{pathname: "/editScreen", state : {wireframe : moveToWireframe, usersWireframes :this.state.usersWireframes}}}></Redirect>
        }
        const {auth} = this.props;
        // Need to try to map each wireframe to an option.
        // Need to disable the MOVE-TO button if there are no wireframes made yet.
        if (auth.uid){
            // At first the wireframes ar empty, call this method to fill them in
            if (this.state.usersWireframes == null){
                this.getUsersWireframes();
                return <div></div>
            }
            return (
                <div className = "homeScreen">
                    <div className = "centerPage">
                        <Select
                        onChange = {function noRefCheck(){}}
                        onChange = {(e)=>this.handleSelectChange(e)}
                        defaultValue = {wireframeSelected != null ? wireframeSelected.name : ""}
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
                        <option value ={false}>Select a Wireframe</option>
                        {usersWireframes.map(wireframe => (
                            <WireframeOption wireframe = {wireframe} key = {wireframe.key}></WireframeOption>
                        ))
                        }
                        </Select>
                        {this.state.wireframeSelected != null ? <div className = "selectedNotification">
                            You have selected {wireframeSelected.name}
                        </div> : <div>You have not selected a wireframe yet.</div>}

                        <div className = "wireframeOptions">
                        <Button
                            node="button"
                            type="submit"
                            waves="light"
                            disabled = {wireframeSelected == null ? true : false}
                            onClick = {(e)=>this.moveToWireframe(e)}
                            >
                            Move to {wireframeSelected != null ? wireframeSelected.name : "wireframe"}
                            <Icon right>
                                send
                            </Icon>
                            </Button>
                        <Modal header="Delete Wireframe" trigger={
                            <Button disabled = {wireframeSelected == null ? true : false} className ="deleteWireframeBtn" waves="red" style={{marginRight: '5px'}}>
                                Delete {wireframeSelected != null ? wireframeSelected.name : "wireframe"}
                            </Button>
                        }
                            actions = {[<Button className = "modal-close" flat> Close </Button>, <Button flat className = "modal-close" onClick = {(e)=>this.deleteWireframe(e)}>Confirm</Button>]}> 
                            <p>Are you sure you want to delete {wireframeSelected != null ? wireframeSelected.name : "this wireframe"}? </p>
                            <p><b>This action is irreversible.</b></p>
                        </Modal>
                        </div>
                        <Button
                            node="button"
                            type="submit"
                            waves="light"
                            className = "createNewWireframeBtn"
                            onClick = {this.handleNewWireframe}
                            >
                            Create a new wireframe!
                        </Button>
                    </div>
                    <div className = "preview">{wireframeSelected != null ? "Preview of " + wireframeSelected.name : ""}</div>
                    <div className = "wireframePreview" disabled>{EditAreaPreview}</div>
                </div>
            )
        }
        else{
            return <div></div>
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