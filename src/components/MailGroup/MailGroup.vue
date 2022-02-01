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
      style="overflow-y: auto; overflow-x: hidden; background-color: white"
    >
      <div v-if="perPageMails.length !== 0" id="threads-list">
        <div
          v-for="mail in perPageMails"
          :key="mail.id"
          @click="clickThread(mail.id, mail.type, mail.subtype, mail.ticketNumber, mail.isStarred == true)"
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
        <button @click.stop.prevent="fetchThreads" class="btn btn-link">
          View All Conversations
        </button>
      </div>
      <div
        v-if="perPageMails.length == 0"
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
export default {
  components: {
    MailsHeaderSearchBox,
    MailsHeaderSelectAll,
    MailGroupSingleMail,
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
          console.log(this.selectedIds, tags, this.tagsInAll, this.tagsPartial);
        } else {
          this.selectedIds = [];
          this.tagsInAll = [];
          this.tagsPartial = [];
          console.log(this.selectedIds, this.tagsInAll, this.tagsPartial);
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
          console.log(this.selectedIds, this.tagsInAll, this.tagsPartial);
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
          console.log(this.selectedIds, this.tagsInAll, this.tagsPartial);
        }
      }
    }),
      bus.$on("broad", () => {
        this.isCompact = false;
        this.activeId = "";
        if (this.isThreadRefresh) {
          router.push({
            name: "type",
            params: {
              type: this.route,
              mailboxId: this.$route.params.mailboxId,
            },
          });
          this.isThreadRefresh = false;
        } else {
          router.push({
            name: "page",
            params: {
              pageNo: this.currPage,
              type: this.route,
              mailboxId: this.$route.params.mailboxId,
            },
          });
        }
      });
    bus.$on("changeRead", (id, read) => {
      console.log(read);
      var objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
      let threadIDs = new Array();
      threadIDs[0] = id;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxID: this.$route.params.mailboxId,
          threadIDs,
        }),
        credentials: "include",
      };
      console.log(requestOptions.body);
      let url;
      if (this.perPageMails[objIndex].isRead && read !== 1) {
        url = this.$apiBaseURL + "unread-thread.php";
      } else {
        url = this.$apiBaseURL + "read-thread.php";
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
          } else {
            triggerPromptNotif("Conversation marked read", "success", 1000);
          }
        })
        .catch((error) => {
          alert(error);
        });
    });

    bus.$on("changeStarred", (id) => {
      var objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
      let threadIds = new Array();
      threadIds[0] = id;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxId: this.$route.params.mailboxId,
          threadIds,
        }),
        credentials: "include",
      };
      console.log(requestOptions.body);
      let url = "";
      if (this.perPageMails[objIndex].isStarred) {
        url = this.$apiBaseURL + "unstarThreads.php";
      } else {
        url = this.$apiBaseURL + "starThreads.php";
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
    bus.$on("closeThread", (id) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      console.log(threadIDs);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxID: this.$route.params.mailboxId,
          threadIDs,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "archiveThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.message !== "thread archived") {
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
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
          });
        })
        .catch((error) => {
          alert(error);
        });
    });
    bus.$on("restoreThreads", (id) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      let unspam = false;
      if (this.labelId == 8) {
        unspam = true;
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxID: this.$route.params.mailboxId,
          threadIDs,
          unspam,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "restoreThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.message !== "thread restored") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
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
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
          });
        })
        .catch((error) => {
          alert(error);
        });
    });
    bus.$on("spamThreads", (id) => {
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
      fetch(this.$apiBaseURL + "spamThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.message !== "thread marked as spam") {
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
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
          });
        })
        .catch((error) => {
          alert(error);
        });
    });
    bus.$on("moveToInbox", (id, mailboxId) => {
      let threadIds = new Array();
      if (typeof id == "number") {
        threadIds[0] = id;
      } else if (typeof id == "object") {
        threadIds = id;
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxId: this.$route.params.mailboxId,
          threadIds,
          targetMailboxId: mailboxId,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "moveThreads.php", requestOptions)
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
          const limit = threadIds.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIds.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
          });
        })
        .catch((error) => {
          alert(error);
        });
    });
    bus.$on("doneThreads", (id) => {
      let threadIDs = new Array();
      if (typeof id == "number") {
        threadIDs[0] = id;
      } else if (typeof id == "object") {
        threadIDs = id;
      }
      console.log(threadIDs);
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
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
          });
        })
        .catch((error) => {
          alert(error);
        });
    });
    bus.$on("snoozeThread", (id, till) => {
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
          snoozeTill: till,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "snoozeThreads.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.message !== "conversation snoozed") {
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
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
          });
        })
        .catch((error) => {
          alert(error);
        });
    });
    bus.$on("assignThread", (id, userId) => {
      let threadIds = new Array();
      if (typeof id == "number") {
        threadIds[0] = id;
      } else if (typeof id == "object") {
        threadIds = id;
      }
      let body;
      if (userId == "") {
        body = JSON.stringify({
          mailboxId: this.$route.params.mailboxId,
          threadIds,
        });
      } else {
        body = JSON.stringify({
          mailboxId: this.$route.params.mailboxId,
          threadIds,
          assignedUser: userId,
        });
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "assignThreads.php", requestOptions)
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
              console.log(teammate);
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
            console.log(data1);
            if (this.isCompact) {
              bus.$emit("changeThreadAttrs", payload);
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    });
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
      console.log(requestOptions);
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
    bus.$on("deleteThreads", (id) => {
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
      fetch(this.$apiBaseURL + "deleteThreads.php", requestOptions)
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
          const limit = threadIDs.length;
          const offset =
            this.$store.state.userSettings.resultsPerPage - threadIDs.length;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
          });
        })
        .catch((error) => {
          alert(error);
        });
    });
    bus.$on("toggleTags", (id, addtags, removetags, newTag) => {
      console.log(id, addtags, removetags, addtags.length);
      if (addtags.length || removetags.length) {
        let threadIds = new Array();
        let addTags = new Array();
        let removeTags = new Array();
        if (typeof id == "number") {
          threadIds[0] = id;
        } else if (typeof id == "object") {
          threadIds = id;
        }
        for (var i = 0; i < addtags.length; i++) {
          addTags.push(addtags[i]);
        }
        for (var i = 0; i < removetags.length; i++) {
          removeTags.push(removetags[i]);
        }
        console.log(addtags, removetags);
        console.log(addTags, removeTags);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mailboxId: this.$route.params.mailboxId,
            threadIds,
            addTags,
            removeTags,
          }),
          credentials: "include",
        };
        fetch(this.$apiBaseURL + "tags/apply.php", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.message !== "Tags updated.") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
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
              console.log(payload);
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
      console.log(to.params.type);
      this.route = to.params.type;
      this.selectedIds = [];
      if (to.params.type !== from.params.type) {
        console.log("type");
        bus.$emit("changeType");
        if (to.params.type == "assigned") {
          this.labelId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "mine") {
          this.labelId = 4;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "mentions") {
          this.labelId = 13;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "discussions") {
          this.labelId = 15;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "unassigned") {
          this.labelId = 10;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "starred") {
          this.labelId = 11;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "snoozed") {
          this.labelId = 9;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "drafts") {
          this.labelId = 2;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "all") {
          this.labelId = 14;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "sent") {
          this.labelId = 1;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "scheduled") {
          this.labelId = 6;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "closed") {
          this.labelId = 7;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "spam") {
          this.labelId = 8;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else if (to.params.type == "trash") {
          this.labelId = 5;
          this.tagId = 0;
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        } else {
          this.labelId = 0;
          this.tagId = to.params.type.substring(4);
          this.route = to.params.type;
          this.currPage = 1;
          this.startThread = 1;
          this.endThread = 1;
          this.personId = 0;
          this.order = "";
          this.squery = "";
        }
        this.fetchThreads();
      }
      if (
        to.params.type == from.params.type &&
        to.params.pageNo == undefined &&
        to.params.threadId == undefined
      ) {
        this.currPage = 1;
        this.startThread = 1;
        this.endThread = 1;
        this.fetchThreads();
      }
    },
  },
  methods: {
    filterPerson(data) {
      this.personId = data;
      this.currPage = 1;
      console.log(this.personId);
      this.fetchThreads();
    },
    filterOrder(data) {
      this.order = data;
      this.currPage = 1;
      console.log(this.order);
      this.fetchThreads();
    },
    ssquery(data) {
      this.squery = data;
      console.log(this.order);
      this.currPage = 1;
      this.fetchThreads();
    },
    bulkRead(read) {
      console.log(read);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxID: this.$route.params.mailboxId,
          threadIDs: this.selectedIds,
        }),
        credentials: "include",
      };
      console.log(requestOptions.body);
      let url;
      if (!read) {
        url = this.$apiBaseURL + "unread-thread.php";
      } else {
        url = this.$apiBaseURL + "read-thread.php";
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
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxId: this.$route.params.mailboxId,
          threadIds: this.selectedIds,
        }),
        credentials: "include",
      };
      console.log(requestOptions.body);
      let url = "";
      if (this.$route.params.type == "starred") {
        url = this.$apiBaseURL + "unstarThreads.php";
      } else {
        url = this.$apiBaseURL + "starThreads.php";
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
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxId: this.$route.params.mailboxId,
          threadIds,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "mergeThreads.php", requestOptions)
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
            sum += this.perPageMails[objIndex].totalEmailCount;
          }
          objIndex = this.perPageMails.findIndex(
            (obj) => obj.id == data.data.master
          );
          this.perPageMails[objIndex].totalEmailCount = sum;
          for (let i = 0; i < threadIds.length; i++) {
            this.perPageMails = this.perPageMails.filter(
              (item) => item.id !== threadIds[i] || item.id == data.data.master
            );
          }
          const limit = threadIds.length - 1;
          const offset =
            this.$store.state.userSettings.resultsPerPage -
            threadIds.length +
            1;
          let url;
          if (offset == 0) {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
              "&labelID=" +
              this.labelId +
              "&limit=" +
              limit +
              "&consistent=true";
          } else {
            url =
              this.$apiBaseURL +
              "get-threads.php?mailboxID=" +
              this.$route.params.mailboxId +
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
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
    async clickThread(id, type, subtype, ticketNumber, isstarred) {
      var objIndex = this.perPageMails.findIndex((obj) => obj.id == id);
      if (
        this.route == "drafts" &&
        this.perPageMails[objIndex].totalEmailCount == 1
      ) {
        console.log(this.perPageMails[objIndex].totalEmailCount, objIndex);
        let emailId = this.perPageMails[objIndex].email.id;
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
          bus.$emit("openCompose", hash, data.data.email);
        });
      } else {
        bus.$emit("changeRead", id, 1);
        this.activeId = id;
        this.isCompact = true;
        let data = null;
        bus.$emit("compact", data);
        data = await this.fetchThread(id, type, subtype, isstarred);
        data["data"]["ticketNumber"] = ticketNumber;
        console.log(data);
        if (this.isThreadRefresh) {
          let from = {};
          let ts = data.data.items[0].timestamp;
          for (let i = 0; i < data.data.items.length; i++) {
            if (data.data.items[i].timestamp < ts) {
              ts = data.data.items[i].timestamp;
            }
            if (
              data.data.items[i].type == "email" &&
              data.data.items[i].timestamp == ts
            ) {
              from = data.data.items[i].data.from;
            }
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
            snippetType: "message",
            totalEmailCount: data.data.emailCount,
            ticketNumber: data.data.ticketNumber,
            tags: data.data.tags,
            attachments: [],
            subject: data.data.displaySubject,
            originalSubject: data.data.subject,
            snippet: data.data.snippet,
            humanFriendlyDate: moment.unix(ts).format("DD MMM"),
          };
          console.log(thread);
          this.perPageMails.push(thread);
        }
        console.log(this.perPageMails);
        bus.$emit("compact", data);
      }
    },
    async fetchThreads() {
      this.loading = true;
      bus.$emit("broad");
      let url =
        this.$apiBaseURL +
        "unifiedv2/getThreads.php?mailboxIDs[]=" +
        this.$route.params.mailboxId +
        "&page=" +
        this.currPage +
        "&labelID=" +
        this.labelId +
        (this.squery !== "" ? "&squery=" + this.squery : "") + 
        (this.tagId !== 0 ? "&tagID=" + this.tagId: "") +
        (this.personId == 1 ? "&filter=unassigned" : "") + 
        (this.personId == 2 ? "&filter=unread" : "") + 
        (this.personId > 2 ? "&filter=assignedTo%3A" + this.personId : "") + 
        (this.order !== "" ? "&order=" + this.order : "");
      console.log(url);
      let response = await fetch(url, { credentials: "include" });
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
      router.push({
        name: "page",
        params: {
          pageNo: this.currPage,
          type: this.route,
          mailboxId: this.$route.params.mailboxId,
        },
      });
      console.log(this.currPage, this.resultsPerPage);
      this.startThread =
        (parseInt(this.currPage) - 1) * this.resultsPerPage + 1;
      this.endThread =
        parseInt(this.startThread) + parseInt(this.resultsPerPage) - 1;
      console.log(this.endThread);
      console.log(this.startThread);
      console.log(this.$store.state.userSettings.resultsPerPage);
    },
    async fetchThread(id, type, subtype, isstarred) {
      console.log(isstarred);
      const response = await fetch(
        this.$apiBaseURL +
          "unifiedv2/getThreadData.php?threadID=" +
          id +
          "&mailboxID=" +
          this.$route.params.mailboxId +
          "&inboxType=" +
          type +
          "&inboxSubType=" +
          subtype +
          "&labelID=" +
          this.labelId +
          "&maxDate=0&page=1",
        {credentials: "include"}
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
      data.data.isStarred = isstarred;
      data.data.labelId = this.labelId;
      console.log(data);
      router.push({
        name: "thread",
        params: {
          threadId: id,
          type: this.route,
          mailboxId: this.$store.state.inboxData.id,
        },
      });
      return data;
    },
    async nextPage() {
      if (this.isnextPage == true) {
        this.loading = true;
        this.currPage++;
        let url =
          this.$apiBaseURL +
          "unifiedv2/getThreads.php?mailboxIDs[]=" +
          this.$route.params.mailboxId +
          "&page=" +
          this.currPage +
          "&labelID=" +
          this.labelId +
          (this.squery !== "" ? "&squery=" + this.squery : "") + 
          (this.tagId !== 0 ? "&tagID=" + this.tagId: "") +
          (this.personId == 1 ? "&filter=unassigned" : "") + 
          (this.personId == 2 ? "&filter=unread" : "") + 
          (this.personId > 2 ? "&filter=assignedTo%3A" + this.personId : "") + 
          (this.order !== "" ? "&order=" + this.order : "");
        console.log(url);
        let response = await fetch(url, { credentials: "include" });
        const data = await response.json();
        console.log(data);
        this.mails = data.data.threads;
        this.loading = false;
        this.isnextPage = data.data.nextPage;
        console.log(this.mails.length);
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
            name: "page",
            params: {
              pageNo: this.currPage,
              type: this.route,
              mailboxId: this.$store.state.inboxData.id,
            },
          });
        }
      }
    },
    async prevPage() {
      if (this.currPage > 1) {
        this.loading = true;
        this.currPage--;
        console.log(typeof this.currPage);
        if (this.$route.params.threadId == undefined) {
          router.push({
            name: "page",
            params: {
              pageNo: this.currPage,
              type: this.route,
              mailboxId: this.$store.state.inboxData.id,
            },
          });
        }
        let url =
        this.$apiBaseURL +
          "unifiedv2/getThreads.php?mailboxIDs[]=" +
          this.$route.params.mailboxId +
          "&page=" +
          this.currPage +
          "&labelID=" +
          this.labelId +
          (this.squery !== "" ? "&squery=" + this.squery : "") + 
          (this.tagId !== 0 ? "&tagID=" + this.tagId: "") +
          (this.personId == 1 ? "&filter=unassigned" : "") + 
          (this.personId == 2 ? "&filter=unread" : "") + 
          (this.personId > 2 ? "&filter=assignedTo%3A" + this.personId : "") + 
          (this.order !== "" ? "&order=" + this.order : "");
        console.log(url);
        let response = await fetch(url, { credentials: "include" });
        const data = await response.json();
        console.log(data);
        this.mails = data.data.threads;
        this.loading = false;
        this.isnextPage = data.data.nextPage;
        console.log(this.mails.length);
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
    async fetchSmsThread() {
      const response = await fetch(
        "http://localhost/mas/hw/getSmsThreadData.php"
      );
      const data = await response.json();
      data.data.items = data.data.items.sort(
        (b, a) => b.timestamp - a.timestamp
      );
      console.log(data);
      return data;
    },
  },
  async mounted() {
    // console.log(1);
    // if (this.$route.params.pageNo !== undefined) {
    //   console.log(2);
    //   this.currPage = this.$route.params.pageNo;
    //   await this.fetchThreads();
    // } else {
    //   if (this.$route.params.threadId !== undefined) {
    //     this.isThreadRefresh = true;
    //     // var objIndex = this.perPageMails.findIndex((obj => obj.id == this.$route.params.pageNo.threadId));
    //     this.clickThread(this.$route.params.threadId);
    //     console.log(3);
    //   } else {
    //     this.currPage = 1;
    //     await this.fetchThreads();
    //   }
    // }
  },
  async beforeMount() {
    if (this.$route.params.type == "assigned") {
      this.labelId = 0;
      this.route = this.$route.params.type;
    } else if (this.$route.params.type == "mine") {
      this.labelId = 4;
      this.route = this.$route.params.type;
    } else if (this.$route.params.type == "mentions") {
      this.labelId = 13;
      this.route = this.$route.params.type;
    } else if (this.$route.params.type == "discussions") {
      this.labelId = 15;
      this.route = this.$route.params.type;
    } else if (this.$route.params.type == "unassigned") {
      this.labelId = 10;
      this.route = this.$route.params.type;
    } else if (this.$route.params.type == "starred") {
      this.labelId = 11;
      this.route = this.$route.params.type;
    } else if (this.$route.params.type == "snoozed") {
      this.labelId = 9;
      this.route = this.$route.params.type;
    } else if (this.$route.params.type == "drafts") {
      this.labelId = 2;
      this.route = this.$route.params.type;
    } else if (this.$route.params.type == "all") {
      this.labelId = 14;
      this.route = this.$route.params.type;
    } else {
      this.labelId = 0;
      this.route = this.$route.params.type;
      this.tagId = this.$route.params.type.substring(4);
    }
    console.log(1);
    if (this.$route.params.pageNo !== undefined) {
      console.log(2);
      this.currPage = this.$route.params.pageNo;
      await this.fetchThreads();
    } else {
      if (this.$route.params.threadId !== undefined) {
        this.isThreadRefresh = true;
        // var objIndex = this.perPageMails.findIndex((obj => obj.id == this.$route.params.pageNo.threadId));
        this.clickThread(this.$route.params.threadId);
        console.log(3);
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