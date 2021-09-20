<template>
  <div
    class="mail-content-body"
    style="
      background-color: rgb(255, 255, 255);
      overflow: hidden auto;
      background-size: 100% 100%;
    "
  >
    <div
      class="spinner-border text-primary"
      id="threadLoadingSpinner"
      style="display: none; position: relative; left: 50%"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div class="emails-wrapper">
      <div v-for="item in thread.data.items" :key="item.timestamp">
        <div
          v-if="item.type == 'log'"
          class="tx-12 thread-log row text-center snooze-log" style="marginRight:20px;"
        >
          <span class="col-6 offset-3 text-center">
            {{ item.data.body }}
          </span>
          <span
            class="hw_rel-date col-3 text-right px-0"
            data_date="item.data.at"
            style="min-width: 180px"
            >{{ item.timestamp | moment("from", "now") }}</span
          >
        </div>
        <div
          v-else-if="item.type == 'sms' && item.data.sent_by != null"
          class="hwEmail comment-body sms-body right-align"
          id="message-options-1001538"
          style="margin-left: 20px; margin-top: 0px; margin-right: 20px"
        >
          <div class="comment d-flex justify-content-end align-items-center">
            <div
              class="
                avtar-message
                d-flex
                justify-content-end
                align-items-center
              "
            >
              <div
                class="d-flex flex-column align-items-end justify-content-end"
              >
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
                      msg-del-wrapper
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                    style=""
                  >
                    <div
                      class="card right_chat_bubble"
                      style="
                        padding: 10px;
                        background-color: #4d8eff;
                        border: none;
                        max-width: 650px;
                        color: white;
                      "
                    >
                      <span
                        class="tx-14"
                        style="
                          font-weight: 300;
                          letter-spacing: 0.4px;
                          font-family: system-ui, -apple-system,
                            BlinkMacSystemFont;
                        "
                        >{{ item.data.body }}</span
                      >
                    </div>
                  </div>
                </div>
                <span
                  class="mg-r-10 hw_rel-date"
                  style="
                    font-weight: 300;
                    font-size: 10px;
                    letter-spacing: 0.4px;
                    color: #989898;
                  "
                  data_date="item.data.at"
                  >{{ item.timestamp | moment("from", "now") }}</span
                >
              </div>
            </div>
            <div class="avatar">
              <div v-html="item.data.sent_by.avatarTag" class="avatar">
                <!-- <span
                class="avatar-initial rounded-circle"
                style="background-color: hsl(-110, 32%, 64%)"
                >CJ</span
              > -->
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="item.type == 'sms' && item.data.sent_by == null"
          class="hwEmail comment-body sms-body left-align uncollapsed"
          id="sms-options-1260425"
          style="margin-left: 20px; margin-top: 0px; margin-right: 20px"
        >
          <div class="comment d-flex justify-content-start align-items-center">
            <div
              class="
                avtar-message
                d-flex
                justify-content-start
                align-items-center
              "
            >
              <div class="avatar">
                <span
                  class="avatar-initial rounded-circle"
                  style="background-color: hsl(-146, 32%, 64%)"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
              </div>
              <div
                class="
                  d-flex
                  flex-column
                  align-items-start
                  justify-content-start
                  pd-l-10
                "
              >
                <div
                  class="
                    message-name
                    d-flex
                    flex-column
                    justify-content-start
                    align-items-start
                  "
                  style="padding-right: 20px"
                >
                  <div
                    class="
                      msg-del-wrapper
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                    style=""
                  >
                    <div
                      class="card left_chat_bubble"
                      style="
                        padding: 10px;
                        background-color: #ececec;
                        border: none;
                        max-width: 650px;
                        margin-top: 5px;
                      "
                    >
                      <span
                        class="tx-14"
                        style="
                          font-weight: 300;
                          letter-spacing: 0.4px;
                          font-family: system-ui, -apple-system,
                            BlinkMacSystemFont;
                        "
                        >{{ item.data.body }}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  class="mg-l-10 hw_rel-date"
                  style="
                    font-weight: 300;
                    font-size: 10px;
                    letter-spacing: 0.4px;
                    color: #989898;
                  "
                  data_date="item.data.at"
                  >{{ item.timestamp | moment("from", "now") }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="item.type == 'comment'"
          class="comment-body"
          id="comment-options-611346"
          style="margin-left: 20px; margin-top: 20px; margin-right: 20px"
        >
          <div
            class="comment d-flex justify-content-between align-items-center"
          >
            <div
              class="
                avtar-message
                d-flex
                justify-content-start
                align-items-center
              "
            >
              <div v-html="item.data.by.avatarTag" class="avatar">
                
              </div>
              <div
                class="
                  message-name
                  d-flex
                  flex-column
                  justify-content-start
                  align-items-start
                "
                style="margin-left: 10px; margin-bottom: 10px"
              >
                <span class="tx-12" style="font-weight: 300"
                  >{{item.data.by.firstname}} {{item.data.by.lastname}}</span
                >
                <div
                  class="
                    msg-del-wrapper
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <div
                    class="card"
                    style="
                      padding: 5px;
                      background-color: #feedaf;
                      max-width: 650px;
                    "
                  >
                    <div class="tx-13" id="edit-comment-611346">
                      <div v-html="item.data.body"></div>
                    </div>
                    <div
                      class="list-group"
                      id="edit-comment-attachment-611346"
                    ></div>
                  </div>
                  <span
                    ><div
                      class="edit-comment-btn ml-1"
                      id="edit-comment-btn-611346"
                    >
                      <svg
                        style="color: #8392a5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-edit-2"
                      >
                        <path
                          d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                        ></path>
                      </svg></div
                  ></span>
                  <span
                    ><div class="delete-comment-btn ml-1">
                      <svg
                        style="color: #8392a5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-trash"
                        height="18"
                        width="18"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        ></path>
                      </svg></div
                  ></span>
                </div>
              </div>
            </div>
            <div
              class="comment-time hw_rel-date text-right tx-12"
              data_date="item.data.at"
              
              style="min-width: 180px; font-weight: 300"
            >
              {{ item.timestamp | moment("from", "now") }}
            </div>
          </div>
        </div>
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
    <div id="tweetReplyWindow"></div>
    <div id="replyWindowWrapper"></div>
  </div>
</template>

<script>
export default {
  name: "ChatContentBody",
  props: {
    thread: Object,
  },
};
</script>

<style>
</style>