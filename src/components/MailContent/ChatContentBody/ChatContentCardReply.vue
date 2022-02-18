<template>
  <div
    v-if="item !== null"
    class="
      mail-body
      card_compose
      hw-reply hw_editor
      card
      shadow-sm
      mb-2
      bg-white
    "
    id="reply-card"
    style="
      margin: 20px auto auto;
      max-width: 600px;
      padding-right: 1rem;
      border-radius: 10px;
      padding-left: 1rem;
    "
    :style="{ display: item == null ? 'none' : '' }"
  >
    <div class="d-flex justify-content-between">
      <div
        class="d-flex justify-content-start flex-grow-1"
        style="padding: 10px; padding-left: 0rem"
      >
        <div class="dropdown d-none">
          <span
            class="dropdown-toggle bg-white text-secondary"
            style="font-size: 13px"
            data-toggle="dropdown d-none"
          >
            <i id="reply-type-icon" class="fas fa-reply"></i>
          </span>
          <div class="dropdown-menu d-none">
            <button
              class="dropdown-item text-secondary"
              style="font-size: 13px"
              id="reply-state-btn-reply"
            >
              <i class="fas fa-reply"></i> Reply
            </button>
            <button
              class="dropdown-item text-secondary"
              style="font-size: 13px"
              id="reply-state-btn-reply-all"
            >
              <i class="fas fa-reply-all"></i> Reply All
            </button>
            <button
              class="dropdown-item text-secondary"
              style="font-size: 13px"
              id="reply-state-btn-forward"
            >
              <i class="fas fa-share"></i> Forward
            </button>
          </div>
        </div>
        <div class="reply-email-addresses flex-grow-1 ml-2">
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
          >
            <span class="hw-addr-label d-none">From:&nbsp;</span>
            <div class="email-from-container d-none">
              <select
                class="email-from select2-hidden-accessible"
                data-select2-id="1"
                tabindex="-1"
                aria-hidden="true"
              >
                <option
                  value="twitter:haritdagar"
                  data-email="twitter:haritdagar"
                  data-name="harit"
                  data-is-default="true"
                  selected=""
                  data-select2-id="3"
                >
                  harit &lt;twitter:haritdagar&gt;
                </option></select
              ><span
                class="select2 select2-container select2-container--default"
                dir="ltr"
                data-select2-id="2"
                style="width: auto"
                ><span class="selection"
                  ><span
                    class="select2-selection select2-selection--single"
                    role="combobox"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabindex="0"
                    aria-labelledby="select2-o8xq-container"
                    ><span
                      class="select2-selection__rendered"
                      id="select2-o8xq-container"
                      role="textbox"
                      aria-readonly="true"
                      title="harit <twitter:haritdagar>"
                      >harit &lt;twitter:haritdagar&gt;</span
                    ><span class="select2-selection__arrow" role="presentation"
                      ><b role="presentation"></b></span></span></span
                ><span class="dropdown-wrapper" aria-hidden="true"></span
              ></span>
            </div>
            <span id="reply-email-from" class="d-none">twitter:haritdagar</span>
          </div>
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
          >
            <span class="hw-addr-label d-none">To&nbsp;</span>
            <div id="reply-email-to" class="w-100 d-none">
              <div class="bootstrap-tagsinput">
                <span
                  class="
                    tag
                    m-1
                    tag-danger
                    rounded
                    tx-12
                    hw_emailEditorTag hw_val-eyJlbWFpbCI6IjAiLCJuYW1lIjoibiJ9
                  "
                  draggable="true"
                  >n (0)<span data-role="remove"></span
                ></span>
                <span
                  class="
                    tag
                    m-1
                    tag-danger
                    rounded
                    tx-12
                    hw_emailEditorTag hw_val-eyJlbWFpbCI6IjEiLCJuYW1lIjoibyJ9
                  "
                  draggable="true"
                  >o (1)<span data-role="remove"></span
                ></span>
                <span
                  class="twitter-typeahead"
                  style="position: relative; display: inline-block"
                  ><input
                    type="text"
                    class="tt-hint"
                    readonly=""
                    autocomplete="off"
                    spellcheck="false"
                    tabindex="-1"
                    dir="ltr"
                    style="
                      position: absolute;
                      top: 0px;
                      left: 0px;
                      border-color: transparent;
                      box-shadow: none;
                      opacity: 1;
                      background: none 0% 0% / auto repeat scroll padding-box
                        border-box rgba(0, 0, 0, 0);
                    " /><input
                    type="text"
                    placeholder=""
                    class="tt-input"
                    autocomplete="off"
                    spellcheck="false"
                    dir="auto"
                    style="
                      position: relative;
                      vertical-align: top;
                      background-color: transparent;
                    " />
                  <pre
                    aria-hidden="true"
                    style="
                      position: absolute;
                      visibility: hidden;
                      white-space: pre;
                      font-family: sans-serif;
                      font-size: 13px;
                      font-style: normal;
                      font-variant: normal;
                      font-weight: 400;
                      word-spacing: 0px;
                      letter-spacing: 0px;
                      text-indent: 0px;
                      text-rendering: auto;
                      text-transform: none;
                    "
                  ></pre>
                  <div
                    class="tt-menu"
                    style="
                      position: absolute;
                      top: 100%;
                      left: 0px;
                      z-index: 100;
                      display: none;
                    "
                  >
                    <div class="tt-dataset tt-dataset-contacts"></div></div
                ></span>
              </div>
              <input type="text" class="form-control" style="display: none" />
            </div>
          </div>
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
            style="display: none !important"
          >
            <span class="hw-addr-label d-none">Cc&nbsp;</span>
            <div id="reply-email-cc" class="w-100 d-none">
              <div class="bootstrap-tagsinput">
                <span
                  class="twitter-typeahead"
                  style="position: relative; display: inline-block"
                  ><input
                    type="text"
                    class="tt-hint"
                    readonly=""
                    autocomplete="off"
                    spellcheck="false"
                    tabindex="-1"
                    dir="ltr"
                    style="
                      position: absolute;
                      top: 0px;
                      left: 0px;
                      border-color: transparent;
                      box-shadow: none;
                      opacity: 1;
                      background: none 0% 0% / auto repeat scroll padding-box
                        border-box rgba(0, 0, 0, 0);
                    " /><input
                    type="text"
                    placeholder=""
                    class="tt-input"
                    autocomplete="off"
                    spellcheck="false"
                    dir="auto"
                    style="
                      position: relative;
                      vertical-align: top;
                      background-color: transparent;
                    " />
                  <pre
                    aria-hidden="true"
                    style="
                      position: absolute;
                      visibility: hidden;
                      white-space: pre;
                      font-family: sans-serif;
                      font-size: 13px;
                      font-style: normal;
                      font-variant: normal;
                      font-weight: 400;
                      word-spacing: 0px;
                      letter-spacing: 0px;
                      text-indent: 0px;
                      text-rendering: auto;
                      text-transform: none;
                    "
                  ></pre>
                  <div
                    class="tt-menu"
                    style="
                      position: absolute;
                      top: 100%;
                      left: 0px;
                      z-index: 100;
                      display: none;
                    "
                  >
                    <div class="tt-dataset tt-dataset-contacts"></div></div
                ></span>
              </div>
              <input type="text" class="form-control" style="display: none" />
            </div>
          </div>
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
            style="display: none !important"
          >
            <span class="hw-addr-label d-none">Bcc&nbsp;</span>
            <div id="reply-email-bcc" class="w-100 d-none">
              <div class="bootstrap-tagsinput">
                <span
                  class="twitter-typeahead"
                  style="position: relative; display: inline-block"
                  ><input
                    type="text"
                    class="tt-hint"
                    readonly=""
                    autocomplete="off"
                    spellcheck="false"
                    tabindex="-1"
                    dir="ltr"
                    style="
                      position: absolute;
                      top: 0px;
                      left: 0px;
                      border-color: transparent;
                      box-shadow: none;
                      opacity: 1;
                      background: none 0% 0% / auto repeat scroll padding-box
                        border-box rgba(0, 0, 0, 0);
                    " /><input
                    type="text"
                    placeholder=""
                    class="tt-input"
                    autocomplete="off"
                    spellcheck="false"
                    dir="auto"
                    style="
                      position: relative;
                      vertical-align: top;
                      background-color: transparent;
                    " />
                  <pre
                    aria-hidden="true"
                    style="
                      position: absolute;
                      visibility: hidden;
                      white-space: pre;
                      font-family: sans-serif;
                      font-size: 13px;
                      font-style: normal;
                      font-variant: normal;
                      font-weight: 400;
                      word-spacing: 0px;
                      letter-spacing: 0px;
                      text-indent: 0px;
                      text-rendering: auto;
                      text-transform: none;
                    "
                  ></pre>
                  <div
                    class="tt-menu"
                    style="
                      position: absolute;
                      top: 100%;
                      left: 0px;
                      z-index: 100;
                      display: none;
                    "
                  >
                    <div class="tt-dataset tt-dataset-contacts"></div></div
                ></span>
              </div>
              <input type="text" class="form-control" style="display: none" />
            </div>
          </div>
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
          >
            <span class="hw-addr-label d-none"> Subject&nbsp;</span>
            <span class="tx-color-01 flex-grow-1 d-none"
              ><input
                type="text"
                id="reply-email-subject"
                class="form-control-plaintext p-0 d-none"
                value=""
                style="outline: none"
            /></span>
          </div>
        </div>
        <div
          class="email-time-seen d-flex flex-column align-items-center"
        ></div>
      </div>
      <div
        class="d-flex justify-content-start align-items-start p-2"
        style="padding-right: 0rem !important"
      >
        <button
          id="reply-show-cc"
          tabindex="-1"
          class="btn btn-link p-1 d-none"
        >
          Cc
        </button>
        <button
          id="reply-show-bcc"
          tabindex="-1"
          class="btn btn-link p-1 d-none"
        >
          Bcc
        </button>
      </div>
    </div>
    <!-- <hr style="margin-top:15px;"> -->
    <div class="row">
      <div class="col-1 hw-avat" id="hw-avatar">
        <div
          class="avatar avatar mr-2"
          v-html="this.$store.state.userInfo.avatarTag"
        >
          <!-- <span
            class="avatar-initial rounded-circle"
            style="background-color: hsl(125, 32%, 64%)"
            >MM</span
          > -->
        </div>
      </div>
      <div class="col-11" style="padding-left: 4px">
        <div
          class="reply-editor-wrapper fr-basic fr-bottom"
          style="margin-top: 0px"
        >
          <div
            id="reply-email-editor"
            class="ht-150 mg-t-15 hw_summernote"
            style="display: none"
          ></div>
          <!-- <div class="note-editor note-frame card">
            <div class="note-dropzone">
              <div class="note-dropzone-message"></div>
            </div>
            <div
              class="note-toolbar card-header"
              role="toolbar"
              style="display: none"
            ></div>
            <div class="note-editing-area">
              <div class="note-handle">
                <div class="note-control-selection" style="display: none">
                  <div class="note-control-selection-bg"></div>
                  <div class="note-control-holder note-control-nw"></div>
                  <div class="note-control-holder note-control-ne"></div>
                  <div class="note-control-holder note-control-sw"></div>
                  <div class="note-control-sizing note-control-se"></div>
                  <div class="note-control-selection-info"></div>
                </div>
              </div>
              <textarea
                class="note-codable"
                role="textbox"
                aria-multiline="true"
              ></textarea>
              <div
                class="note-editable card-block"
                contenteditable="true"
                role="textbox"
                aria-multiline="true"
                spellcheck="true"
                style="min-height: 100px"
              >
                @haritdagar&nbsp;
              </div>
            </div>
            <output class="note-status-output" aria-live="polite"></output>
            <div class="note-statusbar" role="status">
              <output class="note-status-output" aria-live="polite"></output>
              <div
                class="note-resizebar"
                role="seperator"
                aria-orientation="horizontal"
                aria-label="Resize"
              >
                <div class="note-icon-bar"></div>
                <div class="note-icon-bar"></div>
                <div class="note-icon-bar"></div>
              </div>
            </div>
          </div> -->
          <form class="form">
            <froala
              :tag="'textarea'"
              :config="config"
              v-model="reply_body"
              name="reply_body"
            ></froala>
            <button
              @click.stop.prevent="sendMail"
              class="btnn btn btn-sm btn-primary fr-bt"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <input
        type="file"
        style="display: none"
        name="files[]"
        @change="uploadAttachment"
        class="editor-uploadAttachment"
        multiple
      />
    </div>
    <b-modal
      id="schedule-send-modal"
      ref="schedule-send-modal"
      size="sm"
      title="Pick Date & Time"
      hide-footer
    >
      <div class="modal-body">
        <div class="d-flex align-items-center justify-content-center">
          <date-picker
            :open.sync="newDateOpen"
            @change="handleChange"
            type="datetime"
            v-model="datetime"
            value-type="timestamp"
            :minute-step="30"
            :showSecond="false"
            :default-value="
              new Date().setHours(new Date().getHours() + 1, 0, 0, 0)
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
            @click.stop.prevent="scheduleSend()"
            class="btn btn-xs btn-primary bulk-select-snooze-btn"
            :disabled="datetime == '' && true"
          >
            Snooze
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script src="froala-editor/js/plugins/file.min.js"></script>
<script src="froala-editor/js/plugins/image.min.js"></script>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { bus } from "../../../main";
import FroalaEditor from "froala-editor";
import "froala-editor/js/plugins.pkgd.min";
import axios from "axios";
import _ from "underscore";
import AttachmentComp from "../../AttachmentComp.vue";
import Vue from "vue";
export default {
  name: "ChatContentCardReply",
  components: { DatePicker },
  data() {
    return {
      item: null,
      reply_body: "",
      attachments: {},
      files: [],
      draftID: null,
      threadID: null,
      mailboxID: this.$store.state.inboxData.id,
      inReplyTo: null,
      editorInstance: null,
      datetime: "",
      newDateOpen: false,
      config: {
        enter: FroalaEditor.ENTER_DIV,
        charCounterCount: false,
        toolbarBottom: true,
        border: "none",
        height: "120px",
        imageUploadParam: "files[]",
        imageUploadURL:
          "https://app.helpwise.io/api/uploadInlineAttachment.php",
        imageUploadParams: {
          mailboxID: this.$route.params.mailboxId,
          // emailID: this.emailID,
        },
        imageUploadMethod: "POST",
        imageAllowedTypes: ["jpeg", "jpg", "png"],
        imagePasteProcess: true,
        imageDefaultAlign: "left",
        pastePlain: true,
        requestWithCredentials: true,
        events: {
          initialized: async function () {
            // self.editorInstance.composer = self.composer;
            var editor = this;
            // editor.composer = self.composer;
            editor.type = "replyCard";
            // editor.mailboxID = self.$route.params.mailboxId;
            self.editorInstance = this;
            console.log("initialized", self.editorInstance);
            console.log(this);
            let attchComp = Vue.extend(AttachmentComp);
            let replyAttachmentList = new attchComp({
              propsData: {
                attachments: self.attachments,
                type: "replyCard",
              },
            }).$mount();
            // var ed = $(`#editor-uploadAttachment`).data('editor');
            // console.log(editor, ed);
            editor.$wp.append(replyAttachmentList.$el);
            // ed.$wp.append(replyAttachmentList.$el);
          },
        },
        key: "fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==",
        toolbarButtons: ["attachCardReply", "scheduleReply", "clear"],
      },
    };
  },
  watch: {
    files: "saveDraft",
    inReplyTo: "saveDraft",
    reply_body: function (to, from) {
      console.log("replycardbody");
      if (to !== from) {
        clearTimeout(this.myGreeting);
        this.myGreeting = setTimeout(this.saveDraft, 2000);
      }
    },
  },
  beforeMount() {
    this.prepareFroalaButtons();
  },
  created() {
    bus.$on("scheduleTweet", (data) => {
      console.log(data);
      this.sendMail(data);
    });
    bus.$on("openCardReply", (data) => {
      console.log(data);
      this.item = data;
      this.threadID = data.data.threadId;
      this.inReplyTo = data.data.id;
    });
    bus.$off("deleteAttachmentUpload");
    bus.$on("deleteAttachmentUpload", (id) => {
      console.log("event listenedd", id);
      Vue.delete(this.attachments, id);
      this.attachments = this.attachments.filter((i) => i.id !== id);
      console.log(this.attachments, this.files);
    });
  },
  methods: {
    prepareFroalaButtons() {
      const vueThis = this;
      FroalaEditor.DefineIcon("scheduleReply", {
        NAME: "clock",
        SVG_KEY: "clock",
      });
      FroalaEditor.RegisterCommand("scheduleReply", {
        title: "Schedule Reply",
        type: "dropdown",
        focus: false,
        undo: false,
        refreshAfterCallback: true,
        options: {
          1: "Later today (In 3 hour)",
          2: "Tomorrow (9 am)",
          3: "Next Monday (9 am)",
          4: "One week",
          5: "One month",
          6: "Pick date & time",
        },
        callback: function (cmd, val) {
          console.log(val);
          var mom;
          if (val == 1) {
            mom = moment(
              moment().add(3, "hours").format("YYYY-MM-DD hh:mm A"),
              "YYYY-MM-DD hh:mm A"
            );
          } else if (val == 2) {
            mom = moment(
              `${moment().add(1, "day").format("YYYY-MM-DD")} 09:00 am`,
              "YYYY-MM-DD hh:mm A"
            );
          } else if (val == 3) {
            mom = moment(
              `${moment().day(8).format("YYYY-MM-DD ")} 09:00 am`,
              "YYYY-MM-DD hh:mm A"
            );
          } else if (val == 4) {
            mom = moment().add(1, "week").minutes(0);
          } else if (val == 5) {
            mom = moment(
              moment().add(1, "month").format("YYYY-MM-DD hh:mm"),
              "YYYY-MM-DD hh:mm A"
            );
          } else if (val == 6) {
            // console.log(this.datetime);
            // mom = new Date(this.datetime);
            // this.datetime = "";
            vueThis.$refs["schedule-send-modal"].show();
          }
          console.log(mom.toISOString());
          bus.$emit("scheduleTweet", mom);
        },
      });
    },
    scheduleSend() {
      var mom = new Date(this.datetime);
      this.datetime = "";
      console.log(mom.toISOString());
      bus.$emit("scheduleTweet", mom);
      this.$refs["schedule-send-modal"].hide();
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
    createBody(prop) {
      let from = {};
      // from[] = this.$store.state.userInfo.firstname + this.$store.state.userInfo.lastname;
      let to = this.item.data.from;
      let bcc = {};
      let cc = {};
      // let files = [];
      // for (let i = 0; i < this.tagsTo.length; i++) {
      //   if (this.tagsTo[i].name == undefined) {
      //     to[this.tagsTo[i].email] = this.tagsTo[i].email;
      //   } else {
      //     to[this.tagsTo[i].email] = this.tagsTo[i].name;
      //   }
      // }
      // for (let i = 0; i < this.tagsBCC.length; i++) {
      //   if (this.tagsBCC[i].name == undefined) {
      //     bcc[this.tagsBCC[i].email] = this.tagsBCC[i].email;
      //   } else {
      //     bcc[this.tagsBCC[i].email] = this.tagsBCC[i].name;
      //   }
      // }
      // for (let i = 0; i < this.tagsCC.length; i++) {
      //   if (this.tagsCC[i].name == undefined) {
      //     cc[this.tagsCC[i].email] = this.tagsCC[i].email;
      //   } else {
      //     cc[this.tagsCC[i].email] = this.tagsCC[i].name;
      //   }
      // }
      let html = this.reply_body;
      var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g");
      html = html.replace(re1, "");
      console.log(html);
      html = html.replace(/(<([^>]+)>)/gi, "");
      console.log(html);
      let body;
      if (this.draftID == null) {
        body = {
          mailboxID: this.mailboxID,
          bcc,
          cc,
          files: this.files,
          from,
          to,
          inReplyTo: this.inReplyTo,
          replyAll: false,
          threadID: this.threadID,
          html,
        };
      } else {
        body = {
          mailboxID: this.mailboxID,
          bcc,
          cc,
          files: this.files,
          from,
          to,
          threadID: this.threadID,
          draftID: this.draftID,
          inReplyTo: this.inReplyTo,
          replyAll: false,
          html,
        };
      }
      // let text = html.replace(/(<([^>]+)>)/gi, "");
      // // console.log(text);
      // html &&
      //   (body.html = `<div class=\"hwEmailWrapper\" style=\"font-family:sans-serif;font-size:0.875rem;color:#001737\">${html}</div>`);
      // text && (body.text = text);
      if (prop == "send") {
        if (this.$store.state.userSettings.send == "send") {
          body.archive = false;
        } else {
          body.archive = true;
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      };
      console.log(requestOptions.body);
      return requestOptions;
    },
    saveDraft() {
      // this.getUserSignature();
      const vueThis = this;
      if (this.reply_body) {
        let requestOptions = this.createBody("draft");
        let url;
        if (this.item.type == "twitter") {
          url = this.$apiBaseURL + "save-tweet-draft.php";
        } else if (this.item.type == "fb-feed") {
          url = this.$apiBaseURL + "save-draft-test.php";
        }
        fetch(url, requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.draftID = data.data.draftID;
            this.threadID = data.data.threadID;
            self.editorInstance.draftID = data.data.draftID;
            self.editorInstance.mailboxID = this.mailboxID;
            self.editorInstance.threadID = data.data.threadID;
            console.log(
              this.editorInstance,
              self.editorInstance,
              vueThis.editorInstance
            );
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    sendMail(sendAt) {
      var self = this;
      console.log("sendingg");
      // if (this.tagsTo.length == 0) {
      //   this.noTo = true;
      //   return;
      // }
      // for (let i = 0; i < this.tagsTo.length; i++) {
      //   if (this.tagsTo[i].tiClasses.includes("ti-invalid")) {
      //     this.noTo = false;
      //     this.toNotValid = true;
      //     break;
      //   }
      // }
      // for (let i = 0; i < this.tagsCC.length; i++) {
      //   if (this.tagsCC[i].tiClasses.includes("ti-invalid")) {
      //     this.ccNotValid = true;
      //     break;
      //   }
      // }
      // for (let i = 0; i < this.tagsBCC.length; i++) {
      //   if (this.tagsBCC[i].tiClasses.includes("ti-invalid")) {
      //     this.bccNotValid = true;
      //     break;
      //   }
      // }
      // if (this.toNotValid || this.ccNotValid || this.bccNotValid) return;
      let requestOptions = this.createBody("send");
      requestOptions.body = JSON.parse(requestOptions.body);
      if (sendAt !== undefined) {
        requestOptions.body["sendAt"] = sendAt;
      }
      console.log(requestOptions.body);
      // fetch(this.$apiBaseURL + "send-tweet.php", requestOptions)
      //   .then(async (response) => {
      //     const data = await response.json();
      //     if (data.status !== "success") {
      //       const error = (data && data.message) || response.status;
      //       return Promise.reject(error);
      //     }
      let payload = {};
      let html = this.reply_body;
      var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g");
      html = html.replace(re1, "");
      html = html.replace(/(<([^>]+)>)/gi, "");
      console.log(html);
      if (this.item.type == "twitter") {
        // payload['id'] = data.data.messageID;
        payload["id"] = this.draftID;
        payload["threadId"] = this.threadID;
        payload["text"] = html;
        payload["snippet"] = this.reply_body;
        payload["img"] = this.item.data.user;
        payload["attachments"] = this.attachments;
        payload["from"] = {};
        payload["from"][Object.keys(this.item.data.from).toString()] =
          this.$store.state.userInfo.firstname +
          this.$store.state.userInfo.lastname;
        payload["date"] = new Date().toISOString();
        payload["isLiked"] = "0";
        payload["isRetweeted"] = "0";
        payload["timestamp"] = Date.now();
        payload["type"] = "twitter";
      } else {
        console.log(requestOptions.body, requestOptions.body["html"]);
        // payload['id'] = data.data.messageID;
        payload["id"] = this.draftID;
        payload["threadId"] = this.threadID;
        payload["text"] = html;
        payload["attachments"] = this.attachments;
        payload["date"] = new Date().toISOString();
        payload["sentBy"] = this.$store.state.userInfo;
        payload["isPost"] = false;
        payload["type"] = "fb-feed";
      }
      // payload.subject = this.subject;
      // payload.displaySubject = this.subject;
      // payload.from = requestOptions.body.from;
      // payload.bcc = requestOptions.body.bcc;
      // payload.cc = requestOptions.body.cc;
      // payload.to = requestOptions.body.to;
      // payload.html = requestOptions.body.html;
      // payload.strippedHtml = requestOptions.body.html;
      // payload.text = requestOptions.body.text;
      // payload.snippet = requestOptions.body.text;
      // payload.readStats = {};
      // payload.attachments = requestOptions.body.attachments;
      // payload.date = new Date().toISOString();
      console.log(payload);
      let itm = {
        item: payload,
        type: "item",
      };
      bus.$emit("changeThreadAttrs", itm);
      this.closeCompose(this.draftID);
      // this.show = false;
      // this.undoMessage = data.message;
      // $("#undo-txt").text(data.message);
      // this.showUndo = true;
      // this.undoInterval = setInterval(function () {
      //   console.log(1);
      //   self.undoTimer -= 1;
      // }, 1000);
      // this.undoTimeout = setTimeout(() => {
      //   console.log(2);
      //   clearInterval(self.undoInterval);
      //   self.showUndo = false;
      //   self.closeCompose(self.composer.hash);
      //   self.undoTimer = self.$store.state.userSettings.undoTimer;
      // }, self.$store.state.userSettings.undoTimer*1000);
      // clearTimeout(this.undoInterval);
      // })
      // .catch((error) => {
      //   alert(error);
      // });
    },
    uploadAttachment(event) {
      const selectedFiles = event.target.files;
      console.log(selectedFiles);
      const vueThis = this;
      for (let i = 0; i < selectedFiles.length; i++) {
        let selectedFile = selectedFiles[i];
        let hash = Date.now() + "-" + Math.floor(Math.random() * 100000000000);
        var formData = new FormData();
        formData.append("files[]", selectedFile);
        formData.append("mailboxID", vueThis.mailboxID);
        let attachmentObject = {
          filename: selectedFile["name"],
          filesize: selectedFile["size"],
          progress: 0,
          isUploaded: false,
          extension: "pdf",
        };

        vueThis.attachments[hash] = attachmentObject;
        Vue.delete(vueThis.attachments, hash);
        vueThis.attachments[hash] = attachmentObject;
        axios
          .request({
            method: "post",
            url: "https://app.helpwise.io/api/uploadAttachment.php",
            data: formData,
            withCredentials: true,
            onUploadProgress: function (p) {
              let percentage = (p.loaded / p.total) * 100;
              console.log(percentage);
              console.log(hash);
              console.log(vueThis.attachments);
              vueThis.attachments[hash]["progress"] = percentage;
            },
          })
          .then((response) => {
            //get the attachment id
            console.log(response);
            console.log(hash);

            let attachData = response.data.data.files[0];
            let attachID = attachData["id"];
            console.log(attachID, attachData, vueThis.attachments);
            vueThis.attachments[attachID] = vueThis.attachments[hash];
            Vue.delete(vueThis.attachments, hash);
            vueThis.attachments[attachID]["isUploaded"] = true;
            vueThis.attachments[attachID]["progress"] = 100;
            vueThis.attachments[attachID]["filehash"] = attachData["filehash"];
            vueThis.attachments[attachID]["filename"] = attachData["filename"];
            vueThis.attachments[attachID]["filesize"] = attachData["filesize"];
            vueThis.attachments[attachID]["mimeType"] = attachData["mimeType"];
            vueThis.attachments[attachID]["extension"] =
              attachData["extension"];
            vueThis.attachments[attachID]["id"] = attachID;
            vueThis.files.push(attachID);
            self.editorInstance.attachments = vueThis.attachments;
            console.log(vueThis.attachments, self.editorInstance);
          });
      }
    },
    closeCompose(id) {
      // console.log(hash, this.composer.id, hash == this.composer.id);
      // this.show = false;
      // if(hash == this.composer.id) {
      this.item = null;
      this.reply_body = "";
      this.files = [];
      this.attachments = {};
      // this.uploadingFiles = [];
      // this.filesMap = [];
      // this.tagTo = "";
      // this.tagCC = "";
      // this.tagBCC = "";
      // this.tagsTo = [];
      // this.tagsCC = [];
      // this.tagsBCC = [];
      // this.autocompleteItemsTo = [];
      // this.autocompleteItemsCC = [];
      // this.autocompleteItemsBCC = [];
      // this.toNotValid = false;
      // this.ccNotValid = false;
      // this.bccNotValid = false;
      // this.subject = "";
      this.threadID = null;
      this.draftID = null;
      this.inReplyTo = null;
      this.mailboxID = null;
      // this.message = "New Message";
      // this.mail_body = this.signature();
      // this.fromSelected = this.defaultAlias();
      // this.compose = this.compose.filter(el => Object.keys(el) !== hash);
      // bus.$emit("closeCompose", hash);
      // }
    },
  },
};
</script>

<style>
.btnn {
  font-size: 14px;
  color: white;
  /* padding: 7px; */
  border-radius: 5px;
  cursor: pointer;

  float: right;
  bottom: 8px;
  position: absolute;
  right: 20px;
}
</style>