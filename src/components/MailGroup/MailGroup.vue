<template>
  <div
    v-if="this.$store.state.stateLoaded"
    class="mail-group"
    :class="isCompact && 'mail-group-body-compact'"
  >
    <div
      v-if="loading"
      id="email-spinner"
      class="spinner-border text-primary"
      role="status"
      style="position: absolute; top: 50%; left: 50%"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <mails-header-search-box v-on:squery="ssquery"></mails-header-search-box>
    <mails-type-filter></mails-type-filter>
    <mails-header-select-all
      :selectedIds="selectedIds"
      :tagsInAll="tagsInAll"
      :tagsPartial="tagsPartial"
      :mailbox="mailbox"
      :startThread="startThread"
      :endThread="endThread"
      :currPage="currPage.toString()"
      :isnextPage="isnextPage"
      :mailsnum="mails.length"
      v-on:bulkRead="bulkRead"
      v-on:bulkStar="bulkStar"
      v-on:bulkMerge="bulkMerge"
      v-on:perDeleteThreads="perDeleteThreads"
      v-on:prevPage="prevPage"
      v-on:nextPage="nextPage"
      v-on:filterPerson="filterPerson"
      v-on:filterOrder="filterOrder"
    ></mails-header-select-all>
    <div
      v-if="!loading"
      class="mail-group-body bd-y"
      style="
        overflow-y: auto;
        overflow-x: hidden;
        background-color: white;
        position: relative;
        top: 0px;
        height: calc(100% - 135px);
      "
    >
      <div v-if="this.$store.state.threads.length !== 0" id="threads-list">
        <div
          v-for="mail in this.$store.state.threads"
          :key="mail.id"
          @click="
            clickThread(
              mail.id,
              mail.type,
              mail.subtype,
              mail.ticketNumber,
              mail.mailboxId
            )
          "
        >
          <mail-group-single-mail
            :id="'thread-' + mail.id"
            :class="{ active: activeId === mail.id }"
            :compact="isCompact"
            :mailbox="mailbox"
            :data-thread="mail"
            :mail="mail"
            v-on:perDeleteThreads="perDeleteThreads"
          ></mail-group-single-mail>
        </div>
      </div>
      <div
        v-if="isThreadRefresh"
        id="view-all-threads"
        class="d-flex justify-content-center align-items-center"
      >
        <button @click.stop.prevent="broad" class="btn btn-link">
          View All Conversations
        </button>
      </div>
      <div
        v-if="perPageMails.length == 0 && !loading"
        class="flex-row justify-content-center w-100"
        id="no-mails-container"
        style="position: absolute; top: 30%"
      >
        <div class="d-flex flex-column align-items-center">
          <div id="no-mails-img">
            <img src="	https://app.helpwise.io/assets/images/empty-box.png" />
          </div>
          <div id="no-mails-msg" style="font-weight: 500" class="tx-18">
            Hurray! You have no more emails.
          </div>
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
import { bus, triggerPromptNotif } from "../../main";
import router from "../../router";
import MailGroupSingleMail from "./MailGroupSingleMail.vue";
import MailsHeaderSearchBox from "./MailsHeaderSearchBox.vue";
import MailsHeaderSelectAll from "./MailsHeaderSelectAll.vue";
import MailsTypeFilter from "./MailsTypeFilter.vue";
export default {
  components: {
    MailsHeaderSearchBox,
    MailsHeaderSelectAll,
    MailGroupSingleMail,
    MailsTypeFilter,
  },
  name: "MailGroup",
  props: {
    mailbox: Object,
  },
  data() {
    return {
      isCompact: false,
      mails: [],
      perPageMails: [],
      currPage: 1,
      isThreadRefresh: false,
      isnextPage: false,
      noOfPages: 1,
      startThread: 1,
      filterSection:
        this.$route.params.filterSection || this.$store.state.filterSection,
      endThread: 1,
      activeId: "",
      route: "",
      labelId: 14,
      tagId: 0,
      personId: 0,
      order: "",
      loading: false,
      squery: "",
      resultsPerPage: 20,
      selectedIds: [],
      tagsInAll: [],
      tagsPartial: [],
    };
  },
  created() {
    bus.$off("check");
    bus.$on("check", (id, check) => {
      if (id == 1) {
        if (check == true) {
          this.selectedIds = [];
          this.tagsInAll = [];
          this.tagsPartial = [];
          var tags = [];
          for (let i = 0; i < this.perPageMails.length; i++) {
            this.selectedIds.push(this.perPageMails[i].id);
          }
          for (let i = 0; i < this.selectedIds.length; i++) {
            let objIndex = this.perPageMails.findIndex(
              (obj) => obj.id == this.selectedIds[i]
            );
            if (this.perPageMails[objIndex].tags.length > 0) {
              for (
                let j = 0;
                j < this.perPageMails[objIndex].tags.length;
                j++
              ) {
                if (
                  !tags.some(
                    (id) => id === this.perPageMails[objIndex].tags[j].id
                  )
                ) {
                  tags.push(this.perPageMails[objIndex].tags[j].id);
                }
              }
            }
          }
          for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < this.selectedIds.length; j++) {
              let objIndex = this.perPageMails.findIndex(
                (obj) => obj.id == this.selectedIds[j]
              );
              if (
                !this.perPageMails[objIndex].tags.some(
                  (tag) => tag.id === tags[i]
                )
              ) {
                this.tagsPartial.push(tags[i]);
                break;
              }
              if (j == this.selectedIds.length - 1) {
                this.tagsInAll.push(tags[i]);
              }
            }
          }
        } else {
          this.selectedIds = [];
          this.tagsInAll = [];
          this.tagsPartial = [];
        }
      } else {
        if (check == true) {
          this.selectedIds.push(id);
          let objIndex = this.perPageMails.findIndex((obj) => obj.id === id);
          for (let i = 0; i < this.perPageMails[objIndex].tags.length; i++) {
            if (this.selectedIds.length == 1) {
              this.tagsInAll.push(this.perPageMails[objIndex].tags[i].id);
            } else if (
              !this.tagsInAll.some(
                (tag) => tag === this.perPageMails[objIndex].tags[i].id
              ) &&
              !this.tagsPartial.some(
                (tag) => tag === this.perPageMails[objIndex].tags[i].id
              )
            ) {
              this.tagsPartial.push(this.perPageMails[objIndex].tags[i].id);
            }
          }
        } else {
          this.selectedIds = this.selectedIds.filter((i) => i !== id);
          let objIndex = this.perPageMails.findIndex((obj) => obj.id === id);
          if (this.perPageMails[objIndex].tags.length > 0) {
            for (let i = 0; i < this.perPageMails[objIndex].tags.length; i++) {
              if (
                !this.tagsInAll.some(
                  (tag) => tag === this.perPageMails[objIndex].tags[i].id
                ) &&
                this.tagsPartial.some(
                  (tag) => tag === this.perPageMails[objIndex].tags[i].id
                )
              ) {
                for (let j = 0; j < this.selectedIds.length; j++) {
                  let objIndex1 = this.perPageMails.findIndex(
                    (obj) => obj.id == this.selectedIds[j]
                  );
                  if (
                    this.perPageMails[objIndex1].tags.some(
                      (tag) => tag.id === this.perPageMails[objIndex].tags[i].id
                    )
                  ) {
                    // this.tagsPartial.push(tags[i]);
                    break;
                  }
                  if (j == this.selectedIds.length - 1) {
                    this.tagsPartial = this.tagsPartial.filter(
                      (tag) => tag !== this.perPageMails[objIndex].tags[i].id
                    );
                  }
                }
              }
            }
          }
        }
      }
    }),
      bus.$off("broad");
    bus.$on("broad", (event) => {
      this.$store.dispatch("updateOpenThread", null);
      this.isCompact = false;
      this.activeId = "";
      if (this.isThreadRefresh) {
        router.push({
          name: "type",
          params: {
            pageNo: this.currPage,
            type: this.route ? this.route : this.$store.state.type,
            mailboxId:
              this.$route.params.mailboxId ||
              (this.$store.state.inboxData && this.$store.state.inboxData.id) ||
              "me",
          },
        });
        this.isThreadRefresh = false;
        this.fetchThreads();
        console.log("braos if129812");
      } else {
        console.log("event dhikhado if129812", event);
        if (event == "back") {
          console.log({
            name: "type",
            params: {
              pageNo: this.currPage,
              type: this.route,
              mailboxId:
                this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me",
              event: "back",
              filterSection: this.filterSection,
            },
          });
          router.push({
            name: "type",
            params: {
              pageNo: this.currPage,
              type: this.route,
              filterSection: this.$store.state.filterSection,
              mailboxId:
                this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me",
              event: "back",
            },
          });
        } else {
          router.push({
            name: "type",
            params: {
              pageNo: this.currPage,
              filterSection: this.filterSection,
              type: this.route,
              mailboxId:
                this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me",
            },
          });
        }
        console.log("braos else");
      }
    });
    bus.$off("changeRead");
    bus.$on("changeRead", (id, read) => {
      let mailboxThreadMap = {};
      let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
      mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
      mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
        }),
        credentials: "include",
      };
      let url;
      if (this.perPageMails[objIndex].isRead && read !== 1) {
        url = this.$apiBaseURL + "unifiedv2/unreadThreads.php";
      } else {
        url = this.$apiBaseURL + "unifiedv2/readThreads.php";
      }
      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (read == 1) {
            this.perPageMails[objIndex].isRead = true;
          } else {
            this.perPageMails[objIndex].isRead =
              !this.perPageMails[objIndex].isRead;
          }
          if (!this.perPageMails[objIndex].isRead && read !== 1) {
            triggerPromptNotif("Conversation marked unread", "success", 1000);
          }
          if (this.perPageMails[objIndex].isRead && !this.isCompact) {
            triggerPromptNotif("Conversation marked read", "success", 1000);
          }
        })
        .catch((error) => {
          alert(error);
        });
    });

    bus.$off("changeStarred");
    bus.$on("changeStarred", (id) => {
      let mailboxThreadMap = {};
      let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
      mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
      mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
        }),
        credentials: "include",
      };
      let url = "";
      if (this.perPageMails[objIndex].isStarred) {
        url = this.$apiBaseURL + "unifiedv2/unstarThreads.php";
      } else {
        url = this.$apiBaseURL + "unifiedv2/starThreads.php";
      }
      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (this.perPageMails[objIndex].isStarred) {
            triggerPromptNotif("Conversation unstarred", "success", 1000);
          } else {
            triggerPromptNotif("Conversation starred", "success", 1000);
          }
          this.perPageMails[objIndex].isStarred =
            !this.perPageMails[objIndex].isStarred;
          // bus.$emit("chStarInArr", id);
        })
        .catch((error) => {
          alert(error);
        });
    });

    bus.$off("closeThread");
    bus.$on("closeThread", (id) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/archiveThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (typeof id == "number") {
            triggerPromptNotif("Conversation closed", "success", 1000);
          } else if (typeof id == "object") {
            triggerPromptNotif("Conversations closed", "success", 1000);
          }
          for (let i = 0; i < threadIDs.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIDs[i]
            );
          }
          bus.$emit("fetchSideBarStats");
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&offset=" +
                offset +
                "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            // this.$store.state.threads = this.perPageMails;
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
      this.selectedIds = [];
    });

    bus.$off("restoreThreads");
    bus.$on("restoreThreads", (id) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      let unspam = false;
      if (this.labelId == 8) {
        unspam = true;
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
          unspam,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/restoreThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          bus.$emit("fetchSideBarStats");
          if (typeof id == "number") {
            triggerPromptNotif("Conversation moved to inbox", "success", 1000);
          } else if (typeof id == "object") {
            triggerPromptNotif("Conversations moved to inbox", "success", 1000);
          }
          for (let i = 0; i < threadIDs.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIDs[i]
            );
          }
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&offset=" +
                offset +
                "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
      this.selectedIds = [];
    });

    bus.$off("spamThreads");
    bus.$on("spamThreads", (id) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/spamThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (typeof id == "number") {
            triggerPromptNotif("Conversation marked spam", "success", 1000);
          } else if (typeof id == "object") {
            triggerPromptNotif("Conversations marked spam", "success", 1000);
          }
          for (let i = 0; i < threadIDs.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIDs[i]
            );
          }
          bus.$emit("fetchSideBarStats");
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&offset=" +
                offset +
                "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
      this.selectedIds = [];
    });

    bus.$off("moveToInbox");
    bus.$on("moveToInbox", (id, mailboxId) => {
      let threadIds = new Array();
      if (typeof id == "number") {
        threadIds[0] = id;
      } else if (typeof id == "object") {
        threadIds = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
          targetMailboxId: mailboxId,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/moveThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (typeof id == "number") {
            triggerPromptNotif("Conversation moved", "success", 1000);
          } else if (typeof id == "object") {
            triggerPromptNotif("Conversations moved", "success", 1000);
          }
          for (let i = 0; i < threadIds.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIds[i]
            );
          }
          bus.$emit("fetchSideBarStats");
          const limit = threadIds.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIds.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&offset=" +
                offset +
                "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
      this.selectedIds = [];
    });

    bus.$off("doneThreads");
    bus.$on("doneThreads", (id) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxID: this.$route.params.mailboxId,
          threadIDs,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "doneThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.message !== "Done") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          // if (typeof id == "number") {
          //   triggerPromptNotif("Conversation closed", "success", 1000);
          // } else if (typeof id == "object") {
          //   triggerPromptNotif("Conversations closed", "success", 1000);
          // }
          for (let i = 0; i < threadIDs.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIDs[i]
            );
          }
          bus.$emit("fetchSideBarStats");
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&offset=" +
                offset +
                "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
      this.selectedIds = [];
    });

    bus.$off("snoozeThread");
    bus.$on("snoozeThread", (id, till) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
          snoozeTill: till,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/snoozeThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (typeof id == "number") {
            triggerPromptNotif("Conversation snoozed", "success", 1000);
          } else if (typeof id == "object") {
            triggerPromptNotif("Conversations snoozed", "success", 1000);
          }
          for (let i = 0; i < threadIDs.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIDs[i]
            );
          }
          bus.$emit("fetchSideBarStats");
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&offset=" +
                offset +
                "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
      this.selectedIds = [];
    });

    bus.$off("assignThread");
    bus.$on("assignThread", (id, userId) => {
      let threadIds = new Array();
      if (typeof id == "number") {
        threadIds[0] = id;
      } else if (typeof id == "object") {
        threadIds = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      let body;
      if (userId == "") {
        body = JSON.stringify({
          mailboxThreadMap,
        });
      } else {
        body = JSON.stringify({
          mailboxThreadMap,
          assignedUser: userId,
        });
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/assignThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          for (let i = 0; i < threadIds.length; i++) {
            var objIndex = this.perPageMails.findIndex(
              (obj) => obj.id == threadIds[i]
            );
            let teammate;
            let body;
            if (userId == "") {
              this.perPageMails[objIndex].assignedTo = null;
              body = `${this.$store.state.userInfo.firstname} ${this.$store.state.userInfo.lastname} unassigned the conversation`;
            } else {
              teammate = this.$store.state.teammates.filter(
                (obj) => obj.id == userId
              );
              this.perPageMails[objIndex].assignedTo = teammate[0];
              body = `${this.$store.state.userInfo.firstname} ${this.$store.state.userInfo.lastname} assigned the conversation to ${teammate[0].name}`;
              if (this.$store.state.userInfo.id == teammate[0].id) {
                body = `${this.$store.state.userInfo.firstname} ${this.$store.state.userInfo.lastname} assigned the conversation to themselves`;
              }
            }
            let data1 = {
              data: {
                body: body,
                at: new Date().toISOString(),
                type: "assignment",
              },
              timestamp: Date.now(),
              type: "log",
            };
            let payload = {
              log: data1,
              teammate,
              type: "assignment",
            };
            if (this.isCompact) {
              bus.$emit("changeThreadAttrs", payload);
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    });

    bus.$off("moveConv");
    bus.$on("moveConv", (messageId, subject, threadId) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxId: this.$route.params.mailboxId,
          messageId,
          subject,
          threadId,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "moveToNewConversation.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          triggerPromptNotif(
            "Message moved to new conversation",
            "success",
            1000
          );
          let payload = {
            id: messageId,
            type: "moveConv",
          };
          if (this.isCompact) {
            bus.$emit("changeThreadAttrs", payload);
          }
        })
        .catch((error) => {
          alert(error);
        });
    });

    bus.$off("deleteThreads");
    bus.$on("deleteThreads", (id) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/trashThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status == "error") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (typeof id == "number") {
            triggerPromptNotif("Conversation deleted", "success", 1000);
          } else if (typeof id == "object") {
            triggerPromptNotif("Conversations deleted", "success", 1000);
          }
          for (let i = 0; i < threadIDs.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIDs[i]
            );
          }
          bus.$emit("fetchSideBarStats");
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
                "unifiedv2/getThreads.php?mailboxIDs[]=" +
                this.$route.params.mailboxId ||
              (this.$store.inboxData && this.$store.inboxData.id) ||
              "me" +
                "&labelID=" +
                this.labelId +
                "&limit=" +
                limit +
                "&offset=" +
                offset +
                "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
      this.selectedIds = [];
    });

    bus.$off("createTags");
    bus.$on("createTags", (id, tagName, tagColor, folder) => {
      let threadIds = new Array();
      if (typeof id == "number") {
        threadIds[0] = id;
      } else if (typeof id == "object") {
        threadIds = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      if (tagColor == "" || tagColor == undefined) {
        tagColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
          color: tagColor,
          folder,
          name: tagName,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/tags/createTags.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          triggerPromptNotif("New tag added", "success", 1000);
          for (let t = 0; t < threadIds.length; t++) {
            var objIndex = this.perPageMails.findIndex(
              (obj) => obj.id == threadIds[t]
            );
            let newTag = new Object();
            newTag["name"] = tagName;
            newTag["id"] = data.data;
            newTag["color"] = tagColor;
            this.perPageMails[objIndex].tags.push(newTag);
            let logs = new Array();
            let toAdd = new Array();
            let toRemove = new Array();
            let body;
            if (newTag !== undefined) {
              toAdd.push(newTag);
              body = `${this.$store.state.userInfo.firstname} ${this.$store.state.userInfo.lastname} added the tag ${newTag.name}`;
            }
            logs.push({
              data: {
                body,
                at: new Date().toISOString(),
                type: "tag",
              },
              timestamp: Date.now(),
              type: "log",
            });
            let payload = {
              logs,
              toAdd,
              toRemove,
              type: "tag",
            };
            if (this.isCompact) {
              bus.$emit("changeThreadAttrs", payload);
            }
            // for (var i = 0; i < addtags.length; i++) {
            //   let tag;
            //   if (!this.tagsInAll.some((tag) => tag == addtags[i])) {
            //     this.tagsInAll.push(addtags[i]);
            //   }
            //   if (newTag !== undefined) {
            //     this.perPageMails[objIndex].tags.push(newTag);
            //   } else {
            //     tag = this.$store.state.tags.filter(
            //       (obj) => obj.id == addtags[i]
            //     );
            //     if (
            //       !this.perPageMails[objIndex].tags.some(
            //         (tag) => tag.id == addtags[i]
            //       )
            //     ) {
            //       this.perPageMails[objIndex].tags.push(tag[0]);
            //     }
            //   }
            //   let body;
            //   if (newTag !== undefined) {
            //     toAdd.push(newTag);
            //     body = `${this.$store.state.userInfo.firstname} ${this.$store.state.userInfo.lastname} added the tag ${newTag.name}`;
            //   }
            //   logs.push({
            //     data: {
            //       body,
            //       at: new Date().toISOString(),
            //       type: "tag",
            //     },
            //     timestamp: Date.now(),
            //     type: "log",
            //   });
            // }
            // let payload = {
            //   logs,
            //   toAdd,
            //   type: "tag",
            // };
            // if (this.isCompact) {
            //   bus.$emit("changeThreadAttrs", payload);
            // }
          }
        })
        .catch((error) => {
          alert(error);
        });
    });

    bus.$off("toggleTags");
    bus.$on("toggleTags", (id, addtags, removetags, newTag) => {
      if (addtags.length || removetags.length) {
        let threadIds = new Array();
        let addTags = new Array();
        let removeTags = new Array();
        if (typeof id == "number") {
          threadIds[0] = id;
        } else if (typeof id == "object") {
          threadIds = id;
        }
        let mailboxThreadMap = {};
        if (typeof id == "number") {
          let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
        } else if (typeof id == "object") {
          var objIndex;
          for (let i in id) {
            objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
            if (
              !(
                this.perPageMails[objIndex].mailboxId in
                Object.keys(mailboxThreadMap)
              )
            ) {
              mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
                new Array();
            }
          }
          for (let i in id) {
            objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
          }
        }
        for (var i = 0; i < addtags.length; i++) {
          addTags.push(addtags[i]);
        }
        for (var i = 0; i < removetags.length; i++) {
          removeTags.push(removetags[i]);
        }
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mailboxThreadMap,
            addTags,
            removeTags,
          }),
          credentials: "include",
        };
        fetch(this.$apiBaseURL + "unifiedv2/tags/applyTags.php", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            triggerPromptNotif("Tags updated", "success", 1000);
            for (let t = 0; t < threadIds.length; t++) {
              var objIndex = this.perPageMails.findIndex(
                (obj) => obj.id == threadIds[t]
              );
              let toAdd = new Array();
              let logs = new Array();
              for (var i = 0; i < removetags.length; i++) {
                this.tagsInAll = this.tagsInAll.filter(
                  (tag) => tag !== removetags[i]
                );
                let tag = this.$store.state.tags.filter(
                  (obj) => obj.id == removetags[i]
                );
                this.perPageMails[objIndex].tags = this.perPageMails[
                  objIndex
                ].tags.filter((tag) => tag.id !== removetags[i]);
                logs.push({
                  data: {
                    body: `${this.$store.state.userInfo.firstname} ${this.$store.state.userInfo.lastname} removed the tag ${tag[0].name}`,
                    at: new Date().toISOString(),
                    type: "tag",
                  },
                  timestamp: Date.now(),
                  type: "log",
                });
              }
              for (var i = 0; i < addtags.length; i++) {
                let tag;
                if (!this.tagsInAll.some((tag) => tag == addtags[i])) {
                  this.tagsInAll.push(addtags[i]);
                }
                if (newTag !== undefined) {
                  this.perPageMails[objIndex].tags.push(newTag);
                } else {
                  tag = this.$store.state.tags.filter(
                    (obj) => obj.id == addtags[i]
                  );
                  if (
                    !this.perPageMails[objIndex].tags.some(
                      (tag) => tag.id == addtags[i]
                    )
                  ) {
                    this.perPageMails[objIndex].tags.push(tag[0]);
                  }
                }
                let body;
                if (newTag !== undefined) {
                  toAdd.push(newTag);
                  body = `${this.$store.state.userInfo.firstname} ${this.$store.state.userInfo.lastname} added the tag ${newTag.name}`;
                } else {
                  toAdd.push(tag[0]);
                  body = `${this.$store.state.userInfo.firstname} ${this.$store.state.userInfo.lastname} added the tag ${tag[0].name}`;
                }
                logs.push({
                  data: {
                    body,
                    at: new Date().toISOString(),
                    type: "tag",
                  },
                  timestamp: Date.now(),
                  type: "log",
                });
              }
              let payload = {
                logs,
                toRemove: removeTags,
                toAdd,
                type: "tag",
              };
              if (this.isCompact) {
                bus.$emit("changeThreadAttrs", payload);
              }
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  },
  watch: {
    $route(to, from) {
      if (to.name == "type" && to.params.event !== 'pagination' && to.params.event !== 'back') {
        this.selectedIds = [];
        this.personId = 0;
        this.order = "";
        this.squery = "";
        this.tagId = 0;
        this.currPage = 1;
        this.startThread = 1;
        this.endThread = 1;
        this.filterSection = to.params.filterSection;
        this.$store.dispatch("updateFilterSection", to.params.filterSection);
        this.mailboxId = to.params.mailboxId;
        this.$store.dispatch("updateMailboxId", to.params.mailboxId);
        bus.$emit("changeType");
      }

      let addFilterFlag = false;
      if (to.params.type || this.isThreadRefresh) {
        this.route = to.params.type;
        if (to.params.type == "assigned") {
          this.labelId = 0;
        } else if (to.params.type == "mine") {
          this.labelId = 4;
          addFilterFlag = true;
        } else if (to.params.type == "mentions") {
          this.labelId = 13;
          addFilterFlag = true;
        } else if (to.params.type == "discussions") {
          this.labelId = 15;
        } else if (to.params.type == "unassigned") {
          this.labelId = 10;
        } else if (to.params.type == "starred") {
          this.labelId = 11;
          addFilterFlag = true;
        } else if (to.params.type == "snoozed") {
          this.labelId = 9;
        } else if (to.params.type == "drafts") {
          this.labelId = 2;
        } else if (to.params.type == "all") {
          // if (to.params.filterSection == "closed") {
          //   this.labelId = 7;
          // } else if (to.params.filterSection == "snoozed") {
          //   this.labelId = 9;
          // } else if (to.params.filterSection == "trash") {
          //   this.labelId = 5;
          // } else {
            this.labelId = 14;
          // }
          // addFilterFlag = true;
        } else if (to.params.type == "sent") {
          this.labelId = 1;
        } else if (to.params.type == "scheduled") {
          this.labelId = 6;
        } else if (to.params.type == "closed") {
          this.labelId = 7;
        } else if (to.params.type == "spam") {
          this.labelId = 8;
        } else if (to.params.type == "trash") {
          this.labelId = 5;
          // } else if (
          //   to.params.type !== undefined &&
          //   to.params.type.substring(0, 3) == "tag"
          // ) {
          //   this.tagId = to.params.type.substring(4);
          //   this.labelId = 0;
        }

        if(addFilterFlag){
          if (to.params.filterSection == "closed") {
            this.labelId = 7;
          } else if (to.params.filterSection == "snoozed") {
            this.labelId = 9;
          } else if (to.params.filterSection == "trash") {
            this.labelId = 5;
          }

          if(to.params.mailboxId == "me"){
            this.personId = this.$store.state.userInfo.id;
          }
        }

        this.$store.dispatch("type", this.route);
        this.$store.dispatch("labelId", this.labelId);
        if (to.name == "type" && to.params.event !== "back" && to.params.event !== "pagination") {
          this.fetchThreads();
        }
      }
      // this.fetchThreads();
    },
  },
  methods: {
    broad() {
      this.$store.dispatch("updateOpenThread", null);
      this.isCompact = false;
      this.activeId = "";
      if (this.isThreadRefresh) {
        router.push({
          name: "type",
          params: {
            pageNo: this.currPage,
            type: this.route ? this.route : this.$store.state.type,
            mailboxId:
              this.$route.params.mailboxId ||
              (this.$store.state.inboxData && this.$store.state.inboxData.id) ||
              "me",
          },
        });
        this.isThreadRefresh = false;
        this.fetchThreads();
        console.log("braos if");
      } else {
        console.log("event dhikhado", event);
        if (event == "back") {
          router.push({
            name: "type",
            params: {
              pageNo: this.currPage,
              type: this.route,
              mailboxId:
                this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me",
              event: "back",
            },
          });
        } else {
          router.push({
            name: "type",
            params: {
              pageNo: this.currPage,
              type: this.route,
              mailboxId:
                this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me",
            },
          });
        }
        console.log("braos else");
      }
    },
    filterPerson(data) {
      this.personId = data;
      this.currPage = 1;
      this.fetchThreads();
    },
    filterOrder(data) {
      this.order = data;
      this.currPage = 1;
      this.fetchThreads();
    },
    ssquery(data) {
      this.squery = data;
      this.currPage = 1;
      this.fetchThreads();
    },
    bulkRead(read) {
      let mailboxThreadMap = {};
      var objIndex;
      for (let i in this.selectedIds) {
        objIndex = this.perPageMails.findIndex(
          (obj) => obj.id == this.selectedIds[i]
        );
        if (
          !(
            this.perPageMails[objIndex].mailboxId in
            Object.keys(mailboxThreadMap)
          )
        ) {
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        }
      }
      for (let i in this.selectedIds) {
        objIndex = this.perPageMails.findIndex(
          (obj) => obj.id == this.selectedIds[i]
        );
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(
          this.selectedIds[i]
        );
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
        }),
        credentials: "include",
      };
      let url;
      if (!read) {
        url = this.$apiBaseURL + "unifiedv2/unreadThreads.php";
      } else {
        url = this.$apiBaseURL + "unifiedv2/readThreads.php";
      }
      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (!read) {
            triggerPromptNotif("Conversations marked unread", "success", 1000);
          } else {
            triggerPromptNotif("Conversations marked read", "success", 1000);
          }
          for (let i = 0; i < this.selectedIds.length; i++) {
            var objIndex = this.perPageMails.findIndex(
              (obj) => obj.id == this.selectedIds[i]
            );
            if (!read) {
              this.perPageMails[objIndex].isRead = false;
            } else {
              this.perPageMails[objIndex].isRead = true;
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    bulkStar() {
      let mailboxThreadMap = {};
      var objIndex;
      for (let i in this.selectedIds) {
        objIndex = this.perPageMails.findIndex(
          (obj) => obj.id == this.selectedIds[i]
        );
        if (
          !(
            this.perPageMails[objIndex].mailboxId in
            Object.keys(mailboxThreadMap)
          )
        ) {
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        }
      }
      for (let i in this.selectedIds) {
        objIndex = this.perPageMails.findIndex(
          (obj) => obj.id == this.selectedIds[i]
        );
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(
          this.selectedIds[i]
        );
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
        }),
        credentials: "include",
      };
      let url = "";
      if (this.$route.params.type == "starred") {
        url = this.$apiBaseURL + "unifiedv2/unstarThreads.php";
      } else {
        url = this.$apiBaseURL + "unifiedv2/starThreads.php";
      }
      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (this.$route.params.type == "starred") {
            for (let i = 0; i < this.selectedIds.length; i++) {
              var objIndex = this.perPageMails.findIndex(
                (obj) => obj.id == this.selectedIds[i]
              );
              this.perPageMails[objIndex].isStarred = false;
            }
            triggerPromptNotif("Conversations unstarred", "success", 1000);
          } else {
            for (let i = 0; i < this.selectedIds.length; i++) {
              var objIndex = this.perPageMails.findIndex(
                (obj) => obj.id == this.selectedIds[i]
              );
              this.perPageMails[objIndex].isStarred = true;
            }
            triggerPromptNotif("Conversations starred", "success", 1000);
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    bulkMerge(id) {
      let threadIds = new Array();
      if (typeof id == "number") {
        threadIds[0] = id;
      } else if (typeof id == "object") {
        threadIds = id;
      }
      let mailboxThreadMap = {};
      if (typeof id == "number") {
        let objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId] = new Array();
        mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id);
      } else if (typeof id == "object") {
        var objIndex;
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          if (
            !(
              this.perPageMails[objIndex].mailboxId in
              Object.keys(mailboxThreadMap)
            )
          ) {
            mailboxThreadMap[this.perPageMails[objIndex].mailboxId] =
              new Array();
          }
        }
        for (let i in id) {
          objIndex = this.perPageMails.findIndex((obj) => obj.id == id[i]);
          mailboxThreadMap[this.perPageMails[objIndex].mailboxId].push(id[i]);
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxThreadMap,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "unifiedv2/mergeThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          if (typeof id == "number") {
            triggerPromptNotif("Conversation merged", "success", 1000);
          } else if (typeof id == "object") {
            triggerPromptNotif("Conversations merged", "success", 1000);
          }
          var objIndex,
            sum = 0;
          for (let i = 0; i < threadIds.length; i++) {
            objIndex = this.perPageMails.findIndex(
              (obj) => obj.id == threadIds[i]
            );
            sum += this.perPageMails[objIndex].messageCount;
          }
          objIndex = this.perPageMails.findIndex(
            (obj) => obj.id == data.data.master
          );
          this.perPageMails[objIndex].messageCount = sum;
          for (let i = 0; i < threadIds.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIds[i] || item.id == data.data.master
            );
          }
          bus.$emit("fetchSideBarStats");
          const limit = threadIds.length - 1;
          const offset =
            this.$store.state.userSettings.resultsPerPage -
            threadIds.length +
            1;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "unifiedv2/getThreads.php?mailboxIDs[]=" +
              (this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me") +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "unifiedv2/getThreads.php?mailboxIDs[]=" +
              (this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me") +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&offset=" +
              offset +
              "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
    perDeleteThreads(id) {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxID: this.$route.params.mailboxId,
          threadIDs,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "permanentlyDeleteThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status == "error") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          bus.$emit("fetchSideBarStats");
          if (typeof id == "number") {
            triggerPromptNotif("Conversation deleted", "success", 1000);
          } else if (typeof id == "object") {
            triggerPromptNotif("Conversations deleted", "success", 1000);
          }
          for (let i = 0; i < threadIDs.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIDs[i]
            );
          }
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "unifiedv2/getThreads.php?mailboxIDs[]=" +
              (this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me") +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "unifiedv2/getThreads.php?mailboxIDs[]=" +
              (this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me") +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&offset=" +
              offset +
              "&consistent=true";
          }
          fetch(url, { credentials: "include" }).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            for (let i = 0; i < data.data.threads.length; i++) {
              this.perPageMails.push(data.data.threads[i]);
            }
            this.$store.dispatch("updateThreads", this.perPageMails);
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
    async clickThread(id, type, subtype, ticketNumber, mailboxId) {
      var objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
      if (
        this.route == "drafts" &&
        this.perPageMails[objIndex].messageCount == 1
      ) {
        // if(this.$store.state.inboxData.type == 'mail') {
        if (type == "mail") {
          let emailId = this.perPageMails[objIndex].id;
          fetch(
            this.$apiBaseURL +
              "getEmail.php?emailID=" +
              emailId +
              "&mailboxID=" +
              this.$route.params.mailboxId,
            { credentials: "include" }
          ).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            let hash =
              Date.now() + "-" + Math.floor(Math.random() * 100000000000);
            bus.$emit("openCompose", hash, "mail", data.data.email);
          });
        } else if (type == "twitter") {
          let emailId = this.perPageMails[objIndex].email.id;
          fetch(
            this.$apiBaseURL +
              "get-tweet.php?emailID=" +
              emailId +
              "&mailboxID=" +
              this.$store.state.inboxData.id,
            { credentials: "include" }
          ).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            let hash =
              Date.now() + "-" + Math.floor(Math.random() * 100000000000);
            bus.$emit("openTweetCompose", hash, "twitter", data.data.email);
          });
        }
      } else {
        if (Object.keys(this.$store.state.threadData).includes(id.toString())) {
          this.activeId = id;
          this.isCompact = true;
          router.push({
            name: "thread",
            params: {
              threadId: id,
            },
          });
          this.$store.dispatch("updateOpenThread", id);
          bus.$emit("compact", this.$store.state.threadData[id]);
        } else {
          bus.$emit("changeRead", id, 1);
          this.activeId = id;
          this.isCompact = true;
          let data = null;
          bus.$emit("compact", data);
          if (this.isThreadRefresh) {
            this.loading = true;
          }
          data = await this.fetchThread(id, type, subtype);
          data["data"]["ticketNumber"] = ticketNumber;
          let data1;
          if (type == "chat") {
            await fetch(
              this.$apiBaseURL +
                "chat-widget/getUserDetails_V2?id=" +
                data.data.contact.id +
                "&mailboxID=" +
                mailboxId,
              { credentials: "include" }
            )
              .then(async (response) => {
                data1 = await response.json();
                if (data1.status !== "success") {
                  const error = (data1 && data1.message) || response.status;
                  triggerPromptNotif(error, "error", 3000);
                  return Promise.reject(error);
                }
              })
              .catch((error) => {
                alert(error);
              });
          }
          data["data"]["contactData"] = data1;
          if (
            !Object.keys(this.$store.state.threadData).includes(id.toString())
          ) {
            this.$store.dispatch("updateThreadData", data);
          }
          if (this.isThreadRefresh) {
            let from = {};
            let ts = data.data.items[0].timestamp;
            for (let i = 0; i < data.data.items.length; i++) {
              if (data.data.items[i].timestamp < ts) {
                ts = data.data.items[i].timestamp;
              }
              // if (
              //   data.data.items[i].type == "email" &&
              //   data.data.items[i].timestamp == ts
              // ) {
              //   from = data.data.items[i].data.from;
              // }
            }
            let thread = {
              assignedTo: data.data.currentAssignment,
              draftOnly: false,
              id: data.data.ticketNumber,
              hasDraft: data.data.drafts.length > 0,
              isArchived: data.data.isArchived,
              isDeleted: data.data.isDeleted,
              isRead: true,
              isSnoozed: data.data.isSnoozed,
              isSpam: data.data.isSpam,
              isStarred: data.data.isStarred,
              order: 0,
              type: "mail",
              snippetType: "message",
              totalEmailCount: data.data.emailCount,
              ticketNumber: data.data.ticketNumber,
              tags: data.data.tags,
              attachments: [],
              subject: data.data.subject,
              originalSubject: data.data.subject,
              snippet: data.data.snippet,
              humanFriendlyDate: moment.unix(ts).format("DD MMM"),
            };
            this.perPageMails.push(thread);
            this.loading = false;
            this.$store.dispatch("updateThreads", this.perPageMails);
          }
          bus.$emit("compact", this.$store.state.threadData[id]);
        }
      }
    },
    async fetchThreads() {
      let inboxId = `${
        this.$route.params.mailboxId ||
        (this.$store.state.inboxData && this.$store.state.inboxData.id) ||
        "me"
      }`;
      if (inboxId == "tags") {
        inboxId = "me";
      }
      this.loading = true;
      // bus.$emit("broad");
      this.$store.dispatch("updateOpenThread", null);
      this.isCompact = false;
      this.activeId = "";
      bus.$emit("broadForContent");
      let url = `${
        this.$apiBaseURL
      }unifiedv2/getThreads.php?mailboxIDs[]=${inboxId}&type=${
        this.route
      }&filterSection=${this.filterSection}&page=${this.currPage}&labelID=${
        this.labelId
      }${this.squery !== "" ? "&squery=" + this.squery : ""}${
        this.tagId !== 0 ? "&tagID=" + this.tagId : ""
      }${this.personId == 1 ? "&filter=unassigned" : ""}${
        this.personId == 2 ? "&filter=unread" : ""
      }${this.personId > 2 ? "&filter=assignedTo%3A" + this.personId : ""}${
        this.order !== "" ? "&order=" + this.order : ""
      }`;
      let response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      this.mails = data.data.threads;
      this.$store.dispatch("updateThreads", data.data.threads);
      this.loading = false;
      this.isnextPage = data.data.nextPage;
      this.perPageMails = this.mails;
      this.resultsPerPage = this.$store.state.userSettings.resultsPerPage;
      // // this.resultsPerPage = 1;
      // router.push({
      //   name: "type",
      //   params: {
      //     pageNo: this.currPage,
      //     type: this.route,
      //     mailboxId:
      //       this.$route.params.mailboxId ||
      //       (this.$store.state.inboxData && this.$store.state.inboxData.id) ||
      //       "me",
      //   },
      // });
      this.startThread =
        (parseInt(this.currPage) - 1) * this.resultsPerPage + 1;
      this.endThread =
        parseInt(this.startThread) + parseInt(this.resultsPerPage) - 1;
    },
    async fetchThread(id, type, subtype) {
      router.push({
        name: "thread",
        params: {
          threadId: id,
        },
      });
      this.$store.dispatch("updateOpenThread", id);
      let mailboxID =
        this.$route.params.mailboxId ||
        (this.$store.state.inboxData && this.$store.state.inboxData.id) ||
        "me";
      // if(this.$store.state.inboxData.id)
      const response = await fetch(
        `${this.$apiBaseURL}unifiedv2/getThreadData.php?threadID=${id}&mailboxID=${mailboxID}&inboxType=${type}&inboxSubType=${subtype}&labelID=${this.labelId}&maxDate=0&page=1`,
        { credentials: "include" }
      );
      const data = await response.json();
      if (this.$store.state.userSettings.orderThread == "asc") {
        data.data.items = data.data.items.sort(
          (b, a) => b.timestamp - a.timestamp
        );
      } else {
        data.data.items = data.data.items.sort(
          (b, a) => a.timestamp - b.timestamp
        );
      }
      // data.data.isRead = isread;
      data.data.labelId = this.labelId;
      data.data.id = id;
      return data;
    },
    async nextPage() {
      if (this.isnextPage == true) {
        let inboxId = `${
          this.$route.params.mailboxId ||
          (this.$store.state.inboxData && this.$store.state.inboxData.id) ||
          "me"
        }`;
        if (inboxId == "tags") {
          inboxId = "me";
        }
        this.loading = true;
        console.log(this.currPage)
        this.currPage = parseInt(this.currPage) + 1;
        console.log(this.currPage)
        let url = `${
          this.$apiBaseURL
        }unifiedv2/getThreads.php?mailboxIDs[]=${inboxId}&type=${
          this.route
        }&filterSection=${this.filterSection}&page=${this.currPage}&labelID=${
          this.labelId
        }${this.squery !== "" ? "&squery=" + this.squery : ""}${
          this.tagId !== 0 ? "&tagID=" + this.tagId : ""
        }${this.personId == 1 ? "&filter=unassigned" : ""}${
          this.personId == 2 ? "&filter=unread" : ""
        }${this.personId > 2 ? "&filter=assignedTo%3A" + this.personId : ""}${
          this.order !== "" ? "&order=" + this.order : ""
        }`;
        let response = await fetch(url, { credentials: "include" });
        const data = await response.json();
        this.mails = data.data.threads;
        this.$store.dispatch("updateThreads", data.data.threads);
        this.loading = false;
        this.isnextPage = data.data.nextPage;
        this.perPageMails = this.mails;
        this.startThread =
          (this.currPage - 1) * this.$store.state.userSettings.resultsPerPage +
          1;
        this.endThread =
          parseInt(this.startThread) +
          parseInt(this.$store.state.userSettings.resultsPerPage) -
          1;
        if (this.$route.params.threadId == undefined) {
          router.push({
            name: "type",
            params: {
              pageNo: this.currPage,
              type: this.route,
              mailboxId:
                this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me",
                event: "pagination"
            },
          });
        }
      }
    },
    async prevPage() {
      if (this.currPage > 1) {
        let inboxId = `${
          this.$route.params.mailboxId ||
          (this.$store.state.inboxData && this.$store.state.inboxData.id) ||
          "me"
        }`;
        if (inboxId == "tags") {
          inboxId = "me";
        }
        this.loading = true;
        this.currPage -= 1;
        if (this.$route.params.threadId == undefined) {
          router.push({
            name: "type",
            params: {
              pageNo: this.currPage,
              type: this.route,
              mailboxId:
                this.$route.params.mailboxId ||
                (this.$store.state.inboxData &&
                  this.$store.state.inboxData.id) ||
                "me",
                event: "pagination"
            },
          });
        }
        let url = `${
          this.$apiBaseURL
        }unifiedv2/getThreads.php?mailboxIDs[]=${inboxId}&type=${
          this.route
        }&filterSection=${this.filterSection}&page=${this.currPage}&labelID=${
          this.labelId
        }${this.squery !== "" ? "&squery=" + this.squery : ""}${
          this.tagId !== 0 ? "&tagID=" + this.tagId : ""
        }${this.personId == 1 ? "&filter=unassigned" : ""}${
          this.personId == 2 ? "&filter=unread" : ""
        }${this.personId > 2 ? "&filter=assignedTo%3A" + this.personId : ""}${
          this.order !== "" ? "&order=" + this.order : ""
        }`;
        let response = await fetch(url, { credentials: "include" });
        const data = await response.json();
        this.mails = data.data.threads;
        this.$store.dispatch("updateThreads", data.data.threads);
        this.loading = false;
        this.isnextPage = data.data.nextPage;
        this.perPageMails = this.mails;
        this.startThread =
          (this.currPage - 1) * this.$store.state.userSettings.resultsPerPage +
          1;
        this.endThread =
          parseInt(this.startThread) +
          parseInt(this.$store.state.userSettings.resultsPerPage) -
          1;
      }
    },
  },
  async mounted() {
    // if (this.$route.params.pageNo !== undefined) {
    //   this.currPage = this.$route.params.pageNo;
    //   await this.fetchThreads();
    // } else {
    //   if (this.$route.params.threadId !== undefined) {
    //     this.isThreadRefresh = true;
    //     // var objIndex = this.perPageMails.findIndex((obj => obj.id == this.$route.params.pageNo.threadId));
    //     this.clickThread(this.$route.params.threadId);
    //   } else {
    //     this.currPage = 1;
    //     await this.fetchThreads();
    //   }
    // }
  },
  async beforeMount() {
    if (this.$route.params.type !== undefined) {
      this.route = this.$route.params.type;
      this.filterSection = this.$route.params.filterSection;
      if (this.$route.params.type == "assigned") {
        this.labelId = 0;
      } else if (this.$route.params.type == "mine") {
        this.labelId = 4;
      } else if (this.$route.params.type == "mentions") {
        this.labelId = 13;
      } else if (this.$route.params.type == "discussions") {
        this.labelId = 15;
      } else if (this.$route.params.type == "unassigned") {
        this.labelId = 10;
      } else if (this.$route.params.type == "starred") {
        this.labelId = 11;
      } else if (this.$route.params.type == "snoozed") {
        this.labelId = 9;
      } else if (this.$route.params.type == "drafts") {
        this.labelId = 2;
      } else if (this.$route.params.type == "all") {
        this.labelId = 14;
      } else if (this.$route.params.type == "closed") {
        this.labelId = 7;
        // } else {
        //   this.labelId = 0;
        //   this.tagId = this.$route.params.type.substring(4);
      }
      this.$store.dispatch("type", this.route);
      this.$store.dispatch("updateFilterSection", this.filterSection);
      this.$store.dispatch("labelId", this.labelId);
    }
    if (this.$route.params.pageNo !== undefined) {
      this.currPage = this.$route.params.pageNo;
      await this.fetchThreads();
    } else {
      if (this.$route.params.threadId !== undefined) {
        this.isThreadRefresh = true;
        if (this.$store.state.type == "assigned") {
          this.labelId = 0;
          this.route = this.$store.state.type;
        } else if (this.$store.state.type == "mine") {
          this.labelId = 4;
          this.route = this.$store.state.type;
        } else if (this.$store.state.type == "mentions") {
          this.labelId = 13;
          this.route = this.$store.state.type;
        } else if (this.$store.state.type == "discussions") {
          this.labelId = 15;
          this.route = this.$store.state.type;
        } else if (this.$store.state.type == "unassigned") {
          this.labelId = 10;
          this.route = this.$store.state.type;
        } else if (this.$store.state.type == "starred") {
          this.labelId = 11;
          this.route = this.$store.state.type;
        } else if (this.$store.state.type == "snoozed") {
          this.labelId = 9;
          this.route = this.$store.state.type;
        } else if (this.$store.state.type == "drafts") {
          this.labelId = 2;
          this.route = this.$store.state.type;
        } else if (this.$store.state.type == "all") {
          this.labelId = 14;
          this.route = this.$store.state.type;
        } else {
          this.labelId = 0;
          this.route = this.$store.state.type;
          this.tagId = this.$store.state.type.substring(4);
        }
        this.currPage = 1;
        // var objIndex = this.perPageMails.findIndex((obj => obj.id == this.$route.params.pageNo.threadId));
        this.clickThread(this.$route.params.threadId);
      } else {
        this.currPage = 1;
        await this.fetchThreads();
      }
    }
    // if (this.$route.params.pageNo !== undefined) {
    //   this.currPage = this.$route.params.pageNo;
    // } else {
    //   this.currPage = 1;
    // }
    // this.fetchThreads();
  },
};
</script>

<style>
</style>