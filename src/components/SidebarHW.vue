<template>
  <div class="mail-sidebar">
    <div class="mail-sidebar-body ps--active-y">
      <div class="pd-20" style="padding-bottom: 25px">
        <div class="d-none justify-content-between align-items-start">
          <h5 id="mailbox-title" v-if="this.mailbox.displayName">{{ this.mailbox.displayName }}</h5>
          <router-link
            to="settings"
            id="mailbox-settings-link"
            class=""
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              ></path>
            </svg>
          </router-link>
          <div class="pd-y-5 d-flex justify-content-center pos-relative">
            <button class="btn btn-link pd-0 mg-5 sidebarViewOptionButton" :class="{'open': sidebarViewOptionShow}" style="color: #566476;" @click="sidebarViewOptionShow = !sidebarViewOptionShow"><svg style="height: 16px; width: 16px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></button>
            <div class="pos-absolute d-flex flex-column" style="/* width: 100%; */ max-width: 300px; top: 100%; left: 50%; background: white; box-shadow: rgba(0,0,0,0.16) 0 0 10px 2px; padding: 10px; border-radius: 5px; z-index: 99999; max-height: calc(55vh + 100px)" v-if="sidebarViewOptionShow">
                <div class="d-flex w-100">
                    <div class="search-form pd-b-10 bd-b mg-b-10 w-100">
                        <input type="search" class="form-control" placeholder="Search" @keyup="filterOptionResults" v-model="searchSidebarViewOptions">
                        <button class="btn" type="button" @click="filterOptionResults">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </button>
                    </div>
                </div>
                <div class="optionContainer" style="max-height: 55vh; overflow: auto; padding-right: 20px; max-width: 350px;">
                    <div class="d-flex flex-column w-100" v-for="(list, labels) in sidebarViewOptionsListFiltered" :key="labels">
                        <p class="tx-color-03 tx-14 mg-b-5 mg-y-15 tx-uppercase pd-x-5" v-if="list.length > 0">{{labels}}</p>
                        <div 
                            class="d-flex justify-content-between w-100"
                            v-for="option in list"
                            :key="option.id"
                            @click="pinThisOption(labels, option)"
                        >
                            <div class="pd-5 mg-b-5 w-100 d-flex justify-content-between" v-if="(option.displayName && option.displayName.trim().length > 0) || (option.name && option.name.trim().length > 0)">
                                <div class="tx-color-01 mg-r-15 mg-b-0 d-flex" style="width: calc(100% - 30px)">
                                    <div class="tagIcon" v-if="labels == 'tags'">
                                        <svg xmlns="http://www.w3.org/2000/svg" :style="'color:'+option.color" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag mg-r-5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                                    </div>
                                    <div class="tx-color-01 mg-r-10 mg-b-0 d-flex" v-if="labels == 'inboxes'">
                                        <div class="inboxIcon" v-html="getInboxIcon(option.type)">
                                        </div>
                                    </div>
                                    <p class="mg-b-0 w-100" style="white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis">{{labels == 'inboxes' ? option.displayName : option.name }}</p>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark tx-color-03 bookmarkIcon" :class="{'isActive' : isItPinned(labels, option.id)}"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex w-100 bd-t mg-t-10 pd-t-10 justify-content-between">
                    <button class="btn btn-outline-secondary btn-xs" @click="sidebarViewOptionShow = !sidebarViewOptionShow">Cancel</button>
                    <button class="btn btn-primary btn-xs" @click="saveSidebarPins">Save</button>
                </div>
            </div>
          </div>
        </div>
        <div role="group" class="btn-group btn-block">
          <button
            v-if="this.mailbox.type == 'mail'"
            @click="openCompose('mail')"
            class="
              tx-uppercase
              mailComposeBtn
              tx-10 tx-medium tx-sans tx-spacing-4
              btn btn-primary
            "
            style="border-right: 2px solid #0153c7 !important"
          >
            Compose
          </button>
          <button
            v-if="this.mailbox.type == 'twitter'"
            @click="openCompose('twitter')"
            id="mailComposeBtn"
            class="
              btn btn-primary btn-block
              tx-uppercase tx-10 tx-medium tx-sans tx-spacing-4
            "
            style="
              background-color: rgb(29, 161, 242);
              border-color: rgb(29, 161, 242);
            "
          >
            Tweet
          </button>
          <button
            v-if="this.mailbox.type == 'sms'"
            @click="openCompose('sms')"
            id="mailComposeBtn"
            class="
              btn btn-primary btn-block
              tx-uppercase tx-10 tx-medium tx-sans tx-spacing-4
            "
          >
            Compose
          </button>
          <button
            v-if="this.mailbox.type == 'universal'"
            @click="openCompose('universalMail')"
            class="
              tx-uppercase
              mailComposeBtn
              tx-10 tx-medium tx-sans tx-spacing-4
              btn btn-primary
            "
            style="border-right: 2px solid #0153c7 !important"
          >
            Compose
          </button>
        </div>
      </div>
      <div class="pd-b-10 pd-l-10">
        <div id="nav-links-container" class="pd-r-10">
          <nav class="nav nav-sidebar tx-13" id="labels-nav">

            <div 
              v-for="(sectionValues, sectionName) in sections"
              :key="sectionName"
            >
                <div class="d-flex justify-content-between">
                    <li class="nav-label mg-y-10 tx-color-03 tx-uppercase" v-if="Object.keys(sectionValues).length > 0">{{sectionName}}</li>
                    <template v-if="sectionName == 'me'">
                        <div class="pd-y-5 d-flex justify-content-center pos-relative">
                            <button class="btn btn-link pd-0 mg-5 sidebarViewOptionButton" :class="{'open': sidebarViewOptionShow}" style="color: #566476;" @click="sidebarViewOptionShow = !sidebarViewOptionShow"><svg style="height: 16px; width: 16px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></button>
                            <div class="pos-absolute d-flex flex-column" style="/* width: 100%; */ max-width: 300px; top: 100%; left: 50%; background: white; box-shadow: rgba(0,0,0,0.16) 0 0 10px 2px; padding: 10px; border-radius: 5px; z-index: 99999; max-height: calc(55vh + 100px)" v-if="sidebarViewOptionShow">
                                <div class="d-flex w-100">
                                    <div class="search-form pd-b-10 bd-b mg-b-10 w-100">
                                        <input type="search" class="form-control" placeholder="Search" @keyup="filterOptionResults" v-model="searchSidebarViewOptions">
                                        <button class="btn" type="button" @click="filterOptionResults">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="optionContainer" style="max-height: 55vh; overflow: auto; padding-right: 20px; max-width: 350px;">
                                    <div class="d-flex flex-column w-100" v-for="(list, labels) in sidebarViewOptionsListFiltered" :key="labels">
                                        <p class="tx-color-03 tx-14 mg-b-5 mg-y-15 tx-uppercase pd-x-5" v-if="list.length > 0">{{labels}}</p>
                                        <div 
                                            class="d-flex justify-content-between w-100"
                                            v-for="option in list"
                                            :key="option.id"
                                            @click="pinThisOption(labels, option)"
                                        >
                                            <div class="pd-5 mg-b-5 w-100 d-flex justify-content-between" v-if="(option.displayName && option.displayName.trim().length > 0) || (option.name && option.name.trim().length > 0)">
                                                <div class="tx-color-01 mg-r-15 mg-b-0 d-flex" style="width: calc(100% - 30px)">
                                                    <div class="tagIcon" v-if="labels == 'tags'">
                                                        <svg xmlns="http://www.w3.org/2000/svg" :style="'color:'+option.color" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag mg-r-5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                                                    </div>
                                                    <div class="tx-color-01 mg-r-10 mg-b-0 d-flex" v-if="labels == 'inboxes'">
                                                        <div class="inboxIcon" v-html="getInboxIcon(option.type)">
                                                        </div>
                                                    </div>
                                                    <p class="mg-b-0 w-100" style="white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis">{{labels == 'inboxes' ? option.displayName : option.name }}</p>
                                                </div>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark tx-color-03 bookmarkIcon" :class="{'isActive' : isItPinned(labels, option.id)}"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex w-100 bd-t mg-t-10 pd-t-10 justify-content-between">
                                    <button class="btn btn-outline-secondary btn-xs" @click="sidebarViewOptionShow = !sidebarViewOptionShow">Cancel</button>
                                    <button class="btn btn-primary btn-xs" @click="saveSidebarPins">Save</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
              <div
                  v-for="(option, index) in sectionValues"
                  :key="index"
              >
                <RouterLink
                    :to="{
                      name: 'type', 
                      params:{
                          type: sectionName == 'tags' ? option.id : option.type, 
                          mailboxId: sectionName == 'me' ? 'me' : sectionName == 'tags' ? 'tags' : option.id,
                        }
                    }"
                    @click.native = "doSomethingInteresting"
                >
                  <p
                      style="cursor: pointer"
                      id="mentions-label"
                      class="nav-link hw-label-badge mg-b-0"
                      :class="{'active' : getRouteParamType == option.type && getMailboxID == option.mailboxId}"
                  >
                      <span v-if="sectionName == 'tags'">
                          <svg xmlns="http://www.w3.org/2000/svg" :style="'color:'+option.color" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag mg-r-5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                      </span>
                      <span v-html="getInboxIcon(option.type)" v-else-if="sectionName == 'inboxes'"></span>
                      <span v-html="option.icon" v-else></span>
                      <span v-if="sectionName == 'inboxes'">{{option.displayName}}</span>
                      <span v-else>{{option.name}}</span>
                      <span class="badge text-primary hw-count" id="mentions-count">
                          {{mailbox.stats[option.stats] > 0 || (typeof mailbox.stats[option.stats]) === 'string' ? mailbox.stats[option.stats] == 0 ? '' : mailbox.stats[option.stats] : ''}}
                      </span>
                  </p>
                </RouterLink>
              </div> 
            </div>
          </nav>
        </div>
        <!-- <div class="dropdown-divider"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
import Compose from "./Compose.vue";
import Vue from 'vue';
export default {
  name:'SideBarHW',
  props: {
    mailbox: Object,
  },
  data() {
    return {
        more: false,
        sidebarViewOptionShow: false,
        searchSidebarViewOptions: "",
        inboxes: [],
        sidebarViewOptionsListFiltered: {
            "inboxes": [],
            "tags": [],
        },
        sidebarViewOptionsList: {
            "inboxes": [],
            "tags": [],
        },
        //   sections: ['mine', 'mentions', 'discussion', 'all', 'assigned','unassigned','starred','snoozed','drafts']
        sections: {
          "me": {
              0: {
                  name: 'Mine',
                  type: 'mine',
                  stats: 'mine',
                  mailboxId: "me",
                  icon: `
                      <svg style="stroke-width: 25px" version="1.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492" xml:space="preserve">
                          <g id="Master_Layer_2"></g>
                          <g id="Layer_1">
                              <polygon
                                  points="126,385 149,415 185,446 231.8,468 295,468 338,454 367.4,431 384,400 396,363 396,281 396,176 396,124 372,105.6 348.3,112.2 335.2,110.8 335.9,72.2 315.6,53.8 283.4,60.4 274.3,63.6 270.3,34.1 246,21.7 220.5,29.7 212,63.6 214.6,85.9 199.5,61 172.6,59.1 153.6,74.1 151,299 109.7,239.4 88.7,240 69.5,254.4 65.8,279.4">
                              </polygon>
                          <g>
                              <polygon
                              points="367.4,99.5 367.4,99.5 367.4,99.5 		"
                              ></polygon>
                              <path
                                  d="M62.2,287c0.3,0.6,0.5,1.1,0.8,1.5c0.1,0.2,0.2,0.4,0.3,0.5l0,0l0,0l0,0l67.7,117.2c0.3,0.6,0.7,1.2,1.2,1.8l5.4-4.8
                                  l-5.4,4.8c29.9,33.9,64.2,55,98,64.5c29.4,8.2,58.5,7.6,84.3-1c26-8.7,48.6-25.4,64.8-49.5c15.9-23.5,25.6-54.1,26.3-90.8
                                  c0-0.3,0-0.5,0-0.8V137.6c0-10.5-4.3-20-11.2-26.9c-6.9-6.9-16.4-11.2-26.9-11.2c-8.9,0-17.1,3.1-23.6,8.3V83.4
                                  c0-10.5-4.3-20-11.2-26.9c-6.9-6.9-16.4-11.2-26.9-11.2c-8.9,0-17.1,3.1-23.6,8.3v-0.2c0-10.5-4.3-20-11.2-26.9
                                  c-6.9-6.9-16.4-11.2-26.9-11.2c-10.5,0-20,4.3-26.9,11.2c-6.9,6.9-11.2,16.4-11.2,26.9v4.4c-6.5-5.2-14.7-8.3-23.6-8.3
                                  c-10.5,0-20,4.3-26.9,11.2c-6.9,6.9-11.2,16.4-11.2,26.9v136h0l0,53.1l-14.7-25.4c-0.1-0.1-0.1-0.3-0.2-0.4l0,0l0,0l0,0
                                  c-5.4-9.3-13.4-15.2-22.5-17.6c-9.1-2.4-19.2-1.4-28.5,3.1c-0.2,0.1-0.5,0.2-0.7,0.3l0,0c-0.4,0.2-1,0.5-1.8,1
                                  c-8.5,4.9-14.1,13-16.5,22C57,268.6,57.9,278.4,62.2,287z M69.5,285.4l6.3-3.6c-0.1-0.1-0.2-0.3-0.2-0.4c-0.2-0.4-0.4-0.6-0.5-0.9
                                  c-2.7-5.4-3.2-11.6-1.8-17.2c1.4-5.4,4.7-10.2,9.7-13.1c0.1-0.1,0.5-0.2,1.1-0.5l-3.2-6.5l3.2,6.5c0.2-0.1,0.4-0.2,0.5-0.3
                                  c6.2-2.9,12.7-3.7,18.5-2.1c5.5,1.5,10.4,5.1,13.7,10.8l6.2-3.6l-6.3,3.6c0.1,0.1,0.2,0.3,0.3,0.4l28.1,48.7l0,0
                                  c2,3.5,6.4,4.6,9.9,2.6c2.5-1.5,3.8-4.2,3.6-6.9l0-79.4h0v-136c0-6.5,2.7-12.4,7-16.7c4.3-4.3,10.2-7,16.7-7
                                  c6.5,0,12.4,2.7,16.7,7c4.3,4.3,7,10.2,7,16.7v136h14.5v-136V53.3c0-6.5,2.7-12.4,7-16.7c4.3-4.3,10.2-7,16.7-7
                                  c6.5,0,12.4,2.7,16.7,7c4.3,4.3,7,10.2,7,16.7v30v140.2H282V83.4c0-6.5,2.7-12.4,7-16.7c4.3-4.3,10.2-7,16.7-7
                                  c6.5,0,12.4,2.7,16.7,7c4.3,4.3,7,10.2,7,16.7v54.2v86h14.5v-86c0-6.5,2.7-12.4,7-16.7c4.3-4.3,10.2-7,16.7-7
                                  c6.5,0,12.4,2.7,16.7,7c4.3,4.3,7,10.2,7,16.7v192.8c0,0.2,0,0.3,0,0.5c-0.6,33.7-9.4,61.6-23.8,83
                                  c-14.4,21.3-34.4,36.2-57.4,43.9c-23.1,7.7-49.3,8.2-75.9,0.8c-31.1-8.7-62.7-28.2-90.6-59.6L75.7,281.8L69.5,285.4z"
                              ></path>
                          </g>
                          </g>
                      </svg>
                  `
              },
              1: {
                  name: 'Mentions',
                  type: 'mentions',
                  stats: 'mentions',
                  mailboxId: "me",
                  icon: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign">
                          <circle cx="12" cy="12" r="4"></circle>
                          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                      </svg>
                  `
              },
              2: {
                  name: 'Starred',
                  type: 'starred',
                  stats: 'starred',
                  mailboxId: "me",
                  icon: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                          <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                          ></polygon>
                      </svg>
                  `
              },
              3: {
                  name: 'All',
                  type: 'all',
                  stats: 'inbox',
                  mailboxId: "me",
                  icon: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-inbox">
                          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                          <path
                          d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                          ></path>
                      </svg>
                  `
              },
          },
          "inboxes": {},
          "tags": {},
        },
        activeInboxes: {},
        activeTags: {},
      // compose: {}
    }
  },
    async beforeMount() {
        console.log("this.mailbox",this.mailbox);
        await this.getInboxes();

        await this.getUserSidebarPins();

        this.sidebarViewOptionsList = {
            inboxes: this.inboxes,
            tags: this.tags,
        }
        this.sidebarViewOptionsListFiltered = this.sidebarViewOptionsList;
  },
  computed: {
    tags() {
      return this.$store.state.tags
    },
    getMailboxID(){
      return this.$store.state.inboxData.id
    },
    getRouteParamType(){
      return this.$store.state.type
    }
  },
  methods: {
    expandMore() {
      this.more = !this.more;
    },
    doSomethingInteresting(){
        console.error("----------");
    },
    openCompose(type) {
      console.log("open");
      let hash = Date.now() + "-" + Math.floor(Math.random() * 100000000000);
      bus.$emit("openCompose", hash, type);
    },
    async getInboxes(){
        const response = await fetch(this.$apiBaseURL + "mailboxes.php", {credentials: 'include'});
        const data = await response.json();
        console.log(data);
        this.inboxes = data.data.mailboxes; 
    },
    async getUserSidebarPins(){
        let response = await fetch(this.$apiBaseURL + "getUserSidebarPins.php", {credentials: 'include'});
        response = await response.json();
        console.log("response dhikhana",response.data);
        if(response.status == "success"){
            let sidebarPins = response.data;
            let pinInboxes = sidebarPins.inboxes;
            let pinTags = sidebarPins.tags;

            for(let i = 0; i < this.inboxes.length; i++){
                let inbox = this.inboxes[i];
                if(pinInboxes.includes(inbox.id + "")){
                    this.activeInboxes[inbox.id] = inbox;
                    this.sections["inboxes"][inbox.id] = inbox;
                }
            }

            let tags = this.tags;
            
            for(let i = 0; i < tags.length; i++){
                let tag = tags[i];
                if(pinTags.includes(tag.id + "")){
                    this.activeTags[tag.id] = tag;
                    this.sections["tags"][tag.id] = tag;
                }
            }

            console.log(this.activeInboxes);
            console.log(this.activeTags);

            this.activeInboxes = this.activeInboxes;
            this.activeTags = this.activeTags;

            this.sections["inboxes"] = this.sections.inboxes;
            this.sections["tags"] = this.sections.tags;

            this.sections = {...this.sections};

        }
        
    },
    filterOptionResults(){
        //  This is somethi
        if(this.searchSidebarViewOptions.trim().length > 0){
            let filteredTags = this.tags.filter(tag => {
                return tag.name.toLowerCase().includes(this.searchSidebarViewOptions.toLowerCase())
            });
            let filteredInboxes = this.inboxes.filter(inbox => {
                return inbox.displayName.toLowerCase().includes(this.searchSidebarViewOptions.toLowerCase())
            });
            this.sidebarViewOptionsListFiltered = {
                "inboxes" : filteredInboxes,
                "tags" : filteredTags,
            }
        } else {
            this.sidebarViewOptionsListFiltered = this.sidebarViewOptionsList;
        }

    },
    getInboxIcon(type){
        let icon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                </path>
                <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
        `;
        if(type == "mail"){
            icon = `
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                    </path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            `; 
        } else if (type == "sms"){
            icon = `
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
                    </path>
                </svg>
            `; 
        } else if (type == "chat"){
            icon = `
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            `; 
        } else if (type == "twitter"){
            icon = `
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            `; 
        } else if (type == "facebook"){
            icon = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            `; 
        } else if (type == "instagram"){
            icon = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            `; 
        } else if (type == "whatsapp"){
            icon = `
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="whatsapp" class="svg-inline--fa fa-whatsapp fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            `;
        }

        return icon;
    },
    pinThisOption(labels, option){

        if(this.sections[labels][option.id]){
            delete this.sections[labels][option.id];
        } else {
            this.sections[labels][option.id] = option;
        }

        this.sections["inboxes"] = this.sections.inboxes;
        this.sections["tags"] = this.sections.tags;

        // this.sections[labels].push(option);

        if(labels == "inboxes"){
            if(this.activeInboxes[option.id]){
                delete this.activeInboxes[option.id];
            } else {
                this.activeInboxes[option.id] = option;
            }
            this.activeInboxes = {...this.activeInboxes};
        }
        
        if(labels == "tags"){
            if(this.activeTags[option.id]){
                delete this.activeTags[option.id];
            } else {
                this.activeTags[option.id] = option;
            }
            this.activeTags = {...this.activeTags};
        }
    },
    isItPinned(label, id){
        // if(this.sections[label][id]){
        //     return true;
        // } else {
        //     return false;
        // }

        if(label == "inboxes"){
            return this.activeInboxes[id];
        }
        
        if(label == "tags"){
            return this.activeTags[id];
        }
    },
    async saveSidebarPins(){
        this.sidebarViewOptionShow = false;
        let pins = {
            inboxes: Object.keys(this.activeInboxes),
            tags: Object.keys(this.activeTags)
        };

        let response = await fetch("https://app.helpwise.io/api/setUserSidebarPins.php", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                pins
            })
        });

        response = await response.json();

        if(response.status == "success"){
            this.$toast.success("Settings saved successfully");
        }
    }
  }
};


// :to="{
//                       name: 'type', 
//                       params:{
//                           type: sectionName == 'tags' ? option.id : option.type, 
//                           mailboxId: sectionName == 'me' ? 'me' : sectionName == 'tags' ? 'tags' : option.id,
//                         }
//                     }"
</script>

<style>

    .inboxIcon svg{
        height: 15px;
        width: 15px;
    }

    .bookmarkIcon.isActive{
        stroke: green;
        fill: green;
    }

    .sidebarViewOptionButton{
        /* transform: rotateZ(0deg);
        transition: transform 250ms ease; */
    }

    .sidebarViewOptionButton.open{
        /* transform: rotateZ(45deg); */
    }

</style>