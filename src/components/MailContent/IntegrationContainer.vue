<template>
    <div class="integrationContainer">
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
    </div>
</template>

<script>

    import Integration from 'Integration.vue';
    export default {
        data(){
            return {
                integrations: [],
                isSidebarActive: false,
                sidebarData: []
            }
        },
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