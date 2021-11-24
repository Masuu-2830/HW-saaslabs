<template>
  <div>
      <div v-if="show"
        :id="`compose-${composer.hash}`"
        class="mail-compose hw_editor show shrink hideMoreEditingOptions"
        style="z-index: 2199921"
        :style="{right: lr ? '45vw' : ''}"
      >
        <div
          class="mail-compose-dialog mail-compose-dialog-shrink"
          style="width: 43vw !important"
        >
          <div class="mail-compose-header" style="padding: 10px">
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
                href=""
                class="
                  nav-link
                  mailComposeMinimize
                  nav-link-minimize
                  d-none d-lg-block
                "
              >
                <svg
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
                href=""
                class="
                  nav-link nav-link-shrink
                  d-none
                  mailComposeShrink
                  d-lg-block
                "
              >
                <svg
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
                href=""
                class="nav-link nav-link-close mailComposeClose"
                @click.prevent="closeCompose(composer.hash)"
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
            <div :style="{display: fromOptions.length > 1 ? 'block' : 'none'}" class="email-from-container align-items-center d-flex">
              <div>From</div>
              <div class="flex-grow-1 pt-2 pl-2" style="max-width: 80%">
                <b-form-select v-model="fromSelected" class="mb-3">
                  
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
            <div class="d-flex align-items-center">
              <div style="margin-right: 20px">To</div>
              <div class="flex-grow-1" style="max-width: 80%">
                <div
                  class="email-to"
                  style="
                    display: inline-block;
                    min-width: 100%;
                    max-width: 100%;
                  "
                >
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
              <div class="d-flex justify-content-start align-items-start p-2">
                <button
                  tabindex="-1"
                  v-if="!isCC"
                  @click.stop.prevent="showCC"
                  class="show-cc btn btn-link p-1"
                >
                  Cc
                </button>
                <button
                  tabindex="-1"
                  v-if="!isBCC"
                  @click.stop.prevent="showBCC"
                  class="show-bcc btn btn-link p-1"
                >
                  Bcc
                </button>
              </div>
            </div>
            <div
              class="invalid-feedback invalid-to"
              :style="{ display: toNotValid || noTo ? 'block' : 'none' }"
            >
              {{ noTo ? "Recipient is required" : "Invalid email(s)" }}
            </div>
            <div class="email-cc-wrapper" v-if="isCC">
              <hr style="margin-top: 0px; margin-bottom: 0px" />
              <div class="align-items-center d-flex">
                <div style="margin-right: 20px">Cc</div>
                <div class="flex-grow-1" style="max-width: 80%">
                  <div
                    class="email-cc"
                    style="
                      display: inline-block;
                      min-width: 100%;
                      max-width: 100%;
                    "
                  >
                    
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
                      style="z-index: 0"
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
              </div>
            </div>
            <div
              class="invalid-feedback invalid-cc"
              :style="{ display: ccNotValid ? 'block' : 'none' }"
            >
              Invalid email(s)
            </div>
            <div class="email-bcc-wrapper" v-if="isBCC">
              <hr style="margin-top: 0px; margin-bottom: 0px" />
              <div class="align-items-center d-flex">
                <div style="margin-right: 20px">Bcc</div>
                <div class="flex-grow-1" style="max-width: 80%">
                  <div
                    class="email-bcc"
                    style="
                      display: inline-block;
                      min-width: 100%;
                      max-width: 100%;
                    "
                  >
                    
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
                      style="z-index: 0"
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
              </div>
            </div>
            <div
              class="invalid-feedback invalid-bcc"
              :style="{ display: bccNotValid ? 'block' : 'none' }"
            >
              Invalid email(s)
            </div>
            <div>
              <hr style="margin-top: 0px; margin-bottom: 0px" />
              <div class="d-flex align-items-center">
                <div>Subject</div>
                <div class="flex-grow-1">
                  <input
                    @blur="saveDraft"
                    v-model="subject"
                    type="text"
                    class="email-sub form-control bd-0"
                  />
                </div>
              </div>
            </div>
            <div
              class="email-editor fr-box fr-basic fr-bottom"
              role="application"
              style="z-index: 214"
            >
              <form class="form">
                <froala
                  :tag="'textarea'"
                  :config="config"
                  v-model="mail_body"
                  name="mail_body"
                ></froala>
                <button
                  @click.stop.prevent="sendMail"
                  class="btnn btn btn-sm btn-primary fr-bt"
                  type="submit"
                >
                  {{
                    isSend == "send"
                      ? "Send"
                      : "Send and Close"
                  }}
                </button>
              </form>
            </div>
            <input
              type="file"
              style="display: none"
              name="files[]"
              @change="uploadAttachment"
              id="editor-uploadAttachment"
              multiple
            />
            <!-- <div
              class="d-flex flex-wrap"
              style="max-height: 150px; overflow-y: auto"
              id="compose-attachment-list"
            >
              <span
                v-for="file in uploadingFiles"
                :key="file.lastModified"
                v-html="createAttachmentList(file)"
              >
              </span>
            </div> -->
          </div>
        </div>
      </div>
    <div
      class="card"
      id="undo-container"
      style="max-width: 100%; z-index: 9999999;"
      :style="{ display: showUndo ? 'block' : 'none' }"
    >
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-center">
          <span id="undo-txt"
            >{{undoMessage}}</span
          >
          <span class="ml-2" id="undo-btn" @click="unsendMail"> Undo </span>
          <span id="email-timer" class="pd-l-10">{{ undoTimer }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="froala-editor/js/plugins/file.min.js"></script>
<script src="froala-editor/js/plugins/image.min.js"></script>
<script>
import { bus } from "../main";

import FroalaEditor from "froala-editor";
import "froala-editor/js/plugins.pkgd.min";
import VueTagsInput from "@vojtechlanka/vue-tags-input";
import axios from "axios";
import _ from "underscore";
import AttachmentComp from './AttachmentComp.vue';
import Vue from 'vue';

export default {
  name: "Compose",
  props: {
    composer: Object,
    align: Number,
  },
  computed: {
    lr() {
      if(this.align%2 == 1) {
        return true
      }else {
        return false
      }
    }
  },
  components: { VueTagsInput, FroalaEditor, File },
  data() {
    const self = this;
    return {
      show: true,
      showUndo: false,
      message: "New Message",
      undoMessage: "Email Sent.",
      fromOptions: this.aliases(),
      fromSelected: this.defaultAlias(),
      attachments: this.composer.attachments !== undefined ? this.composer.attachments : {},
      // attachments: {},
      // uploadingFiles: [],
      // files: [],
      // filesMap: [],
      undoTimer: this.$store.state.userSettings.undoTimer,
      isSend: this.$store.state.userSettings.send,
      tagTo: "",
      // tagsTo: Object.keys(this.composer.to).length !==0 ? this.composer.to : [],
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
      message: "New Message",
      subject: this.composer.subject !== undefined ? this.composer.subject : "",
      mail_body: this.signature(),
      noTo: false,
      toNotValid: false,
      ccNotValid: false,
      bccNotValid: false,
      isCC: false,
      isBCC: false,
      draftID: this.composer.id !== undefined ? this.composer.id : null,
      threadID: this.composer.threadID !== undefined ? this.composer.threadID : null,
      editorInstance: null,
      config: {
        enter: FroalaEditor.ENTER_DIV,
        placeholderText: "Type something",
        charCounterCount: false,
        toolbarBottom: true,
        height: "220px",
        imageUploadParam: "files[]",
        imageUploadURL:
          "https://app.helpwise.io/api/uploadInlineAttachment.php",
        imageUploadParams: {
          mailboxID: this.$route.params.mailboxId,
          emailID: this.emailID,
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
            editor.composer = self.composer;
            self.editorInstance = this;
            console.log("initialized");
            console.log(this);
            let attchComp = Vue.extend(AttachmentComp);
            let replyAttachmentList = new attchComp({
              propsData:{
                attachments: self.attachments
              }
            }).$mount();
            var ed = $(`#editor-uploadAttachment`).data('editor');
            console.log(editor, ed);
            editor.$wp.append(replyAttachmentList.$el);
            ed.$wp.append(replyAttachmentList.$el);
          },
        },
        key: "fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==",
        toolbarButtons: [
          [
            "bold",
            "italic",
            "underline",
            "strikeThrough",
            "insertHR",
            "attach",
            "insertImage",
            "clear",
          ],
          ["undo", "redo", "selectAll"],
        ],
      },
    };
  },
  created() {
    bus.$off("deleteAttachmentUpload");
    bus.$on("deleteAttachmentUpload", (id) => {
      console.log("event listenedd", id);
      Vue.delete(this.attachments, id);
      this.attachments = this.attachments.filter(i => i.id !== id);
      console.log(this.attachments, this.files);
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
    mail_body: function (to, from) {
      console.log("mailbody");
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
    // myGreeting() {
    //   setTimeout(this.saveDraft, this.doneTypingInterval);
    // },
    tagsto() {
      let to = [];
      if(Object.keys(this.composer.to).length > 0) {
        for(var key in this.composer.to) {
          let obj = {};
          obj["email"] = key;
          obj["name"] = this.composer.to[key];
          obj["text"] = this.composer.to[key] + " (" + key + ")";
          obj["tiClasses"] = ["ti-valid"]
          to.push(obj);
        }
      }
      console.log(to);
      return to;
    },
    tagscc() {
      let cc = [];
      if(Object.keys(this.composer.cc).length > 0) {
        for(var key in this.composer.cc) {
          let obj = {};
          obj["email"] = key;
          obj["name"] = this.composer.cc[key];
          obj["text"] = this.composer.cc[key] + " (" + key + ")";
          obj["tiClasses"] = ["ti-valid"]
          cc.push(obj);
        }
      }
      console.log(cc);
      return cc;
    },
    tagsbcc() {
      let bcc = [];
      if(Object.keys(this.composer.bcc).length > 0) {
        for(var key in this.composer.bcc) {
          let obj = {};
          obj["email"] = key;
          obj["name"] = this.composer.bcc[key];
          obj["text"] = this.composer.bcc[key] + " (" + key + ")";
          obj["tiClasses"] = ["ti-valid"]
          bcc.push(obj);
        }
      }
      console.log(bcc);
      return bcc;
    },
    prepareFroalaButtons() {
      const vueThis = this;
      FroalaEditor.DefineIcon("attach", {
        FA5NAME: "paperclip",
        template: "font_awesome_5",
      });
      FroalaEditor.RegisterCommand("attach", {
        title: "Insert Attachment",
        icon: "attach",
        refreshAfterCallback: true,
        callback: function () {
          $(`#editor-uploadAttachment`).click();
          $(`#editor-uploadAttachment`).data('editor',this);
        },
      });
      FroalaEditor.DefineIcon("clear", { NAME: "remove", SVG_KEY: "remove" });
      FroalaEditor.RegisterCommand("clear", {
        title: "Discard Draft",
        focus: false,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
          console.log(this);
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mailboxId: vueThis.$route.params.mailboxId,
              threadId: vueThis.threadID,
              draftId: vueThis.draftID,
            }),
            credentials: "include",
          };
          fetch(
            "https://app.helpwise.io/api/discardDraft.php",
            requestOptions
          ).then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            console.log(vueThis);
            vueThis.closeCompose(this.composer.hash);
          });
        },
      });
    },
    uploadAttachment(event) {
      const selectedFiles = event.target.files;
        console.log(selectedFiles);
        const vueThis = this;
        for (let i = 0; i < selectedFiles.length; i++) {
          let selectedFile = selectedFiles[i];
          let hash = Date.now() + '-' + Math.floor(Math.random() * 100000000000);
          var formData = new FormData();
          formData.append('files[]', selectedFile);
          formData.append('mailboxID', vueThis.$route.params.mailboxId);
          let attachmentObject = {
            filename: selectedFile["name"],
            filesize: selectedFile["size"],
            progress: 0,
            isUploaded: false,
            extension: "pdf"
          }

          vueThis.attachments[hash] = attachmentObject;
          Vue.delete(vueThis.attachments, hash);
          vueThis.attachments[hash] = attachmentObject;
          axios.request({
            method: "post",
            url: "https://app.helpwise.io/api/uploadAttachment.php",
            data: formData,
            withCredentials: true,
            onUploadProgress: function(p){
              let percentage = (p.loaded / p.total) * 100;
              console.log(percentage);
              console.log(hash);
              console.log(vueThis.attachments);
              vueThis.attachments[hash]["progress"] = percentage;
            }
          }).then((response)=>{
            //get the attachment id
            console.log(response);
            console.log(hash);

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
            vueThis.attachments[attachID]["extension"] = attachData["extension"];
            vueThis.attachments[attachID]["id"] = attachID;
            // vueThis.files.push(attachID);
            vueThis.editorInstance.attachments = vueThis.attachments;
            console.log(vueThis.attachments, vueThis.editorInstance);
            let attchComp = Vue.extend(AttachmentComp);
            let replyAttachmentList = new attchComp({
              propsData:{
                attachments: vueThis.attachments
              }
            }).$mount();
            // $('#editor-<>').data('editor',editor)
            var ed = $(`#editor-uploadAttachment`).data('editor');
            console.log(ed);
            ed.$wp.append(replyAttachmentList.$el);
          })
        }
    },
    aliases() {
      let aliases = this.$store.state.aliases.addresses;
      let aliasesArr = new Array();
      for (let i = 0; i < aliases.length; i++) {
        if (aliases[i].isDefault) {
          this.fromSelected = {
            id: i,
            email: aliases[i].email,
            name: aliases[i].name,
          };
        }
        aliasesArr.push({
          id: i,
          email: aliases[i].email,
          name: aliases[i].name,
        });
      }
      console.log(aliasesArr);
      return aliasesArr;
    },
    defaultAlias() {
      let aliases = this.$store.state.aliases.addresses;
      if(this.composer.from !== undefined) {
        for(let i = 0; i < aliases.length; i++) {
          if(aliases[i].email == Object.keys(this.composer.from)) {
            return { id: i, email: aliases[i].email, name: aliases[i].name };
          }
        }
      } else {
        for (let i = 0; i < aliases.length; i++) {
          if (aliases[i].isDefault) {
            return { id: i, email: aliases[i].email, name: aliases[i].name };
          }
        }
      }
      return {};
    },
    signature() {
      // return this.$store.state.userInfo;
      // this.aliases();
      if(this.composer.html !== undefined) {
        return this.composer.html;
      }
      let signature = this.$store.state.userSignature.body;
      if (!signature) return "";
      let body = signature.replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i, "$1");
      console.log(body);
      let html = "";
      let sign = `<div>${body}</div>`;
      // let signatureText = sign.text();
      // if (signatureText.trim() || sign.find('img').length > 0) {
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
      // }
      console.log(html);
      return html;
    },
    closeCompose(hash) {
      // console.log(hash, this.composer.id, hash == this.composer.id);
      // this.show = false;
      // if(hash == this.composer.id) {
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
      this.message = "New Message";
      this.mail_body = this.signature();
      this.fromSelected = this.defaultAlias();
      // this.compose = this.compose.filter(el => Object.keys(el) !== hash);
      bus.$emit("closeCompose", hash);
      // }
    },
    // getUserSignature() {
    //   fetch(this.$apiBaseURL + "getUserSignature.php?mailboxId=" + this.$route.params.mailboxId, {credentials: "include"})
    //   .then(async response => {
    //       const data = await response.json();
    //       if(data.status !== "success") {
    //         const error = (data && data.message) || response.status;
    //         return Promise.reject(error);
    //       }
    //       console.log(data);
    //       let signature = this.$store.state.userSignature.body;
    // if(!signature) return '';
    // let body=signature.replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i,"$1");
    // console.log(body);
    // let html = '';
    // let sign = `<div>${body}</div>`
    // // let signatureText = sign.text();
    // // if (signatureText.trim() || sign.find('img').length > 0) {
    //     html = `
    //         <br/>
    //         <br/>
    //         <div><div class="hw_signature rounded">
    //         <div class="hw_attr">
    //         <div class="pt-2 pb-2">
    //             ${sign}
    //         </div>
    //         </div>
    //         </div>
    //         </div>`;
    // // }
    // console.log(html);
    // this.mail_body = html;
    //     }).catch(error => {
    //     alert(error);
    //   })
    // },
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
      let body;
      if (this.threadID == null) {
        body = {
          mailboxID: this.$route.params.mailboxId,
          bcc,
          cc,
          files: this.files,
          from,
          subject: this.subject,
          to,
        };
      } else {
        body = {
          mailboxID: this.$route.params.mailboxId,
          bcc,
          cc,
          files: this.files,
          from,
          subject: this.subject,
          to,
          threadID: this.threadID,
          draftID: this.draftID,
        };
      }
      let text = html.replace(/(<([^>]+)>)/gi, "");
      // console.log(text);
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
      console.log(requestOptions.body);
      return requestOptions;
    },
    saveDraft() {
      // this.getUserSignature();
      if (
        (this.tagsTo.length > 0 ||
          this.tagsCC.length > 0 ||
          this.tagsBCC.length > 0 ||
          this.subject ||
          this.mail_body)
      ) {
        console.log("save", this.composer.hash);
        this.message = "Saving Draft";
        let requestOptions = this.createBody("draft");
        fetch(this.$apiBaseURL + "saveDraft.php", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.draftID = data.data.draftID;
            this.threadID = data.data.threadID;
            if (this.subject !== "") {
              this.message = this.subject;
            } else {
              this.message = "Draft Saved";
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    sendMail() {
      var self = this;
      console.log("sendingg");
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
      let requestOptions = this.createBody("send");
      console.log(requestOptions.body);
      fetch(this.$apiBaseURL + "sendMail.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.show = false;
          this.undoMessage = data.message;
          $("#undo-txt").text(data.message);
          this.showUndo = true;
          this.undoInterval = setInterval(function () {
            console.log(1);
            self.undoTimer -= 1;
          }, 1000);
          this.undoTimeout = setTimeout(() => {
            console.log(2);
            clearInterval(self.undoInterval);
            self.showUndo = false;
            self.closeCompose(self.composer.hash);
            self.undoTimer = self.$store.state.userSettings.undoTimer;
          }, self.$store.state.userSettings.undoTimer*1000);
          // clearTimeout(this.undoInterval);
        })
        .catch((error) => {
          alert(error);
        });
    },
    unsendMail() {
      clearInterval(this.undoInterval);
      clearTimeout(this.undoTimeout);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: this.draftID, mailboxId: this.$route.params.mailboxId, threadId: this.threadID}),
        credentials: "include",
      }
      fetch(this.$apiBaseURL + "undoSend.php", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (data.status !== "success") {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        console.log("unsending");
        this.showUndo = false;
        this.show = true;
      })
      this.undoTimer = this.$store.state.userSettings.undoTimer;
    },
    showCC() {
      this.isCC = true;
    },
    showBCC() {
      this.isBCC = true;
    },
    check(tag) {
      console.log(tag);
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
      console.log(newTags);
      this.autocompleteItemsTo = [];
      for (let i = 0; i < newTags.length; i++) {
        if (newTags[i].email == undefined) {
          newTags[i].email = newTags[i].text;
        }
      }
      this.tagsTo = newTags;
      this.noTo = false;
      this.toNotValid = false;
      console.log(this.tagsTo);
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
      console.log(this.tagsCC);
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
      console.log(this.tagsBCC);
    },
    initItemsTo() {
      if (this.tagTo.length < 2) return;
      const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagTo}`;
      console.log("starting");
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            console.log(response.data.data.contacts);
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
      console.log("starting");
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            console.log(response.data.data.contacts);
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
      console.log("starting");
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            console.log(response.data.data.contacts);
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