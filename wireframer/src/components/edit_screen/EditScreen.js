import React, { Component } from 'react'
import PropertyEditor from './PropertyEditor'
import ControlSelection from './ControlSelection'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

export default class EditScreen extends Component {
    state = {
        wireframe : this.props.wireframe
    }
    // Loads the data in the wireframe, this is hard hard coded just for testing for now
    loadData(){
        const firestore = getFirestore();
        let docRef = firestore.collection("users").doc("cmxq0wTm6Gsu4e8rtGn8");
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



    render() {
        return (
            <div id = "editScreenParent">
                <div id = "controlSelectionDiv" className ="editScreenDiv"><ControlSelection/></div>
                <div id = "editAreaDiv" className ="editScreenDiv"></div>
                <div id = "propertyEditorDiv" className ="editScreenDiv">
                    <PropertyEditor
                        wireframe = {this.state.wireframe}
                    />
                </div>
                <button onClick = {(e)=>this.loadData()}> LOAD FROM DATABASE</button>
            </div>
        )
    }
}
