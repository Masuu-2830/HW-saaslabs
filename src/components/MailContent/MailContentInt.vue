<template>
    <div class="integration-sidebar bd-l" style="width: 50px; background: white;">
        <div class="df-settings df-contact-settings d-none d-md-block" :class="ifIntOpen && 'show'">
            <a id="dfSettingsShow" @click="openInt" class="df-settings-link all_icon"  :class="ifIntOpen && 'open'" style="top: 10px !important; left: -44px; background: transparent; border-right: none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </a>
            <div class="df-settings-body pd-l-10 pd-r-15">
                <div id="contactDetailsWrapper" style="">
                    <div class="pd-y-10 d-flex align-items-center justify-content-start">
                        <div class="avatar avatar-xs">
                            <span id="previous-email-avatar" class="avatar-initial rounded-circle avatar-preloaded" style="background-color: rgb(193, 134, 147);">F</span>
                        </div>
                        <span id="previous-email-name" class="tx-sans tx-12  tx-semibold pd-l-10 text-truncate" style="white-space:nowrap;">Froala </span>
                        <div class="d-flex justify-content-end align-item-end" style="width: 50%;">
                            <svg id="edit-customer-profile" style="cursor:pointer;color:#4f5d6b;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>

                        </div>
                    </div>

                    <div class="pd-y-10 bd-t customer-profile-job" style="display: none;">

                        <div class="row d-flex flex-column align-items-center justify-content-center">

                            <div class="pd-l-10 pd-r-10" style="width:100%;">
                                <div class="d-flex justify-content-start" style="padding:5px;color:#4f5d6b;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-slack">
                                        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z">
                                        </path>
                                        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z">
                                        </path>
                                        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z">
                                        </path>
                                        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z">
                                        </path>
                                        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z">
                                        </path>
                                        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z">
                                        </path>
                                        <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z">
                                        </path>
                                        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z">
                                        </path>
                                    </svg>
                                    <span class="tx-11 pd-l-7" style="max-width:85%" id="contact-company"></span>
                                </div>
                            </div>

                            <div class="pd-l-10 pd-r-10" style="width:100%;">
                                <div class="d-flex justify-content-start" style="padding:5px;color:#4f5d6b;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award">
                                        <circle cx="12" cy="8" r="7"></circle>
                                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88">
                                        </polyline>
                                    </svg>
                                    <span class="tx-11 pd-l-7" style="max-width:85%" id="contact-profile"></span>
                                </div>
                            </div>
                        </div>
                        <!-- row -->
                    </div>

                    <div class="pd-y-10 bd-t customer-profile-div">

                        <div class="row d-flex flex-column align-items-center justify-content-center">
                            <div role="status" class="spinner-border spinner-border-sm" style="display: none;"></div>
                            <div class="pd-l-10 pd-r-10" id="contact-customer-emails" style="width:100%;">
<a href="mailTo:support@froala.com" class="d-flex justify-content-start" style="padding:5px;color:#4f5d6b;">
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
<span class="tx-11 pd-l-7" style="max-width:85%">support@froala.com</span>
</a>
</div>
                            <div class="pd-l-10 pd-r-10" id="contact-customer-phones" style="width:100%;"></div>

                        </div>
                        <!-- row -->
                    </div>


                    <div class="pd-y-20 bd-t" id="thread-activity-logs-div" style="display: none;">
                        <label class="tx-sans tx-10 tx-uppercase tx-bold tx-spacing-1 tx-color-02 mg-b-15" style="color:#4f5d6b;">Activity Logs</label>
                        <div class="row d-flex flex-column align-items-center justify-content-center">
                            <div class="pd-l-10 pd-r-10" id="thread-activity-logs" style="width:100%;">

                            </div>
                        </div>
                        <!-- row -->
                    </div>


                    <!-- <div class="pd-y-20 bd-t" id="previous-threads-wrapper">
                    <label class="tx-sans tx-10 tx-uppercase tx-bold tx-spacing-1 tx-color-02 mg-b-15"
                        style='color:#4f5d6b;'>Previous
                        Conversations</label>
                    <div class="row d-flex flex-column align-items-center justify-content-center">
                        <div class="pd-l-10 pd-r-10" id="previous-threads-list" style="width:100%;">

                        </div>
                    </div> -->
                    <!-- row -->
                    <!-- </div> -->
                    <div class="chatUser-extras-window d-none mg-b-10">
                        <div class="collapse-body shadow-sm bg-white rounded bd">
                            <div class="collapse-header row" data-toggle="collapse" href="#chatUser_extras_details" role="button" aria-expanded="false" aria-controls="chatUser_extras_details" style="height:50px; cursor: pointer;">
                                <div class="col-10">
                                    <p class="pd-l-13 pd-t-15 tx-bold">
                                        See More Details
                                    </p>
                                </div>
                                <div class="col-1 pd-0 d-flex align-items-center">
                                    <p class="chatUser_collapse_header pd-0 mg-b-0">
                                        <i class="fas fa-caret-down" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div id="chatUser_extras_details" class="chatUser_collapsible collapse pd-b-1 pd-x-12" style="word-wrap: break-word;line-height: 1.50;">
                            </div>
                        </div>
                    </div>

                    <div class="chatUser-recent-pages-window d-none mg-b-20">
                        <div class="collapse-body shadow-sm bg-white rounded bd">
                            <div class="collapse-header row" data-toggle="collapse" href="#chatUser_recent-pages_details" role="button" aria-expanded="false" aria-controls="chatUser_recent-pages_details" style="height:50px; cursor: pointer;">
                                <div class="col-10">
                                    <p class="pd-l-13 pd-t-15 tx-bold">
                                        Recent Pages
                                    </p>
                                </div>
                                <div class="col-1 pd-0 d-flex align-items-center">
                                    <p class="chatUser_collapse_header pd-0 mg-b-0">
                                        <i class="fas fa-caret-down" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div id="chatUser_recent-pages_details" class="chatUser_collapsible collapse pd-b-1 pd-x-8" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;line-height: 1.50;">
                                <div class="content pd-5">
                                    <div class="container pd-x-0 pd-xl-x-0">
                                        <div class="media d-flex">
                                            <div class="media-body">
                                                <div class="timeline-group tx-13" id="recent-pages-content">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row pd-x-10">
                                    <button type="button" class="btn btn-link d-none pd-5 col-5" id="showLessRecentPages">Show Less</button>
                                    <button type="button" class="btn btn-link d-none pd-5 offset-2 col-5" id="showMoreRecentPages">Show More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chatUser-previous-conversation-window mg-b-20" id="previous-threads-wrapper">
                        <div class="collapse-body shadow-sm bg-white rounded bd">
                            <div class="collapse-header row" data-toggle="collapse" href="#previous-thread-conversation_details" role="button" aria-expanded="true" aria-controls="chatUser_previous-conversation_details" style="height:50px; cursor: pointer;">
                                <div class="col-10">
                                    <p class="pd-l-13 pd-t-15 tx-bold">
                                        Previous Conversation
                                    </p>
                                </div>
                                <div class="col-1 pd-0 d-flex align-items-center">
                                    <p class=" pd-0 mg-b-0">
                                        <i class="fas fa-caret-down" style="color: silver;border-radius:5px;"></i>
                                    </p>
                                </div>
                            </div>
                            <div id="previous-thread-conversation_details" class=" pd-b-1 collapse show" style="overflow-wrap: break-word; line-height: 1.5;">
                                <div style="display: grid; place-content: center;" class="pd-y-10 d-none" id="previous-conversation-loader">
                                    <div class="spinner-border text-primary tx-10" role="status" style="width: 15px; height: 15px;">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>

                                <div class="d-flex flex-column" id="previous-threads-list"><a href="https://app.helpwise.io/inbox/me/assigned/1025611" target="_blank" class="text-decoration-none"><div class="mail-body hw-email card pt-0 pl-3 pr-3 pb-0 mb-2 bg-white border-0 rounded" id="thread-810504" style="margin-top:10px;">
                    <div class="d-flex flex-column  bd-b pd-y-10" id="prev-thread-253886">
                                                <div class="d-flex mg-b-5 align-items-center">
                                                    <div class="avatar avatar-xs mg-r-5 d-flex align-items-center" style="width: 26px !important; height: 26px !important;">
<div style=" display: grid; place-content: center; border: 1px solid; border-radius: 50%; height: 22px; width: 22px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
</div>
</div>
                                                    <p class="mg-b-0 tx-12 tx-color-01" style="font-weight: 500;">Unassigned</p>
                                                </div>
                                                <div class="d-flex">
                                                    <p class="mg-b-0 tx-14 tx-color-03 col-10 pd-x-2 pd-y-5" style="width: 100%; overflow: hidden;white-space: nowrap;display: inline-block;text-overflow: ellipsis;">Froala Editor - Feature and Product Enhancement Survey</p>
                                                    <p class="mg-b-0 mg-l-2 tx-14 tx-color-03 pd-5" style="width: 100%; text-align: right;">1y</p>
                                                </div>
                                            </div>
                </div>
                </a><a href="https://app.helpwise.io/inbox/me/assigned/518697" target="_blank" class="text-decoration-none"><div class="mail-body hw-email card pt-0 pl-3 pr-3 pb-0 mb-2 bg-white border-0 rounded" id="thread-743503" style="margin-top:10px;">
                    <div class="d-flex flex-column  bd-b pd-y-10" id="prev-thread-253886">
                                                <div class="d-flex mg-b-5 align-items-center">
                                                    <div class="avatar avatar-xs mg-r-5 d-flex align-items-center" style="width: 26px !important; height: 26px !important;">
<div style=" display: grid; place-content: center; border: 1px solid; border-radius: 50%; height: 22px; width: 22px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
</div>
</div>
                                                    <p class="mg-b-0 tx-12 tx-color-01" style="font-weight: 500;">Unassigned</p>
                                                </div>
                                                <div class="d-flex">
                                                    <p class="mg-b-0 tx-14 tx-color-03 col-10 pd-x-2 pd-y-5" style="width: 100%; overflow: hidden;white-space: nowrap;display: inline-block;text-overflow: ellipsis;">No subject</p>
                                                    <p class="mg-b-0 mg-l-2 tx-14 tx-color-03 pd-5" style="width: 100%; text-align: right;">1y</p>
                                                </div>
                                            </div>
                </div>
                </a><a href="https://app.helpwise.io/inbox/me/assigned/641172" target="_blank" class="text-decoration-none"><div class="mail-body hw-email card pt-0 pl-3 pr-3 pb-0 mb-2 bg-white border-0 rounded" id="thread-463715" style="margin-top:10px;">
                    <div class="d-flex flex-column  bd-b pd-y-10" id="prev-thread-253886">
                                                <div class="d-flex mg-b-5 align-items-center">
                                                    <div class="avatar avatar-xs mg-r-5 d-flex align-items-center" style="width: 26px !important; height: 26px !important;">
<div style=" display: grid; place-content: center; border: 1px solid; border-radius: 50%; height: 22px; width: 22px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
</div>
</div>
                                                    <p class="mg-b-0 tx-12 tx-color-01" style="font-weight: 500;">Unassigned</p>
                                                </div>
                                                <div class="d-flex">
                                                    <p class="mg-b-0 tx-14 tx-color-03 col-10 pd-x-2 pd-y-5" style="width: 100%; overflow: hidden;white-space: nowrap;display: inline-block;text-overflow: ellipsis;">No subject</p>
                                                    <p class="mg-b-0 mg-l-2 tx-14 tx-color-03 pd-5" style="width: 100%; text-align: right;">1y</p>
                                                </div>
                                            </div>
                </div>
                </a><a href="https://app.helpwise.io/inbox/me/assigned/204376" target="_blank" class="text-decoration-none"><div class="mail-body hw-email card pt-0 pl-3 pr-3 pb-0 mb-2 bg-white border-0 rounded" id="thread-367155" style="margin-top:10px;">
                    <div class="d-flex flex-column  bd-b pd-y-10" id="prev-thread-253886">
                                                <div class="d-flex mg-b-5 align-items-center">
                                                    <div class="avatar avatar-xs mg-r-5 d-flex align-items-center" style="width: 26px !important; height: 26px !important;">
<div style=" display: grid; place-content: center; border: 1px solid; border-radius: 50%; height: 22px; width: 22px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
</div>
</div>
                                                    <p class="mg-b-0 tx-12 tx-color-01" style="font-weight: 500;">Unassigned</p>
                                                </div>
                                                <div class="d-flex">
                                                    <p class="mg-b-0 tx-14 tx-color-03 col-10 pd-x-2 pd-y-5" style="width: 100%; overflow: hidden;white-space: nowrap;display: inline-block;text-overflow: ellipsis;">test mail</p>
                                                    <p class="mg-b-0 mg-l-2 tx-14 tx-color-03 pd-5" style="width: 100%; text-align: right;">1s</p>
                                                </div>
                                            </div>
                </div>
                </a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contactCreateWrapper" class="pd-y-10" style="display: none;">
                    <div class="collapse-body shadow-sm bg-white rounded">
                        <div class="collapse-header row" style="cursor: pointer;height:50px;">
                            <div class="col-8">
                                <p class="pd-l-13 pd-t-15">
                                    <i class="far fa-address-card"></i>
                                    Contact
                                </p>
                            </div>
                        </div>
                        <div class="pd-b-1 collapse show" style="overflow-wrap: break-word; line-height: 1.5;">
                            <div class="col s12">
                                <p style="padding:5px;color:#4f5d6b;"> No contact Found associated with
                                    this conversation.<a id="createContactBtn" style="color:blue;cursor:pointer;"> Create
                                        One.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <IntegrationContainer></IntegrationContainer> -->
        </div>
    </div>
</template>

<script>
import { bus } from "../../main";
// import IntegrationContainer from './IntegrationContainer.vue';
export default {
//   components: { IntegrationContainer },
    name: 'MailContentVue',
    data() {
        return {
            ifIntOpen: false,
        }
    },
    methods: {
        openInt() {
            this.ifIntOpen = !this.ifIntOpen;
            bus.$emit('openInt');
        }
    }
}
</script>

<style>

</style>