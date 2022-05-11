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
// const mailboxID = store.state.inboxData.id;
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
            let incomingFlag = false;
            let outgoingFlag = false;
            let notesFlag = false;
            let closeFlag = false;
            let snoozeFlag = false;
            let unsnoozeFlag = false;
            let deleteFlag = false;
            let addTagFlag = false;
            let removeTagFlag = false;
            let assignFlag = false;
            let moveToInboxFlag = false;

            socket.child(`/incoming`).on('value', function (data) {
                if(incomingFlag){
                    if (data.val()) {
                        addThread(data.val());
                        incomingFlag = true;
                    }
                }else{
                    incomingFlag = true;
                }
            });
            socket.child(`/outgoing`).on('value', function (data) {
                if(outgoingFlag){
                    if (data.val()) {
                        addThread(data.val());
                        outgoingFlag = true;
                    }
                }else{
                    outgoingFlag = true;
                }
            });
            socket.child(`/notes`).on('value', function (data) {
                if(notesFlag){
                    if (data.val()) {
                        addNote(data.val());
                        notesFlag = true;
                    }
                }else{
                    notesFlag = true;
                }
            });
            socket.child(`/moveToInbox`).on('value', function (data) {
                console.log("------- Move To Inbox Firebase hit ------");
                if(moveToInboxFlag){
                    if (data.val()) {
                        console.log("MOVE TO INBOX", data.val());
                        moveToInboxThread(data.val());
                        moveToInboxFlag = true;
                    }
                }else{
                    moveToInboxFlag = true;
                }
            });
            socket.child(`/close`).on('value', function (data) {
                console.log("yhn kitni bar araha close ka",closeFlag);
                if(closeFlag){
                    if (data.val()) {
                        console.log("close ka firebase",data.val());
                        closeThread(data.val());
                        closeFlag = true;
                    }
                }else{
                    closeFlag = true;
                }
            });
            socket.child(`/snooze`).on('value', function (data) {
                if(snoozeFlag){
                    if (data.val()) {
                        snoozeThread(data.val());
                        snoozeFlag = true;
                    }
                }else{
                    snoozeFlag = true;
                }
            });
            socket.child(`/unsnooze`).on('value', function (data) {
                if(unsnoozeFlag){
                    if (data.val()) {
                        unsnoozeThread(data.val());
                        unsnoozeFlag = true;
                    }
                }else{
                    unsnoozeFlag = true;
                }
            });
            socket.child(`/delete`).on('value', function (data) {
                if(deleteFlag){
                    if (data.val()) {
                        deleteThread(data.val());
                        deleteFlag = true;
                    }
                }else{
                    deleteFlag = true;
                }
            });
            socket.child(`/addTag`).on('value', function (data) {
                console.log("----- -ADD TAG FIREBASE HIT -----");
                if(addTagFlag){
                    if (data.val()) {
                        toggleTags(data.val());
                        addTagFlag = true;
                    }
                }else{
                    addTagFlag = true;
                }
            });
            socket.child(`/removeTag`).on('value', function (data) {
                console.log("------ REMOVE TAG FIREBASE HIT -----");
                if(removeTagFlag){
                    if (data.val()) {
                        toggleTags(data.val());
                        removeTagFlag = true;
                    }
                }else{
                    removeTagFlag = true;
                }
            });
<<<<<<< HEAD
            socket.child(`/assignment`).on('value', function (data) {
=======
            socket.child(`/assign`).on('value', function (data) {
                console.log("yhn kitni bar araha",assignFlag);
>>>>>>> 7f273041a59af7d90edbfffb73481a232fca1345
                if(assignFlag){
                    if (data.val()) {
                        console.log("assign ka flag");
                        assignThread(data.val());
                        assignFlag = true;
                    }
                }else{
                    assignFlag = true;
                }
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
