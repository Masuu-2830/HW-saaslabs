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
        views: []
    },
    mutations: {
        setState: (state, data) => {
            state.inboxData = data.data.inboxData;
            state.userInfo = data.data.userInfo;
            state.userSettings = data.data.userSettings;
            state.tags = data.data.tags;
            state.views = data.data.views;
            state.teammates = data.data.teammates;
        }
    },
    actions: {
        async fetchPingDetails(context, mailboxId) {
            const response = await fetch("https://app.helpwise.io/api/ping.php?mailboxID=" + mailboxId, {credentials: 'include'});
            const data = await response.json();
            console.log(data);
            data.data.tags = data.data.tags.sort((b,a) => b.name-a.name);
            await context.commit('setState', data);
        }
    }
})