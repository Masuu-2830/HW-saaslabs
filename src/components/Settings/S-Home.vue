<template>
    <div class="main">
        <NavBar />
        <div class="mail-wrapper">
            <SideBar />
            <Content />
        </div>
    </div>
</template>

<script>
import NavBar from '../NavBar.vue';
import SideBar from './S-SideBar.vue';
import Content from './S-Content.vue'
export default {
    name: 'SHome',
    components: {
        NavBar,
        SideBar,
        Content
        // MailGroup,
        // MailContent
    },
}
</script>

<style>

</style>