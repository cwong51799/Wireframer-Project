import React, { Component } from 'react'
import PropertyEditor from './PropertyEditor'
import ControlSelection from './ControlSelection'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import EditArea from './EditArea';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// EditScreen must be able to know which wireframe it's working on within the total wireframe array such that
// it can update / delete it. I'll probably have to do this by working around with the keys. Maybe pass the key and all the wireframes down as a prop.
// Maybe theres a more efficient way.

class EditScreen extends Component {
    constructor(props){
        super(props);
        // SCUFFED
        if (this.props.location.state !== undefined){
            this.state = {
                wireframe : this.props.location.state.wireframe,
                controlBeingEdited : null
            }
        }
        
        document.body.onkeydown = (e) => {
            if (e.ctrlKey){
                if (this.state.controlBeingEdited != null){
                    if (e.keyCode === 68){
                        this.duplicateControl(this.state.controlBeingEdited);
                    }
                }
            }
            else if(e.keyCode === 46){
                this.removeControl(this.state.controlBeingEdited);  
            }
        }
    } 



    duplicateControl(controlToDuplicate){
        const controls = this.state.wireframe.controls;
        let controlCopy = Object.assign({}, controlToDuplicate);
        controlCopy.key = controls.length;
        controlCopy.positionX = controlToDuplicate.positionX + 100;
        controlCopy.positionY = controlToDuplicate.positionY + 100;
        controls.push(controlCopy);
        this.setState({});
    }
    removeControl(controlToRemove){
        const controls = this.state.wireframe.controls;
        controls.splice(controlToRemove.key, 1);
        // Update the key of the remaining elements
        for (var i = controlToRemove.key; i<controls.length;i++){
            controls[i].key = controls[i].key-1;
        }
        // reload after deleting
        this.setState({
        
        })
    }


    saveData = (e) =>{
        // UPDATE IN THE FIRESTORE AS WELL
        const firestore = getFirestore();
        // Save the updated controls
        const wireframe = this.state.wireframe;
        const {auth} = this.props;
        var userID= auth.uid;
        const usersWireframes = this.props.location.state.usersWireframes;
        usersWireframes[wireframe.key] = wireframe;
        firestore.collection("users").doc(userID).update({
            wireframes : usersWireframes
        })
        toast("The wireframe has been saved.");
    }
    // Takes in the control's key, which should match the index of the array
    // This key thing depends on the key matching the index of the array, is that reliable?
    setControlBeingEdited = (key,e) =>{
        e.preventDefault();
        let controlBeingEdited = this.state.wireframe.controls[key];
        this.setState({
            ...this.state,
            controlBeingEdited : controlBeingEdited
        })
    }
    deselectControl = (e) =>{
        if (e.target.id === "wireframeZone"){
            this.setState({
                controlBeingEdited : null
            })
        }
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
                    textSize : 50,
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
                        borderThickness : 0,
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
            default:
        }
        // Update after adding, shouldn't this be automatic?
        this.setState({
            
        })
    }
    // Working towards getting the delete control
    deleteControl = (e) =>{
        const controls = this.state.wireframe.controls;
        controls.remove(this.state.controlBeingEdited);
    }

    // The PropertyEditor only needs to know what control it's working on.
    // The editAreaDiv needs to know the entire wireframe
    // The controlSelection doesn't need to know shit
    render() {
        //console.log("EditScreen Render called.");
        if (this.state == null){
            return <Redirect to = "/"></Redirect>
        }
        return (
            <div id = "editScreenParent">
                <div id = "controlSelectionDiv" className ="editScreenDiv"><ControlSelection createNewControl = {this.createNewControl} saveData = {this.saveData}/></div>
                <div id = "propertyEditorDiv" className ="editScreenDiv">
                    {this.state.wireframe == null ? <PropertyEditor
                    /> :
                    <PropertyEditor
                        controlToEdit = {this.state.controlBeingEdited}
                        handlePropertyChange = {this.handlePropertyChange}
                    />
                    }
                </div>
                <div id = "editAreaDiv" className ="editScreenDiv"><EditArea wireframe = {this.state.wireframe} controlBeingEdited = {this.state.controlBeingEdited} setControlBeingEdited = {this.setControlBeingEdited} deselectControl = {this.deselectControl}/></div>
            </div>
        )
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
)(EditScreen);