// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFroala from "vue-froala-wysiwyg";
import $ from "jquery";
import {store} from "./store/store";
import {BootstrapVue, IconsPlugin, LayoutPlugin} from 'bootstrap-vue';
Vue.use(LayoutPlugin);
import FroalaEditor from "froala-editor";
import "font-awesome/css/font-awesome.min.css";
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import 'froala-editor/js/plugins.pkgd.min' // all plugins
import 'tributejs/dist/tribute.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './firebaseInit.js';
// import 'bootstrap/dist/css/bootstrap.css'
window.$ = $;
// const moment = require('moment')
// require('moment/locale/es')
Vue.use(require('vue-moment'))
Vue.use(VueFroala);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// Vue.moment().locale('en');
Vue.moment().locale('en', {
    relativeTime: {
        future: 'in %s',
        past: number => (number == 'just now' ? number : `${number} ago`),
        s: 'just now',
        ss: 'just now',
        m: '%dmin',
        mm: '%dmin',
        h: '%dH',
        hh: '%dH',
        d: '%dD',
        dd: '%dD',
        M: '%dM',
        MM: '%dM',
        y: '%dY',
        yy: '%dY'
    }
});
export const bus = new Vue();
function refreshSignatureDropdownOnShow($btn, $dropdown) {
    let signatures = store.state.userSignatures;
    console.log("111111111", signatures);
    if (signatures) {
      let html = '';
        for (let signature of signatures) {
            html += `<li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="signatureBtn" data-param1="${
                signature.id
            }" title="${
                signature.name
            }" aria-selected="false">${
                signature.name
            }</a></li>`;
        }
        $dropdown.find('.fr-dropdown-list').html(html);
    }
    // $.get({
    //     url: `https://app.helpwise.io/api/signatures/list.php`,
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     // url: '/api/getUserSignature.php',
    //     data: {
    //         mailboxId: this.mailboxID
    //     },
    //     success: response => {
    //         let html = '';
    //         console.log($dropdown.find('.fr-dropdown-list'), response.data);
    //         if (response.status == 'success') {
    //             for (let signature of response.data) {
    //                 html += `<li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="signatureBtn" data-param1="${
    //                     signature.id
    //                 }" title="${
    //                     signature.name
    //                 }" aria-selected="false">${
    //                     signature.name
    //                 }</a></li>`;
    //             }
    //             $dropdown.find('.fr-dropdown-list').html(html);
    //         } else {}
    //     },
    //     error: err => {
    //         handleUnauthorizedError(err);
    //         console.error(err);
    //     }
    // });
}
let firstSignatureRefresh = false;
FroalaEditor.DefineIcon('signatureIcon', {
    SRC: require('./assets/pen-nib-solid.svg'),
    ALT: 'ChangeSignature',
    template: 'image'
});
FroalaEditor.RegisterCommand('signatureBtn', {
    title: 'Change Signature',
    type: 'dropdown',
    icon: 'signatureIcon',
    refreshOnShow: refreshSignatureDropdownOnShow.bind(this),
    callback: function (cmd, val) {
        let signatureId = val;
        fetch("https://app.helpwise.io/api/signatures/get.php?id=" + signatureId, {credentials: "include"}).then(async response => {
            const data = await response.json();
            if (data.status !== "success") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log(data);
            let thisEditor = this;
            let signature = data.data.signature;
            let signatureBody = signature.body;
            console.log(thisEditor.hwComponent, $(`.hw_signature`))
            $(`.hw_signature`).html(signatureBody);
        }).catch(error => {
            alert(error);
        })
    },
    refresh: function ($btn, $dropdown) {
        if (!firstSignatureRefresh) {
            refreshSignatureDropdownOnShow.call(this, $btn, $dropdown);
        }
        firstSignatureRefresh = true;
    }
});
FroalaEditor.DefineIconTemplate('font_awesome_5b', '<i class="fab fa-[FA5NAME]"></i>');
FroalaEditor.DefineIcon('scheduleReply', {
    FA5NAME: 'clock',
    template: 'font_awesome_5'
});
FroalaEditor.RegisterCommand('scheduleReply', {
    title: 'Schedule Reply',
    type: 'dropdown',
    icon: 'scheduleReply',
    focus: false,
    undo: false,
    refreshAfterCallback: true,
    options: {
        '1': 'Later today (In 3 hour)',
        '2': 'Tomorrow (9 am)',
        '3': 'Next Monday (9 am)',
        '4': 'One week',
        '5': 'One month',
        '6': 'Pick date & time'
    },
    callback: function (cmd, val) {
        console.log(val);
        var mom;
        if (val == 1) {
            mom = moment(moment().add(3, "hours").format("YYYY-MM-DD hh:mm A"), "YYYY-MM-DD hh:mm A");
        } else if (val == 2) {
            mom = moment(`${
                moment().add(1, "day").format("YYYY-MM-DD")
            } 09:00 am`, "YYYY-MM-DD hh:mm A");
        } else if (val == 3) {
            mom = moment(`${
                moment().day(8).format("YYYY-MM-DD ")
            } 09:00 am`, "YYYY-MM-DD hh:mm A");
        } else if (val == 4) {
            mom = moment().add(1, "week").minutes(0);
        } else if (val == 5) {
            mom = moment(moment().add(1, "month").format("YYYY-MM-DD hh:mm"), "YYYY-MM-DD hh:mm A");
        } else if (val == 6) {
            // console.log(this.datetime);
            // mom = new Date(this.datetime);
            // this.datetime = "";
            // this.$refs["snooze-thread-modal"].hide();
        }
        console.log(mom.toISOString());
        bus.$emit("scheduleTweet", mom);
    }
});
FroalaEditor.DefineIcon("attach", {
    FA5NAME: "paperclip",
    template: "font_awesome_5"
});
FroalaEditor.RegisterCommand("attach", {
    title: "Insert Attachment",
    icon: "attach",
    refreshAfterCallback: true,
    callback: function () {
        this.$wp.parents(".mail-compose").find(".editor-uploadAttachment").trigger("click");
    }
});
FroalaEditor.DefineIcon("attachMailReply", {
    FA5NAME: "paperclip",
    template: "font_awesome_5"
});
FroalaEditor.RegisterCommand("attachMailReply", {
    title: "Insert Attachment",
    icon: "attach",
    refreshAfterCallback: true,
    callback: function () {
        this.$wp.parents(".replyWindow").find(".editor-uploadAttachment").trigger("click");
    }
});
FroalaEditor.DefineIcon("attachChatReply", {
    FA5NAME: "paperclip",
    template: "font_awesome_5"
});
FroalaEditor.RegisterCommand("attachChatReply", {
    title: "Insert Attachment",
    icon: "attach",
    refreshAfterCallback: true,
    callback: function () {
        this.$wp.parents(".editor_container").find("#editor-uploadAttachment").trigger("click");
    }
});
FroalaEditor.DefineIcon("attachCardReply", {
    FA5NAME: "paperclip",
    template: "font_awesome_5"
});
FroalaEditor.RegisterCommand("attachCardReply", {
    title: "Insert Attachment",
    icon: "attach",
    refreshAfterCallback: true,
    callback: function () {
        this.$wp.parents(".card_compose").find(".editor-uploadAttachment").trigger("click");
    }
});
FroalaEditor.DefineIcon("attachTweetCompose", {
    FA5NAME: "paperclip",
    template: "font_awesome_5"
});
FroalaEditor.RegisterCommand("attachTweetCompose", {
    title: "Insert Attachment",
    icon: "attach",
    refreshAfterCallback: true,
    callback: function () {
        this.$wp.parents("#mailCompose").find(".editor-uploadAttachment").trigger("click");
    }
});
FroalaEditor.DefineIcon("attachSMSCompose", {
    FA5NAME: "paperclip",
    template: "font_awesome_5"
});
FroalaEditor.RegisterCommand("attachSMSCompose", {
    title: "Insert Attachment",
    icon: "attach",
    refreshAfterCallback: true,
    callback: function () {
        this.$wp.parents("#smsCompose").find(".editor-uploadAttachment").trigger("click");
    }
});
FroalaEditor.DefineIcon("clear", {
    NAME: "remove",
    SVG_KEY: "remove"
});
FroalaEditor.RegisterCommand("clear", {
    title: "Discard Draft",
    focus: false,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
        console.log(this);
        bus.$emit("discardDraftModalll", this);
        // console.log(this.draftID, this.threadID);
        // let requestOptions = {};
        // let url = "";
        // if(this.type == 'replyCard' || this.type == 'tweetCompose') {
        // url = "https://app.helpwise.io/api/discard_tweet_draft.php";
        // let threadId = new Array();
        // threadId.push(this.threadID);
        // requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       mailboxId: this.mailboxID,
        //       threadIds: threadId,
        //     }),
        //     credentials: "include",
        // }
        // } else {
        // url = "https://app.helpwise.io/api/discardDraft.php";
        // requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       mailboxId: this.mailboxID,
        //       threadId: this.threadID,
        //       draftId: this.draftID,
        //     }),
        //     credentials: "include",
        // }
        // }
        // fetch(
        // url,
        // requestOptions
        // ).then(async (response) => {
        // const data = await response.json();
        // if (data.status !== "success") {
        //     const error = (data && data.message) || response.status;
        //     return Promise.reject(error);
        // }
        // // console.log(vueThis);
        // // vueThis.closeCompose(this.composer.hash);
        // if(this.type == "compose" || this.type == "tweetCompose" || this.type == "smsCompose") {
        //     console.log("compose from main");
        //     bus.$emit("closeCompose", this.composer.hash);
        // } else if(this.type == "reply") {
        //     console.log("reply from main");
        //     bus.$emit("closeReply", this.reply.hash);
        // } else if(this.type == "replyCard") {
        //     console.log("replyCard from main");
        //     bus.$emit("closeReplyCard", this.draftID);
        // }
        // });
    }
});
Vue.use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true
});
Vue.config.productionTip = false;
Vue.prototype.$apiBaseURL = 'https://app.helpwise.io/api/';
Vue.prototype.$resultsPerPage = {
    value: 0
};
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: store,
    components: {
        App
    },
    template: '<App/>'
})
export const triggerPromptNotif = (component, type = "", timeout = 3000) => {
    // const triggerNotifToast = type == "" || type == "default" ? this.$toast : this.$toast[type];
    // const triggerNotifToast = this._vm.$toast;
    if (type == "" || type == "default") {
        Vue.$toast(component, {
            position: "top-right",
            timeout: timeout,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: "button",
            icon: true,
            rtl: false
        });
        return;
    }
    Vue.$toast[type](component, {
        position: "top-right",
        timeout: timeout,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false
    });
}
