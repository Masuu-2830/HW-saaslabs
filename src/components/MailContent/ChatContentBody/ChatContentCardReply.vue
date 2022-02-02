<template>
  <div
    class="mail-body hw-reply hw_editor card shadow-sm mb-2 bg-white"
    id="reply-card"
    style="
      margin: 20px auto auto;
      max-width: 600px;
      padding-right: 1rem;
      border-radius: 10px;
      padding-left: 1rem;
    "
    :style="{display: item == null ? 'none' : ''}"
  >
    <div class="d-flex justify-content-between">
      <div
        class="d-flex justify-content-start flex-grow-1"
        style="padding: 10px; padding-left: 0rem"
      >
        <div class="dropdown d-none">
          <span
            class="dropdown-toggle bg-white text-secondary"
            style="font-size: 13px"
            data-toggle="dropdown d-none"
          >
            <i id="reply-type-icon" class="fas fa-reply"></i>
          </span>
          <div class="dropdown-menu d-none">
            <button
              class="dropdown-item text-secondary"
              style="font-size: 13px"
              id="reply-state-btn-reply"
            >
              <i class="fas fa-reply"></i> Reply
            </button>
            <button
              class="dropdown-item text-secondary"
              style="font-size: 13px"
              id="reply-state-btn-reply-all"
            >
              <i class="fas fa-reply-all"></i> Reply All
            </button>
            <button
              class="dropdown-item text-secondary"
              style="font-size: 13px"
              id="reply-state-btn-forward"
            >
              <i class="fas fa-share"></i> Forward
            </button>
          </div>
        </div>
        <div class="reply-email-addresses flex-grow-1 ml-2">
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
          >
            <span class="hw-addr-label d-none">From:&nbsp;</span>
            <div class="email-from-container d-none">
              <select
                class="email-from select2-hidden-accessible"
                data-select2-id="1"
                tabindex="-1"
                aria-hidden="true"
              >
                <option
                  value="twitter:haritdagar"
                  data-email="twitter:haritdagar"
                  data-name="harit"
                  data-is-default="true"
                  selected=""
                  data-select2-id="3"
                >
                  harit &lt;twitter:haritdagar&gt;
                </option></select
              ><span
                class="select2 select2-container select2-container--default"
                dir="ltr"
                data-select2-id="2"
                style="width: auto"
                ><span class="selection"
                  ><span
                    class="select2-selection select2-selection--single"
                    role="combobox"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabindex="0"
                    aria-labelledby="select2-o8xq-container"
                    ><span
                      class="select2-selection__rendered"
                      id="select2-o8xq-container"
                      role="textbox"
                      aria-readonly="true"
                      title="harit <twitter:haritdagar>"
                      >harit &lt;twitter:haritdagar&gt;</span
                    ><span class="select2-selection__arrow" role="presentation"
                      ><b role="presentation"></b></span></span></span
                ><span class="dropdown-wrapper" aria-hidden="true"></span
              ></span>
            </div>
            <span id="reply-email-from" class="d-none">twitter:haritdagar</span>
          </div>
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
          >
            <span class="hw-addr-label d-none">To&nbsp;</span>
            <div id="reply-email-to" class="w-100 d-none">
              <div class="bootstrap-tagsinput">
                <span
                  class="
                    tag
                    m-1
                    tag-danger
                    rounded
                    tx-12
                    hw_emailEditorTag hw_val-eyJlbWFpbCI6IjAiLCJuYW1lIjoibiJ9
                  "
                  draggable="true"
                  >n (0)<span data-role="remove"></span
                ></span>
                <span
                  class="
                    tag
                    m-1
                    tag-danger
                    rounded
                    tx-12
                    hw_emailEditorTag hw_val-eyJlbWFpbCI6IjEiLCJuYW1lIjoibyJ9
                  "
                  draggable="true"
                  >o (1)<span data-role="remove"></span
                ></span>
                <span
                  class="twitter-typeahead"
                  style="position: relative; display: inline-block"
                  ><input
                    type="text"
                    class="tt-hint"
                    readonly=""
                    autocomplete="off"
                    spellcheck="false"
                    tabindex="-1"
                    dir="ltr"
                    style="
                      position: absolute;
                      top: 0px;
                      left: 0px;
                      border-color: transparent;
                      box-shadow: none;
                      opacity: 1;
                      background: none 0% 0% / auto repeat scroll padding-box
                        border-box rgba(0, 0, 0, 0);
                    " /><input
                    type="text"
                    placeholder=""
                    class="tt-input"
                    autocomplete="off"
                    spellcheck="false"
                    dir="auto"
                    style="
                      position: relative;
                      vertical-align: top;
                      background-color: transparent;
                    " />
                  <pre
                    aria-hidden="true"
                    style="
                      position: absolute;
                      visibility: hidden;
                      white-space: pre;
                      font-family: sans-serif;
                      font-size: 13px;
                      font-style: normal;
                      font-variant: normal;
                      font-weight: 400;
                      word-spacing: 0px;
                      letter-spacing: 0px;
                      text-indent: 0px;
                      text-rendering: auto;
                      text-transform: none;
                    "
                  ></pre>
                  <div
                    class="tt-menu"
                    style="
                      position: absolute;
                      top: 100%;
                      left: 0px;
                      z-index: 100;
                      display: none;
                    "
                  >
                    <div class="tt-dataset tt-dataset-contacts"></div></div
                ></span>
              </div>
              <input type="text" class="form-control" style="display: none" />
            </div>
          </div>
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
            style="display: none !important"
          >
            <span class="hw-addr-label d-none">Cc&nbsp;</span>
            <div id="reply-email-cc" class="w-100 d-none">
              <div class="bootstrap-tagsinput">
                <span
                  class="twitter-typeahead"
                  style="position: relative; display: inline-block"
                  ><input
                    type="text"
                    class="tt-hint"
                    readonly=""
                    autocomplete="off"
                    spellcheck="false"
                    tabindex="-1"
                    dir="ltr"
                    style="
                      position: absolute;
                      top: 0px;
                      left: 0px;
                      border-color: transparent;
                      box-shadow: none;
                      opacity: 1;
                      background: none 0% 0% / auto repeat scroll padding-box
                        border-box rgba(0, 0, 0, 0);
                    " /><input
                    type="text"
                    placeholder=""
                    class="tt-input"
                    autocomplete="off"
                    spellcheck="false"
                    dir="auto"
                    style="
                      position: relative;
                      vertical-align: top;
                      background-color: transparent;
                    " />
                  <pre
                    aria-hidden="true"
                    style="
                      position: absolute;
                      visibility: hidden;
                      white-space: pre;
                      font-family: sans-serif;
                      font-size: 13px;
                      font-style: normal;
                      font-variant: normal;
                      font-weight: 400;
                      word-spacing: 0px;
                      letter-spacing: 0px;
                      text-indent: 0px;
                      text-rendering: auto;
                      text-transform: none;
                    "
                  ></pre>
                  <div
                    class="tt-menu"
                    style="
                      position: absolute;
                      top: 100%;
                      left: 0px;
                      z-index: 100;
                      display: none;
                    "
                  >
                    <div class="tt-dataset tt-dataset-contacts"></div></div
                ></span>
              </div>
              <input type="text" class="form-control" style="display: none" />
            </div>
          </div>
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
            style="display: none !important"
          >
            <span class="hw-addr-label d-none">Bcc&nbsp;</span>
            <div id="reply-email-bcc" class="w-100 d-none">
              <div class="bootstrap-tagsinput">
                <span
                  class="twitter-typeahead"
                  style="position: relative; display: inline-block"
                  ><input
                    type="text"
                    class="tt-hint"
                    readonly=""
                    autocomplete="off"
                    spellcheck="false"
                    tabindex="-1"
                    dir="ltr"
                    style="
                      position: absolute;
                      top: 0px;
                      left: 0px;
                      border-color: transparent;
                      box-shadow: none;
                      opacity: 1;
                      background: none 0% 0% / auto repeat scroll padding-box
                        border-box rgba(0, 0, 0, 0);
                    " /><input
                    type="text"
                    placeholder=""
                    class="tt-input"
                    autocomplete="off"
                    spellcheck="false"
                    dir="auto"
                    style="
                      position: relative;
                      vertical-align: top;
                      background-color: transparent;
                    " />
                  <pre
                    aria-hidden="true"
                    style="
                      position: absolute;
                      visibility: hidden;
                      white-space: pre;
                      font-family: sans-serif;
                      font-size: 13px;
                      font-style: normal;
                      font-variant: normal;
                      font-weight: 400;
                      word-spacing: 0px;
                      letter-spacing: 0px;
                      text-indent: 0px;
                      text-rendering: auto;
                      text-transform: none;
                    "
                  ></pre>
                  <div
                    class="tt-menu"
                    style="
                      position: absolute;
                      top: 100%;
                      left: 0px;
                      z-index: 100;
                      display: none;
                    "
                  >
                    <div class="tt-dataset tt-dataset-contacts"></div></div
                ></span>
              </div>
              <input type="text" class="form-control" style="display: none" />
            </div>
          </div>
          <div
            class="
              mg-b-0
              tx-13 tx-color-03
              d-flex
              flex-row
              justify-content-start
              align-items-center
            "
          >
            <span class="hw-addr-label d-none"> Subject&nbsp;</span>
            <span class="tx-color-01 flex-grow-1 d-none"
              ><input
                type="text"
                id="reply-email-subject"
                class="form-control-plaintext p-0 d-none"
                value=""
                style="outline: none"
            /></span>
          </div>
        </div>
        <div
          class="email-time-seen d-flex flex-column align-items-center"
        ></div>
      </div>
      <div
        class="d-flex justify-content-start align-items-start p-2"
        style="padding-right: 0rem !important"
      >
        <button
          id="reply-show-cc"
          tabindex="-1"
          class="btn btn-link p-1 d-none"
        >
          Cc
        </button>
        <button
          id="reply-show-bcc"
          tabindex="-1"
          class="btn btn-link p-1 d-none"
        >
          Bcc
        </button>
      </div>
    </div>
    <!-- <hr style="margin-top:15px;"> -->
    <div class="row">
      <div class="col-1 hw-avat" id="hw-avatar">
        <div class="avatar avatar mr-2" v-html="item.data.user">
          <!-- <span
            class="avatar-initial rounded-circle"
            style="background-color: hsl(125, 32%, 64%)"
            >MM</span
          > -->
        </div>
      </div>
      <div class="col-11" style="padding-left: 4px">
        <div class="reply-editor-wrapper" style="margin-top: 0px">
          <div
            id="reply-email-editor"
            class="ht-150 mg-t-15 hw_summernote"
            style="display: none"
          ></div>
          <!-- <div class="note-editor note-frame card">
            <div class="note-dropzone">
              <div class="note-dropzone-message"></div>
            </div>
            <div
              class="note-toolbar card-header"
              role="toolbar"
              style="display: none"
            ></div>
            <div class="note-editing-area">
              <div class="note-handle">
                <div class="note-control-selection" style="display: none">
                  <div class="note-control-selection-bg"></div>
                  <div class="note-control-holder note-control-nw"></div>
                  <div class="note-control-holder note-control-ne"></div>
                  <div class="note-control-holder note-control-sw"></div>
                  <div class="note-control-sizing note-control-se"></div>
                  <div class="note-control-selection-info"></div>
                </div>
              </div>
              <textarea
                class="note-codable"
                role="textbox"
                aria-multiline="true"
              ></textarea>
              <div
                class="note-editable card-block"
                contenteditable="true"
                role="textbox"
                aria-multiline="true"
                spellcheck="true"
                style="min-height: 100px"
              >
                @haritdagar&nbsp;
              </div>
            </div>
            <output class="note-status-output" aria-live="polite"></output>
            <div class="note-statusbar" role="status">
              <output class="note-status-output" aria-live="polite"></output>
              <div
                class="note-resizebar"
                role="seperator"
                aria-orientation="horizontal"
                aria-label="Resize"
              >
                <div class="note-icon-bar"></div>
                <div class="note-icon-bar"></div>
                <div class="note-icon-bar"></div>
              </div>
            </div>
          </div> -->
          <froala
                  :tag="'textarea'"
                  :config="config"
                  v-model="mail_body"
                  name="mail_body"
                ></froala>
          <div id="reply-attachment-list" class="d-flex flex-wrap"></div>
        </div>
      </div>
    </div>
    <div
      class="card-footer d-flex"
      style="padding-left: 0rem; padding-right: 0rem"
    >
      <div
        class="d-sm-flex align-items-center justify-content-between"
        style="width: 100%"
      >
        <div
          id="reply-email-editor-toolbar-container"
          class="
            bd-0-f
            pd-0-f
            flex-box
            hw-editor-toolbar
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <div class="btn-group" style="margin-right: 10px" role="group">
            <button
              type="button"
              id="reply-send-mail-btn"
              class="btn btn-primary"
              style="
                background-color: rgb(29, 161, 242);
                border-color: rgb(29, 161, 242);
              "
            >
              Send
            </button>
          </div>
          <!-- <button onclick="$('#reply-multiFiles').click()" class="p-2 tx-color-03" data-toggle="tooltip"
                                    title="Insert Attachment">
                                    <i class="tx-color-03 fas fa-paperclip"></i>
                                </button> -->
          <button
            data-toggle="tooltip"
            title="Insert Attachment"
            data-placement="bottom"
          >
            <svg
              onclick="$('#reply-multiFiles').click()"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather tx-color-03 feather-paperclip"
            >
              <path
                d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
              ></path>
            </svg>
          </button>
          <!-- <button
                                    onclick="$(this).toggleClass('text-primary');$('#reply-email-editor').summernote('bold');"
                                    class="p-2" data-toggle="tooltip" title="Bold">
                                    <i class="fas fa-bold"></i>
                                </button>
                                <button
                                    onclick="$(this).toggleClass('text-primary');$('#reply-email-editor').summernote('underline');"
                                    class="p-2" data-toggle="tooltip" title="Underline">
                                    <i class="fas fa-underline"></i>
                                </button>
                                <button
                                    onclick="$(this).toggleClass('text-primary');$('#reply-email-editor').summernote('italic');"
                                    class="p-2" data-toggle="tooltip" title="Italic">
                                    <i class="fas fa-italic"></i>
                                </button>
                                <button onclick="$('#reply-email-editor').summernote('linkDialog.show')" class="p-2"
                                    data-toggle="tooltip" title="Insert Link">
                                    <i class="fas fa-link"></i>
                                </button>
                                <button onclick="$('#reply-email-editor').summernote('imageDialog.show')" class="p-2"
                                    data-toggle="tooltip" title="Insert Image">
                                    <i class="fas fa-image"></i>
                                </button>
                                <button onclick="$('#reply-multiFiles').click()" class="p-2" data-toggle="tooltip"
                                    title="Insert Attachment">
                                    <i class="fas fa-paperclip"></i>
                                </button>
                                <button class="p-2 dropboxChooser" data-is-reply="true" data-toggle="tooltip"
                                    title="Attach from Dropbox" data-container="#mailCompose">
                                    <i class="fab fa-dropbox hw_editor_toolbar_icon"></i>
                                </button>
                                <button style="display: none;"  class="p-2 googlePicker" data-is-reply="true" data-toggle="tooltip" title="Attach from Drive"
                                    data-container="#mailCompose">
                                    <i class="fab fa-google-drive hw_editor_toolbar_icon"></i>
                                </button> -->
          <div
            class="p-2 dropdown droptop tx-color-03"
            data-toggle="tooltip"
            title="Schedule Reply"
            data-placement="bottom"
            id="reply-schedule-and-send"
            style="cursor: pointer"
          >
            <i
              class="fas fa-clock"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></i>
            <div
              class="dropdown-menu tx-color-03 schedule-options"
              aria-labelledby="bulk-schedule-icon"
              id="schedule-email"
              style="
                position: absolute;
                transform: translate3d(111px, 0px, 0px);
                top: 0px;
                left: 0px;
                will-change: transform;
                cursor: pointer;
              "
            >
              <button
                class="
                  dropdown-item
                  snooze-drop-down snooze-time
                  schedule-today-option
                "
              >
                <div class="d-flex align-items-center justify-content-between">
                  <span>Later today</span>
                  <span class="schedule-later-today">In 3 hour</span>
                </div>
              </button>
              <button
                class="
                  dropdown-item
                  snooze-drop-down snooze-time
                  schedule-tomorrow-option
                "
              >
                <div class="d-flex align-items-center justify-content-between">
                  <span>Tomorrow</span>
                  <span class="schedule-tomorrow">Thu 9 am</span>
                </div>
              </button>
              <button
                class="
                  dropdown-item
                  snooze-drop-down snooze-time
                  schedule-monday-option
                "
              >
                <div class="d-flex align-items-center justify-content-between">
                  <span>Next Monday</span>
                  <span class="schedule-monday">9 am</span>
                </div>
              </button>
              <button
                class="
                  dropdown-item
                  snooze-drop-down snooze-time
                  schedule-week-option
                "
              >
                <div class="d-flex align-items-center justify-content-between">
                  <span>One Week</span>
                  <span class="schedule-week">Thu 9 am</span>
                </div>
              </button>
              <button
                class="
                  dropdown-item
                  snooze-drop-down snooze-time
                  schedule-month-option
                "
              >
                <div class="d-flex align-items-center justify-content-between">
                  <span>One month</span>
                  <span class="schedule-month">2 Mar</span>
                </div>
              </button>
              <div
                class="dropdown-item snooze-drop-down schedule-threads-cls"
                id="schedule-threads"
              >
                <span>Pick date &amp; time</span>
              </div>
            </div>
          </div>

          <button
            data-toggle="tooltip"
            data-placement="bottom"
            class="tx-color-03 saved-replies-btn p-2"
            title="Saved Replies"
          >
            <i class="tx-color-03 fas fa-bookmark"></i>
          </button>
          <div
            class="
              d-flex
              tx-color-03
              justify-content-between
              align-items-center
            "
          >
            <button
              data-toggle="tooltip"
              id="discard-reply-draft"
              class="p-2"
              title="Delete"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <!-- //<div class="dropdown dropup hw_colorPicker" title="Text Color" data-toggle="tooltip" data-placement="bottom">
    <button class="p-2" data-toggle="dropdown">
        <i class="fas fa-font"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropupMenuButton">
        <div class="note-palette">  <div class="note-palette-title">Background Color</div>  <div>    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">Transparent    </button>  </div>  <div class="note-holder" data-event="backColor"><div class="note-color-palette"><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#000000" data-event="backColor" data-value="#000000" title="" aria-label="Black" data-toggle="button" tabindex="-1" data-original-title="Black"></button><button type="button" class="note-color-btn" style="background-color:#424242" data-event="backColor" data-value="#424242" title="" aria-label="Tundora" data-toggle="button" tabindex="-1" data-original-title="Tundora"></button><button type="button" class="note-color-btn" style="background-color:#636363" data-event="backColor" data-value="#636363" title="" aria-label="Dove Gray" data-toggle="button" tabindex="-1" data-original-title="Dove Gray"></button><button type="button" class="note-color-btn" style="background-color:#9C9C94" data-event="backColor" data-value="#9C9C94" title="" aria-label="Star Dust" data-toggle="button" tabindex="-1" data-original-title="Star Dust"></button><button type="button" class="note-color-btn" style="background-color:#CEC6CE" data-event="backColor" data-value="#CEC6CE" title="" aria-label="Pale Slate" data-toggle="button" tabindex="-1" data-original-title="Pale Slate"></button><button type="button" class="note-color-btn" style="background-color:#EFEFEF" data-event="backColor" data-value="#EFEFEF" title="" aria-label="Gallery" data-toggle="button" tabindex="-1" data-original-title="Gallery"></button><button type="button" class="note-color-btn" style="background-color:#F7F7F7" data-event="backColor" data-value="#F7F7F7" title="" aria-label="Alabaster" data-toggle="button" tabindex="-1" data-original-title="Alabaster"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="White" data-toggle="button" tabindex="-1" data-original-title="White"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#FF0000" data-event="backColor" data-value="#FF0000" title="" aria-label="Red" data-toggle="button" tabindex="-1" data-original-title="Red"></button><button type="button" class="note-color-btn" style="background-color:#FF9C00" data-event="backColor" data-value="#FF9C00" title="" aria-label="Orange Peel" data-toggle="button" tabindex="-1" data-original-title="Orange Peel"></button><button type="button" class="note-color-btn" style="background-color:#FFFF00" data-event="backColor" data-value="#FFFF00" title="" aria-label="Yellow" data-toggle="button" tabindex="-1" data-original-title="Yellow"></button><button type="button" class="note-color-btn" style="background-color:#00FF00" data-event="backColor" data-value="#00FF00" title="" aria-label="Green" data-toggle="button" tabindex="-1" data-original-title="Green"></button><button type="button" class="note-color-btn" style="background-color:#00FFFF" data-event="backColor" data-value="#00FFFF" title="" aria-label="Cyan" data-toggle="button" tabindex="-1" data-original-title="Cyan"></button><button type="button" class="note-color-btn" style="background-color:#0000FF" data-event="backColor" data-value="#0000FF" title="" aria-label="Blue" data-toggle="button" tabindex="-1" data-original-title="Blue"></button><button type="button" class="note-color-btn" style="background-color:#9C00FF" data-event="backColor" data-value="#9C00FF" title="" aria-label="Electric Violet" data-toggle="button" tabindex="-1" data-original-title="Electric Violet"></button><button type="button" class="note-color-btn" style="background-color:#FF00FF" data-event="backColor" data-value="#FF00FF" title="" aria-label="Magenta" data-toggle="button" tabindex="-1" data-original-title="Magenta"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#F7C6CE" data-event="backColor" data-value="#F7C6CE" title="" aria-label="Azalea" data-toggle="button" tabindex="-1" data-original-title="Azalea"></button><button type="button" class="note-color-btn" style="background-color:#FFE7CE" data-event="backColor" data-value="#FFE7CE" title="" aria-label="Karry" data-toggle="button" tabindex="-1" data-original-title="Karry"></button><button type="button" class="note-color-btn" style="background-color:#FFEFC6" data-event="backColor" data-value="#FFEFC6" title="" aria-label="Egg White" data-toggle="button" tabindex="-1" data-original-title="Egg White"></button><button type="button" class="note-color-btn" style="background-color:#D6EFD6" data-event="backColor" data-value="#D6EFD6" title="" aria-label="Zanah" data-toggle="button" tabindex="-1" data-original-title="Zanah"></button><button type="button" class="note-color-btn" style="background-color:#CEDEE7" data-event="backColor" data-value="#CEDEE7" title="" aria-label="Botticelli" data-toggle="button" tabindex="-1" data-original-title="Botticelli"></button><button type="button" class="note-color-btn" style="background-color:#CEE7F7" data-event="backColor" data-value="#CEE7F7" title="" aria-label="Tropical Blue" data-toggle="button" tabindex="-1" data-original-title="Tropical Blue"></button><button type="button" class="note-color-btn" style="background-color:#D6D6E7" data-event="backColor" data-value="#D6D6E7" title="" aria-label="Mischka" data-toggle="button" tabindex="-1" data-original-title="Mischka"></button><button type="button" class="note-color-btn" style="background-color:#E7D6DE" data-event="backColor" data-value="#E7D6DE" title="" aria-label="Twilight" data-toggle="button" tabindex="-1" data-original-title="Twilight"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#E79C9C" data-event="backColor" data-value="#E79C9C" title="" aria-label="Tonys Pink" data-toggle="button" tabindex="-1" data-original-title="Tonys Pink"></button><button type="button" class="note-color-btn" style="background-color:#FFC69C" data-event="backColor" data-value="#FFC69C" title="" aria-label="Peach Orange" data-toggle="button" tabindex="-1" data-original-title="Peach Orange"></button><button type="button" class="note-color-btn" style="background-color:#FFE79C" data-event="backColor" data-value="#FFE79C" title="" aria-label="Cream Brulee" data-toggle="button" tabindex="-1" data-original-title="Cream Brulee"></button><button type="button" class="note-color-btn" style="background-color:#B5D6A5" data-event="backColor" data-value="#B5D6A5" title="" aria-label="Sprout" data-toggle="button" tabindex="-1" data-original-title="Sprout"></button><button type="button" class="note-color-btn" style="background-color:#A5C6CE" data-event="backColor" data-value="#A5C6CE" title="" aria-label="Casper" data-toggle="button" tabindex="-1" data-original-title="Casper"></button><button type="button" class="note-color-btn" style="background-color:#9CC6EF" data-event="backColor" data-value="#9CC6EF" title="" aria-label="Perano" data-toggle="button" tabindex="-1" data-original-title="Perano"></button><button type="button" class="note-color-btn" style="background-color:#B5A5D6" data-event="backColor" data-value="#B5A5D6" title="" aria-label="Cold Purple" data-toggle="button" tabindex="-1" data-original-title="Cold Purple"></button><button type="button" class="note-color-btn" style="background-color:#D6A5BD" data-event="backColor" data-value="#D6A5BD" title="" aria-label="Careys Pink" data-toggle="button" tabindex="-1" data-original-title="Careys Pink"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#E76363" data-event="backColor" data-value="#E76363" title="" aria-label="Mandy" data-toggle="button" tabindex="-1" data-original-title="Mandy"></button><button type="button" class="note-color-btn" style="background-color:#F7AD6B" data-event="backColor" data-value="#F7AD6B" title="" aria-label="Rajah" data-toggle="button" tabindex="-1" data-original-title="Rajah"></button><button type="button" class="note-color-btn" style="background-color:#FFD663" data-event="backColor" data-value="#FFD663" title="" aria-label="Dandelion" data-toggle="button" tabindex="-1" data-original-title="Dandelion"></button><button type="button" class="note-color-btn" style="background-color:#94BD7B" data-event="backColor" data-value="#94BD7B" title="" aria-label="Olivine" data-toggle="button" tabindex="-1" data-original-title="Olivine"></button><button type="button" class="note-color-btn" style="background-color:#73A5AD" data-event="backColor" data-value="#73A5AD" title="" aria-label="Gulf Stream" data-toggle="button" tabindex="-1" data-original-title="Gulf Stream"></button><button type="button" class="note-color-btn" style="background-color:#6BADDE" data-event="backColor" data-value="#6BADDE" title="" aria-label="Viking" data-toggle="button" tabindex="-1" data-original-title="Viking"></button><button type="button" class="note-color-btn" style="background-color:#8C7BC6" data-event="backColor" data-value="#8C7BC6" title="" aria-label="Blue Marguerite" data-toggle="button" tabindex="-1" data-original-title="Blue Marguerite"></button><button type="button" class="note-color-btn" style="background-color:#C67BA5" data-event="backColor" data-value="#C67BA5" title="" aria-label="Puce" data-toggle="button" tabindex="-1" data-original-title="Puce"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#CE0000" data-event="backColor" data-value="#CE0000" title="" aria-label="Guardsman Red" data-toggle="button" tabindex="-1" data-original-title="Guardsman Red"></button><button type="button" class="note-color-btn" style="background-color:#E79439" data-event="backColor" data-value="#E79439" title="" aria-label="Fire Bush" data-toggle="button" tabindex="-1" data-original-title="Fire Bush"></button><button type="button" class="note-color-btn" style="background-color:#EFC631" data-event="backColor" data-value="#EFC631" title="" aria-label="Golden Dream" data-toggle="button" tabindex="-1" data-original-title="Golden Dream"></button><button type="button" class="note-color-btn" style="background-color:#6BA54A" data-event="backColor" data-value="#6BA54A" title="" aria-label="Chelsea Cucumber" data-toggle="button" tabindex="-1" data-original-title="Chelsea Cucumber"></button><button type="button" class="note-color-btn" style="background-color:#4A7B8C" data-event="backColor" data-value="#4A7B8C" title="" aria-label="Smalt Blue" data-toggle="button" tabindex="-1" data-original-title="Smalt Blue"></button><button type="button" class="note-color-btn" style="background-color:#3984C6" data-event="backColor" data-value="#3984C6" title="" aria-label="Boston Blue" data-toggle="button" tabindex="-1" data-original-title="Boston Blue"></button><button type="button" class="note-color-btn" style="background-color:#634AA5" data-event="backColor" data-value="#634AA5" title="" aria-label="Butterfly Bush" data-toggle="button" tabindex="-1" data-original-title="Butterfly Bush"></button><button type="button" class="note-color-btn" style="background-color:#A54A7B" data-event="backColor" data-value="#A54A7B" title="" aria-label="Cadillac" data-toggle="button" tabindex="-1" data-original-title="Cadillac"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#9C0000" data-event="backColor" data-value="#9C0000" title="" aria-label="Sangria" data-toggle="button" tabindex="-1" data-original-title="Sangria"></button><button type="button" class="note-color-btn" style="background-color:#B56308" data-event="backColor" data-value="#B56308" title="" aria-label="Mai Tai" data-toggle="button" tabindex="-1" data-original-title="Mai Tai"></button><button type="button" class="note-color-btn" style="background-color:#BD9400" data-event="backColor" data-value="#BD9400" title="" aria-label="Buddha Gold" data-toggle="button" tabindex="-1" data-original-title="Buddha Gold"></button><button type="button" class="note-color-btn" style="background-color:#397B21" data-event="backColor" data-value="#397B21" title="" aria-label="Forest Green" data-toggle="button" tabindex="-1" data-original-title="Forest Green"></button><button type="button" class="note-color-btn" style="background-color:#104A5A" data-event="backColor" data-value="#104A5A" title="" aria-label="Eden" data-toggle="button" tabindex="-1" data-original-title="Eden"></button><button type="button" class="note-color-btn" style="background-color:#085294" data-event="backColor" data-value="#085294" title="" aria-label="Venice Blue" data-toggle="button" tabindex="-1" data-original-title="Venice Blue"></button><button type="button" class="note-color-btn" style="background-color:#311873" data-event="backColor" data-value="#311873" title="" aria-label="Meteorite" data-toggle="button" tabindex="-1" data-original-title="Meteorite"></button><button type="button" class="note-color-btn" style="background-color:#731842" data-event="backColor" data-value="#731842" title="" aria-label="Claret" data-toggle="button" tabindex="-1" data-original-title="Claret"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#630000" data-event="backColor" data-value="#630000" title="" aria-label="Rosewood" data-toggle="button" tabindex="-1" data-original-title="Rosewood"></button><button type="button" class="note-color-btn" style="background-color:#7B3900" data-event="backColor" data-value="#7B3900" title="" aria-label="Cinnamon" data-toggle="button" tabindex="-1" data-original-title="Cinnamon"></button><button type="button" class="note-color-btn" style="background-color:#846300" data-event="backColor" data-value="#846300" title="" aria-label="Olive" data-toggle="button" tabindex="-1" data-original-title="Olive"></button><button type="button" class="note-color-btn" style="background-color:#295218" data-event="backColor" data-value="#295218" title="" aria-label="Parsley" data-toggle="button" tabindex="-1" data-original-title="Parsley"></button><button type="button" class="note-color-btn" style="background-color:#083139" data-event="backColor" data-value="#083139" title="" aria-label="Tiber" data-toggle="button" tabindex="-1" data-original-title="Tiber"></button><button type="button" class="note-color-btn" style="background-color:#003163" data-event="backColor" data-value="#003163" title="" aria-label="Midnight Blue" data-toggle="button" tabindex="-1" data-original-title="Midnight Blue"></button><button type="button" class="note-color-btn" style="background-color:#21104A" data-event="backColor" data-value="#21104A" title="" aria-label="Valentino" data-toggle="button" tabindex="-1" data-original-title="Valentino"></button><button type="button" class="note-color-btn" style="background-color:#4A1031" data-event="backColor" data-value="#4A1031" title="" aria-label="Loulou" data-toggle="button" tabindex="-1" data-original-title="Loulou"></button></div></div></div>  <div>    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="backColorPicker">Select    </button>    <input type="color" id="backColorPicker" class="note-btn note-color-select-btn" value="#FFFF00" data-event="backColorPalette">  </div>  <div class="note-holder-custom" id="backColorPalette" data-event="backColor"><div class="note-color-palette"><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button></div></div></div></div><div class="note-palette">  <div class="note-palette-title">Text Color</div>  <div>    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">Reset to default    </button>  </div>  <div class="note-holder" data-event="foreColor"><div class="note-color-palette"><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#000000" data-event="foreColor" data-value="#000000" title="" aria-label="Black" data-toggle="button" tabindex="-1" data-original-title="Black"></button><button type="button" class="note-color-btn" style="background-color:#424242" data-event="foreColor" data-value="#424242" title="" aria-label="Tundora" data-toggle="button" tabindex="-1" data-original-title="Tundora"></button><button type="button" class="note-color-btn" style="background-color:#636363" data-event="foreColor" data-value="#636363" title="" aria-label="Dove Gray" data-toggle="button" tabindex="-1" data-original-title="Dove Gray"></button><button type="button" class="note-color-btn" style="background-color:#9C9C94" data-event="foreColor" data-value="#9C9C94" title="" aria-label="Star Dust" data-toggle="button" tabindex="-1" data-original-title="Star Dust"></button><button type="button" class="note-color-btn" style="background-color:#CEC6CE" data-event="foreColor" data-value="#CEC6CE" title="" aria-label="Pale Slate" data-toggle="button" tabindex="-1" data-original-title="Pale Slate"></button><button type="button" class="note-color-btn" style="background-color:#EFEFEF" data-event="foreColor" data-value="#EFEFEF" title="" aria-label="Gallery" data-toggle="button" tabindex="-1" data-original-title="Gallery"></button><button type="button" class="note-color-btn" style="background-color:#F7F7F7" data-event="foreColor" data-value="#F7F7F7" title="" aria-label="Alabaster" data-toggle="button" tabindex="-1" data-original-title="Alabaster"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="White" data-toggle="button" tabindex="-1" data-original-title="White"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#FF0000" data-event="foreColor" data-value="#FF0000" title="" aria-label="Red" data-toggle="button" tabindex="-1" data-original-title="Red"></button><button type="button" class="note-color-btn" style="background-color:#FF9C00" data-event="foreColor" data-value="#FF9C00" title="" aria-label="Orange Peel" data-toggle="button" tabindex="-1" data-original-title="Orange Peel"></button><button type="button" class="note-color-btn" style="background-color:#FFFF00" data-event="foreColor" data-value="#FFFF00" title="" aria-label="Yellow" data-toggle="button" tabindex="-1" data-original-title="Yellow"></button><button type="button" class="note-color-btn" style="background-color:#00FF00" data-event="foreColor" data-value="#00FF00" title="" aria-label="Green" data-toggle="button" tabindex="-1" data-original-title="Green"></button><button type="button" class="note-color-btn" style="background-color:#00FFFF" data-event="foreColor" data-value="#00FFFF" title="" aria-label="Cyan" data-toggle="button" tabindex="-1" data-original-title="Cyan"></button><button type="button" class="note-color-btn" style="background-color:#0000FF" data-event="foreColor" data-value="#0000FF" title="" aria-label="Blue" data-toggle="button" tabindex="-1" data-original-title="Blue"></button><button type="button" class="note-color-btn" style="background-color:#9C00FF" data-event="foreColor" data-value="#9C00FF" title="" aria-label="Electric Violet" data-toggle="button" tabindex="-1" data-original-title="Electric Violet"></button><button type="button" class="note-color-btn" style="background-color:#FF00FF" data-event="foreColor" data-value="#FF00FF" title="" aria-label="Magenta" data-toggle="button" tabindex="-1" data-original-title="Magenta"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#F7C6CE" data-event="foreColor" data-value="#F7C6CE" title="" aria-label="Azalea" data-toggle="button" tabindex="-1" data-original-title="Azalea"></button><button type="button" class="note-color-btn" style="background-color:#FFE7CE" data-event="foreColor" data-value="#FFE7CE" title="" aria-label="Karry" data-toggle="button" tabindex="-1" data-original-title="Karry"></button><button type="button" class="note-color-btn" style="background-color:#FFEFC6" data-event="foreColor" data-value="#FFEFC6" title="" aria-label="Egg White" data-toggle="button" tabindex="-1" data-original-title="Egg White"></button><button type="button" class="note-color-btn" style="background-color:#D6EFD6" data-event="foreColor" data-value="#D6EFD6" title="" aria-label="Zanah" data-toggle="button" tabindex="-1" data-original-title="Zanah"></button><button type="button" class="note-color-btn" style="background-color:#CEDEE7" data-event="foreColor" data-value="#CEDEE7" title="" aria-label="Botticelli" data-toggle="button" tabindex="-1" data-original-title="Botticelli"></button><button type="button" class="note-color-btn" style="background-color:#CEE7F7" data-event="foreColor" data-value="#CEE7F7" title="" aria-label="Tropical Blue" data-toggle="button" tabindex="-1" data-original-title="Tropical Blue"></button><button type="button" class="note-color-btn" style="background-color:#D6D6E7" data-event="foreColor" data-value="#D6D6E7" title="" aria-label="Mischka" data-toggle="button" tabindex="-1" data-original-title="Mischka"></button><button type="button" class="note-color-btn" style="background-color:#E7D6DE" data-event="foreColor" data-value="#E7D6DE" title="" aria-label="Twilight" data-toggle="button" tabindex="-1" data-original-title="Twilight"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#E79C9C" data-event="foreColor" data-value="#E79C9C" title="" aria-label="Tonys Pink" data-toggle="button" tabindex="-1" data-original-title="Tonys Pink"></button><button type="button" class="note-color-btn" style="background-color:#FFC69C" data-event="foreColor" data-value="#FFC69C" title="" aria-label="Peach Orange" data-toggle="button" tabindex="-1" data-original-title="Peach Orange"></button><button type="button" class="note-color-btn" style="background-color:#FFE79C" data-event="foreColor" data-value="#FFE79C" title="" aria-label="Cream Brulee" data-toggle="button" tabindex="-1" data-original-title="Cream Brulee"></button><button type="button" class="note-color-btn" style="background-color:#B5D6A5" data-event="foreColor" data-value="#B5D6A5" title="" aria-label="Sprout" data-toggle="button" tabindex="-1" data-original-title="Sprout"></button><button type="button" class="note-color-btn" style="background-color:#A5C6CE" data-event="foreColor" data-value="#A5C6CE" title="" aria-label="Casper" data-toggle="button" tabindex="-1" data-original-title="Casper"></button><button type="button" class="note-color-btn" style="background-color:#9CC6EF" data-event="foreColor" data-value="#9CC6EF" title="" aria-label="Perano" data-toggle="button" tabindex="-1" data-original-title="Perano"></button><button type="button" class="note-color-btn" style="background-color:#B5A5D6" data-event="foreColor" data-value="#B5A5D6" title="" aria-label="Cold Purple" data-toggle="button" tabindex="-1" data-original-title="Cold Purple"></button><button type="button" class="note-color-btn" style="background-color:#D6A5BD" data-event="foreColor" data-value="#D6A5BD" title="" aria-label="Careys Pink" data-toggle="button" tabindex="-1" data-original-title="Careys Pink"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#E76363" data-event="foreColor" data-value="#E76363" title="" aria-label="Mandy" data-toggle="button" tabindex="-1" data-original-title="Mandy"></button><button type="button" class="note-color-btn" style="background-color:#F7AD6B" data-event="foreColor" data-value="#F7AD6B" title="" aria-label="Rajah" data-toggle="button" tabindex="-1" data-original-title="Rajah"></button><button type="button" class="note-color-btn" style="background-color:#FFD663" data-event="foreColor" data-value="#FFD663" title="" aria-label="Dandelion" data-toggle="button" tabindex="-1" data-original-title="Dandelion"></button><button type="button" class="note-color-btn" style="background-color:#94BD7B" data-event="foreColor" data-value="#94BD7B" title="" aria-label="Olivine" data-toggle="button" tabindex="-1" data-original-title="Olivine"></button><button type="button" class="note-color-btn" style="background-color:#73A5AD" data-event="foreColor" data-value="#73A5AD" title="" aria-label="Gulf Stream" data-toggle="button" tabindex="-1" data-original-title="Gulf Stream"></button><button type="button" class="note-color-btn" style="background-color:#6BADDE" data-event="foreColor" data-value="#6BADDE" title="" aria-label="Viking" data-toggle="button" tabindex="-1" data-original-title="Viking"></button><button type="button" class="note-color-btn" style="background-color:#8C7BC6" data-event="foreColor" data-value="#8C7BC6" title="" aria-label="Blue Marguerite" data-toggle="button" tabindex="-1" data-original-title="Blue Marguerite"></button><button type="button" class="note-color-btn" style="background-color:#C67BA5" data-event="foreColor" data-value="#C67BA5" title="" aria-label="Puce" data-toggle="button" tabindex="-1" data-original-title="Puce"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#CE0000" data-event="foreColor" data-value="#CE0000" title="" aria-label="Guardsman Red" data-toggle="button" tabindex="-1" data-original-title="Guardsman Red"></button><button type="button" class="note-color-btn" style="background-color:#E79439" data-event="foreColor" data-value="#E79439" title="" aria-label="Fire Bush" data-toggle="button" tabindex="-1" data-original-title="Fire Bush"></button><button type="button" class="note-color-btn" style="background-color:#EFC631" data-event="foreColor" data-value="#EFC631" title="" aria-label="Golden Dream" data-toggle="button" tabindex="-1" data-original-title="Golden Dream"></button><button type="button" class="note-color-btn" style="background-color:#6BA54A" data-event="foreColor" data-value="#6BA54A" title="" aria-label="Chelsea Cucumber" data-toggle="button" tabindex="-1" data-original-title="Chelsea Cucumber"></button><button type="button" class="note-color-btn" style="background-color:#4A7B8C" data-event="foreColor" data-value="#4A7B8C" title="" aria-label="Smalt Blue" data-toggle="button" tabindex="-1" data-original-title="Smalt Blue"></button><button type="button" class="note-color-btn" style="background-color:#3984C6" data-event="foreColor" data-value="#3984C6" title="" aria-label="Boston Blue" data-toggle="button" tabindex="-1" data-original-title="Boston Blue"></button><button type="button" class="note-color-btn" style="background-color:#634AA5" data-event="foreColor" data-value="#634AA5" title="" aria-label="Butterfly Bush" data-toggle="button" tabindex="-1" data-original-title="Butterfly Bush"></button><button type="button" class="note-color-btn" style="background-color:#A54A7B" data-event="foreColor" data-value="#A54A7B" title="" aria-label="Cadillac" data-toggle="button" tabindex="-1" data-original-title="Cadillac"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#9C0000" data-event="foreColor" data-value="#9C0000" title="" aria-label="Sangria" data-toggle="button" tabindex="-1" data-original-title="Sangria"></button><button type="button" class="note-color-btn" style="background-color:#B56308" data-event="foreColor" data-value="#B56308" title="" aria-label="Mai Tai" data-toggle="button" tabindex="-1" data-original-title="Mai Tai"></button><button type="button" class="note-color-btn" style="background-color:#BD9400" data-event="foreColor" data-value="#BD9400" title="" aria-label="Buddha Gold" data-toggle="button" tabindex="-1" data-original-title="Buddha Gold"></button><button type="button" class="note-color-btn" style="background-color:#397B21" data-event="foreColor" data-value="#397B21" title="" aria-label="Forest Green" data-toggle="button" tabindex="-1" data-original-title="Forest Green"></button><button type="button" class="note-color-btn" style="background-color:#104A5A" data-event="foreColor" data-value="#104A5A" title="" aria-label="Eden" data-toggle="button" tabindex="-1" data-original-title="Eden"></button><button type="button" class="note-color-btn" style="background-color:#085294" data-event="foreColor" data-value="#085294" title="" aria-label="Venice Blue" data-toggle="button" tabindex="-1" data-original-title="Venice Blue"></button><button type="button" class="note-color-btn" style="background-color:#311873" data-event="foreColor" data-value="#311873" title="" aria-label="Meteorite" data-toggle="button" tabindex="-1" data-original-title="Meteorite"></button><button type="button" class="note-color-btn" style="background-color:#731842" data-event="foreColor" data-value="#731842" title="" aria-label="Claret" data-toggle="button" tabindex="-1" data-original-title="Claret"></button></div><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#630000" data-event="foreColor" data-value="#630000" title="" aria-label="Rosewood" data-toggle="button" tabindex="-1" data-original-title="Rosewood"></button><button type="button" class="note-color-btn" style="background-color:#7B3900" data-event="foreColor" data-value="#7B3900" title="" aria-label="Cinnamon" data-toggle="button" tabindex="-1" data-original-title="Cinnamon"></button><button type="button" class="note-color-btn" style="background-color:#846300" data-event="foreColor" data-value="#846300" title="" aria-label="Olive" data-toggle="button" tabindex="-1" data-original-title="Olive"></button><button type="button" class="note-color-btn" style="background-color:#295218" data-event="foreColor" data-value="#295218" title="" aria-label="Parsley" data-toggle="button" tabindex="-1" data-original-title="Parsley"></button><button type="button" class="note-color-btn" style="background-color:#083139" data-event="foreColor" data-value="#083139" title="" aria-label="Tiber" data-toggle="button" tabindex="-1" data-original-title="Tiber"></button><button type="button" class="note-color-btn" style="background-color:#003163" data-event="foreColor" data-value="#003163" title="" aria-label="Midnight Blue" data-toggle="button" tabindex="-1" data-original-title="Midnight Blue"></button><button type="button" class="note-color-btn" style="background-color:#21104A" data-event="foreColor" data-value="#21104A" title="" aria-label="Valentino" data-toggle="button" tabindex="-1" data-original-title="Valentino"></button><button type="button" class="note-color-btn" style="background-color:#4A1031" data-event="foreColor" data-value="#4A1031" title="" aria-label="Loulou" data-toggle="button" tabindex="-1" data-original-title="Loulou"></button></div></div></div>  <div>    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="foreColorPicker">Select    </button>    <input type="color" id="foreColorPicker" class="note-btn note-color-select-btn" value="#000000" data-event="foreColorPalette">  <div class="note-holder-custom" id="foreColorPalette" data-event="foreColor"><div class="note-color-palette"><div class="note-color-row"><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" class="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button></div></div></div></div></div>
    </div>
</div> -->
          <button
            data-toggle="tooltip"
            data-placement="bottom"
            id="insertArticlesReplyBtn"
            class="p-2"
            title="Helpcenter Articles"
          >
            <i class="fas fa-book tx-color-03"></i>
          </button>
        </div>

        <input
          type="file"
          style="display: none"
          name="files[]"
          accept="image/*"
          id="reply-multiFiles"
          multiple=""
        />
        <div class="d-flex justify-content-between align-items-center">
          <span
            class="align-items-center justify-content-between"
            id="total-caracteres"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="froala-editor/js/plugins/file.min.js"></script>
<script src="froala-editor/js/plugins/image.min.js"></script>
<script>
import { bus } from "../../../main";
import FroalaEditor from "froala-editor";
import "froala-editor/js/plugins.pkgd.min";
export default {
  name: "ChatContentCardReply",
  data() {
    return {
        item: null,
        reply_body: '',
        config: {
            enter: FroalaEditor.ENTER_DIV,
            charCounterCount: false,
            toolbarBottom: true,
            height: "220px",
            imageUploadParam: "files[]",
            imageUploadURL: "https://app.helpwise.io/api/uploadInlineAttachment.php",
            imageUploadParams: {
                mailboxID: this.$route.params.mailboxId,
                // emailID: this.emailID,
            },
            imageUploadMethod: "POST",
            imageAllowedTypes: ["jpeg", "jpg", "png"],
            imagePasteProcess: true,
            imageDefaultAlign: "left",
            pastePlain: true,
            requestWithCredentials: true,
            // events: {
            //     initialized: async function () {
            //         // self.editorInstance.composer = self.composer;
            //         var editor = this;
            //         editor.composer = self.composer;
            //         editor.type = "compose";
            //         editor.mailboxID = self.$route.params.mailboxId;
            //         self.editorInstance = this;
            //         console.log("initialized");
            //         console.log(this);
            //         let attchComp = Vue.extend(AttachmentComp);
            //         let replyAttachmentList = new attchComp({
            //             propsData:{
            //                 attachments: self.attachments,
            //                 type: "compose"
            //             }
            //         }).$mount();
            //         // var ed = $(`#editor-uploadAttachment`).data('editor');
            //         // console.log(editor, ed);
            //         editor.$wp.append(replyAttachmentList.$el);
            //         // ed.$wp.append(replyAttachmentList.$el);
            //     },
            // },
            key: "fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==",
            toolbarButtons: [
                "attach","clear"
            ],
        },
    }
  },
  created() {
      bus.$on('openCardReply', (data) => {
          console.log(data);
          this.item = data;
      })
  }
};
</script>

<style>
</style>