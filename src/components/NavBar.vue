<template>
  <header class="navbar navbar-header navbar-header-fixed">
    <a href="" id="mainMenuOpen" class="burger-menu d-none d-md-flex d-lg-none"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-menu"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line></svg
    ></a>
    <a href="" id="mailSidebar" class="burger-menu d-md-none"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-arrow-left"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline></svg
    ></a>
    <div class="navbar-brand">
      <a href="https://app.helpwise.io"
        ><span
          ><img
            style="width: 150px"
            src="https://cdn.helpwise.io/assets/images/hw-logo.png"
          />&nbsp;</span
        ></a
      >
    </div>
    <!-- navbar-brand -->
    <div id="navbarMenu" class="navbar-menu-wrapper">
      <div class="navbar-menu-header">
        <a id="mainMenuClose" href=""
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line></svg
        ></a>
      </div>
      <!-- navbar-menu-header -->
      <ul class="nav navbar-menu" style="max-width: 100% !important">
        <li class="nav-item with-sub" :class="show ? 'show' : ''">
          <a href="JavaScript:void(0)" class="nav-link">Inboxes</a>
          <ul class="navbar-menu-sub" style="padding-bottom: 0px">
            <div
              id="mailbox-list"
              style="padding-bottom: 7px; max-height: 400px; overflow-y: auto"
            >
              <li class="nav-sub-item">
                <router-link
                  :to="{ name: 'mailbox', params: { mailboxId: 'me' } }"
                >
                  <a
                    class="
                      nav-sub-link
                      flex-column
                      align-items-start
                      justify-content
                      p-1
                      justify-content-start
                    "
                    ><div class="" style="font-weight: 550">
                      Unified Inbox
                      <span
                        style="background-color: #56d4f4; font-size: 8px"
                        class="badge badge-pill text-white bg-primary"
                        >BETA</span
                      >
                    </div></a
                  >
                </router-link>
              </li>
              <li class="nav-sub-item">
                <a
                  href="https://app.helpwise.io/zenbox"
                  class="nav-sub-link flex-column align-items-start p-1"
                  ><div class="" style="font-weight: 550">Zenbox</div>
                  <div class="">All in one Inbox</div></a
                >
              </li>
              <div class="dropdown-divider mg-y-5" style="margin: 0px"></div>
              <li
                class="nav-sub-item"
                v-for="mailbox in mailboxes"
                :key="mailbox.id"
                @click="hideNavSub"
              >
                <!-- <router-link
                  :to="{ name: 'mailbox', params: { mailboxId: mailbox.id } }"
                > -->
                <a
                  :id="'mailbox-' + mailbox.id"
                  style="text-decoration: none; color: black"
                  class="nav-sub-link flex-column align-items-start p-1"
                  :href="`https://app.helpwise.io/${mailbox.type}/${mailbox.id}/mine`"
                  target="_blank"
                >
                  <div
                    class="
                      d-flex
                      hover_change
                      align-items-center
                      justify-content-between
                      w-100
                    "
                  >
                    <div>
                      <div class="d-flex mg-2" style="font-weight: 550">
                        <div
                          class="mg-t-3 inbox-list-svg"
                          style="color: #566476"
                        >
                          <!-- <svg
                              style="margin-right: 5px"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              :class="[
                                mailbox.type == 'mail' &&
                                  'feather feather-mail',
                                mailbox.type == 'sms' &&
                                  'feather feather-message-circle',
                                mailbox.type == 'chat' &&
                                  'feather feather-message-square',
                                mailbox.type == 'instagram-dm' &&
                                  'feather feather-mail',
                                mailbox.type == 'facebook' &&
                                  'feather feather-facebook',
                                mailbox.type == 'fb-feed' &&
                                  'feather feather-facebook',
                              ]"
                            >
                              <path
                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                              ></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg> -->
                          <svg
                            style="
                              width: 13px !important;
                              height: 13px !important;
                              margin-left: calc(30% - 6px) !important;
                              margin-right: 5px;
                              stroke: #566476;
                              color: #566476;
                              stroke-width: 2;
                            "
                            v-if="
                              mailbox.type == 'mail' || mailbox.type == 'custom'
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0168fa"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-mail"
                          >
                            <path
                              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            ></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                          <svg
                            style="
                              width: 13px !important;
                              height: 13px !important;
                              margin-left: calc(30% - 6px) !important;
                              margin-right: 5px;
                              stroke: #566476;
                              color: #566476;
                              stroke-width: 2;
                            "
                            v-else-if="mailbox.type == 'sms'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#8a2be2"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-message-circle"
                          >
                            <path
                              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                            ></path>
                          </svg>
                          <svg
                            style="
                              width: 13px !important;
                              height: 13px !important;
                              margin-left: calc(30% - 6px) !important;
                              margin-right: 5px;
                              stroke: #566476;
                              color: #566476;
                              stroke-width: 2;
                            "
                            v-else-if="mailbox.type == 'chat'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#347bfb"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-message-square"
                          >
                            <path
                              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                            ></path>
                          </svg>
                          <svg
                            style="
                              width: 13px !important;
                              height: 13px !important;
                              margin-left: calc(30% - 6px) !important;
                              margin-right: 5px;
                              stroke: #566476;
                              color: #566476;
                              stroke-width: 2;
                            "
                            v-else-if="
                              mailbox.type == 'twitter' ||
                              mailbox.type == 'twitterdm'
                            "
                            class="customInboxIconSvg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                            ></path>
                          </svg>
                          <svg
                            v-else-if="mailbox.type == 'whatsapp'"
                            style="width: 13px !important;
                              height: 13px !important;
                              margin-left: calc(30% - 6px) !important;
                              margin-right: 5px;
                              stroke: #566476;
                              color: #566476;
                              stroke-width: 2;"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="#566476"
                          >
                            <path
                              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                            ></path>
                          </svg>
                          <svg
                            style="
                              width: 13px !important;
                              height: 13px !important;
                              margin-left: calc(30% - 6px) !important;
                              margin-right: 5px;
                              stroke: #566476;
                              color: #566476;
                              stroke-width: 2;
                            "
                            v-else-if="
                              mailbox.type == 'fb-feed' ||
                              mailbox.type == 'facebook'
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-facebook"
                          >
                            <path
                              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                            ></path>
                          </svg>
                          <i
                            style="
                              width: 13px !important;
                              height: 13px !important;
                              margin-left: calc(30% - 6px) !important;
                              margin-right: 5px;
                              stroke: #566476;
                              color: #566476;
                              stroke-width: 2;
                            "
                            v-else-if="
                              mailbox.type == 'instagram' ||
                              mailbox.type == 'instagram-dm'
                            "
                            class="mg-r-5 fab fa-instagram"
                          ></i>
                        </div>
                        {{ mailbox.displayName }}
                      </div>
                      <div class="mg-l-20">{{ mailbox.externalAddress }}</div>
                    </div>
                  </div>
                </a>
                <!-- </router-link> -->
              </li>
            </div>
            <div class="dropdown-divider" style="margin: 0px"></div>
            <li class="nav-sub-item pd-t-7 pd-b-12" style="padding-left: 3px">
              <a
                class="nav-sub-link"
                id="createInboxLink"
                href="https://app.helpwise.io/create-inbox"
                style="font-weight: 550; font-size: 14px"
                ><!-- <i data-feather="plus"></i> -->+Add Inbox</a
              >
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="/settings/engage" class="nav-link">Engage </a>
        </li>
        <li class="nav-item">
          <a href="/files" class="nav-link"
            >File Manager
            <!-- <span style="background-color:#007BFF;color:white;margin-left:5px;font-size:8px" class="badge badge-pill bg-primary text-white">NEW</span> -->
          </a>
        </li>

        <li class="nav-item with-sub">
          <a href="JavaScript:void(0)" class="nav-link">Manage</a>
          <ul class="navbar-menu-sub">
            <li class="nav-sub-item">
              <a
                href="https://app.helpwise.io/settings/users"
                class="nav-sub-link"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle></svg
                >Users</a
              >
            </li>
            <li class="nav-sub-item">
              <a
                href="https://app.helpwise.io/settings/inboxes"
                class="nav-sub-link"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-inbox"
                >
                  <polyline
                    points="22 12 16 12 14 15 10 15 8 12 2 12"
                  ></polyline>
                  <path
                    d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                  ></path></svg
                >Inboxes</a
              >
            </li>
            <li class="nav-sub-item">
              <a
                href="https://app.helpwise.io/settings/tags"
                class="nav-sub-link"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-tag"
                >
                  <path
                    d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                  ></path>
                  <line x1="7" y1="7" x2="7" y2="7"></line></svg
                >Tags</a
              >
            </li>
            <li class="nav-sub-item">
              <a
                href="https://app.helpwise.io/settings/import"
                class="nav-sub-link"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-download-cloud"
                >
                  <polyline points="8 17 12 21 16 17"></polyline>
                  <line x1="12" y1="12" x2="12" y2="21"></line>
                  <path
                    d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"
                  ></path></svg
                >Import</a
              >
            </li>
            <li class="nav-sub-item">
              <a
                href="https://app.helpwise.io/settings/csat"
                class="nav-sub-link"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-bar-chart-2"
                  style="margin-left: 0"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line></svg
                >CSAT</a
              >
            </li>
          </ul>
        </li>
        <li class="nav-item with-sub">
          <a href="JavaScript:void(0)" class="nav-link">Automation</a>
          <ul class="navbar-menu-sub">
            <li class="nav-sub-item">
              <a
                href="https://app.helpwise.io/settings/replies"
                class="nav-sub-link"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-send"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg
                >Saved Replies</a
              >
            </li>
            <li class="nav-sub-item">
              <a
                href="https://app.helpwise.io/settings/integrations"
                class="nav-sub-link"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-codesandbox"
                >
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  ></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line></svg
                >Integrations</a
              >
            </li>
            <li class="nav-sub-item">
              <a href="/settings/api" class="nav-sub-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-key"
                >
                  <path
                    d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
                  ></path>
                </svg>
                API
              </a>
            </li>
            <!-- <li class="nav-sub-item">
                    <a href="/settings/engage" class="nav-sub-link">
                        <i class="far fa-paper-plane" style="margin-right: 15px;"></i>
                        Engage
                    </a>
                </li> -->
          </ul>
        </li>

        <li class="nav-item">
          <a href="https://app.helpwise.io/inbox/me/mine" class="nav-link">
            <div class="">
              Universal Inbox
              <span
                style="
                  /*! background-color:#56d4f4; */
                  color: white; /*! margin-left:5px; */
                  font-size: 8px;
                "
                class="badge badge-pill text-white bg-secondary"
                >BETA</span
              >
            </div>
          </a>
        </li>
        <li class="nav-item d-none">
          <a href="https://app.helpwise.io/inbox/me/mine" class="nav-link"> </a
          ><a href="/zenbox" class="nav-link">Zenbox</a>
        </li>
      </ul>
    </div>
    <!-- navbar-menu-wrapper -->
    <div class="navbar-right">
      <div class="dropdown dropdown-help">
        <a
          href=""
          class="dropdown-link new-indicator"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <!-- <a href="javaScript:void(0)" style="color:#1b2e4b" class="nav-icon nav-help nav-link"> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-help-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12" y2="17"></line>
          </svg>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="#" @click="openHelpwiseChat" class="dropdown-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-message-square"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            Chat with us
          </a>
          <a
            href="https://helpwise.io/support-call"
            target="_blank"
            class="dropdown-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-calendar"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Support call
          </a>
          <a
            href="https://docs.helpwise.io"
            target="_blank"
            class="dropdown-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-book-open"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Help Guides
          </a>
          <a
            href="https://helpwise.io/updates"
            target="_blank"
            class="dropdown-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-send"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Product Updates
          </a>
        </div>
      </div>

      <div class="dropdown dropdown-notification">
        <a
          href=""
          class="dropdown-link new-indicator"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-bell"
          >
            <path
              d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"
            ></path>
          </svg>
          <span
            v-if="notifData.unreadNotificationsCount > 0"
            id="unread-notifications-count"
            style=""
            >{{ notifData.unreadNotificationsCount }}</span
          >
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <!--                <div class="dropdown-header">Notifications</div>-->

          <div
            class="
              dropdown-header
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <span>Notifications</span>
            <a href="https://app.helpwise.io/notification-center"
              ><i
                class="fas fa-cog float-right"
                role="button"
                style="color: gray"
              ></i
            ></a>
          </div>

          <div
            id="notifications-list"
            style="max-height: 450px; overflow-y: auto"
          >
            <a
              v-for="(notif, index) in notifData.notifications"
              :key="index"
              :href="'/conversations/' + notif.threadID"
              class="dropdown-item"
            >
              <div class="media">
                <div class="media-body" style="max-width: 100%">
                  <div class="justify-content-between">
                    <span
                      style="
                        background-color: hsl(-100, 32%, 64%);
                        color: white;
                        margin-left: 0.125rem;
                        margin-right: 0.125rem;
                        font-size: 9px;
                      "
                      class="badge badge-pill"
                      >{{ $store.state.inboxes[notif.mailboxID].name }}</span
                    >
                    <div class="text-truncate tx-bold">{{ notif.text }}</div>
                  </div>
                  <p
                    class="tx-12 tx-color-03"
                    style="
                      whitespace: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ notif.title }}
                  </p>
                  <span>{{ notif.time | moment("MMM D, YYYY hh:mm a") }}</span>
                </div>
                <!-- media-body -->
              </div>
              <!-- media -->
            </a>
          </div>
          <div class="dropdown-footer d-none">
            <a href="https://app.helpwise.io/notifications"
              >View all Notifications</a
            >
          </div>
        </div>
        <!-- dropdown-menu -->
      </div>
      <!-- dropdown -->
      <div class="dropdown dropdown-profile">
        <a
          href=""
          class="dropdown-link"
          data-toggle="dropdown"
          data-display="static"
          aria-expanded="false"
        >
          <div v-html="userInfo.avatarTag" class="avatar avatar-sm">
            <!-- <span
              class="avatar-initial rounded-circle"
              style="background-color: hsl(125, 32%, 64%)"
              >MM</span
            > -->
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-right tx-13">
          <h6 class="tx-semibold mg-b-5 d-flex align-items-center">
            <span> {{ userInfo.firstname }} {{ userInfo.lastname }} </span>
          </h6>
          <p class="mg-b-25 tx-12 tx-color-03">{{ userInfo.role }}</p>

          <div onclick="event.stopPropagation();" style="cursor: pointer">
            <label
              class="switch"
              id="hw_user_availability_switch"
              style="margin-bottom: 0px"
            >
              <input
                type="checkbox"
                checked=""
                id="hw_user_availability"
                onclick="userAvailability()"
              />
              <span class="slider round"></span>
            </label>
            <label
              for="hw_user_availability"
              id="hw_user_availability_label"
              class="ml-2"
              >Available</label
            >
          </div>

          <a
            href="https://app.helpwise.io/settings/profile"
            class="dropdown-item"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
              ></path></svg
            >Account Settings</a
          >
          <a
            href="https://app.helpwise.io/notification-center"
            class="dropdown-item"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bell"
            >
              <path
                d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"
              ></path></svg
            >Notification Settings</a
          >

          <div class="dropdown-divider"></div>
          <a
            href="https://helpwise.io/logout"
            onclick="event.preventDefault();localStorage.clear();location.href='https://helpwise.io/logout'"
            class="dropdown-item"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line></svg
            >Sign Out</a
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    mailboxes: Array,
    notifData: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    hideNavSub() {
      this.show = false;
    },
    openHelpwiseChat() {
      console.log("------ OPEN HELPWISE CHAT ----");
      Helpwise("showWithoutIcon");
    },
  },
};
</script>

<style>
</style>