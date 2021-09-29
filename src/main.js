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

import "font-awesome/css/font-awesome.min.css";
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import 'tributejs/dist/tribute.css';
// import 'bootstrap/dist/css/bootstrap.css'
window.$ = $;
Vue.use(require('vue-moment'));
Vue.use(VueFroala);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
Vue.prototype.$apiBaseURL = 'https://app.helpwise.io/api/';
Vue.prototype.$resultsPerPage = {value: 0};
export const bus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})

// xwuFgeqrSRKZTucFBGmh