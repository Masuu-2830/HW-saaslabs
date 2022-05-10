<template>
  <div>
    <div v-if="show" :id="`replyWindow-${reply.hash}`" class="replyWindow">
      <div class="replyBanner bg-primary tx-white d-none">
        <span class="msg"></span>
        <button class="btn editDraft tx-white float-right btn-sm py-0">
          Edit
        </button>
        <button class="btn doneDraft tx-white float-right btn-sm py-0">
          Done
        </button>
      </div>
      <div
        class="
          mail-body
          hw_editor
          replyWindowBody
          hideMoreEditingOptions
          card
          shadow-sm
          mb-2
          bg-white
          rounded
        "
      >
        <div class="replyMainWrapper" :class="!show && 'd-none'">
          <div class="d-flex justify-content-between">
            <div
              class="d-flex justify-content-start flex-grow-1"
              style="padding: 10px; padding-left: 0rem"
            >
              <div class="dropdown">
                <span
                  class="dropdown-toggle bg-white text-secondary"
                  style="font-size: 13px"
                  data-toggle="dropdown"
                >
                  <i v-if="type == 1" class="reply-type-icon fas fa-reply"></i>
                  <i
                    v-else-if="type == 2"
                    class="reply-type-icon fas fa-reply-all"
                  ></i>
                  <i v-else class="reply-type-icon fas fa-share"></i>
                </span>
                <div class="dropdown-menu">
                  <button
                    @click.prevent="replyy"
                    class="dropdown-item text-secondary reply-state-btn-reply"
                    style="font-size: 13px"
                  >
                    <i class="fa fa-reply mr-1"></i> Reply
                  </button>
                  <button
                    v-if="
              reply.email.cc !== undefined &&
              Object.keys(reply.email.cc).length !== 0
            "
                    @click.prevent="replyAll"
                    class="
                      dropdown-item
                      text-secondary
                      reply-state-btn-reply-all
                    "
                    style="font-size: 13px"
                  >
                    <i class="fas fa-reply-all"></i> Reply All
                  </button>
                  <button
                    @click.prevent="forward"
                    class="dropdown-item text-secondary reply-state-btn-forward"
                    style="font-size: 13px"
                  >
                    <i class="fas fa-share"></i> Forward
                  </button>
                </div>
              </div>
              <div class="reply-email-addresses flex-grow-1 ml-2">
                <div
                  :style="{
                    display: fromOptions.length > 1 ? 'block' : 'none',
                  }"
                  class="
                    mg-b-0
                    tx-13 tx-color-03
                    d-flex
                    flex-row
                    justify-content-start
                    align-items-center
                  "
                >
                  <span class="hw-addr-label">From:&nbsp;</span>
                  <div class="email-from-container">
                    <b-form-select v-model="fromSelected" class="mb-3">
                      <!-- <b-form-select-option value="vibhor@saaslabs.co">Masood &lt;vibhor@saaslabs.co&gt;</b-form-select-option>
                        <b-form-select-option value="vibhor@helpwise.io">Vibhor Agrawal &lt;vibhor@helpwise.io&gt;</b-form-select-option> -->
                      <b-form-select-option
                        v-for="fromOption in fromOptions"
                        :key="fromOption.id"
                        :value="fromOption"
                        >{{ fromOption.name }} &lt;{{
                          fromOption.email
                        }}&gt;</b-form-select-option
                      >
                    </b-form-select>
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
                  <span class="hw-addr-label">To&nbsp;</span>
                  <div class="reply-email-to w-100">
                    <vue-tags-input
                      v-model="tagTo"
                      :tags="tagsTo"
                      :autocomplete-items="autocompleteItemsTo"
                      :add-only-from-autocomplete="false"
                      :validation="validation"
                      :is-draggable="true"
                      @tag-order-changed="(newTags) => (tagsTo = newTags)"
                      @tags-changed="updateTo"
                      placeholder=""
                      style="z-index: 0; max-width: 100%"
                    >
                      <div
                        slot="autocomplete-item"
                        slot-scope="props"
                        class="my-item"
                        @click="props.performAdd(props.item)"
                      >
                        <div v-html="props.item.icon"></div>
                      </div>
                    </vue-tags-input>
                    <input
                      type="text"
                      class="form-control"
                      style="display: none"
                    />
                  </div>
                </div>
                <div
                  v-if="isCC"
                  class="
                    mg-b-0
                    tx-13 tx-color-03
                    d-flex
                    flex-row
                    justify-content-start
                    align-items-center
                  "
                >
                  <span class="hw-addr-label">Cc&nbsp;</span>
                  <div class="reply-email-cc w-100">
                    <!-- <div class="bootstrap-tagsinput">
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
                              background: none 0% 0% / auto repeat scroll
                                padding-box border-box rgba(0, 0, 0, 0);
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
                            <div
                              class="tt-dataset tt-dataset-contacts"
                            ></div></div
                        ></span>
                      </div> -->
                    <vue-tags-input
                      v-model="tagCC"
                      :tags="tagsCC"
                      :autocomplete-items="autocompleteItemsCC"
                      :add-only-from-autocomplete="false"
                      :validation="validation"
                      :is-draggable="true"
                      @tag-order-changed="(newTags) => (tagsCC = newTags)"
                      @tags-changed="updateCC"
                      placeholder=""
                      style="z-index: 0; max-width: 100%"
                    >
                      <div
                        slot="autocomplete-item"
                        slot-scope="props"
                        class="my-item"
                        @click="props.performAdd(props.item)"
                      >
                        <div v-html="props.item.icon"></div>
                      </div>
                    </vue-tags-input>
                    <input
                      type="text"
                      class="form-control"
                      style="display: none"
                    />
                  </div>
                </div>
                <div
                  v-if="isBCC"
                  class="
                    mg-b-0
                    tx-13 tx-color-03
                    d-flex
                    flex-row
                    justify-content-start
                    align-items-center
                  "
                >
                  <span class="hw-addr-label">Bcc&nbsp;</span>
                  <div class="reply-email-bcc w-100">
                    <!-- <div class="bootstrap-tagsinput">
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
                              background: none 0% 0% / auto repeat scroll
                                padding-box border-box rgba(0, 0, 0, 0);
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
                            <div
                              class="tt-dataset tt-dataset-contacts"
                            ></div></div
                        ></span>
                      </div> -->
                    <vue-tags-input
                      v-model="tagBCC"
                      :tags="tagsBCC"
                      :autocomplete-items="autocompleteItemsBCC"
                      :add-only-from-autocomplete="false"
                      :validation="validation"
                      :is-draggable="true"
                      @tag-order-changed="(newTags) => (tagsBCC = newTags)"
                      @tags-changed="updateBCC"
                      placeholder=""
                      style="z-index: 0; max-width: 100%"
                    >
                      <div
                        slot="autocomplete-item"
                        slot-scope="props"
                        class="my-item"
                        @click="props.performAdd(props.item)"
                      >
                        <div v-html="props.item.icon"></div>
                      </div>
                    </vue-tags-input>
                    <input
                      type="text"
                      class="form-control"
                      style="display: none"
                    />
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
                  <span class="hw-addr-label"> Subject&nbsp;</span>
                  <span class="tx-color-01 flex-grow-1"
                    ><input
                      type="text"
                      v-model="subject"
                      class="form-control-plaintext reply-email-subject p-0"
                      value=""
                      style="outline: none"
                  /></span>
                  <span v-html="message" style="color: green"></span>
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
                tabindex="-1"
                v-if="!isCC"
                @click.stop.prevent="showCC"
                class="btn btn-link p-1 reply-show-cc"
              >
                Cc
              </button>
              <button
                tabindex="-1"
                v-if="!isBCC"
                @click.stop.prevent="showBCC"
                class="btn btn-link p-1 reply-show-bcc"
              >
                Bcc
              </button>
              <button
                title="Pop out reply"
                data-toggle="tooltip"
                tabindex="-1"
                class="btn btn-link p-1 popoutReply"
                @click.stop.prevent="openInCompose"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-external-link"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  ></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
          <hr />
          <div class="reply-editor-wrapper">
            <form class="form">
              <froala
                :tag="'textarea'"
                :config="config"
                v-model="mail_body"
                name="mail_body"
              ></froala>
              <button
                @click.stop.prevent="sendMail('nil')"
                class="btnnn btn btn-sm btn-primary fr-bt"
                type="submit"
                :disabled="sending"
              >
                {{ isSend == "send" ? "Send" : "Send and Close" }}
              </button>
              <!-- <button style="height: 31px;position:absolute;right:0px;padding-top: 5px;margin-right:30px;margin-top: 9px;z-index:999999" class="btn btn-sm btn-primary fr-float-right fr-bt" id="reply-push-btn">Send</button> -->
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
        <div class="replyViewOnly"></div>
        <!-- <div
            class="replyLockMessage align-items-center justify-content-center"
          >
            <div
              role="alert"
              class="alert alert-warning text-center rounded w-50"
            ></div>
          </div> -->
        <!-- <div class="reply-attachment-list"></div> -->
        <div
          class="replyPoppedOutWrapper tx-12"
          :class="show && 'd-none'"
          style="padding: 20px"
        >
          You're editing this draft somewhere else.
          <br />
          Open
          <span
            ><button
              class="px-0 btn-link btn popinReply"
              @click.stop.prevent="openHere"
            >
              here
            </button></span
          >
        </div>
      </div>
    </div>
    <div
      class="card"
      id="undo-container"
      style="max-width: 100%; z-index: 9999999"
      :style="{ display: showUndo ? 'block' : 'none' }"
    >
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-center">
          <span id="undo-txt">{{ undoMessage }}</span>
          <span class="ml-2" id="undo-btn" @click="unsendMail"> Undo </span>
          <span id="email-timer" class="pd-l-10">{{ undoTimer }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="froala-editor/js/plugins/file.min.js"></script>
<script src="froala-editor/js/plugins/image.min.js"></script>
<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="50ffg2e7hq6kpnt"></script>
<script>
import { bus, triggerPromptNotif } from "../../../main";
import FroalaEditor from "froala-editor";
import "froala-editor/js/plugins.pkgd.min";
import VueTagsInput from "@vojtechlanka/vue-tags-input";
import axios from "axios";
import _ from "underscore";
import AttachmentComp from "../../AttachmentComp.vue";
import Vue from "vue";
import { firebase_app } from "../../../firebaseInit";
export default {
  name: "MailContentReply",
  components: { VueTagsInput, FroalaEditor },
  props: {
    reply: Object,
  },
  data() {
    const self = this;
    return {
      show: true,
      sending: false,
      type: this.reply.type,
      fromOptions: this.aliases(),
      fromSelected: this.defaultAlias(),
      attachments:
        this.reply.attachments !== undefined ? this.reply.attachments : {},
      files: [],
      showUndo: false,
      undoMessage: "Email Sent.",
      undoTimer: this.$store.state.userSettings.undoTimer,
      isSend: this.$store.state.userSettings.send,
      tagTo: "",
      tagsTo: this.tagsto(),
      autocompleteItemsTo: [],
      tagCC: "",
      tagsCC: this.tagscc(),
      autocompleteItemsCC: [],
      tagBCC: "",
      tagsBCC: this.tagsbcc(),
      autocompleteItemsBCC: [],
      validation: [
        {
          classes: "invalid-email",
          rule: (tag) => this.check(tag),
        },
      ],
      debounce: null,
      message: "",
      subject:
        this.reply.email.subject !== undefined ? this.reply.email.subject : "",
      mail_body: this.signature(),
      datetime: "",
      newDateOpen: false,
      noTo: false,
      toNotValid: false,
      ccNotValid: false,
      bccNotValid: false,
      isCC:
        this.reply.type == 2 && Object.keys(this.reply.email.cc).length > 0
          ? true
          : false,
      isBCC:
        this.reply.type == 2 && Object.keys(this.reply.email.bcc).length > 0
          ? true
          : false,
      draftID: this.reply.draftId !== undefined ? this.reply.draftId : null,
      threadID:
        this.reply.email.threadId !== undefined
          ? this.reply.email.threadId
          : this.$route.params.threadId,
      inReplyTo: this.reply.email.id !== undefined ? this.reply.email.id : null,
      editorInstance: null,
      typingReply: false,
      defaultTypingTimer: 1000,
      typingNotice: "",
      typingTimer: null,
      config: {
        enter: FroalaEditor.ENTER_DIV,
        placeholderText: "Type something",
        charCounterCount: false,
        toolbarBottom: true,
        height: "320px",
        imageUploadParam: "files[]",
        imageUploadURL:
          "https://app.helpwise.io/api/uploadInlineAttachment.php",
        imageUploadParams: {
          mailboxID: self.reply.mailboxId,
          emailID: this.threadID,
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
            editor.reply = self.reply;
            editor.type = "reply";
            editor.mailboxID = self.reply.mailboxId;
            editor.threadID = self.threadID;
            editor.draftID = self.draftID;
            self.editorInstance = this;

            let attchComp = Vue.extend(AttachmentComp);
            let replyAttachmentList = new attchComp({
              propsData: {
                attachments: self.attachments,
                html: self.reply.email.html,
                date: self.reply.email.date,
                type: "reply",
                from: self.reply.email.from,
              },
            }).$mount();
            // var ed = $(`#reply-uploadAttachment`).data('editor');
            editor.$wp.append(replyAttachmentList.$el);


            editor.events.on( "keydown", function (e) {
              console.log("typing in editor");
              // self.hitFirebase();
              if ( e.which == FroalaEditor.KEYCODE.ENTER && savedReplyTribute.isActive) {
                return false;
              }
            },true);

            // if (self.isSend) {
            //   editor.$tb.append(`
            //     <div class="fr-btn-grp fr-float-right">
            //       <button style="height: 31px;position:absolute;right:0px;padding-top: 5px;margin-right:20px;margin-top: 9px;z-index:999999" class="btn btn-sm btn-primary fr-float-right fr-bt" id="sendReply">Send</button>
            //     </div>`);
            // } else {
            //   editor.$tb.append(`
            //     <div class="fr-btn-grp fr-float-right">
            //       <button style="height: 31px;position:absolute;right:0px;padding-top: 5px;margin-right:20px;margin-top: 9px;z-index:999999" class="btn btn-sm btn-primary fr-float-right fr-bt" id="sendReply">Send and Close</button>
            //     </div>`);
            // }
            // ed.$wp.append(replyAttachmentList.$el);
          },
        },
        key: "fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==",
        toolbarButtons: {
          moreText: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
              "fontFamily",
              "fontSize",
              "textColor",
              "backgroundColor",
              "inlineClass",
              "inlineStyle",
              "clearFormatting",
            ],
            buttonsVisible: 0,
          },
          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "formatOLSimple",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
              "quote",
            ],
            buttonsVisible: 0,
          },
          moreRich: {
            buttons: [
              "insertLink",
              "insertImage",
              // "gdrive",
              // "Dropbox",
              // "box",
              // "OneDrive",
              // "EasyCalendar",
            ],
            buttonsVisible: 0,
          },
          moreMisc: {
            buttons: [
              "scheduleReply",
              "savedReplyMR",
              "hcArticleMR",
              "attachMailReply",
              "signatureBtn",
              "clear",
            ],
            buttonsVisible: "all",
          },
        },
        htmlAllowedTags: [".*"],
        htmlAllowedAttrs: [".*"],
        htmlRemoveTags: ["script"],
        quickInsertTags: [""],
      },
    };
  },
  created() {
    const vueThis = this;

    // $(document).off("click", "#sendReply");
    $(document).on("click", "#sendReply", function () {
      // alert("Send mail clicked");
      vueThis.sendMail("nil");
    });
    bus.$off("deleteAttachmentUpload");
    bus.$on("deleteAttachmentUpload", (id) => {
      Vue.delete(this.attachments, id);
      Vue.delete(this.files, id);
      this.files = this.files.filter((i) => i !== id);
    });
    // bus.$off("modal.hcArticleInsert.click");
    bus.$on("modal.hcArticleInsert.click", function (data, type) {
      if (type == "mailReply") {
        let editorInstance = vueThis.editorInstance;
        editorInstance.html.insert(vueThis.getArticleCard(data));
      }
    });

    // bus.$off("modal.savedReplyInsert.click");
    bus.$on("modal.savedReplyInsert.click", function (id, type) {
      if (type == "mailReply") {
        let editorInstance = vueThis.editorInstance;

        triggerPromptNotif("Fetching saved reply data");
        fetch(
          `https://app.helpwise.io/api/savedReplies/get?mailboxID=${vueThis.$store.state.inboxData.id}&savedReplyID=${id}`,
          { credentials: "include" }
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.status == "success") {
              editorInstance.html.insert(response.data.savedReply.content);
              triggerPromptNotif("Saved Reply Inserted", "success");
            } else {
              triggerPromptNotif("Unable to insert Saved Reply", "error");
            }
          });
      }
    });
  },
  watch: {
    tagTo: "initItemsTo",
    tagCC: "initItemsCC",
    tagBCC: "initItemsBCC",
    tagsTo: "saveDraft",
    tagsCC: "saveDraft",
    tagsBCC: "saveDraft",
    fromSelected: "saveDraft",
    files: "saveDraft",
    subject: function (to, from) {
      if (to !== from) {
        clearTimeout(this.subjectSave);
        this.subjectSave = setTimeout(this.saveDraft, 2000);
      }
    },
    mail_body: function (to, from) {
      if (to !== from) {
        clearTimeout(this.myGreeting);
        this.myGreeting = setTimeout(this.saveDraft, 2000);
      }
    },
  },
  beforeMount() {
    this.prepareFroalaButtons();
  },
  methods: {
    getArticleCardEmail(article) {
      let $imgHtml = "";
      let topBorder = "border-top: 2px solid #0847a0; border-radius: 2px;";
      let $articleCountHtml = "";
      if (article.featured_img) {
        $imgHtml = `
              <div style="height: 200px; width: 100%">
                  <img src="${article.featured_img}" style="height: 200px; width: 100%; margin-left: 0px; margin-right: 0px; max-width: 100%;"></img>
              </div>`;
        topBorder = "";
      } else if (article.icon) {
        topBorder = "";
        $articleCountHtml = `
                  <div style="padding: 5px 10px; background-color: #0847a0;">
                      <p style="font-size: 12px; color: white; margin: 0">This collection contains ${article.count} Articles</p>
                  </div>
              `;
      }

      // #0847a0 106af6
      return `
              <div class="hw_articleCard" id="hw_articleCard-${
                article.id
              }" contenteditable="false" style="
                  position: relative;display: flex;
                  flex-direction: column;
                  min-width: 0;
                  word-wrap: break-word;
                  background-color:#fff;
                  background-clip: border-box;
                  border: 1px solid rgba(72, 94, 144, 0.16);
                  border-radius: 0.25rem;
                  max-width: 50%;
                  width: fit-content;
              ">
                  <a href="${
                    article.url
                  }" target="_blank" contenteditable="false" style="color: inherit;text-decoration: none;display: block;${topBorder}" class="hw_articleCardBodyContainer">

                      <div class="hw_removeArticleCard" style="position: absolute;right: 5px;top: 5px; background: white; border-radius: 50%; padding: 3px; z-index: 1000; display:none; height: 18px; width:18px;">
                          <svg xmlns="http://www.w3.org/2000/svg" style="color: #566476;fill: rgba(27, 46, 75, 0.06); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x "><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </div>

                      ${$imgHtml}

                      <div class="hw_articleCardBody" style="padding-top: 10px;padding-bottom: 10px;padding-left: 20px;padding-right: 20px;flex-grow: 1;flex-shrink: 1;flex-basis: auto;">
                          <h6 class="hw_articleCardTitle" style="margin-bottom: 0.4rem;font-size: 0.875rem;font-weight: 600;line-height: 1.25;color:#0847a0;margin-top: 0; ${
                            article.icon ? "text-align: center" : ""
                          }">${article.title}</h6>
                          <p style="margin-top: 0; color:#9da8b7;" class="hw_articleCardText">${
                            article.description
                          }</p>
                      </div>

                      ${$articleCountHtml}
                  </a>
              </div>
              <div></div>
          `;
    },
    getArticleCard(article) {
      let $descHtml = "";
      if (article.description) {
        $descHtml = `<p style="margin-top: 0;" class="hw_articleCardText">${article.description}</p>`;
      }
      return `
          <div class="hw_articleCard" id="hw_articleCard-${article.id}" style="display: flex;flex-direction: row;word-wrap: break-word;background-color:#fff;border: 1px solid rgba(72, 94, 144, 0.16);border-radius: 0.25rem;width: fit-content;">
            <a href="${article.url}" target="_blank" contenteditable="false" style="color: inherit;text-decoration: none;display: block;" class="hw_articleCardBodyContainer">
              <div class="hw_articleCardBody" style="padding-top: 10px;padding-bottom: 10px;padding-left: 20px;padding-right: 20px;flex-grow: 1;flex-shrink: 1;flex-basis: auto;">
                <h6 class="hw_articleCardTitle" style="margin-bottom: 0.75rem;font-size: 0.875rem;font-weight: 600;line-height: 1.25;color:#001737;margin-top: 0;">${article.title}</h6>
                ${$descHtml}
              </div>
            </a>
            <div class="hw_removeArticle extraContentInEditor d-flex justify-content-center align-items-center">
              <button class="btn btn-light rounded-0 ht-100p bg-white pd-x-10" id="removeHCArticleCard">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
        `;
    },
    prepareFroalaButtons() {
      const vueThis = this;
      FroalaEditor.DefineIconTemplate(
        "font_awesome_5b",
        '<i class="fab fa-[FA5NAME]"></i>'
      );

      FroalaEditor.DefineIcon("savedReply", {
        FA5NAME: "bookmark",
        template: "font_awesome_5",
      });

      FroalaEditor.RegisterCommand("savedReplyMR", {
        // Button title.
        title: "Insert Saved Reply",
        // Mark the button as a dropdown.
        icon: "savedReply",
        refreshAfterCallback: true,
        callback: function () {
          this.selection.save();
          bus.$emit("savedReply", "mailReply");
          // $(".saved-replies-btn").click();
          // vueThis.$bvModal.show("saved-reply-modal");
        },
      });

      FroalaEditor.DefineIcon("hcArticle", {
        FA5NAME: "book",
        template: "font_awesome_5",
      });

      FroalaEditor.RegisterCommand("hcArticleMR", {
        title: "Insert Help Center Article",
        icon: "hcArticle",
        refreshAfterCallback: true,
        callback: function () {
          this.selection.save();
          let editor = this;
          vueThis.showHcModal = true;

          bus.$emit("hcArticles", "mailReply");
          // vueThis.$bvModal.show("helpcenterArticlesModal");
        },
      });
      FroalaEditor.DefineIcon("scheduleReply", {
        FA5NAME: "clock",
        template: "font_awesome_5",
      });
      FroalaEditor.RegisterCommand("scheduleReply", {
        title: "Schedule Reply",
        icon: "scheduleReply",
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
            // mom = new Date(this.datetime);
            // this.datetime = "";
            vueThis.$refs["schedule-send-modal"].show();
          }

          vueThis.sendMail(mom);
        },
      });
      FroalaEditor.DefineIcon("dropboxIcon", {
        SRC: require("../../../assets/dropbox.svg"),
        ALT: "Dropbox",
        template: "image",
      });
      FroalaEditor.RegisterCommand("Dropbox", {
        // Button title.
        title: "Insert from Dropbox",
        // Mark the button as a dropdown.
        icon: "dropboxIcon",
        refreshAfterCallback: true,
        callback: function () {
          // The current context is the editor instance.
          //console.warn(Dropbox.isBrowserSupported());
          Dropbox.choose({
            success: (files) => {
              function humanFileSize(bytes, si) {
                //{humanFileSize(file_data.size)}
                var thresh = si ? 1000 : 1024;
                if (Math.abs(bytes) < thresh) {
                  return bytes + " B";
                }
                var units = si
                  ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
                  : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
                var u = -1;
                do {
                  bytes /= thresh;
                  ++u;
                } while (Math.abs(bytes) >= thresh && u < units.length - 1);
                return bytes.toFixed(1) + " " + units[u];
              }

              let html = "";
              for (let file of files) {
                html += `<a href="${
                  file.link
                }" target="_blank" rel="nofollow">${file.name}
                    (${humanFileSize(file.bytes)})</a>&nbsp;`;
              }
              this.html.insert(html);
              this.message.push(html);
            },
            multiselect: true,
            folderselect: false,
          });
        },
      });
      FroalaEditor.DefineIcon("gdriveIcon", {
        SRC: require("../../../assets/google-drive.svg"),
        ALT: "GoogleDrive",
        template: "image",
      });
      FroalaEditor.RegisterCommand("gdrive", {
        // Button title.
        title: "Insert from Google Drive",
        // Mark the button as a dropdown.
        icon: "gdriveIcon",
        focus: "false",
        //refreshAfterCallback: true,
        callback: function () {
          function humanFileSize(bytes, si) {
            //{humanFileSize(file_data.size)}
            var thresh = si ? 1000 : 1024;
            if (Math.abs(bytes) < thresh) {
              return bytes + " B";
            }
            var units = si
              ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
              : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            var u = -1;
            do {
              bytes /= thresh;
              ++u;
            } while (Math.abs(bytes) >= thresh && u < units.length - 1);
            return bytes.toFixed(1) + " " + units[u];
          }
          const developerKey = "AIzaSyCdeUFrP4ZViYRPDPSvlxo1T6Agiep35TU";
          const clientId =
            "166235631936-ne7jkubvmci8k4rtcb870sj8ni9sjp17.apps.googleusercontent.com";
          const scope = "https://www.googleapis.com/auth/drive.readonly";
          let tokenPromise = new Promise((res, rej) => {
            gapi.load("auth2", () => {
              gapi.auth2
                .init({ client_id: clientId })
                .then(function (googleAuth) {
                  googleAuth.signIn({ scope }).then(function (authResult) {
                    let authResponse = authResult.getAuthResponse();
                    if (authResult && !authResult.error) {
                      res(authResponse.access_token);
                    } else {
                      rej();
                    }
                  });
                });
            });
          });
          gapi.load("picker", () => {
            tokenPromise.then((oauthToken) => {
              const picker = new google.picker.PickerBuilder()
                .addView(google.picker.ViewId.DOCS)
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setOAuthToken(oauthToken)
                .setDeveloperKey(developerKey)
                .setCallback((data) => {
                  if (data && data.docs) {
                    let html = "";
                    for (let doc of data.docs) {
                      html += `<a href="${
                        doc.url
                      }" target="_blank" rel="nofollow">${
                        doc.name
                      } (${humanFileSize(doc.sizeBytes)})</a>&nbsp;`;
                    }
                    this.html.insert(html);
                  }
                })
                .build();
              picker.setVisible(true);
            });
          });

          // The current context is the editor instance.
        },
      });

      FroalaEditor.DefineIcon("boxIcon", {
        SRC: require("../../../assets/boxlogo.png"),
        ALT: "Box",
        template: "image",
      });
      FroalaEditor.RegisterCommand("box", {
        // Button title.
        title: "Insert from box",
        // Mark the button as a dropdown.
        icon: "boxIcon",
        refreshAfterCallback: true,
        callback: function () {
          function humanFileSize(bytes, si) {
            //{humanFileSize(file_data.size)}
            var thresh = si ? 1000 : 1024;
            if (Math.abs(bytes) < thresh) {
              return bytes + " B";
            }
            var units = si
              ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
              : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            var u = -1;
            do {
              bytes /= thresh;
              ++u;
            } while (Math.abs(bytes) >= thresh && u < units.length - 1);
            return bytes.toFixed(1) + " " + units[u];
          }
          if (false) {
            window.open("https://app.helpwise.io/settings/integrations");
          } else {
            let _this = this;
            let selectionInEditor = this.selection.inEditor();
            if (selectionInEditor) {
              this.selection.save();
            }
            //$('#box-integration-modal').modal('show');
            // The current context is the editor instance.
            var filePicker = new Box.FilePicker();
            filePicker.addListener("choose", function (items) {
              //$('#box-integration-modal').modal('hide');
              let html = "";
              for (let item of items) {
                html += `<a href="${item.shared_link.url}" target="_blank" rel="nofollow">${item.name} 
                    ({{humanFileSize(item.size)}})</a>&nbsp;`;
              }
              if (selectionInEditor) {
                _this.el.focus();
              }
              _this.html.insert(html);
            });
            filePicker.addListener("cancel", function () {});
            filePicker.show("0", true, {
              //container: '.boxIntegration',
              //chooseButtonLabel: 'Select'
            });
          }
        },
      });

      FroalaEditor.DefineIcon("onedriveIcon", {
        SRC: require("../../../assets/onedrive.svg"),
        ALT: "oneDrive",
        template: "image",
      });
      FroalaEditor.RegisterCommand("OneDrive", {
        // Button title.
        title: "Insert from OneDrive",
        // Mark the button as a dropdown.
        icon: "onedriveIcon",
        refreshAfterCallback: true,
        callback: function () {
          function humanFileSize(bytes, si) {
            //{humanFileSize(file_data.size)}
            var thresh = si ? 1000 : 1024;
            if (Math.abs(bytes) < thresh) {
              return bytes + " B";
            }
            var units = si
              ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
              : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            var u = -1;
            do {
              bytes /= thresh;
              ++u;
            } while (Math.abs(bytes) >= thresh && u < units.length - 1);
            return bytes.toFixed(1) + " " + units[u];
          }
          var odOptions = {
            clientId: "aee0ce81-9085-4326-9b5f-2c5cf017485f",
            action: "share",
            multiSelect: true,
            viewType: "all",
            advanced: {
              endpointHint: "api.onedrive.com",
              redirectUri: "https://app.helpwise.io/onedrive.php",
            },
            success: (files) => {
              let files_data = files.value;
              let html = "";
              for (let file_data of files_data) {
                html += `<a href="${
                  file_data.permissions[0].link.webUrl
                }" target="_blank" rel="nofollow">${file_data.name} 
                    (${humanFileSize(file_data.size)})</a>&nbsp;`;
              }
              this.html.insert(html);
            },
            cancel: function () {},
            error: function (error) {},
          };
          OneDrive.open(odOptions);
        },
      });

      FroalaEditor.DefineIcon("EasyCalendarIcon", {
        SRC: require("../../../assets/easycalendar.svg"),
        ALT: "EasyCalendar",
        template: "image",
      });
      FroalaEditor.RegisterCommand("EasyCalendar", {
        title: "EasyCalendar",
        type: "dropdown",
        icon: "EasyCalendarIcon",
        options: {
          easycalendarObj: "Connect EasyCalendar",
        },
        // Callback.
        callback: function (cmd, val) {
          if (easycalendar.length == 0) {
            window.open("https://app.helpwise.io/settings/integrations");
          } else {
            $("#ec_slot").html("");
            if (val != "add_easy_calendar") {
              let _this = this;
              let selectionInEditor = this.selection.inEditor();
              if (selectionInEditor) {
                this.selection.save();
              }
              let html = `<a href="${val}" target="_blank" rel="nofollow">${val}</a>&nbsp;`;
              if (selectionInEditor) {
                _this.el.focus();
              }
              _this.html.insert(html);
            } else {
              let _this = this;
              $("#easy-calendar-integration-modal").modal("show");
              appendECdata(_this);
            }
          }
        },
        /*refreshOnShow: function ($btn, $dropdown) {
        var ab = $("ul").find(`[data-param1='add_easy_calendar']`);
        ab.attr('title', `Add time slots`);
        var abc = ab.parent();
        if (!abc.prev().is('hr')) {
            $(`<hr>`).insertBefore(abc);
        }
        for (var i = 0; i < easycalendar.length; i++) {
            var a = $("ul").find(`[data-param1='${easycalendar[i].calendar_url}']`);
            a.attr('title', `${easycalendar[i].calendar_url}`);
        }
    }*/
      });
    },
    scheduleSend() {
      var mom = new Date(this.datetime);
      this.datetime = "";

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
    cancelReply(hash) {
      this.isCC = false;
      this.isBCC = false;
      this.files = [];
      this.attachments = {};
      this.uploadingFiles = [];
      this.filesMap = [];
      this.tagTo = "";
      this.tagCC = "";
      this.tagBCC = "";
      this.tagsTo = [];
      this.tagsCC = [];
      this.tagsBCC = [];
      this.autocompleteItemsTo = [];
      this.autocompleteItemsCC = [];
      this.autocompleteItemsBCC = [];
      this.toNotValid = false;
      this.ccNotValid = false;
      this.bccNotValid = false;
      this.subject = "";
      this.threadID = null;
      this.draftID = null;
      this.message = "";
      this.mail_body = this.signature();
      this.fromSelected = this.defaultAlias();
      // this.compose = this.compose.filter(el => Object.keys(el) !== hash);
      bus.$emit("closeReply", hash);
    },
    hitFirebase() {
      let managerID = this.$store.state.userInfo.accountID;
      let threadID = this.$route.params.threadId;

      const socket = firebase_app.database().ref(`/Account-${managerID}/ThreadID-${threadID}`);
      console.log(`/Account-${managerID}/ThreadID-${threadID}`);
      if (!this.typingReply) {
        this.typingReply = true;
        socket.child(`/replying user/user-${this.$store.state.userInfo.id}`).off("value");
        socket.child(`/replying user/user-${this.$store.state.userInfo.id}`).set(this.$store.state.userInfo);
        this.startReplyingTimer(socket);
      } else {
        this.resetReplyingTimer(socket);
      }
    },
    startReplyingTimer(socket) {
      this.typingTimer = setTimeout(() => {
        this.typingReply = false;
        socket
          .child(`/replying user/user-${this.$store.state.userInfo.id}`)
          .remove();
      }, this.defaultTypingTimer);
    },
    resetReplyingTimer(socket) {
      clearTimeout(this.typingTimer);
      this.startReplyingTimer(socket);
    },
    // myGreeting() {
    //   setTimeout(this.saveDraft, this.doneTypingInterval);
    // },
    tagsto(prop) {
      let to = [];

      if (this.reply.type !== 3 && prop !== 3) {
        for (var key in this.reply.email.from) {
          let obj = {};
          obj["email"] = key;
          obj["name"] = this.reply.email.from[key];
          obj["text"] = this.reply.email.from[key] + " (" + key + ")";
          obj["tiClasses"] = ["ti-valid"];
          to.push(obj);
        }
        if (this.reply.type == 2 || prop == 2) {
          let aliases = this.aliases();
          if (this.$store.state.inboxData.type == "universal") {
            let alias = aliases[this.reply.mailboxId];
            console.log(alias, aliases)
            for (var key in this.reply.email.to) {
              if (!aliases.some((el) => el.email == key)) {
                let obj = {};
                obj["email"] = key;
                obj["name"] = this.reply.email.to[key];
                obj["text"] = this.reply.email.to[key] + " (" + key + ")";
                obj["tiClasses"] = ["ti-valid"];
                to.push(obj);
              }
            }
          } else {
            for (var key in this.reply.email.to) {
              if (!aliases.some((el) => el.email == key)) {
                let obj = {};
                obj["email"] = key;
                obj["name"] = this.reply.email.to[key];
                obj["text"] = this.reply.email.to[key] + " (" + key + ")";
                obj["tiClasses"] = ["ti-valid"];
                to.push(obj);
              }
            }
          }
        }
      }

      return to;
    },
    tagscc(prop) {
      let cc = [];

      if (this.reply.type == 2 || prop == 2) {
        let aliases = this.aliases();
        if (this.$store.state.inboxData.type == "universal") {
          let alias = aliases[this.reply.mailboxId];

          for (var key in this.reply.email.cc) {
            if (!aliases.some((el) => el.email == key)) {
              let obj = {};
              obj["email"] = key;
              obj["name"] = this.reply.email.cc[key];
              obj["text"] = this.reply.email.cc[key] + " (" + key + ")";
              obj["tiClasses"] = ["ti-valid"];
              cc.push(obj);
            }
          }
        } else {
          for (var key in this.reply.email.cc) {
            if (!aliases.some((el) => el.email == key)) {
              let obj = {};
              obj["email"] = key;
              obj["name"] = this.reply.email.cc[key];
              obj["text"] = this.reply.email.cc[key] + " (" + key + ")";
              obj["tiClasses"] = ["ti-valid"];
              cc.push(obj);
            }
          }
        }
      }

      if (cc.length > 0) {
        this.isCC = true;
      }
      return cc;
    },
    tagsbcc(prop) {
      let bcc = [];
      if (this.reply.type == 2 || prop == 2) {
        let aliases = this.aliases();

        if (this.$store.state.inboxData.type == "universal") {
          let alias = aliases[this.reply.mailboxId];

          for (var key in this.reply.email.to) {
            if (!aliases.some((el) => el.email == key)) {
              let obj = {};
              obj["email"] = key;
              obj["name"] = this.reply.email.bcc[key];
              obj["text"] = this.reply.email.bcc[key] + " (" + key + ")";
              obj["tiClasses"] = ["ti-valid"];
              bcc.push(obj);
            }
          }
        } else {
          for (var key in this.reply.email.bcc) {
            if (!aliases.some((el) => el.email == key)) {
              let obj = {};
              obj["email"] = key;
              obj["name"] = this.reply.email.bcc[key];
              obj["text"] = this.reply.email.bcc[key] + " (" + key + ")";
              obj["tiClasses"] = ["ti-valid"];
              bcc.push(obj);
            }
          }
        }
      }

      if (bcc.length > 0) {
        this.isBCC = true;
      }
      return bcc;
    },
    uploadAttachment(event) {
      const selectedFiles = event.target.files;

      const vueThis = this;
      for (let i = 0; i < selectedFiles.length; i++) {
        let selectedFile = selectedFiles[i];
        let hash = Date.now() + "-" + Math.floor(Math.random() * 100000000000);
        var formData = new FormData();
        formData.append("files[]", selectedFile);
        formData.append("mailboxID", vueThis.reply.mailboxId);
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

              vueThis.attachments[hash]["progress"] = percentage;
            },
          })
          .then((response) => {
            //get the attachment id

            let attachData = response.data.data.files[0];
            let attachID = attachData["id"];

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
            vueThis.editorInstance.attachments = vueThis.attachments;

            // let attchComp = Vue.extend(AttachmentComp);
            // let replyAttachmentList = new attchComp({
            //   propsData:{
            //     attachments: vueThis.attachments
            //   }
            // }).$mount();
            // // $('#editor-<>').data('editor',editor)
            // var ed = $(`#reply-uploadAttachment`).data('editor');

            // ed.$wp.append(replyAttachmentList.$el);
          });
      }
    },
    aliases() {
      return this.$store.state.fromAddresses.filter(
        (address) => address.mailboxId == this.reply.mailboxId
      );
    },
    defaultAlias() {
      let aliases = this.aliases();
      return aliases.find(alias => alias.isDefault);
      if (this.reply.from !== undefined) {
        // for(let i = 0; i < aliases.length; i++) {
        //   if(aliases[i].email == Object.keys(this.reply.from)) {
        //     return { id: i, email: aliases[i].email, name: aliases[i].name };
        //   }
        // }
      } else {
        if (this.$store.state.mailboxId == "me") {
          let addresses = aliases[this.reply.mailboxId];
          if (addresses) {
            for (let i = 0; i < addresses.length; i++) {
              if (addresses[i].isDefault) {
                return addresses[i];
              }
            }
          }
        } else {
          for (let i = 0; i < aliases.length; i++) {
            if (aliases[i].isDefault) {
              return { id: i, email: aliases[i].email, name: aliases[i].name };
            }
          }
        }
      }
      return {};
    },
    replyy() {
      this.tagsTo = this.tagsto(1);
      this.tagsCC = this.tagscc(1);
      this.tagsBCC = this.tagsbcc(1);
      this.type = 1;
    },
    replyAll() {
      this.tagsTo = this.tagsto(2);
      this.tagsCC = this.tagscc(2);
      this.tagsBCC = this.tagsbcc(2);
      this.type = 2;
    },
    forward() {
      this.tagsTo = this.tagsto(3);
      this.tagsCC = this.tagscc(3);
      this.tagsBCC = this.tagsbcc(3);
      this.type = 3;
    },
    signature() {
      if (this.reply.draftId && this.reply.email.html !== undefined) {
        return this.reply.email.html;
      }
      let signature = "";
      if (this.$store.state.userSignature) {
        signature = this.$store.state.userSignature.body;
      }
      if (!signature) return "";
      let body = signature.replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i, "$1");

      let html = "";
      let sign = `<div>${body}</div>`;
      html = `<br/>
                    <br/>
                    <div><div class="hw_signature rounded">
                    <div class="hw_attr">
                    <div class="pt-2 pb-2">
                        --
                        <br />
                        ${sign}
                        
                    </div>
                    </div>
                    </div>
                    </div>`;

      return html;
    },
    openHere() {
      this.show = true;
      bus.$emit("closeCompose", this.reply.hash);
    },
    openInCompose() {
      let email = {};
      let from = {};
      from[this.fromSelected.email] = this.fromSelected.name;
      let to = {};
      let bcc = {};
      let cc = {};
      for (let i = 0; i < this.tagsTo.length; i++) {
        if (this.tagsTo[i].name == undefined) {
          to[this.tagsTo[i].email] = this.tagsTo[i].email;
        } else {
          to[this.tagsTo[i].email] = this.tagsTo[i].name;
        }
      }
      for (let i = 0; i < this.tagsBCC.length; i++) {
        if (this.tagsBCC[i].name == undefined) {
          bcc[this.tagsBCC[i].email] = this.tagsBCC[i].email;
        } else {
          bcc[this.tagsBCC[i].email] = this.tagsBCC[i].name;
        }
      }
      for (let i = 0; i < this.tagsCC.length; i++) {
        if (this.tagsCC[i].name == undefined) {
          cc[this.tagsCC[i].email] = this.tagsCC[i].email;
        } else {
          cc[this.tagsCC[i].email] = this.tagsCC[i].name;
        }
      }
      email["from"] = from;
      email["to"] = to;
      email["cc"] = cc;
      email["bcc"] = bcc;
      email["subject"] = this.subject;
      email["threadID"] = this.threadID;
      email["inReplyTo"] = this.inReplyTo;
      email["id"] = this.draftID;
      let html = this.mail_body;
      var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g");
      html = html.replace(re1, "");
      email["html"] = html;
      this.show = false;
      bus.$emit("openCompose", this.reply.hash, email);
    },
    createBody(prop) {
      let from = {};
      from[this.fromSelected.email] = this.fromSelected.name;
      let to = {};
      let bcc = {};
      let cc = {};
      let files = [];
      for (let i = 0; i < this.tagsTo.length; i++) {
        if (this.tagsTo[i].name == undefined) {
          to[this.tagsTo[i].email] = this.tagsTo[i].email;
        } else {
          to[this.tagsTo[i].email] = this.tagsTo[i].name;
        }
      }
      for (let i = 0; i < this.tagsBCC.length; i++) {
        if (this.tagsBCC[i].name == undefined) {
          bcc[this.tagsBCC[i].email] = this.tagsBCC[i].email;
        } else {
          bcc[this.tagsBCC[i].email] = this.tagsBCC[i].name;
        }
      }
      for (let i = 0; i < this.tagsCC.length; i++) {
        if (this.tagsCC[i].name == undefined) {
          cc[this.tagsCC[i].email] = this.tagsCC[i].email;
        } else {
          cc[this.tagsCC[i].email] = this.tagsCC[i].name;
        }
      }
      let html = this.mail_body;
      var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g");
      html = html.replace(re1, "");
      let body, mailboxID;
      console.log(this.reply.mailboxId)
      if (
        this.reply.mailboxId !== undefined &&
        this.reply.mailboxId !== "me"
      ) {
        mailboxID = this.reply.mailboxId;
      } else if (
        this.$store.state.inboxData.id !== undefined &&
        this.$store.state.inboxData.id !== "me"
      ) {
        mailboxID = this.$store.state.inboxData.id;
      } else {
        mailboxID = this.reply.mailboxId;
      }
      if (this.draftID == null) {
        body = {
          mailboxID,
          bcc,
          cc,
          files: this.files,
          from,
          subject: this.subject,
          to,
          threadID: this.threadID,
          inReplyTo: this.inReplyTo,
          replyAll: this.reply.email.replyAll,
        };
      } else {
        body = {
          mailboxID,
          bcc,
          cc,
          files: this.files,
          from,
          subject: this.subject,
          to,
          inReplyTo: this.inReplyTo,
          threadID: this.threadID,
          draftID: this.draftID,
        };
      }
      let text = html.replace(/(<([^>]+)>)/gi, "");

      html &&
        (body.html = `<div class=\"hwEmailWrapper\" style=\"font-family:sans-serif;font-size:0.875rem;color:#001737\">${html}</div>`);
      text && (body.text = text);
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

      return requestOptions;
    },
    saveDraft() {
      if (
        this.tagsTo.length > 0 ||
        this.tagsCC.length > 0 ||
        this.tagsBCC.length > 0 ||
        this.subject ||
        this.mail_body
      ) {
        this.message = "Saving Draft";
        let requestOptions = this.createBody("draft");
        fetch(this.$apiBaseURL + "saveDraft.php", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.message !== "Draft saved successfully.") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.draftID = data.data.draftID;
            this.editorInstance.draftID = data.data.draftID;
            this.threadID = data.data.threadID;
            this.message = "Draft Saved";
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    sendMail(sendAt) {
      var self = this;
      if (this.tagsTo.length == 0) {
        this.noTo = true;
        return;
      }
      for (let i = 0; i < this.tagsTo.length; i++) {
        if (this.tagsTo[i].tiClasses.includes("ti-invalid")) {
          this.noTo = false;
          this.toNotValid = true;
          break;
        }
      }
      for (let i = 0; i < this.tagsCC.length; i++) {
        if (this.tagsCC[i].tiClasses.includes("ti-invalid")) {
          this.ccNotValid = true;
          break;
        }
      }
      for (let i = 0; i < this.tagsBCC.length; i++) {
        if (this.tagsBCC[i].tiClasses.includes("ti-invalid")) {
          this.bccNotValid = true;
          break;
        }
      }
      if (this.toNotValid || this.ccNotValid || this.bccNotValid) return;
      this.sending = true;
      let requestOptions = this.createBody("send");
      requestOptions.body = JSON.parse(requestOptions.body);
      if (sendAt !== "nil") {
        requestOptions.body["sendAt"] = sendAt;
      }
      requestOptions.body = JSON.stringify(requestOptions.body);

      // alert("Reached to the fetch call");
      fetch(this.$apiBaseURL + "sendMail.php", requestOptions)
        .then(async (response) => {
          // alert("Fetch success")
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          requestOptions.body = JSON.parse(requestOptions.body);
          this.show = false;
          this.sending = false;
          this.undoMessage = data.message;
          $("#undo-txt").text(data.message);
          this.showUndo = true;
          this.undoInterval = setInterval(function () {
            self.undoTimer -= 1;
          }, 1000);
          this.undoTimeout = setTimeout(() => {
            clearInterval(self.undoInterval);
            self.showUndo = false;
            self.cancelReply(self.reply.hash);
            self.undoTimer = self.$store.state.userSettings.undoTimer;
          }, self.$store.state.userSettings.undoTimer * 1000);
          if (this.isSend == "send") {
            let payload = {};
            payload.subject = this.subject;
            payload.displaySubject = this.subject;
            payload.from = requestOptions.body.from;
            payload.bcc = requestOptions.body.bcc;
            payload.cc = requestOptions.body.cc;
            payload.to = requestOptions.body.to;
            payload.html = requestOptions.body.html;
            payload.strippedHtml = requestOptions.body.html;
            payload.text = requestOptions.body.text;
            payload.snippet = requestOptions.body.text;
            payload.readStats = {};
            payload.id = data.data.messageID;
            payload.attachments = this.attachments;
            payload.date = new Date().toISOString();
            let email = {
              email: payload,
              type: "email",
            };
            triggerPromptNotif("Mail sent", "success", 1000);
            bus.$emit("changeThreadAttrs", email);
          } else {
            bus.$emit("closeThread", this.$route.params.threadId);
            bus.$emit("broad");
          }
          // this.cancelReply();
          // bus.$emit("closeReply", this.reply.hash);
        })
        .catch((error) => {
          // alert(error);
          console.error(error);
        });
    },
    unsendMail() {
      clearInterval(this.undoInterval);
      clearTimeout(this.undoTimeout);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.draftID,
          mailboxId: this.$store.state.inboxData.id,
          threadId: this.threadID,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "undoSend.php", requestOptions).then(
        async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
            triggerPromptNotif(data.message, "error");
          }

          this.show = true;

          bus.$emit("removeMail", this.draftID);
        }
      );
      this.showUndo = false;
      this.undoTimer = this.$store.state.userSettings.undoTimer;
    },
    showCC() {
      this.isCC = true;
    },
    showBCC() {
      this.isBCC = true;
    },
    check(tag) {
      if (tag.email == undefined) {
        return !/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/.test(
          tag.text
        );
      } else {
        return !/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/.test(
          tag.email
        );
      }
    },
    updateTo(newTags) {
      this.autocompleteItemsTo = [];
      for (let i = 0; i < newTags.length; i++) {
        if (newTags[i].email == undefined) {
          newTags[i].email = newTags[i].text;
        }
      }
      this.tagsTo = newTags;
      this.noTo = false;
      this.toNotValid = false;
    },
    updateCC(newTags) {
      this.autocompleteItemsCC = [];
      for (let i = 0; i < newTags.length; i++) {
        if (newTags[i].email == undefined) {
          newTags[i].email = newTags[i].text;
        }
      }
      this.tagsCC = newTags;
      this.ccNotValid = false;
    },
    updateBCC(newTags) {
      this.autocompleteItemsBCC = [];
      for (let i = 0; i < newTags.length; i++) {
        if (newTags[i].email == undefined) {
          newTags[i].email = newTags[i].text;
        }
      }
      this.tagsBCC = newTags;
      this.bccNotValid = false;
    },
    initItemsTo() {
      if (this.tagTo.length < 2) return;
      const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagTo}`;

      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            this.autocompleteItemsTo = response.data.data.contacts.map((a) => {
              let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`;
              return {
                text: a.name + " (" + a.email + ")",
                id: a.id,
                email: a.email,
                name: a.name !== "" ? a.name : a.email,
                icon: icon,
              };
            });
          })
          .catch(() => console.warn("Oh. Something went wrong"));
      }, 600);
    },
    initItemsCC() {
      if (this.tagCC.length < 2) return;
      const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagCC}`;

      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            this.autocompleteItemsCC = response.data.data.contacts.map((a) => {
              let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`;
              return {
                text: a.name + " " + a.email,
                id: a.id,
                email: a.email,
                name: a.name,
                icon: icon,
              };
            });
          })
          .catch(() => console.warn("Oh. Something went wrong"));
      }, 600);
    },
    initItemsBCC() {
      if (this.tagBCC.length < 2) return;
      const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagBCC}`;

      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            this.autocompleteItemsBCC = response.data.data.contacts.map((a) => {
              let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`;
              return {
                text: a.name + " " + a.email,
                id: a.id,
                email: a.email,
                name: a.name,
                icon: icon,
              };
            });
          })
          .catch(() => console.warn("Oh. Something went wrong"));
      }, 600);
    },
  },
};
</script>

<style>
.vue-tags-input .ti-tag {
  position: relative;
  background: #e2e2e2;
  color: #000;
  font-size: 12px;
  padding: 2px 7px;
  margin: 0.25rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
  line-height: 1.5;
}

.vue-tags-input .ti-input {
  border: none;
}

.vue-tags-input .ti-tag.ti-invalid {
  background-color: #d9534f;
  color: white;
}

.vue-tags-input .ti-autocomplete {
  /* background: #283944; */
  border: 1px solid #8b9396;
  border-radius: 7px;
  z-index: 20000000;
}

.vue-tags-input .ti-item.ti-selected-item {
  background: #e2e2e2;
  color: #000;
}

.btnnn {
  font-size: 14px;
  color: white;
  /* padding: 7px; */
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
  float: right;
  bottom: 24px;
  position: absolute;
  right: 24px;
}

.fr-toolbar .fr-command.fr-btn img,
.fr-popup .fr-command.fr-btn img,
.fr-modal .fr-command.fr-btn img {
  margin: 8px 7px;
  width: 16px !important;
}

.fr-sticky-on {
  position: relative;
  z-index: 10;
}

.fr-sticky-on + .fr-sticky-dummy,
.fr-sticky-box > .fr-sticky-dummy {
  display: none;
}
</style>