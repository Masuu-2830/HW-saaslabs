<template>
  <div
    v-if="item.type == 'comment' || item.cardType == 'comment'"
    class="comment-body"
    :id="'comment-options-' + item.data.id"
    style="
      margin-left: 20px;
      margin-top: 0px;
      margin-right: 20px;
      padding-bottom: 15px;
    "
  >
    <div class="comment d-flex justify-content-end align-items-end">
      <div
        class="avatar-message d-flex justify-content-start align-items-center"
      >
        <div class="d-flex flex-column align-items-end justify-content-end">
          <div
            class="
              message-name
              d-flex
              flex-column
              justify-content-start
              align-items-start
            "
            style="margin-right: 10px"
          >
            <div
              class="
                d-flex
                align-items-center
                justify-content-center
                flex-row-reverse
              "
              v-on:mouseover="showDelete"
              v-on:mouseleave="hideDelete"
            >
              <div
                class="
                  msg-del-wrapper
                  d-flex
                  flex-column
                  justify-content-start
                  align-items-start
                "
              >
                <span style="font-size: smaller"
                  >{{ item.data.by.firstname }}
                  {{ item.data.by.lastname }}</span
                >
                <div
                  class="card"
                  style="
                    padding: 14px;
                    background-color: #feedaf;
                    max-width: 650px;
                    width: 100%;
                  "
                >
                  <div class="tx-14 commentText" style="color: #222">
                    <p v-html="item.data.body"></p>
                  </div>
                  <div v-if="item.data.attachments !== undefined && Object.keys(item.data.attachments).length > 0" class="list-group" :id="'edit-comment-attachment-'+item.data.id">
                    <a
                      v-for="attach in item.data.attachments"
                      :key="attach.id"
                      :href="'https://app.helpwise.io/attachments/' + attach.id"
                      target="_blank"
                    >
                      <img
                        :src="'https://app.helpwise.io/attachments/' + attach.id"
                        style="
                          max-width: 640px;
                          max-height: 650px;
                          cursor: pointer;
                        "
                    /></a>
                  </div>
                </div>
              </div>
              <div
                class="del-comment-btn ml-1"
                :class="showDel ? 'd-flex' : 'd-none'"
                style="padding-right: 10px"
              >
                <svg
                  v-b-modal="'delete-modal' + item.data.id"
                  style="color: #8392a5; margin-top: 10px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-trash"
                  height="14"
                  width="14"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
                <b-modal
                  :ref="'delete-modal' + item.data.id"
                  :id="'delete-modal' + item.data.id"
                  title="Are you sure to delete this comment?"
                >
                  <div class="modal-body pd-20 pd-sm-30">
                    <span id="modal-text"
                      >Once deleted you won't be able to restore it.</span
                    >
                  </div>
                  <template
                    class="align-items-center justify-content-between"
                    #modal-footer="{ cancel }"
                  >
                    <b-row class="text-center" align-v="center">
                      <b-col class="float-left">
                        <b-button
                          size="xs"
                          variant="outline-secondary"
                          @click="cancel()"
                        >
                          No
                        </b-button>
                      </b-col>
                      <!-- Button with custom close trigger value -->
                      <b-col class="float-right">
                        <b-button
                          @click="deleteComment"
                          size="xs"
                          variant="outline-success"
                        >
                          Yes
                        </b-button>
                      </b-col>
                    </b-row>
                  </template>
                </b-modal>
              </div>
            </div>
          </div>
          <span
            v-if="show"
            class="comment-time tx-13 hw_rel-date"
            :data_date="item.data.at"
            style="
              font-weight: 300;
              font-size: 10px;
              letter-spacing: 0.4px;
              color: #989898;
              margin-right: 10px;
            "
            v-on:mouseover="mouseover"
            v-on:mouseleave="mouseleave"
            >{{ item.timestamp | moment("from", "now", true) }}</span
          >
          <span
            v-if="!show"
            class="comment-time tx-13 hw_rel-date"
            :data_date="item.data.at"
            style="
              font-weight: 300;
              font-size: 10px;
              letter-spacing: 0.4px;
              color: #989898;
              margin-right: 10px;
            "
            v-on:mouseover="mouseover"
            v-on:mouseleave="mouseleave"
            >{{ this.item.timestamp | moment("MMM D, YYYY hh:mm a") }}</span
          >
        </div>
        <div
          class="avatar"
          v-html="item.data.by.avatarTag"
          style="margin-bottom: 7px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailContentComment",
  props: {
    item: Object,
  },
  data() {
    return {
      show: true,
      showDel: false,
    };
  },
  methods: {
    mouseover: function () {
      this.show = false;
    },
    mouseleave: function () {
      this.show = true;
    },
    showDelete: function () {
      this.showDel = true;
    },
    hideDelete: function () {
      this.showDel = false;
    },
    deleteComment() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentID: this.item.data.id,
          mailboxID: this.$route.params.mailboxId,
          threadID: this.$route.params.threadId,
        }),
        credentials: "include",
      };
      console.log(requestOptions.body);
      let url =
        this.$apiBaseURL +
        (this.$store.state.inboxData.type == "mail"
          ? "delete_comments.php"
          : "chat-widget/delete_comment.php");
      console.log(url);
      // fetch(url, requestOptions)
      // .then(async (response) => {
      //   const data = await response.json();
      //   if (data.status !== "success") {
      //     const error = (data && data.message) || response.status;
      //     return Promise.reject(error);
      //   }
      this.$emit("deleteComment", this.item.data.id);
      let ref = "delete-modal" + this.item.data.id;
      this.$refs[ref].hide();
      // })
      // .catch((error) => {
      //   alert(error);
      // });
    },
  },
};
</script>

<style>
</style>