// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFroala from "vue-froala-wysiwyg";
import $ from "jquery";
import { store } from "./store/store";
import { BootstrapVue, IconsPlugin,LayoutPlugin } from 'bootstrap-vue';
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

// import 'bootstrap/dist/css/bootstrap.css'
window.$ = $;
Vue.use(require('vue-moment'));
Vue.use(VueFroala);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export const bus = new Vue();
FroalaEditor.DefineIcon("attach", {
  FA5NAME: "paperclip",
  template: "font_awesome_5",
});
FroalaEditor.RegisterCommand("attach", {
  title: "Insert Attachment",
  icon: "attach",
  refreshAfterCallback: true,
  callback: function () {
    this.$wp.parents(".mail-compose").find(".editor-uploadAttachment").trigger("click");
  },
});

FroalaEditor.DefineIcon("attachReply", {
  FA5NAME: "paperclip",
  template: "font_awesome_5",
});
FroalaEditor.RegisterCommand("attachReply", {
  title: "Insert Attachment",
  icon: "attach",
  refreshAfterCallback: true,
  callback: function () {
    this.$wp.parents(".replyWindow").find(".editor-uploadAttachment").trigger("click");
  },
});

FroalaEditor.DefineIcon("clear", { NAME: "remove", SVG_KEY: "remove" });
FroalaEditor.RegisterCommand("clear", {
  title: "Discard Draft",
  focus: false,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    console.log(this.composer, this.draftID, this.threadID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mailboxId: this.mailboxID,
        threadId: this.threadID,
        draftId: this.draftID,
      }),
      credentials: "include",
    };
    fetch(
      "https://app.helpwise.io/api/discardDraft.php",
      requestOptions
    ).then(async (response) => {
      const data = await response.json();
      if (data.status !== "success") {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      // console.log(vueThis);
      // vueThis.closeCompose(this.composer.hash);
      if(this.type == "compose") {
        console.log("compose from main");
        bus.$emit("closeCompose", this.composer.hash);
      } else if(this.type == "reply") {
        console.log("reply from main");
        bus.$emit("closeReply", this.reply.hash);
      }
    });
  },
});

Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
});

Vue.config.productionTip = false;
Vue.prototype.$apiBaseURL = 'https://app.helpwise.io/api/';
Vue.prototype.$resultsPerPage = {value: 0};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})

export const triggerPromptNotif = (component, type = "", timeout=3000) => {
  // const triggerNotifToast = type == "" || type == "default" ? this.$toast : this.$toast[type];
  // const triggerNotifToast = this._vm.$toast;
  if(type == "" || type == "default"){
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

// xwuFgeqrSRKZTucFBGmh
