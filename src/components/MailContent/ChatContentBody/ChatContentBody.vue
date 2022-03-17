<template>
  <div
    @scroll="onScroll"
    class="mail-content-body"
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
        <mail-content-log v-if="item.type == 'log'" :item="item"></mail-content-log>
        <mail-content-comment v-else-if="item.type == 'comment'" :item="item" v-on:deleteComment="deleteComment"></mail-content-comment>
        <chat-content-messenger-right v-else-if="item.type == 'facebook' && item.data.type == 1" :item="item"></chat-content-messenger-right>
        <chat-content-card v-else-if="item.type == 'fb-feed' || item.type == 'instagram' || item.type == 'twitter'" :item="item" v-on:deleteTweet="deleteTweet"></chat-content-card>
        <chat-content-message-left v-else-if="item.data.type == 0" :item="item"></chat-content-message-left>
        <chat-content-message-right v-else-if="item.data.type == 1" :item="item" v-on:deleteMessage="deleteComment"></chat-content-message-right>
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
      <chat-content-card-reply :mailboxType="thread.data.mailbox_id"></chat-content-card-reply>
    </div>
  </div>
</template>

<script>
import MailContentComment from '../MailContentBody/MailContentComment.vue';
import MailContentLog from '../MailContentBody/MailContentLog.vue';
import ChatContentCard from './ChatContentCard.vue';
import ChatContentCardReply from './ChatContentCardReply.vue';
import ChatContentMessageLeft from './ChatContentMessageLeft.vue';
import ChatContentMessageRight from './ChatContentMessageRight.vue';
import ChatContentMessengerRight from './ChatContentMessengerRight.vue';
export default {
  components: { ChatContentMessageLeft, ChatContentMessageRight, MailContentLog, MailContentComment, ChatContentMessengerRight, ChatContentCard, ChatContentCardReply },
  name: "ChatContentBody",
  props: {
    thread: Object,
  },
  methods: {
    deleteComment(id) {
      console.log(id);
      this.thread.data.items = this.thread.data.items.filter(item => item.data.id !== id);
    },
    deleteTweet(id) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mailboxID: this.$route.params.mailboxId,
          emailID: id,
          threadID: this.$route.params.threadId
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
          this.thread.data.items = this.thread.data.items.filter(item => item.data.id !== id);
        })
        .catch((error) => {
          alert(error);
        });
    },
    onScroll ({ target: { scrollTop }}) {
      if (scrollTop == 0) {
        // this.loading = true;
        this.page += 1; 
        console.log(this.thread.data);
        // const response = await fetch(
        //   this.$apiBaseURL +
        //     "unifiedv2/getThreadData.php?threadID=" +
        //     this.$route.params.threadId +
        //     "&mailboxID=" +
        //     this.$route.params.mailboxId +
        //     "&inboxType=" +
        //     this.thread.data.mailboxType +
        //     "&inboxSubType=" +
        //     this.thread.data.mailboxSubType +
        //     "&labelID=" +
        //     this.thread.data.labelId +
        //     "&maxDate=0&page=" + this.page,
        //   {credentials: "include"}
        // );
        // const data = await response.json();
        // if (this.$store.state.userSettings.orderThread == "asc") {
        //   data.data.items = data.data.items.sort(
        //     (b, a) => b.timestamp - a.timestamp
        //   );
        // } else {
        //   data.data.items = data.data.items.sort(
        //     (b, a) => a.timestamp - b.timestamp
        //   );
        // }
        // this.thread.items.unshift(data.data.items);
      }
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      // thread: {
      //   status: "success",
      //   data: {
      //     items: [
      //       {
      //         data: {
      //           body: "Masood Muhammad assigned the conversation to Ayush Rastogi",
      //           at: "2021-12-24T09:46:34+0000",
      //           type: "assignment",
      //         },
      //         cardType: "log",
      //         timestamp: 1640339194,
      //       },
      //       {
      //         cardType: "comment",
      //         data: {
      //           id: 587835,
      //           at: "2021-08-02T09:06:20+0000",
      //           body: '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">\n<html><body><span class="mention-highlight" contenteditable="false" data-id="214897">@Masood&nbsp;</span>&nbsp;<br><br></body></html>\n',
      //           by: {
      //             id: 214897,
      //             firstname: "Masood",
      //             lastname: "Muhammad",
      //             email: "masood@saaslabs.co",
      //             avatarTag:
      //               "<span class='avatar-initial rounded-circle' style='background-color: hsl(125,32%,64%)'>MM</span>",
      //           },
      //           attachments: [],
      //         },
      //         timestamp: 1627895180,
      //       },
      //       {
      //         cardType: "comment",
      //         data: {
      //           id: 587833,
      //           at: "2021-08-02T09:06:07+0000",
      //           body: '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">\n<html><body><p>cmoajppaa</p></body></html>\n',
      //           by: {
      //             id: 214897,
      //             firstname: "Masood",
      //             lastname: "Muhammad",
      //             email: "masood@saaslabs.co",
      //             avatarTag:
      //               "<span class='avatar-initial rounded-circle' style='background-color: hsl(125,32%,64%)'>MM</span>",
      //           },
      //           attachments: [],
      //         },
      //         timestamp: 1627895167,
      //       },
      //       {
      //         data: {
      //           body: "Masood Muhammad assigned the conversation to themselves",
      //           at: "2021-08-02T09:06:00+0000",
      //           type: "assignment",
      //         },
      //         cardType: "log",
      //         timestamp: 1627895160,
      //       },
      //       {
      //         cardType: "message",
      //         data: {
      //           id: 717069,
      //           contact_id: 1096740,
      //           contactName: "Mayank Banga",
      //           contactType: "2",
      //           client_number: 441480,
      //           body: "<html><head></head><body>malmolpc</body></html>",
      //           snippet: "malmolpc",
      //           message_time: "2021-08-02T09:05:58+0000",
      //           type: 1,
      //           delivery_status: "Sent",
      //           at: "2021-08-02T09:05:58+0000",
      //           sent_by: {
      //             id: 214897,
      //             firstname: "Masood",
      //             lastname: "Muhammad",
      //             email: "masood@saaslabs.co",
      //             avatarTag:
      //               "<span class='avatar-initial rounded-circle' style='background-color: hsl(125,32%,64%)'>MM</span>",
      //           },
      //           attachment: [],
      //           isEmailed: "0",
      //           unifiedThreadID: 11228105,
      //         },
      //         timestamp: 1627895158,
      //       },
      //       {
      //         cardType: "message",
      //         data: {
      //           id: 710660,
      //           contact_id: 1096740,
      //           contactName: "Mayank Banga",
      //           contactType: "2",
      //           client_number: 441480,
      //           body: "<html><head></head><body>dfasd</body></html>",
      //           snippet: "dfasd",
      //           message_time: "2021-07-23T18:55:07+0000",
      //           type: 1,
      //           delivery_status: "Sent",
      //           at: "2021-07-23T18:55:07+0000",
      //           sent_by: {
      //             id: 0,
      //             firstname: "WhatsApp",
      //             lastname: "Bot",
      //             email: "whatsapp_bot@helpwise.io",
      //             avatarTag:
      //               "<img src='https://app.helpwise.io/assets/images/chatRobot.png' data-toggle='tooltip' title='Operator'>",
      //           },
      //           attachment: [],
      //           isEmailed: "0",
      //           unifiedThreadID: 11228105,
      //         },
      //         timestamp: 1627066507,
      //       },
      //       {
      //         cardType: "message",
      //         data: {
      //           id: 710659,
      //           contact_id: 1096740,
      //           contactName: "Mayank Banga",
      //           contactType: "2",
      //           client_number: 441480,
      //           body: "<html><head></head><body>4</body></html>",
      //           snippet: "4",
      //           message_time: "2021-07-23T18:55:05+0000",
      //           type: 0,
      //           delivery_status: "Sent",
      //           at: "2021-07-23T18:55:05+0000",
      //           sent_by: {
      //             id: 0,
      //             firstname: "WhatsApp",
      //             lastname: "Bot",
      //             email: "whatsapp_bot@helpwise.io",
      //             avatarTag:
      //               "<img src='https://app.helpwise.io/assets/images/chatRobot.png' data-toggle='tooltip' title='Operator'>",
      //           },
      //           attachment: [],
      //           isEmailed: "0",
      //           unifiedThreadID: 11228105,
      //         },
      //         timestamp: 1627066505,
      //       },
      //       {
      //         cardType: "message",
      //         data: {
      //           id: 710658,
      //           contact_id: 1096740,
      //           contactName: "Mayank Banga",
      //           contactType: "2",
      //           client_number: 441480,
      //           body: "<html><head></head><body>ddfdas</body></html>",
      //           snippet: "ddfdas",
      //           message_time: "2021-07-23T18:54:58+0000",
      //           type: 1,
      //           delivery_status: "Sent",
      //           at: "2021-07-23T18:54:58+0000",
      //           sent_by: {
      //             id: 0,
      //             firstname: "WhatsApp",
      //             lastname: "Bot",
      //             email: "whatsapp_bot@helpwise.io",
      //             avatarTag:
      //               "<img src='https://app.helpwise.io/assets/images/chatRobot.png' data-toggle='tooltip' title='Operator'>",
      //           },
      //           attachment: [],
      //           isEmailed: "0",
      //           unifiedThreadID: 11228105,
      //         },
      //         timestamp: 1627066498,
      //       },
      //       {
      //         cardType: "message",
      //         data: {
      //           id: 710657,
      //           contact_id: 1096740,
      //           contactName: "Mayank Banga",
      //           contactType: "2",
      //           client_number: 441480,
      //           body: "<html><head></head><body>2</body></html>",
      //           snippet: "2",
      //           message_time: "2021-07-23T18:54:57+0000",
      //           type: 0,
      //           delivery_status: "Sent",
      //           at: "2021-07-23T18:54:57+0000",
      //           sent_by: {
      //             id: 0,
      //             firstname: "WhatsApp",
      //             lastname: "Bot",
      //             email: "whatsapp_bot@helpwise.io",
      //             avatarTag:
      //               "<img src='https://app.helpwise.io/assets/images/chatRobot.png' data-toggle='tooltip' title='Operator'>",
      //           },
      //           attachment: [],
      //           isEmailed: "0",
      //           unifiedThreadID: 11228105,
      //         },
      //         timestamp: 1627066497,
      //       },
      //     ],
      //     contact: {
      //       id: 1096740,
      //       firstname: "Mayank",
      //       lastname: "Banga",
      //       middlename: "",
      //       emails: ["mayank@justcall.io"],
      //       phones: [{ phoneNo: "0", type: "0", phoneTxt: "8976416598" }],
      //       activities: [],
      //       threads: [],
      //       isBlocked: false,
      //       company: "",
      //       jobTitle: "",
      //       avatarUrl: null,
      //       avatarTag:
      //         "<span class='avatar-initial rounded-circle' style='background-color: hsl(272,32%,64%)'>MB</span>",
      //       notes: [],
      //       groups: [
      //         { group_id: 204377, name: "wsxwxx" },
      //         { group_id: 204378, name: "ddd" },
      //         { group_id: 204379, name: "new grp" },
      //         { group_id: 204392, name: "tgvft" },
      //         { group_id: 204394, name: " mmmmmmm" },
      //         { group_id: 204395, name: "mdg" },
      //       ],
      //     },
      //     usersReadMap: {
      //       214897: { hasRead: true, readAt: "2021-12-24T10:10:01+0000" },
      //     },
      //     activities: [],
      //     tags: [],
      //     draft: [],
      //     currentAssignment: {
      //       id: 211561,
      //       firstname: "Ayush",
      //       lastname: "Rastogi",
      //       email: "ayush@test.com",
      //       avatarTag:
      //         "<span class='avatar-initial rounded-circle' style='background-color: hsl(53,32%,64%)'>AR</span>",
      //     },
      //     filterDate: "1627066497",
      //     unreadCount: "0",
      //     isBotActive: 0,
      //     botIdentity: [],
      //   },
      //   message: null,
      // },
    };
  },
};
</script>

<style>
</style>