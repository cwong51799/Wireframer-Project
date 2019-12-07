import React, { Component } from 'react'
import PropertyEditor from './PropertyEditor'
import ControlSelection from './ControlSelection'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import EditArea from './EditArea';

export default class EditScreen extends Component {
    state = {
        wireframe : null
    }
    // Loads the data in the wireframe, this is hard hard coded just for testing for now
    loadData(){
        const firestore = getFirestore();
        let docRef = firestore.collection("users").doc("hktnrjVoewMut3DVjXgo");
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
        console.log(data);
        this.setState({
            wireframe :  data.wireframes[0]
        });
    }


    // The PropertyEditor only needs to know what control it's working on.
    // The editAreaDiv needs to know the entire wireframe
    // The controlSelection doesn't need to know shit
    render() {
        return (
            <div id = "editScreenParent">
                <div id = "controlSelectionDiv" className ="editScreenDiv"><ControlSelection/></div>
                <div id = "editAreaDiv" className ="editScreenDiv"><EditArea wireframe = {this.state.wireframe}/></div>
                <div id = "propertyEditorDiv" className ="editScreenDiv">
                    {this.state.wireframe == null ? <PropertyEditor
                    /> :
                    <PropertyEditor
                        controlToEdit = {this.state.wireframe.controls[0]}
                    />
                    }
                </div>
                <button onClick = {(e)=>this.loadData()}> LOAD FROM DATABASE</button>
            </div>
        )
    }
}
