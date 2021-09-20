<template>
  <div
    class="mail-content flex-row-reverse justify-content-between"
    :style="{ display: display, right: right }"
  >
    <div v-if="loading" id="thread-spinner" class="spinner-border text-primary" role="status" style="position: absolute; top: 50%; left: 50%;">
        <span class="sr-only">Loading...</span>
    </div>
    <mail-content-int v-if="!loading"></mail-content-int>
    <div v-if="!loading" class="d-flex flex-column justify-content-between" style="width: calc(100% - 50px);">
      <mail-content-header :thread="thread"></mail-content-header>
      <mail-content-body :thread="thread"></mail-content-body>
      <!-- <chat-content-body :thread="thread"></chat-content-body> -->
      <mail-content-add-note v-if="!loading"></mail-content-add-note>
      <!-- <chat-content-reply></chat-content-reply> -->
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
import ChatContentBody from './ChatContentBody.vue';
import ChatContentReply from './ChatContentReply.vue';
import MailContentAddNote from './MailContentAddNote.vue';
import MailContentBody from './MailContentBody.vue';
import MailContentHeader from './MailContentHeader.vue';
import MailContentInt from './MailContentInt.vue';
export default {
  components: { MailContentBody, MailContentAddNote, MailContentHeader, MailContentInt, ChatContentBody, ChatContentReply },
  name: "MailContent",
  data() {
    return {
      display: "none",
      right: '0px',
      thread: {},
      loading: false
    };
  },
  created() {
    bus.$on("compact", (data) => {
      this.display = "flex";
      if(data == null) {
        this.loading = true;
        console.log(this.loading);
      } else {
        this.thread = data;
        this.loading = false;
        console.log(this.loading);
      }
    });
    bus.$on("broad", () => {
      this.display = "none";
    });
    bus.$on("openInt", () => {
      if(this.right == '0px') {
          this.right = '250px';
      } else {
          this.right = '0px';
      }
    });
  },
};
</script>

<style>
.df-settings-ontraport.show .df-settings-link-ontraport,
.df-settings-ontraport.show .df-settings-link-ontraport:hover,
.df-settings-ontraport.show .df-settings-link-ontraport:focus {
  background-color: #fff;
  border-color: #c0ccda;
  color: #1c273c;
  box-shadow: none;
}
.df-settings-link-ontraport {
  position: absolute;
  top: 98px;
  left: -44px;
  width: 45px;
  height: 45px;
  background-color: #fff;
  color: #7987a1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c0ccda;
  border-right-width: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
  z-index: 1;
}
@media (prefers-reduced-motion: reduce) {
  .df-settings-link-ontraport {
    transition: none;
  }
}
.df-settings-link-ontraport:hover,
.df-settings-link-ontraport:focus {
  color: #1c273c;
  border-color: #8392a5;
  box-shadow: 0 0 10px 2px rgba(28, 39, 60, 0.1);
}
.df-settings-link-ontraport svg {
  width: 20px;
  height: 20px;
}

body
  > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-right.datepicker-orient-bottom {
  width: 200px !important;
  left: 1219px;
}

/* Mail Content */
.hwRenderWrapper23153177 html,
.hwRenderWrapper23153177 body {
  min-width: 260px;
  min-height: 100%;
  padding: 0;
  margin: 0 auto;
}
.hwRenderWrapper23153177 a img {
  border: none;
}
.hwRenderWrapper23153177 .ReadMsgBody {
  width: 100%;
}
.hwRenderWrapper23153177 .ExternalClass {
  width: 100%;
}
.hwRenderWrapper23153177 .ExternalClass * {
  line-height: 100%;
}
.hwRenderWrapper23153177 table,
.hwRenderWrapper23153177 td {
  border-collapse: collapse;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
}
.hwRenderWrapper23153177 .button {
  word-wrap: break-word;
}
@media screen and (max-width: 480px) {
  .hwRenderWrapper23153177 {
    @-ms-viewport {
      width: 320px;
    }
  }
  .hwRenderWrapper23153177 {
    @viewport {
      width: 320px;
    }
  }
}
.hwRenderWrapper23153177 ul {
  padding: 0 !important;
  margin: 0 0 0 40px !important;
}
.hwRenderWrapper23153177 li {
  margin-bottom: 10px !important;
}
.hwRenderWrapper23153177 sub,
.hwRenderWrapper23153177 sup {
  font-size: 70%;
  line-height: 0;
  position: relative;
}
.hwRenderWrapper23153177 sup {
  mso-text-raise: 60%;
  vertical-align: super;
}
.hwRenderWrapper23153177 sub {
  bottom: -0.25em;
}
.hwRenderWrapper23153177 a {
  color: #20a5f8;
}
@media screen and (max-width: 480px) {
  .hwRenderWrapper23153177 .tolkien-column-5f3e6c {
    width: 100% !important;
    max-width: 100% !important;
    min-width: auto !important;
  }
  .hwRenderWrapper23153177 .tolkien-column img.full {
    width: 100% !important;
    max-width: 100% !important;
  }
  .hwRenderWrapper23153177 .tolkien-column img[shrinktofit="true"] {
    width: auto !important;
    max-width: 100% !important;
  }
}
.hwRenderWrapper23153177 .hide-in-desktop {
  display: none;
  max-height: 0px;
}

@media (max-width: 520px) {
  .hwRenderWrapper23153177 .hide-in-mobile {
    min-height: 0px;
    max-height: 0px;
    max-width: 0px;
    display: none;
    overflow: hidden;
    font-size: 0px;
  }
  .hwRenderWrapper23153177 .hide-in-desktop {
    display: block !important;
    max-height: none !important;
  }
}

.hwRenderWrapper23153177 [style*="Montserrat"] {
  font-family: "Montserrat", Verdana, Geneva, Helvetica, Arial, sans-serif !important;
}
@media only screen and (max-width: 600px) {
  .hwRenderWrapper23153177 span .idFooterLink-dbd4ef,
  .hwRenderWrapper23153177 span.idFooterLink a {
    display: block !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
  .hwRenderWrapper23153177 span .idFooterBullet-7ca50b {
    display: none !important;
  }
  .hwRenderWrapper23153177 img.idFooterLogo {
    width: 200px !important;
    height: auto !important;
  }
  .hwRenderWrapper23153177 img .idFooterSocial-dfef28 {
    height: 30px !important;
    width: auto !important;
  }
}

.hwRenderWrapper23153177 html,
.hwRenderWrapper23153177 body {
  min-width: 260px;
  min-height: 100%;
  padding: 0;
  margin: 0 auto;
}
.hwRenderWrapper23153177 a img {
  border: none;
}
.hwRenderWrapper23153177 .ReadMsgBody {
  width: 100%;
}
.hwRenderWrapper23153177 .ExternalClass {
  width: 100%;
}
.hwRenderWrapper23153177 .ExternalClass * {
  line-height: 100%;
}
.hwRenderWrapper23153177 table,
.hwRenderWrapper23153177 td {
  border-collapse: collapse;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
}
.hwRenderWrapper23153177 .button {
  word-wrap: break-word;
}
@media screen and (max-width: 480px) {
  .hwRenderWrapper23153177 {
    @-ms-viewport {
      width: 320px;
    }
  }
  .hwRenderWrapper23153177 {
    @viewport {
      width: 320px;
    }
  }
}
.hwRenderWrapper23153177 ul {
  padding: 0 !important;
  margin: 0 0 0 40px !important;
}
.hwRenderWrapper23153177 li {
  margin-bottom: 10px !important;
}
.hwRenderWrapper23153177 sub,
.hwRenderWrapper23153177 sup {
  font-size: 70%;
  line-height: 0;
  position: relative;
}
.hwRenderWrapper23153177 sup {
  mso-text-raise: 60%;
  vertical-align: super;
}
.hwRenderWrapper23153177 sub {
  bottom: -0.25em;
}
.hwRenderWrapper23153177 a {
  color: #20a5f8;
}
@media screen and (max-width: 480px) {
  .hwRenderWrapper23153177 .tolkien-column-024981 {
    width: 100% !important;
    max-width: 100% !important;
    min-width: auto !important;
  }
  .hwRenderWrapper23153177 .tolkien-column img.full {
    width: 100% !important;
    max-width: 100% !important;
  }
  .hwRenderWrapper23153177 .tolkien-column img[shrinktofit="true"] {
    width: auto !important;
    max-width: 100% !important;
  }
}
.hwRenderWrapper23153177 .hide-in-desktop {
  display: none;
  max-height: 0px;
}

@media (max-width: 520px) {
  .hwRenderWrapper23153177 .hide-in-mobile {
    min-height: 0px;
    max-height: 0px;
    max-width: 0px;
    display: none;
    overflow: hidden;
    font-size: 0px;
  }
  .hwRenderWrapper23153177 .hide-in-desktop {
    display: block !important;
    max-height: none !important;
  }
}

.hwRenderWrapper23153177 [style*="Montserrat"] {
  font-family: "Montserrat", Verdana, Geneva, Helvetica, Arial, sans-serif !important;
}
@media only screen and (max-width: 600px) {
  .hwRenderWrapper23153177 span .idFooterLink-1a8263,
  .hwRenderWrapper23153177 span.idFooterLink a {
    display: block !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
  .hwRenderWrapper23153177 span .idFooterBullet-b210f7 {
    display: none !important;
  }
  .hwRenderWrapper23153177 img.idFooterLogo {
    width: 200px !important;
    height: auto !important;
  }
  .hwRenderWrapper23153177 img .idFooterSocial-398498 {
    height: 30px !important;
    width: auto !important;
  }
}
</style>