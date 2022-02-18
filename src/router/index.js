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
      redirect: '204420/mine'
    },
    {
      path: '/:mailboxId',
      name: 'mailbox',
      component: Home,
      redirect: '/:mailboxId/mine'
    },
    {
      path: '/open/:threadId',
      name: 'thread',
      component: Home,
      props: true
    },
    {
      path: '/:mailboxId/:type',
      name: 'type',
      component: Home,
      props: true
    },
    {
      path: '/:mailboxId/:type/p/:pageNo',
      name: 'page',
      component: Home,
      props: true
    },
    // {
    //   path: '/:mailboxId/:type/:threadId',
    //   name: 'thread',
    //   component: Home,
    // },
    
    {
      path: "/settings",
      name: 'SHome',
      component: SHome
    }
  ]
})
