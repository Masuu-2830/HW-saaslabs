import { store } from "./store/store";

function createThread(data) {
    let thread = {
        'id': data.threadID,
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
        'displayContact': data.displayContact
    }
    return thread;
}

export function addThread(data) {
    console.log("data dhikhao add thread",data);
    var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    var all = store.state.type == 'all';
    var mine = (data.assignedTo.id == store.state.userInfo.id ? true : false) && (store.state.type == 'mine');
    var assigned = (data.assignedTo.length != 0 ? true : false) && (store.state.type == 'assigned');
    var unassigned = (!assigned) && (store.state.type == 'unassigned');

    if(inbox) {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1) {
            store.state.threads[objIndex].date = data.messageData.time;
            store.state.threads[objIndex].subject = data.messageData.subject;
            var a = store.state.threads.splice(objIndex, 1);
            store.state.threads.unshift(a[0]);
        } else if(data.action == 'incoming' && (all || mine || assigned || unassigned)) {
            store.state.threads.unshift(createThread(data));
        }
        if (store.state.openThread !== null && (data.threadID in Object.keys(store.state.threadData))) {
            if(data.inboxType == 'mail') {
                let itemIndex = store.state.threadData[data.threadID].data.items.findIndex((obj) => obj.id == data.messageData.id);
                if(itemIndex == -1) {
                    fetch(this.$apiBaseURL + "getEmail.php?emailID=" + data.messageData.id + "&mailboxID=" + data.mailboxID, {credentials: "include"}).then(async (response) => {
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
            } else if(data.inboxType == 'chat' || data.inboxType == 'facebook') {
                let itemIndex = store.state.threadData[data.threadID].data.items.findIndex((obj) => obj.id == data.messageData.id);
                if(itemIndex == -1) {
                    let message = {
                        'type': data.inboxType,
                        'data': {
                            'id': data.messageData.id,
                            'threadId': data.threadID,
                            'text': data.messageData.body,
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
}

export function addNote(data) {
    // hello
    console.log("data dhikhao",data);
    var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    var all = store.state.type == 'all';
    var assigned = (data.assignedTo ? true : false) && (store.state.type == 'assigned');
    var mine = (assigned && data.assignedTo.id == store.state.userInfo.id ? true : false) && (store.state.type == 'mine');
    var unassigned = (!assigned) && (store.state.type == 'unassigned');
    if(inbox) {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1) {
            console.log("store.state.threads[objIndex]",store.state.threads[objIndex]);
            store.state.threads[objIndex].date = data.noteData.time;
            store.state.threads[objIndex].snippet = data.noteData.snippet;
            var a = store.state.threads.splice(objIndex, 1);
            store.state.threads.unshift(a[0]);
        } else if(all || mine || assigned || unassigned) {
            store.state.threads.unshift(createThread(data));
        }
        
        if (store.state.openThread == data.threadID) {
            let comment = {
                'type': 'comment',
                'data': {
                    'id': data.noteData.id,
                    'at': data.noteData.time,
                    'body': data.noteData.body,
                    'by': data.noteData.sentBy,
                    'mentions': data.noteData.mentions,
                    'attachments': data.noteData.attachments,
                },
                'timestamp': Date.now()
            };
            console.log("comment",comment);
            console.log("store.state.threadData",store.state.threadData[data.threadID]);
            if (store.state.userSettings.orderThread == "asc") {
                store.state.threadData[data.threadID].data.items.push(comment);
            } else {
                store.state.threadData[data.threadID].data.items.unshift(comment);
            }
        }
    }
}

export function closeThread(data) {
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    // console.log("inbox ka data",inbox);
    // if(inbox) {
    console.log("data threads ka",data.threadID);
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        console.log("thread id",thread);
        // let objIndex = store.state.threads.findIndex((obj) => data.threadID.includes(obj.id));
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if (objIndex !== -1 && store.state.type !== 'closed') {
            store.state.threads.splice(objIndex, 1);
        } else if(objIndex == -1 && store.state.type == 'closed') {
            store.state.threads.unshift(createThread(data));
        }
        if(store.state.openThread !== null){
            if (store.state.openThread == thread) {
                store.dispatch('updateFirebaseModal', data.user.first_name + data.user.last_name + ' closed this conversation.');
                this.$bvModal.show('firebaseModal');
            }
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
            if (objIndex !== -1 && store.state.type !== 'snoozed') {
                store.state.threads.splice(objIndex, 1);
            } else if(objIndex == -1 && store.state.type == 'snoozed') {
                store.state.threads.unshift(createThread(data));
            }
            if(store.state.openThread !== null){
                if (store.state.openThread == data.thread) {
                    store.dispatch('updateFirebaseModal', data.user.first_name + data.user.last_name + ' snoozed this conversation.');
                    this.$bvModal.show('firebaseModal');
                }
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
        if (objIndex !== -1 && store.state.type !== 'trash') {
            store.state.threads.splice(objIndex, 1);
        } else if(objIndex == -1 && store.state.type == 'trash') {
            store.state.threads.unshift(createThread(data));
        }
        if (store.state.openThread == thread) {
            store.dispatch('updateFirebaseModal', data.user.first_name + data.user.last_name + ' moved this conversation to trash.');
            this.$bvModal.show('firebaseModal');
        }
    });
    // }
}

export function moveToInboxThread(data) {
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    var all = store.state.type == 'all';
    var mine = (data.assignedTo.id == store.state.userInfo.id ? true : false) && (store.state.type == 'mine');
    var assigned = (data.assignedTo !== null ? true : false) && (store.state.type == 'assigned');
    var unassigned = (!assigned) && (store.state.type == 'unassigned');
    // if(inbox) {
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if (objIndex !== -1) {
            store.state.threads.splice(objIndex, 1);
        } else if(all || mine || assigned || unassigned) {
            store.state.threads.unshift(createThread(data));
        }
        if (store.state.openThread == data.thread) {
            store.dispatch('updateFirebaseModal', data.user.first_name + data.user.last_name + ' moved this conversation to inbox.');
            this.$bvModal.show('firebaseModal');
        }
    });
    // }
}

export function toggleTags(data) {
    console.log("data dhikhado tags ka",data);
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    // if(inbox) {
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        var allTags = data.tags;
        var threadTagId = [];
        var threadDataTagId = [];
        if(objIndex !== -1) {
            store.state.threads[objIndex].tags.forEach(t => {
                threadTagId.push(t.id);
            });
            allTags.forEach(tag => {
                if(data.action == 'addTag') {
                    if(!threadTagId.includes(tag.id)){
                        store.state.threads[objIndex].tags.push(tag);
                    }
                } else if(data.action == 'removeTag') {
                    // if(threadTagId.includes(tag.id)){
                        store.state.threads[objIndex].tags = store.state.threads[objIndex].tags.filter(tg => tg.id !== tag.id)
                    // }
                }
            });
        }
        if(store.state.openThread == data.threadID) {
            console.log("data dhikhao tags ka 225",allTags);
            store.state.threadData[data.threadID].data.tags.forEach(t => {
                threadDataTagId.push(t.id);
            });
            allTags.forEach(tag => {
                if(data.action == 'addTag') {
                    if(!threadDataTagId.includes(tag.id)){
                        store.state.threadData[data.threadID].data.tags.push(tag);
                    }
                    let log = {
                        'type': 'log',
                        'data': {
                            'type': 'tag',
                            'at': data.time,
                            'body': data.user.first_name + data.user.last_name + ' added the tag ' + tag.name,
                        },
                        'timestamp': Date.now()
                    };
                    store.state.threadData[data.threadID].data.items.push(log);
                } else if(data.action == 'removeTag') {
                    store.state.threadData[data.threadID].data.tags = store.state.threadData[data.threadID].data.tags.filter(tg => tg.id !== tag.id);
                    let log = {
                        'type': 'log',
                        'data': {
                            'type': 'tag',
                            'at': data.time,
                            'body': data.user.first_name + data.user.last_name + ' removed the tag ' + tag.name,
                        },
                        'timestamp': Date.now()
                    };
                    store.state.threadData[data.threadID].data.items.push(log);
                }
            });
        }
    });
    // }
}

export function assignThread(data) {
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    // if(inbox) {
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if(objIndex !== -1) {
            store.state.threads[objIndex].assignedTo = data.assigned;
        }
        if(store.state.openThread == thread) {
            store.state.threadData[thread].data.currentAssignment = {
                'assigned': data.assigned,
                'me': data.assigned.id == store.state.userInfo.id ? true : false,
                'assigner': data.assigner,
                'time': data.time
            };
            let body = '';
            if(data.assigned.id == store.state.userInfo.id) {
                body = data.assigner.first_name + data.assigner.last_name + ' assigned the conversation to themselves';
            } else if (data.assigned == null) {
                body = data.assigner.first_name + data.assigner.last_name + ' unassigned the conversation';
            } else {
                body = data.assigner.first_name + data.assigner.last_name + ' assigned the conversation to ' + data.assigned.first_name + data.assigned.last_name;
            }
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

export function unsnoozeThread(data) {
    // var inbox = data.mailboxID == store.state.inboxData.id ? true : false;
    var all = store.state.type == 'all';
    var mine = (data.thread.assignedTo.id == store.state.userInfo.id ? true : false) && (store.state.type == 'mine');
    var assigned = (data.thread.assignedTo !== null ? true : false) && (store.state.type == 'assigned');
    var unassigned = (!assigned) && (store.state.type == 'unassigned');
    // if(inbox) {
    var allThreads = data.threadID;
    allThreads.forEach(thread => {
        let objIndex = store.state.threads.findIndex((obj) => obj.id == thread);
        if (objIndex !== -1 && store.state.type == 'snoozed') {
            store.state.threads.splice(objIndex, 1);
        } else if(all || mine || assigned || unassigned) {
            store.state.threads.unshift(data.thread);
        }
        if (store.state.openThread == thread) {
            store.dispatch('updateFirebaseModal', "This conversation's snooze is ended and has been moved to inbox.");
            this.$bvModal.show('firebaseModal');
        }
    });
    // }
}