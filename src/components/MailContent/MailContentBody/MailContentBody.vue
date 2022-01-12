<template>
  <div
    class="mail-content-body"
    style="background-color: #f7f7f7; overflow-y: scroll; overflow-x: hidden"
  >
    <div
      class="spinner-border text-primary"
      id="threadLoadingSpinner"
      style="position: relative; left: 50%; display: none"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="Object.keys(thread).length !== 0" class="emails-wrapper">
      <div v-for="(item,index) in thread.data.items" :key="index">
          <mail-content-single-mail v-if="item.type == 'email'" :isCollapsed="lastMailId !== item.data.id" :subject="thread.data.displaySubject" :item="item"></mail-content-single-mail>
          <mail-content-comment v-else-if="item.type == 'comment'" :item="item"></mail-content-comment>
          <mail-content-log v-else :item="item"></mail-content-log>
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
    <!-- <mail-content-reply :thread="thread"></mail-content-reply> -->
    <reply-wrapper :thread="thread"></reply-wrapper>
  </div>
</template>

<script>
import MailContentComment from './MailContentComment.vue';
import MailContentLog from './MailContentLog.vue';
import MailContentReply from './MailContentReply.vue';
import MailContentSingleMail from './MailContentSingleMail.vue';
import ReplyWrapper from './ReplyWrapper.vue';
export default {
  components: { MailContentSingleMail, MailContentLog, MailContentReply, MailContentComment, ReplyWrapper },
  name: "MailContentBody",
  props: {
    thread: Object
  },
  computed: {
    lastMailId() {
      if(Object.keys(this.thread).length !== 0) {
        let mails = this.thread.data.items.filter(item => item.type == 'email').map(item => item.data);
        let lastmailid = mails[mails.length - 1].id;
        return lastmailid;
      }
    }
  }
};
</script>

<style>
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
                          .hwRenderWrapper23153177 { @-ms-viewport {
                            width: 320px;
                          }}
                          .hwRenderWrapper23153177 { @viewport {
                            width: 320px;
                          }}
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
                          .hwRenderWrapper23153177
                            .tolkien-column
                            img[shrinktofit="true"] {
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

.hwRenderWrapper23153177
                                                            [style*="Montserrat"] {
                                                            font-family: "Montserrat",
                                                              Verdana, Geneva,
                                                              Helvetica, Arial,
                                                              sans-serif !important;
                                                          }
                                                          @media only screen and (max-width: 600px) {
                                                            .hwRenderWrapper23153177
                                                              span
                                                              .idFooterLink-1a8263,
                                                            .hwRenderWrapper23153177
                                                              span.idFooterLink
                                                              a {
                                                              display: block !important;
                                                              padding-top: 2px !important;
                                                              padding-bottom: 2px !important;
                                                            }
                                                            .hwRenderWrapper23153177
                                                              span
                                                              .idFooterBullet-b210f7 {
                                                              display: none !important;
                                                            }
                                                            .hwRenderWrapper23153177
                                                              img.idFooterLogo {
                                                              width: 200px !important;
                                                              height: auto !important;
                                                            }
                                                            .hwRenderWrapper23153177
                                                              img
                                                              .idFooterSocial-398498 {
                                                              height: 30px !important;
                                                              width: auto !important;
                                                            }
                                                          }
</style>