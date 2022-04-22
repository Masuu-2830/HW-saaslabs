import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
// import MailGroup from '@/components/MailGroup/MailGroup.vue';
import SHome from '@/components/Settings/S-Home';

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: "/",
      name: 'Home',
      component: Home,
      redirect: '/me/mine/open/p/1'
    },
    {
      path: "/me/mine",
      name: "pagination",
      component: Home,
      redirect: '/me/mine/open/p/1'
    },
    {
      path: '/:mailboxId',
      name: 'mailbox',
      component: Home,
      redirect: '/:mailboxId/all/open/p/1'
    },
    {
      path: '/conversations/:threadId',
      name: 'thread',
      component: Home,
      props: true
    },
    {
      path: '/:mailboxId/:type/:filterSection/p/:pageNo',
      name: 'type',
      component: Home,
      props: true
    },
    {
      path: '/tags/:tagId/:filterSection/p/:pageNo',
      name: 'tag',
      component: Home,
      props: true
    },
    {
      path: "/settings",
      name: 'SHome',
      component: SHome
    }
  ]
})
