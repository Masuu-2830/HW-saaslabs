<template>
  <div class="main">
    <div
      v-if="!dataLoaded && !loaded"
      id="thread-spinner"
      class="spinner-border text-primary"
      role="status"
      style="position: absolute; top: 50%; left: 50%"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <NavBar :mailboxes="mailboxes" />
    <div v-if="dataLoaded && loaded" class="mail-wrapper">
      <SideBarHW :mailbox="mailbox" />
      <MailGroup :mailbox="mailbox" />
      <MailContent />
      <compose-wrapper></compose-wrapper>
      <!-- <tweet-compose></tweet-compose> -->
    </div>
    <firebase-modal></firebase-modal>
    <discard-draft></discard-draft>
    <HcArticles />
    <SavedReply />
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import MailGroup from "./MailGroup/MailGroup.vue";
import SideBarHW from "./SidebarHW.vue";
import MailContent from "./MailContent/MailContent.vue";
import Compose from "./Compose.vue";
import FirebaseModal from "./modals/FirebaseModal.vue";
import HcArticles from "./modals/HcArticles.vue";
import SavedReply from "./modals/SavedReply.vue";
import ComposeWrapper from "./ComposeWrapper.vue";
import { bus } from "../main";
import TweetCompose from "./TweetCompose.vue";
import { initFirebase } from "../firebaseInit.js";
import DiscardDraft from "./modals/DiscardDraft.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    SideBarHW,
    MailGroup,
    MailContent,
    Compose,
    HcArticles,
    SavedReply,
    ComposeWrapper,
    TweetCompose,
    FirebaseModal,
    DiscardDraft,
  },
  data() {
    return {
      mailbox: {},
      mailboxes: [],
      dataLoaded: false,
      loaded: false,
    };
  },
  created() {
    bus.$on("fetchSideBarStats", () => {
      this.fetchSidebarStats();
    });
  },
  watch: {
    $route(to, from) {
      if (
        to.params.mailboxId &&
        to.params.mailboxId !== from.params.mailboxId
      ) {
        // this.fetchMailBoxData();
        // this.fetchSidebarStats();
        // this.fetchAliases();
      }
    },
  },
  methods: {
    async fetchSidebarStats() {
      // var url =
      //   this.$apiBaseURL +
      //     "mailboxes.php?mailboxID=" +
      //     this.$route.params.mailboxId ||
      //   (this.$store.inboxData && this.$store.inboxData.id) ||
      //   "me";
      // if (
      //   this.$route.params.mailboxId == "me" ||
      //   (this.$store.inboxData && this.$store.inboxData.id == "me") ||
      //   (!this.$store.inboxData && !this.$route.params.mailboxId)
      // ) {
      //   }
      let url = this.$apiBaseURL + "unifiedv2/stats.php";
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      // if (
      //   this.$route.params.mailboxId == "me" ||
      //   (this.$store.inboxData && this.$store.inboxData.id == "me") ||
      //   (!this.$store.inboxData && !this.$route.params.mailboxId)
      // ) {
        this.mailbox = data.data;
      // } else {
      // this.mailbox = data.data.mailbox;
      // }
      this.dataLoaded = true;
    },
    async fetchMailBoxes() {
      const response = await fetch(this.$apiBaseURL + "mailboxes.php", {
        credentials: "include",
      });
      const data = await response.json();
      this.mailboxes = data.data.mailboxes;
    },
    async fetchContacts() {
      const response = await fetch(this.$apiBaseURL + "contacts.php", {
        credentials: "include",
      });
      const data = await response.json();
      // this.mailboxes = data.data.mailboxes;
    },
    async fetchMailBoxData() {
      // let inboxID = this.$route.params.mailboxId;
      // if(inboxID == "tags"){
      //   inboxID = "me";
      // }
      // let url =
      //   "https://app.helpwise.io/api/ping.php?mailboxID=" + inboxID || (this.$store.inboxData && this.$store.inboxData.id) || "me";
      const response = await fetch("https://app.helpwise.io/api/pingv2.php", {
        credentials: "include",
      });
      const data = await response.json();
      data.data.tags = data.data.tags.sort((b, a) => b.name - a.name);
      await this.$store.dispatch("fetchPingDetails", data);
    },
    async fetchAliases() {
      var url;
      console.log(this.$store.state.mailboxId, "Store mailboxid");
      if (
        this.$route.params.mailboxId == "me" ||
        this.$store.state.mailboxId == "me"
      ) {
        url = "https://app.helpwise.io/api/unified/getFromAddresses.php";
      } else {
        url =
          "https://app.helpwise.io/api/getFromAddresses.php?mailboxId=" +
            this.$store.state.mailboxId ||
          this.$route.params.mailboxId ||
          "me";
      }
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      await this.$store.dispatch("fetchAliases", data.data);
    },
    // fetchUserSignature() {
    //   fetch(this.$apiBaseURL + "signatures/list.php?mailboxId=" + this.$route.params.mailboxId, {credentials: "include"})
    //   .then(async response => {
    //       const data = await response.json();
    //       if (data.status !== "success") {
    //         const error = (data && data.message) || response.status;
    //         return Promise.reject(error);
    //       }
    //       let signature = data.data.signature;
    //       await this.$store.dispatch("fetchUserSignature", signature);
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
    // },
    fetchUserSignature() {
      fetch(
        this.$apiBaseURL +
          "signatures/list.php?mailboxId=" +
          this.$route.params.mailboxId,
        { credentials: "include" }
      )
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          await this.$store.dispatch("fetchUserSignatures", data.data);
          let signatureId = data.data[0] && data.data[0].id;
          if (signatureId) {
            fetch(this.$apiBaseURL + "signatures/get.php?id=" + signatureId, {
              credentials: "include",
            })
              .then(async (response) => {
                const data = await response.json();
                if (data.status !== "success") {
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
                }
                let signature = data.data.signature;
                await this.$store.dispatch("fetchUserSignature", signature);
              })
              .catch((error) => {
                alert(error);
              });
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    async fetchContacts() {
      const response = await fetch(this.$apiBaseURL + "contacts.php", {
        credentials: "include",
      });
      const data = await response.json();
      // this.mailboxes = data.data.mailboxes;
    },
  },
  async beforeMount() {
    await this.fetchSidebarStats();
    const response = await fetch("https://app.helpwise.io/api/pingv2.php", {
      credentials: "include",
    });
    const data = await response.json();
    data.data.tags = data.data.tags.sort((b, a) => b.name - a.name);
    await this.$store.dispatch("fetchPingDetails", data);
    this.loaded = true;
    initFirebase();
    const response2 = await fetch(
      "https://app.helpwise.io/api/getAccountMailboxes.php",
      { credentials: "include" }
    );
    const data2 = await response2.json();
    // data.data.tags = data.data.tags.sort((b,a) => b.name-a.name);
    await this.$store.dispatch("fetchMailBoxes", data2);
    this.fetchMailBoxes();
    // this.fetchAliases();
    this.fetchUserSignature();
    // this.fetchContacts();
    if (
      this.$route.params.mailboxId == "me" ||
      (this.$store.inboxData && this.$store.inboxData.id == "me") ||
      (!this.$store.inboxData && !this.$route.params.mailboxId)
    ) {
      document.title = "Helpwise (" + this.mailbox.mine + ")";
    } else {
      document.title = "Helpwise (" + this.mailbox.stats.mine + ")";
    }
  },
  async beforeCreate() {
    // let url =
    //   "https://app.helpwise.io/api/ping.php?mailboxID=" +
    //     this.$route.params.mailboxId ||
    //   (this.$store.inboxData && this.$store.inboxData.id) ||
    //   "me";
    // const response = await fetch("https://app.helpwise.io/api/pingv2.php", {
    //   credentials: "include",
    // });
    // const data = await response.json();
    // data.data.tags = data.data.tags.sort((b, a) => b.name - a.name);
    // await this.$store.dispatch("fetchPingDetails", data);
    // this.loaded = true;
    // initFirebase();
    // const response2 = await fetch(
    //   "https://app.helpwise.io/api/getAccountMailboxes.php",
    //   { credentials: "include" }
    // );
    // const data2 = await response2.json();
    // // data.data.tags = data.data.tags.sort((b,a) => b.name-a.name);
    // await this.$store.dispatch("fetchMailBoxes", data2);
  },
};
</script>

<style>
</style>