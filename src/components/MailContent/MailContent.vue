<template>
  <div
    class="mail-content flex-row-reverse justify-content-between"
    :style="{ display: display }"
    v-if="Object.keys(thread).length !== 0"
  >
    <div
      v-if="loading"
      id="thread-spinner"
      class="spinner-border text-primary"
      role="status"
      style="position: absolute; top: 50%; left: 50%"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <!-- <mail-content-int v-if="!loading"></mail-content-int> -->
    <IntegrationContainer
      v-if="!loading"
      @openInt="IntegrationSidebar"
      :sidebarOpen="sidebarOpen"
      :contactOpen="contactOpen"
      :thread="thread"
      :contact="contactData"
    ></IntegrationContainer>
    <div
      v-if="!loading"
      class="d-flex flex-column justify-content-between"
      :style="{ width: 'calc(100% - 60px - ' + right + ')' }"
    >
      <mail-content-header :thread="thread"></mail-content-header>
      <!-- <mail-content-body v-if="this.$store.state.inboxData.type == 'mail'" :thread="thread"></mail-content-body> -->
      <mail-content-body
        v-if="thread.data.mailboxType == 'mail'"
        :thread="thread"
      ></mail-content-body>
      <!-- <chat-content-body v-if="this.$store.state.inboxData.type !== 'mail'" :thread="thread"></chat-content-body> -->
      <chat-content-body
        v-if="thread.data.mailboxType !== 'mail'"
        :thread="thread"
      ></chat-content-body>
      <!-- <chat-content-body></chat-content-body> -->
      <chat-content-reply :thread="thread"></chat-content-reply>
      <!-- <mail-content-add-note v-if="!loading"></mail-content-add-note> -->
    </div>
  </div>
</template>

<script>
import { bus, triggerPromptNotif } from "../../main";
import { firebase_app } from "../../firebaseInit";
import ChatContentBody from "./ChatContentBody/ChatContentBody.vue";
import ChatContentReply from "./ChatContentBody/ChatContentReply.vue";
import MailContentBody from "./MailContentBody/MailContentBody.vue";
import MailContentHeader from "./MailContentHeader.vue";
// import MailContentInt from './MailContentInt.vue'; .
import IntegrationContainer from "./IntegrationContainer.vue";
// import MailContactPanel from './MailContactPanel.vue';
export default {
  components: {
    MailContentBody,
    MailContentHeader,
    ChatContentBody,
    ChatContentReply,
    IntegrationContainer,
  },
  name: "MailContent",
  data() {
    return {
      display: "none",
      right: "0px",
      thread: {},
      contactData: null,
      loading: false,
      sidebarOpen: false,
      contactOpen: false,
      integration_id: 0,
      integration_name: "",
    };
  },
<<<<<<< HEAD
  watch: {
    $route(to, from) {
      if (to.params.threadId !== from.params.threadId) {
        // this.ifIntOpen = false;
        this.right = "0px";
        this.contactOpen = false;
        this.sidebarOpen = false;
      }
=======
  watch:{
        $route (to, from) {
            if(to.params.threadId !== from.params.threadId) {
                // this.ifIntOpen = false;
                this.right = '0px';
                this.contactOpen = false;
                this.sidebarOpen = false;
                
                let toThreadId = to.params.threadId;
                let fromThreadId = from.params.threadId;
                let managerID = this.$store.state.userInfo.accountID;

                const socket = firebase_app.database().ref(`/Account-${managerID}/Thread-${fromThreadId}`);
                socket.child(`/viewing user/${this.$store.state.userInfo.id}`).remove();

                const socket2 = firebase_app.database().ref(`/Account-${managerID}/Thread-${toThreadId}`);
                socket2.child(`/viewing user/${this.$store.state.userInfo.id}`).set(this.$store.state.userInfo);
            }
        }
>>>>>>> 0911077c283a32dde3f8f15c00efbad187bcea69
    },
  },
  created() {
<<<<<<< HEAD
    bus.$on("compact", (data, contactData) => {
=======
    console.log("----- CREATED -----");
    bus.$on("compact", (data) => {
>>>>>>> 0911077c283a32dde3f8f15c00efbad187bcea69
      this.display = "flex";
      this.right = "0px";
      if (data == null) {
        this.loading = true;
        console.log(this.loading);
      } else {
        console.log(contactData);
        this.thread = data;
        this.contactData = contactData;
        this.loading = false;
        console.log(this.loading);
      }
    });
    bus.$on("broad", () => {
      this.display = "none";
    });
    bus.$on("removeMail", (id) => {
      console.log(id);
      this.thread.data.items = this.thread.data.items.filter(
        (item) => item.data.id !== id
      );
    });
    bus.$on("changeThreadAttrs", (data) => {
      if (data.type == "assignment") {
        if (data.teammate == null) {
          if (this.thread.data.currentAssignment == null) {
            let obj = {
              assigned: null,
              me: false,
              assigner: this.$store.state.userInfo,
              time: data.log.data.at,
            };
            this.thread.data.currentAssignment = obj;
          } else {
            this.thread.data.currentAssignment.assigned = null;
            this.thread.data.currentAssignment.me = false;
            this.thread.data.currentAssignment.assigner =
              this.$store.state.userInfo;
            this.thread.data.currentAssignment.time = data.log.data.at;
          }
        } else if (data.teammate[0].id == this.$store.state.userInfo.id) {
          if (this.thread.data.currentAssignment == null) {
            let obj = {
              assigned: data.teammate[0],
              me: true,
              assigner: this.$store.state.userInfo,
              time: data.log.data.at,
            };
            this.thread.data.currentAssignment = obj;
          } else {
            this.thread.data.currentAssignment.assigned = data.teammate[0];
            this.thread.data.currentAssignment.me = true;
            this.thread.data.currentAssignment.assigner =
              this.$store.state.userInfo;
            this.thread.data.currentAssignment.time = data.log.data.at;
          }
        } else {
          if (this.thread.data.currentAssignment == null) {
            let obj = {
              assigned: data.teammate[0],
              me: false,
              assigner: this.$store.state.userInfo,
              time: data.log.data.at,
            };
            this.thread.data.currentAssignment = obj;
          } else {
            this.thread.data.currentAssignment.assigned = data.teammate[0];
            this.thread.data.currentAssignment.me = false;
            this.thread.data.currentAssignment.assigner =
              this.$store.state.userInfo;
            this.thread.data.currentAssignment.time = data.log.data.at;
          }
        }
        console.log(this.thread.data.currentAssignment);
        this.thread.data.items.push(data.log);
      } else if (data.type == "tag") {
        if (data.toRemove.length > 0) {
          for (let i = 0; i < data.toRemove.length; i++) {
            this.thread.data.tags = this.thread.data.tags.filter(
              (tag) => tag.id !== data.toRemove[i]
            );
          }
        }
        if (data.toAdd.length > 0) {
          for (let i = 0; i < data.toAdd.length; i++) {
            if (!this.thread.data.tags.some((el) => el.id === data.toAdd[i].id))
              this.thread.data.tags.push(data.toAdd[i]);
          }
        }
        if (data.logs.length > 0) {
          for (let i = 0; i < data.logs.length; i++) {
            this.thread.data.items.push(data.logs[i]);
          }
        }
      } else if (data.type == "moveConv") {
        this.thread.data.items = this.thread.data.items.filter(
          (item) => item.data.id !== data.id
        );
      } else if (data.type == "email") {
        let mail = {};
        mail["data"] = data.email;
        mail["type"] = "email";
        mail["timestamp"] = data.email.date;
        this.thread.data.items.push(mail);
        console.log(this.thread.data.items);
      } else if (data.type == "chat") {
        let chat = {};
        chat["data"] = data.message;
        chat["type"] = "chat";
        chat["timestamp"] = data.message.unixTime;
        this.thread.data.items.push(chat);
        console.log(this.thread.data.items);
      } else if (data.type == "comment") {
        let comment = {};
        comment["data"] = data.comment;
        comment["type"] = "comment";
        comment["timestamp"] = data.comment.at;
        this.thread.data.items.push(comment);
        console.log(this.thread.data.items);
      } else if (data.type == "item") {
        let mail = {};
        mail["data"] = data.item;
        mail["type"] = data.item.type;
        mail["timestamp"] = data.item.date;
        this.thread.data.items.push(mail);
        console.log(this.thread.data.items);
      }
    });
  },
  mounted() {
    let threadID = this.$route.params.threadId;
    let managerID = this.$store.state.userInfo.accountID;
<<<<<<< HEAD
    const socket = firebase_app
      .database()
      .ref(`/Account-${managerID}/Thread-${threadID}`);
    // viewing user
    socket
      .child(`/viewing user/${this.$store.state.userInfo.id}`)
      .set(this.$store.state.userInfo);
=======
    const socket = firebase_app.database().ref(`/Account-${managerID}/Thread-${threadID}`);
    socket.child(`/viewing user/${this.$store.state.userInfo.id}`).set(this.$store.state.userInfo);
>>>>>>> 0911077c283a32dde3f8f15c00efbad187bcea69
  },
  beforeUnmount() {
    let managerID = this.$store.state.userInfo.accountID;
    let threadID = this.$route.params.threadId;
    const socket = firebase_app
      .database()
      .ref(`/Account-${managerID}/Thread-${threadID}`);
    socket.child(`/viewing user/${this.$store.state.userInfo.id}`).remove();
  },
  methods: {
    openInt() {
      console.log("hello");
      if (this.right == "0px") {
        this.right = "250px";
      } else {
        this.right = "0px";
      }
    },
    IntegrationSidebar: function (integrationData) {
      let integrationID = integrationData.id;
      let intName = integrationData.lname;
      if (
        this.integration_id == integrationID &&
        this.integration_name == intName
      ) {
        if (this.right == "0px") {
          this.right = "300px";
          if (integrationID == 0) {
            this.sidebarOpen = false;
            this.contactOpen = true;
          } else {
            this.sidebarOpen = true;
            this.contactOpen = false;
          }
        } else {
          this.right = "0px";
          this.sidebarOpen = false;
          this.contactOpen = false;
        }
      } else {
        this.right = "300px";
        if (integrationID == 0) {
          this.sidebarOpen = false;
          this.contactOpen = true;
        } else {
          this.sidebarOpen = true;
          this.contactOpen = false;
        }
      }
      this.integration_id = integrationID;
      this.integration_name = intName;
    },
  },
};
</script>

<style>
body
  > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-right.datepicker-orient-bottom {
  width: 200px !important;
  left: 1219px;
}

/* Mail Content */
.hwRenderWrapper23153177 html,
.hwRenderWrapper23153177 body {
  min-width: 260px;
  min-height: 100%;
  padding: 0;
  margin: 0 auto;
}
.hwRenderWrapper23153177 a img {
  border: none;
}
.hwRenderWrapper23153177 .ReadMsgBody {
  width: 100%;
}
.hwRenderWrapper23153177 .ExternalClass {
  width: 100%;
}
.hwRenderWrapper23153177 .ExternalClass * {
  line-height: 100%;
}
.hwRenderWrapper23153177 table,
.hwRenderWrapper23153177 td {
  border-collapse: collapse;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
}
.hwRenderWrapper23153177 .button {
  word-wrap: break-word;
}
@media screen and (max-width: 480px) {
  .hwRenderWrapper23153177 {
    @-ms-viewport {
      width: 320px;
    }
  }
  .hwRenderWrapper23153177 {
    @viewport {
      width: 320px;
    }
  }
}
.hwRenderWrapper23153177 ul {
  padding: 0 !important;
  margin: 0 0 0 40px !important;
}
.hwRenderWrapper23153177 li {
  margin-bottom: 10px !important;
}
.hwRenderWrapper23153177 sub,
.hwRenderWrapper23153177 sup {
  font-size: 70%;
  line-height: 0;
  position: relative;
}
.hwRenderWrapper23153177 sup {
  mso-text-raise: 60%;
  vertical-align: super;
}
.hwRenderWrapper23153177 sub {
  bottom: -0.25em;
}
.hwRenderWrapper23153177 a {
  color: #20a5f8;
}
@media screen and (max-width: 480px) {
  .hwRenderWrapper23153177 .tolkien-column-5f3e6c {
    width: 100% !important;
    max-width: 100% !important;
    min-width: auto !important;
  }
  .hwRenderWrapper23153177 .tolkien-column img.full {
    width: 100% !important;
    max-width: 100% !important;
  }
  .hwRenderWrapper23153177 .tolkien-column img[shrinktofit="true"] {
    width: auto !important;
    max-width: 100% !important;
  }
}
.hwRenderWrapper23153177 .hide-in-desktop {
  display: none;
  max-height: 0px;
}

@media (max-width: 520px) {
  .hwRenderWrapper23153177 .hide-in-mobile {
    min-height: 0px;
    max-height: 0px;
    max-width: 0px;
    display: none;
    overflow: hidden;
    font-size: 0px;
  }
  .hwRenderWrapper23153177 .hide-in-desktop {
    display: block !important;
    max-height: none !important;
  }
}

.hwRenderWrapper23153177 [style*="Montserrat"] {
  font-family: "Montserrat", Verdana, Geneva, Helvetica, Arial, sans-serif !important;
}
@media only screen and (max-width: 600px) {
  .hwRenderWrapper23153177 span .idFooterLink-dbd4ef,
  .hwRenderWrapper23153177 span.idFooterLink a {
    display: block !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
  .hwRenderWrapper23153177 span .idFooterBullet-7ca50b {
    display: none !important;
  }
  .hwRenderWrapper23153177 img.idFooterLogo {
    width: 200px !important;
    height: auto !important;
  }
  .hwRenderWrapper23153177 img .idFooterSocial-dfef28 {
    height: 30px !important;
    width: auto !important;
  }
}

.hwRenderWrapper23153177 html,
.hwRenderWrapper23153177 body {
  min-width: 260px;
  min-height: 100%;
  padding: 0;
  margin: 0 auto;
}
.hwRenderWrapper23153177 a img {
  border: none;
}
.hwRenderWrapper23153177 .ReadMsgBody {
  width: 100%;
}
.hwRenderWrapper23153177 .ExternalClass {
  width: 100%;
}
.hwRenderWrapper23153177 .ExternalClass * {
  line-height: 100%;
}
.hwRenderWrapper23153177 table,
.hwRenderWrapper23153177 td {
  border-collapse: collapse;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
}
.hwRenderWrapper23153177 .button {
  word-wrap: break-word;
}
@media screen and (max-width: 480px) {
  .hwRenderWrapper23153177 {
    @-ms-viewport {
      width: 320px;
    }
  }
  .hwRenderWrapper23153177 {
    @viewport {
      width: 320px;
    }
  }
}
.hwRenderWrapper23153177 ul {
  padding: 0 !important;
  margin: 0 0 0 40px !important;
}
.hwRenderWrapper23153177 li {
  margin-bottom: 10px !important;
}
.hwRenderWrapper23153177 sub,
.hwRenderWrapper23153177 sup {
  font-size: 70%;
  line-height: 0;
  position: relative;
}
.hwRenderWrapper23153177 sup {
  mso-text-raise: 60%;
  vertical-align: super;
}
.hwRenderWrapper23153177 sub {
  bottom: -0.25em;
}
.hwRenderWrapper23153177 a {
  color: #20a5f8;
}
@media screen and (max-width: 480px) {
  .hwRenderWrapper23153177 .tolkien-column-024981 {
    width: 100% !important;
    max-width: 100% !important;
    min-width: auto !important;
  }
  .hwRenderWrapper23153177 .tolkien-column img.full {
    width: 100% !important;
    max-width: 100% !important;
  }
  .hwRenderWrapper23153177 .tolkien-column img[shrinktofit="true"] {
    width: auto !important;
    max-width: 100% !important;
  }
}
.hwRenderWrapper23153177 .hide-in-desktop {
  display: none;
  max-height: 0px;
}

@media (max-width: 520px) {
  .hwRenderWrapper23153177 .hide-in-mobile {
    min-height: 0px;
    max-height: 0px;
    max-width: 0px;
    display: none;
    overflow: hidden;
    font-size: 0px;
  }
  .hwRenderWrapper23153177 .hide-in-desktop {
    display: block !important;
    max-height: none !important;
  }
}

.hwRenderWrapper23153177 [style*="Montserrat"] {
  font-family: "Montserrat", Verdana, Geneva, Helvetica, Arial, sans-serif !important;
}
@media only screen and (max-width: 600px) {
  .hwRenderWrapper23153177 span .idFooterLink-1a8263,
  .hwRenderWrapper23153177 span.idFooterLink a {
    display: block !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
  .hwRenderWrapper23153177 span .idFooterBullet-b210f7 {
    display: none !important;
  }
  .hwRenderWrapper23153177 img.idFooterLogo {
    width: 200px !important;
    height: auto !important;
  }
  .hwRenderWrapper23153177 img .idFooterSocial-398498 {
    height: 30px !important;
    width: auto !important;
  }
}
</style>