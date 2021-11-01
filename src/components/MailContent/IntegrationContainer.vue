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
                v-if = "sidebarOpen"
                :datastatus= "datastatus"
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
                datastatus: false
            }
        },
        props: ["sidebarOpen"],
        components:{IntegrationData, IntegrationSidebar},
        methods: {
            openIntegration(integrationData){
                console.log("integration", integrationData.lname);
                console.log("this sidebar",this.sidebarOpen);
                this.$emit("openInt", integrationData.id);
                this.integrationName = integrationData.lname;
                if(this.sidebarOpen == false){
                    fetch("https://app.helpwise.io/api/integration-vue/hubspot.php?mailbox_id=" + this.$route.params.mailboxId + "&email=tushar@justcall.io&integration_name=hubspot&inbox_type=mail&integration_id=" + integrationData.id, {credentials: 'include'})
                    .then(async response => {
                        const integrationData = await response.json();
                        console.log("what's this response", response);
                        console.log("kuch integration ka data",integrationData.data);
                        let integrationData2 = integrationData.data;
                        this.sidebarData = integrationData2;
                        console.log("bhaiya",this.sidebarData);
                        this.datastatus = true;
                        // check for error response
                        if (!response.status) {
                            // get error message from body or default to response statusText
                            const error = (integrationData && integrationData.message) || response.status;
                            this.datastatus = false;
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        this.errorMessage = error;
                        console.error("There was an error!", error);
                        this.datastatus = false;
                    });
                }else{
                    this.sidebarData = [];
                }
                // api hit get search data: {name: name, email: "", phone: ""}
                // let data = []; //api se ayga data
                // isSidebarActive = isSidebarActive ? false: true;
                // this.sidebarData = data; //api wala data
            }
        },
        created() {
            fetch("https://app.helpwise.io/api/connected_integrations.php?mailbox_id=" + this.$route.params.mailboxId, {credentials: 'include'})
            .then(async response => {
                const data = await response.json();
                console.log("integrations response", response);
                console.log("integrations data",data.data);
                // console.log("data parsed",JSON.parse(data));
                let data2 = data.data;
                this.integrations = data2;
                console.log("okay",this.integrations);
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