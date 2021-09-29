<template>
    <div class="setting-inboxes"><div id="mailboxSettingsContainer" class="mail-group" data-have-permission="true" style="width:auto">
    <div class="mail-group-header d-flex justify-content-between" style="flex-wrap: wrap;">
        <div class="search-form">
            <span class="current-tab tx-semibold mg-b-0">Inboxes</span>
        </div>
        <div style="align-self:flex-end;"><a id="hw-setting-inboxes-add-mailbox" style="" href="/create-inbox" class="btn btn-primary btn-xs">Create New Inbox</a></div>
    </div>
    <!-- mail-group-header -->
    <div class="mail-group-body" style="top:55px;">
        <div class="h-100">
            <div class="row h-100 mr-0">
                <SCInboxSidebar :mailboxes="mailboxes" />
                <SCSettingsContent />
                <div id="mailbox-settings-spinner-container" class="col-9 h-100" style="display: none;">
                    <div id="mailbox-settings-spinner" class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div></div>
</template>

<script>
import SCInboxSidebar from './SC-InboxSidebar.vue'
import SCSettingsContent from './SC-SettingsContent.vue'
export default {
    name: 'Content',
    components: {
        SCInboxSidebar,
        SCSettingsContent
    },
    data() {
        return {
            mailboxes: [],
            mailboxData: {}
        }
    },
    methods: {
        async fetchMailBoxes() {
            const response = await fetch("http://localhost/mas/hw/getMailBoxes.php");
            const data = await response.json();
            console.log(data);
            this.mailboxes = data.data.mailboxes;
        },
        async fetchMailBoxData(id) {
            const response = await fetch("http://localhost/mas/hw/getMailBoxData.php", {id});
            const data = await response.json();
            console.log(data);
            // this.mailboxData = data.data;
        }
    },
    async mounted() {
        await this.fetchMailBoxes();
        await this.fetchMailBoxData(this.mailboxes[0].id);
    }
}
</script>

<style
        SCInboxSidebar>

</style>