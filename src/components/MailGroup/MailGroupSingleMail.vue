<template>
  <div
    class="w-100 row media m-0 hw-thread media-body"
    :class="[this.mail.isRead ? 'read' : 'unread']"
    style="border-bottom: 1px solid #e5e9f2"
  >
    <div class="realtimeMarker"></div>
    <div class="hw_broadThread w-100" :style="{display: !isCompact ? block : none}">
      <div class="row align-items-center w-100" style="padding-left: 20px">
        <div
          class="col-3 d-flex justify-content-between align-items-center pl-0"
        >
          <div class="d-flex align-items-center">
            <div
              @click.stop
              class="custom-control hw_thread-selector custom-checkbox"
            >
              <input
                type="checkbox"
                v-model="checkAll"
                @click="checkBox"
                class="custom-control-input"
                :id="'thread-' + mail.id + '-selector'"
              />
              <label
                class="custom-control-label"
                :for="'thread-' + mail.id + '-selector'"
              ></label>
            </div>
            <div
              @click.stop="changeStarred(mail.id)"
              class="hw_starThread px-1 mr-1"
              :style="{ color: this.mail.isStarred ? '#f4b400' : '#8392a5' }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                :fill="this.mail.isStarred ? '#f4b400' : 'none'"
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
              v-if="mail.email.to !== undefined"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              To: {{ Object.keys(mail.email.to).length !== 0 ? Object.values(mail.email.to).toString() : '(no recipient)'}}
            </div>
            <div
              v-else-if="mail.email.from == undefined"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              (unknown sender)
            </div>
            <div
              v-else-if="this.$route.params.type == 'sent'"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              To: {{ Object.values(mail.email.to).toString() }}
            </div>
            <div
              v-else
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
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
                :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
              >
                {{ mail.email.subject ? mail.email.subject : "(no subject)" }}
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
            <div
              v-if="this.$route.params.type == 'sent' || mail.seenAt"
              class="col-6"
            >
              <div
                data-toggle="tooltip"
                :title="'Seen ' + seenAt"
                style="color: #8392a5"
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
                  class="feather feather-eye mr-2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2 date-thread-options col-lg-1">
          <span
            class="tx-13 thread-date"
            :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
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
            <span
              v-if="
                this.$route.params.type !== 'sent' &&
                this.$route.params.type !== 'closed' &&
                this.$route.params.type !== 'spam' &&
                this.$route.params.type !== 'trash'
              "
              class="read-unread-thread pl-1 pr-1 pt-1"
              @click.stop="changeRead(mail.id)"
            >
              <i
                v-if="!this.mail.isRead"
                class="far fa-envelope-open"
                data-toggle="tooltip"
                data-placement="top"
                title="Read"
                style="font-size: 16px"
              ></i>
              <i
                v-if="this.mail.isRead"
                class="far fa-envelope"
                data-toggle="tooltip"
                data-placement="top"
                title="Unread"
                style="font-size: 16px"
              ></i> </span
            ><span
              v-if="
                this.$route.params.type !== 'closed' &&
                this.$route.params.type !== 'trash'
              "
              class="archive-thread pr-1 pl-1"
              @click.stop="closeThread(mail.id)"
            >
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
              </svg>
            </span>
            <span
              @click.stop="showSnooze"
              class="snooze-thread pr-1 pl-1 dropright"
              :class="show && 'show'"
              data-toggle="tooltip"
              data-placement="top"
              title="Snooze"
              data-original-title="Snooze"
            >
              <svg
                :id="'snooze-icon-' + mail.id"
                type="button"
                class="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                :aria-expanded="show ? 'true' : 'false'"
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
                :style="{
                  display: show ? 'block' : 'none',
                  transform: show && 'translate3d(-217px, 31px, 0px)',
                }"
                :aria-labelledby="'snooze-icon-' + mail.id"
                :id="'append-snooze-' + mail.id"
                style="
                  position: absolute;
                  transform: translate3d(111px, 0px, 0px);
                  top: 0px;
                  left: 0px;
                  will-change: transform;
                  z-index: 9999;
                  display: block;
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
                    @click.stop="snoozeThread('later today', mail.id)"
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
                    @click.stop="snoozeThread('tommorrow', mail.id)"
                  >
                    <span>Tomorrow</span>
                    <span class="snooze-tomorrow"
                      >{{ new Date() | moment("add", "1 day", "ddd") }} 9
                      am</span
                    >
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
                    @click.stop="snoozeThread('nextMon', mail.id)"
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
                    @click.stop="snoozeThread('oneWeek', mail.id)"
                  >
                    <span>One Week</span>
                    <span class="snooze-week">{{
                      new Date() | moment("add", "1 week", "ddd h a")
                    }}</span>
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
                    @click.stop="snoozeThread('oneMonth', mail.id)"
                  >
                    <span>One month</span>
                    <span class="snooze-month">{{
                      new Date() | moment("add", "1 month", "DD MMM")
                    }}</span>
                  </div>
                </button>

                <div
                  v-b-modal="'snooze-thread-modal' + mail.id"
                  class="dropdown-item snooze-drop-down show-snooze-modal"
                  :id="'snooze-modal-thread-' + mail.id"
                >
                  <span>Pick date &amp; time</span>
                </div>
                <b-modal
                  :id="'snooze-thread-modal' + mail.id"
                  :ref="'snooze-thread-modal' + mail.id"
                  size="sm"
                  title="Pick Date & Time"
                  hide-footer="true"
                >
                  <div class="modal-body">
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <date-picker
                        :open.sync="newDateOpen"
                        @change="handleChange"
                        type="datetime"
                        v-model="datetime"
                        value-type="timestamp"
                        :minute-step="30"
                        :showSecond="false"
                        :default-value="
                          new Date().setHours(
                            new Date().getHours() + 1,
                            0,
                            0,
                            0
                          )
                        "
                        :disabled-date="notBeforeToday"
                        :disabled-time="notBeforeNow"
                        placeholder="Select Date & Time"
                        :clearable="false"
                      ></date-picker>
                    </div>
                    <div
                      class="d-flex align-items-center justify-content-center"
                      style="margin-top: 10px"
                    >
                      <button
                        type="button"
                        @click.stop.prevent="snoozeThread('newDate', mail.id)"
                        class="btn btn-xs btn-primary bulk-select-snooze-btn"
                        :disabled="datetime == '' && true"
                      >
                        Snooze
                      </button>
                    </div>
                  </div>
                </b-modal>
              </div>
            </span>
            <span
              v-if="
                this.$route.params.type == 'closed' ||
                this.$route.params.type == 'spam' ||
                this.$route.params.type == 'trash'
              "
              class="restore-thread pr-1 pl-1"
              @click.stop="restoreThread(mail.id)"
            >
              <svg
                data-toggle="tooltip"
                data-placement="top"
                title="Move To Inbox"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-original-title="Move to Inbox"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path
                  d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                ></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
      <div class="row" style="padding-left: 20px" v-if="mail.email.attachments.length > 0">
        <div class="offset-lg-3 col-7 thread-attachments-list">
          <a v-for="file in mail.email.attachments" :key="file.id"
            target="_blank"
            :href='"https://app.helpwise.io/attachments/" + file.id'
            class="hw-thread-attachment ml-1 mr-1"
            onclick="event.stopPropagation()"
            ><div class="d-flex w-100 justify-content-start align-items-center">
              <span v-html="getFileIcon(file.extension, file.filesize)"></span>
              <div class="mg-l-10 text-truncate" style="width: 90%">
                {{file.filename}}
              </div>
            </div></a
          >
        </div>
      </div>
    </div>
    <div class="hw_compactThread w-100" style="color: #001737">
      <div class="hw-tags-list mr-2">
        <span
          v-for="tag in mail.tags"
          :key="tag.id"
          style="color: white; margin-left: 0.125rem; margin-right: 0.125rem"
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
              v-if="mail.email.from == undefined"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              (unknown sender)
            </div>
            <div
              v-else-if="this.$route.params.type == 'sent'"
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
            >
              To: {{ Object.values(mail.email.to).toString() }}
            </div>
            <div
              v-else
              class="text-truncate thread-addr-main"
              style="max-width: 90%"
              :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
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
        <span
          class="tx-11 thread-date"
          :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
          >{{ mail.email.humanFriendlyDate }}</span
        >
      </div>
      <div
        class="tx-13 hw-thread-subject"
        style="
          width: 90%;
          white-space: nowrap;
          overflow: hidden !important;
          text-overflow: ellipsis;
        "
        :style="{ fontWeight: this.mail.isRead ? '' : '600' }"
      >
        {{ mail.email.subject ? mail.email.subject : "(no subject)" }}
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
        <span v-if="mail.email.attachments.length > 0"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg><span>
        </span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../../main";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "MailGroupSingleMail",
  components: { DatePicker },
  props: {
    mail: Object,
    isCompact: Boolean
  },
  data() {
    return {
      checkAll: false,
      // isRead: this.mail.isRead,
      // isStarred: this.mail.isStarred,
      show: false,
      datetime: "",
      newDateOpen: false,
    };
  },
  created() {
    bus.$on("check", (id, check) => {
      if (check == true && (id == 1 || id == this.mail.id)) {
        // console.log(data);
        this.checkAll = true;
      } else if (check == false && (id == 1 || id == this.mail.id)) {
        // console.log(data);
        this.checkAll = false;
      }
    });
    // bus.$on("changeStarred", (id) => {
    //   if(this.mail.id == id) {
    //     this.changeStarred(id);
    //   }
    // });
    // bus.$on("read", (data) => {
    //   // console.log(data);
    //   if(this.mail.id == data) {
    //     if(!this.isRead) {
    //       let threadIDs = new Array();
    //       threadIDs[0] = data;
    //       const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs }),
    //         credentials: 'include'
    //       };
    //       fetch(this.$apiBaseURL + "read-thread.php", requestOptions)
    //       .then(response => response.json())
    //       .then(data => (console.log(data)));
    //       this.isRead = !this.isRead
    //     }
    //   }
    // });
    // bus.$on("unread", (data) => {
    //   console.log(data);
    //   if(this.mail.id == data) {
    //     if(this.isRead) {
    //       let threadIDs = new Array();
    //       threadIDs[0] = data;
    //       const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ mailboxID: this.$route.params.mailboxId, threadIDs }),
    //         credentials: 'include'
    //       };
    //       fetch(this.$apiBaseURL + "unread-thread.php", requestOptions)
    //       .then(response => response.json())
    //       .then(data => (console.log(data)));
    //       this.isRead = !this.isRead
    //     }
    //   }
    // });
  },
  computed: {
    seenAt() {
      console.log(this.mail.seenAt);
      return moment(this.mail.seenAt).fromNow();
    },
  },
  methods: {
    getFileIcon(extension, size) {
        let iconStyle = '';
        if (size) {
            iconStyle = `style="height:${size}px;width:${size}px;"`;
        }

        let ext = extension.toString().toLowerCase();
        return `<span ${iconStyle} class="fiv-viv fiv-icon-blank fiv-icon-${ext}"></span>`;
    },
    checkBox() {
      this.checkAll = !this.checkAll;
      if (this.checkAll == true) {
        bus.$emit("check", this.mail.id, true);
      } else {
        bus.$emit("check", this.mail.id, false);
      }
    },
    handleChange(value, type) {
      if (type === "minute") {
        this.newDateOpen = false;
      }
    },
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    notBeforeNow(date) {
      return (
        date < new Date(new Date().setHours(new Date().getHours() + 1, 0, 0, 0))
      );
    },
    showSnooze() {
      this.show = !this.show;
    },
    snoozeThread(till, id) {
      console.log(till);
      var mom;
      if (till == "later today") {
        mom = moment(
          moment().add(3, "hours").format("YYYY-MM-DD hh:mm A"),
          "YYYY-MM-DD hh:mm A"
        );
      } else if (till == "tommorrow") {
        mom = moment(
          `${moment().add(1, "day").format("YYYY-MM-DD")} 09:00 am`,
          "YYYY-MM-DD hh:mm A"
        );
      } else if (till == "nextMon") {
        mom = moment(
          `${moment().day(8).format("YYYY-MM-DD ")} 09:00 am`,
          "YYYY-MM-DD hh:mm A"
        );
      } else if (till == "oneWeek") {
        mom = moment().add(1, "week").minutes(0);
      } else if (till == "oneMonth") {
        mom = moment(
          moment().add(1, "month").format("YYYY-MM-DD hh:mm"),
          "YYYY-MM-DD hh:mm A"
        );
      } else if (till == "newDate") {
        console.log(this.datetime);
        mom = new Date(this.datetime);
        this.datetime = "";
        let ref = "snooze-thread-modal" + this.mail.id;
        this.$refs[ref].hide();
      }
      console.log(mom.toISOString());
      bus.$emit("snoozeThread", id, mom);
      // bus.$emit("broad");
    },
    changeRead(id) {
      bus.$emit("changeRead", id);
    },
    changeStarred(id) {
      bus.$emit("changeStarred", id);
    },
    closeThread(id) {
      bus.$emit("closeThread", id);
    },
    restoreThread(id) {
      bus.$emit("restoreThreads", id);
    },
  },
};
</script>

<style>
</style>