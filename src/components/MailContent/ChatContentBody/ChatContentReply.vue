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
            <froala :tag="'textarea'" :config="replyEditorConfig"></froala>
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
  import AttachmentComp from '../../AttachmentComp.vue';
  // import HcArticles from './modals/HcArticles.vue';
  import Vue from 'vue';
  import { bus, triggerPromptNotif } from "../../../main";
  const axios = require('axios').default;

  export default {
    name: "ChatContentReply",
    components: {
      // VueTribute,
      FroalaEditor,
      // HcArticles
    },
    data() {
      const self = this;
      return {
        current: 'reply',
        tempData:['a', 'b', 'v'],
        replyEditorInstance: null,
        noteEditorInstance: null,
        replyAttachments: {},
        notesAttachments: {},
        showHcModal: false,
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
                  attachments: self.replyAttachments
                }
              }).$mount();
              
              replyFroala.$wp.append(replyAttachmentList.$el);

              replyFroala.$tb.append(`
                <div class="fr-btn-grp fr-float-right">
                  <button style="height: 31px;position:absolute;right:0px;padding-top: 5px;margin-right:20px;margin-top: 9px;z-index:999999" class="btn btn-sm btn-primary fr-float-right fr-bt" id="sendMessage">Send</button>
                </div>`
              );
             
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
              buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
              buttonsVisible: 0
            },
            moreParagraph: {
              buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
              buttonsVisible: 0
            },
            'moreRich': {
              buttons: ['insertLink', 'savedReply', 'hcArticle', 'attachChatReply', 'insertImage', 'emoticons', 'insertTable', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
              buttonsVisible: 6
            },
            // 'moreMisc': {
            //   'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help']
            // }
          },
          // htmlAllowedEmptyTags: ['textarea', 'a', 'iframe', 'object', 'video', 'style', 'script', '.fa', '.fr-emoticon', '.fr-inner', 'path', 'line', 'hr', 'span', 'p', 'circle'],
          htmlAllowedTags: ['.*'],
          htmlAllowedAttrs: ['.*'],
          htmlRemoveTags: ['script'],
          quickInsertTags: ['']
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
              let notesAttachmentList = new attchComp({
                propsData : {
                  attachments: self.notesAttachments
                }
              }).$mount();
              noteFroala.$wp.append(notesAttachmentList.$el);

              noteFroala.$tb.append(`
                <div class="fr-btn-grp fr-float-right">
                  <button style="height: 31px;position:absolute;right:0px;padding-top: 5px;margin-right:20px;margin-top: 9px;z-index:999999" class="btn btn-sm btn-primary fr-float-right fr-bt" id="sendNotes">Add Note</button>
                </div>`
              );

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
              'buttonsVisible': 0
            },
            'moreParagraph': {
              'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
              'buttonsVisible': 0
            },
            'moreRich': {
              'buttons': ['insertLink', 'savedReply', 'hcArticle', 'attachChatReply', 'insertImage', 'emoticons', 'insertTable', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
              'buttonsVisible': 6
            },
            // 'moreMisc': {
            //   'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help']
            // }
          },
          quickInsertTags: ['']
          
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
        // FroalaEditor.DefineIcon('attach', { FA5NAME: 'paperclip', template: 'font_awesome_5' });
        // FroalaEditor.RegisterCommand('attach', {
        //   title: 'Insert Attachment',
        //   icon: 'attach',
        //   refreshAfterCallback: true,
        //   callback: function () {
        //     $(`#editor-uploadAttachment`).click();
        //   },
        // });

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

            // $(".saved-replies-btn").click();
            vueThis.$bvModal.show('saved-reply-modal');

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
            vueThis.showHcModal = true;
            console.log("----")
            vueThis.$bvModal.show('helpcenterArticlesModal');
          }
        });

        FroalaEditor.RegisterCommand('send', {
          title: 'Send',
        });

        FroalaEditor.RegisterShortcut(13, 'send', 'send', 'Enter', false, false);
      },
      uploadAttachment(event){
        const selectedFiles = event.target.files;
        const vueThis = this;
        for (let i = 0; i < selectedFiles.length; i++) {
          let selectedFile = selectedFiles[i];
          let hash = Date.now() + '-' + Math.floor(Math.random() * 100000000000);
          var formData = new FormData();
          formData.append('files[]', selectedFile);
          formData.append('mailboxID', vueThis.$route.params.mailboxId);
          let attachmentData = {
            filename: selectedFile["name"],
            filesize: selectedFile["size"],
            progress: 0,
            isUploaded: false
          }

          let attachmentObject = vueThis.current == "reply" ? vueThis.replyAttachments : vueThis.notesAttachments;

          console.log(attachmentObject);

          attachmentObject[hash] = attachmentData;
          Vue.delete(attachmentObject, hash);
          attachmentObject[hash] = attachmentData;
          
          console.log(attachmentObject);

          axios.request({
            method: "post",
            url: "https://app.helpwise.io/api/uploadAttachment.php",
            data: formData,
            withCredentials: true,
            onUploadProgress: function(p){
              let percentage = (p.loaded / p.total) * 100;
              console.log(percentage);
              attachmentObject[hash]["progress"] = percentage;
            }
          })
          .then((response)=>{
            //get the attachment id

            let attachData = response.data.data.files[0];
            let attachID = attachData["id"];

            attachmentObject[attachID] = attachmentObject[hash];
            Vue.delete(attachmentObject, hash);
            attachmentObject[attachID]["isUploaded"] = true;
            attachmentObject[attachID]["progress"] = 100;
            attachmentObject[attachID]["filehash"] = attachData["filehash"];
            attachmentObject[attachID]["filename"] = attachData["filename"];
            attachmentObject[attachID]["filesize"] = attachData["filesize"];
            attachmentObject[attachID]["mimeType"] = attachData["mimeType"];
            attachmentObject[attachID]["extension"] = attachData["extension"];
            attachmentObject[attachID]["id"] = attachID;
          })
        }
      },
      sendMessage(){
        console.log(this.$route.params);

        const editor = this.current == "reply" ?  this.replyEditorInstance : this.noteEditorInstance;
        let attachmentKeys = Object.keys(this.replyAttachments);
        let attachmentIDs = attachmentKeys.filter(attachmentKey => !attachmentKey.includes("-"));

        
        let messageData = {
          mailboxID: this.$route.params.mailboxId,
          mailboxId: this.$route.params.mailboxId,
          threadID: this.$route.params.threadId,
          threadId: this.$route.params.threadId,
          message: editor.html.get(),
          attachmentId: attachmentIDs
        };

        console.log(messageData);

      },
      sendNotes(){
        console.log("kjfhksadjhfjshadjklfh");
      },
      getArticleCardEmail(article) {
          let $imgHtml = "";
          let topBorder = "border-top: 2px solid #0847a0; border-radius: 2px;";
          let $articleCountHtml = "";
          if (article.featured_img) {
              $imgHtml = `
              <div style="height: 200px; width: 100%">
                  <img src="${article.featured_img}" style="height: 200px; width: 100%; margin-left: 0px; margin-right: 0px; max-width: 100%;"></img>
              </div>`
              topBorder = "";
          } else if (article.icon) {
              topBorder = "";
              $articleCountHtml = `
                  <div style="padding: 5px 10px; background-color: #0847a0;">
                      <p style="font-size: 12px; color: white; margin: 0">This collection contains ${article.count} Articles</p>
                  </div>
              `
          }

          // #0847a0 106af6
          return `
              <div class="hw_articleCard" id="hw_articleCard-${article.id}" contenteditable="false" style="
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
                  <a href="${article.url}" target="_blank" contenteditable="false" style="color: inherit;text-decoration: none;display: block;${topBorder}" class="hw_articleCardBodyContainer">

                      <div class="hw_removeArticleCard" style="position: absolute;right: 5px;top: 5px; background: white; border-radius: 50%; padding: 3px; z-index: 1000; display:none; height: 18px; width:18px;">
                          <svg xmlns="http://www.w3.org/2000/svg" style="color: #566476;fill: rgba(27, 46, 75, 0.06); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x "><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </div>

                      ${$imgHtml}

                      <div class="hw_articleCardBody" style="padding-top: 10px;padding-bottom: 10px;padding-left: 20px;padding-right: 20px;flex-grow: 1;flex-shrink: 1;flex-basis: auto;">
                          <h6 class="hw_articleCardTitle" style="margin-bottom: 0.4rem;font-size: 0.875rem;font-weight: 600;line-height: 1.25;color:#0847a0;margin-top: 0; ${article.icon ? "text-align: center" : ""}">${article.title}</h6>
                          <p style="margin-top: 0; color:#9da8b7;" class="hw_articleCardText">${article.description}</p>
                      </div>

                      ${$articleCountHtml}
                  </a>
              </div>
              <div></div>
          `;
      },
      getArticleCard(article){

        let $descHtml = "";
        if(article.description){
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
      }
    },
    beforeMount() {
      this.prepareFroalaButtons()
    },
    created(){
      const vueThis = this;

      bus.$off("deleteAttachmentUpload");
      bus.$on("deleteAttachmentUpload", (id) => {
        console.log("event listened", id);
        if(id){
          Vue.delete(vueThis.attachments, id);
        }
      });

      bus.$off("modal.hcArticleInsert.click");
      bus.$on("modal.hcArticleInsert.click", function(data){
        let editorInstance = vueThis.current == "reply" ? vueThis.replyEditorInstance : vueThis.noteEditorInstance;
        editorInstance.html.insert(vueThis.getArticleCard(data));
      })
      
      bus.$off("modal.savedReplyInsert.click");
      bus.$on("modal.savedReplyInsert.click", function(id){
        let editorInstance = vueThis.current == "reply" ? vueThis.replyEditorInstance : vueThis.noteEditorInstance;

        triggerPromptNotif("Fetching saved reply data");
        fetch(
          `https://app.helpwise.io/api/savedReplies/get?mailboxID=${vueThis.$route.params.mailboxId}&savedReplyID=${id}`,
          {credentials: 'include'}
        ).then(response => response.json())
        .then(response => {
          if(response.status == "success"){
            editorInstance.html.insert(response.data.savedReply.content);
            triggerPromptNotif("Saved Reply Inserted", "success");
          } else {
            triggerPromptNotif("Unable to insert Saved Reply", "error");
          }
        })
      })

      $(document).off("click", "#sendMessage");
      $(document).on("click", "#sendMessage", function(){
        vueThis.sendMessage();
      });

      $(document).off("click", "#sendNotes");
      $(document).on("click", "#sendNotes", function(){
        vueThis.sendNotes();
      });

      $(document).off("click", "#removeHCArticleCard");
      $(document).on("click", "#removeHCArticleCard", function(){
        $(this).parents(".hw_articleCard").remove();
      })
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

  #removeHCArticleCard{
    visibility: hidden;
  }
  .hw_removeArticle:hover{
    visibility: visible;
  }

</style>