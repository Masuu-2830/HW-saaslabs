<template>
  <div
    class="mail-body card_compose hw-reply hw_editor card shadow-sm mb-2 bg-white"
    id="reply-card"
    style="
      margin: 20px auto auto;
      max-width: 600px;
      padding-right: 1rem;
      border-radius: 10px;
      padding-left: 1rem;
    "
    :style="{display: item == null ? 'none' : ''}"
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
        <div class="avatar avatar mr-2" v-html="item.data.user">
          <!-- <span
            class="avatar-initial rounded-circle"
            style="background-color: hsl(125, 32%, 64%)"
            >MM</span
          > -->
        </div>
      </div>
      <div class="col-11" style="padding-left: 4px">
        <div class="reply-editor-wrapper fr-basic fr-bottom" style="margin-top: 0px">
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
    
  </div>
</template>
<script src="froala-editor/js/plugins/file.min.js"></script>
<script src="froala-editor/js/plugins/image.min.js"></script>
<script>
import { bus } from "../../../main";
import FroalaEditor from "froala-editor";
import "froala-editor/js/plugins.pkgd.min";
import axios from "axios";
import _ from "underscore";
import AttachmentComp from '../../AttachmentComp.vue';
import Vue from 'vue';
export default {
  name: "ChatContentCardReply",
  data() {
    return {
        item: null,
        reply_body: '',
        attachments: {},
        files: [],
        draftID: null,
        threadID: this.item.threadId !== undefined ? this.item.threadId : null,
        editorInstance: null,
        config: {
            enter: FroalaEditor.ENTER_DIV,
            charCounterCount: false,
            toolbarBottom: true,
            border: 'none',
            height: "120px",
            imageUploadParam: "files[]",
            imageUploadURL: "https://app.helpwise.io/api/uploadInlineAttachment.php",
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
                    console.log("initialized");
                    console.log(this);
                    let attchComp = Vue.extend(AttachmentComp);
                    let replyAttachmentList = new attchComp({
                        propsData:{
                            attachments: self.attachments,
                            type: "compose"
                        }
                    }).$mount();
                    // var ed = $(`#editor-uploadAttachment`).data('editor');
                    // console.log(editor, ed);
                    editor.$wp.append(replyAttachmentList.$el);
                    // ed.$wp.append(replyAttachmentList.$el);
                },
            },
            key: "fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==",
            toolbarButtons: [
                "attachCardReply","scheduleReply","clear"
            ],
        },
    }
  },
  created() {
      bus.$on('openCardReply', (data) => {
          console.log(data);
          this.item = data;
      });
      bus.$off("deleteAttachmentUpload");
      bus.$on("deleteAttachmentUpload", (id) => {
        console.log("event listenedd", id);
        Vue.delete(this.attachments, id);
        this.attachments = this.attachments.filter(i => i.id !== id);
        console.log(this.attachments, this.files);
      });
  },
  methods: {
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
            vueThis.files.push(attachID);
            vueThis.editorInstance.attachments = vueThis.attachments;
            console.log(vueThis.attachments, vueThis.editorInstance);
          })
        }
    },
    saveDraft() {
      // this.getUserSignature();
      if (this.reply_body) {
        console.log("save");
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
            this.editorInstance.draftID = data.data.draftID;
            this.editorInstance.threadID = data.data.threadID;
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
  }
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