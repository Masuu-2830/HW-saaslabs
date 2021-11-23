<template>
    <div class="integrationContainer">
        <div class="integrationIcons d-flex flex-column" :class="{open: sidebarOpen}">
            <IntegrationData
                v-for = "(integration, index) in integrations"
                :key = "index"
                :integration_data = "integration"
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
            />
        </div>
    </div>
</template>

<script>
    import IntegrationData from './IntegrationData.vue';
    import IntegrationSidebar from './IntegrationSidebar.vue';
    export default {
        data(){
            return {
                integrations: [],
                isSidebarActive: false,
                sidebarData: [],
                integrationName: '',
                integrationID: '',
                dataStatus: false,
                openCreateFormArray: {},
                openUpdateFormArray: {}
            }
        },
        props: ["sidebarOpen"],
        components:{IntegrationData, IntegrationSidebar},
        methods: {
            openIntegration(integrationData){
                this.$emit("openInt", integrationData.id);
                this.integrationName = integrationData.lname;
                this.integrationID = integrationData.id;
                if(this.sidebarOpen == false){
                    fetch("https://app.helpwise.io/api/integration-vue/"+integrationData.lname+"/"+integrationData.lname+".php?mailbox_id=" + this.$route.params.mailboxId + "&email=tushar@justcall.io&inbox_type=mail&integration_id=" + integrationData.id, {credentials: 'include'})
                    .then(async response => {
                        const integrationData = await response.json();
                        let integrationData2 = integrationData.data;
                        this.sidebarData = integrationData2;
                        this.dataStatus = true;
                        for(const key in this.sidebarData.create){
                            this.openCreateFormArray[key] = false;
                        }
                        for(const key in this.sidebarData.update){
                            this.openUpdateFormArray[key] = false;
                        }
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
                    this.sidebarData = [];
                }
                // api hit get search data: {name: name, email: "", phone: ""}
                // let data = []; //api se ayga data
                // isSidebarActive = isSidebarActive ? false: true;
                // this.sidebarData = data; //api wala data
            },
            postData(integration_name){
                // setTimeout(function () {
                //     console.log("wait");
                // }, 500);
                    fetch("https://app.helpwise.io/api/integration-vue/"+integration_name+"/"+integration_name+".php?mailbox_id=" + this.$route.params.mailboxId + "&email=tushar@justcall.io&inbox_type=mail&integration_id=" + this.integrationID, {
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
        created() {
            fetch("https://app.helpwise.io/api/connected_integrations.php?mailbox_id=" + this.$route.params.mailboxId, {credentials: 'include'})
            .then(async response => {
                const data = await response.json();
                // console.log("data parsed",JSON.parse(data));
                let data2 = data.data;
                this.integrations = data2;
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
        padding: 20px 10px;
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
    }
    .integrationIcons.open{
        right: 250px;
    }
</style>