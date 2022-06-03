import {bus} from "./main";
import {store} from "./store/store";
function createThread(data, id) {
    let thread = {
        'id': id,
        'mailboxId': data.mailboxID,
        'type': data.inboxType,
        'snippetType': 1,
        'snippet': data.snippet,
        'subject': data.subject,
        'tags': data.tags,
        'isRead': data.isRead,
        'isArchived': data.isClosed,
        'isDeleted': data.isDeleted,
        'isStarred': data.isStarred,
        'assignedTo': data.assignedTo,
        'attachments': (data.action == 'incoming' || data.action == 'outgoing') ? data.messageData.attachments : null,
        'date': (data.action == 'incoming' || data.action == 'outgoing') ? data.messageData.time : data.time,
        'humanFriendlyDate': data.humanFriendlyDate || data.time,
        'displayContact': ((data.inboxType == 'mail' || data.inboxType == 'chat') ? data.displayContact : data.clientNumber) || 'Unknown Sender'
    }
    return thread;
}
export function addThread(data) {
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    console.log(data);
    var open = store.state.filterSection == 'open';
    var assigned = (data.assignedTo ? true : false) && (store.state.type == 'assigned');
    var mine = (assigned && data.assignedTo.id == store.state.userInfo.id ? true : false) && (store.state.type == 'mine');
    var unassigned = (! assigned) && (store.state.type == 'unassigned');

    // checking whether to addThread or not
    let addThreadFlag = false;
    if(store.state.inboxData.id == "me"){
        addThreadFlag = true;
    } else if(data.mailboxID == store.state.inboxData.id){
        addThreadFlag = true;
    }

    if(addThreadFlag) {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1) {
            console.log("store.state.threads[objIndex]", store.state.threads[objIndex], data, Object.keys(store.state.threadData).includes(data.threadID.toString()), Object.keys(store.state.threadData));
            if(data.inboxType == 'mail') {
                store.state.threads[objIndex].date = data.messageData.time;
                store.state.threads[objIndex].subject = data.subject;
                store.state.threads[objIndex].snippet = data.snippet;
            } else if(data.inboxType == 'sms' || data.inboxType == 'chat' || data.inboxType == 'whatsapp') {
                store.state.threads[objIndex].date = data.date;
                store.state.threads[objIndex].humanFriendlyDate = moment(data.date).format("HH:mm");
                store.state.threads[objIndex].snippet = data.snippet;
            }
            var a = store.state.threads.splice(objIndex, 1);
            store.state.threads.unshift(a[0]);
        } else if ((open || mine || assigned || unassigned)) {
            store.state.threads.unshift(createThread(data, data.threadID));
        }
    }

    if (Object.keys(store.state.threadData).includes(data.threadID.toString())) {
        if (data.inboxType == 'mail') {
            let itemIndex = store.state.threadData[data.threadID].data.items.findIndex((obj) => obj.data.id == data.messageData.id);
            if(data.messageData.sentBy.id != store.state.userInfo.id){
                if (itemIndex == -1) {
                    fetch("https://app.helpwise.io/api/getEmail.php?emailID=" + data.messageData.id + "&mailboxID=" + data.mailboxID, {credentials: "include"}).then(async (response) => {
                        const data1 = await response.json();
                        if (data1.status !== "success") {
                            const error = (data1 && data1.message) || response.status;
                            return Promise.reject(error);
                        }
                        let email = {
                            'type': 'email',
                            'data': data1.data.email,
                            'timestamp': Date.now()
                        };
                        store.state.threadData[data.threadID].data.snippet = data1.data.email.snippet;
                        store.state.threadData[data.threadID].data.subject = data1.data.email.subject;
                        if (store.state.userSettings.orderThread == "asc") {
                            store.state.threadData[data.threadID].data.items.push(email);
                        } else {
                            store.state.threadData[data.threadID].data.items.unshift(email);
                        }
                    });
                }
            }
        } else if (data.inboxType == 'chat' || data.inboxType == 'facebook' || data.inboxType == 'sms' || data.inboxType == 'whatsapp') {
            console.log(store.state.threadData[data.threadID].data.items, data.messageData.id);
            let itemIndex = store.state.threadData[data.threadID].data.items.findIndex((obj) => obj.data.id == data.messageData.id);
            console.log(itemIndex)
            if(data.messageData.sentBy.id != store.state.userInfo.id){
                if (itemIndex == -1) {
                    let message = {
                        'type': data.inboxType,
                        'data': {
                            'id': data.messageData.id,
                            'threadId': data.threadID,
                            'text': data.messageData.body.replace(/\\n/g, '<br>'),
                            'sentBy': data.messageData.sentBy,
                            'attachments': data.messageData.attachments,
                            'type': data.action == 'incoming' ? 0 : 1,
                            'date': data.messageData.time,
                            'unixTime': Date.now()
                        },
                        'timestamp': Date.now()
                    };
                    if (store.state.userSettings.orderThread == "asc") {
                        store.state.threadData[data.threadID].data.items.push(message);
                    } else {
                        store.state.threadData[data.threadID].data.items.unshift(message);
                    }
                }
            }
        }
    }
    // }
}
export function addNote(data) { // hello
    var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    var all = store.state.type == 'all';
    var assigned = (data.assignedTo ? true : false) && (store.state.type == 'assigned');
    var mine = (assigned && data.assignedTo.id == store.state.userInfo.id ? true : false) && (store.state.type == 'mine');
    var unassigned = (! assigned) && (store.state.type == 'unassigned');
    // if(inbox) {
    let objIndex = store.state.threads.findIndex((obj) => obj.id == data.threadID);

    // checking whether to addThread or not
    let addThreadFlag = false;
    if(store.state.inboxData.id == "me"){
        addThreadFlag = true;
    } else if(data.mailboxID == store.state.inboxData.id){
        addThreadFlag = true;
    }

    if(addThreadFlag){
        if (objIndex !== -1) {
            console.log("store.state.threads[objIndex]", store.state.threads[objIndex], data);
            store.state.threads[objIndex].date = data.noteData.time;
            store.state.threads[objIndex].humanFriendlyDate = moment((new Date(data.noteData.time*1000)).toISOString()).format("HH:mm");
            store.state.threads[objIndex].snippet = data.noteData.snippet;
            var a = store.state.threads.splice(objIndex, 1);
            store.state.threads.unshift(a[0]);
        } else if (all || mine || assigned || unassigned) {
            // console.log("---------- ELSE IF --------");
            store.state.threads.unshift(createThread(data, data.threadID));
        }
    }
    if (Object.keys(store.state.threadData).includes(data.threadID.toString())) {
        console.log(store.state.threadData[data.threadID].data.items, data.noteData.id);
        let itemIndex = store.state.threadData[data.threadID].data.items.findIndex((obj) => obj.data.id == data.noteData.id);
        console.log(itemIndex);
        if (itemIndex == -1) {
            let comment = {
                'type': 'comment',
                'data': {
                    'id': data.noteData.id,
                    'at': data.noteData.time,
                    'body': data.noteData.body,
                    'by': data.noteData.sentBy,
                    'mentions': data.noteData.mentions,
                    'attachments': data.noteData.attachments
                },
                'timestamp': Date.now()
            };
            // if(data.noteData.sentBy.id !== store.state.userInfo.id){
                if (store.state.userSettings.orderThread == "asc") {
                    store.state.threadData[data.threadID].data.items.push(comment);
                } else {
                    store.state.threadData[data.threadID].data.items.unshift(comment);
                }
            // }
        }
    }
    // }
}
export function closeThread(data) {
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        // let objIndex = store.state.threads.findIndex((obj) => data.threadID.includes(obj.id));
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if (objIndex !== -1 && store.state.filterSection !== 'closed') {
            store.state.threads.splice(objIndex, 1);
        } else if (objIndex == -1 && store.state.filterSection == 'closed') {
            if(data.threadData) {
                store.state.threads.unshift(createThread(data, thread));
            }
        }
        if (store.state.openThread !== null) {
            if (store.state.openThread == thread) {
                store.dispatch('updateFirebaseModal', data.user.first_name + ' ' + data.user.last_name + ' closed this conversation.');
                bus.$emit('firebaseModal');
            }
        }
        if (Object.keys(store.state.threadData).includes(thread.toString())) {
            let body = data.user.first_name + " " + data.user.last_name + " closed this conversation"; 
            let log = {
                'type': 'log',
                'data': {
                    'type': 'assign',
                    'at': data.time,
                    'body': body
                },
                'timestamp': Date.now()
            };
            store.state.threadData[thread].data.items.push(log);
        }
    });
    // }
}
export function snoozeThread(data) {
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    // if(inbox) {
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if (objIndex !== -1 && store.state.filterSection !== 'snoozed') {
            store.state.threads.splice(objIndex, 1);
        } else if (objIndex == -1 && store.state.filterSection == 'snoozed') {
            if(data.threadData) {
                store.state.threads.unshift(createThread(data, thread));
            }
        }
        if (store.state.openThread !== null) {
            if (store.state.openThread == thread) {
                store.dispatch('updateFirebaseModal', data.user.first_name + ' ' + data.user.last_name + ' snoozed this conversation.');
                bus.$emit('firebaseModal');
            }
        }
        if (Object.keys(store.state.threadData).includes(thread.toString())) {
            let body = data.user.first_name + " " + data.user.last_name + " snoozed this conversation until " + moment(data.snoozedTill.date).format("MMM D, YYYY hh:mm A"); 
            let log = {
                'type': 'log',
                'data': {
                    'type': 'snooze',
                    'at': data.time,
                    'body': body
                },
                'timestamp': Date.now()
            };
            store.state.threadData[thread].data.items.push(log);
        }
    });
    // }
}
export function deleteThread(data) {
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    // if(inbox) {
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if (objIndex !== -1 && store.state.filterSection !== 'trash') {
            store.state.threads.splice(objIndex, 1);
        } else if (objIndex == -1 && store.state.filterSection == 'trash') {
            if(data.threadData) {
                store.state.threads.unshift(createThread(data, thread));
            }
        }
        if (store.state.openThread == thread) {
            store.dispatch('updateFirebaseModal', data.user.first_name + ' ' + data.user.last_name + ' moved this conversation to trash.');
            bus.$emit('firebaseModal');
        }
        if (Object.keys(store.state.threadData).includes(thread.toString())) {
            let body = data.user.first_name + " " + data.user.last_name + " deleted this conversation";
            let log = {
                'type': 'log',
                'data': {
                    'type': 'trash',
                    'at': data.time,
                    'body': body
                },
                'timestamp': Date.now()
            };
            store.state.threadData[thread].data.items.push(log);
        }
    });
    // }
}
export function moveToInboxThread(data) { // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    // if (data.managerID !== store.state.userInfo.accountID) {
        var all = store.state.filterSection == 'open';
        var assigned = (data.assignedTo ? true : false) && (store.state.type == 'assigned');
        var mine = (assigned && data.assignedTo.id == store.state.userInfo.id ? true : false) && (store.state.type == 'mine');
        var unassigned = (! assigned) && (store.state.type == 'unassigned');
        // if(inbox) {
        var allThreads = data.threadID;
        allThreads.forEach(thread => {
            let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
            if (objIndex !== -1) {
                store.state.threads.splice(objIndex, 1);
            } else if (all || mine || assigned || unassigned) {
                if(data.threadData) {
                    store.state.threads.unshift(createThread(data, thread));
                }
            }
            if (store.state.openThread == thread) {
                store.dispatch('updateFirebaseModal', data.user.first_name + ' ' + data.user.last_name + ' moved this conversation to inbox.');
                bus.$emit('firebaseModal');
            }
            if (Object.keys(store.state.threadData).includes(thread.toString())) {
                let body = data.user.first_name + " " + data.user.last_name + " moved this conversation to inbox";
                let log = {
                    'type': 'log',
                    'data': {
                        'type': 'moveToInbox',
                        'at': data.time,
                        'body': body
                    },
                    'timestamp': Date.now()
                };
                store.state.threadData[thread].data.items.push(log);
            }
        });
    // }
}
export function toggleTags(data) {
    // if (data.managerID !== store.state.userInfo.accountID) {
        // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
        // if(inbox) {
        var allThreads = data.threadID;
        allThreads.forEach(thread => {
            let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
            var allTags = data.tags;
            var threadTagId = [];
            var threadDataTagId = [];
            if (objIndex !== -1) {
                store.state.threads[objIndex].tags.forEach(t => {
                    threadTagId.push(t.id);
                });
                allTags.forEach(tag => {
                    if (data.action == 'addTag') {
                        if (! threadTagId.includes(tag.id)) {
                            store.state.threads[objIndex].tags.push(tag);
                        }
                    } else if (data.action == 'removeTag') { // if(threadTagId.includes(tag.id)){
                        store.state.threads[objIndex].tags = store.state.threads[objIndex].tags.filter(tg => tg.id !== tag.id)
                        // }
                    }
                });
            }
            if (Object.keys(store.state.threadData).includes(thread.toString())) {
                store.state.threadData[thread].data.tags.forEach(t => {
                    threadDataTagId.push(t.id);
                });
                allTags.forEach(tag => {
                    if (data.action == 'addTag') {
                        if (! threadDataTagId.includes(tag.id)) {
                            store.state.threadData[thread].data.tags.push(tag);
                        }
                        let log = {
                            'type': 'log',
                            'data': {
                                'type': 'tag',
                                'at': data.time,
                                'body': data.user.first_name + " " + data.user.last_name + ' added the tag ' + tag.name
                            },
                            'timestamp': Date.now()
                        };
                        store.state.threadData[thread].data.items.push(log);
                    } else if (data.action == 'removeTag') {
                        store.state.threadData[thread].data.tags = store.state.threadData[thread].data.tags.filter(tg => tg.id !== tag.id);
                        let log = {
                            'type': 'log',
                            'data': {
                                'type': 'tag',
                                'at': data.time,
                                'body': data.user.first_name + " " + data.user.last_name + ' removed the tag ' + tag.name
                            },
                            'timestamp': Date.now()
                        };
                        store.state.threadData[thread].data.items.push(log);
                    }
                });
            }
            // if (data.threadID.includes(store.state.openThread)) {
            //     console.log("data dhikhao tags ka 225", allTags);
            // }
        });
    // }
}
export function assignThread(data) {
    // if (data.managerID !== store.state.userInfo.accountID) {
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    // if(inbox) {
    var allThreads = data.threadID;
    var count = 0;
    allThreads.forEach(thread => {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if (objIndex !== -1) {
            store.state.threads[objIndex].assignedTo = data.assigned;
        }
        if (Object.keys(store.state.threadData).includes(thread.toString())) {
            if(data.assigned) {
                store.state.threadData[thread].data.currentAssignment = {
                    'assigned': data.assigned,
                    'me': data.assigned.id == store.state.userInfo.id ? true : false,
                    'assigner': data.assigner,
                    'time': data.time
                };
            } else {
                store.state.threadData[thread].data.currentAssignment = {
                    'assigned': null,
                    'me': false,
                    'assigner': data.assigner,
                    'time': data.time
                };
            }
            let body = '';
            if(data.assigned){
                let assignedStr = data.assigned.id != data.assigner.id ? (data.assigned.firstname + " " + data.assigned.lastname) : "themselves";
                body = data.assigner.firstname + " " + data.assigner.lastname + ' assigned the conversation to ' + assignedStr;
            }else{
                body = data.assigner.firstname + " " + data.assigner.lastname + ' unassigned the conversation';
            }
            // if(data.assigner.id != store.state.userInfo.id){
                let log = {
                    'type': 'log',
                    'data': {
                        'type': 'assign',
                        'at': data.time,
                        'body': body
                    },
                    'timestamp': Date.now()
                };
                store.state.threadData[thread].data.items.push(log);
            // }
        }
    });
    // }
}
export function unsnoozeThread(data) { // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    var all = store.state.type == 'all';
    var assigned = (data.thread.assignedTo ? true : false) && (store.state.type == 'assigned');
    var mine = (assigned && data.thread.assignedTo.id == store.state.userInfo.id ? true : false) && (store.state.type == 'mine');
    var unassigned = (! assigned) && (store.state.type == 'unassigned');
    // if(inbox) {
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if (objIndex !== -1 && store.state.type == 'snoozed') {
            store.state.threads.splice(objIndex, 1);
        } else if (all || mine || assigned || unassigned) {
            store.state.threads.unshift(data.thread);
        }
        if (store.state.openThread == thread) {
            store.dispatch('updateFirebaseModal', "This conversation's snooze is ended and has been moved to inbox.");
            bus.$emit('firebaseModal');
        }
    });
    // }
}
