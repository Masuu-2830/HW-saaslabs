<template>
  <div class="mail-group" :class="isCompact && 'mail-group-body-compact'">
    <div v-if="loading" id="email-spinner" class="spinner-border text-primary" role="status" style="position: absolute; top: 50%; left: 50%;">
        <span class="sr-only">Loading...</span>
    </div>
    <mails-header-search-box></mails-header-search-box>
    <mails-header-select-all :mailbox="mailbox" :startThread="startThread" :endThread="endThread" :currPage="currPage" :isnextPage="isnextPage" :mailsnum="mails.length"></mails-header-select-all>
    <div
      v-if="!loading"
      class="mail-group-body bd-y"
      style="overflow-y: auto; overflow-x: hidden; background-color: white"
    >
      <div v-if="mails.length !== 0" id="threads-list">
        <div v-for="mail in perPageMails" :key="mail.id" :id="'thread-'+mail.id" @click="clickThread(mail.id, mail.isStarred==true)">
          <mail-group-single-mail  :class="{'active': activeId === mail.id}" :mail="mail"></mail-group-single-mail>
          </div>
      </div>
      <div
        v-if="mails.length == 0"
        class="flex-row justify-content-center w-100"
        id="no-mails-container"
        style="position: absolute; top: 30%"
      >
        <div class="d-flex flex-column align-items-center">
          <div id="no-mails-img"><img src="	https://app.helpwise.io/assets/images/empty-box.png"></div>
          <div id="no-mails-msg" style="font-weight: 500" class="tx-18">Hurray! You have no more emails.</div>
        </div>
      </div>
      <div
        v-if="mails.length !== 0"
        class="
          align-items-center
          justify-content-center
          pagination-container pagination-container-bottom
          pd-y-15
          d-flex
        "
      >
        <div class="float-right">
          <span class="current-indicator">
            <span class="current-indicator-start">{{ startThread }}</span>
            -
            <span class="current-indicator-end">{{ endThread }}</span>
            <!-- <span v-else class="current-indicator-end">20</span> -->
          </span>
          <!-- <router-link :to="route+'/p/'+(currPage)"> -->
          <button
            style="display: inline-block"
            class="mr-1 ml-1 btn p-0 prev-page-btn"
            @click="prevPage"
            :disabled="currPage == 1 && 'disabled'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <!-- </router-link> -->
          <!-- <router-link :to="'/'+route+'/p/'+(currPage)"> -->
          <button
            style="display: inline-block"
            class="ml-1 mr-1 btn p-0 next-page-btn"
            @click="nextPage"
            :disabled="isnextPage == false && 'disabled'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '../main';
import router from '../router';
import MailGroupSingleMail from './MailGroupSingleMail.vue';
import MailsHeaderSearchBox from './MailsHeaderSearchBox.vue';
import MailsHeaderSelectAll from './MailsHeaderSelectAll.vue';
export default {
  components: { MailsHeaderSearchBox, MailsHeaderSelectAll, MailGroupSingleMail },
  name: 'MailGroup',
  props: {
    mailbox: Object,
  },
  data() {
    return {
      isCompact: false,
      mails: [],
      perPageMails: [],
      currPage: 1,
      isnextPage: false,
      noOfPages: 1,
      startThread: 1,
      endThread: 1,
      activeId: '',
      route: '',
      labelId: 14,
      personId: 0,
      order: '',
      loading: false,
      squery: "",
      resultsPerPage: 5
    }
  },
  created() {
      bus.$on('broad', () => {
          this.isCompact = false,
          this.activeId = '',
          router.push({ name: 'page', params: {pageNo: this.currPage, type: this.route, mailboxId: this.$store.state.inboxData.id}});
      });
      bus.$on('prevPage', () => {
          this.prevPage();
      });
      bus.$on('nextPage', () => {
          this.nextPage();
      });
      bus.$on('filterPerson', (data) => {
          this.personId = data;
          this.currPage = 1;
          console.log(this.personId);
          this.fetchThreads();
      });
      bus.$on('filterOrder', (data) => {
          this.order = data;
          this.currPage = 1;
          console.log(this.order);
          this.fetchThreads();
      });
      bus.$on('squery', (data) => {
          this.squery = data;
          // console.log(this.order);
          this.currPage = 1;
          this.fetchThreads();
      });
      bus.$on('closeThread', (id) => {
        let threadIDs = new Array();
          threadIDs[0] = id;
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs }),
            credentials: 'include'
          };
          fetch(this.$apiBaseURL + "archiveThreads.php", requestOptions)
          .then(async response => { 
            const data = await response.json();
            if(data.message !== "thread archived") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.perPageMails = this.perPageMails.filter(item => item.id !== id);
            fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&labelID=" + this.labelId + "&limit=1&offset=19&consistent=true", {credentials: 'include'})
            .then(async response => {
              const data = await response.json();
              if(data.status !== "success") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.perPageMails.push(data.data.threads[0]);
            })
          }).catch(error => {
            alert(error);
          })
      });
      bus.$on('snoozeThread', (id, till) => {
        let threadIDs = new Array();
          threadIDs[0] = id;
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs, snoozeTill: till }),
            credentials: 'include'
          };
          fetch(this.$apiBaseURL + "snoozeThreads.php", requestOptions)
          .then(async response => { 
            const data = await response.json();
            if(data.message !== "conversation snoozed") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.perPageMails = this.perPageMails.filter(item => item.id !== id);
            fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&labelID=" + this.labelId + "&limit=1&offset=19&consistent=true", {credentials: 'include'})
            .then(async response => {
              const data = await response.json();
              if(data.status !== "success") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.perPageMails.push(data.data.threads[0]);
            })
          }).catch(error => {
            alert(error);
          })
      });
      bus.$on("chStarInArr", (id) => {
          // this.perPageMails = this.perPageMails.filter(item => item.id !== id);
          var objIndex = this.perPageMails.findIndex((obj => obj.id == id));
          this.perPageMails[objIndex].isStarred = !this.perPageMails[objIndex].isStarred;
          console.log(this.perPageMails[objIndex]);
      });
      bus.$on("assignThread", (id, userId) => {
          let threadIds = new Array();
          threadIds[0] = id;
          let body;
          if(userId == "") {
            body = JSON.stringify({ mailboxId: this.$route.params.mailboxId, threadIds });
          } else {
            body = JSON.stringify({ mailboxId: this.$route.params.mailboxId, threadIds, assignedUser: userId });
          }
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body,
            credentials: 'include'
          };
          fetch(this.$apiBaseURL + "assignThreads.php", requestOptions)
          .then(async response => { 
            const data = await response.json();
            if(data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            var objIndex = this.perPageMails.findIndex((obj => obj.id == id));
            let teammate = this.$store.state.teammates.filter(obj => obj.id == userId);
            console.log(teammate);
            this.perPageMails[objIndex].assignedTo = teammate[0];
            this.clickThread(id, this.perPageMails[objIndex].isStarred);
          }).catch(error => {
            alert(error);
          })
      });
      bus.$on("toggleTags", (id, addtags, removetags) => {
          // console.log(id, addtags, removetags, addtags.length);
          if(addtags.length || removetags.length) {
            let threadIds = new Array();
            let addTags = new Array();
            let removeTags = new Array();
            threadIds[0] = id;
            for(var i = 0; i< addtags.length; i++) {
              addTags.push(addtags[i]);
            }
            for(var i = 0; i< removetags.length; i++) {
              removeTags.push(removetags[i]);
            }
            console.log(addTags,removeTags);
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ mailboxId: this.$route.params.mailboxId, threadIds, addTags, removeTags }),
              credentials: 'include',
            };
            fetch(this.$apiBaseURL + "tags/apply.php", requestOptions)
            .then(async response => { 
              const data = await response.json();
              if(data.message !== "Tags updated.") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              var objIndex = this.perPageMails.findIndex((obj => obj.id == id));
              for(var i = 0; i< removetags.length; i++) {
                this.perPageMails[objIndex].tags = this.perPageMails[objIndex].tags.filter(tag => tag.id !== removetags[i]);
              } 
              for(var i = 0; i< addtags.length; i++) {
                let tag = this.$store.state.tags.filter(obj => obj.id == addtags[i]);
                // console.log(tag);
                this.perPageMails[objIndex].tags.push(tag[0]);
              }
              this.clickThread(id, this.perPageMails[objIndex].isStarred);
            }).catch(error => {
              alert(error);
            })
          }
      })
  },
  watch:{
    $route (to, from) {
        console.log(to.params.type);
        this.route = to.params.type;
        if(to.params.type !== from.params.type) {
          bus.$emit("changeType");
          if(to.params.type == 'assigned') {
          this.labelId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        } else if(to.params.type == 'mine') {
          this.labelId = 4;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        } else if(to.params.type == 'mentions') {
          this.labelId = 13;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        } else if(to.params.type == 'discussions') {
          this.labelId = 15;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        } else if(to.params.type == 'unassigned') {
          this.labelId = 10;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        } else if(to.params.type == 'starred') {
          this.labelId = 11;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        } else if(to.params.type == 'snoozed') {
          this.labelId = 9;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        } else if(to.params.type == 'drafts') {
          this.labelId = 2;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        } else if(to.params.type == 'all') {
          this.labelId = 14;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = '';
          this.squery = "";
        }
        this.fetchThreads();
        }
        if(to.params.type == from.params.type && to.params.pageNo == undefined && to.params.threadId == undefined) {
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.fetchThreads();
        }
    }
  },
  methods: {
    async clickThread(id, isstarred) {
      bus.$emit('read', id);
      this.activeId = id;
      this.isCompact = true;
      let data = null;
      bus.$emit('compact', data);
      data = await this.fetchThread(id, isstarred);
      console.log(data);
      bus.$emit('compact', data);
    },
    async fetchThreads() {
      this.loading = true;
      let response;
      if(this.squery !== "") {
        if(this.personId == 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery, {credentials: 'include'});
        } else if(this.personId == 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 1 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unassigned", {credentials: 'include'});
        } else if(this.personId == 1 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unassigned&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 2 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unread", {credentials: 'include'});
        } else if(this.personId == 2 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unread&order="+this.order, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=assignedTo%3A"+this.personId, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=assignedTo%3A"+this.personId+"&order="+this.order, {credentials: 'include'});
        }
      } else {
        if(this.personId == 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId, {credentials: 'include'});
        } else if(this.personId == 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 1 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unassigned", {credentials: 'include'});
        } else if(this.personId == 1 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unassigned&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 2 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unread", {credentials: 'include'});
        } else if(this.personId == 2 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unread&order="+this.order, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=assignedTo%3A"+this.personId, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=assignedTo%3A"+this.personId+"&order="+this.order, {credentials: 'include'});
        }
      }
      const data = await response.json();
      console.log(data.data.threads);
      this.mails = data.data.threads;
      this.loading = false;
      this.isnextPage = data.data.nextPage;
      console.log(this.mails.length);
      console.log(this.isnextPage);

      this.perPageMails = this.mails;
      console.log("--");
      this.resultsPerPage = this.$store.state.userSettings.resultsPerPage;
      console.log("--2");
      // this.resultsPerPage = 1;
      router.push({ name: 'page', params: {pageNo: this.currPage, type: this.route, mailboxId: this.$route.params.mailboxId}});
      this.startThread = ((parseInt(this.currPage) - 1)*this.resultsPerPage) + 1;
      this.endThread = parseInt(this.startThread) + parseInt(this.resultsPerPage) - 1;
      console.log(this.endThread);
      console.log(this.startThread);
      console.log(this.$store.state.userSettings.resultsPerPage);
    },
    async fetchThread(id, isstarred) {
      console.log(isstarred);
      const response = await fetch(this.$apiBaseURL + "getThreadData.php?threadID=" + id + "&mailboxID=" + this.$route.params.mailboxId + "&labelID=" + this.labelId + "&page=1", {credentials: 'include'});
      const data = await response.json();
      if(this.$store.state.userSettings.orderThread == 'asc') {
        data.data.items = data.data.items.sort((b,a) => b.timestamp-a.timestamp);
      } else {
        data.data.items = data.data.items.sort((b,a) => a.timestamp-b.timestamp);
      }
      // data.data.isRead = isread;
      data.data.isStarred = isstarred;
      console.log(data);
      router.push({ name: 'thread', params: {threadId: id, type: this.route, mailboxId: this.$store.state.inboxData.id}});
      return data;
    },
    async nextPage() {
      if(this.isnextPage == true) {
        this.loading = true;
        this.currPage++;
        let response;
        if(this.squery !== "") {
        if(this.personId == 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery, {credentials: 'include'});
        } else if(this.personId == 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 1 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unassigned", {credentials: 'include'});
        } else if(this.personId == 1 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unassigned&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 2 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unread", {credentials: 'include'});
        } else if(this.personId == 2 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unread&order="+this.order, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=assignedTo%3A"+this.personId, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=assignedTo%3A"+this.personId+"&order="+this.order, {credentials: 'include'});
        }
      } else {
        if(this.personId == 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId, {credentials: 'include'});
        } else if(this.personId == 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 1 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unassigned", {credentials: 'include'});
        } else if(this.personId == 1 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unassigned&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 2 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unread", {credentials: 'include'});
        } else if(this.personId == 2 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unread&order="+this.order, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=assignedTo%3A"+this.personId, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=assignedTo%3A"+this.personId+"&order="+this.order, {credentials: 'include'});
        }
      }
        const data = await response.json();
        console.log(data);
        this.mails = data.data.threads;
        this.loading = false;
        this.isnextPage = data.data.nextPage;
        console.log(this.mails.length)
        this.perPageMails = this.mails;
        this.startThread = ((this.currPage - 1)*this.$store.state.userSettings.resultsPerPage) + 1;
        this.endThread = parseInt(this.startThread) + parseInt(this.$store.state.userSettings.resultsPerPage) - 1;
        if(this.$route.params.threadId == undefined) {
          router.push({ name: 'page', params: {pageNo: this.currPage, type: this.route, mailboxId: this.$store.state.inboxData.id}});
        }
      }
    },
    async prevPage() {
      if(this.currPage > 1) {
        this.loading = true;
        this.currPage--;
        if(this.$route.params.threadId == undefined) {
          router.push({ name: 'page', params: {pageNo: this.currPage, type: this.route, mailboxId: this.$store.state.inboxData.id}});
        }
        let response;
        if(this.squery !== "") {
        if(this.personId == 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery, {credentials: 'include'});
        } else if(this.personId == 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 1 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unassigned", {credentials: 'include'});
        } else if(this.personId == 1 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unassigned&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 2 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unread", {credentials: 'include'});
        } else if(this.personId == 2 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=unread&order="+this.order, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=assignedTo%3A"+this.personId, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&squery="+this.squery+"&filter=assignedTo%3A"+this.personId+"&order="+this.order, {credentials: 'include'});
        }
      } else {
        if(this.personId == 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId, {credentials: 'include'});
        } else if(this.personId == 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 1 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unassigned", {credentials: 'include'});
        } else if(this.personId == 1 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unassigned&order="+this.order, {credentials: 'include'});
        } else if(this.personId == 2 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unread", {credentials: 'include'});
        } else if(this.personId == 2 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=unread&order="+this.order, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order == '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=assignedTo%3A"+this.personId, {credentials: 'include'});
        } else if(this.personId !== 0 && this.order !== '') {
          response = await fetch(this.$apiBaseURL + "get-threads.php?mailboxID=" + this.$route.params.mailboxId + "&page="+this.currPage+"&labelID="+this.labelId+"&filter=assignedTo%3A"+this.personId+"&order="+this.order, {credentials: 'include'});
        }
      }
        const data = await response.json();
        console.log(data);
        this.mails = data.data.threads;
        this.loading = false;
        this.isnextPage = data.data.nextPage;
        console.log(this.mails.length)
        this.perPageMails = this.mails;
        this.startThread = ((this.currPage - 1)*this.$store.state.userSettings.resultsPerPage) + 1;
        this.endThread = parseInt(this.startThread) + parseInt(this.$store.state.userSettings.resultsPerPage) - 1;
      }
    },
    async fetchSmsThread() {
      const response = await fetch("http://localhost/mas/hw/getSmsThreadData.php");
      const data = await response.json();
      data.data.items = data.data.items.sort((b,a) => b.timestamp-a.timestamp);
      console.log(data);
      return data;
    }
  },
  mounted() {
    this.fetchThreads();
  },
  beforeMount() {
    if(this.$route.params.type == 'assigned') {
      this.labelId = 0;
      this.route = this.$route.params.type;
    } else if(this.$route.params.type == 'mine') {
      this.labelId = 4;
      this.route = this.$route.params.type;
    } else if(this.$route.params.type == 'mentions') {
      this.labelId = 13;
      this.route = this.$route.params.type;
    } else if(this.$route.params.type == 'discussions') {
      this.labelId = 15;
      this.route = this.$route.params.type;
    } else if(this.$route.params.type == 'unassigned') {
      this.labelId = 10;
      this.route = this.$route.params.type;
    } else if(this.$route.params.type == 'starred') {
      this.labelId = 11;
      this.route = this.$route.params.type;
    } else if(this.$route.params.type == 'snoozed') {
      this.labelId = 9;
      this.route = this.$route.params.type;
    } else if(this.$route.params.type == 'drafts') {
      this.labelId = 2;
      this.route = this.$route.params.type;
    } else if(this.$route.params.type == 'all') {
      this.labelId = 14;
      this.route = this.$route.params.type;
    }

    if(this.$route.params.pageNo !== undefined) {
      this.currPage = this.$route.params.pageNo;
    } else {
      this.currPage = 1;
    }
  }
};
</script>

<style>
</style>