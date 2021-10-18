<template>
    <div class="integrationContainer">
        <IntegrationData
            v-for= "(integration, index) in integrations"
            :key= "index"
            :integration_data= "integration"
            @openInt = "openIntegration"
        />


        <!-- <IntegrationSidebar
            :data="sidebarData"
            v-if="isSidebarActive"
        /> -->
    </div>
</template>

<script>
    import { bus } from "../../main";
    import IntegrationData from './IntegrationData.vue';
    export default {
        data(){
            return {
                integrations: [],
                isSidebarActive: false,
                sidebarData: []
            }
        },
        components:{IntegrationData},
        methods: {
            openIntegration(name){
                console.log("integration", name);
                // api hit get search data: {name: name, email: "", phone: ""}
                // let data = []; //api se ayga data
                // isSidebarActive = isSidebarActive ? false: true;
                // this.sidebarData = data; //api wala data
                bus.$emit("openInt");
            }
        },
        // async beforeCreate() {
        //     const response1 = await fetch("https://app.helpwise.io/api/connected_integrations.php?mailbox_id=" + this.$route.params.mailboxId, {credentials: 'include'});
        //     const data1 = await response1.json();
            
        //     console.log("++");
        // },
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
        flex-direction: column;
        padding: 20px 10px;
    }
</style>