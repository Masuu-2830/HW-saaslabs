import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
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
        stateLoaded: false
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
        }
    }
})