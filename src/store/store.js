import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const dataState = createPersistedState({
    paths: ['inboxData', 'type']
})

export const store = new Vuex.Store({
    plugins: [dataState],
    state: {
        inboxData: {},
        userInfo: {},
        userSettings: {},
        tags: [],
        teammates: [],
        views: [],
        mailboxes: [],
        userSignature: {},
        aliases: {},
        stateLoaded: false,
        type: "",
        labelId: -1,
        threads: [],
        threadData: {},
        firebaseModal: '',
        openThread: null
    },
    mutations: {
        setState: (state, data) => {
            state.inboxData = data.data.inboxData;
            state.userInfo = data.data.userInfo;
            state.userSettings = data.data.userSettings;
            state.tags = data.data.tags;
            state.views = data.data.views;
            state.teammates = data.data.teammates;
            state.stateLoaded = true;
            console.log(state);
        },
        setStateMailBoxes: (state, data) => {
            console.log(data.data)
            state.mailboxes = data.data;
        },
        setUserSignature: (state, data) => {
            console.log(data)
            state.userSignature = data;
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
            console.log(data)
            state.labelId = data;
        },
        setThreads: (state, data) => {
            console.log(data)
            state.threads = data;
        },
        setThreadData: (state, data) => {
            console.log(data);
            if(!(data.id in Object.keys(state.threadData))) {
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
        }
    },
    actions: {
        async fetchPingDetails(context, data) {
            await context.commit('setState', data);
        },
        async fetchMailBoxes(context, data) {
            await context.commit('setStateMailBoxes', data);
        },
        async fetchUserSignature(context, data) {
            await context.commit('setUserSignature', data);
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
        async updateThreads(context, data) {
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
    },
    // getters: {
    //     getUserInfo(state) {
    //         return state.userInfo;
    //     }
    // }
})