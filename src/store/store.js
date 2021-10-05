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
        mailboxes: []
    },
    mutations: {
        setState: (state, data) => {
            state.inboxData = data.data.inboxData;
            state.userInfo = data.data.userInfo;
            state.userSettings = data.data.userSettings;
            state.tags = data.data.tags;
            state.views = data.data.views;
            state.teammates = data.data.teammates;
        },
        setStateMailBoxes: (state, data) => {
            console.log(data.data)
            state.mailboxes = data.data;
        }
    },
    actions: {
        async fetchPingDetails(context, data) {
            await context.commit('setState', data);
            console.log("++2")
        },
        async fetchMailBoxes(context, data) {
            await context.commit('setStateMailBoxes', data);
            // console.log("++2")
        }
    }
})