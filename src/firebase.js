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
    }
    return thread;
}

export function addThread(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    var all = this.$store.state.type == 'all';
    var mine = (data.assignedTo.id == this.$store.state.userInfo.id ? true : false) && (this.$store.state.type == 'mine');
    var assigned = (data.assignedTo !== null ? true : false) && (this.$store.state.type == 'assigned');
    var unassigned = (!assigned) && (this.$store.state.type == 'unassigned');

    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1) {
            this.$store.state.threads[objIndex].date = data.messageData.time;
            this.$store.state.threads[objIndex].subject = data.messageData.subject;
            var a = this.$store.state.threads.splice(objIndex, 1);
            this.$store.state.threads.unshift(a[0]);
        } else if(data.action == 'incoming' && (all || mine || assigned || unassigned)) {
            this.$store.state.threads.unshift(createThread(data));
        }
        if (this.$route.params.threadId !== undefined && (data.threadID in Object.keys(this.$store.state.threadData))) {
            if(data.inboxType == 'mail') {
                let itemIndex = this.$store.state.threadData[data.threadID].data.items.findIndex((obj) => obj.id == data.messageData.id);
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
                        this.$store.state.threadData[data.threadID].data.snippet = data1.data.email.snippet;
                        this.$store.state.threadData[data.threadID].data.subject = data1.data.email.subject;
                        if (this.$store.state.userSettings.orderThread == "asc") {
                            this.$store.state.threadData[data.threadID].data.items.push(email);
                        } else {
                            this.$store.state.threadData[data.threadID].data.items.unshift(email);
                        }
                    });
                }
            } else if(data.inboxType == 'chat' || data.inboxType == 'facebook') {
                let itemIndex = this.$store.state.threadData[data.threadID].data.items.findIndex((obj) => obj.id == data.messageData.id);
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
                    if (this.$store.state.userSettings.orderThread == "asc") {
                        this.$store.state.threadData[data.threadID].data.items.push(message);
                    } else {
                        this.$store.state.threadData[data.threadID].data.items.unshift(message);
                    }
                }
            }
        }
    }
}

export function addNote(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    var all = this.$store.state.type == 'all';
    var mine = (data.assignedTo.id == this.$store.state.userInfo.id ? true : false) && (this.$store.state.type == 'mine');
    var assigned = (data.assignedTo !== null ? true : false) && (this.$store.state.type == 'assigned');
    var unassigned = (!assigned) && (this.$store.state.type == 'unassigned');

    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1) {
            this.$store.state.threads[objIndex].date = data.messageData.time;
            var a = this.$store.state.threads.splice(objIndex, 1);
            this.$store.state.threads.unshift(a[0]);
        } else if(all || mine || assigned || unassigned) {
            this.$store.state.threads.unshift(createThread(data));
        }
        if (this.$route.params.threadId !== undefined && (data.threadID in Object.keys(this.$store.state.threadData))) {
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
            if (this.$store.state.userSettings.orderThread == "asc") {
                this.$store.state.threadData[data.threadID].data.items.push(comment);
            } else {
                this.$store.state.threadData[data.threadID].data.items.unshift(comment);
            }
        }
    }
}

export function closeThread(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1 && this.$store.state.type !== 'closed') {
            this.$store.state.threads.splice(objIndex, 1);
        } else if(objIndex == -1 && this.$store.state.type == 'closed') {
            this.$store.state.threads.unshift(createThread(data));
        }
        if (this.$route.params.threadId == data.threadID) {
            this.$store.dispatch('updateFirebaseModal', data.user.firstname + data.user.lastname + ' closed this conversation.');
            this.$bvModal.show('firebaseModal');
        }
    }
}

export function snoozeThread(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1 && this.$store.state.type !== 'snoozed') {
            this.$store.state.threads.splice(objIndex, 1);
        } else if(objIndex == -1 && this.$store.state.type == 'snoozed') {
            this.$store.state.threads.unshift(createThread(data));
        }
        if (this.$route.params.threadId == data.threadID) {
            this.$store.dispatch('updateFirebaseModal', data.user.firstname + data.user.lastname + ' snoozed this conversation.');
            this.$bvModal.show('firebaseModal');
        }
    }
}

export function deleteThread(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1 && this.$store.state.type !== 'trash') {
            this.$store.state.threads.splice(objIndex, 1);
        } else if(objIndex == -1 && this.$store.state.type == 'trash') {
            this.$store.state.threads.unshift(createThread(data));
        }
        if (this.$route.params.threadId == data.threadID) {
            this.$store.dispatch('updateFirebaseModal', data.user.firstname + data.user.lastname + ' moved this conversation to trash.');
            this.$bvModal.show('firebaseModal');
        }
    }
}

export function moveToInboxThread(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    var all = this.$store.state.type == 'all';
    var mine = (data.assignedTo.id == this.$store.state.userInfo.id ? true : false) && (this.$store.state.type == 'mine');
    var assigned = (data.assignedTo !== null ? true : false) && (this.$store.state.type == 'assigned');
    var unassigned = (!assigned) && (this.$store.state.type == 'unassigned');
    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1) {
            this.$store.state.threads.splice(objIndex, 1);
        } else if(all || mine || assigned || unassigned) {
            this.$store.state.threads.unshift(createThread(data));
        }
        if (this.$route.params.threadId == data.threadID) {
            this.$store.dispatch('updateFirebaseModal', data.user.firstname + data.user.lastname + ' moved this conversation to inbox.');
            this.$bvModal.show('firebaseModal');
        }
    }
}

export function toggleTags(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if(objIndex !== -1) {
            data.tags.forEach(function (tag) {
                if(data.action == 'addTag') {
                    this.$store.state.threads[objIndex].tags.push(tag);
                } else if(data.action == 'removeTag') {
                    this.$store.state.threads[objIndex].tags = this.$store.state.threads[objIndex].tags.filter(tg => tg.id !== tag.id)
                }
            })
        }
        if(this.$route.params.threadId == data.threadID) {
            data.tags.forEach(function (tag) {
                if(data.action == 'addTag') {
                    this.$store.state.threadData[data.threadID].data.tags.push(tag);
                    let log = {
                        'type': 'log',
                        'data': {
                            'type': 'tag',
                            'at': data.time,
                            'body': data.user.firstname + data.user.lastname + ' added the tag ' + tag.name,
                        },
                        'timestamp': Date.now()
                    };
                    this.$store.state.threadData[data.threadID].data.items.push(log);
                } else if(data.action == 'removeTag') {
                    this.$store.state.threadData[data.threadID].data.tags = this.$store.state.threadData[data.threadID].data.tags.filter(tg => tg.id !== tag.id);
                    let log = {
                        'type': 'log',
                        'data': {
                            'type': 'tag',
                            'at': data.time,
                            'body': data.user.firstname + data.user.lastname + ' removed the tag ' + tag.name,
                        },
                        'timestamp': Date.now()
                    };
                    this.$store.state.threadData[data.threadID].data.items.push(log);
                }
            })
        }
    }
}

export function assignThread(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if(objIndex !== -1) {
            this.$store.state.threads[objIndex].assignedTo = data.assigned;
        }
        if(this.$route.params.threadId == data.threadID) {
            this.$store.state.threadData[data.threadID].data.currentAssignment = {
                'assigned': data.assigned,
                'me': data.assigned.id == this.$store.state.userInfo.id ? true : false,
                'assigner': data.assigner,
                'time': data.time
            };
            let body = '';
            if(data.assigned.id == this.$store.state.userInfo.id) {
                body = data.assigner.firstname + data.assigner.lastname + ' assigned the conversation to themselves';
            } else if (data.assigned == null) {
                body = data.assigner.firstname + data.assigner.lastname + ' unassigned the conversation';
            } else {
                body = data.assigner.firstname + data.assigner.lastname + ' assigned the conversation to ' + data.assigned.firstname + data.assigned.lastname;
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
            this.$store.state.threadData[data.threadID].data.items.push(log);
        }
    }
}

export function unsnoozeThread(data) {
    var inbox = data.mailboxID == this.$store.state.inboxData.id ? true : false;
    var all = this.$store.state.type == 'all';
    var mine = (data.thread.assignedTo.id == this.$store.state.userInfo.id ? true : false) && (this.$store.state.type == 'mine');
    var assigned = (data.thread.assignedTo !== null ? true : false) && (this.$store.state.type == 'assigned');
    var unassigned = (!assigned) && (this.$store.state.type == 'unassigned');
    if(inbox) {
        let objIndex = this.$store.state.threads.findIndex((obj) => obj.id == data.threadID);
        if (objIndex !== -1 && this.$store.state.type == 'snoozed') {
            this.$store.state.threads.splice(objIndex, 1);
        } else if(all || mine || assigned || unassigned) {
            this.$store.state.threads.unshift(data.thread);
        }
        if (this.$route.params.threadId == data.threadID) {
            this.$store.dispatch('updateFirebaseModal', "This conversation's snooze is ended and has been moved to inbox.");
            this.$bvModal.show('firebaseModal');
        }
    }
}