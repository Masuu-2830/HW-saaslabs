<template>
  <div
    class="
      mail-body
      hwEmail
      card
      shadow-sm
      pt-0
      pl-3
      pr-3
      pb-0
      mb-2
      bg-white
      rounded
    "
    :class="!isMailCollapsed && 'uncollapsed'"
    id="email-23153177"
    style="margin-left: 20px; margin-top: 20px; margin-right: 20px"
  >
    <div
      class="hwUncollapsed"
      :style="{ display: !isMailCollapsed ? 'block' : 'none' }"
    >
      <div
        class="pd-2 pd-lg-2 pd-xl-2 hwUncollapsedHeader"
        style="cursor: pointer"
      >
        <div
          class="from-email d-flex justify-content-between align-items-start"
          @click="changeCollapseState"
        >
          <div class="d-flex justify-content-start" style="padding: 3px">
            <div
              class="
                avatar-name
                d-flex
                justify-content-start
                align-items-center
              "
            >
              <div
                class="email-addresses rounded"
                @click="changeEmailAddressesState"
                style="padding: 5px"
              >
                <div class="mg-b-0">
                  <strong
                    >{{ Object.values(item.data.from).toString()
                    }}<span
                      :style="{ display: showEmailAddresses ? '' : 'none' }"
                      class="addr-hideable copyable"
                    >
                      &lt;{{ Object.keys(item.data.from).toString() }}&gt;</span
                    ></strong
                  >
                  <svg
                    :data-clipboard-text="Object.keys(item.data.from).toString()"
                    :style="{ display: showEmailAddresses ? '' : 'none' }"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="addr-hideable addr-copy-btn feather feather-copy"
                    @click.stop.prevent="copyTestingCode(Object.keys(item.data.from).toString())"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path
                      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    ></path>
                  </svg>
                </div>
                <div class="mg-b-0 tx-color-03">
                  To:
                  <span class="tx-color-01">{{
                    Object.values(item.data.to).toString()
                  }}</span
                  ><span
                    class="addr-hideable copyable"
                    :style="{ display: showEmailAddresses ? '' : 'none' }"
                  >
                    &lt;{{ Object.keys(item.data.to).toString() }}&gt;
                    <svg
                      :data-clipboard-text="Object.keys(item.data.to).toString()"
                      :style="{ display: showEmailAddresses ? '' : 'none' }"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="addr-hideable addr-copy-btn feather feather-copy"
                      @click.stop.prevent="copyTestingCode(Object.keys(item.data.to).toString())"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      ></path></svg
                  ></span>
                </div>
                <div class="mg-b-0 tx-color-03"
                  :class="item.data.cc.length == 0 ? 'd-none' : ''"
                  v-if="item.data.cc.length !== 0">
                  Cc: <span v-for="(value, key, index) in item.data.cc" :key="index"><span class="tx-color-01">{{ value }}</span><span class="addr-hideable copyable" :style="{ display: showEmailAddresses ? '' : 'none' }">
                    &lt;{{key}}&gt;
                    <svg
                      :data-clipboard-text="key"
                      :style="{ display: showEmailAddresses ? '' : 'none' }"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="addr-hideable addr-copy-btn feather feather-copy"
                      @click.stop.prevent="copyTestingCode(key)"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      ></path></svg></span
                  ><span v-if="(index+1) != Object.keys(item.data.cc).length">,&nbsp;</span></span>
                </div>
                <div
                  class="mg-b-0 tx-color-03 addr-hideable"
                  :class="item.data.replyTo == null ? 'd-none' : ''"
                  v-if="item.data.replyTo !== null"
                  :style="{ display: showEmailAddresses ? '' : 'none' }"
                >
                  Reply To:
                  <span class="tx-color-01">{{
                    Object.values(item.data.replyTo).toString()
                  }}</span
                  ><span class="copyable">
                    &lt;{{ Object.keys(item.data.replyTo).toString() }}&gt;
                    <svg
                      :data-clipboard-text="Object.keys(item.data.replyTo).toString()"
                      :style="{ display: showEmailAddresses ? '' : 'none' }"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="addr-hideable addr-copy-btn feather feather-copy"
                      @click.stop.prevent="copyTestingCode(Object.keys(item.data.replyTo).toString())"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      ></path></svg
                  ></span>
                </div>
                <div
                  class="mg-b-0 tx-color-03 addr-hideable"
                  :style="{ display: showEmailAddresses ? '' : 'none' }"
                >
                  <span>Subject:&nbsp;</span
                  ><span class="tx-color-01">{{
                    item.data.displaySubject
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="email-time-seen d-flex align-items-center"
            style="padding: 8px"
          >
          <div class="replyIconsContainer align-items-center" style="margin-right: 20px;">
            <button class="reply-btn btn replyIconBtn px-1" data-toggle="tooltip" title="" data-original-title="Reply" @click="reply"><i class="fas fa-reply"></i></button>
            <button v-if="item.data.cc.length !== 0" class="reply-all-btn btn replyIconBtn px-1" data-toggle="tooltip" title="Reply All"><i class="fas fa-reply-all"></i></button>
          </div>
            <div class="email-time d-flex align-items-center">
              <span class="tx-12 tx-color-03" style="float: right"
                >{{ item.timestamp | moment("MMM D, h:mm a") }} ({{
                  item.timestamp | moment("from", "now")
                }})</span
              >
              <div class="dropdown">
                <span
                  @click.stop.prevent
                  class="three-dot"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="
                    float: right;
                    margin-left: 15px;
                    padding: 5px;
                    cursor: pointer;
                  "
                  id="dropdownMenuLink"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
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
                  <button type="button" class="dropdown-item reply-btn">
                    Reply
                  </button>
                  <button type="button" class="dropdown-item reply-all-btn">
                    Reply all
                  </button>
                  <button type="button" class="dropdown-item forward-btn">
                    Forward
                  </button>
                  <button
                    type="button"
                    class="dropdown-item moveToNewConversationBtn"
                  >
                    Move to a new Conversation
                  </button>
                  <a
                    href="/original-message/204420/23153177"
                    target="_blank"
                    class="dropdown-item"
                    >View Info</a
                  >
                  <a
                    href="/printMessage?id=23153177"
                    target="_blank"
                    class="dropdown-item"
                    >Print</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style="margin-top: 0px !important; margin-bottom: 0px !important" />

      <div
        class="email-html pl-2"
        style="padding-top: 10px; padding-bottom: 10px"
        v-html="item.data.html"
      ></div>
      <div
        class="card-footer d-flex flex-column justify-content-start p-2"
        style="padding-left: 0px !important; padding-right: 0px !important"
      >
        <div class="row m-1 d-none">
          <button class="downloadAllAttachments btn btn-xs btn-link p-0">
            Download all Attachments
          </button>
        </div>
        <div class="d-flex flex-row attachment-list m-1 flex-wrap"></div>
        <div class="d-flex flex-row m-1 reply-row">
          <button
            type="button"
            class="
              reply-btn
              btn btn-xs btn-outline-primary
              mr-1
              rounded-pill
              d-flex
              align-items-center
            "
            @click="reply"
          >
            <i class="fas fa-reply mr-1"></i>
            <span class="ml-1"> Reply</span>
          </button>
          <button
            type="button"
            class="
              forward-btn
              btn btn-xs btn-outline-primary
              mr-1
              rounded-pill
              d-flex
              align-items-center
            "
            @click="reply"
          >
            <i class="fas fa-share mr-1"></i>
            <span class="ml-1">Forward</span>
          </button>
          <button v-if="item.data.cc.length !== 0" type="button" class="reply-all-btn btn btn-xs btn-outline-primary rounded-pill d-flex align-items-center" @click="reply">
            <i class="fas fa-reply-all mr-1"></i>
            <span class="ml-1"> Reply All </span>
          </button>
        </div>
      </div>
    </div>
    <div
      class="hwCollapsed"
      style="margin-top: 7px; margin-bottom: 7px; padding: 8px; cursor: pointer"
      @click="changeCollapseState"
      :style="{ display: isMailCollapsed ? 'block' : 'none' }"
    >
      <div class="row align-items-center justify-content-between">
        <div class="col">
          <strong>{{ Object.values(item.data.from).toString() }}</strong>
        </div>
        <div class="col tx-color-03 tx-12 text-right">
          {{ item.timestamp | moment("MMM D, h:mm a") }} ({{
            item.timestamp | moment("from", "now")
          }})
        </div>
      </div>
      <div class="row">
        <div
          class="col-11 text-truncate tx-color-03"
          v-html="item.data.snippet"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../../../main";
export default {
  name: "MailContentSingleMail",
  props: {
    item: Object,
    isCollapsed: Boolean
  },
  data() {
    return {
      isMailCollapsed: this.isCollapsed,
      showEmailAddresses: false,
    };
  },
  methods: {
    reply(e) {
      bus.$emit("replyy");
      e.cancelBubble = true;
    },
    changeCollapseState() {
      this.isMailCollapsed = !this.isMailCollapsed;
    },
    changeEmailAddressesState(e) {
      this.showEmailAddresses = !this.showEmailAddresses;
      e.cancelBubble = true;
    },
    fallbackCopyTestingCode (text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }

      document.body.removeChild(textArea);
    },
    copyTestingCode(text) {
      if (!navigator.clipboard) {
        this.fallbackCopyTestingCode(text);
        return;
      }
      navigator.clipboard.writeText(text).then(
        function() {
          console.log("Async: Copying to clipboard was successful!");
        },
        function(err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    }
  },
};
</script>

<style>
</style>