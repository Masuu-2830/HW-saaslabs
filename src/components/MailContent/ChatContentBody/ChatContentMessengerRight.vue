<template>
  <div
    class="comment-body sms-body right-align"
    :id="'message-options-' + item.data.id"
    style="margin-left: 20px; margin-top: 0px; margin-right: 60px"
  >
    <div class="comment d-flex justify-content-end align-items-center">
      <div class="d-flex flex-column align-items-end justify-content-end">
        <div
          class="
            message-name-receive
            d-flex
            flex-column
            justify-content-end
            align-items-end
          "
          v-on:mouseover="showUser"
          v-on:mouseleave="hideUser"
          style=""
        >
          <span
            class="member-name"
            :style="!showUsr && 'visibility: hidden'"
            style="
              font-weight: 300;
              margin-right: 18px;
              font-size: 12px;
              letter-spacing: 0.4px;
              color: rgb(152, 152, 152);
            "
            >{{ item.data.sentBy.firstname }}
            {{ item.data.sentBy.lastname }}</span
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
              class="card right_chat_bubble shadow-sm"
              style="
                padding: 14px;
                background-color: #4d8eff;
                border-radius: 28px;
                max-width: 650px;
                color: white;
                margin-right: 18px;
              "
            >
              <div v-if="item.data.attachments !== null && item.data.attachments.length > 0">
                <div
                  v-for="attachment in item.data.attachments"
                  :key="attachment.attachment_url"
                >
                  <a
                    v-if="
                      attachment.attachment_type == 'image'
                    "
                    :href="attachment.attachment_url"
                    target="_blank"
                    ><img
                      :src="attachment.attachment_url"
                      alt="image"
                      :name="attachment.file_name"
                      class=""
                      style="
                        object-fit: contain;
                        border-radius: 28px;
                        max-height: 200px;
                        max-width: 400px;
                        min-width: 100px;
                      "
                  /></a>
                  <video
                    v-if="
                      attachment.attachment_type == 'video'
                    "
                    controls=""
                    style="
                      height: 230px;
                      width: 300px;
                      object-fit: cover;
                      border-radius: 28px;
                    "
                    class=""
                  >
                    <source
                      :src="attachment.attachment_url"
                      type="video/mp4"
                      :name="attachment.file_name"
                    />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
              </div>
              <span
                v-html="item.data.text.replace(/amp;/g,'').replace(/\n/g, '<br>')"
                class="tx-14"
                style="
                  font-weight: 300;
                  letter-spacing: 0.4px;
                  font-family: system-ui, -apple-system, BlinkMacSystemFont;
                "
              >
                <!-- {{ item.data.text }} -->
              </span>
            </div>
          </div>
        </div>
        <div
          style="margin-right: 18px"
          v-on:mouseover="mouseover"
          v-on:mouseleave="mouseleave"
        >
          <span
            v-if="show"
            class="mg-r-3 hw_rel-date"
            style="
              font-weight: 300;
              font-size: 12px;
              letter-spacing: 0.4px;
              color: #989898;
            "
            :data_date="item.data.date"
            >{{ item.timestamp | moment("from", "now", true) }}</span
          >
          <span
            v-if="!show"
            class="mg-r-3 hw_rel-date"
            style="
              font-weight: 300;
              font-size: 12px;
              letter-spacing: 0.4px;
              color: #989898;
            "
            :data_date="item.data.date"
            >{{ item.timestamp | moment("MMM D, YYYY hh:mm a") }}</span
          >
          <span
            v-if="
              item.data.deliveryStatus == 'Received' &&
              item.data.sentBy.id !== -1
            "
            data-toggle="tooltip"
            :title="'Seen ' + seenAt"
          >
            <svg
              :id="'message-icon-' + item.data.id"
              data-toggle="tooltip"
              :title="'Seen ' + seenAt"
              style="color: #3b89f7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 15"
              width="16"
              height="15"
            >
              <path
                fill="#3b89f7"
                d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
              ></path>
            </svg>
          </span>
          <span
            v-if="
              item.data.deliveryStatus == 'Delivered' &&
              item.data.sentBy.id !== -1
            "
            data-toggle="tooltip"
            title="Delivered"
          >
            <svg
              data-toggle="tooltip"
              :id="'message-icon-' + item.data.id"
              title="Delivered"
              style="color: #989898"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 15"
              width="16"
              height="15"
              data-original-title="Delivered"
            >
              <path
                fill="currentColor"
                d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
              ></path>
            </svg>
          </span>
          <span v-if="item.data.sentBy.id == -1" data-toggle="tooltip"
            title="Sent from Facebook">
            <svg
              aria-hidden="true"
              width="13"
              height="13"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook"
              data-toggle="tooltip"
              title="Sent from Facebook"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="svg-inline--fa fa-facebook fa-w-16"
              style="color: #989898"
            >
              <path
                fill="currentColor"
                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                class=""
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div v-html="item.data.sentBy.avatarTag" class="avatar">
        <!-- <span class="avatar-initial rounded-circle" style="background: white"
          ><span
            class="avatar-initial rounded-circle"
            style="background-color: hsl(120, 32%, 64%)"
            >TS</span
          ></span
        > -->
      </div>
    </div>
  </div>
</template>

<script>
// type 1
export default {
  name: "ChatContentMessengerRight",
  props: {
    item: Object,
  },
  data() {
    return {
      show: true,
      showUsr: false,
    };
  },
  methods: {
    mouseover: function () {
      this.show = false;
    },
    mouseleave: function () {
      this.show = true;
    },
    showUser: function () {
      this.showUsr = true;
    },
    hideUser: function () {
      this.showUsr = false;
    },
  },
  computed: {
    seenAt() {
      if (this.item.data.deliveryStatus == "Received") {
        console.log(moment(this.item.data.date)("from", "now", true));
        return moment(this.item.data.date)("from", "now", true);
      }
    },
  },
};
</script>

<style>
</style>