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
                <a
                  href="https://app.helpwise.io/inbox/me/mine"
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
              <li class="nav-sub-item" v-for="mailbox in mailboxes" :key="mailbox.id" @click="hideNavSub">
                <router-link :to="{ name: 'mailbox', params: {mailboxId: mailbox.id}}">
                <a
                  :id="'mailbox-'+mailbox.id"
                  style="text-decoration: none; color: black"
                  class="nav-sub-link flex-column align-items-start p-1"
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
                          <svg
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
                            :class="[mailbox.type == 'mail' && 'feather feather-mail',mailbox.type == 'sms' && 'feather feather-message-circle',mailbox.type == 'chat' && 'feather feather-message-square',mailbox.type == 'instagram-dm' && 'feather feather-mail',mailbox.type == 'facebook' && 'feather feather-facebook',mailbox.type == 'fb-feed' && 'feather feather-facebook']"
                          >
                            <path
                              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            ></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </div>
                        {{mailbox.displayName}}
                      </div>
                      <div class="mg-l-20">{{mailbox.externalAddress}}</div>
                    </div>
                  </div>
                </a>
                </router-link>
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
          <span id="unread-notifications-count" style="">4</span>
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
            <a href="/mail/214204/all/13469895" class="dropdown-item">
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
                      >Gmail Inbox</span
                    >
                    <div class="text-truncate tx-bold">@Tushar test again</div>
                  </div>
                  <p
                    class="tx-12 tx-color-03"
                    style="
                      whitespace: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    Tushar added a note on conversation assigned to your team
                    member
                  </p>
                  <span>Aug 5 01:41am</span>
                </div>
                <!-- media-body -->
              </div>
              <!-- media --> </a
            ><a href="/mail/214204/all/13469895" class="dropdown-item">
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
                      >Gmail Inbox</span
                    >
                    <div class="text-truncate tx-bold">@Tushar test</div>
                  </div>
                  <p
                    class="tx-12 tx-color-03"
                    style="
                      whitespace: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    Tushar added a note on conversation assigned to your team
                    member
                  </p>
                  <span>Aug 5 01:39am</span>
                </div>
                <!-- media-body -->
              </div>
              <!-- media --> </a
            ><a href="/mail/204420/all/12074902" class="dropdown-item">
              <div class="media">
                <div class="media-body" style="max-width: 100%">
                  <div class="justify-content-between">
                    <span
                      style="
                        background-color: hsl(-272, 32%, 64%);
                        color: white;
                        margin-left: 0.125rem;
                        margin-right: 0.125rem;
                        font-size: 9px;
                      "
                      class="badge badge-pill"
                      >Helpwise Support</span
                    >
                    <div class="text-truncate tx-bold">
                      Your Wednesday update - saaslabs.co
                    </div>
                  </div>
                  <p
                    class="tx-12 tx-color-03"
                    style="
                      whitespace: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    unsnoozed a conversation.
                  </p>
                  <span>Jul 31 05:00am</span>
                </div>
                <!-- media-body -->
              </div>
              <!-- media --> </a
            ><a href="/mail/204420/all/12074902" class="dropdown-item">
              <div class="media">
                <div class="media-body" style="max-width: 100%">
                  <div class="justify-content-between">
                    <span
                      style="
                        background-color: hsl(-272, 32%, 64%);
                        color: white;
                        margin-left: 0.125rem;
                        margin-right: 0.125rem;
                        font-size: 9px;
                      "
                      class="badge badge-pill"
                      >Helpwise Support</span
                    >
                    <div class="text-truncate tx-bold">
                      Your Wednesday update - saaslabs.co
                    </div>
                  </div>
                  <p
                    class="tx-12 tx-color-03"
                    style="
                      whitespace: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    Harit snoozed a conversation.
                  </p>
                  <span>Jul 31 02:01am</span>
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
            <span> {{userInfo.firstname}} {{userInfo.lastname}} </span>
          </h6>
          <p class="mg-b-25 tx-12 tx-color-03">{{userInfo.role}}</p>

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
  name: 'NavBar',
  props: {
    mailboxes:Array
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    hideNavSub() {
      this.show = false;
    }
  }
};
</script>

<style>
</style>