import React from 'react'
import { connect } from 'react-redux';
import { getFirestore } from 'redux-firestore';
import wireframeJson from './WireframeTestData.json';
import { Redirect } from 'react-router-dom';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                // Reset the wireframes of each account
                    fireStore.collection('users').doc(doc.id).update({
                        wireframes : []
                    })
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                // Reset the wireframes of each account
                    fireStore.collection('users').doc(doc.id).update({
                        wireframes : wireframeJson.wireframes
                    })
            })
        });
    }

    render() {
        const {profile} = this.props;
        const isAdmin = profile.administrator;
        if (!isAdmin){
            return <Redirect to="/"/>;
        }
        return (
            <div className = "testDiv">
                <button className="testButton" onClick={this.handleClear}>Clear Database</button>
                <button className="testButton" onClick={this.handleReset}>Reset Database</button>
                <p><a href = "https://console.firebase.google.com/u/0/project/wireframer-41732/database">Link to my database.</a></p>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase,
        profile : state.firebase.profile
    };
}

export default connect(mapStateToProps)(DatabaseTester);