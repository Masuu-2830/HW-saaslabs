<template>
  <div id="replyWindowWrapper" v-if="replies.length > 0">
    <mail-content-reply
      v-for="reply in replies"
      :ref="reply.hash"
      :key="reply.hash"
      :reply="reply"
    ></mail-content-reply>
    <!-- <compose v-for="(composer, index) in composers" :key="composer.id" :align="index" :composer="composer" /> -->
  </div>
</template>

<script>
import { bus } from "../../../main";
import MailContentReply from "./MailContentReply.vue";
export default {
  components: { MailContentReply },
  name: "ReplyWrapper",
  data() {
    return {
      replies: [],
      show: false,
    };
  },
  props: {
    thread: Object,
  },
  created() {
    bus.$on("openReply", (data, type, email) => {
      if (email == undefined) {
        let obj = { hash: data, mailboxId: this.thread.data.mailbox_id };
        this.replies.push(obj);
      } else {
        let obj = {
          hash: data,
          id: email.id,
          type: type,
          email: email,
          mailboxId: this.thread.data.mailbox_id,
        };
        this.replies.push(obj);
      }
      this.show = true;
      // const el = this.$refs[data];
      // console.error(el)
      // if (el) {
      //   // Use el.scrollIntoView() to instantly scroll to the element
      //   el.scrollIntoView({ behavior: "smooth" });
      // }
      console.log(this.replies);
    });
    bus.$on("closeReply", (data) => {
      console.log("closing", data);
      // Vue.delete(this.compose, data);
      this.replies = this.replies.filter((el) => el.hash !== data);
      console.log(this.replies);
    });
  },
  methods: {
    addDrafts() {
      if (Object.keys(this.thread).length !== 0) {
        console.log(this.thread.data.drafts);
        for (let i = 0; i < this.thread.data.drafts.length; i++) {
          let hash =
            Date.now() + "-" + Math.floor(Math.random() * 100000000000);
          let obj = {
            hash: hash,
            mailboxId: this.thread.data.mailbox_id,
            draftId: this.thread.data.drafts[i].id,
            type: this.thread.data.drafts[i].replyAll ? 2 : 1,
            email: this.thread.data.drafts[i],
          };
          this.replies.push(obj);
        }
      }
    },
  },
  beforeMount() {
    this.addDrafts();
  },
};
</script>

<style>
</style>