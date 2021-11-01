<template>
  <div class="d-flex flex-column editor_container" id="threadEditorContainer">
    <div class="editorContainer">
        <ul class="nav nav-line flex-row mg-l-20 mg-b-10" role="tablist" style="border-bottom: none !important;margin-top:5px;margin-bottom:5px">
            <li class="nav-item">
              <a class="nav-link active reply-tab" data-toggle="tab" href="#editorReplyTab" role="tab" aria-controls="reply-whatsapp-tab"  @click="tabChange(0)" aria-selected="false">Reply</a>
            </li>
            <li class="nav-item">
              <a class="nav-link notes-tab" data-toggle="tab" href="#editorNotesTab" role="tab" aria-controls="notes-whatsapp-tab" @click="tabChange(1)" aria-selected="true">Note</a>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="editorReplyTab" role="tabpanel" aria-labelledby="reply-tab">
            <froala :tag="'textarea'" :config="replyEditorConfig" @deleteAttachment="temp"></froala>
            <input type='file' style='display: none' name='files[]' @change="uploadAttachment" id='editor-uploadAttachment' multiple>
          </div>
          <div class="tab-pane fade" id="editorNotesTab" role="tabpanel" aria-labelledby="notes-tab">
            <froala :tag="'textarea'" :config="noteEditorConfig"></froala>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import FroalaEditor from 'froala-editor';
  // import VueTribute from "vue-tribute";
  import Tribute from "tributejs";
  import AttachmentComp from './AttachmentComp.vue';
  import Vue from 'vue';
  import { bus } from "../main";
  const axios = require('axios').default;

  export default {
    name: "ChatContentReply",
    components: {
      // VueTribute,
      FroalaEditor
    },
    data() {
      const self = this;
      return {
        current: 'reply',
        tempData:['a', 'b', 'v'],
        replyEditorInstance: null,
        noteEditorInstance: null,
        attachments: {
          // "17866678" : {
          //   id: "17866678",
          //   extension: "png",
          //   filehash: "33ae9688627a1e0fc4829ac06ba70242617bbe3ea79341635499582",
          //   filename: "file 1",
          //   filesize: 19812,
          //   mimeType: "image/png",
          //   progress: 0,
          //   isUploaded: false
          // },
          // "17866679" : {
          //   id: "17866679",
          //   extension: "png",
          //   filehash: "33ae9688627a1e0fc4829ac06ba70242617bbe3ea79341635499582",
          //   filename: "file 2",
          //   filesize: 19812,
          //   mimeType: "image/png",
          //   progress: 100,
          //   isUploaded: true
          // },
          // "17866680" : {
          //   id: "17866680",
          //   extension: "png",
          //   filehash: "33ae9688627a1e0fc4829ac06ba70242617bbe3ea79341635499582",
          //   filename: "file 4",
          //   filesize: 19812,
          //   mimeType: "image/png",
          //   progress: 100,
          //   isUploaded: true
          // }
        },
        replyEditorConfig: {
          events: {
            initialized: async function() {
              const replyFroala = this;
              self.replyEditorInstance = this;

              let savedReplyTribute = await self.callApi();
              savedReplyTribute.attach(replyFroala.el);

              replyFroala.events.on('keydown', function(e) {
                if (e.which == FroalaEditor.KEYCODE.ENTER && savedReplyTribute.isActive) {
                  return false;
                }
              }, true);

              let attchComp = Vue.extend(AttachmentComp);
              let replyAttachmentList = new attchComp({
                propsData:{
                  attachments: self.attachments
                }
              }).$mount();
              
              replyFroala.$wp.append(replyAttachmentList.$el);


              // replyFroala.$wp.append(`<input type='file' style='display: none' name='files[]' @change="uploadAttachment" id='editor-uploadAttachment' multiple>`);
            },
            focus: async function() {
              // const froala = this;
              // let savedReplyTribute = await self.callApi();
              // savedReplyTribute.attach(froala.el);

              // froala.events.on('keydown', function(e) {
              //   if (e.which == FroalaEditor.KEYCODE.ENTER && savedReplyTribute.isActive) {
              //     return false;
              //   }
              // }, true);

              // let tribute2 = await self.callApi1();
              // if(self.current == 'note') {
              //   tribute1.detach(froala.el);
              //   tribute2.attach(froala.el);

              //   froala.events.on('keydown', function(e) {
              //     if (e.which == FroalaEditor.KEYCODE.ENTER && tribute2.isActive) {
              //       return false;
              //     }
              //   }, true);
              // } else {
              //   tribute2.detach(froala.el)
              //   tribute1.attach(froala.el);

              //   froala.events.on('keydown', function(e) {
              //     if (e.which == FroalaEditor.KEYCODE.ENTER && tribute1.isActive) {
              //       return false;
              //     }
              //   }, true);
              // }
            }
          },
          placeholderText: "Enter your reply here.... You can use # to insert saved replies",
          charCounterCount: false,
          toolbarBottom: true,
          key: 'fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==',
          heightMin: 100,
          heightMax: 290,
          // toolbarButtons: [['bold', 'italic', 'underline', 'strikeThrough', 'insertHR'], ['my_dropdown', 'clear', 'insert', 'savedReply'], ['undo', 'redo', 'selectAll']],
          toolbarButtons: {
            moreText: {
              buttons: ['bold', 'underline', 'italic', 'textcolor', 'fontFamily', 'backgroundColor', 'fontSize', 'resetFormatting'],
              buttonsVisible: 0
            },
            moreParagraph: {
              buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'quote', 'insertTable'],
              buttonsVisible: 0
            },
            moreRich: {
              buttons: ['hcArticle', 'savedReply', 'attach']
            },
          },
        },
        noteEditorConfig: {
          events: {
            initialized: async function() {
              const noteFroala = this;
              self.noteEditorInstance = this;
              let mentionTribute = await self.callApi1();
              mentionTribute.attach(noteFroala.el);

              noteFroala.events.on('keydown', function(e) {
                if (e.which == FroalaEditor.KEYCODE.ENTER && mentionTribute.isActive) {
                  return false;
                }
              }, true);

              let attchComp = Vue.extend(AttachmentComp);
              let notesAttachmentList = new attchComp().$mount();
              noteFroala.$wp.append(notesAttachmentList.$el);
              // noteFroala.$wp.append('<div class="row w-100 mx-0 d-none" id="notes-attachment-list"></div>');
              // noteFroala.$wp.append(`<input type='file' style='display: none' name='files[]' class='notes-uploadAttachment' multiple @click="uploadAttachment()">`);

            },
            focus: async function() {
              // const noteFroala = this;
              // let mentionTribute = await self.callApi1();
              // mentionTribute.attach(noteFroala.el);
              // noteFroala.events.on('keydown', function(e) {
              //   if (e.which == FroalaEditor.KEYCODE.ENTER && mentionTribute.isActive) {
              //     return false;
              //   }
              // }, true);
            }
          },
          placeholderText: "Add your notes here.. You can use @ to mention your teammates",
          charCounterCount: false,
          toolbarBottom: true,
          key: 'fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==',
          heightMin: 100,
          heightMax: 290,
          toolbarButtons: {
            'moreText': {
              'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
              'buttonsVisible': 2
            },
            'moreParagraph': {
              'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
            },
            'moreRich': {
              'buttons': ['attach', 'insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
            },
            // 'moreMisc': {
            //   'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help']
            // }
          },
          
        }
      };
    },
    methods: {
      async callApi() {
        const response = await fetch(this.$apiBaseURL + "get-teammates.php?mailboxID=" + this.$route.params.mailboxId, {credentials: 'include'});
        const data = await response.json();
        console.log(data);
        return this.createTribute(data);
      },
      async callApi1() {
        console.log("calling api 2");
        const response = await fetch(this.$apiBaseURL + "get-teammates.php?mailboxID=" + this.$route.params.mailboxId, {credentials: 'include'});
        const data = await response.json();
        console.log(data);
        return this.createTribute1(data.data.teammates);
      },
      createTribute(data) {
        console.log("creating tribute 1");
      //   console.log(this.editorInstance);
          var tribute = new Tribute({
            trigger: '#',
            values: data,
            lookup: 'username',
            fillAttr: 'firstname',
            selectTemplate: function(item) {
              return `<span contenteditable="false" class="mention-h fr-deletable fr-tribute">#` + item.original.firstname + "</span>"
            },
            noMatchTemplate: function () {
              return '<span style:"visibility: hidden;"></span>';
            },
          });
          console.log(tribute);
        return tribute;
      },
      createTribute1(data) {
        console.log("creating tribute 2");
          var tribute = new Tribute({
            collection: [
              {
                trigger: '@',
                values: [
                          { key: 'masood', value: 'Masood' },
                          { key: 'kunal', value: 'Kunal Kumar' },
                          { key: 'gatti', value: 'Gatti Ramya' },
                          { key: 'mayank', value: 'Mayank Banga' },
                          { key: 'ayush', value: 'Ayush Rastogi' },
                          { key: 'vibhor', value: 'Vibhor Agarwal' }
                        ],
                selectTemplate: function(item) {
                  return `<span contenteditable="false" class="mention fr-deletable fr-tribute">@` +
                          item.original.value +
                          "</span>"
                },
                noMatchTemplate: function () {
                  return '<span style:"visibility: hidden;"></span>';
                }
              },
              {
                trigger: '#',
                values: data,
                lookup: 'username',
                fillAttr: 'firstname',
                selectTemplate: function(item) {
                  return `<span contenteditable="false" class="mention-h fr-deletable fr-tribute">#` + item.original.firstname + "</span>"
                },
                noMatchTemplate: function () {
                  return '<span style:"visibility: hidden;"></span>';
                }
              }
            ]
          });
        return tribute;
      },
      tabChange(props) {
        if(props == 1) {
          this.current = "notes";
          $(".editorContainer").addClass("noteMode");
        } else {
          this.current = "reply";
          $(".editorContainer").removeClass("noteMode");
        }
      },
      prepareFroalaButtons(){
        const vueThis = this;
        FroalaEditor.DefineIcon('attach', { FA5NAME: 'paperclip', template: 'font_awesome_5' });
        FroalaEditor.RegisterCommand('attach', {
          title: 'Insert Attachment',
          icon: 'attach',
          refreshAfterCallback: true,
          callback: function () {
            $(`#editor-uploadAttachment`).click();
          },
        });

        FroalaEditor.DefineIconTemplate('font_awesome_5b', '<i class="fab fa-[FA5NAME]"></i>');

        FroalaEditor.DefineIcon('savedReply', { FA5NAME: 'bookmark', template: 'font_awesome_5' });

        FroalaEditor.RegisterCommand('savedReply', {
          // Button title.
          title: 'Insert Saved Reply',
          // Mark the button as a dropdown.
          icon: 'savedReply',
          refreshAfterCallback: true,
          callback: function () {
            this.selection.save();

            $(".saved-replies-btn").click();

          }
        });

        FroalaEditor.DefineIcon('hcArticle', { FA5NAME: 'book', template: 'font_awesome_5' });

        FroalaEditor.RegisterCommand('hcArticle', {
          title: 'Insert Help Center Article',
          icon: 'hcArticle',
          refreshAfterCallback: true,
          callback: function () {
            this.selection.save();
            let editor = this;
          }
        });

        FroalaEditor.RegisterCommand('send', {
          title: 'Send',
        });

        FroalaEditor.RegisterShortcut(13, 'send', 'send', 'Enter', false, false);
      },
      uploadAttachment(event){
        const selectedFiles = event.target.files;
        console.log(selectedFiles);
        const vueThis = this;
        for (let i = 0; i < selectedFiles.length; i++) {
          let selectedFile = selectedFiles[i];
          let hash = Date.now() + '-' + Math.floor(Math.random() * 100000000000);
          var formData = new FormData();
          formData.append('files[]', selectedFile);
          formData.append('mailboxID', vueThis.$route.params.mailboxId);
          const attachmentURL = `${vueThis.$apiBaseURL}/uploadAttachment`;
          let attachmentObject = {
            filename: selectedFile["name"],
            filesize: selectedFile["size"],
            progress: 0,
            isUploaded: false
          }

          vueThis.attachments[hash] = attachmentObject;
          Vue.delete(vueThis.attachments, hash);
          vueThis.attachments[hash] = attachmentObject;
          // fetch(attachmentURL,{
          //   method: 'POST',
          //   body: formData,
          //   credentials: 'include'
          // }).then(response => {
          //   console.log(response);
          // })
          axios.request({
            method: "post",
            url: "https://app.helpwise.io/api/uploadAttachment.php",
            data: formData,
            withCredentials: true,
            onUploadProgress: function(p){
              let percentage = (p.loaded / p.total) * 100;
              console.log(percentage);
              console.log(hash);
              vueThis.attachments[hash]["progress"] = percentage;
              // $(`#progress-compose-${hash}`).css("width", `${percentage}%`);
            }.bind(this)
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
          })
        }
      },
      runFunc(){
        console.log("kjfhksadjhfjshadjklfh")
      }
    },
    beforeMount() {
      this.prepareFroalaButtons()
    },
    created(){
      bus.$off("deleteAttachmentUpload");
      bus.$on("deleteAttachmentUpload", (id) => {
        console.log("event listened", id);
        Vue.delete(this.attachments, id);
      });
    }
  };
</script>

<style scoped>
  .form {
    bottom: 0%;
  }

  .mention {
    color: #009be5 !important;
    background-color: #dbf2ff !important;
    padding: 0 4px;
  }

  .mention-h {
    color: blue !important;
    background-color: #dbf2ff !important;
    padding: 0 4px;
  }
  .btnn {
    font-size: 14px;
    color: white;
    /* padding: 7px; */
    width: 70px;
    border-radius: 5px;
    cursor: pointer;

    float: right;
    bottom: 17px;
    position: absolute;
    right: 100px;
  }

  .nav-link.active {
    color: #0168fa;
  }

  .editorContainer{
    margin: 10px 20px;
    background-color: white;
    border-radius: 10px;
    /* overflow: hidden; */
    border: 1px solid #0168fa;
  }

  .editorContainer.noteMode{
    background: #fef6d8;
  }

  .editorContainer:hover {
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.16);
  }

</style>