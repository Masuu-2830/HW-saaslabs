<template>
  <div v-if="show">
    <div
      v-if="composer.type == 'mail'"
      :id="`compose-${composer.hash}`"
      class="mail-compose hw_editor show hideMoreEditingOptions"
      :class="
        normal && minimize
          ? 'shrink minimize'
          : normal && maximize
          ? ''
          : 'shrink'
      "
      style="z-index: 2199921"
      :style="{ right: lr ? '45vw' : '' }"
    >
      <div
        class="mail-compose-dialog mail-compose-dialog-shrink"
        style="width: 43vw !important"
      >
        <div
          class="mail-compose-header"
          @click.stop.prevent="minimize = !minimize"
          style="padding: 10px; cursor: pointer"
        >
          <h6
            class="mail-compose-title tx-white flex-grow-1 w-50 text-truncate"
          >
            {{ message }}
          </h6>
          <nav
            class="
              nav nav-icon-only
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <a
              href=""
              class="
                nav-link
                mailComposeMinimize
                nav-link-minimize
                d-none d-lg-block
              "
            >
              <svg
                v-if="!minimize"
                @click.stop.prevent="minimize = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minus"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <svg
                v-if="minimize"
                @click.stop.prevent="minimize = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-square"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </a>
            <a
              href=""
              class="
                nav-link nav-link-shrink
                d-none
                mailComposeShrink
                d-lg-block
              "
            >
              <svg
                v-if="maximize"
                @click.stop.prevent="maximize = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minimize-2"
              >
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
              <svg
                v-if="!maximize"
                @click.stop.prevent="maximize = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-maximize-2"
              >
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </a>
            <a
              href=""
              class="nav-link nav-link-close mailComposeClose"
              @click.prevent="closeCompose(composer.hash)"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line></svg
            ></a>
          </nav>
        </div>
        <!-- mail-compose-header -->
        <div
          class="mail-compose-body"
          style="padding-top: 0px; padding-bottom: 10px"
        >
          <div
            :style="{ display: fromOptions.length > 1 ? 'block' : 'none' }"
            class="email-from-container align-items-center d-flex"
          >
            <div>From</div>
            <div class="flex-grow-1 pt-2 pl-2" style="max-width: 80%">
              <b-form-select v-model="fromSelected" class="mb-3">
                <b-form-select-option
                  v-for="fromOption in fromOptions"
                  :key="fromOption.id"
                  :value="fromOption"
                  >{{ fromOption.name }} &lt;{{
                    fromOption.email
                  }}&gt;</b-form-select-option
                >
              </b-form-select>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div style="margin-right: 20px">To</div>
            <div class="flex-grow-1" style="max-width: 80%">
              <div
                class="email-to"
                style="display: inline-block; min-width: 100%; max-width: 100%"
              >
                <vue-tags-input
                  v-model="tagTo"
                  :tags="tagsTo"
                  :autocomplete-items="autocompleteItemsTo"
                  :add-only-from-autocomplete="false"
                  :validation="validation"
                  :is-draggable="true"
                  @tag-order-changed="(newTags) => (tagsTo = newTags)"
                  @tags-changed="updateTo"
                  placeholder=""
                >
                  <div
                    slot="autocomplete-item"
                    slot-scope="props"
                    class="my-item"
                    @click="props.performAdd(props.item)"
                  >
                    <div v-html="props.item.icon"></div>
                  </div>
                </vue-tags-input>
                <input type="text" class="form-control" style="display: none" />
              </div>
            </div>
            <div class="d-flex justify-content-start align-items-start p-2">
              <button
                tabindex="-1"
                v-if="!isCC"
                @click.stop.prevent="showCC"
                class="show-cc btn btn-link p-1"
              >
                Cc
              </button>
              <button
                tabindex="-1"
                v-if="!isBCC"
                @click.stop.prevent="showBCC"
                class="show-bcc btn btn-link p-1"
              >
                Bcc
              </button>
            </div>
          </div>
          <div
            class="invalid-feedback invalid-to"
            :style="{ display: toNotValid || noTo ? 'block' : 'none' }"
          >
            {{ noTo ? "Recipient is required" : "Invalid email(s)" }}
          </div>
          <div class="email-cc-wrapper" v-if="isCC">
            <hr style="margin-top: 0px; margin-bottom: 0px" />
            <div class="align-items-center d-flex">
              <div style="margin-right: 20px">Cc</div>
              <div class="flex-grow-1" style="max-width: 80%">
                <div
                  class="email-cc"
                  style="
                    display: inline-block;
                    min-width: 100%;
                    max-width: 100%;
                  "
                >
                  <vue-tags-input
                    v-model="tagCC"
                    :tags="tagsCC"
                    :autocomplete-items="autocompleteItemsCC"
                    :add-only-from-autocomplete="false"
                    :validation="validation"
                    :is-draggable="true"
                    @tag-order-changed="(newTags) => (tagsCC = newTags)"
                    @tags-changed="updateCC"
                    placeholder=""
                    style="z-index: 0"
                  >
                    <div
                      slot="autocomplete-item"
                      slot-scope="props"
                      class="my-item"
                      @click="props.performAdd(props.item)"
                    >
                      <div v-html="props.item.icon"></div>
                    </div>
                  </vue-tags-input>
                  <input
                    type="text"
                    class="form-control"
                    style="display: none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="invalid-feedback invalid-cc"
            :style="{ display: ccNotValid ? 'block' : 'none' }"
          >
            Invalid email(s)
          </div>
          <div class="email-bcc-wrapper" v-if="isBCC">
            <hr style="margin-top: 0px; margin-bottom: 0px" />
            <div class="align-items-center d-flex">
              <div style="margin-right: 20px">Bcc</div>
              <div class="flex-grow-1" style="max-width: 80%">
                <div
                  class="email-bcc"
                  style="
                    display: inline-block;
                    min-width: 100%;
                    max-width: 100%;
                  "
                >
                  <vue-tags-input
                    v-model="tagBCC"
                    :tags="tagsBCC"
                    :autocomplete-items="autocompleteItemsBCC"
                    :add-only-from-autocomplete="false"
                    :validation="validation"
                    :is-draggable="true"
                    @tag-order-changed="(newTags) => (tagsBCC = newTags)"
                    @tags-changed="updateBCC"
                    placeholder=""
                    style="z-index: 0"
                  >
                    <div
                      slot="autocomplete-item"
                      slot-scope="props"
                      class="my-item"
                      @click="props.performAdd(props.item)"
                    >
                      <div v-html="props.item.icon"></div>
                    </div>
                  </vue-tags-input>
                  <input
                    type="text"
                    class="form-control"
                    style="display: none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="invalid-feedback invalid-bcc"
            :style="{ display: bccNotValid ? 'block' : 'none' }"
          >
            Invalid email(s)
          </div>
          <div>
            <hr style="margin-top: 0px; margin-bottom: 0px" />
            <div class="d-flex align-items-center">
              <div>Subject</div>
              <div class="flex-grow-1">
                <input
                  v-model="subject"
                  type="text"
                  class="email-sub form-control bd-0"
                />
              </div>
            </div>
          </div>
          <div
            class="email-editor fr-box fr-basic fr-bottom"
            role="application"
            style="z-index: 214"
          >
            <form class="form">
              <froala
                :tag="'textarea'"
                :config="config"
                v-model="mail_body"
                name="mail_body"
              ></froala>
              <button
                @click.stop.prevent="sendMail"
                class="btnn btn btn-sm btn-primary fr-bt"
                type="submit"
              >
                {{ isSend == "send" ? "Send" : "Send and Close" }}
              </button>
            </form>
          </div>
          <input
            type="file"
            style="display: none"
            name="files[]"
            @change="uploadAttachment"
            class="editor-uploadAttachment"
            multiple
          />
          <!-- <div
              class="d-flex flex-wrap"
              style="max-height: 150px; overflow-y: auto"
              id="compose-attachment-list"
            >
              <span
                v-for="file in uploadingFiles"
                :key="file.lastModified"
                v-html="createAttachmentList(file)"
              >
              </span>
            </div> -->
        </div>
      </div>
    </div>
    <div
      v-if="composer.type == 'twitter'"
      id="mailCompose"
      class="mail-compose hw_editor show"
      :class="
        normal && minimize
          ? 'shrink minimize'
          : normal && maximize
          ? ''
          : 'shrink'
      "
      style="z-index: 2147483001"
      :style="{ right: lr ? '45vw' : '' }"
    >
      <div class="mail-compose-dialog mail-compose-dialog-shrink">
        <div
          class="mail-compose-header"
          @click.stop.prevent="minimize = !minimize"
          style="padding: 10px; cursor: pointer"
        >
          <h6
            class="mail-compose-title tx-white flex-grow-1 w-50 text-truncate"
          >
            {{ message }}
          </h6>
          <nav
            class="
              nav nav-icon-only
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <a
              id="mailComposeMinimize"
              href=""
              class="nav-link nav-link-minimize d-none d-lg-block"
            >
              <svg
                v-if="!minimize"
                @click.stop.prevent="minimize = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minus"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <svg
                v-if="minimize"
                @click.stop.prevent="minimize = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-square"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </a>
            <a
              id="mailComposeShrink"
              href=""
              class="nav-link nav-link-shrink d-none d-lg-block"
            >
              <svg
                v-if="maximize"
                @click.stop.prevent="maximize = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minimize-2"
              >
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
              <svg
                v-if="!maximize"
                @click.stop.prevent="maximize = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-maximize-2"
              >
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </a>
            <a
              @click.stop.prevent="closeCompose(composer.hash)"
              id="mailComposeClose"
              href=""
              class="nav-link nav-link-close"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line></svg
            ></a>
          </nav>
        </div>
        <!-- mail-compose-header -->
        <div
          class="mail-compose-body"
          style="padding-top: 0px; padding-bottom: 10px"
        >
          <form class="form">
            <froala
              :tag="'textarea'"
              :config="config"
              v-model="tweet_compose_body"
              name="tweet_compose_body"
            ></froala>
            <button
              @click.stop.prevent="sendMail"
              class="btnn btn btn-sm btn-primary fr-bt"
              type="submit"
              style="bottom: 17px; right: 40px"
            >
              Send
            </button>
          </form>
        </div>
        <input
          type="file"
          style="display: none"
          name="files[]"
          @change="uploadAttachment"
          class="editor-uploadAttachment"
          multiple
        />
        <b-modal
          id="schedule-send-modal"
          ref="schedule-send-modal"
          size="sm"
          title="Pick Date & Time"
          hide-footer
        >
          <div class="modal-body">
            <div class="d-flex align-items-center justify-content-center">
              <date-picker
                :open.sync="newDateOpen"
                @change="handleChange"
                type="datetime"
                v-model="datetime"
                value-type="timestamp"
                :minute-step="30"
                :showSecond="false"
                :default-value="
                  new Date().setHours(new Date().getHours() + 1, 0, 0, 0)
                "
                :disabled-date="notBeforeToday"
                :disabled-time="notBeforeNow"
                placeholder="Select Date & Time"
                :clearable="false"
              ></date-picker>
            </div>
            <div
              class="d-flex align-items-center justify-content-center"
              style="margin-top: 10px"
            >
              <button
                type="button"
                @click.stop.prevent="scheduleSend()"
                class="btn btn-xs btn-primary bulk-select-snooze-btn"
                :disabled="datetime == '' && true"
              >
                Snooze
              </button>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <div
      v-if="composer.type == 'sms'"
      id="smsCompose"
      class="mail-compose hw_editor show"
      :class="
        normal && minimize
          ? 'shrink minimize'
          : normal && maximize
          ? ''
          : 'shrink'
      "
      style="z-index: 2147483001"
      :style="{ right: lr ? '45vw' : '' }"
    >
      <div class="mail-compose-dialog mail-compose-dialog-shrink">
        <div
          class="mail-compose-header"
          @click.stop.prevent="minimize = !minimize"
          style="padding: 10px; cursor: pointer"
        >
          <h6
            class="mail-compose-title tx-white flex-grow-1 w-50 text-truncate"
          >
            {{ message }}
          </h6>
          <nav
            class="
              nav nav-icon-only
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <a
              id="mailComposeMinimize"
              href=""
              class="nav-link nav-link-minimize d-none d-lg-block"
            >
              <svg
                v-if="!minimize"
                @click.stop.prevent="minimize = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minus"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <svg
                v-if="minimize"
                @click.stop.prevent="minimize = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-square"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </a>
            <a
              id="mailComposeShrink"
              href=""
              class="nav-link nav-link-shrink d-none d-lg-block"
            >
              <svg
                v-if="maximize"
                @click.stop.prevent="maximize = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minimize-2"
              >
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
              <svg
                v-if="!maximize"
                @click.stop.prevent="maximize = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-maximize-2"
              >
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </a>
            <a
              @click.stop.prevent="closeCompose(composer.hash)"
              id="mailComposeClose"
              href=""
              class="nav-link nav-link-close"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line></svg
            ></a>
          </nav>
        </div>
        <!-- mail-compose-header -->
        <div
          class="mail-compose-body"
          style="padding-top: 0px; padding-bottom: 10px"
        >
          <div class="composeBodyWrapper">
            <div class="composeBody">
              <div class="to-number-container" style="margin-bottom: 10px">
                <label
                  for="to-number-1645607419987-51396078299"
                  class="d-block"
                ></label>
                <VuePhoneNumberInput
                  clearable
                  v-model="toNumber"
                  @update="(e) => (toNumber2 = e.formattedNumber)"
                />
                <div class="invalid-feedback" id="invalid-to-number"></div>
              </div>
              <form class="form">
                <froala
                  :tag="'textarea'"
                  :config="config"
                  v-model="sms_compose_body"
                  name="sms_compose_body"
                ></froala>
                <button
                  @click.stop.prevent="sendMail"
                  class="btnn btn btn-sm btn-primary fr-bt"
                  type="submit"
                  style="bottom: 17px; right: 40px"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <input
          type="file"
          style="display: none"
          name="files[]"
          @change="uploadAttachment"
          class="editor-uploadAttachment"
          multiple
        />
      </div>
    </div>
    <div
      class="card"
      id="undo-container"
      style="max-width: 100%; z-index: 9999999"
      :style="{ display: showUndo ? 'block' : 'none' }"
    >
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-center">
          <span id="undo-txt">{{ undoMessage }}</span>
          <span class="ml-2" id="undo-btn" @click="unsendMail"> Undo </span>
          <span id="email-timer" class="pd-l-10">{{ undoTimer }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="froala-editor/js/plugins/file.min.js"></script>
<script src="froala-editor/js/plugins/image.min.js"></script>
<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="50ffg2e7hq6kpnt"></script>
<script>
import { bus, triggerPromptNotif } from "../main";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import FroalaEditor from "froala-editor";
import "froala-editor/js/plugins.pkgd.min";
import VueTagsInput from "@vojtechlanka/vue-tags-input";
import axios from "axios";
import _ from "underscore";
import AttachmentComp from "./AttachmentComp.vue";
import Vue from "vue";

export default {
  name: "Compose",
  props: {
    composer: Object,
    align: Number,
  },
  computed: {
    lr() {
      if (this.align % 2 == 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  components: { VueTagsInput, FroalaEditor, File, VuePhoneNumberInput },
  data() {
    const self = this;
    console.log(self.composer.type);
    return {
      boxAccessToken: "",
      easyCalendar: [],
      easyCalendarUser: [],
      easycalenderObj: {},
      show: true,
      normal: true,
      minimize: false,
      maximize: false,
      showUndo: false,
      message: self.composer.type == "mail" ? "New Message" : "New Tweet",
      undoMessage: "Email Sent.",
      fromOptions: this.aliases(),
      fromSelected: this.defaultAlias(),
      attachments:
        this.composer.attachments !== undefined
          ? this.composer.attachments
          : {},
      // attachments: {},
      // uploadingFiles: [],
      files: [],
      // filesMap: [],
      undoTimer: this.$store.state.userSettings.undoTimer,
      isSend: this.$store.state.userSettings.send,
      tagTo: "",
      // tagsTo: Object.keys(this.composer.to).length !==0 ? this.composer.to : [],
      tagsTo: this.tagsto(),
      autocompleteItemsTo: [],
      tagCC: "",
      tagsCC: this.tagscc(),
      autocompleteItemsCC: [],
      tagBCC: "",
      tagsBCC: this.tagsbcc(),
      autocompleteItemsBCC: [],
      validation: [
        {
          classes: "invalid-email",
          rule: (tag) => this.check(tag),
        },
      ],
      debounce: null,
      subject: this.composer.subject !== undefined ? this.composer.subject : "",
      mail_body: this.signature(),
      tweet_compose_body: "",
      sms_compose_body: "",
      toNumber: "",
      toNumber2: "",
      datetime: "",
      newDateOpen: false,
      noTo: false,
      toNotValid: false,
      ccNotValid: false,
      bccNotValid: false,
      isCC: false,
      isBCC: false,
      draftID: this.composer.id !== undefined ? this.composer.id : null,
      threadID:
        this.composer.threadID !== undefined ? this.composer.threadID : null,
      mailboxID: this.$store.state.inboxData.id,
      inReplyTo: null,
      editorInstance: null,
      config: {
        enter: FroalaEditor.ENTER_DIV,
        placeholderText: "Type something",
        charCounterCount: false,
        toolbarBottom: true,
        height: "220px",
        imageUploadParam: "files[]",
        imageUploadURL:
          "https://app.helpwise.io/api/uploadInlineAttachment.php",
        imageUploadParams: {
          mailboxID: this.$route.params.mailboxId,
          emailID: this.emailID,
        },
        imageUploadMethod: "POST",
        imageAllowedTypes: ["jpeg", "jpg", "png"],
        imagePasteProcess: true,
        imageDefaultAlign: "left",
        pastePlain: true,
        requestWithCredentials: true,
        events: {
          initialized: async function () {
            // self.editorInstance.composer = self.composer;
            var editor = this;
            editor.composer = self.composer;
            // self.refreshSignatureDropdownOnShow(this,$btn, $dropdown);
            editor.type =
              self.composer.type == "mail"
                ? "compose"
                : self.composer.type == "twitter"
                ? "tweetCompose"
                : "smsCompose";
            editor.mailboxID = self.$route.params.mailboxId;
            self.editorInstance = this;
            console.log("initialized", self.composer.type);
            console.log(this);
            let attchComp = Vue.extend(AttachmentComp);
            let replyAttachmentList = new attchComp({
              propsData: {
                attachments: self.attachments,
                type: "compose",
              },
            }).$mount();
            // var ed = $(`#editor-uploadAttachment`).data('editor');
            // console.log(editor, ed);
            editor.$wp.append(replyAttachmentList.$el);
            // ed.$wp.append(replyAttachmentList.$el);
          },
        },
        key: "fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==",
        toolbarButtons:
          self.composer.type == "mail"
            ? {
                moreText: {
                  buttons: [
                    "bold",
                    "italic",
                    "underline",
                    "strikeThrough",
                    "subscript",
                    "superscript",
                    "fontFamily",
                    "fontSize",
                    "textColor",
                    "backgroundColor",
                    "inlineClass",
                    "inlineStyle",
                    "clearFormatting",
                  ],
                  buttonsVisible: 0,
                },
                moreParagraph: {
                  buttons: [
                    "alignLeft",
                    "alignCenter",
                    "formatOLSimple",
                    "alignRight",
                    "alignJustify",
                    "formatOL",
                    "formatUL",
                    "paragraphFormat",
                    "paragraphStyle",
                    "lineHeight",
                    "outdent",
                    "indent",
                    "quote",
                  ],
                  buttonsVisible: 0,
                },
                moreRich: {
                  buttons: [
                    "insertLink",
                    "insertImage",
                    "gdrive",
                    "Dropbox",
                    "box",
                    "OneDrive",
                    "EasyCalendar",
                  ],
                  buttonsVisible: 0,
                },
                moreMisc: {
                  buttons: [
                    "scheduleReply",
                    "savedReplyC",
                    "hcArticleC",
                    "attach",
                    "signatureBtn",
                    "clear",
                  ],
                  buttonsVisible: "all",
                },
              }
            : self.composer.type == "twitter"
            ? [
                "attachTweetCompose",
                "scheduleReply",
                "savedReplyC",
                "hcArticleC",
                "clear",
              ]
            : ["attachSMSCompose", "clear"],
      },
    };
  },
  created() {
    bus.$off("deleteAttachmentUpload");
    bus.$on("deleteAttachmentUpload", (id) => {
      console.log("event listenedd", id);
      Vue.delete(this.attachments, id);
      this.attachments = this.attachments.filter((i) => i.id !== id);
      console.log(this.attachments, this.files);
    });
    const vueThis = this;

    bus.$off("deleteAttachmentUpload");
    bus.$on("deleteAttachmentUpload", (id) => {
      console.log("event listened", id);
      if (id) {
        Vue.delete(vueThis.attachments, id);
      }
    });

    // bus.$off("modal.hcArticleInsert.click");
    bus.$on("modal.hcArticleInsert.click", function (data, type) {
      if (type == "compose") {
        let editorInstance = vueThis.editorInstance;
        editorInstance.html.insert(vueThis.getArticleCard(data));
      }
    });

    // bus.$off("modal.savedReplyInsert.click");
    bus.$on("modal.savedReplyInsert.click", function (id, type) {
      if (type == "compose") {
        let editorInstance = vueThis.editorInstance;

        triggerPromptNotif("Fetching saved reply data");
        fetch(
          `https://app.helpwise.io/api/savedReplies/get?mailboxID=${vueThis.$store.state.inboxData.id}&savedReplyID=${id}`,
          { credentials: "include" }
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.status == "success") {
              editorInstance.html.insert(response.data.savedReply.content);
              triggerPromptNotif("Saved Reply Inserted", "success");
            } else {
              triggerPromptNotif("Unable to insert Saved Reply", "error");
            }
          });
      }
    });
  },
  watch: {
    tagTo: "initItemsTo",
    tagCC: "initItemsCC",
    tagBCC: "initItemsBCC",
    tagsTo: "saveDraft",
    tagsCC: "saveDraft",
    tagsBCC: "saveDraft",
    fromSelected: "saveDraft",
    files: "saveDraft",
    subject: function (to, from) {
      console.log("subject");
      if (to !== from) {
        clearTimeout(this.subjectSave);
        this.subjectSave = setTimeout(this.saveDraft, 2000);
      }
    },
    mail_body: function (to, from) {
      console.log("mailbody");
      if (to !== from) {
        clearTimeout(this.myGreeting);
        this.myGreeting = setTimeout(this.saveDraft, 2000);
      }
    },
    tweet_compose_body: function (to, from) {
      console.log("tweetcomposebody");
      if (to !== from) {
        clearTimeout(this.myGreeting);
        this.myGreeting = setTimeout(this.saveDraft, 2000);
      }
    },
    sms_compose_body: function (to, from) {
      console.log("smscomposebody");
      if (to !== from) {
        clearTimeout(this.myGreeting);
        this.myGreeting = setTimeout(this.saveDraft, 2000);
      }
    },
    toNumber: function (to, from) {
      console.log("tweetToNumber", this.toNumber, this.toNumber2);
      if (to !== from) {
        clearTimeout(this.myGreeting);
        this.myGreeting = setTimeout(this.saveDraft, 2000);
      }
    },
  },
  async beforeMount() {
    await this.fetchTokens();
    this.prepareFroalaButtons();
  },
  methods: {
    async fetchTokens() {
      fetch(this.$apiBaseURL + "integration-vue/box/getBoxToken.php", {
        credentials: "include",
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.boxAccessToken = data.data.boxAccessToken;
          console.log(data, this.boxAccessToken);
        })
        .catch((error) => {
          alert(error);
        });
      fetch(
        this.$apiBaseURL + "integration-vue/easy-calendar/EasyCalendarList.php",
        { credentials: "include" }
      )
        .then(async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log(data);
          this.easyCalendar = data.data.easycalendar;
          this.easyCalendarUser = data.data.easyCalendarUser;
          if (this.easyCalendar.length != 0) {
            for (i = 0; i < this.easyCalendar.length; i++) {
              this.easycalendarObj[
                this.easyCalendar[i].calendar_url
              ] = `<svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 24 24' fill='${this.easyCalendar[i].color}' stroke='${this.easyCalendar[i].color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-circle'><circle cx='12' cy='12' r='4'></circle></svg>${this.easyCalendar[i].personalslug}`;
            }
            this.easycalendarObj[
              "add_easy_calendar"
            ] = `<svg class='w-2 h-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style='
        height: 20px; margin-top: 5px;'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path></svg> Add time slots`;
          } else {
            this.easycalendarObj["Connect"] = "Connect EasyCalendar";
          }
          console.log(this.easycalendarObj);
        })
        .catch((error) => {
          alert(error);
        });
    },
    refreshSignatureDropdownOnShow($btn, $dropdown) {
      $.get({
        url: `https://app.helpwise.io/api/signatures/list.php`,
        xhrFields: {
          withCredentials: true,
        },
        // url: '/api/getUserSignature.php',
        data: {
          mailboxId: this.mailboxID,
        },
        success: (response) => {
          let html = "";
          console.log($dropdown.find(".fr-dropdown-list"), response.data);
          if (response.status == "success") {
            for (let signature of response.data) {
              html += `<li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="signatureBtn" data-param1="${signature.id}" title="${signature.name}" aria-selected="false">${signature.name}</a></li>`;
            }
            $dropdown.find(".fr-dropdown-list").html(html);
          } else {
          }
        },
        error: (err) => {
          handleUnauthorizedError(err);
          console.error(err);
        },
      });
    },
    getArticleCardEmail(article) {
      let $imgHtml = "";
      let topBorder = "border-top: 2px solid #0847a0; border-radius: 2px;";
      let $articleCountHtml = "";
      if (article.featured_img) {
        $imgHtml = `
              <div style="height: 200px; width: 100%">
                  <img src="${article.featured_img}" style="height: 200px; width: 100%; margin-left: 0px; margin-right: 0px; max-width: 100%;"></img>
              </div>`;
        topBorder = "";
      } else if (article.icon) {
        topBorder = "";
        $articleCountHtml = `
                  <div style="padding: 5px 10px; background-color: #0847a0;">
                      <p style="font-size: 12px; color: white; margin: 0">This collection contains ${article.count} Articles</p>
                  </div>
              `;
      }

      // #0847a0 106af6
      return `
              <div class="hw_articleCard" id="hw_articleCard-${
                article.id
              }" contenteditable="false" style="
                  position: relative;display: flex;
                  flex-direction: column;
                  min-width: 0;
                  word-wrap: break-word;
                  background-color:#fff;
                  background-clip: border-box;
                  border: 1px solid rgba(72, 94, 144, 0.16);
                  border-radius: 0.25rem;
                  max-width: 50%;
                  width: fit-content;
              ">
                  <a href="${
                    article.url
                  }" target="_blank" contenteditable="false" style="color: inherit;text-decoration: none;display: block;${topBorder}" class="hw_articleCardBodyContainer">

                      <div class="hw_removeArticleCard" style="position: absolute;right: 5px;top: 5px; background: white; border-radius: 50%; padding: 3px; z-index: 1000; display:none; height: 18px; width:18px;">
                          <svg xmlns="http://www.w3.org/2000/svg" style="color: #566476;fill: rgba(27, 46, 75, 0.06); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x "><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </div>

                      ${$imgHtml}

                      <div class="hw_articleCardBody" style="padding-top: 10px;padding-bottom: 10px;padding-left: 20px;padding-right: 20px;flex-grow: 1;flex-shrink: 1;flex-basis: auto;">
                          <h6 class="hw_articleCardTitle" style="margin-bottom: 0.4rem;font-size: 0.875rem;font-weight: 600;line-height: 1.25;color:#0847a0;margin-top: 0; ${
                            article.icon ? "text-align: center" : ""
                          }">${article.title}</h6>
                          <p style="margin-top: 0; color:#9da8b7;" class="hw_articleCardText">${
                            article.description
                          }</p>
                      </div>

                      ${$articleCountHtml}
                  </a>
              </div>
              <div></div>
          `;
    },
    getArticleCard(article) {
      let $descHtml = "";
      if (article.description) {
        $descHtml = `<p style="margin-top: 0;" class="hw_articleCardText">${article.description}</p>`;
      }
      return `
          <div class="hw_articleCard" id="hw_articleCard-${article.id}" style="display: flex;flex-direction: row;word-wrap: break-word;background-color:#fff;border: 1px solid rgba(72, 94, 144, 0.16);border-radius: 0.25rem;width: fit-content;">
            <a href="${article.url}" target="_blank" contenteditable="false" style="color: inherit;text-decoration: none;display: block;" class="hw_articleCardBodyContainer">
              <div class="hw_articleCardBody" style="padding-top: 10px;padding-bottom: 10px;padding-left: 20px;padding-right: 20px;flex-grow: 1;flex-shrink: 1;flex-basis: auto;">
                <h6 class="hw_articleCardTitle" style="margin-bottom: 0.75rem;font-size: 0.875rem;font-weight: 600;line-height: 1.25;color:#001737;margin-top: 0;">${article.title}</h6>
                ${$descHtml}
              </div>
            </a>
            <div class="hw_removeArticle extraContentInEditor d-flex justify-content-center align-items-center">
              <button class="btn btn-light rounded-0 ht-100p bg-white pd-x-10" id="removeHCArticleCard">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
        `;
    },
    prepareFroalaButtons() {
      const vueThis = this;
      FroalaEditor.DefineIconTemplate(
        "font_awesome_5b",
        '<i class="fab fa-[FA5NAME]"></i>'
      );

      FroalaEditor.DefineIcon("savedReply", {
        FA5NAME: "bookmark",
        template: "font_awesome_5",
      });

      FroalaEditor.RegisterCommand("savedReplyC", {
        // Button title.
        title: "Insert Saved Reply",
        // Mark the button as a dropdown.
        icon: "savedReply",
        refreshAfterCallback: true,
        callback: function () {
          this.selection.save();
          bus.$emit("savedReply", "compose");
          // $(".saved-replies-btn").click();
          // vueThis.$bvModal.show("saved-reply-modal");
        },
      });

      FroalaEditor.DefineIcon("hcArticle", {
        FA5NAME: "book",
        template: "font_awesome_5",
      });

      FroalaEditor.RegisterCommand("hcArticleC", {
        title: "Insert Help Center Article",
        icon: "hcArticle",
        refreshAfterCallback: true,
        callback: function () {
          this.selection.save();
          let editor = this;
          vueThis.showHcModal = true;
          console.log("----");
          bus.$emit("hcArticles", "compose");
          // vueThis.$bvModal.show("helpcenterArticlesModal");
        },
      });
      FroalaEditor.DefineIcon("scheduleReply", {
        NAME: "clock",
        SVG_KEY: "clock",
      });
      FroalaEditor.RegisterCommand("scheduleReply", {
        title: "Schedule Reply",
        type: "dropdown",
        focus: false,
        undo: false,
        refreshAfterCallback: true,
        options: {
          1: "Later today (In 3 hour)",
          2: "Tomorrow (9 am)",
          3: "Next Monday (9 am)",
          4: "One week",
          5: "One month",
          6: "Pick date & time",
        },
        callback: function (cmd, val) {
          console.log(val);
          var mom;
          if (val == 1) {
            mom = moment(
              moment().add(3, "hours").format("YYYY-MM-DD hh:mm A"),
              "YYYY-MM-DD hh:mm A"
            );
          } else if (val == 2) {
            mom = moment(
              `${moment().add(1, "day").format("YYYY-MM-DD")} 09:00 am`,
              "YYYY-MM-DD hh:mm A"
            );
          } else if (val == 3) {
            mom = moment(
              `${moment().day(8).format("YYYY-MM-DD ")} 09:00 am`,
              "YYYY-MM-DD hh:mm A"
            );
          } else if (val == 4) {
            mom = moment().add(1, "week").minutes(0);
          } else if (val == 5) {
            mom = moment(
              moment().add(1, "month").format("YYYY-MM-DD hh:mm"),
              "YYYY-MM-DD hh:mm A"
            );
          } else if (val == 6) {
            // console.log(this.datetime);
            // mom = new Date(this.datetime);
            // this.datetime = "";
            vueThis.$refs["schedule-send-modal"].show();
          }
          console.log(mom.toISOString());
          vueThis.sendMail(mom);
        },
      });
      FroalaEditor.DefineIcon("dropboxIcon", {
        SRC: require("../assets/dropbox.svg"),
        ALT: "Dropbox",
        template: "image",
      });
      FroalaEditor.RegisterCommand("Dropbox", {
        // Button title.
        title: "Insert from Dropbox",
        // Mark the button as a dropdown.
        icon: "dropboxIcon",
        refreshAfterCallback: true,
        callback: function () {
          // The current context is the editor instance.
          //console.warn(Dropbox.isBrowserSupported());
          Dropbox.choose({
            success: (files) => {
              function humanFileSize(bytes, si) {
                //{humanFileSize(file_data.size)}
                var thresh = si ? 1000 : 1024;
                if (Math.abs(bytes) < thresh) {
                  return bytes + " B";
                }
                var units = si
                  ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
                  : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
                var u = -1;
                do {
                  bytes /= thresh;
                  ++u;
                } while (Math.abs(bytes) >= thresh && u < units.length - 1);
                return bytes.toFixed(1) + " " + units[u];
              }

              let html = "";
              for (let file of files) {
                html += `<a href="${
                  file.link
                }" target="_blank" rel="nofollow">${file.name}
                    (${humanFileSize(file.bytes)})</a>&nbsp;`;
              }
              this.html.insert(html);
              // this.message.push(html);
            },
            multiselect: true,
            folderselect: false,
          });
        },
      });
      FroalaEditor.DefineIcon("gdriveIcon", {
        SRC: require("../assets/google-drive.svg"),
        ALT: "GoogleDrive",
        template: "image",
      });
      FroalaEditor.RegisterCommand("gdrive", {
        // Button title.
        title: "Insert from Google Drive",
        // Mark the button as a dropdown.
        icon: "gdriveIcon",
        focus: "false",
        //refreshAfterCallback: true,
        callback: function () {
          function humanFileSize(bytes, si) {
            //{humanFileSize(file_data.size)}
            var thresh = si ? 1000 : 1024;
            if (Math.abs(bytes) < thresh) {
              return bytes + " B";
            }
            var units = si
              ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
              : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            var u = -1;
            do {
              bytes /= thresh;
              ++u;
            } while (Math.abs(bytes) >= thresh && u < units.length - 1);
            return bytes.toFixed(1) + " " + units[u];
          }
          const developerKey = "AIzaSyCdeUFrP4ZViYRPDPSvlxo1T6Agiep35TU";
          const clientId =
            "166235631936-ne7jkubvmci8k4rtcb870sj8ni9sjp17.apps.googleusercontent.com";
          const scope = "https://www.googleapis.com/auth/drive.readonly";
          let tokenPromise = new Promise((res, rej) => {
            console.log("clicked");
            gapi.load("auth2", () => {
              gapi.auth2
                .init({ client_id: clientId })
                .then(function (googleAuth) {
                  googleAuth.signIn({ scope }).then(function (authResult) {
                    let authResponse = authResult.getAuthResponse();
                    if (authResult && !authResult.error) {
                      res(authResponse.access_token);
                    } else {
                      rej();
                    }
                  });
                });
            });
          });
          gapi.load("picker", () => {
            tokenPromise.then((oauthToken) => {
              const picker = new google.picker.PickerBuilder()
                .addView(google.picker.ViewId.DOCS)
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setOAuthToken(oauthToken)
                .setDeveloperKey(developerKey)
                .setCallback((data) => {
                  if (data && data.docs) {
                    let html = "";
                    for (let doc of data.docs) {
                      html += `<a href="${
                        doc.url
                      }" target="_blank" rel="nofollow">${
                        doc.name
                      } (${humanFileSize(doc.sizeBytes)})</a>&nbsp;`;
                    }
                    this.html.insert(html);
                  }
                })
                .build();
              picker.setVisible(true);
            });
          });

          // The current context is the editor instance.
        },
      });

      FroalaEditor.DefineIcon("boxIcon", {
        SRC: require("../assets/boxlogo.png"),
        ALT: "Box",
        template: "image",
      });
      FroalaEditor.RegisterCommand("box", {
        // Button title.
        title: "Insert from box",
        // Mark the button as a dropdown.
        icon: "boxIcon",
        refreshAfterCallback: true,
        callback: function () {
          function humanFileSize(bytes, si) {
            //{humanFileSize(file_data.size)}
            var thresh = si ? 1000 : 1024;
            if (Math.abs(bytes) < thresh) {
              return bytes + " B";
            }
            var units = si
              ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
              : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            var u = -1;
            do {
              bytes /= thresh;
              ++u;
            } while (Math.abs(bytes) >= thresh && u < units.length - 1);
            return bytes.toFixed(1) + " " + units[u];
          }
          console.log(vueThis.boxAccessToken);
          if (!vueThis.boxAccessToken) {
            window.open("https://app.helpwise.io/settings/integrations");
          } else {
            let _this = this;
            let selectionInEditor = this.selection.inEditor();
            if (selectionInEditor) {
              this.selection.save();
            }
            // $('#box-integration-modal').modal('show');
            // The current context is the editor instance.
            var filePicker = new Box.FilePicker();
            filePicker.addListener("choose", function (items) {
              // $('#box-integration-modal').modal('hide');
              let html = "";
              for (let item of items) {
                html += `<a href="${
                  item.shared_link.url
                }" target="_blank" rel="nofollow">${item.name} (${humanFileSize(
                  item.size
                )})</a>&nbsp;`;
              }
              if (selectionInEditor) {
                _this.el.focus();
              }
              _this.html.insert(html);
            });
            filePicker.addListener("cancel", function () {});
            filePicker.show("0", showBox, {
              container: ".boxIntegration",
              chooseButtonLabel: "Select",
            });
          }
        },
      });

      FroalaEditor.DefineIcon("onedriveIcon", {
        SRC: require("../assets/onedrive.svg"),
        ALT: "oneDrive",
        template: "image",
      });
      FroalaEditor.RegisterCommand("OneDrive", {
        // Button title.
        title: "Insert from OneDrive",
        // Mark the button as a dropdown.
        icon: "onedriveIcon",
        refreshAfterCallback: true,
        callback: function () {
          function humanFileSize(bytes, si) {
            //{humanFileSize(file_data.size)}
            var thresh = si ? 1000 : 1024;
            if (Math.abs(bytes) < thresh) {
              return bytes + " B";
            }
            var units = si
              ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
              : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            var u = -1;
            do {
              bytes /= thresh;
              ++u;
            } while (Math.abs(bytes) >= thresh && u < units.length - 1);
            return bytes.toFixed(1) + " " + units[u];
          }
          var odOptions = {
            clientId: "aee0ce81-9085-4326-9b5f-2c5cf017485f",
            action: "share",
            multiSelect: true,
            viewType: "all",
            advanced: {
              endpointHint: "api.onedrive.com",
              redirectUri: "https://app.helpwise.io/onedrive.php",
            },
            success: (files) => {
              let files_data = files.value;
              let html = "";
              for (let file_data of files_data) {
                html += `<a href="${
                  file_data.permissions[0].link.webUrl
                }" target="_blank" rel="nofollow">${file_data.name} 
                    (${humanFileSize(file_data.size)})</a>&nbsp;`;
              }
              this.html.insert(html);
            },
            cancel: function () {
              console.log("cancel");
            },
            error: function (error) {
              console.log("error", error);
            },
          };
          OneDrive.open(odOptions);
        },
      });

      FroalaEditor.DefineIcon("EasyCalendarIcon", {
        SRC: require("../assets/easycalendar.svg"),
        ALT: "EasyCalendar",
        template: "image",
      });
      FroalaEditor.RegisterCommand("EasyCalendar", {
        title: "EasyCalendar",
        type: "dropdown",
        icon: "EasyCalendarIcon",
        options: vueThis.easycalenderObj,
        // Callback.
        callback: function (cmd, val) {
          if (vueThis.easyCalendar.length == 0) {
            window.open("https://app.helpwise.io/settings/integrations");
          } else {
            $("#ec_slot").html("");
            if (val != "add_easy_calendar") {
              let _this = this;
              let selectionInEditor = this.selection.inEditor();
              if (selectionInEditor) {
                this.selection.save();
              }
              let html = `<a href="${val}" target="_blank" rel="nofollow">${val}</a>&nbsp;`;
              if (selectionInEditor) {
                _this.el.focus();
              }
              _this.html.insert(html);
            } else {
              let _this = this;
              // $("#easy-calendar-integration-modal").modal("show");
              appendECdata(_this);
            }
          }
        },
        refreshOnShow: function ($btn, $dropdown) {
          var ab = $("ul").find(`[data-param1='add_easy_calendar']`);
          ab.attr("title", `Add time slots`);
          var abc = ab.parent();
          if (!abc.prev().is("hr")) {
            $(`<hr>`).insertBefore(abc);
          }
          for (var i = 0; i < easycalendar.length; i++) {
            var a = $("ul").find(
              `[data-param1='${easycalendar[i].calendar_url}']`
            );
            a.attr("title", `${easycalendar[i].calendar_url}`);
          }
        },
      });
    },
    scheduleSend() {
      var mom = new Date(this.datetime);
      this.datetime = "";
      console.log(mom.toISOString());
      this.sendMail(mom);
      this.$refs["schedule-send-modal"].hide();
    },
    handleChange(value, type) {
      if (type === "minute") {
        this.newDateOpen = false;
      }
    },
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    notBeforeNow(date) {
      return (
        date < new Date(new Date().setHours(new Date().getHours() + 1, 0, 0, 0))
      );
    },
    tagsto() {
      let to = [];
      // if(Object.keys(this.composer.to).length > 0) {
      for (var key in this.composer.to) {
        let obj = {};
        obj["email"] = key;
        obj["name"] = this.composer.to[key];
        obj["text"] = this.composer.to[key] + " (" + key + ")";
        obj["tiClasses"] = ["ti-valid"];
        to.push(obj);
      }
      // }
      console.log(to);
      return to;
    },
    tagscc() {
      let cc = [];
      // if(Object.keys(this.composer.cc).length > 0) {
      for (var key in this.composer.cc) {
        let obj = {};
        obj["email"] = key;
        obj["name"] = this.composer.cc[key];
        obj["text"] = this.composer.cc[key] + " (" + key + ")";
        obj["tiClasses"] = ["ti-valid"];
        cc.push(obj);
      }
      // }
      console.log(cc);
      return cc;
    },
    tagsbcc() {
      let bcc = [];
      // if(Object.keys(this.composer.bcc).length > 0) {
      for (var key in this.composer.bcc) {
        let obj = {};
        obj["email"] = key;
        obj["name"] = this.composer.bcc[key];
        obj["text"] = this.composer.bcc[key] + " (" + key + ")";
        obj["tiClasses"] = ["ti-valid"];
        bcc.push(obj);
      }
      // }
      console.log(bcc);
      return bcc;
    },
    uploadAttachment(event) {
      const selectedFiles = event.target.files;
      console.log(selectedFiles);
      const vueThis = this;
      for (let i = 0; i < selectedFiles.length; i++) {
        let selectedFile = selectedFiles[i];
        let hash = Date.now() + "-" + Math.floor(Math.random() * 100000000000);
        var formData = new FormData();
        formData.append("files[]", selectedFile);
        formData.append("mailboxID", vueThis.$route.params.mailboxId);
        let attachmentObject = {
          filename: selectedFile["name"],
          filesize: selectedFile["size"],
          progress: 0,
          isUploaded: false,
          extension: "pdf",
        };

        vueThis.attachments[hash] = attachmentObject;
        Vue.delete(vueThis.attachments, hash);
        vueThis.attachments[hash] = attachmentObject;
        axios
          .request({
            method: "post",
            url: "https://app.helpwise.io/api/uploadAttachment.php",
            data: formData,
            withCredentials: true,
            onUploadProgress: function (p) {
              let percentage = (p.loaded / p.total) * 100;
              console.log(percentage);
              console.log(hash);
              console.log(vueThis.attachments);
              vueThis.attachments[hash]["progress"] = percentage;
            },
          })
          .then((response) => {
            //get the attachment id
            console.log(response);
            console.log(hash);

            let attachData = response.data.data.files[0];
            let attachID = attachData["id"];

            vueThis.attachments[attachID] = vueThis.attachments[hash];
            Vue.delete(vueThis.attachments, hash);
            vueThis.attachments[attachID]["isUploaded"] = true;
            vueThis.attachments[attachID]["progress"] = 100;
            vueThis.attachments[attachID]["filehash"] = attachData["filehash"];
            vueThis.attachments[attachID]["filename"] = attachData["filename"];
            vueThis.attachments[attachID]["filesize"] = attachData["filesize"];
            vueThis.attachments[attachID]["mimeType"] = attachData["mimeType"];
            vueThis.attachments[attachID]["extension"] =
              attachData["extension"];
            vueThis.attachments[attachID]["id"] = attachID;
            vueThis.files.push(attachID);
            vueThis.editorInstance.attachments = vueThis.attachments;
            console.log(vueThis.attachments, vueThis.editorInstance);
          });
      }
    },
    aliases() {
      let aliases = this.$store.state.aliases.addresses;
      let aliasesArr = new Array();
      for (let i = 0; i < aliases.length; i++) {
        if (aliases[i].isDefault) {
          this.fromSelected = {
            id: i,
            email: aliases[i].email,
            name: aliases[i].name,
          };
        }
        aliasesArr.push({
          id: i,
          email: aliases[i].email,
          name: aliases[i].name,
        });
      }
      console.log(aliasesArr);
      return aliasesArr;
    },
    defaultAlias() {
      let aliases = this.$store.state.aliases.addresses;
      if (this.composer.from !== undefined) {
        for (let i = 0; i < aliases.length; i++) {
          if (aliases[i].email == Object.keys(this.composer.from)) {
            return { id: i, email: aliases[i].email, name: aliases[i].name };
          }
        }
      } else {
        for (let i = 0; i < aliases.length; i++) {
          if (aliases[i].isDefault) {
            return { id: i, email: aliases[i].email, name: aliases[i].name };
          }
        }
      }
      return {};
    },
    signature() {
      // return this.$store.state.userInfo;
      // this.aliases();
      if (this.composer.html !== undefined) {
        return this.composer.html;
      }
      let signature = this.$store.state.userSignature.body;
      if (!signature) return "";
      let body = signature.replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i, "$1");
      console.log(body);
      let html = "";
      let sign = `<div>${body}</div>`;
      // let signatureText = sign.text();
      // if (signatureText.trim() || sign.find('img').length > 0) {
      html = `<br/>
                <br/>
                <div><div class="hw_signature rounded">
                <div class="hw_attr">
                <div class="pt-2 pb-2">
                    ${sign}
                </div>
                </div>
                </div>
                </div>`;
      // }
      console.log(html);
      return html;
    },
    closeCompose(hash) {
      // console.log(hash, this.composer.id, hash == this.composer.id);
      // this.show = false;
      // if(hash == this.composer.id) {
      this.isCC = false;
      this.isBCC = false;
      this.files = [];
      this.attachments = {};
      this.uploadingFiles = [];
      this.filesMap = [];
      this.tagTo = "";
      this.tagCC = "";
      this.tagBCC = "";
      this.tagsTo = [];
      this.tagsCC = [];
      this.tagsBCC = [];
      this.autocompleteItemsTo = [];
      this.autocompleteItemsCC = [];
      this.autocompleteItemsBCC = [];
      this.toNotValid = false;
      this.ccNotValid = false;
      this.bccNotValid = false;
      (this.normal = true),
        (this.minimize = false),
        (this.maximize = false),
        (this.subject = "");
      this.threadID = null;
      this.draftID = null;
      this.message = "New Message";
      this.mail_body = this.signature();
      this.tweet_compose_body = "";
      this.sms_compose_body = "";
      this.toNumber = "";
      this.toNumber2 = "";
      this.inReplyTo = null;
      this.mailboxID = null;
      this.fromSelected = this.defaultAlias();
      // this.compose = this.compose.filter(el => Object.keys(el) !== hash);
      bus.$emit("closeCompose", hash);
      // }
    },
    // getUserSignature() {
    //   fetch(this.$apiBaseURL + "getUserSignature.php?mailboxId=" + this.$route.params.mailboxId, {credentials: "include"})
    //   .then(async response => {
    //       const data = await response.json();
    //       if(data.status !== "success") {
    //         const error = (data && data.message) || response.status;
    //         return Promise.reject(error);
    //       }
    //       console.log(data);
    //       let signature = this.$store.state.userSignature.body;
    // if(!signature) return '';
    // let body=signature.replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i,"$1");
    // console.log(body);
    // let html = '';
    // let sign = `<div>${body}</div>`
    // // let signatureText = sign.text();
    // // if (signatureText.trim() || sign.find('img').length > 0) {
    //     html = `
    //         <br/>
    //         <br/>
    //         <div><div class="hw_signature rounded">
    //         <div class="hw_attr">
    //         <div class="pt-2 pb-2">
    //             ${sign}
    //         </div>
    //         </div>
    //         </div>
    //         </div>`;
    // // }
    // console.log(html);
    // this.mail_body = html;
    //     }).catch(error => {
    //     alert(error);
    //   })
    // },
    createBodyMail(prop) {
      let from = {};
      from[this.fromSelected.email] = this.fromSelected.name;
      let to = {};
      let bcc = {};
      let cc = {};
      let files = [];
      for (let i = 0; i < this.tagsTo.length; i++) {
        if (this.tagsTo[i].name == undefined) {
          to[this.tagsTo[i].email] = this.tagsTo[i].email;
        } else {
          to[this.tagsTo[i].email] = this.tagsTo[i].name;
        }
      }
      for (let i = 0; i < this.tagsBCC.length; i++) {
        if (this.tagsBCC[i].name == undefined) {
          bcc[this.tagsBCC[i].email] = this.tagsBCC[i].email;
        } else {
          bcc[this.tagsBCC[i].email] = this.tagsBCC[i].name;
        }
      }
      for (let i = 0; i < this.tagsCC.length; i++) {
        if (this.tagsCC[i].name == undefined) {
          cc[this.tagsCC[i].email] = this.tagsCC[i].email;
        } else {
          cc[this.tagsCC[i].email] = this.tagsCC[i].name;
        }
      }
      let html = this.mail_body;
      var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g");
      html = html.replace(re1, "");
      let body;
      if (this.threadID == null) {
        body = {
          mailboxID: this.$route.params.mailboxId,
          bcc,
          cc,
          files: this.files,
          from,
          subject: this.subject,
          to,
          inReplyTo: this.composer.inReplyTo,
        };
      } else {
        body = {
          mailboxID: this.$route.params.mailboxId,
          bcc,
          cc,
          files: this.files,
          from,
          subject: this.subject,
          to,
          threadID: this.threadID,
          draftID: this.draftID,
          inReplyTo: this.composer.inReplyTo,
        };
      }
      let text = html.replace(/(<([^>]+)>)/gi, "");
      // console.log(text);
      html &&
        (body.html = `<div class=\"hwEmailWrapper\" style=\"font-family:sans-serif;font-size:0.875rem;color:#001737\">${html}</div>`);
      text && (body.text = text);
      if (prop == "send") {
        if (this.$store.state.userSettings.send == "send") {
          body.archive = false;
        } else {
          body.archive = true;
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      };
      console.log(requestOptions.body);
      return requestOptions;
    },
    createBodyTwitter(prop) {
      let from = this.$store.state.inboxData.address.split(":")[1];
      let to = this.$store.state.inboxData.address.split(":")[1];
      let bcc = {};
      let cc = {};
      let html = this.tweet_compose_body;
      var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g");
      html = html.replace(re1, "");
      console.log(html);
      html = html.replace(/(<([^>]+)>)/gi, "");
      console.log(html);
      let body;
      if (this.draftID == null) {
        body = {
          mailboxID: this.mailboxID,
          bcc,
          cc,
          files: this.files,
          from,
          to,
          inReplyTo: this.inReplyTo,
          replyAll: false,
          threadID: this.threadID,
          text: html,
          subject: html,
        };
      } else {
        body = {
          mailboxID: this.mailboxID,
          bcc,
          cc,
          files: this.files,
          from,
          to,
          threadID: this.threadID,
          draftID: this.draftID,
          inReplyTo: this.inReplyTo,
          replyAll: false,
          text: html,
          subject: html,
        };
      }
      // let text = html.replace(/(<([^>]+)>)/gi, "");
      // // console.log(text);
      // html &&
      //   (body.html = `<div class=\"hwEmailWrapper\" style=\"font-family:sans-serif;font-size:0.875rem;color:#001737\">${html}</div>`);
      // text && (body.text = text);
      if (prop == "send") {
        if (this.$store.state.userSettings.send == "send") {
          body.archive = false;
        } else {
          body.archive = true;
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      };
      console.log(requestOptions.body);
      return requestOptions;
    },
    createBodySMS(prop) {
      let to = this.toNumber2;
      let html = this.sms_compose_body;
      var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g");
      html = html.replace(re1, "");
      console.log(html);
      html = html.replace(/(<([^>]+)>)/gi, "");
      console.log(html);
      let body = {
        mailboxID: this.mailboxID,
        to,
        attachmentID: this.files,
        // threadID: this.threadID,
        message: html,
      };
      // let text = html.replace(/(<([^>]+)>)/gi, "");
      // // console.log(text);
      // html &&
      //   (body.html = `<div class=\"hwEmailWrapper\" style=\"font-family:sans-serif;font-size:0.875rem;color:#001737\">${html}</div>`);
      // text && (body.text = text);
      if (prop == "send") {
        if (this.$store.state.userSettings.send == "send") {
          body.archive = false;
        } else {
          body.archive = true;
        }
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      };
      console.log(requestOptions.body);
      return requestOptions;
    },
    saveDraft() {
      // this.getUserSignature();
      if (this.composer.type == "mail") {
        if (
          this.tagsTo.length > 0 ||
          this.tagsCC.length > 0 ||
          this.tagsBCC.length > 0 ||
          this.subject ||
          this.mail_body ||
          this.tweet_compose_body
        ) {
          console.log("save", this.composer.hash);
          this.message = "Saving Draft";
          let requestOptions, url;
          if (this.composer.type == "mail") {
            requestOptions = this.createBodyMail("draft");
            url = this.$apiBaseURL + "saveDraft.php";
          }

          fetch(url, requestOptions)
            .then(async (response) => {
              const data = await response.json();
              if (data.status !== "success") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              requestOptions.body = JSON.parse(requestOptions.body);
              console.log(this.draftID, this.threadID);
              this.draftID = data.data.draftID;
              this.threadID = data.data.threadID;
              console.log(this.editorInstance);
              this.editorInstance.draftID = data.data.draftID;
              this.editorInstance.mailboxID = this.mailboxID;
              this.editorInstance.threadID = data.data.threadID;
              if (this.subject !== "") {
                this.message = this.subject;
              } else {
                this.message = "Draft saved";
              }
            })
            .catch((error) => {
              alert(error);
            });
        }
      } else if (this.composer.type == "twitter") {
        const vueThis = this;
        if (this.tweet_compose_body) {
          this.message = "Saving Draft";
          let requestOptions = this.createBodyTwitter("draft");
          fetch(this.$apiBaseURL + "save-tweet-draft.php", requestOptions)
            .then(async (response) => {
              const data = await response.json();
              if (data.status !== "success") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              requestOptions.body = JSON.parse(requestOptions.body);
              this.message = requestOptions.body.text;
              this.draftID = data.data.draftID;
              this.threadID = data.data.threadID;

              this.editorInstance.draftID = data.data.draftID;
              this.editorInstance.mailboxID = this.mailboxID;
              this.editorInstance.threadID = data.data.threadID;
            })
            .catch((error) => {
              alert(error);
            });
        }
      }
    },
    sendMail(sendAt) {
      var self = this;
      if (this.composer.type == "mail") {
        console.log("sendingg");
        if (this.tagsTo.length == 0) {
          this.noTo = true;
          return;
        }
        for (let i = 0; i < this.tagsTo.length; i++) {
          if (this.tagsTo[i].tiClasses.includes("ti-invalid")) {
            this.noTo = false;
            this.toNotValid = true;
            break;
          }
        }
        for (let i = 0; i < this.tagsCC.length; i++) {
          if (this.tagsCC[i].tiClasses.includes("ti-invalid")) {
            this.ccNotValid = true;
            break;
          }
        }
        for (let i = 0; i < this.tagsBCC.length; i++) {
          if (this.tagsBCC[i].tiClasses.includes("ti-invalid")) {
            this.bccNotValid = true;
            break;
          }
        }
        if (this.toNotValid || this.ccNotValid || this.bccNotValid) return;
        let requestOptions = this.createBodyMail("send");
        requestOptions.body = JSON.parse(requestOptions.body);
        if (sendAt !== undefined) {
          requestOptions.body["sendAt"] = sendAt;
        }
        console.log(requestOptions.body);
        fetch(this.$apiBaseURL + "sendMail.php", requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.status !== "success") {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.show = false;
            this.undoMessage = data.message;
            $("#undo-txt").text(data.message);
            this.showUndo = true;
            this.undoInterval = setInterval(function () {
              console.log(1);
              self.undoTimer -= 1;
            }, 1000);
            this.undoTimeout = setTimeout(() => {
              console.log(2);
              clearInterval(self.undoInterval);
              self.showUndo = false;
              self.closeCompose(self.composer.hash);
              self.undoTimer = self.$store.state.userSettings.undoTimer;
            }, self.$store.state.userSettings.undoTimer * 1000);
            // clearTimeout(this.undoInterval);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.composer.type == "twitter") {
        console.log("sendingg");
        let requestOptions = this.createBodyTwitter("send");
        requestOptions.body = JSON.parse(requestOptions.body);
        if (sendAt !== undefined) {
          requestOptions.body["sendAt"] = sendAt;
        }
        console.log(requestOptions.body);
        // fetch(this.$apiBaseURL + "send-tweet.php", requestOptions)
        //   .then(async (response) => {
        //     const data = await response.json();
        //     if (data.status !== "success") {
        //       const error = (data && data.message) || response.status;
        //       return Promise.reject(error);
        //     }
        this.closeCompose(this.composer.hash);
        // this.undoMessage = data.message;
        // $("#undo-txt").text(data.message);
        // this.showUndo = true;
        // this.undoInterval = setInterval(function () {
        //   console.log(1);
        //   self.undoTimer -= 1;
        // }, 1000);
        // this.undoTimeout = setTimeout(() => {
        //   console.log(2);
        //   clearInterval(self.undoInterval);
        //   self.showUndo = false;
        //   self.closeCompose(self.composer.hash);
        //   self.undoTimer = self.$store.state.userSettings.undoTimer;
        // }, self.$store.state.userSettings.undoTimer*1000);
        // clearTimeout(this.undoInterval);
        // })
        // .catch((error) => {
        //   alert(error);
        // });
      } else if (this.composer.type == "sms") {
        console.log("sendingg");
        let requestOptions = this.createBodySMS("send");
        requestOptions.body = JSON.parse(requestOptions.body);
        console.log(requestOptions.body);
        // fetch(this.$apiBaseURL + "sms/send-sms.php", requestOptions)
        //   .then(async (response) => {
        //     const data = await response.json();
        //     if (data.status !== "success") {
        //       const error = (data && data.message) || response.status;
        //       return Promise.reject(error);
        //     }
        this.closeCompose(this.composer.hash);
        // this.undoMessage = data.message;
        // $("#undo-txt").text(data.message);
        // this.showUndo = true;
        // this.undoInterval = setInterval(function () {
        //   console.log(1);
        //   self.undoTimer -= 1;
        // }, 1000);
        // this.undoTimeout = setTimeout(() => {
        //   console.log(2);
        //   clearInterval(self.undoInterval);
        //   self.showUndo = false;
        //   self.closeCompose(self.composer.hash);
        //   self.undoTimer = self.$store.state.userSettings.undoTimer;
        // }, self.$store.state.userSettings.undoTimer*1000);
        // clearTimeout(this.undoInterval);
        // })
        // .catch((error) => {
        //   alert(error);
        // });
      }
    },
    unsendMail() {
      clearInterval(this.undoInterval);
      clearTimeout(this.undoTimeout);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.draftID,
          mailboxId: this.$route.params.mailboxId,
          threadId: this.threadID,
        }),
        credentials: "include",
      };
      fetch(this.$apiBaseURL + "undoSend.php", requestOptions).then(
        async (response) => {
          const data = await response.json();
          if (data.status !== "success") {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log("unsending");
          this.showUndo = false;
          this.show = true;
        }
      );
      this.undoTimer = this.$store.state.userSettings.undoTimer;
    },
    showCC() {
      this.isCC = true;
    },
    showBCC() {
      this.isBCC = true;
    },
    check(tag) {
      console.log(tag);
      if (tag.email == undefined) {
        return !/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/.test(
          tag.text
        );
      } else {
        return !/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/.test(
          tag.email
        );
      }
    },
    updateTo(newTags) {
      console.log(newTags);
      this.autocompleteItemsTo = [];
      for (let i = 0; i < newTags.length; i++) {
        if (newTags[i].email == undefined) {
          newTags[i].email = newTags[i].text;
        }
      }
      this.tagsTo = newTags;
      this.noTo = false;
      this.toNotValid = false;
      console.log(this.tagsTo);
    },
    updateCC(newTags) {
      this.autocompleteItemsCC = [];
      for (let i = 0; i < newTags.length; i++) {
        if (newTags[i].email == undefined) {
          newTags[i].email = newTags[i].text;
        }
      }
      this.tagsCC = newTags;
      this.ccNotValid = false;
      console.log(this.tagsCC);
    },
    updateBCC(newTags) {
      this.autocompleteItemsBCC = [];
      for (let i = 0; i < newTags.length; i++) {
        if (newTags[i].email == undefined) {
          newTags[i].email = newTags[i].text;
        }
      }
      this.tagsBCC = newTags;
      this.bccNotValid = false;
      console.log(this.tagsBCC);
    },
    initItemsTo() {
      if (this.tagTo.length < 2) return;
      const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagTo}`;
      console.log("starting");
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            console.log(response.data.data.contacts);
            this.autocompleteItemsTo = response.data.data.contacts.map((a) => {
              let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`;
              return {
                text: a.name + " (" + a.email + ")",
                id: a.id,
                email: a.email,
                name: a.name !== "" ? a.name : a.email,
                icon: icon,
              };
            });
          })
          .catch(() => console.warn("Oh. Something went wrong"));
      }, 600);
    },
    initItemsCC() {
      if (this.tagCC.length < 2) return;
      const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagCC}`;
      console.log("starting");
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            console.log(response.data.data.contacts);
            this.autocompleteItemsCC = response.data.data.contacts.map((a) => {
              let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`;
              return {
                text: a.name + " " + a.email,
                id: a.id,
                email: a.email,
                name: a.name,
                icon: icon,
              };
            });
          })
          .catch(() => console.warn("Oh. Something went wrong"));
      }, 600);
    },
    initItemsBCC() {
      if (this.tagBCC.length < 2) return;
      const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagBCC}`;
      console.log("starting");
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(url, { withCredentials: true })
          .then((response) => {
            console.log(response.data.data.contacts);
            this.autocompleteItemsBCC = response.data.data.contacts.map((a) => {
              let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`;
              return {
                text: a.name + " " + a.email,
                id: a.id,
                email: a.email,
                name: a.name,
                icon: icon,
              };
            });
          })
          .catch(() => console.warn("Oh. Something went wrong"));
      }, 600);
    },
  },
};
</script>

<style>
.vue-tags-input .ti-tag {
  position: relative;
  background: #e2e2e2;
  color: #000;
  font-size: 12px;
  padding: 2px 7px;
  margin: 0.25rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
  line-height: 1.5;
}

.vue-tags-input .ti-input {
  border: none;
}

.vue-tags-input .ti-tag.ti-invalid {
  background-color: #d9534f;
  color: white;
}

.vue-tags-input .ti-autocomplete {
  /* background: #283944; */
  border: 1px solid #8b9396;
  border-radius: 7px;
  z-index: 20000000;
}

.vue-tags-input .ti-item.ti-selected-item {
  background: #e2e2e2;
  color: #000;
}

.btnn {
  font-size: 14px;
  color: white;
  /* padding: 7px; */
  border-radius: 5px;
  cursor: pointer;

  float: right;
  bottom: 8px;
  position: absolute;
  right: 20px;
}

.fr-toolbar .fr-command .fr-btn img,
.fr-popup .fr-command.fr-btn img,
.fr-modal .fr-command.fr-btn img {
  margin: 8px 7px;
  width: 16px !important;
}

.fr-toolbar .fr-command.fr-btn img,
.fr-popup .fr-command.fr-btn img,
.fr-modal .fr-command.fr-btn img {
  margin: 8px 7px;
  width: 16px !important;
}
</style>