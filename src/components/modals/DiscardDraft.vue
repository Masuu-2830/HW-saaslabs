<template>
  <div>
    <b-modal class="modal" id="discardDraftModal">
      <template #modal-title class="modal-header">
        <h5 class="modal-title">Attention Required!</h5>
      </template>
      <div class="modal-body" style="padding: 0px;">
        <p style="margin-bottom: 0px;">Are you sure you want to discard this draft?</p>
      </div>
      <template
        class="align-items-center justify-content-between"
        #modal-footer="{ cancel }"
      >
        <b-row class="text-center" align-v="center">
          <b-col>
            <b-button size="xs" variant="secondary" @click="cancel()">
              No
            </b-button>
          </b-col>
          <b-col style="padding-left: 0px;">
            <b-button @click.stop="close" size="xs" variant="primary">
              Yes
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { bus, triggerPromptNotif } from "../../main";
export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    close() {
      console.log(this.data, this.data.draftID, this.data.threadID);
      let requestOptions = {};
      let url = "";
      if (this.data.type == "replyCard" || this.data.type == "tweetCompose") {
        url = "https://app.helpwise.io/api/discard_tweet_draft.php";
        let threadId = new Array();
        threadId.push(this.data.threadID);
        requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mailboxId: this.data.mailboxID,
            threadIds: threadId,
          }),
          credentials: "include",
        };
      } else {
        url = "https://app.helpwise.io/api/discardDraft.php";
        console.log(this.data, this);
        requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mailboxId: this.data.mailboxID,
            threadId: this.data.threadID,
            draftId: this.data.draftID,
          }),
          credentials: "include",
        };
      }
      console.log(requestOptions);
      fetch(url, requestOptions).then(async (response) => {
        const data = await response.json();
        if (data.status !== "success") {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        // console.log(vueThis);
        // vueThis.closeCompose(this.composer.hash);
        if (
          this.data.type == "compose" ||
          this.data.type == "tweetCompose" ||
          this.data.type == "smsCompose"
        ) {
          console.log("compose from main");
          bus.$emit("closeCompose", this.data.composer.hash);
        } else if (this.data.type == "reply") {
          console.log("reply from main");
          bus.$emit("closeReply", this.data.reply.hash);
        } else if (this.data.type == "replyCard") {
          console.log("replyCard from main");
          bus.$emit("closeReplyCard", this.data.draftID);
        }
        this.$bvModal.hide("discardDraftModal");
      });
    },
  },
  created() {
    bus.$on("discardDraftModalll", (data) => {
      console.log("trigger hua kya?", data);
      this.data = data;
      this.$bvModal.show("discardDraftModal");
    });
  },
};
</script>

<style scoped>
</style>