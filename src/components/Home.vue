<template>
    <div class="main">
        <NavBar :mailboxes="mailboxes" />
        <div class="mail-wrapper">
            <SideBar :mailbox="mailbox" />
            <MailGroup :mailbox="mailbox" />
            <MailContent />
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar.vue';
import MailGroup from './MailGroup.vue';
import SideBar from './SideBar.vue';
import MailContent from './MailContent.vue'
export default {
    name: 'Home',
    components: {
        NavBar,
        SideBar,
        MailGroup,
        MailContent
    },
    data() {
        return {
            mailbox: {},
            mailboxes: [],
        }
    },
    methods: {
        async fetchSidebarStats() {
            const response = await fetch(this.$apiBaseURL + "mailboxes.php?mailboxID=" + this.$route.params.mailboxId, {credentials: 'include'});
            const data = await response.json();
            console.log(data);
            this.mailbox = data.data.mailbox;
        },
        async fetchMailBoxes() {
            const response = await fetch(this.$apiBaseURL + "mailboxes.php", {credentials: 'include'});
            const data = await response.json();
            console.log(data);
            this.mailboxes = data.data.mailboxes;
        },
    },
    async mounted() {
        await this.fetchSidebarStats();
        this.fetchMailBoxes();
        document.title = "Helpwise (" + this.mailbox.stats.mine + ")";
    },
    async beforeCreate() {
        const response = await fetch("https://app.helpwise.io/api/ping.php?mailboxID=" + this.$route.params.mailboxId, {credentials: 'include'});
        const data = await response.json();
        console.log(data);
        console.log("++");
        data.data.tags = data.data.tags.sort((b,a) => b.name-a.name);
        await this.$store.dispatch('fetchPingDetails', data);
    }
}
</script>

<style>

</style>

// ssh teamuser@inbox.helpwise.io
// iKR+n-8]tUnq29V