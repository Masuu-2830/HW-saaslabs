<template>
    <div id="replyWindowWrapper" v-if="replies.length > 0">
        <mail-content-reply v-for="reply in replies" :key="reply.id" :reply="reply"></mail-content-reply>
        <!-- <compose v-for="(composer, index) in composers" :key="composer.id" :align="index" :composer="composer" /> -->
    </div>
</template>

<script>
import { bus } from "../../../main";
import MailContentReply from './MailContentReply.vue';
export default {
  components: { MailContentReply },
    name: "ReplyWrapper",
    data() {
        return {
            replies: [],
            show: false
        }
    },
    props: {
      thread: Object
    },
    created() {
        bus.$on("openReply", (data, type, email) => {
            console.log("openingg",data, email, this.thread);
            if(email == undefined) {
                let obj = { hash: data };
                this.replies.push(obj);
            } else {
                let obj = { hash: data, id: email.id, type: type, email: email };
                this.replies.push(obj);
            }
            this.show = true;
            console.log(this.replies);
        });
        bus.$on("closeReply", (data) => {
            console.log("closing",data);
            // Vue.delete(this.compose, data);
            this.replies = this.replies.filter(el => el.hash !== data);
            console.log(this.replies);
        });
    }
}
</script>

<style>

</style>