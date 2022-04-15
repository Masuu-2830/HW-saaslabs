<template>
  <div
    v-if="item.data.type == 1"
    class="comment-body sms-body right-align"
    :id="'sms-options-' + item.data.id"
    style="
      margin-left: 20px;
      padding-top: 8px;
      margin-right: 20px;
      padding-bottom: 8px;
    "
  >
    <div class="comment d-flex justify-content-end align-items-end">
      <div class="avtar-message d-flex justify-content-end align-items-center">
        <div
          class="
            d-flex
            flex-column
            align-items-end
            justify-content-end
            hw-sent-message
          "
        >
          <div
            class="message-name d-flex justify-content-end align-items-center"
            style="margin-right: 10px"
            v-on:mouseover="showDelete"
            v-on:mouseleave="hideDelete"
          >
            <div
              class="hw_message_delete align-items-center pd-5"
              style="cursor: pointer"
              :class="showDel ? 'd-flex' : 'd-none'"
            >
              <svg
                v-b-modal="'deleteMes-modal' + item.data.id"
                style="color: #8392a5"
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
                :ref="'deleteMes-modal' + item.data.id"
                :id="'deleteMes-modal' + item.data.id"
                title="Attention!!!"
              >
                <div class="modal-body pd-20 pd-sm-30">
                  <span id="modal-text"
                    >You want to delete this message. Are you sure?</span
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
                        @click="deleteMessage"
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
            <div
              class="
                msg-del-wrapper
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <div
                class="
                  card
                  right_chat_bubble
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-start
                "
                style="
                  padding: 14px;
                  background-color: aliceblue;
                  color: #262626;
                  border: none;
                  max-width: 650px;
                "
              >
                <div
                  class="
                    d-flex
                    align-items-between
                    flex-row
                    justify-content-between
                  "
                  style="width: 100%"
                >
                  <span
                    style="
                      color: inherit;
                      font-size: 14px;
                      font-family: inherit;
                      margin-bottom: 0;
                      width: 100%;
                    "
                    v-html="item.data.text"
                  ></span>
                </div>
                <br />
                <div v-if="item.data.attachment !== undefined && item.data.attachment.length > 0" class="d-flex align-items-end">
                  <i
                    class="fas fa-paperclip mg-r-2 pd-b-5 tx-color-03 tx-14"
                  ></i>
                  <a v-for="attach in item.data.attachment" :key="attach.id"
                    :href="attach.url"
                    target="_blank"
                    class="btn btn-link pd-0"
                    style="text-decoration: underline"
                  >
                    {{attach.name}}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="d-flex hw-sent-message"
            v-on:mouseover="mouseover"
            v-on:mouseleave="mouseleave"
          >
            <span
              v-if="show"
              class="mg-r-10 hw_rel-date"
              style="
                font-weight: 300;
                font-size: 10px;
                letter-spacing: 0.4px;
                color: #989898;
              "
              :data_date="item.data.date"
              >{{ item.data.date | moment("from", "now", true) }}</span
            >
            <span
              v-if="!show"
              class="mg-r-10 hw_rel-date"
              style="
                font-weight: 300;
                font-size: 10px;
                letter-spacing: 0.4px;
                color: #989898;
              "
              :data_date="item.data.date"
              >{{ item.data.date | moment("MMM D, YYYY hh:mm a") }}</span
            >
          </div>
        </div>
      </div>
      <div class="avatar hw-sent-avatar mg-b-15">
        <div class="avatar" v-html="item.data.sentBy.avatarTag"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatContentMessageRight",
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
    deleteMessage() {
      //   const requestOptions = {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       messageID: this.item.data.id,
      //       mailboxID: this.$route.params.mailboxId,
      //       conversationID: this.$route.params.threadId,
      //     }),
      //     credentials: "include",
      //   };
      //   console.log(requestOptions.body);
      //   fetch(this.$apiBaseURL + "chat-widget/deleteInboxMessage", requestOptions)
      //     .then(async (response) => {
      //       const data = await response.json();
      //       if (data.status !== "success") {
      //         const error = (data && data.message) || response.status;
      //         return Promise.reject(error);
      //       }
      this.$emit("deleteMessage", this.item.data.id);
      let ref = "deleteMes-modal" + this.item.data.id;
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