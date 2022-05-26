<template>
  <div
    class="mail-content-body"
    ref="chatcontentbody"
    style="
      background-color: rgb(255, 255, 255);
      overflow: hidden auto;
      background-size: 100% 100%;
    "
  >
    <div
      v-if="loading"
      class="spinner-border text-primary"
      id="threadLoadingSpinner"
      style="position: relative; left: 50%"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="Object.keys(thread).length !== 0" class="emails-wrapper">
      <div v-for="item in thread.data.items" :key="item.timestamp">
        <mail-content-log
          v-if="item.type == 'log'"
          :item="item"
          :mailboxType="thread.data.mailboxType"
        ></mail-content-log>
        <mail-content-comment
          v-else-if="item.type == 'comment'"
          :item="item"
          v-on:deleteComment="deleteComment"
        ></mail-content-comment>
        <chat-content-messenger-right
          v-else-if="item.type == 'facebook' && item.data.type == 1"
          :item="item"
        ></chat-content-messenger-right>
        <chat-content-card
          v-else-if="
            item.type == 'fb-feed' ||
            item.type == 'instagram' ||
            item.type == 'twitter'
          "
          :item="item"
          v-on:deleteTweet="deleteTweet"
        ></chat-content-card>
        <chat-content-message-left
          v-else-if="item.data.type == 0"
          :item="item"
          :mailboxType="thread.data.mailboxType"
        ></chat-content-message-left>
        <chat-content-message-right
          v-else-if="item.data.type == 1"
          :item="item"
          v-on:deleteMessage="deleteComment"
        ></chat-content-message-right>
      </div>
    </div>
    <div
      class="spinner-border text-primary"
      id="threadLoadingSpinnerBottom"
      style="display: none; position: relative; left: 50%"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="Object.keys(thread).length !== 0" id="tweetReplyWindow">
      <chat-content-card-reply
        :mailboxType="thread.data.mailbox_id"
      ></chat-content-card-reply>
    </div>
  </div>
</template>

<script>
import MailContentComment from "../MailContentBody/MailContentComment.vue";
import MailContentLog from "../MailContentBody/MailContentLog.vue";
import ChatContentCard from "./ChatContentCard.vue";
import ChatContentCardReply from "./ChatContentCardReply.vue";
import ChatContentMessageLeft from "./ChatContentMessageLeft.vue";
import ChatContentMessageRight from "./ChatContentMessageRight.vue";
import ChatContentMessengerRight from "./ChatContentMessengerRight.vue";
export default {
  components: {
    ChatContentMessageLeft,
    ChatContentMessageRight,
    MailContentLog,
    MailContentComment,
    ChatContentMessengerRight,
    ChatContentCard,
    ChatContentCardReply,
  },
  name: "ChatContentBody",
  props: {
    thread: Object,
  },
  methods: {
    deleteComment(id) {
      console.log(id);
      this.thread.data.items = this.thread.data.items.filter(
        (item) => item.data.id !== id
      );
    },
    deleteTweet(id) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxID: this.$route.params.mailboxId,
          emailID: id,
          threadID: this.$route.params.threadId,
        }),
        credentials: "include",
      };
      console.log(requestOptions.body);
      fetch(this.$apiBaseURL + "delete-tweet.php", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          this.thread.data.items = this.thread.data.items.filter(
            (item) => item.data.id !== id
          );
        })
        .catch((error) => {
          alert(error);
        });
    },
    onScroll() {
      var el = this.$refs.chatcontentbody;
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 200);
    },
  },
  created() {
    const vueThis = this;
    bus.$on("scrollToBottom", () => {
      this.onScroll()
    });
  },
  data() {
    return {
      loading: false,
      page: 1,
    };
  },
};
</script>

<style>
</style>