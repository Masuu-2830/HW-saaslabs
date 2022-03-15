<template>
    <b-modal class="modal" id="saved-reply-modal">
        <template #modal-title class="modal-header">
            <h5 class="modal-title">Saved Replies</h5>
        </template>
        <div class="modal-body">
            <div id="create-saved-reply" v-if="createSavedReplyForm == true">
                <div class="form-group">
                    <input type="text" class="form-control" :class="{'is-invalid': errorInName == true}" v-model="savedReplyName" placeholder="Name" required>
                    <div class="invalid-feedback" v-if="errorInName == true">Name is Required</div>
                </div>
                <div class="form-group">
                    <b-dropdown text="Insert Variables" class="w-100">
                        <b-dropdown-item href="#" @click="insertVariable('recipient.firstname')">recipient.firstname</b-dropdown-item>
                        <b-dropdown-item href="#" @click="insertVariable('recipient.lastname')">recipient.lastname</b-dropdown-item>
                        <b-dropdown-item href="#" @click="insertVariable('recipient.fullname')">recipient.fullname</b-dropdown-item>
                        <b-dropdown-item href="#" @click="insertVariable('user.firstname')">user.firstname</b-dropdown-item>
                        <b-dropdown-item href="#" @click="insertVariable('user.lastname')">user.lastname</b-dropdown-item>
                        <b-dropdown-item href="#" @click="insertVariable('user.fullname')">user.fullname</b-dropdown-item>
                    </b-dropdown>
                    
                </div>
                <div class="form-group">
                    <!-- <div id="saved-reply-content"></div> -->
                    <froala :tag="'div'" :config="editorConfig"></froala>
                    <div class="invalid-feedback" :class="{'d-block': errorInEditor == true}">Saved Reply cannot be empty</div>
                </div>
            </div>
            <div id="saved-replies-list-wrapper" v-else>
                <div class="input-group">
                    <input type="text" class="form-control form-control-sm" v-model="searchQuery" @keyup="searchSavedReply" placeholder="Seach Saved Replies..">
                </div>
                <div id="saved-replies-list" class="bd mg-t-20 rounded-5" style="overflow-y:auto;max-height:40vh">
                    <div 
                        class="flex-column justify-content-start hw_saved-reply d-flex"
                        v-for="reply in savedReplies"
                        :key="reply.id"
                        @click="insertSavedReplyInEditor(reply.id)"
                    >
                        <div class="tx-14 tx-bold tx-color-01 ml-2 hw_saved-reply-name" style="max-width:100%" v-html="reply.name"></div>
                        <div class="tx-12 tx-color-03 ml-2 flex-grow-1 hw_saved-reply-snippet text-truncate" v-if="reply.snippet.length > 0" v-html="reply.snippet"></div>
                    </div>
                </div>
            </div>
        </div>
        <template #modal-footer class="modal-footer">
            <!-- <div class="mt-2" id="new-saved-reply-btn"> -->
            <div class="d-flex flex-row justify-content-between w-100" v-if="createSavedReplyForm == true">
                <button type="button" class="btn btn-outline-secondary btn-xs" @click="cancelCreateSavedReply">
                    Cancel
                </button>
                <button type="button" class="btn btn-outline-primary btn-xs" @click="createSavedReply" :disabled="{true: isCreating == true}">
                    {{isCreating == true ? "Creating..." : "Create"}}
                </button>
            </div>
            <div class="d-flex flex-row justify-content-start" v-else>
                <button class="btn btn-outline-primary" @click="addNewSavedReply">Add New</button>
            </div>
        </template>
    </b-modal>
</template>

<script>
    import {bus} from "../../main";
    export default {
        data(){
            const self = this;
            return {
                type: "",
                createSavedReplyForm: false,
                savedReplyName: "",
                errorInName: false,
                errorInEditor: false,
                editorInstance: "",
                isCreating: false,
                searchQuery: "",
                editorConfig: {
                    events: {
                        initialized: function() {
                            self.editorInstance = this;
                        }
                    },
                    placeholderText: "Enter your reply here....",
                    charCounterCount: false,
                    toolbarBottom: true,
                    key: 'fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==',
                    heightMin: 200,
                    heightMax: 300,
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
                            buttons: ['insertLink', 'insertImage', 'emoticons', 'insertTable', 'specialCharacters'],
                            buttonsVisible: 3
                        }
                    },
                    // htmlAllowedEmptyTags: ['textarea', 'a', 'iframe', 'object', 'video', 'style', 'script', '.fa', '.fr-emoticon', '.fr-inner', 'path', 'line', 'hr', 'span', 'p', 'circle'],
                    htmlAllowedTags: ['.*'],
                    htmlAllowedAttrs: ['.*'],
                    htmlRemoveTags: ['script'],
                    quickInsertTags: ['']
                },
                savedReplies: [],
                originalSavedReplies: []
            }
        },
        methods: {
            closeModal(){
                this.$bvModal.hide('saved-reply-modal');
            },
            showModal(){
                this.$bvModal.show('saved-reply-modal');
            },
            addNewSavedReply(){
                this.createSavedReplyForm = true;
            },
            cancelCreateSavedReply(){
                this.createSavedReplyForm = false;
            },
            checkFormValidity() {
                if(this.savedReplyName.length == 0){
                    this.errorInName = true;
                    return false;
                } else {
                    this.errorInName = false;
                }

                if($(`<div>${this.editorInstance.html.get()}</div>`).text().length == 0 && $(`<div>${this.editorInstance.html.get()}</div>`).find('img').length == 0){
                    this.errorInEditor = true;
                    return false;
                }

                return true;
            },
            createSavedReply(bvModalEvt){
                bvModalEvt.preventDefault();
                if (!this.checkFormValidity()) {
                    return
                }
                // console.log({
                //     name: this.savedReplyName,
                //     text: this.editorInstance.html.get()
                // });
                this.isCreating = true;
                const vueThis = this;
                fetch(
                    `https://app.helpwise.io/api/create-saved-reply`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            mailboxID: this.$route.params.mailboxId !== undefined ? this.$route.params.mailboxId : this.$store.state.inboxData.id,
                            content: this.editorInstance.html.get(),
                            name: this.savedReplyName
                        })
                    }
                ).then(response => response.json())
                .then(response => {
                    if(response.status == success){
                        this.isCreating = false;
                        vueThis.$nextTick(() => {
                            // vueThis.$bvModal.hide('modal-prevent-closing')
                            vueThis.createSavedReplyForm = false;
                            vueThis.resetCreateForm();
                            vueThis.fetchSavedReplies();
                        })  
                    }
                })
            },
            insertVariable(value){
                this.editorInstance.html.insert(`{{${value}}}`);
            },
            fetchSavedReplies(){
                let fetchURL = 'https://app.helpwise.io/api/list-saved-replies.php';
                if((this.$route.params.mailboxId && this.$route.params.mailboxId!='me') || (this.$store.state.inboxData && this.$store.state.inboxData.id)){
                    let mailboxID = this.$route.params.mailboxId!='me' ? this.$route.params.mailboxId : this.$store.state.inboxData.id;
                    fetchURL = `https://app.helpwise.io/api/list-saved-replies.php?mailboxID=${mailboxID}`;
                }
                fetch(fetchURL,{credentials: "include"}
                ).then(response => response.json())
                .then(response => {
                    this.originalSavedReplies = response.data.savedReplies;
                    this.savedReplies = response.data.savedReplies;
                })
            },
            resetCreateForm(){
                this.savedReplyName = "";
                this.errorInName = false;
                this.errorInEditor = false;
                this.editorInstance.html.set("");
            },
            insertSavedReplyInEditor(id){
                bus.$emit("modal.savedReplyInsert.click", id, this.type);
                this.closeModal();
            },
            searchSavedReply(){
                if(this.searchQuery){
                    const query = this.searchQuery
                    this.savedReplies = this.originalSavedReplies.filter(function(reply){
                        if(reply.name.toLowerCase().includes(query.toLowerCase()))
                            return true;
                    })
                    return;
                }

                this.savedReplies = this.originalSavedReplies;
            }
        },
        created: function(){
            this.fetchSavedReplies();

            bus.$on("savedReply", (type) => {
                this.$bvModal.show('saved-reply-modal');
                this.type = type;
            })
        }
    }
</script>

<style scoped>
    .hw_saved-reply{
        cursor: pointer;
        padding: 10px 20px;
        border-bottom: 1px solid rgba(72, 94, 144, 0.16);
        border-left: 2px solid white;
    }
    .hw_saved-reply:last-child{
       border-bottom: none;
    }

    .hw_saved-reply:hover{
        border-left: 2px solid blue;
    }
</style>