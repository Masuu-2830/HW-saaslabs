<template>
  <div
    class="mail-body hw-email card shadow-sm pt-0 pl-3 pr-3 pb-0 mb-2 bg-white"
    :id="'email-' + item.data.id"
    style="
      margin-left: auto;
      margin-top: 20px;
      margin-right: auto;
      max-width: 600px;
      min-width: 100px;
    "
  >
    <div class="pd-2 pd-lg-2 pd-xl-2">
      <div class="from-email d-flex justify-content-between align-items-start">
        <!-- style="float:left;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);padding:7px;" -->
        <div class="d-flex justify-content-start" style="padding: 3px;*/">
          <div
            class="avatar-name d-flex justify-content-start align-items-center"
          >
            <div class="email-addresses rounded d-flex" style="padding: 5px">
              <div
                class="avatar avatar mr-2"
                style="cursor: default"
                v-html="
                  item.type == 'twitter'
                    ? item.data.img
                    : item.data.sentBy.avatarTag
                "
              ></div>
              <div v-if="item.type == 'twitter'" class="mg-b-0">
                <strong style="cursor: default">{{
                  Object.values(item.data.from).toString()
                }}</strong
                ><a
                  target="_blank"
                  :href="
                    'https://www.twitter.com/' +
                    Object.keys(item.data.from).toString().substring(2)
                  "
                >
                  <div style="cursor: pointer" class="copyable tx-color-03">
                    {{ Object.keys(item.data.from).toString() }}
                  </div></a
                >
              </div>
              <div v-else class="mg-b-0">
                <strong style="cursor: default">{{
                  item.data.isPost == true
                    ? item.data.postData.postUserName
                    : item.data.sentBy.firstname +
                      " " +
                      item.data.sentBy.lastname
                }}</strong
                ><a
                  v-if="item.type == 'instagram'"
                  target="_blank"
                  :href="
                    'https://www.instagram.com/' +
                    item.data.postData.postUserName
                  "
                >
                  <div style="cursor: pointer" class="copyable tx-color-03">
                    test_helpwise
                  </div></a
                >
              </div>
              <a
                v-if="item.type == 'instagram'"
                target="_blank"
                :href="item.data.postData.postLink"
                class="mg-l-5 post_link"
                style="color: #8392a5"
                data-toggle="tooltip"
                title="Click to open post"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  data-toggle="tooltip"
                  title="Click to open post"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-instagram"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  ></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg
              ></a>
              <a
                v-if="item.type == 'fb-feed' && item.data.postData !== undefined"
                target="_blank"
                :href="item.data.postData.postLink"
                class="mg-l-5 post_link"
                style="color: #8392a5"
                data-toggle="tooltip"
                title="Click to open post"
                ><svg
                  aria-hidden="true"
                  width="13"
                  height="13"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook"
                  data-toggle="tooltip"
                  title="Click to open post"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="svg-inline--fa fa-facebook fa-w-16"
                  style="color: #989898"
                  data-original-title="Click to open post"
                >
                  <path
                    fill="currentColor"
                    d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                    class=""
                  ></path></svg
              ></a>
            </div>
          </div>
        </div>
        <div
          class="email-time-seen d-flex align-items-center"
          style="padding: 8px"
        >
          <div class="email-time d-flex align-items-center">
            <span id="tweet-time" class="tx-12 tx-color-03" style="float: right"
              ><span
                style="cursor: pointer"
                :date-data="item.data.date"
                class="addr-hideable copyable"
                >{{ item.timestamp | moment("from", "now", true) }}</span
              ></span
            >
            <div v-if="item.type == 'twitter'" class="dropdown">
              <span
                class="three-dot"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style="
                  float: right;
                  margin-left: 20px;
                  margin-bottom: 3px;
                  cursor: pointer;
                "
                ><svg
                  xmlns="https://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-more-vertical"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle></svg
              ></span>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <button
                  type="button"
                  class="dropdown-item delete-email-btn"
                  :id="'delete-email-' + item.data.id"
                  @click.stop.prevent="$emit('deleteTweet', item.data.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr style="margin-top: 0px !important; margin-bottom: 0px !important" />

    <div
      v-if="item.data.attachments !== null && item.data.attachments.length > 0"
      class="row mg-l-4"
      style="display: contents"
    >
      <div
        v-for="attachment in item.data.attachments"
        :key="attachment.attachment_url"
      >
        <a
          v-if="attachment.attachment_type == 'image'"
          alt="img"
          :href="attachment.attachment_url"
          target="_blank"
          draggable="true"
          style="
            background-size: cover;
            background-repeat: no-repeat;
            width: 100%;
            height: 400px;
            border-radius: 15px;
            margin-bottom: 10px;
            cursor: pointer;
            margin-top: 10px;
            border: 1px solid #ccd6dd;
            background-position: center center;
          "
          :style="'background-image: url(' + attachment.attachment_url + ');'"
        >
        </a>
        <video
          v-if="attachment.attachment_type == 'video'"
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
    <div
      class="email-html pl-2"
      style="padding-top: 10px; padding-bottom: 10px"
    >
      <div id="hw_renderWrapper1643270686114" style="" class="hw_renderWrapper">
        <pre
          style="
            color: inherit;
            font-size: inherit;
            font-family: inherit;
            word-wrap: break-word;
            white-space: pre-wrap;
          ">{{item.data.text}}<pre></pre></pre>
      </div>
    </div>

    <div
      class="card-footer d-flex flex-column justify-content-start"
      style="
        padding: 0px !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      "
    >
      <div class="d-flex flex-row m-0 reply-row">
        <div class="col-1">
          <button
            @click.stop.prevent="openCardReply"
            class="p-2 reply-btn"
            data-toggle="tooltip"
            title="Reply"
            data-original-title="Reply"
            style="
              background: none;
              color: #8392a5;
              border: none;
              cursor: pointer;
            "
          >
            <svg
              viewBox="0 0 24 24"
              class=""
              style="
                width: 18px;
                height: 18px;
                /* color: #8392a5; */
                fill: #8392a5;
              "
            >
              <g>
                <path
                  d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <div v-if="item.type == 'twitter'" class="col-1 like">
          <button
            @click.stop.prevent="toggleLike"
            class="p-2 like_"
            id="like-219160"
            data-toggle="tooltip"
            title="Like"
            data-original-title="Like"
            style="
              background: none;
              color: #8392a5;
              border: none;
              cursor: pointer;
            "
          >
            <i
              v-if="item.data.isLiked == '1'"
              class="fas fa-heart"
              style="
                font-size: 17px;
                color: rgb(224, 36, 94);
                padding-top: 2px;
                margin-left: 0px;
              "
            ></i>
            <i
              v-else
              class="far fa-heart"
              style="
                font-size: 17px;
                color: #8392a5;
                padding-top: 2px;
                margin-left: 0px;
              "
            ></i>
          </button>
        </div>
        <div
          v-if="item.type == 'twitter'"
          class="col-1"
          style="margin-left: 0px; margin-bottom: 0px; margin-top: 0px"
        >
          <button
            class="stp p-2"
            data-toggle="tooltip"
            title="Retweet"
            data-original-title="Retweet"
            style="
              background: none;
              border: none;
              cursor: pointer;
            "
            :style="{color: item.data.isRetweeted ? 'rgb(23, 191, 99)' : '#8392a5'}"
          >
            <svg viewBox="0 0 24 24" class="stp1">
              <g>
                <path
                  d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../../../main";
export default {
  name: "ChatContentCard",
  props: {
    item: Object,
  },
  methods: {
    openCardReply() {
      bus.$emit('openCardReply', this.item);
    },
    toggleLike() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'mailbox_id': this.$route.params.mailboxId,
          'id[]': this.item.data.id,
        }),
        credentials: "include",
      };
      console.log(requestOptions.body);
      let url = "";
      if (this.item.data.isLiked == '1') {
        url = "https://app.helpwise.io/twitter1/api/search/unlike_tweet.php";
      } else {
        url = "https://app.helpwise.io/twitter1/api/search/like_tweet.php";
      }
      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            triggerPromptNotif(error, "error", 3000);
            return Promise.reject(error);
          }
          this.item.data.isLiked =
            !this.item.data.isLiked;
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style>
</style>