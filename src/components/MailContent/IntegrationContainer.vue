<template>
    <div class="integrationContainer">
        <div class="integrationIcons d-flex flex-column" :class="{open: sidebarOpen || contactOpen}">
            <!-- <mail-content-int style="margin-bottom: 40px" @openInt="openContactPanel" :thread="thread"></mail-content-int> -->
            <IntegrationData
                v-for = "(integration, index) in integrations"
                :key = "index"
                :integration_data = "integration"
                :activeInt = "activeInt"
                @openInt = "openIntegration"
            />
        </div>

        <div class="integrationSidebar" :class="{open: sidebarOpen}">
            <IntegrationSidebar
                :sidebarData = "sidebarData"
                :integrationName = "integrationName"
                :integrationID = "integrationID" 
                v-if = "sidebarOpen"
                :dataStatus= "dataStatus"
                :openCreateFormArray= "openCreateFormArray"
                :openUpdateFormArray= "openUpdateFormArray"
                @postData= "postData"
                @pmIntegration= "pmIntegration"
            />
        </div>
        <div v-if="contactOpen" :class="{open: contactOpen}" style="overflow-y: auto; overflow-x: hidden">
            <mail-contact-panel :thread="thread"></mail-contact-panel>
        </div>
    </div>
</template>

<script>
    import IntegrationData from './IntegrationData.vue';
    import IntegrationSidebar from './IntegrationSidebar.vue';
import MailContactPanel from './MailContactPanel.vue';
    export default {
        data(){
            return {
                integrations: [],
                activeInt: "",
                isSidebarActive: false,
                sidebarData: [],
                integrationName: '',
                integrationID: '',
                dataStatus: false,
                openCreateFormArray: {},
                openUpdateFormArray: {}
            }
        },
        props: ["sidebarOpen", "contactOpen", "thread"],
        components:{IntegrationData, IntegrationSidebar, MailContactPanel},
        methods: {
            openIntegration(integrationData){
                this.$emit("openInt", integrationData.id);
                this.integrationName = integrationData.lname;
                this.integrationID = integrationData.id;
                this.activeInt = this.integrationName;
                if(this.sidebarOpen == false){
                    let fetchUrl = '';
                    let date = moment().format("YYYY-MM-DD"); 
                    let threadID = location.pathname.split('/')[3];
                    if(integrationData.lname == 'custom-app'){
                        let pm_data = {};
                        pm_data['mailbox_id'] = this.$route.params.mailboxId;
                        pm_data['thread_id'] = threadID;
                        pm_data['inbox_type'] = 'mail';
                        // pm_data['contact'] = ;
                        pm_data['integration_id'] = integrationData.id;
                        fetch("https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php", {
                            method: 'POST', 
                            credentials: 'include',
                            headers: {
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(pm_data)
                        })
                        .then(async response => {
                            const integrationData = await response.json();
                            let integrationData2 = integrationData.data;
                            if(integrationData2.length == 0){
                                this.dataStatus = false;
                            }else{
                                this.sidebarData = integrationData2;
                                this.dataStatus = true;
                                for(const key in this.sidebarData.create){
                                    this.openCreateFormArray[key] = false;
                                }
                                for(const key in this.sidebarData.update){
                                    this.openUpdateFormArray[key] = false;
                                }
                            }
                            console.log("integrationData2",integrationData2);
                            // check for error response
                            if (!response.status) {
                                // get error message from body or default to response statusText
                                const error = (integrationData && integrationData.message) || response.status;
                                this.dataStatus = false;
                                return Promise.reject(error);
                            } 
                        })
                        .catch(error => {
                            this.errorMessage = error;
                            console.error("There was an error!", error);
                            this.dataStatus = false;
                        });
                    }else{
                        if(integrationData.lname == 'easy-calendar' || integrationData.lname == 'google-calendar' || integrationData.lname == 'outlook-calendar'){
                            fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + this.$route.params.mailboxId + "&email=vibhor@saaslabs.co&inbox_type=mail&integration_id=" + integrationData.id + "&date=" + date;
                        }else if(integrationData.lname == 'asana' || integrationData.lname == 'clickup' || integrationData.lname == 'jira' || integrationData.lname == 'trello'){
                            fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + this.$route.params.mailboxId + "&email=vibhor@saaslabs.co&inbox_type=mail&integration_id=" + integrationData.id;
                        }else{
                            fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + this.$route.params.mailboxId + "&email=a@justcall.io&inbox_type=mail&integration_id=" + integrationData.id;
                        }
                        fetch(fetchUrl, {credentials: 'include'})
                        .then(async response => {
                            const integrationData = await response.json();
                            let integrationData2 = integrationData.data;
                            if(integrationData2.length == 0){
                                this.dataStatus = false;
                            }else{
                                this.sidebarData = integrationData2;
                                this.dataStatus = true;
                                for(const key in this.sidebarData.create){
                                    this.openCreateFormArray[key] = false;
                                }
                                for(const key in this.sidebarData.update){
                                    this.openUpdateFormArray[key] = false;
                                }
                            }
                            console.log("integrationData2",integrationData2);
                            // check for error response
                            if (!response.status) {
                                // get error message from body or default to response statusText
                                const error = (integrationData && integrationData.message) || response.status;
                                this.dataStatus = false;
                                return Promise.reject(error);
                            }
                        })
                        .catch(error => {
                            this.errorMessage = error;
                            console.error("There was an error!", error);
                            this.dataStatus = false;
                        });
                    }
                }else{
                    this.sidebarData = [];
                }
            },
            postData(integration_name){
                // setTimeout(function () {
                //     console.log("wait");
                // }, 500);
                console.log("integration_name",integration_name);
                let fetchUrl = '';
                let date = moment().format("YYYY-MM-DD");
                if(integration_name == 'custom-app'){

                }else{ 
                    if(integration_name == 'easy-calendar' || integration_name == 'google-calendar' || integration_name == 'outlook-calendar'){
                        fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integration_name+"/"+integration_name+".php?mailbox_id=" + this.$route.params.mailboxId + "&email=ayush@justcall.io&inbox_type=mail&integration_id=" + this.integrationID + "&date=" + date;
                    }else if(integration_name == 'asana' || integration_name == 'clickup' || integration_name == 'jira' || integration_name == 'trello'){
                        fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integration_name+"/"+integration_name+".php?mailbox_id=" + this.$route.params.mailboxId + "&email=ayush@justcall.io&inbox_type=mail&integration_id=" + this.integrationID;
                    }else{
                        fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integration_name+"/"+integration_name+".php?mailbox_id=" + this.$route.params.mailboxId + "&email=a@justcall.io&inbox_type=mail&integration_id=" + this.integrationID;
                    }
                    fetch(fetchUrl, {
                        method: 'GET', 
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(async response => {
                        const updateResponse = await response.json();
                        this.sidebarData = [];
                        this.sidebarData = updateResponse.data;
                        // check for error response
                        if (!response.status) {
                            // get error message from body or default to response statusText
                            const error = (updateResponse && updateResponse.message) || response.status;
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        this.errorMessage = error;
                        console.error("There was an error!", error);
                    });
                }
            },
            pmIntegration(integrationData){
                console.log("fetched Data", integrationData);
                this.sidebarData = [];
                this.sidebarData = integrationData;
            }
        },
        created() {
            fetch("https://app.helpwise.io/api/connected_integrations.php?mailbox_id=" + this.$route.params.mailboxId, {credentials: 'include'})
            .then(async response => {
                const data = await response.json();
                let data2 = data.data;
                for (var i of data2) {
                    this.integrations.push(i);
                }
                // this.integrations.push(data2);
                // check for error response
                if (!response.status) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        }
    }
</script>

<style scoped>
    .integrationContainer{
        display: flex;
        flex-direction: row;
    }
    .integrationSidebar{
        display: none;
    }
    .integrationSidebar.open{
        display: flex;
        right: 300px;
    }
    .integrationIcons{
        right: 0px; 
        padding: 10px 7px;
    }
    .integrationIcons.open{
        right: 250px;
    }
</style>