<template>
  <div v-if="open">
    <div
      id="mailCompose"
      class="mail-compose hw_editor show"
      :class="normal && minimize ? 'shrink minimize' : normal && maximize ? '' : 'shrink'"
      style="z-index: 2147483001"
    >
      <div class="mail-compose-dialog mail-compose-dialog-shrink">
        <div class="mail-compose-header" @click.stop.prevent="minimize = !minimize" style="padding: 10px; cursor: pointer">
          <h6
            class="mail-compose-title tx-white flex-grow-1 w-50 text-truncate"
          >
            {{ message }}
          </h6>
          <nav
            class="
              nav nav-icon-only
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <a
              id="mailComposeMinimize"
              href=""
              class="nav-link nav-link-minimize d-none d-lg-block"
            >
              <svg
                v-if="!minimize"
                @click.stop.prevent="minimize = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minus"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <svg
                v-if="minimize"
                @click.stop.prevent="minimize = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-square"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </a>
            <a
              id="mailComposeShrink"
              href=""
              class="nav-link nav-link-shrink d-none d-lg-block"
            >
              <svg
                v-if="maximize"
                @click.stop.prevent="maximize = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minimize-2"
              >
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
              <svg
                v-if="!maximize"
                @click.stop.prevent="maximize = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-maximize-2"
              >
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </a>
            <a
              @click.stop.prevent="closeTweetCompose"
              id="mailComposeClose"
              href=""
              class="nav-link nav-link-close"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line></svg
            ></a>
          </nav>
        </div>
        <!-- mail-compose-header -->
        <div
          class="mail-compose-body"
          style="padding-top: 0px; padding-bottom: 10px"
        >
          <form class="form">
            <froala
              :tag="'textarea'"
              :config="config"
              v-model="tweet_compose_body"
              name="tweet_compose_body"
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
        <input
          type="file"
          style="display: none"
          name="files[]"
          @change="uploadAttachment"
          class="editor-uploadAttachment"
          multiple
        />
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
    </div>
  </div>
</template>

<script src="froala-editor/js/plugins/file.min.js"></script>
<script src="froala-editor/js/plugins/image.min.js"></script>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { bus } from "../main";
import FroalaEditor from "froala-editor";
import "froala-editor/js/plugins.pkgd.min";
import axios from "axios";
import _ from "underscore";
import AttachmentComp from "./AttachmentComp.vue";
import Vue from "vue";
export default {
  name: "TweetCompose",
  components: { DatePicker },
  data() {
    return {
      open: false,
      normal: true,
      minimize: false,
      maximize: false,
      item: null,
      message: "New Tweet",
      tweet_compose_body: "",
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
        height: "300px",
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
            editor.type = "tweetCompose";
            // editor.mailboxID = self.$route.params.mailboxId;
            self.editorInstance = this;
            console.log("initialized", self.editorInstance);
            console.log(this);
            let attchComp = Vue.extend(AttachmentComp);
            let replyAttachmentList = new attchComp({
              propsData: {
                attachments: self.attachments,
                type: "tweetCompose",
              },
            }).$mount();
            // var ed = $(`#editor-uploadAttachment`).data('editor');
            // console.log(editor, ed);
            editor.$wp.append(replyAttachmentList.$el);
            // ed.$wp.append(replyAttachmentList.$el);
          },
        },
        key: "fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==",
        toolbarButtons: ["attachTweetCompose", "scheduleReply", "clear"],
      },
    };
  },
  watch: {
    files: "saveDraft",
    tweet_compose_body: function (to, from) {
      console.log("tweetcomposebody");
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
    bus.$on("openTweetCompose", (data) => {
      console.log(data);
      this.open = true;
      if (data !== undefined) {
        this.item = data;
        this.threadID = data.threadId;
        this.draftID = data.id;
        this.tweet_compose_body = data.text;
        this.message = data.subject;
        this.attachments = data.attachments;
      }
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
          vueThis.sendMail(mom);
        },
      });
    },
    scheduleSend() {
      var mom = new Date(this.datetime);
      this.datetime = "";
      console.log(mom.toISOString());
      this.sendMail(mom);
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
    createBodyTwiiter(prop) {
      let from = this.$store.state.inboxData.address.split(":")[1];
      let to = this.$store.state.inboxData.address.split(":")[1];
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
      let html = this.tweet_compose_body;
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
          text: html,
          subject: html,
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
          text: html,
          subject: html,
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
      if (this.tweet_compose_body) {
        this.message = "Saving Draft";
        let requestOptions = this.createBody("draft");
        fetch(this.$apiBaseURL + "save-tweet-draft.php", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            requestOptions.body = JSON.parse(requestOptions.body);
            this.message = requestOptions.body.text;
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
    sendTweet(sendAt) {
      var self = this;
      console.log("sendingg");
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
      this.closeTweetCompose();
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
    closeTweetCompose(id) {
      // console.log(hash, this.composer.id, hash == this.composer.id);
      // this.show = false;
      // if(hash == this.composer.id) {
      this.item = null;
      this.open = false;
      this.message = "New Tweet";
      this.tweet_compose_body = "";
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
      this.normal = true,
      this.minimize = false,
      this.maximize = false,
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

<style scoped>
.btnn {
  font-size: 14px;
  color: white;
  /* padding: 7px; */
  border-radius: 5px;
  cursor: pointer;

  float: right;
  bottom: 17px;
  position: absolute;
  right: 40px;
}
</style>