import React from 'react'
import { connect } from 'react-redux';
import { getFirestore } from 'redux-firestore';
import wireframeJson from './WireframeTestData.json';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('users').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        wireframeJson.users.forEach(user => {
           console.log(user);
           fireStore.collection('users').add({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userID: user.userID,
                    wireframes : user.wireframes
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
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
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);