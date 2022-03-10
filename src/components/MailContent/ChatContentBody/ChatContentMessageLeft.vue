<template>
  <div
    v-if="item.data.type == 0"
    class="comment-body sms-body left-align"
    :id="'sms-options-' + item.data.id"
    style="
      margin-left: 20px;
      margin-top: 0px;
      margin-right: 20px;
      padding-bottom: 15px;
    "
  >
    <div class="comment d-flex justify-content-start align-items-center">
      <div
        class="avtar-message d-flex justify-content-start align-items-end w-100"
      >
        <div
          class="avatar avatar-offline mg-b-15"
          :class="'customer-avatar-' + item.data.sentBy.id"
          v-html="item.data.sentBy.avatarTag"
        ></div>
        <div
          class="
            d-flex
            flex-column
            align-items-start
            justify-content-start
            pd-l-10
          "
          style="width: calc(100% - 40px)"
        >
          <div
            class="
              message-name
              d-flex
              flex-column
              justify-content-start
              align-items-start
              w-100
            "
            style="padding-right: 20px"
          >
            <div
              class="
                msg-del-wrapper
                d-flex
                justify-content-between
                align-items-center
                w-100
              "
            >
              <div
                class="card left_chat_bubble"
                style="
                  padding: 14px;
                  background-color: #ebebeb;
                  color: #4f5363;
                  border: none;
                  margin-top: 5px;
                "
              >
                <span
                  style="
                    color: inherit;
                    font-size: 14px;
                    font-family: inherit;
                    margin-bottom: 0;
                  "
                  v-html="item.data.text"
                ></span>
              </div>
            </div>
            <br />
            <div
              v-if="
                item.data.attachment !== undefined &&
                item.data.attachment.length > 0
              "
              class="d-flex align-items-end"
            >
              <i class="fas fa-paperclip mg-r-2 pd-b-5 tx-color-03 tx-14"></i>
              <a
                v-for="attach in item.data.attachment"
                :key="attach.id"
                :href="attach.url"
                target="_blank"
                class="btn btn-link pd-0"
                style="text-decoration: underline"
              >
                {{ attach.name }}
              </a>
            </div>
          </div>
          <div
            class="d-flex"
            v-on:mouseover="mouseover"
            v-on:mouseleave="mouseleave"
          >
            <span
              v-if="show"
              class="mg-l-10 hw_rel-date"
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
              class="mg-l-10 hw_rel-date"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatContentMessageLeft",
  props: {
    item: Object,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    mouseover: function () {
      this.show = false;
    },
    mouseleave: function () {
      this.show = true;
    },
  },
};
</script>

<style>
</style>