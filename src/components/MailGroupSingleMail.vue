<template>
  <div class="w-100 row media m-0 hw-thread media-body" :class="[isRead ? 'read' : 'unread']">
    <div class="realtimeMarker"></div>
    <div class="hw_broadThread w-100">
      <div class="row align-items-center w-100" style="padding-left: 20px">
        <div
          class="col-3 d-flex justify-content-between align-items-center pl-0"
        >
          <div class="d-flex align-items-center">
            <div @click.stop class="custom-control hw_thread-selector custom-checkbox">
              <input
                type="checkbox"
                v-model="checkAll"
                class="custom-control-input"
                :id="'thread-' + mail.id +'-selector'"
              />
              <label
                class="custom-control-label"
                :for="'thread-' + mail.id +'-selector'"
              ></label>
            </div>
            <div @click.stop="changeStarred(mail.id)" class="hw_starThread px-1 mr-1" :style="{color: isStarred ? '#f4b400' : '#8392a5'}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                :fill="isStarred ? '#f4b400' : 'none'"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-star"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                ></polygon>
              </svg>
            </div>
          </div>
          <div class="flex-grow-1 w-100 d-flex thread-addr">
            <div
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: isRead ? '' : '600' }"
            >
              {{ Object.values(mail.email.from).toString() }}
            </div>
            <div
              class="text-primary ml-1"
              v-if="mail.hasDraft"
              style="max-width: 25%"
            >
              Draft
            </div>
            <div
              class="text-secondary ml-1 total-email-count"
              style="max-width: 10%"
            >
              {{ mail.totalEmailCount > 1 ? mail.totalEmailCount : "" }}
            </div>
          </div>
        </div>
        <div class="col-7 d-flex align-items-center">
          <div
            class="subject-snippet d-flex align-items-center"
            style="
              white-space: nowrap;
              overflow: hidden !important;
              text-overflow: ellipsis;
            "
          >
            <div class="hw-tags-list mr-2">
              <span
                v-for="tag in mail.tags"
                :key="tag.id"
                style="
                  color: white;
                  margin-left: 0.125rem;
                  margin-right: 0.125rem;
                "
                :style="{ backgroundColor: tag.color }"
                class="badge hw-tag badge-pill hw-tag-204484"
                :data-tag_id="tag.id"
                data-mailbox_id="204420"
                >{{ tag.name }}</span
              >
            </div>
            <div class="d-flex align-items-center">
              <span
                class="tx-14 hw-thread-subject mr-2"
                :style="{ fontWeight: isRead ? '' : '600' }"
              >
                {{ mail.email.subject }}
              </span>
              <span
                v-if="mail.snippetType == 'note'"
                class="tx-16 tx-color-03 px-2 tx-bold snippetMarker"
                style="color: #ddcf97"
                >|</span
              >
              <span class="tx-14 tx-color-03">
                {{ mail.email.snippet }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-1 d-none d-lg-flex">
          <div class="row">
            <div class="col-6 user-avatar">
              <div
               v-if="mail.assignedTo !== null"
                class="avatar avatar-xs mr-1"
                data-toggle="tooltip"
                :title="mail.assignedTo.firstname"
                v-html="mail.assignedTo.avatarTag"
              ></div>
            </div>
            <div class="col-6"></div>
          </div>
        </div>
        <div class="col-2 date-thread-options col-lg-1">
          <span
            class="tx-13 thread-date"
            :style="{ fontWeight: isRead ? '' : '600' }"
            >{{ mail.email.humanFriendlyDate }}</span
          >
          <span
            class="
              thread-options
              d-flex
              justify-content-center
              align-items-center
            "
          >
            <span class="read-unread-thread pl-1 pr-1 pt-1" @click.stop="changeRead(mail.id)">
              <i
                v-if="!isRead"
                class="far fa-envelope-open"
                data-toggle="tooltip"
                data-placement="top"
                title="Read"
                style="font-size: 16px"
              ></i>
              <i
                v-if="isRead"
                class="far fa-envelope"
                data-toggle="tooltip"
                data-placement="top"
                title="Unread"
                style="font-size: 16px"
              ></i> </span
            ><span class="archive-thread pr-1 pl-1" @click.stop="closeThread(mail.id)">
              <svg
                data-toggle="tooltip"
                data-placement="top"
                title="Close"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-check"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg> </span
            ><span @click.stop
              class="snooze-thread pr-1 pl-1 dropright"
          
              data-toggle="tooltip"
              data-placement="top"
              title="Snooze"
              data-original-title="Snooze"
            >
              <svg
                :id="'snooze-icon-'+mail.id"
                type="button"
                class="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div
                class="dropdown-menu snooze-options"
                :aria-labelledby="'snooze-icon-'+mail.id"
                :id="'append-snooze-'+mail.id"
                style="
                  position: absolute;
                  transform: translate3d(111px, 0px, 0px);
                  top: 0px;
                  left: 0px;
                  will-change: transform;
                  z-index: 9999;
                "
              >
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-today-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <span>Later today</span>
                    <span class="snooze-later-today">In 3 hour</span>
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-tomorrow-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <span>Tomorrow</span>
                    <span class="snooze-tomorrow">2:00PM</span>
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-monday-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <span>Next Monday</span>
                    <span class="snooze-monday">9 am</span>
                  </div>
                </button>
                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-week-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <span>One Week</span>
                    <span class="snooze-week">Thu 9 am</span>
                  </div>
                </button>

                <button
                  class="
                    dropdown-item
                    snooze-drop-down snooze-time snooze-month-option
                  "
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <span>One month</span>
                    <span class="snooze-month">2:00PM</span>
                  </div>
                </button>

                <div
                  class="dropdown-item snooze-drop-down show-snooze-modal"
                  id="snooze-modal-thread-13627145"
                >
                  <span>Pick date &amp; time</span>
                </div>
              </div>
            </span>
          </span>
        </div>
      </div>
      <div class="row" style="padding-left: 20px">
        <div class="offset-lg-3 col-7 thread-attachments-list"></div>
      </div>
    </div>
    <div class="hw_compactThread w-100" style="color: #001737;">
      <div class="hw-tags-list mr-2">
        <span
                v-for="tag in mail.tags"
                :key="tag.id"
                style="
                  color: white;
                  margin-left: 0.125rem;
                  margin-right: 0.125rem;
                "
                :style="{ backgroundColor: tag.color }"
                class="badge hw-tag badge-pill hw-tag-204484"
                :data-tag_id="tag.id"
                data-mailbox_id="204420"
                >{{ tag.name }}</span
              >
      </div>
      <div
        class="d-flex align-items-center justify-content-between mg-b-2 w-100"
      >
        <span
          class="
            tx-12
            hw-thread-address
            d-flex
            justify-content-start
            align-items-center
            w-50
          "
          ><div class="flex-grow-1 w-100 d-flex thread-addr">
            <div
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: isRead ? '' : '600' }"
            >
              {{ Object.values(mail.email.from).toString() }}
            </div>
            <div
              class="text-primary ml-1"
              v-if="mail.hasDraft"
              style="max-width: 25%"
            >
              Draft
            </div>
            <div
              class="text-secondary ml-1 total-email-count"
              style="max-width: 10%"
            >
              {{ mail.totalEmailCount > 1 ? mail.totalEmailCount : "" }}
            </div>
          </div></span
        >
        <span class="tx-11 thread-date" :style="{ fontWeight: isRead ? '' : '600' }">{{
          mail.email.humanFriendlyDate
        }}</span>
      </div>
      <div
        class="tx-13 hw-thread-subject"
        style="
          width: 90%;
          white-space: nowrap;
          overflow: hidden !important;
          text-overflow: ellipsis;
        "
        :style="{ fontWeight: isRead ? '' : '600' }"
      >
        {{ mail.email.subject }}
      </div>
      <div
        class="d-flex align-items-center justify-content-between mg-b-2 w-100"
      >
        <p
          class="tx-12 tx-color-03 mg-b-0"
          style="
            width: 90%;
            white-space: nowrap;
            overflow: hidden !important;
            text-overflow: ellipsis;
          "
        >
          <span
            v-if="mail.snippetType == 'note'"
            style="color: #ddcf97"
            class="tx-bold tx-14 px-2 snippetMarker"
            >|</span
          >
          {{ mail.email.snippet }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
export default {
  name: "MailGroupSingleMail",
  props: {
    mail: Object,
  },
  data() {
    return {
      checkAll: false,
      isRead: this.mail.isRead,
      isStarred: this.mail.isStarred
    };
  },
  created() {
    bus.$on("checkAll", () => {
      this.checkAll = true;
    });
    bus.$on("unCheckAll", () => {
      this.checkAll = false;
    });
    bus.$on("changeStarred", (id) => {
      if(this.mail.id == id) {
        this.changeStarred(id);
      }
    });
    bus.$on("read", (data) => {
      // console.log(data);
      if(this.mail.id == data) {
        if(!this.isRead) {
          let threadIDs = new Array();
          threadIDs[0] = data;
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs }),
            credentials: 'include'
          };
          fetch(this.$apiBaseURL + "read-thread.php", requestOptions)
          .then(response => response.json())
          .then(data => (console.log(data)));
          this.isRead = !this.isRead
        }
      }
    });
    bus.$on("unread", (data) => {
      console.log(data);
      if(this.mail.id == data) {
        if(this.isRead) {
          let threadIDs = new Array();
          threadIDs[0] = data;
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs }),
            credentials: 'include'
          };
          fetch(this.$apiBaseURL + "unread-thread.php", requestOptions)
          .then(response => response.json())
          .then(data => (console.log(data)));
          this.isRead = !this.isRead
        }
      }
    });
  },
  methods: {
    changeRead(id) {
      let threadIDs = new Array();
      threadIDs[0] = id;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs }),
        credentials: 'include'
      };
      console.log(requestOptions.body);
      if(this.isRead) {
        fetch(this.$apiBaseURL + "unread-thread.php", requestOptions)
        .then(response => response.json())
        .then(data => (console.log(data)));
      } else {
        fetch(this.$apiBaseURL + "read-thread.php", requestOptions)
        .then(response => response.json())
        .then(data => (console.log(data)));
      }
      this.isRead = !this.isRead;
      this.mail.isStarred = !this.mail.isStarred;
    },
    changeStarred(id) {
      let threadIds = new Array();
      threadIds[0] = id;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mailboxId: this.$route.params.mailboxId, threadIds }),
        credentials: 'include'
      };
      console.log(requestOptions.body);
      let url = '';
      if(this.isStarred) {
        url = this.$apiBaseURL + "unstarThreads.php";
      } else {
        url = this.$apiBaseURL + "starThreads.php"
      }
      fetch(url, requestOptions)
      .then(async response => { 
        const data = await response.json();
        if(data.status !== "success") {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.isStarred = !this.isStarred;
        bus.$emit("chStarInArr", id);
      }).catch(error => {
          alert(error);
      })
    },
    closeThread(id) {
      bus.$emit('closeThread', id);
    }
  }
};
</script>

<style>
</style>