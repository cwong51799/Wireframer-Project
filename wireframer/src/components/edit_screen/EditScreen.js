import React, { Component } from 'react'
import PropertyEditor from './PropertyEditor'
import ControlSelection from './ControlSelection'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import EditArea from './EditArea';

export default class EditScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            wireframe : null,
            controlBeingEdited : null
        }
        document.body.onkeydown = (e) => {
            // delete
            // Should never be null.
            if (e.keyCode === 46 && this.state.wireframe != null){
                this.removeControl(this.state.controlBeingEdited);  
            }
        }    
    }

    removeControl(controlToRemove){
        const controls = this.state.wireframe.controls;
        controls.splice(controlToRemove.key, 1);
        // Update the key of the remaining elements
        console.table(controls)
        for (var i = controlToRemove.key; i<controls.length;i++){
            controls[i].key = controls[i].key-1;
        }
        console.table(controls);
        // reload after deleting
        this.setState({
        
        })
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
    setControlBeingEdited = (key,e) =>{
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
    // Methods to be sent to and triggered by the ControlSelection
    createNewControl = (e) =>{
        const type = e.target.className;
        // This should never happen, since this page is loaded with a wireframe.
        if (this.state.wireframe == null){
            return;
        }
        let wireframeControls = this.state.wireframe.controls;
        switch(type){
            // Create default container
            case 'containerControlOption':
                wireframeControls.push({
                    key : wireframeControls.length,
                    positionX : 0,
                    positionY: 0,
                    width : 200,
                    height : 100,
                    text : "",
                    textSize : 12,
                    backgroundColor : "#FFFFFF",
                    borderColor : "#000000",
                    borderThickness : 5,
                    borderRadius : 2,
                    type : "container"
                })
                break;
            // Default label
            case 'labelControlOption':
                    wireframeControls.push({
                        key : wireframeControls.length,
                        className : "labelControl",
                        positionX : 0,
                        positionY: 0,
                        width: 200,
                        height: 50,
                        text : "Prompt for Input",
                        textSize : 20,
                        backgroundColor : "#FFFFFF",
                        borderColor : "#000000",
                        borderThickness : 1,
                        borderRadius : 1,
                        type : "label"
                    })
                    break;
            // Default button
            case 'waves-effect waves-light btn-small':
                    wireframeControls.push({
                        key : wireframeControls.length,
                        className : "buttonControl",
                        positionX : 0,
                        positionY: 0,
                        width: 92,
                        height: 32,
                        text : "Submit",
                        textSize : 16,
                        backgroundColor : "#26a69a",
                        borderColor : "#000000",
                        borderThickness : 0,
                        borderRadius : 0,
                        type : "button"
                    })
                    break;
            // Default text field
            case 'textFieldControlOption':
                wireframeControls.push({
                    key : wireframeControls.length,
                    className : "textfieldControl",
                    positionX : 0,
                    positionY: 0,
                    width: 200,
                    height: 100,
                    text : "Input",
                    textSize : 16,
                    backgroundColor : "#FFFFFF",
                    borderColor : "#000000",
                    borderThickness : 1,
                    borderRadius : 0,
                    type : "textfield"
                })
                break;
        }
        // Update after adding, shouldn't this be automatic?
        this.setState({
            
        })
    }
    // Working towards getting the delete control
    deleteControl = (e) =>{
        const controls = this.state.wireframe.controls;
        console.table(controls);
        controls.remove(this.state.controlBeingEdited);
        console.table(controls);
    }

    // The PropertyEditor only needs to know what control it's working on.
    // The editAreaDiv needs to know the entire wireframe
    // The controlSelection doesn't need to know shit
    render() {
        //console.log("EditScreen Render called.");
        return (
            <div id = "editScreenParent">
                <div id = "controlSelectionDiv" className ="editScreenDiv"><ControlSelection createNewControl = {this.createNewControl}/></div>
                <div id = "editAreaDiv" className ="editScreenDiv"><EditArea wireframe = {this.state.wireframe} controlBeingEdited = {this.state.controlBeingEdited} setControlBeingEdited = {this.setControlBeingEdited}/></div>
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
