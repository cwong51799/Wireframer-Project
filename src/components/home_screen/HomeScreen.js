import React, { Component } from 'react'
import {Select, Button, Icon, Modal} from 'react-materialize'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect} from 'react-router-dom';
import { firestoreConnect} from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeOption from './WireframeOption';
import EditArea from '../edit_screen/EditArea';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class HomeScreen extends Component {
    // I'd like to get a preview of the wireframe shown beneath when the option is selected.
    // This doesn't move the most recently accessed to the top. Due to how the selector works. But this can be changed similar to HW3
    state = {
        usersWireframes : null,
        moveToWireframe : null,
        wireframeSelected : null,
        refresh : false,
    }
    randomAdjectives = ["Fluffy","Pillow","Plant","Patience","Night","Homework","Costco","Salty","Baboon","Mirror","BigFan",
                        "Clock","Water","Doggo","Tree"]
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
        // If the name would be a duplicate, do something different.
        let name = this.randomAdjectives[Math.floor(Math.random() * this.randomAdjectives.length)] + Math.floor(Math.random()*100) + Math.floor(Math.random()*100);
        // Push the new wireframe then update the database.
        userWireframes.push({
            controls : [],
            dimensionX : 1000,
            dimensionY : 900,
            name : name,
            key : userWireframes.length,
            lastAccessed : ""
        })
        firestore.collection("users").doc(userID).update({
            wireframes : userWireframes
        })
        // Update after adding.
        toast("A new wireframe named " + name + " has been created.");
        this.setState({
            wireframeSelected : userWireframes[userWireframes.length-1]
        })
    }

    isDuplicateName(usersWireframes, name){
        for (var i=0;i<usersWireframes.length;i++){
            if (usersWireframes[i].name === name){
                return true;
            }
        }
        return false;
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
        const {auth} = this.props;
        const userID = auth.uid;
        const firestore = getFirestore();
        let usersWireframes = this.state.usersWireframes;
        let wireframe = this.state.wireframeSelected;
        wireframe.lastAccessed = new Date().toISOString();
        firestore.collection("users").doc(userID).update({
            wireframes : usersWireframes
        })
        this.setState({
            moveToWireframe : wireframe,
            mostRecentWireframe : wireframe,
        })
    }
    // Same with this
    deleteWireframe = (e) =>{
        const usersWireframes = this.state.usersWireframes;
        let wireframe = this.state.wireframeSelected;
        let key = wireframe.key;
        let indexToRemove = -1;
        // Find what to remove and remove it.
        for (var i=0;i<usersWireframes.length;i++){
            if (usersWireframes[i].key === key){
                indexToRemove = i;
            }
        }
        usersWireframes.splice(indexToRemove, 1);
        // Update the key of the remaining elements
        for (i = indexToRemove; i<usersWireframes.length;i++){
            usersWireframes[i].key = usersWireframes[i].key-1;
        }
        // update the database
        const {auth} = this.props;
        const userID = auth.uid;
        const firestore = getFirestore();
        firestore.collection('users').doc(userID).update({
            wireframes : usersWireframes
        })
        toast(this.state.wireframeSelected.name + " has been deleted.")
        this.setState({
            wireframeSelected : null,
            redirect : !this.state.redirect
        });

    }
    reorderByAccessDate(wireframes){
        wireframes.sort(function(item1,item2){
            if (item1.lastAccessed > item2.lastAccessed){
                console.log(item1.name + " was accessed more recently than " + item2.name);
                return -1;
            }
            if (item1.lastAccessed < item2.lastAccessed){
                return 1;
            }
            else{
                return 0;
            }
        });
        this.fixKeys(wireframes);
    }
    fixKeys(wireframes){
        for (var i=0;i<wireframes.length;i++){
            wireframes[i].key = i;
        }
    }

    render() {
        const moveToWireframe = this.state.moveToWireframe;
        let usersWireframes = this.state.usersWireframes;
        let wireframeSelected = this.state.wireframeSelected;
        let EditAreaPreview = wireframeSelected != null ? <EditArea wireframe = {wireframeSelected} preview = {true}/> : <div></div>
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
            this.reorderByAccessDate(usersWireframes);
            return (
                <div className = "homeScreen">
                    <div className = "centerPage">
                        <Select
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
                    <div className = "wireframePreview" disabled><div className = "center">{EditAreaPreview}</div></div>
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
      { collection: 'wireframes' },
    ]),
)(HomeScreen);