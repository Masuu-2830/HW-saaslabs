<template>
    <div class="main">
        <NavBar :mailboxes="mailboxes" />
        <div class="mail-wrapper">
            <SideBarHW v-if="dataLoaded && loaded" :mailbox="mailbox" />
            <MailGroup v-if="dataLoaded && loaded" :mailbox="mailbox" />
            <MailContent />
            <compose-wrapper></compose-wrapper>
        </div>

        <HcArticles/>
        <SavedReply/>
    </div>
</template>

<script>
import NavBar from './NavBar.vue';
import MailGroup from './MailGroup/MailGroup.vue';
import SideBarHW from './SidebarHW.vue';
import MailContent from './MailContent/MailContent.vue'
import Compose from './Compose.vue';
import HcArticles from './modals/HcArticles.vue';
import SavedReply from './modals/SavedReply.vue';
import ComposeWrapper from './ComposeWrapper.vue';
import { bus } from "../main";
export default {
    name: 'Home',
    components: {
        NavBar,
        SideBarHW,
        MailGroup,
        MailContent,
        Compose,
        HcArticles,
        SavedReply,
        ComposeWrapper
    },
    data() {
      return {
            mailbox: {},
            mailboxes: [],
            dataLoaded: false,
            loaded: false
        }
    },
    watch:{
        $route (to, from) {
            if(to.params.mailboxId !== from.params.mailboxId) {
                this.fetchMailBoxData();
                this.fetchSidebarStats();
            }
        }
    },
    created() {
        bus.$on("fetchSideBarStats", () => {
            this.fetchSidebarStats();
        })
    },
    methods: {
        async fetchSidebarStats() {
            let url =
                this.$apiBaseURL +
                "mailboxes.php?mailboxID=" +
                (this.$route.params.mailboxId !== undefined ? this.$route.params.mailboxId : this.$store.state.inboxData.id); 
            const response = await fetch(url, {credentials: 'include'});
            const data = await response.json();
            console.log(data);
            this.mailbox = data.data.mailbox;
            this.dataLoaded = true;
        },
        async fetchMailBoxes() {
            const response = await fetch(this.$apiBaseURL + "mailboxes.php", {credentials: 'include'});
            const data = await response.json();
            console.log(data);
            this.mailboxes = data.data.mailboxes;
        },
        async fetchContacts() {
            const response = await fetch(this.$apiBaseURL + "contacts.php", {credentials: 'include'});
            const data = await response.json();
            console.log(data);
            // this.mailboxes = data.data.mailboxes;
        },
        async fetchMailBoxData() {
            console.log(this.$route.params.mailboxId);
            let url =
                "https://app.helpwise.io/api/ping.php?mailboxID=" +
                (this.$route.params.mailboxId !== undefined ? this.$route.params.mailboxId : this.$store.state.inboxData.id); 
            const response = await fetch(url, {credentials: 'include'});
            const data = await response.json();
            console.log(data);
            console.log("++");
            data.data.tags = data.data.tags.sort((b,a) => b.name-a.name);
            await this.$store.dispatch('fetchPingDetails', data);
        },
        async fetchAliases() {
            const response = await fetch(this.$apiBaseURL + "getFromAddresses.php?mailboxId=" + this.$route.params.mailboxId, {credentials: 'include'});
            const data = await response.json();
            console.log(data);
            await this.$store.dispatch('fetchAliases', data.data);
        },
        fetchUserSignature() {
            fetch(this.$apiBaseURL + "signatures/list.php?mailboxId=" + this.$route.params.mailboxId, {credentials: "include"})
            .then(async response => { 
                const data = await response.json();
                if(data.status !== "success") {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log(data);
                let signatureId = data.data[0] && data.data[0].id;
                if (signatureId) {
                    fetch(this.$apiBaseURL + "signatures/get.php?id=" + signatureId, {credentials: "include"})
                    .then(async response => { 
                        const data = await response.json();
                        if(data.status !== "success") {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                        }
                        console.log(data);
                        let signature = data.data.signature;
                        console.log(signature);
                        await this.$store.dispatch('fetchUserSignature', signature);
                    }).catch(error => {
                    alert(error);
                    })
                }
                }).catch(error => {
                alert(error);
            })
        }
    },
    async beforeMount() {
        await this.fetchSidebarStats();
        this.fetchMailBoxes();
        this.fetchAliases();
        this.fetchUserSignature();
        // this.fetchContacts();
        document.title = "Helpwise (" + this.mailbox.stats.mine + ")";
    },
    async beforeCreate() {
        console.log(this.$route.params.mailboxId, this.$route.params.type, this.$route.params.threadId, this.$store.state.inboxData.id,);
        let url =
                "https://app.helpwise.io/api/ping.php?mailboxID=" +
                (this.$route.params.mailboxId !== undefined ? this.$route.params.mailboxId : this.$store.state.inboxData.id); 
        const response1 = await fetch(url, {credentials: 'include'});
        const data1 = await response1.json();
        console.log(data1);
        console.log("++");
        data1.data.tags = data1.data.tags.sort((b,a) => b.name-a.name);
        await this.$store.dispatch('fetchPingDetails', data1);
        this.loaded = true;
        console.log(this.loaded);

        const response2 = await fetch("https://app.helpwise.io/api/getAccountMailboxes.php", {credentials: 'include'});
        const data2 = await response2.json();
        console.log(data2);
        // console.log("++");
        // data.data.tags = data.data.tags.sort((b,a) => b.name-a.name);
        await this.$store.dispatch('fetchMailBoxes', data2);
    }
}
</script>

<style>

</style>

// ssh teamuser@inbox.helpwise.io
// iKR+n-8]tUnq29V