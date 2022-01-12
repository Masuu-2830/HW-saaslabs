<template>
    <div>
      <div
        :id="`replyWindow-${reply.hash}`" class="replyWindow">
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
                    <i v-else-if="type == 2" class="reply-type-icon fas fa-reply-all"></i>
                    <i v-else class="reply-type-icon fas fa-share"></i>
                  </span>
                  <div class="dropdown-menu">
                    <button
                      @click.prevent="replyy"
                      class="dropdown-item text-secondary reply-state-btn-reply"
                      style="font-size: 13px"
                    >
                      <i class="fas fa-reply"></i> Reply
                    </button>
                    <button
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
                      class="
                        dropdown-item
                        text-secondary
                        reply-state-btn-forward
                      "
                      style="font-size: 13px"
                    >
                      <i class="fas fa-share"></i> Forward
                    </button>
                  </div>
                </div>
                <div class="reply-email-addresses flex-grow-1 ml-2">
                  <div :style="{display: fromOptions.length > 1 ? 'block' : 'none'}"
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
                        <b-form-select-option v-for="fromOption in fromOptions" :key="fromOption.id" :value="fromOption">{{fromOption.name}} &lt;{{fromOption.email}}&gt;</b-form-select-option>
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
                        @tag-order-changed="newTags => tagsTo = newTags"
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
                        @tag-order-changed="newTags => tagsCC = newTags"
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
                        @tag-order-changed="newTags => tagsBCC = newTags"
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
                <button tabindex="-1" v-if="!isCC" @click.stop.prevent="showCC" class="btn btn-link p-1 reply-show-cc">
                  Cc
                </button>
                <button tabindex="-1" v-if="!isBCC" @click.stop.prevent="showBCC" class="btn btn-link p-1 reply-show-bcc">
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
                  <froala :tag="'textarea'" :config="config" v-model="mail_body" name="mail_body"></froala>
                  <button @click.stop.prevent="sendMail" class="btnn btn btn-sm btn-primary fr-bt" type="submit">{{
                    isSend == "send"
                      ? "Send"
                      : "Send and Close"
                  }}</button>
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
          <div class="replyPoppedOutWrapper tx-12" :class="show && 'd-none'" style="padding: 20px">
            You're editing this draft somewhere else.
            <br />
            Open
            <span
              ><button class="px-0 btn-link btn popinReply" @click.stop.prevent="openHere">here</button></span
            >
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { bus } from "../../../main";
import FroalaEditor from 'froala-editor';
import "froala-editor/js/plugins.pkgd.min";
import VueTagsInput from '@vojtechlanka/vue-tags-input';
import axios from 'axios';
import _ from 'underscore';
import AttachmentComp from '../../AttachmentComp.vue';
import Vue from 'vue';
export default {
    name: 'MailContentReply',
    components: {VueTagsInput, FroalaEditor},
    props: {
      reply: Object,
    },
    data() {
        const self = this;
        return {
            show: true,
            type: this.reply.type,
            fromOptions: this.aliases(),
            fromSelected: this.defaultAlias(),
            attachments: this.reply.attachments !== undefined ? this.reply.attachments : {},
            files: [],
            undoTimer: this.$store.state.userSettings.undoTimer,
            isSend: this.$store.state.userSettings.send,
            tagTo: '',
            tagsTo: this.tagsto(),
            autocompleteItemsTo: [],
            tagCC: '',
            tagsCC: this.tagscc(),
            autocompleteItemsCC: [],
            tagBCC: '',
            tagsBCC: this.tagsbcc(),
            autocompleteItemsBCC: [],
            validation: [{
              classes: 'invalid-email',
              rule: tag => this.check(tag) 
            }],
            debounce: null,
            message: "",
            subject: this.reply.email.subject !== undefined ? this.reply.email.subject : "",
            mail_body: this.signature(),
            noTo: false,
            toNotValid: false,
            ccNotValid: false,
            bccNotValid: false,
            isCC: this.reply.type == 2 && Object.keys(this.reply.email.cc).length > 0 ? true : false,
            isBCC: this.reply.type == 2 && Object.keys(this.reply.email.bcc).length > 0 ? true : false,
            draftID: this.reply.email.id !== undefined ? this.reply.email.id : null,
            threadID: this.reply.email.threadID !== undefined ? this.reply.email.threadID : null,
            inReplyTo: this.reply.email.inReplyTo !== undefined ? this.reply.email.inReplyTo : null,
            editorInstance: null,
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
                mailboxID: this.$route.params.mailboxId,
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
                  editor.type = "reply"
                  editor.mailboxID = self.$route.params.mailboxId;
                  editor.threadID = self.threadID;
                  editor.draftID = self.draftID;
                  self.editorInstance = this;
                  console.log("initialized");
                  console.log(this);
                  let attchComp = Vue.extend(AttachmentComp);
                  let replyAttachmentList = new attchComp({
                    propsData:{
                      attachments: self.attachments,
                      html: self.reply.email.html,
                      date: self.reply.email.date,
                      type: "reply",
                      from: self.reply.email.from
                    }
                  }).$mount();
                  // var ed = $(`#reply-uploadAttachment`).data('editor');
                  console.log(editor);
                  editor.$wp.append(replyAttachmentList.$el);
                  // ed.$wp.append(replyAttachmentList.$el);
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
                  "attachReply",
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
        Vue.delete(this.files, id);
        this.files = this.files.filter(i => i !== id);
        console.log(this.attachments, this.files);
        console.log("File deleted")
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
        console.log("subject");
        if (to !== from) {
          clearTimeout(this.subjectSave);
          this.subjectSave = setTimeout(this.saveDraft, 2000);
        }
      },
      mail_body: function (to, from) {
        console.log("mailbody");
        if (to !== from) {
          clearTimeout(this.myGreeting);
          this.myGreeting = setTimeout(this.saveDraft, 2000);
        }
      },
    },
    methods: {
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
        // myGreeting() {
        //   setTimeout(this.saveDraft, this.doneTypingInterval);
        // },
        tagsto(prop) {
          let to = [];
          console.log(this.reply.email.from)
          if(this.reply.type !== 3 && prop !== 3) {
            for(var key in this.reply.email.from) {
              let obj = {};
              obj["email"] = key;
              obj["name"] = this.reply.email.from[key];
              obj["text"] = this.reply.email.from[key] + " (" + key + ")";
              obj["tiClasses"] = ["ti-valid"]
              to.push(obj);
            }
            if(this.reply.type == 2 || prop == 2) {
              let aliases = this.$store.state.aliases.addresses;
              for(var key in this.reply.email.to) {
                if(!aliases.some(el => el.email == key)) {
                  let obj = {};
                  obj["email"] = key;
                  obj["name"] = this.reply.email.to[key];
                  obj["text"] = this.reply.email.to[key] + " (" + key + ")";
                  obj["tiClasses"] = ["ti-valid"]
                  to.push(obj);
                }
              }
            }
          }
          console.log(to);
          return to;
        },
        tagscc(prop) {
          let cc = [];
          console.log(this.reply.type);
          if(this.reply.type == 2 || prop == 2) {
            let aliases = this.$store.state.aliases.addresses;
            for(var key in this.reply.email.cc) {
              if(!aliases.some(el => el.email == key)) {
                let obj = {};
                obj["email"] = key;
                obj["name"] = this.reply.email.cc[key];
                obj["text"] = this.reply.email.cc[key] + " (" + key + ")";
                obj["tiClasses"] = ["ti-valid"]
                cc.push(obj);
              }
            }
          }
          console.log(cc);
          if(cc.length > 0) {
            this.isCC = true;
            console.log(cc.length, this.isCC);
          }
          return cc;
        },
        tagsbcc(prop) {
          let bcc = [];
          if(this.reply.type == 2 || prop == 2) {
            let aliases = this.$store.state.aliases.addresses;
            for(var key in this.reply.email.bcc) {
              if(!aliases.some(el => el.email == key)) {
                let obj = {};
                obj["email"] = key;
                obj["name"] = this.reply.email.bcc[key];
                obj["text"] = this.reply.email.bcc[key] + " (" + key + ")";
                obj["tiClasses"] = ["ti-valid"]
                bcc.push(obj);
              }
            }
          }
          console.log(bcc);
          if(bcc.length > 0) {
            this.isBCC = true;
            console.log(bcc.length, this.isBCC);
          }
          return bcc;
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
                  console.log(vueThis.attachments, vueThis.draftID);
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
                vueThis.files.push(attachID);
                vueThis.editorInstance.attachments = vueThis.attachments;
                console.log(vueThis.attachments, vueThis.editorInstance);
                // let attchComp = Vue.extend(AttachmentComp);
                // let replyAttachmentList = new attchComp({
                //   propsData:{
                //     attachments: vueThis.attachments
                //   }
                // }).$mount();
                // // $('#editor-<>').data('editor',editor)
                // var ed = $(`#reply-uploadAttachment`).data('editor');
                // console.log(ed);
                // ed.$wp.append(replyAttachmentList.$el);
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
          if(this.reply.from !== undefined) {
            // for(let i = 0; i < aliases.length; i++) {
            //   if(aliases[i].email == Object.keys(this.reply.from)) {
            //     return { id: i, email: aliases[i].email, name: aliases[i].name };
            //   }
            // }
          } else {
            for (let i = 0; i < aliases.length; i++) {
              if (aliases[i].isDefault) {
                return { id: i, email: aliases[i].email, name: aliases[i].name };
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
          if(this.reply.html !== undefined) {
            return this.reply.html;
          }
          let signature = this.$store.state.userSignature.body;
          if (!signature) return "";
          let body = signature.replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i, "$1");
          console.log(body);
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
          console.log(html);
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
          for(let i = 0; i < this.tagsTo.length; i++) {
            if(this.tagsTo[i].name == undefined) {
              to[this.tagsTo[i].email] = this.tagsTo[i].email;
            } else {
              to[this.tagsTo[i].email] = this.tagsTo[i].name;
            }
          }
          for(let i = 0; i < this.tagsBCC.length; i++) {
            if(this.tagsBCC[i].name == undefined) {
              bcc[this.tagsBCC[i].email] = this.tagsBCC[i].email;
            } else {
              bcc[this.tagsBCC[i].email] = this.tagsBCC[i].name;
            }
          }
          for(let i = 0; i < this.tagsCC.length; i++) {
            if(this.tagsCC[i].name == undefined) {
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
          for(let i = 0; i < this.tagsTo.length; i++) {
            if(this.tagsTo[i].name == undefined) {
              to[this.tagsTo[i].email] = this.tagsTo[i].email;
            } else {
              to[this.tagsTo[i].email] = this.tagsTo[i].name;
            }
          }
          for(let i = 0; i < this.tagsBCC.length; i++) {
            if(this.tagsBCC[i].name == undefined) {
              bcc[this.tagsBCC[i].email] = this.tagsBCC[i].email;
            } else {
              bcc[this.tagsBCC[i].email] = this.tagsBCC[i].name;
            }
          }
          for(let i = 0; i < this.tagsCC.length; i++) {
            if(this.tagsCC[i].name == undefined) {
              cc[this.tagsCC[i].email] = this.tagsCC[i].email;
            } else {
              cc[this.tagsCC[i].email] = this.tagsCC[i].name;
            }
          }
          let html = this.mail_body;
          var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g"); 
          html = html.replace(re1, ""); 
          let body;
          if(this.draftID == null) {
            body = {
              mailboxID: this.$route.params.mailboxId, 
              bcc, 
              cc, 
              files: this.files, 
              from, 
              subject: this.subject, 
              to,
              threadID: this.threadID,
              inReplyTo: this.inReplyTo,
              replyAll: this.reply.email.replyAll
            }
          } else {
            body = {
              mailboxID: this.$route.params.mailboxId, 
              bcc, 
              cc, 
              files: this.files, 
              from, 
              subject: this.subject, 
              to,
              inReplyTo: this.inReplyTo,
              threadID: this.threadID,
              draftID: this.draftID
            }
          }
          let text = html.replace(/(<([^>]+)>)/gi, "");
          console.log(text);
          html && (body.html = `<div class=\"hwEmailWrapper\" style=\"font-family:sans-serif;font-size:0.875rem;color:#001737\">${html}</div>`);
          text && (body.text = text);
          if(prop == "send") {
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
            credentials: 'include'
          };
          console.log(requestOptions.body);
          return requestOptions;
        },
        saveDraft() {
          
          if(this.tagsTo.length > 0 || this.tagsCC.length > 0 || this.tagsBCC.length > 0 || this.subject || this.mail_body) {
            this.message = "Saving Draft"
            let requestOptions = this.createBody("draft");
            fetch(this.$apiBaseURL + "saveDraft.php", requestOptions)
          .then(async response => { 
              const data = await response.json();
              if(data.message !== "Draft saved successfully.") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.draftID = data.data.draftID;
              this.editorInstance.draftID = data.data.draftID;
              this.threadID = data.data.threadID;
              this.message = "Draft Saved";
              // setTimeout(function() {console.log(this.message);self.message = "";}, 3000);
            }).catch(error => {
            alert(error);
          })
          }
        },
        sendMail() {
          console.log("sendin");
          if(this.tagsTo.length == 0) {
            this.noTo = true;
            return;
          }
          for(let i = 0; i < this.tagsTo.length; i++) {
            if(this.tagsTo[i].tiClasses.includes("ti-invalid")) {
              this.noTo = false;
              this.toNotValid = true;
              break;
            }
          }
          for(let i = 0; i < this.tagsCC.length; i++) {
            if(this.tagsCC[i].tiClasses.includes("ti-invalid")) {
              this.ccNotValid = true;
              break;
            }
          }
          for(let i = 0; i < this.tagsBCC.length; i++) {
            if(this.tagsBCC[i].tiClasses.includes("ti-invalid")) {
              this.bccNotValid = true;
              break;
            }
          }
          if(this.toNotValid || this.ccNotValid || this.bccNotValid) return;
          let requestOptions = this.createBody("send");
          console.log(requestOptions.body);
          fetch(this.$apiBaseURL + "sendMail.php", requestOptions)
          .then(async response => { 
              const data = await response.json();
              if(data.status !== "success") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              if(this.isSend == "send") {
                let payload = this.reply;
                payload.subject = this.subject;
                payload.displaySubject = this.subject;
                payload.bcc = requestOptions.body.bcc;
                payload.cc = requestOptions.body.cc;
                payload.to = requestOptions.body.to;
                payload.html = requestOptions.body.html;
                payload.strippedHtml = requestOptions.body.html;
                payload.text = requestOptions.body.text;
                payload.snippet = requestOptions.body.text;
                payload.readStats = {};
                payload.attachments = requestOptions.body.attachments;
                payload.date = new Date().toISOString();
                console.log(payload);
                let email = {
                  email: payload,
                  type: "email"
                }
                bus.$emit("changeThreadAttrs", email);
              } else {
                bus.$emit("closeThread", this.$route.params.threadId);
                bus.$emit("broad");
              }
              // this.cancelReply();
              bus.$emit("closeReply", this.reply.hash);
            }).catch(error => {
            alert(error);
          })
        },
        showCC() {
          this.isCC = true
        },
        showBCC() {
          this.isBCC = true
        },
        check(tag) {
          console.log(tag);
          if(tag.email == undefined) {
            return !(/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/).test(tag.text);
          } else {
            return !(/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/).test(tag.email);
          }
        },
        updateTo(newTags) {
          console.log(newTags);
          this.autocompleteItemsTo = [];
          for(let i = 0; i < newTags.length; i++) {
            if(newTags[i].email == undefined) {
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
          for(let i = 0; i < newTags.length; i++) {
            if(newTags[i].email == undefined) {
              newTags[i].email = newTags[i].text;
            }
          }
          this.tagsCC = newTags;
          this.ccNotValid = false;
          console.log(this.tagsCC);
        },
        updateBCC(newTags) {
          this.autocompleteItemsBCC = [];
          for(let i = 0; i < newTags.length; i++) {
            if(newTags[i].email == undefined) {
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
            axios.get(url, {withCredentials: true}).then(response => {
              console.log(response.data.data.contacts);
              this.autocompleteItemsTo = response.data.data.contacts.map(a => {
                let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`
                return { text: a.name + " (" + a.email + ")", id: a.id, email: a.email, name: a.name !== "" ? a.name : a.email, icon: icon };
              });
            }).catch(() => console.warn('Oh. Something went wrong'));
          }, 600);
        },
        initItemsCC() {
          if (this.tagCC.length < 2) return;
          const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagCC}`;
          console.log("starting");
          clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            axios.get(url, {withCredentials: true}).then(response => {
              console.log(response.data.data.contacts);
              this.autocompleteItemsCC = response.data.data.contacts.map(a => {
                let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`
                return { text: a.name + " " + a.email, id: a.id, email: a.email, name: a.name, icon: icon };
              });
            }).catch(() => console.warn('Oh. Something went wrong'));
          }, 600);
        },
        initItemsBCC() {
          if (this.tagBCC.length < 2) return;
          const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagBCC}`;
          console.log("starting");
          clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            axios.get(url, {withCredentials: true}).then(response => {
              console.log(response.data.data.contacts);
              this.autocompleteItemsBCC = response.data.data.contacts.map(a => {
                let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`
                return { text: a.name + " " + a.email, id: a.id, email: a.email, name: a.name, icon: icon };
              });
            }).catch(() => console.warn('Oh. Something went wrong'));
          }, 600);
        },
    },
}
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