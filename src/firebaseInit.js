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
            socket.child(`/incoming`).on('value', function (data) {
                if (data.val()) {
                    addThread(data.val());
                }
            });
            socket.child(`/outgoing`).on('value', function (data) {
                if (data.val()) {
                    addThread(data.val());
                }
            });
            socket.child(`/notes`).on('value', function (data) {
                if (data.val()) {
                    addNote(data.val());
                }
            });
            socket.child(`/close`).on('value', function (data) {
                if (data.val()) {
                    console.log("close ka firebase",data.val());
                    closeThread(data.val());
                }
            });
            socket.child(`/snooze`).on('value', function (data) {
                if (data.val()) {
                    snoozeThread(data.val());
                }
            });
            socket.child(`/unsnooze`).on('value', function (data) {
                if (data.val()) {
                    unsnoozeThread(data.val());
                }
            });
            socket.child(`/delete`).on('value', function (data) {
                if (data.val()) {
                    deleteThread(data.val());
                }
            });
            socket.child(`/addTag`).on('value', function (data) {
                if (data.val()) {
                    toggleTags(data.val());
                }
            });
            socket.child(`/removeTag`).on('value', function (data) {
                if (data.val()) {
                    toggleTags(data.val());
                }
            });
            socket.child(`/assign`).on('value', function (data) {
                if (data.val()) {
                    assignThread(data.val());
                }
            });
            socket.child(`/moveToInbox`).on('value', function (data) {
                if (data.val()) {
                    moveToInboxThread(data.val());
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
