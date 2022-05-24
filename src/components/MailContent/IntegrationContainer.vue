<template>
    <div class="integrationContainer bd-l">
        <div class="integrationIcons d-flex flex-column" :class="{open: sidebarOpen || contactOpen}">
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
                :errorMsg= "errorMsg"
                :openCreateFormArray= "openCreateFormArray"
                :openUpdateFormArray= "openUpdateFormArray"
                :thread= "thread"
                @postData= "postData"
                @pmIntegration= "pmIntegration"
                @calendarIntegration= "calendarIntegration"
                :commentData = "commentData"
            />
        </div>
        <div v-if="contactOpen" :class="{open: contactOpen}" style="overflow-y: auto; overflow-x: hidden">
            <mail-contact-panel :thread="thread" :contact="contact"></mail-contact-panel>
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
                openCreateFormArray: { 'candidate': false, 'customer': false, 'contact': false, 'deal':false, 'task':false, 'lead':false, 'opportunity':false, 'offer':false, 'company':false, 'card':false, 'subscriber':false, 'event': false, 'custom_field': false, 'tag': false, 'activity': false, 'comments': false },
                openUpdateFormArray: { 'candidate': false, 'customer': false, 'contact': false, 'deal':false, 'task':false, 'lead':false, 'opportunity':false, 'offer':false, 'company':false, 'card':false, 'subscriber':false,'event': false, 'custom_field': false, 'tag': false, 'activity': false, 'comments': false },
                errorMsg: 'Please wait for the response.',
                commentData: {}
            }
        },
        props: ["sidebarOpen", "contactOpen", "thread", "contact"],
        components:{IntegrationData, IntegrationSidebar, MailContactPanel},
        methods: {
            openIntegration(integrationData){
                this.$emit("openInt", integrationData);
                var primaryEmail = this.thread.data.contact.emails[0];
                var primaryPhone = this.thread.data.contact.phones[0];
                if(this.thread.data.contact.phones[0] && this.thread.data.contact.phones[0].phoneNo){
                    primaryPhone = this.thread.data.contact.phones[0].phoneNo;
                }
                var inboxType = this.thread.data.mailboxType;
                var threadID = this.thread.data.id;
                var mailboxID = this.thread.data.mailbox_id;
                var contactID = this.thread.data.contact.id;
                var contact = {
                    "id":this.thread.data.contact.id,
                    "emails":[
                        primaryEmail
                    ],
                    "firstname": this.thread.data.contact.firstname,
                    "lastname": this.thread.data.contact.lastname,
                    "phones": [
                        primaryPhone
                    ],
                    "primaryEmail":primaryEmail
                };
                if(integrationData.lname!='contact'){
                    if(this.sidebarOpen == false){
                        let fetchUrl = '';
                        let date = moment().format("YYYY-MM-DD"); 
                        if(integrationData.lname == 'custom-app'){
                            let pm_data = {};
                            pm_data['mailbox_id'] = mailboxID;
                            pm_data['thread_id'] = threadID;
                            pm_data['inbox_type'] = inboxType;
                            pm_data['contact'] = contact;
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
                                    this.errorMsg = integrationData.message;
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
                                // check for error response
                                if (response.status!=200 && response.status!='success') {
                                    // get error message from body or default to response statusText
                                    const error = (integrationData && integrationData.message) || response.status;
                                    this.dataStatus = false;
                                    this.errorMsg = error;
                                    return Promise.reject(error);
                                } 
                            })
                            .catch(error => {
                                this.errorMsg = error;
                                console.error("There was an error!", error);
                                this.dataStatus = false;
                            });
                        }else{
                            if(integrationData.lname == 'easy-calendar' || integrationData.lname == 'google-calendar' || integrationData.lname == 'outlook-calendar'){
                                fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + mailboxID + "&email=" + primaryEmail + "&phone=" + primaryPhone + "&inbox_type=" + inboxType + "&integration_id=" + integrationData.id + "&date=" + date + "&contactID=" + contactID;
                            }else if(integrationData.lname == 'asana' || integrationData.lname == 'clickup' || integrationData.lname == 'jira' || integrationData.lname == 'trello'){
                                fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + mailboxID + "&email=" + primaryEmail + "&phone=" + primaryPhone + "&inbox_type=" + inboxType + "&integration_id=" + integrationData.id + "&contactID=" + contactID;
                            }else{
                                fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + mailboxID + "&email=" + primaryEmail + "&phone=" + primaryPhone + "&inbox_type=" + inboxType + "&integration_id=" + integrationData.id + "&contactID=" + contactID;
                            }
                            fetch(fetchUrl, {credentials: 'include'})
                            .then(async response => {
                                const integrationData = await response.json();
                                let integrationData2 = integrationData.data;
                                if(integrationData2.length == 0){
                                    this.dataStatus = false;
                                    this.errorMsg = integrationData.message;
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
                                // check for error response
                                if (response.status!=200 && response.status!='success') {
                                    // get error message from body or default to response statusText
                                    const error = (integrationData && integrationData.message) || response.status;
                                    this.dataStatus = false;
                                    this.errorMsg = error;
                                    return Promise.reject(error);
                                }
                            })
                            .catch(error => {
                                this.errorMsg = error;
                                this.dataStatus = false;
                            });
                        }
                    }else{
                        if(this.integrationName!=integrationData.lname || this.integrationID!=integrationData.id){
                            let fetchUrl = '';
                            let date = moment().format("YYYY-MM-DD"); 
                            if(integrationData.lname == 'custom-app'){
                                let pm_data = {};
                                pm_data['mailbox_id'] = this.thread.data.mailbox_id;
                                pm_data['thread_id'] = threadID;
                                pm_data['inbox_type'] = inboxType;
                                pm_data['contact'] = contact;
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
                                        this.errorMsg = integrationData.message;
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
                                    // check for error response
                                    if (response.status!=200 && response.status!='success') {
                                        // get error message from body or default to response statusText
                                        const error = (integrationData && integrationData.message) || response.status;
                                        this.dataStatus = false;
                                        this.errorMsg = error;
                                        return Promise.reject(error);
                                    } 
                                })
                                .catch(error => {
                                    this.errorMsg = error;
                                    console.error("There was an error!", error);
                                    this.dataStatus = false;
                                });
                            }else{
                                if(integrationData.lname == 'easy-calendar' || integrationData.lname == 'google-calendar' || integrationData.lname == 'outlook-calendar'){
                                    fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + this.thread.data.mailbox_id + "&email=" + primaryEmail + "&phone=" + primaryPhone + "&inbox_type=" + inboxType + "&integration_id=" + integrationData.id + "&date=" + date + "&contactID=" + contactID;
                                }else if(integrationData.lname == 'asana' || integrationData.lname == 'clickup' || integrationData.lname == 'jira' || integrationData.lname == 'trello'){
                                    fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + this.thread.data.mailbox_id + "&email=" + primaryEmail + "&phone=" + primaryPhone + "&inbox_type=" + inboxType + "&integration_id=" + integrationData.id + "&contactID=" + contactID;
                                }else{
                                    fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + this.thread.data.mailbox_id + "&email=" + primaryEmail + "&phone=" + primaryPhone + "&inbox_type=" + inboxType + "&integration_id=" + integrationData.id + "&contactID=" + contactID;
                                }
                                fetch(fetchUrl, {credentials: 'include'})
                                .then(async response => {
                                    const integrationData = await response.json();
                                    let integrationData2 = integrationData.data;
                                    if(integrationData2.length == 0){
                                        this.dataStatus = false;
                                        this.errorMsg = integrationData.message;
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
                                    // check for error response
                                    if (response.status!=200 && response.status!='success') {
                                        // get error message from body or default to response statusText
                                        const error = (integrationData && integrationData.message) || response.status;
                                        this.dataStatus = false;
                                        this.errorMsg = error;
                                        return Promise.reject(error);
                                    }
                                })
                                .catch(error => {
                                    this.errorMsg = error;
                                    this.dataStatus = false;
                                });
                            }
                        }
                    }
                }
                this.integrationName = integrationData.lname;
                this.integrationID = integrationData.id;
                this.activeInt = this.integrationName;
            },
            postData(integration_name){
                // setTimeout(function () {
                // }, 500);
                let fetchUrl = '';
                let date = moment().format("YYYY-MM-DD");
                var primaryEmail = this.thread.data.contact.emails[0];
                var primaryPhone = this.thread.data.contact.phones[0];
                if(this.thread.data.contact.phones[0] && this.thread.data.contact.phones[0].phoneNo){
                    primaryPhone = this.thread.data.contact.phones[0].phoneNo;
                }
                var inboxType = this.thread.data.mailboxType;
                var threadID = this.thread.data.id;
                var mailboxID = this.thread.data.mailbox_id;
                var contactID = this.thread.data.contact.id;
                if(integration_name == 'custom-app'){

                }else{ 
                    if(integration_name == 'easy-calendar' || integration_name == 'google-calendar' || integration_name == 'outlook-calendar'){
                        fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integration_name+"/"+integration_name+".php?mailbox_id=" + mailboxID + "&email="+primaryEmail+"&inbox_type="+inboxType+"&phone="+primaryPhone+"&integration_id=" + this.integrationID + "&date=" + date + "&contactID=" + contactID;
                    }else if(integration_name == 'asana' || integration_name == 'clickup' || integration_name == 'jira' || integration_name == 'trello'){
                        fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integration_name+"/"+integration_name+".php?mailbox_id=" + mailboxID + "&email="+primaryEmail+"&inbox_type="+inboxType+"&phone="+primaryPhone+"&integration_id=" + this.integrationID + "&contactID=" + contactID;
                    }else{
                        fetchUrl = "https://app.helpwise.io/api/integration-vue/"+integration_name+"/"+integration_name+".php?mailbox_id=" + mailboxID + "&email="+primaryEmail+"&inbox_type="+inboxType+"&phone="+primaryPhone+"&integration_id=" + this.integrationID + "&contactID=" + contactID;
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
                        if (response.status!=200 && response.status!='success') {
                            // get error message from body or default to response statusText
                            const error = (updateResponse && updateResponse.message) || response.status;
                            this.errorMsg = error;
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        this.errorMsg = error;
                        console.error("There was an error!", error);
                    });
                }
            },
            pmIntegration(integrationData){
                this.sidebarData = [];
                this.sidebarData = integrationData;
                let comment_data = integrationData.fetch[0].components;
                comment_data.forEach(comment => {
                    this.commentData[comment[0].value] = [];
                });
            },
            calendarIntegration(calendarData){
                fetch("https://app.helpwise.io/api/integration-vue/"+calendarData.int_name+"/"+calendarData.int_name+".php?mailbox_id=" + calendarData.mailbox_id + "&email=" + calendarData.email + "&inbox_type=" + calendarData.inboxType + "&integration_id=" + calendarData.int_id + "&date=" + calendarData.date + "&contactID=" + calendarData.contactID, {credentials: 'include'})
                .then(async response => {
                    const integrationData = await response.json();
                    let integrationData2 = integrationData.data;
                    if(integrationData2.length == 0){
                        this.dataStatus = false;
                        this.errorMsg = integrationData.message;
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
                    // check for error response
                    if (response.status!=200 && response.status!='success') {
                        // get error message from body or default to response statusText
                        const error = (integrationData && integrationData.message) || response.status;
                        this.dataStatus = false;
                        this.errorMsg = error;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    this.errorMsg = error;
                    this.dataStatus = false;
                });
            }
        },
        created() {
            fetch("https://app.helpwise.io/api/connected_integrations.php?mailbox_id=" + this.thread.data.mailbox_id, {credentials: 'include'})
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
                this.errorMsg = error;
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