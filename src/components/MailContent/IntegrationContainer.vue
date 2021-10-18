<template>
    <div class="integrationContainer">
<<<<<<< HEAD
        <Integration
            v-for= "(integration, index) in integrations"
            :key= "index"
            :integration= "integration"
            @openInt = "openIntegartion"
        />


        <IntegrationSidebar
            :data="sidebarData"
            v-if="isSidebarActive"
        />
=======
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
>>>>>>> aa72655f2716937588d4dc7acfc453b58ac5d35e
    </div>
</template>

<script>
<<<<<<< HEAD

    import Integration from 'Integration.vue';
=======
    import { bus } from "../../main";
    import IntegrationData from './IntegrationData.vue';
>>>>>>> aa72655f2716937588d4dc7acfc453b58ac5d35e
    export default {
        data(){
            return {
                integrations: [],
                isSidebarActive: false,
                sidebarData: []
            }
        },
<<<<<<< HEAD
        components:{Integration},
        methods: {
            openIntegartion(name){
                // api hit get search data: {name: name, email: "", phone: ""}
                let data = []; //api se ayga data
                isSidebarActive = isSidebarActive ? false: true;
                this.sidebarData = data; //api wala data
            },
            async getIntegrationsData(){
                try {
                    let response = await fetch("https://app.helpwise.io/api/active_integrations_v2.php");
                    console.log("response",response);
                    this.integrations = await response.data;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        created() {
            this.getIntegrationsData();
=======
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
>>>>>>> aa72655f2716937588d4dc7acfc453b58ac5d35e
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