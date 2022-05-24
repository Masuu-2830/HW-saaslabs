import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const dataState = createPersistedState({
    paths: ['inboxData', 'type', 'mailboxId', 'filterSection']
})

export const store = new Vuex.Store({
    plugins: [dataState],
    state: {
        openThread: null,
        inboxes: [],
        mailboxId: 'me',
        userInfo: {},
        userSettings: {},
        inboxData: {
            "id": "me",
            "name": "Universal",
            "type": "Universal"
        },
        tags: [],
        teammates: [],
        views: [],
        mailboxes: [],
        userSignature: {},
        userSignatures: {},
        aliases: {},
        fromAddresses: [],
        stateLoaded: false,
        type: "",
        labelId: -1,
        threads: [],
        threadData: {},
        firebaseModal: '',
        openThread: null,
        filterSection: 'open'
    },
    mutations: {
        setState: (state, data) => {
            state.inboxes = data.data.inboxes.reduce((acc, cv) => {
                acc[cv.id] = cv;
                return acc;
            }, {});
            // if(data.data.inboxData) {
            //     state.mailboxId = data.data.inboxData.id;
            // }
            state.userInfo = data.data.userInfo;
            state.userSettings = data.data.userSettings;
            state.tags = data.data.tags;
            state.views = data.data.views;
            state.teammates = data.data.teammates;
            state.fromAddresses = data.data.fromAddresses;
            state.stateLoaded = true;
        },
        setStateMailBoxes: (state, data) => {
            console.log(data.data)
            state.mailboxes = data.data;
        },
        setUserSignature: (state, data) => {
            console.log(data)
            state.userSignature = data;
        },
        setUserSignatures: (state, data) => {
            console.log(data)
            state.userSignatures = data;
        },
        setAliases: (state, data) => {
            console.log(data)
            state.aliases = data;
        },
        setType: (state, data) => {
            console.log(data)
            state.type = data;
        },
        setLabelId: (state, data) => {
            state.labelId = data;
        },
        setThreads: (state, data) => {
            state.threads = data;
        },
        setThreadData: (state, data) => {
            if (!(data.id in Object.keys(state.threadData))) {
                state.threadData[data.data.id] = data;
                console.log("adding new thread")
            }
            console.log(state.threadData);
        },
        setFirebaseModal: (state, data) => {
            console.log(data);
            state.firebaseModal = data;
        },
        setOpenThread: (state, data) => {
            state.openThread = data;
        },
        setFilterSection: (state, data) => {
            state.filterSection = data;
        },
        updateMailboxId(state, mailboxId) {
            state.mailboxId = mailboxId;
            if(mailboxId == "tags"){
                mailboxId = "me";
            }
            state.inboxData = state.inboxes[mailboxId];
        }
    },
    actions: {
        async fetchPingDetails(context, data) {
            await context.commit('setState', data);
        },
        async updateMailboxId(context, mailboxId) {
            await context.commit('updateMailboxId', mailboxId);
        },
        async fetchMailBoxes(context, data) {
            await context.commit('setStateMailBoxes', data);
        },
        async fetchUserSignature(context, data) {
            await context.commit('setUserSignature', data);
        },
        async fetchUserSignatures(context, data) {
            await context.commit('setUserSignatures', data);
        },
        async fetchAliases(context, data) {
            await context.commit('setAliases', data);
        },
        async type(context, data) {
            await context.commit('setType', data);
        },
        async labelId(context, data) {
            await context.commit('setLabelId', data);
        },
        async updateFilterSection(context, data) {
            await context.commit('setFilterSection', data);
        },
        async updateThreads(context, data) {
            // Vue.$bvModal.show('firebaseModal');
            await context.commit('setThreads', data);
        },
        async updateThreadData(context, data) {
            await context.commit('setThreadData', data);
        },
        async updateFirebaseModal(context, data) {
            await context.commit('setFirebaseModal', data);
        },
        async updateOpenThread(context, data) {
            await context.commit('setOpenThread', data);
        },
    }
})