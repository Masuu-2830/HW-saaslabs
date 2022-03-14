import {store} from "./store/store";
// import firebase from 'firebase';
// console.log(firebase)
import {
    addThread,
    addNote,
    closeThread,
    snoozeThread,
    deleteThread,
    moveToInboxThread,
    toggleTags,
    assignThread,
    unsnoozeThread
} from './firebaseHW'
const mailboxID = store.state.inboxData.id;
const firebaseConfig = {
    apiKey: "AIzaSyCCXmvojmIn-QkRKBP-ySP_CaUxNJTXDC0",
    authDomain: "helpwise-websocket-4752f.firebaseapp.com",
    databaseURL: "https://helpwise-websocket-4752f.firebaseio.com",
    projectId: "helpwise-websocket-4752f",
    storageBucket: "helpwise-websocket-4752f.appspot.com",
    messagingSenderId: "270528512292",
    appId: "1:270528512292:web:1351ce00cf1ad744ba73b1",
    measurementId: "G-9MDPX07YHD"
};
// // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firebase_app = firebase.initializeApp(firebaseConfig, `HW-inbox-${
    generateRandomString()
}`);

var firebase_analytics = firebase.analytics();
export function initFirebase() {
    let userID = store.state.userInfo.id;
    let accountID = store.state.userInfo.accountID;
    fetch("https://app.helpwise.io/api/get_socket_token.php", {credentials: "include"}).then(async (response) => {
        const data = await response.json();
        if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        let token = data.data.token;
        firebase_app.auth().signInWithCustomToken(token).then(function () {
            const socket = firebase_app.database().ref(`/Account-${accountID}`);
            var incomingFlag = false;
            var outgoingFlag = false;
            var notesFlag = false;
            var closeFlag = false;
            var snoozeFlag = false;
            var unsnoozeFlag = false;
            var deleteFlag = false;
            var addTagFlag = false;
            var removeTagFlag = false;
            var assignFlag = false;
            var moveToInboxFlag = false;
            socket.child(`/incoming`).on('value', function (data) {
                // if(incomingFlag){
                    if (data.val()) {
                        addThread(data.val());
                        // incomingFlag = false;
                    }
                // }else{
                //     incomingFlag = true;
                // }
            });
            socket.child(`/outgoing`).on('value', function (data) {
                // if(outgoingFlag == true){
                    if (data.val()) {
                        addThread(data.val());
                        // outgoingFlag = false;
                    }
                // }else{
                //     outgoingFlag = true;
                // }
            });
            socket.child(`/notes`).on('value', function (data) {
                // if(notesFlag == true){
                    if (data.val()) {
                        addNote(data.val());
                        // notesFlag = false;
                    }
                // }else{
                //     notesFlag = true;
                // }
            });
            socket.child(`/close`).on('value', function (data) {
                // if(closeFlag == true){
                    if (data.val()) {
                        console.log("close ka firebase",data.val());
                        closeThread(data.val());
                        // closeFlag = false;
                    }
                // }else{
                //     closeFlag = true;
                // }
            });
            socket.child(`/snooze`).on('value', function (data) {
                // if(snoozeFlag == true){
                    if (data.val()) {
                        snoozeThread(data.val());
                        // snoozeFlag = false;
                    }
                // }else{
                //     snoozeFlag = true;
                // }
            });
            socket.child(`/unsnooze`).on('value', function (data) {
                // if(unsnoozeFlag == true){
                    if (data.val()) {
                        unsnoozeThread(data.val());
                        // unsnoozeFlag = false;
                    }
                // }else{
                //     unsnoozeFlag = true;
                // }
            });
            socket.child(`/delete`).on('value', function (data) {
                // if(deleteFlag == true){
                    if (data.val()) {
                        deleteThread(data.val());
                        // deleteFlag = false;
                    }
                // }else{
                //     deleteFlag = true;
                // }
            });
            socket.child(`/addTag`).on('value', function (data) {
                // if(addTagFlag == true){
                    if (data.val()) {
                        toggleTags(data.val());
                        // addTagFlag = false;
                    }
                // }else{
                //     addTagFlag = true;
                // }
            });
            socket.child(`/removeTag`).on('value', function (data) {
                // if(removeTagFlag == true){
                    if (data.val()) {
                        toggleTags(data.val());
                        // removeTagFlag = false;
                    }
                // }else{
                //     removeTagFlag = true;
                // }
            });
            socket.child(`/assign`).on('value', function (data) {
                // if(assignFlag == true){
                    if (data.val()) {
                        assignThread(data.val());
                        // assignFlag = false;
                    }
                // }else{
                //     assignFlag = true;
                // }
            });
            socket.child(`/moveToInbox`).on('value', function (data) {
                // if(moveToInboxFlag == true){
                    if (data.val()) {
                        moveToInboxThread(data.val());
                        // moveToInboxFlag = false;
                    }
                // }else{
                //     moveToInboxFlag = true;
                // }
            });
        }).catch((error) => {
            alert(error);
        });
    })
}
// function to generate random and unique strings
function generateRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) 
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
}
