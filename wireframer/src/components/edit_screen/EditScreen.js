import React, { Component } from 'react'
import PropertyEditor from './PropertyEditor'
import ControlSelection from './ControlSelection'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import EditArea from './EditArea';

export default class EditScreen extends Component {
    state = {
        wireframe : null,
        controlBeingEdited : null
    }
    // Loads the data in the wireframe, this is hard hard coded just for testing for now
    loadData(){
        const firestore = getFirestore();
        let docRef = firestore.collection("users").doc("HOR6c5mog0FN0mrYU7Pq");
        let getDoc = docRef.get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                    this.useThisData(doc.data());
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }
    // Currently just taking the first one that I want. Testing.
    useThisData(data){
        this.setState({
            wireframe :  data.wireframes[0]
        });
    }
    saveData = (e) =>{
        // UPDATE IN THE FIRESTORE AS WELL
        const firestore = getFirestore();
        // Save the updated controls
        const wireframe = this.state.wireframe();
        

    }
    // Takes in the control's key, which should match the index of the array
    // This key thing depends on the key matching the index of the array, is that reliable?
    setControlBeingEdited = (key) =>{
        let controlBeingEdited = this.state.wireframe.controls[key];
        this.setState({
            ...this.state,
            controlBeingEdited : controlBeingEdited
        })
    }
    handlePropertyChange = (e)=>{
        // Reload this on property change, might be inefficient. Look for a better way.
        this.setState({
            
        })
    }
    // The PropertyEditor only needs to know what control it's working on.
    // The editAreaDiv needs to know the entire wireframe
    // The controlSelection doesn't need to know shit
    render() {
        //console.log("EditScreen Render called.");
        return (
            <div id = "editScreenParent">
                <div id = "controlSelectionDiv" className ="editScreenDiv"><ControlSelection/></div>
                <div id = "editAreaDiv" className ="editScreenDiv"><EditArea wireframe = {this.state.wireframe} setControlBeingEdited = {this.setControlBeingEdited}/></div>
                <div id = "propertyEditorDiv" className ="editScreenDiv">
                    {this.state.wireframe == null ? <PropertyEditor
                    /> :
                    <PropertyEditor
                        controlToEdit = {this.state.controlBeingEdited}
                        handlePropertyChange = {this.handlePropertyChange}
                    />
                    }
                </div>
                <button onClick = {(e)=>this.loadData()}> LOAD FROM DATABASE</button>
            </div>
        )
    }
}
