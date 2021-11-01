<template>
    <div id="replyWindowWrapper" :style="{display: display}">
      <div id="replyWindow-1628608536129-90478238534" class="replyWindow">
        <div class="replyBanner bg-primary tx-white d-none">
          <span class="msg"></span>
          <button class="btn editDraft tx-white float-right btn-sm py-0">
            Edit
          </button>
          <button class="btn doneDraft tx-white float-right btn-sm py-0">
            Done
          </button>
        </div>
        <div
          class="
            mail-body
            hw_editor
            replyWindowBody
            hideMoreEditingOptions
            card
            shadow-sm
            mb-2
            bg-white
            rounded
          "
        >
          <div class="replyMainWrapper">
            <div class="d-flex justify-content-between">
              <div
                class="d-flex justify-content-start flex-grow-1"
                style="padding: 10px; padding-left: 0rem"
              >
                <div class="dropdown">
                  <span
                    class="dropdown-toggle bg-white text-secondary"
                    style="font-size: 13px"
                    data-toggle="dropdown"
                  >
                    <i class="reply-type-icon fas fa-reply"></i>
                  </span>
                  <div class="dropdown-menu">
                    <button
                      class="dropdown-item text-secondary reply-state-btn-reply"
                      style="font-size: 13px"
                    >
                      <i class="fas fa-reply"></i> Reply
                    </button>
                    <button
                      class="
                        dropdown-item
                        text-secondary
                        reply-state-btn-reply-all
                      "
                      style="font-size: 13px"
                    >
                      <i class="fas fa-reply-all"></i> Reply All
                    </button>
                    <button
                      class="
                        dropdown-item
                        text-secondary
                        reply-state-btn-forward
                      "
                      style="font-size: 13px"
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
                    <span class="hw-addr-label">From:&nbsp;</span>
                    <div class="email-from-container">
                      <b-form-select v-model="fromSelected" class="mb-3">
                        <!-- <b-form-select-option value="vibhor@saaslabs.co">Masood &lt;vibhor@saaslabs.co&gt;</b-form-select-option>
                        <b-form-select-option value="vibhor@helpwise.io">Vibhor Agrawal &lt;vibhor@helpwise.io&gt;</b-form-select-option> -->
                        <b-form-select-option v-for="fromOption in fromOptions" :key="fromOption.id" :value="fromOption">{{fromOption.name}} &lt;{{fromOption.email}}&gt;</b-form-select-option>
                      </b-form-select>
                      <!-- <select
                        class="email-from select2-hidden-accessible"
                        data-select2-id="89"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <option
                          value="vibhor@saaslabs.co"
                          data-email="vibhor@saaslabs.co"
                          data-name="Masood"
                          data-is-default="true"
                          selected=""
                          data-select2-id="91"
                        >
                          Masood &lt;vibhor@saaslabs.co&gt;
                        </option>
                        <option
                          value="vibhor@helpwise.io"
                          data-email="vibhor@helpwise.io"
                          data-name="Vibhor Agrawal"
                          data-is-default="false"
                        >
                          Vibhor Agrawal &lt;vibhor@helpwise.io&gt;
                        </option></select
                      ><span
                        class="
                          select2 select2-container select2-container--default
                        "
                        dir="ltr"
                        data-select2-id="90"
                        style="width: auto"
                        ><span class="selection"
                          ><span
                            class="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabindex="0"
                            aria-labelledby="select2-vyi4-container"
                            ><span
                              class="select2-selection__rendered"
                              id="select2-vyi4-container"
                              role="textbox"
                              aria-readonly="true"
                              title="Masood <vibhor@saaslabs.co>"
                              >Masood &lt;vibhor@saaslabs.co&gt;</span
                            ><span
                              class="select2-selection__arrow"
                              role="presentation"
                              ><b role="presentation"></b></span></span></span
                        ><span
                          class="dropdown-wrapper"
                          aria-hidden="true"
                        ></span
                      ></span>
                    </div>
                    <span class="reply-email-from" style="display: none"
                      >vibhor@saaslabs.co</span
                    > -->
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
                    <span class="hw-addr-label">To&nbsp;</span>
                    <div class="reply-email-to w-100">
                      <!-- <div class="bootstrap-tagsinput">
                        <span
                          class="
                            tag
                            m-1
                            tag-primary
                            rounded
                            tx-12
                            hw_emailEditorTag
                            hw_val-eyJlbWFpbCI6InN1cHBvcnRAZnJvYWxhLmNvbSIsIm5hbWUiOiJGcm9hbGEifQ==
                          "
                          draggable="true"
                          >Froala (support@froala.com)<span
                            data-role="remove"
                          ></span
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
                              background: none 0% 0% / auto repeat scroll
                                padding-box border-box rgba(0, 0, 0, 0);
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
                            <div
                              class="tt-dataset tt-dataset-contacts"
                            ></div></div
                        ></span>
                      </div> -->
                      <vue-tags-input
                        v-model="tagTo"
                        :tags="tagsTo"
                        :autocomplete-items="autocompleteItemsTo"
                        :add-only-from-autocomplete="false"
                        :validation="validation"
                        :is-draggable="true"
                        @tag-order-changed="newTags => tagsTo = newTags"
                        @tags-changed="updateTo"
                        placeholder=""
                      >
                        <div
                          slot="autocomplete-item"
                          slot-scope="props"
                          class="my-item"
                          @click="props.performAdd(props.item)"
                        >
                          <div v-html="props.item.icon"></div>
                        </div>
                      </vue-tags-input>
                      <input
                        type="text"
                        class="form-control"
                        style="display: none"
                      />
                    </div>
                  </div>
                  <div
                    v-if="isCC"
                    class="
                      mg-b-0
                      tx-13 tx-color-03
                      
                      flex-row
                      justify-content-start
                      align-items-center
                    "
                  >
                    <span class="hw-addr-label">Cc&nbsp;</span>
                    <div class="reply-email-cc w-100">
                      <!-- <div class="bootstrap-tagsinput">
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
                              background: none 0% 0% / auto repeat scroll
                                padding-box border-box rgba(0, 0, 0, 0);
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
                            <div
                              class="tt-dataset tt-dataset-contacts"
                            ></div></div
                        ></span>
                      </div> -->
                      <vue-tags-input
                        v-model="tagCC"
                        :tags="tagsCC"
                        :autocomplete-items="autocompleteItemsCC"
                        :add-only-from-autocomplete="false"
                        :validation="validation"
                        :is-draggable="true"
                        @tag-order-changed="newTags => tagsCC = newTags"
                        @tags-changed="updateCC"
                        placeholder=""
                        style="z-index: 0"
                      >
                        <div
                          slot="autocomplete-item"
                          slot-scope="props"
                          class="my-item"
                          @click="props.performAdd(props.item)"
                        >
                          <div v-html="props.item.icon"></div>
                        </div>
                      </vue-tags-input>
                      <input
                        type="text"
                        class="form-control"
                        style="display: none"
                      />
                    </div>
                  </div>
                  <div
                    v-if="isBCC"
                    class="
                      mg-b-0
                      tx-13 tx-color-03
                      
                      flex-row
                      justify-content-start
                      align-items-center
                    "
                  >
                    <span class="hw-addr-label">Bcc&nbsp;</span>
                    <div class="reply-email-bcc w-100">
                      <!-- <div class="bootstrap-tagsinput">
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
                              background: none 0% 0% / auto repeat scroll
                                padding-box border-box rgba(0, 0, 0, 0);
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
                            <div
                              class="tt-dataset tt-dataset-contacts"
                            ></div></div
                        ></span>
                      </div> -->
                      <vue-tags-input
                        v-model="tagBCC"
                        :tags="tagsBCC"
                        :autocomplete-items="autocompleteItemsBCC"
                        :add-only-from-autocomplete="false"
                        :validation="validation"
                        :is-draggable="true"
                        @tag-order-changed="newTags => tagsBCC = newTags"
                        @tags-changed="updateBCC"
                        placeholder=""
                        style="z-index: 0"
                      >
                        <div
                          slot="autocomplete-item"
                          slot-scope="props"
                          class="my-item"
                          @click="props.performAdd(props.item)"
                        >
                          <div v-html="props.item.icon"></div>
                        </div>
                      </vue-tags-input>
                      <input
                        type="text"
                        class="form-control"
                        style="display: none"
                      />
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
                    <span class="hw-addr-label"> Subject&nbsp;</span>
                    <span class="tx-color-01 flex-grow-1"
                      ><input
                        type="text"
                         @blur="saveDraft" v-model="subject"
                        class="form-control-plaintext reply-email-subject p-0"
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
                <button tabindex="-1" v-if="!isCC" @click.stop.prevent="showCC" class="btn btn-link p-1 reply-show-cc">
                  Cc
                </button>
                <button tabindex="-1" v-if="!isBCC" @click.stop.prevent="showBCC" class="btn btn-link p-1 reply-show-bcc">
                  Bcc
                </button>
                <button
                  title="Pop out reply"
                  data-toggle="tooltip"
                  tabindex="-1"
                  class="btn btn-link p-1 popoutReply"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-external-link"
                  >
                    <path
                      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                    ></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
            <hr />
            <div class="reply-editor-wrapper">
              <!-- <div
                class="mg-t-15 reply-email-editor fr-box fr-basic fr-bottom"
                role="application"
                style="z-index: 1000"
              >
                <div
                  class="fr-wrapper"
                  dir="auto"
                  style="height: 250px; overflow: auto"
                  tabindex="-1"
                >
                  <div
                    class="fr-element fr-view"
                    dir="auto"
                    contenteditable="true"
                    style="min-height: 250px"
                    aria-disabled="false"
                    spellcheck="true"
                    data-tribute="true"
                  >
                    <div><br /></div>
                    <div><br /></div>
                    <div class="hw_signature rounded">
                      <div class="hw_attr">
                        <div class="pt-2 pb-2" id="signature-23502045">
                          --<br />Regards,<br />Masood Muhammad
                        </div>
                      </div>
                    </div>
                    <div
                      class="
                        hw_quote
                        rounded
                        hw_collapse-btn hw_collapse-btn-draft
                        badge-pill badge
                        align-items-center
                        justify-content-center
                        text-info
                      "
                      data-placement="top"
                      data-toggle="tooltip"
                      style="
                        cursor: pointer;
                        border-radius: 5.5px;
                        height: 10px;
                        width: 25px;
                        padding: 0px;
                        font-size: 10px;
                        display: flex;
                      "
                      title="Show trimmed content"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-horizontal"
                      >
                        &nbsp;
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                        &nbsp;
                      </svg>
                    </div>
                    <div
                      class="hw_attr hw_quote"
                      dir="ltr"
                      style="display: none"
                    >
                      On Friday, August 06, 2021 at 11:16 PM Froala &lt;<a
                        href="mailto:support@froala.com"
                        target="_blank"
                        >support@froala.com</a
                      >&gt; wrote:
                    </div>
                    <blockquote
                      class="hw_blockquote hw_quote"
                      style="
                        border-left: 1px solid rgb(204, 204, 204);
                        display: none;
                        margin: 0px 0ex 0px 0.8ex;
                        padding: 7px;
                      "
                    >
                      
                      
                      <div
                        style="
                          display: none;
                          font-size: 1px;
                          color: #333333;
                          line-height: 1px;
                          max-height: 0px;
                          max-width: 0px;
                          opacity: 0;
                          overflow: hidden;
                        "
                      >
                        All of the latest news for the week gathered in one
                        place.
                      </div>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        class="color-wrap-6f0f54"
                        style="background: #ffffff; position: static"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        background-color: transparent;
                                        line-height: 18px;
                                      "
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      class="
                                                        elq-header-footer-cell-a0429b
                                                        cell-bd17e9
                                                      "
                                                      style="
                                                        background-color: transparent;
                                                        line-height: 18px;
                                                        padding: 10px 10px 10px
                                                          10px;
                                                      "
                                                    >
                                                      <span
                                                        ><div
                                                          style="
                                                            text-align: right;
                                                          "
                                                        >
                                                          <a
                                                            data-targettype="sysaction"
                                                            href="http://s1403.t.en25.com/e/es.aspx?s=608&amp;e=4791742&amp;elqTrackId=bb8769cb4c1e4c39b96c5d6135aae0b5&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                            target="_blank"
                                                            ><span
                                                              style="
                                                                color: #20a5f8;
                                                              "
                                                              ><span
                                                                style="
                                                                  font-family: calibri,
                                                                    arial,
                                                                    sans-serif;
                                                                "
                                                                >ONLINE
                                                                VERSION</span
                                                              ></span
                                                            ></a
                                                          >
                                                        </div></span
                                                      >
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-0-53d587"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-12-8962b5
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(100%);
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-image-cell-62e3ba
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 0;
                                                                padding: 0px 0px
                                                                  0px 0px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              <a
                                                                data-targettype="webpage"
                                                                href="https://s608.t.en25.com/e/er?s=608&amp;lid=46889&amp;elqTrackId=B65295B8603A3A78779DDCB4BB153E11&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                target="_blank"
                                                                ><img
                                                                  style="
                                                                    width: 100%;
                                                                    height: auto;
                                                                    max-width: 1200px;
                                                                  "
                                                                  width="600"
                                                                  height="125"
                                                                  src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7Bb285bea6-aa16-4f0f-8688-1eb85b146e6c%7D_Froala_Weekly_Banner.png"
                                                                  class="
                                                                    fr-fic
                                                                    fr-dii
                                                                    fr-draggable
                                                                  "
                                                              /></a>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-space-cell-84785a
                                                                cell-bd17e9
                                                                cell-1-57ee88
                                                              "
                                                              style="
                                                                height: 30px;
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  height: 30px;
                                                                  display: none;
                                                                "
                                                              >
                                                                &nbsp;
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-1-ab68ec"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-4-cbb4c0
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(
                                                            33.33333333%
                                                          );
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-space-cell-84785a
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                height: 5px;
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  height: 5px;
                                                                  display: none;
                                                                "
                                                              >
                                                                &nbsp;
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-image-cell-62e3ba
                                                                cell-bd17e9
                                                                cell-1-57ee88
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 0;
                                                                padding: 10px
                                                                  15px 0px 15px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              <img
                                                                style="
                                                                  width: 100%;
                                                                  height: auto;
                                                                  max-width: 1365px;
                                                                "
                                                                width="170"
                                                                height="88"
                                                                src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7B942b12d0-5d09-496f-a297-2478aa99edd0%7D_G2-Grid.png"
                                                                class="
                                                                  fr-fic
                                                                  fr-dii
                                                                  fr-draggable
                                                                "
                                                              />
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-8-36ecc9
                                                          col-4bfb49
                                                          col-1-f92efc
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(
                                                            66.66666667%
                                                          );
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-text-cell-29d1cf
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 0px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  display: inline-block;
                                                                  width: 100%;
                                                                "
                                                              >
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    line-height: 24px;
                                                                    text-align: justify;
                                                                  "
                                                                >
                                                                  <a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=46890&amp;elqTrackId=A1FAE154F24A11E27EEACFE27EDAA1D0&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      font-size: 16px;
                                                                      color: rgb(
                                                                        32,
                                                                        165,
                                                                        248
                                                                      );
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    title=""
                                                                    ><strong
                                                                      >Froala
                                                                      vs.
                                                                      VisualEditor:
                                                                      A
                                                                      Comparison
                                                                      Of Top
                                                                      WYSIWYG
                                                                      HTML
                                                                      Editors</strong
                                                                    ></a
                                                                  >
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-text-cell-29d1cf
                                                                cell-bd17e9
                                                                cell-1-57ee88
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 0px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  display: inline-block;
                                                                  width: 100%;
                                                                "
                                                              >
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    line-height: 21px;
                                                                    text-align: justify;
                                                                  "
                                                                >
                                                                  <span
                                                                    style="
                                                                      font-size: 14px;
                                                                    "
                                                                    >To help you
                                                                    differentiate
                                                                    the wheat
                                                                    from the
                                                                    chaff, this
                                                                    article
                                                                    compares two
                                                                    popular
                                                                    WYSIWYG
                                                                    editors —
                                                                    Froala, a
                                                                    top-rated
                                                                    editing tool
                                                                    in G2’s “Top
                                                                    10 WYSIWYG
                                                                    Editors
                                                                    Software”&nbsp;&nbsp;rankings
                                                                    (see below
                                                                    image), and
                                                                    VisualEditor,
                                                                    an
                                                                    open-source
                                                                    WYSIWYG HTML
                                                                    editor.&nbsp;...</span
                                                                  ><a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=46890&amp;elqTrackId=900ED1E0FB22EB5D622BE9699344E311&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      font-size: 14px;
                                                                      color: rgb(
                                                                        32,
                                                                        165,
                                                                        248
                                                                      );
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    title=""
                                                                    ><strong
                                                                      >Read More
                                                                      &gt;</strong
                                                                    ></a
                                                                  >
                                                                </div>
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    line-height: 18px;
                                                                    text-align: justify;
                                                                  "
                                                                >
                                                                  <br />
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-button-cell-89f4dd
                                                                cell-bd17e9
                                                                cell-2-1b498e
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 0px
                                                                  20px 0px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  text-align: center;
                                                                  font-family: Arial,
                                                                    Helvetica,
                                                                    sans-serif;
                                                                "
                                                              >
                                                                <div>
                                                                  <br />
                                                                </div>
                                                                <a
                                                                  data-targetname=""
                                                                  data-targettype="webpage"
                                                                  href="https://s608.t.en25.com/e/er?s=608&amp;lid=46890&amp;elqTrackId=1C8109DECF74DAD2AA51CA06E7FD4400&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                  style="
                                                                    text-decoration: none;
                                                                    vertical-align: middle;
                                                                    word-wrap: break-word;
                                                                    overflow-wrap: break-word;
                                                                    color: #fff;
                                                                    text-align: center;
                                                                    background-color: #20a5f8;
                                                                    padding: 10px
                                                                      20px 10px
                                                                      20px;
                                                                    border-radius: 5px;
                                                                    display: block;
                                                                    max-width: 100%;
                                                                    width: auto;
                                                                  "
                                                                  target="_blank"
                                                                  title=""
                                                                  ><span
                                                                    style="
                                                                      background-color: #20a5f8;
                                                                      cursor: pointer;
                                                                      text-decoration: none;
                                                                      user-select: none;
                                                                    "
                                                                    ><span
                                                                      ><strong
                                                                        style="
                                                                          font-size: 14px;
                                                                          font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                          color: rgb(
                                                                            255,
                                                                            255,
                                                                            255
                                                                          );
                                                                        "
                                                                        >Learn
                                                                        More</strong
                                                                      ></span
                                                                    ></span
                                                                  ></a
                                                                >
                                                                <div>
                                                                  <br />
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-2-e559cc"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-12-8962b5
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(100%);
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-divider-cell-e465cd
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  0px 10px 0px;
                                                              "
                                                            >
                                                              <center>
                                                                <table
                                                                  style="
                                                                    position: static;
                                                                  "
                                                                  width="100%"
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        style="
                                                                          border-top-width: 1px;
                                                                          border-top-style: solid;
                                                                          border-top-color: #000000;
                                                                        "
                                                                      >
                                                                        <div
                                                                          style="
                                                                            display: none;
                                                                          "
                                                                        >
                                                                          &nbsp;
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </center>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-3-853749"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-4-cbb4c0
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(
                                                            33.33333333%
                                                          );
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-image-cell-62e3ba
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 0;
                                                                padding: 15px
                                                                  15px 0px 15px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              <img
                                                                style="
                                                                  width: 100%;
                                                                  height: auto;
                                                                  max-width: 1024px;
                                                                "
                                                                width="170"
                                                                height="87"
                                                                src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7B25eb4d26-d5cd-434c-82c1-1061b126efac%7D_new-editor-1024x523-1.jpg"
                                                                class="
                                                                  fr-fic
                                                                  fr-dii
                                                                  fr-draggable
                                                                "
                                                              />
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-8-36ecc9
                                                          col-4bfb49
                                                          col-1-f92efc
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(
                                                            66.66666667%
                                                          );
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-text-cell-29d1cf
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 0px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  display: inline-block;
                                                                  width: 100%;
                                                                "
                                                              >
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    line-height: 24px;
                                                                    text-align: justify;
                                                                  "
                                                                >
                                                                  <a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=46891&amp;elqTrackId=989726B09F77A1F53343891553E51B92&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      font-size: 16px;
                                                                      color: rgb(
                                                                        32,
                                                                        165,
                                                                        248
                                                                      );
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    title=""
                                                                    ><strong
                                                                      >Froala
                                                                      Vs.
                                                                      Shorthand
                                                                      – Which
                                                                      WYSIWYG
                                                                      editor has
                                                                      the Best
                                                                      Features
                                                                      and
                                                                      Value</strong
                                                                    ></a
                                                                  >
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-text-cell-29d1cf
                                                                cell-bd17e9
                                                                cell-1-57ee88
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 10px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  display: inline-block;
                                                                  width: 100%;
                                                                "
                                                              >
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    line-height: 21px;
                                                                    text-align: justify;
                                                                  "
                                                                >
                                                                  <span
                                                                    style="
                                                                      font-size: 14px;
                                                                    "
                                                                    >This
                                                                    article
                                                                    compares two
                                                                    top-performing
                                                                    Javascript
                                                                    WYSIWYG
                                                                    editors –
                                                                    Froala, the
                                                                    leader on
                                                                    the G2 grid
                                                                    for WYSIWYG
                                                                    editors, and
                                                                    Shorthand, a
                                                                    Javascript
                                                                    web editor
                                                                    that
                                                                    provides a
                                                                    rich
                                                                    storytelling
                                                                    experience.&nbsp;...</span
                                                                  ><a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=46891&amp;elqTrackId=9ACDCE5EE30A4DAA343FDF0AEE120A89&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      font-size: 14px;
                                                                      color: rgb(
                                                                        32,
                                                                        165,
                                                                        248
                                                                      );
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    title=""
                                                                    ><strong
                                                                      >Read More
                                                                      &gt;</strong
                                                                    ></a
                                                                  >
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-button-cell-89f4dd
                                                                cell-bd17e9
                                                                cell-2-1b498e
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 0px
                                                                  20px 0px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  text-align: center;
                                                                  font-family: Arial,
                                                                    Helvetica,
                                                                    sans-serif;
                                                                "
                                                              >
                                                                <div>
                                                                  <br />
                                                                </div>
                                                                <a
                                                                  data-targetname=""
                                                                  data-targettype="webpage"
                                                                  href="https://s608.t.en25.com/e/er?s=608&amp;lid=46891&amp;elqTrackId=8AB985D5E143B86FCAC9EF4D1BF11256&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                  style="
                                                                    text-decoration: none;
                                                                    vertical-align: middle;
                                                                    word-wrap: break-word;
                                                                    overflow-wrap: break-word;
                                                                    color: #fff;
                                                                    text-align: center;
                                                                    background-color: #20a5f8;
                                                                    padding: 10px
                                                                      20px 10px
                                                                      20px;
                                                                    border-radius: 5px;
                                                                    display: block;
                                                                    max-width: 100%;
                                                                    width: auto;
                                                                  "
                                                                  target="_blank"
                                                                  title=""
                                                                  ><span
                                                                    style="
                                                                      background-color: #20a5f8;
                                                                      cursor: pointer;
                                                                      text-decoration: none;
                                                                      user-select: none;
                                                                    "
                                                                    ><span
                                                                      ><strong
                                                                        style="
                                                                          color: rgb(
                                                                            255,
                                                                            255,
                                                                            255
                                                                          );
                                                                          font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                          font-size: 14px;
                                                                        "
                                                                        >Learn
                                                                        More</strong
                                                                      ></span
                                                                    ></span
                                                                  ></a
                                                                >
                                                                <div>
                                                                  <br />
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-4-5f2006"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-12-8962b5
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(100%);
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-divider-cell-e465cd
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  0px 10px 0px;
                                                              "
                                                            >
                                                              <center>
                                                                <table
                                                                  style="
                                                                    position: static;
                                                                  "
                                                                  width="100%"
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        style="
                                                                          border-top-width: 1px;
                                                                          border-top-style: solid;
                                                                          border-top-color: #000000;
                                                                        "
                                                                      >
                                                                        <div
                                                                          style="
                                                                            display: none;
                                                                          "
                                                                        >
                                                                          &nbsp;
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </center>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-5-6968f5"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-4-cbb4c0
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(
                                                            33.33333333%
                                                          );
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-image-cell-62e3ba
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 0;
                                                                padding: 15px
                                                                  15px 0px 15px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              <img
                                                                style="
                                                                  width: 100%;
                                                                  height: auto;
                                                                  max-width: 1536px;
                                                                "
                                                                width="170"
                                                                height="113"
                                                                src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7B418c5615-ed0a-4938-bf9b-80ba2dc0eb72%7D_install-froala-editor-node-sdk-1536x1017.jpg"
                                                                class="
                                                                  fr-fic
                                                                  fr-dii
                                                                  fr-draggable
                                                                "
                                                              />
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-8-36ecc9
                                                          col-4bfb49
                                                          col-1-f92efc
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(
                                                            66.66666667%
                                                          );
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-text-cell-29d1cf
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 0px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  display: inline-block;
                                                                  width: 100%;
                                                                "
                                                              >
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    line-height: 24px;
                                                                    text-align: justify;
                                                                  "
                                                                >
                                                                  <a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=46892&amp;elqTrackId=52EA6A1E1AB9D9744E692469C46125AB&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      font-size: 16px;
                                                                      color: rgb(
                                                                        32,
                                                                        165,
                                                                        248
                                                                      );
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    title=""
                                                                    ><strong
                                                                      >Create a
                                                                      Chart
                                                                      using
                                                                      Next.js
                                                                      and Froala
                                                                      Charts</strong
                                                                    ></a
                                                                  >
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-text-cell-29d1cf
                                                                cell-bd17e9
                                                                cell-1-57ee88
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 10px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  display: inline-block;
                                                                  width: 100%;
                                                                "
                                                              >
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    line-height: 21px;
                                                                    text-align: justify;
                                                                  "
                                                                >
                                                                  <span
                                                                    style="
                                                                      font-size: 14px;
                                                                    "
                                                                    >Next.js&nbsp;is
                                                                    an
                                                                    open-source
                                                                    React
                                                                    development
                                                                    framework
                                                                    for
                                                                    developing
                                                                    single page
                                                                    JavaScript
                                                                    applications.
                                                                    If you are
                                                                    wondering
                                                                    how to
                                                                    render a
                                                                    chart with
                                                                    Next.js,
                                                                    this article
                                                                    is for
                                                                    you!&nbsp;&nbsp;This
                                                                    tutorial
                                                                    will walk
                                                                    you through
                                                                    creating a
                                                                    dynamic
                                                                    chart in
                                                                    React using
                                                                    Next.js and
                                                                    Froala
                                                                    Charts.&nbsp;&nbsp;&nbsp;...</span
                                                                  ><a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=46892&amp;elqTrackId=D06800EDC0B32B856F4133D213D02758&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      font-size: 14px;
                                                                      color: rgb(
                                                                        32,
                                                                        165,
                                                                        248
                                                                      );
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    title=""
                                                                    ><strong
                                                                      >Read More
                                                                      &gt;</strong
                                                                    ></a
                                                                  >
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-button-cell-89f4dd
                                                                cell-bd17e9
                                                                cell-2-1b498e
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 0px
                                                                  20px 0px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  text-align: center;
                                                                  font-family: Arial,
                                                                    Helvetica,
                                                                    sans-serif;
                                                                "
                                                              >
                                                                <div>
                                                                  <br />
                                                                </div>
                                                                <a
                                                                  data-targetname=""
                                                                  data-targettype="webpage"
                                                                  href="https://s608.t.en25.com/e/er?s=608&amp;lid=46892&amp;elqTrackId=C5CE6BD186A5F69701703F6E4E55D708&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                  style="
                                                                    text-decoration: none;
                                                                    vertical-align: middle;
                                                                    word-wrap: break-word;
                                                                    overflow-wrap: break-word;
                                                                    color: #fff;
                                                                    text-align: center;
                                                                    background-color: #20a5f8;
                                                                    padding: 10px
                                                                      20px 10px
                                                                      20px;
                                                                    border-radius: 6px;
                                                                    display: block;
                                                                    max-width: 100%;
                                                                    width: auto;
                                                                  "
                                                                  target="_blank"
                                                                  title=""
                                                                  ><span
                                                                    style="
                                                                      background-color: #20a5f8;
                                                                      cursor: pointer;
                                                                      text-decoration: none;
                                                                      user-select: none;
                                                                    "
                                                                    ><span
                                                                      ><strong
                                                                        style="
                                                                          font-size: 14px;
                                                                          font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                          color: rgb(
                                                                            255,
                                                                            255,
                                                                            255
                                                                          );
                                                                        "
                                                                        >Learn
                                                                        More</strong
                                                                      ></span
                                                                    ></span
                                                                  ></a
                                                                >
                                                                <div>
                                                                  <br />
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-6-47ffc0"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-12-8962b5
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(100%);
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-divider-cell-e465cd
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  0px 10px 0px;
                                                              "
                                                            >
                                                              <center>
                                                                <table
                                                                  style="
                                                                    position: static;
                                                                  "
                                                                  width="100%"
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        style="
                                                                          border-top-width: 1px;
                                                                          border-top-style: solid;
                                                                          border-top-color: #000000;
                                                                        "
                                                                      >
                                                                        <div
                                                                          style="
                                                                            display: none;
                                                                          "
                                                                        >
                                                                          &nbsp;
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </center>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-7-4e3d68"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-4-cbb4c0
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(
                                                            33.33333333%
                                                          );
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-image-cell-62e3ba
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 0;
                                                                padding: 15px
                                                                  15px 0px 15px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              <img
                                                                style="
                                                                  width: 100%;
                                                                  height: auto;
                                                                  max-width: 1600px;
                                                                "
                                                                width="170"
                                                                height="88"
                                                                src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7Bb2e59c2a-f7e4-4319-bf4c-8e1b6de8f6cb%7D_Image_from_iOS.jpg"
                                                                class="
                                                                  fr-fic
                                                                  fr-dii
                                                                  fr-draggable
                                                                "
                                                              />
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-8-36ecc9
                                                          col-4bfb49
                                                          col-1-f92efc
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(
                                                            66.66666667%
                                                          );
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-text-cell-29d1cf
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 0px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  display: inline-block;
                                                                  width: 100%;
                                                                "
                                                              >
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    text-align: justify;
                                                                    line-height: 24px;
                                                                  "
                                                                >
                                                                  <a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=46893&amp;elqTrackId=D05C1EA277F1001367B663E3C86E3459&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      font-size: 16px;
                                                                      color: rgb(
                                                                        32,
                                                                        165,
                                                                        248
                                                                      );
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    title=""
                                                                    ><strong
                                                                      >Visualize
                                                                      the
                                                                      World’s
                                                                      Busiest
                                                                      Airports
                                                                      Using
                                                                      Froala
                                                                      Charts</strong
                                                                    ></a
                                                                  >
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-text-cell-29d1cf
                                                                cell-bd17e9
                                                                cell-1-57ee88
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 5px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  display: inline-block;
                                                                  width: 100%;
                                                                "
                                                              >
                                                                <div
                                                                  data-lineheight="1.5"
                                                                  style="
                                                                    line-height: 21px;
                                                                    text-align: justify;
                                                                  "
                                                                >
                                                                  <span
                                                                    style="
                                                                      font-size: 14px;
                                                                    "
                                                                    >Did you
                                                                    know —
                                                                    Hartsfield-Jackson
                                                                    Airport in
                                                                    Atlanta,
                                                                    Georgia is
                                                                    the busiest
                                                                    airport in
                                                                    the world
                                                                    with a
                                                                    massive 100
                                                                    million
                                                                    annual
                                                                    passenger
                                                                    traffic?!
                                                                    Although
                                                                    most of us
                                                                    will avoid
                                                                    the busiest
                                                                    airports for
                                                                    the time
                                                                    being, I’m
                                                                    sure we all
                                                                    are eagerly
                                                                    looking
                                                                    forward to
                                                                    resuming our
                                                                    travel
                                                                    adventures
                                                                    once the
                                                                    pandemic is
                                                                    behind
                                                                    us!&nbsp;&nbsp;&nbsp;…</span
                                                                  ><a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=46893&amp;elqTrackId=B8353FE0A77D5B24A52D5B49D56F3050&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      font-size: 14px;
                                                                      color: rgb(
                                                                        32,
                                                                        165,
                                                                        248
                                                                      );
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    title=""
                                                                    ><strong
                                                                      >Read More
                                                                      &gt;</strong
                                                                    ></a
                                                                  >
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-button-cell-89f4dd
                                                                cell-bd17e9
                                                                cell-2-1b498e
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  20px 10px 20px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  text-align: center;
                                                                  font-family: Arial,
                                                                    Helvetica,
                                                                    sans-serif;
                                                                "
                                                              >
                                                                <div>
                                                                  <br />
                                                                </div>
                                                                <a
                                                                  data-targetname=""
                                                                  data-targettype="webpage"
                                                                  href="https://s608.t.en25.com/e/er?s=608&amp;lid=46893&amp;elqTrackId=0D88893C3DBD615EE309004486099733&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                  style="
                                                                    text-decoration: none;
                                                                    vertical-align: middle;
                                                                    word-wrap: break-word;
                                                                    overflow-wrap: break-word;
                                                                    color: #fff;
                                                                    text-align: center;
                                                                    background-color: #20a5f8;
                                                                    padding: 10px
                                                                      20px 10px
                                                                      20px;
                                                                    border-radius: 5px;
                                                                    display: block;
                                                                    max-width: 100%;
                                                                    width: auto;
                                                                  "
                                                                  target="_blank"
                                                                  title=""
                                                                  ><span
                                                                    style="
                                                                      background-color: #20a5f8;
                                                                      cursor: pointer;
                                                                      text-decoration: none;
                                                                      user-select: none;
                                                                    "
                                                                    ><span
                                                                      ><strong
                                                                        style="
                                                                          color: rgb(
                                                                            255,
                                                                            255,
                                                                            255
                                                                          );
                                                                          font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                          font-size: 14px;
                                                                        "
                                                                        >Learn
                                                                        More</strong
                                                                      ></span
                                                                    ></span
                                                                  ></a
                                                                >
                                                                <div>
                                                                  <br />
                                                                </div>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="row-108f15 row-8-e79cc1"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="background: #ffffff">
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        text-align: left;
                                                        vertical-align: top;
                                                        font-size: 0px;
                                                      "
                                                    >
                                                      <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="
                                                          tolkien-column-024981
                                                          tolkien-column-12-8962b5
                                                          col-4bfb49
                                                          col-0-aea165
                                                        "
                                                        style="
                                                          vertical-align: top;
                                                          display: inline-table;
                                                          background: transparent;
                                                          table-layout: fixed;
                                                          font-family: Arial,
                                                            Helvetica,
                                                            sans-serif;
                                                          font-size: 12px;
                                                          color: #000000;
                                                          max-width: 100%;
                                                          width: calc(
                                                            230400px - 48000%
                                                          );
                                                          min-width: calc(100%);
                                                          position: static;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              class="
                                                                elq-divider-cell-e465cd
                                                                cell-bd17e9
                                                                cell-0-0cbcba
                                                              "
                                                              style="
                                                                background-color: transparent;
                                                                line-height: 18px;
                                                                padding: 10px
                                                                  0px 10px 0px;
                                                              "
                                                            >
                                                              <center>
                                                                <table
                                                                  style="
                                                                    position: static;
                                                                  "
                                                                  width="100%"
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        style="
                                                                          border-top-width: 1px;
                                                                          border-top-style: solid;
                                                                          border-top-color: #000000;
                                                                        "
                                                                      >
                                                                        <div
                                                                          style="
                                                                            display: none;
                                                                          "
                                                                        >
                                                                          &nbsp;
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </center>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  max-width: 600px;
                                  min-width: 300px;
                                  margin: 0 auto;
                                  position: static;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        background-color: transparent;
                                        line-height: 18px;
                                      "
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="position: static"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="position: static"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      class="
                                                        elq-header-footer-cell-a0429b
                                                        cell-bd17e9
                                                      "
                                                      style="
                                                        background-color: transparent;
                                                        line-height: 18px;
                                                        padding: 10px 10px 10px
                                                          10px;
                                                      "
                                                    >
                                                      <span
                                                        >&nbsp;
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          style="
                                                            position: static;
                                                          "
                                                          width="100%"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                align="center"
                                                                style="
                                                                  padding: 0;
                                                                  margin: 0;
                                                                  font-family: Helvetica,
                                                                    Arial,
                                                                    sans-serif,
                                                                    'Montserrat';
                                                                  font-size: 14px;
                                                                  line-height: 20px;
                                                                  font-weight: 300;
                                                                  color: #00a1dd;
                                                                  text-align: center;
                                                                "
                                                                valign="middle"
                                                              >
                                                                <p
                                                                  style="
                                                                    mso-line-height-rule: exactly;
                                                                    line-height: 30px;
                                                                    font-size: 30px;
                                                                    padding: 0;
                                                                    margin: 0;
                                                                  "
                                                                >
                                                                  &nbsp;
                                                                </p>
                                                                <span
                                                                  class="
                                                                    idFooterLink-1a8263
                                                                  "
                                                                  ><a
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=28166&amp;elqTrackId=3857d31726fb4cf097f8b1ee537ddb0e&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      color: #00a1dd;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    >WYSIWYG
                                                                    EDITOR</a
                                                                  ></span
                                                                >
                                                                <span
                                                                  class="
                                                                    idFooterBullet-b210f7
                                                                  "
                                                                  >&nbsp;•&nbsp;</span
                                                                >
                                                                <span
                                                                  class="
                                                                    idFooterLink-1a8263
                                                                  "
                                                                  ><a
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=28165&amp;elqTrackId=cb7584b624f84bd3937136af5a64e796&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      color: #00a1dd;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    >DESIGN
                                                                    BLOCKS</a
                                                                  ></span
                                                                >
                                                                <span
                                                                  class="
                                                                    idFooterBullet-b210f7
                                                                  "
                                                                  >&nbsp;•&nbsp;</span
                                                                >
                                                                <span
                                                                  class="
                                                                    idFooterLink-1a8263
                                                                  "
                                                                  ><a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=28164&amp;elqTrackId=b8465a5bdae1421a96fce173ea07c11d&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      color: #00a1dd;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    >PAGES</a
                                                                  ></span
                                                                >
                                                                <span
                                                                  class="
                                                                    idFooterBullet-b210f7
                                                                  "
                                                                  >&nbsp;•&nbsp;</span
                                                                >
                                                                <span
                                                                  class="
                                                                    idFooterLink-1a8263
                                                                  "
                                                                  ><a
                                                                    data-targettype="webpage"
                                                                    href="https://s608.t.en25.com/e/er?s=608&amp;lid=28163&amp;elqTrackId=baee3e8771514be0a19a9515e3d009de&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                    style="
                                                                      color: #00a1dd;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                    >CONTACT
                                                                    US</a
                                                                  ></span
                                                                >
                                                                <p
                                                                  style="
                                                                    mso-line-height-rule: exactly;
                                                                    line-height: 25px;
                                                                    font-size: 25px;
                                                                    padding: 0;
                                                                    margin: 0;
                                                                  "
                                                                >
                                                                  &nbsp;
                                                                </p>
                                                                <table
                                                                  align="center"
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  style="
                                                                    position: static;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>
                                                                        <a
                                                                          href="https://s608.t.en25.com/e/er?s=608&amp;lid=28161&amp;elqTrackId=e2831630466b4fdfa950e65bf593957c&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                          target="_blank"
                                                                          ><img
                                                                            style="
                                                                              border: 0px;
                                                                            "
                                                                            src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7B6a8d1bdf-8a85-47fc-891d-a1ffeff8a0e6%7D_icon-social-facebook.png"
                                                                            height="35"
                                                                            class="
                                                                              idFooterSocial-398498
                                                                              fr-fil
                                                                              fr-dib
                                                                              fr-draggable
                                                                            "
                                                                            alt="Facebook"
                                                                        /></a>
                                                                      </td>
                                                                      <td>
                                                                        <a
                                                                          href="https://s608.t.en25.com/e/er?s=608&amp;lid=28160&amp;elqTrackId=f90c52cd20214ab4b738a759ead05e81&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                          target="_blank"
                                                                          ><img
                                                                            style="
                                                                              border: 0px;
                                                                            "
                                                                            src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7Be2871a6a-d7b6-41c2-a8b5-f7da4b1a7f25%7D_icon-social-twitter.png"
                                                                            height="35"
                                                                            class="
                                                                              idFooterSocial-398498
                                                                              fr-fil
                                                                              fr-dib
                                                                              fr-draggable
                                                                            "
                                                                            alt="Twitter"
                                                                        /></a>
                                                                      </td>
                                                                      <td>
                                                                        <a
                                                                          href="https://s608.t.en25.com/e/er?s=608&amp;lid=28159&amp;elqTrackId=7fd17e7d202e4e498d8d9615768138e5&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                          target="_blank"
                                                                          ><img
                                                                            style="
                                                                              border: 0px;
                                                                            "
                                                                            src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7Bd3928fe3-922c-4ea7-bd7f-b55dcdacb942%7D_icon-social-linkedin.png"
                                                                            height="35"
                                                                            class="
                                                                              idFooterSocial-398498
                                                                              fr-fil
                                                                              fr-dib
                                                                              fr-draggable
                                                                            "
                                                                            alt="LinkedIn"
                                                                        /></a>
                                                                      </td>
                                                                      <td>
                                                                        <a
                                                                          href="https://s608.t.en25.com/e/er?s=608&amp;lid=28158&amp;elqTrackId=2ba805228cbb4c688db7330f6eb11039&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                          target="_blank"
                                                                          ><img
                                                                            style="
                                                                              border: 0px;
                                                                            "
                                                                            src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7B6cdf3b5d-2e8d-4cbe-a9e8-4e840e02afc7%7D_icon-social-pinterest.png"
                                                                            height="35"
                                                                            class="
                                                                              idFooterSocial-398498
                                                                              fr-fil
                                                                              fr-dib
                                                                              fr-draggable
                                                                            "
                                                                            alt="Pinterest"
                                                                        /></a>
                                                                      </td>
                                                                      <td>
                                                                        <a
                                                                          href="https://s608.t.en25.com/e/er?s=608&amp;lid=28157&amp;elqTrackId=87460dfb8d464da08f15e926896966ae&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                                          target="_blank"
                                                                          ><img
                                                                            style="
                                                                              border: 0px;
                                                                            "
                                                                            src="https://img.en25.com/EloquaImages/clients/Embarcadero/%7B59c56f8d-7f7d-4d4f-995b-ab5ad83d6acc%7D_icon-social-github.png"
                                                                            height="35"
                                                                            class="
                                                                              idFooterSocial-398498
                                                                              fr-fil
                                                                              fr-dib
                                                                              fr-draggable
                                                                            "
                                                                            alt="YouTube"
                                                                        /></a>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <p
                                                          style="
                                                            mso-line-height-rule: exactly;
                                                            line-height: 10px;
                                                            font-size: 10px;
                                                            padding: 0;
                                                            margin: 0;
                                                          "
                                                        >
                                                          &nbsp;
                                                        </p>
                                                        <p
                                                          style="
                                                            font-family: 'Lucida Sans Unicode',
                                                              'Lucida Grande',
                                                              sans-serif;
                                                            font-size: 12px;
                                                            line-height: 14px;
                                                            color: rgb(
                                                              100,
                                                              100,
                                                              100
                                                            );
                                                            text-align: right;
                                                          "
                                                        >
                                                          &nbsp;
                                                        </p>
                                                        <p
                                                          style="
                                                            font-family: 'Lucida Sans Unicode',
                                                              'Lucida Grande',
                                                              sans-serif;
                                                            font-size: 12px;
                                                            line-height: 14px;
                                                            color: rgb(
                                                              100,
                                                              100,
                                                              100
                                                            );
                                                          "
                                                        >
                                                          <span
                                                            style="
                                                              color: #646363;
                                                            "
                                                            ><span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                text-align: -webkit-center;
                                                              "
                                                              >This message was
                                                              sent
                                                              to&nbsp;</span
                                                            >vibhor@helpwise.io<span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                text-align: -webkit-center;
                                                              "
                                                              >&nbsp;by:</span
                                                            ><b
                                                              style="
                                                                color: rgb(
                                                                  120,
                                                                  115,
                                                                  120
                                                                );
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                              "
                                                              >&nbsp;</b
                                                            ><span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                text-align: -webkit-center;
                                                              "
                                                              >IDERA (</span
                                                            >support@froala.com<span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                text-align: -webkit-center;
                                                              "
                                                              >)</span
                                                            ><span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                              "
                                                              >&nbsp;</span
                                                            ><br />
                                                            <br
                                                              style="
                                                                color: rgb(
                                                                  120,
                                                                  115,
                                                                  120
                                                                );
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                              "
                                                            />
                                                            <span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                text-align: -webkit-center;
                                                              "
                                                              >2950 North Loop
                                                              Fwy West, Houston,
                                                              TX 77092</span
                                                            ><span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                              "
                                                              >&nbsp;&nbsp;</span
                                                            ><span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                text-align: -webkit-center;
                                                              "
                                                              >713-523-4433</span
                                                            ></span
                                                          ><br /><br /><u
                                                            ><span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                text-align: -webkit-center;
                                                              "
                                                              ><a
                                                                data-targettype="sysaction"
                                                                href="https://s608.t.en25.com/e/cu?s=608&amp;elqc=1894&amp;elq=64378abdd8ed4448b762263cc457e234"
                                                                target="_blank"
                                                                ><span
                                                                  style="
                                                                    color: #646363;
                                                                  "
                                                                  >Manage Email
                                                                  Subscription
                                                                  or
                                                                  Unsubscribe</span
                                                                ></a
                                                              ></span
                                                            ></u
                                                          ><span
                                                            style="
                                                              color: #646363;
                                                            "
                                                            ><span
                                                              style="
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 11px;
                                                                text-align: -webkit-center;
                                                              "
                                                              >.</span
                                                            ></span
                                                          >
                                                        </p>
                                                        <p
                                                          style="
                                                            font-family: 'Lucida Sans Unicode',
                                                              'Lucida Grande',
                                                              sans-serif;
                                                            font-size: 12px;
                                                            line-height: 14px;
                                                            color: rgb(
                                                              100,
                                                              100,
                                                              100
                                                            );
                                                            text-align: right;
                                                          "
                                                        >
                                                          <a
                                                            data-targettype="sysaction"
                                                            href="https://s608.t.en25.com/e/es?s=608&amp;e=4791742&amp;elqTrackId=7bd6885c5b3a475495fc29855c441119&amp;elq=64378abdd8ed4448b762263cc457e234&amp;elqaid=39899&amp;elqat=1"
                                                            target="_blank"
                                                            ><span
                                                              style="
                                                                color: #646363;
                                                              "
                                                              >ONLINE
                                                              VERSION</span
                                                            ></a
                                                          >
                                                        </p></span
                                                      >
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <img
                        height="1px"
                        width="1px"
                        border="0"
                        alt=""
                        src="https://s608.t.en25.com/e/FooterImages/FooterImage1?elq=64378abdd8ed4448b762263cc457e234&amp;siteid=608"
                        class="fr-fic fr-dii fr-draggable"
                      />
                    </blockquote>
                  </div>
                  <span
                    class="fr-placeholder"
                    style="
                      font-size: 14px;
                      line-height: 22.4px;
                      margin-top: 0px;
                      padding-top: 20px;
                      padding-left: 20px;
                      margin-left: 0px;
                      padding-right: 20px;
                      margin-right: 0px;
                      text-align: left;
                    "
                    >Type something</span
                  >
                </div>
                <div
                  class="fr-toolbar fr-desktop fr-bottom fr-basic"
                  style="z-index: 1001"
                >
                  <div
                    class="fr-more-toolbar"
                    data-name="moreText-4"
                    style="padding-left: 129.266px"
                  >
                    <button
                      id="textColor-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Text Color"
                      class="fr-command fr-btn"
                      data-cmd="textColor"
                      data-popup="true"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.2,13.494s-3.6,3.9-3.6,6.3a3.65,3.65,0,0,0,7.3.1v-.1C18.9,17.394,15.2,13.494,15.2,13.494Zm-1.47-1.357.669-.724L12.1,5h-2l-5,14h2l1.43-4h2.943A24.426,24.426,0,0,1,13.726,12.137ZM11.1,7.8l1.86,5.2H9.244Z"
                        ></path></svg
                      ><span class="fr-sr-only">Text Color</span></button
                    ><button
                      id="fontFamily-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-controls="dropdown-menu-fontFamily-4"
                      aria-expanded="false"
                      aria-haspopup="true"
                      title="Font Family"
                      class="fr-command fr-btn fr-dropdown fr-selection"
                      data-cmd="fontFamily"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16,19h2L13,5H11L6,19H8l1.43-4h5.14Zm-5.86-6L12,7.8,13.86,13Z"
                        ></path></svg
                      ><span class="fr-sr-only">Font Family</span>
                    </button>
                    <div
                      id="dropdown-menu-fontFamily-4"
                      class="fr-dropdown-menu"
                      role="listbox"
                      aria-labelledby="fontFamily-4"
                      aria-hidden="true"
                    >
                      <div class="fr-dropdown-wrapper" role="presentation">
                        <div class="fr-dropdown-content" role="presentation">
                          <ul class="fr-dropdown-list" role="presentation">
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="Arial,Helvetica,sans-serif"
                                style="
                                  font-family: Arial, Helvetica, sans-serif;
                                "
                                title="Arial"
                                >Arial</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="'Arial Black',Helvetica,sans-serif"
                                style="
                                  font-family: 'Arial Black', Helvetica,
                                    sans-serif;
                                "
                                title="Arial Black"
                                >Arial Black</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="'Comic Sans MS',Helvetica,sans-serif"
                                style="
                                  font-family: 'Comic Sans MS', Helvetica,
                                    sans-serif;
                                "
                                title="Comic Sans MS"
                                >Comic Sans MS</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="'Courier New',Helvetica,sans-serif"
                                style="
                                  font-family: 'Courier New', Helvetica,
                                    sans-serif;
                                "
                                title="Courier New"
                                >Courier New</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="Georgia,serif"
                                style="font-family: Georgia, serif"
                                title="Georgia"
                                >Georgia</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="Impact,Charcoal,sans-serif"
                                style="
                                  font-family: Impact, Charcoal, sans-serif;
                                "
                                title="Impact"
                                >Impact</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="'Lucida Grande',Charcoal,sans-serif"
                                style="
                                  font-family: 'Lucida Grande', Charcoal,
                                    sans-serif;
                                "
                                title="Lucida Grande"
                                >Lucida Grande</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="sans-serif"
                                style="font-family: sans-serif"
                                title="Sans Serif"
                                >Sans Serif</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="Tahoma,Geneva,sans-serif"
                                style="font-family: Tahoma, Geneva, sans-serif"
                                title="Tahoma"
                                >Tahoma</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="'Times New Roman',Times,serif"
                                style="
                                  font-family: 'Times New Roman', Times, serif;
                                "
                                title="Times New Roman"
                                >Times New Roman</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="Verdana,Geneva,sans-serif"
                                style="font-family: Verdana, Geneva, sans-serif"
                                title="Verdana"
                                >Verdana</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontFamily"
                                data-param1="'IBM Plex Sans',Helvetica,sans-serif"
                                style="
                                  font-family: 'IBM Plex Sans', Helvetica,
                                    sans-serif;
                                "
                                title="IBM Plex Sans"
                                >IBM Plex Sans</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <button
                      id="backgroundColor-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Background Color"
                      class="fr-command fr-btn"
                      data-cmd="backgroundColor"
                      data-popup="true"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.91752,12.24082l7.74791-5.39017,1.17942,1.29591-6.094,7.20747L9.91752,12.24082M7.58741,12.652l4.53533,4.98327a.93412.93412,0,0,0,1.39531-.0909L20.96943,8.7314A.90827.90827,0,0,0,20.99075,7.533l-2.513-2.76116a.90827.90827,0,0,0-1.19509-.09132L7.809,11.27135A.93412.93412,0,0,0,7.58741,12.652ZM2.7939,18.52772,8.41126,19.5l1.47913-1.34617-3.02889-3.328Z"
                        ></path></svg
                      ><span class="fr-sr-only">Background Color</span></button
                    ><button
                      id="fontSize-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-controls="dropdown-menu-fontSize-4"
                      aria-expanded="false"
                      aria-haspopup="true"
                      title="Font Size"
                      class="fr-command fr-btn fr-dropdown fr-selection"
                      data-cmd="fontSize"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.75,19h1.5l-3-10h-1.5l-3,10h1.5L17,16.5h3Zm-3.3-4,1.05-3.5L19.55,15Zm-5.7,4h2l-5-14h-2l-5,14h2l1.43-4h5.14ZM5.89,13,7.75,7.8,9.61,13Z"
                        ></path></svg
                      ><span class="fr-sr-only">Font Size</span>
                    </button>
                    <div
                      id="dropdown-menu-fontSize-4"
                      class="fr-dropdown-menu"
                      role="listbox"
                      aria-labelledby="fontSize-4"
                      aria-hidden="true"
                    >
                      <div class="fr-dropdown-wrapper" role="presentation">
                        <div class="fr-dropdown-content" role="presentation">
                          <ul class="fr-dropdown-list" role="presentation">
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="8px"
                                title="8"
                                >8</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="9px"
                                title="9"
                                >9</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="10px"
                                title="10"
                                >10</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="11px"
                                title="11"
                                >11</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="12px"
                                title="12"
                                >12</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="14px"
                                title="14"
                                >14</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="18px"
                                title="18"
                                >18</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="24px"
                                title="24"
                                >24</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="30px"
                                title="30"
                                >30</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="36px"
                                title="36"
                                >36</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="48px"
                                title="48"
                                >48</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="60px"
                                title="60"
                                >60</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="72px"
                                title="72"
                                >72</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="fontSize"
                                data-param1="96px"
                                title="96"
                                >96</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <button
                      id="resetFormatting-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Remove formatting"
                      class="fr-command fr-btn"
                      data-cmd="resetFormatting"
                    >
                      <i class="fas fa-eraser" aria-hidden="true"></i
                      ><span class="fr-sr-only">Remove formatting</span>
                    </button>
                  </div>
                  <div
                    class="fr-more-toolbar"
                    data-name="moreParagraph-4"
                    style="padding-left: 62.2656px"
                  >
                    <button
                      id="alignLeft-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Align Left"
                      class="fr-command fr-btn"
                      data-cmd="alignLeft"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3,18h6v-2H3V18z M3,11v2h12v-2H3z M3,6v2h18V6H3z"
                        ></path></svg
                      ><span class="fr-sr-only">Align Left</span></button
                    ><button
                      id="alignCenter-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Align Center"
                      class="fr-command fr-btn"
                      data-cmd="alignCenter"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9,18h6v-2H9V18z M6,11v2h12v-2H6z M3,6v2h18V6H3z"
                        ></path></svg
                      ><span class="fr-sr-only">Align Center</span></button
                    ><button
                      id="alignRight-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Align Right"
                      class="fr-command fr-btn"
                      data-cmd="alignRight"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15,18h6v-2h-6V18z M9,11v2h12v-2H9z M3,6v2h18V6H3z"
                        ></path></svg
                      ><span class="fr-sr-only">Align Right</span></button
                    ><button
                      id="alignJustify-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Align Justify"
                      class="fr-command fr-btn"
                      data-cmd="alignJustify"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3,18h18v-2H3V18z M3,11v2h18v-2H3z M3,6v2h18V6H3z"
                        ></path></svg
                      ><span class="fr-sr-only">Align Justify</span>
                    </button>
                    <div class="fr-btn-wrap">
                      <button
                        id="formatOL-4"
                        type="button"
                        tabindex="-1"
                        role="button"
                        title="Ordered List"
                        class="fr-command fr-btn"
                        data-cmd="formatOL"
                      >
                        <svg
                          class="fr-svg"
                          focusable="false"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5,16h2v.5h-1v1h1V18h-2v1h3V15h-3Zm1-7h1V5h-2V6h1Zm-1,2H4.3L2.5,13.1V14h3V13H3.7l1.8-2.1V10h-3Zm5-5V8h14V6Zm0,12h14V16H7.5Zm0-5h14V11H7.5Z"
                          ></path></svg
                        ><span class="fr-sr-only">Ordered List</span>
                      </button>
                      <button
                        id="formatOLOptions-4"
                        type="button"
                        tabindex="-1"
                        role="button"
                        aria-controls="dropdown-menu-formatOLOptions-4"
                        aria-expanded="false"
                        aria-haspopup="true"
                        title="Ordered List"
                        class="fr-command fr-btn fr-dropdown fr-options"
                        data-cmd="formatOLOptions"
                      ></button>
                      <div
                        id="dropdown-menu-formatOLOptions-4"
                        class="fr-dropdown-menu"
                        role="listbox"
                        aria-labelledby="formatOLOptions-4"
                        aria-hidden="true"
                      >
                        <div class="fr-dropdown-wrapper" role="presentation">
                          <div class="fr-dropdown-content" role="presentation">
                            <ul class="fr-dropdown-list" role="presentation">
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatOL"
                                  data-param1="default"
                                  title="Default"
                                  >Default</a
                                >
                              </li>
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatOL"
                                  data-param1="lower-alpha"
                                  title="Lower Alpha"
                                  >Lower Alpha</a
                                >
                              </li>
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatOL"
                                  data-param1="lower-greek"
                                  title="Lower Greek"
                                  >Lower Greek</a
                                >
                              </li>
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatOL"
                                  data-param1="lower-roman"
                                  title="Lower Roman"
                                  >Lower Roman</a
                                >
                              </li>
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatOL"
                                  data-param1="upper-alpha"
                                  title="Upper Alpha"
                                  >Upper Alpha</a
                                >
                              </li>
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatOL"
                                  data-param1="upper-roman"
                                  title="Upper Roman"
                                  >Upper Roman</a
                                >
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="fr-btn-wrap">
                      <button
                        id="formatUL-4"
                        type="button"
                        tabindex="-1"
                        role="button"
                        title="Unordered List"
                        class="fr-command fr-btn"
                        data-cmd="formatUL"
                      >
                        <svg
                          class="fr-svg"
                          focusable="false"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4,10.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,10.5,4,10.5z M4,5.5C3.2,5.5,2.5,6.2,2.5,7  S3.2,8.5,4,8.5S5.5,7.8,5.5,7S4.8,5.5,4,5.5z M4,15.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,15.5,4,15.5z   M7.5,6v2h14V6H7.5z M7.5,18h14v-2h-14V18z M7.5,13h14v-2h-14V13z"
                          ></path></svg
                        ><span class="fr-sr-only">Unordered List</span>
                      </button>
                      <button
                        id="formatULOptions-4"
                        type="button"
                        tabindex="-1"
                        role="button"
                        aria-controls="dropdown-menu-formatULOptions-4"
                        aria-expanded="false"
                        aria-haspopup="true"
                        title="Unordered List"
                        class="fr-command fr-btn fr-dropdown fr-options"
                        data-cmd="formatULOptions"
                      ></button>
                      <div
                        id="dropdown-menu-formatULOptions-4"
                        class="fr-dropdown-menu"
                        role="listbox"
                        aria-labelledby="formatULOptions-4"
                        aria-hidden="true"
                      >
                        <div class="fr-dropdown-wrapper" role="presentation">
                          <div class="fr-dropdown-content" role="presentation">
                            <ul class="fr-dropdown-list" role="presentation">
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatUL"
                                  data-param1="default"
                                  title="Default"
                                  >Default</a
                                >
                              </li>
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatUL"
                                  data-param1="circle"
                                  title="Circle"
                                  >Circle</a
                                >
                              </li>
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatUL"
                                  data-param1="disc"
                                  title="Disc"
                                  >Disc</a
                                >
                              </li>
                              <li role="presentation">
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="formatUL"
                                  data-param1="square"
                                  title="Square"
                                  >Square</a
                                >
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      id="paragraphFormat-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-controls="dropdown-menu-paragraphFormat-4"
                      aria-expanded="false"
                      aria-haspopup="true"
                      title="Paragraph Format"
                      class="fr-command fr-btn fr-dropdown fr-selection"
                      data-cmd="paragraphFormat"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.15,5A4.11,4.11,0,0,0,6.08,8.18,4,4,0,0,0,10,13v6h2V7h2V19h2V7h2V5ZM8,9a2,2,0,0,1,2-2v4A2,2,0,0,1,8,9Z"
                        ></path></svg
                      ><span class="fr-sr-only">Paragraph Format</span>
                    </button>
                    <div
                      id="dropdown-menu-paragraphFormat-4"
                      class="fr-dropdown-menu"
                      role="listbox"
                      aria-labelledby="paragraphFormat-4"
                      aria-hidden="true"
                    >
                      <div class="fr-dropdown-wrapper" role="presentation">
                        <div class="fr-dropdown-content" role="presentation">
                          <ul class="fr-dropdown-list" role="presentation">
                            <li role="presentation">
                              <div
                                style="
                                  padding: 0 !important;
                                  margin: 0 !important;
                                "
                                role="presentation"
                              >
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="paragraphFormat"
                                  data-param1="N"
                                  title="Normal"
                                  >Normal</a
                                >
                              </div>
                            </li>
                            <li role="presentation">
                              <h1
                                style="
                                  padding: 0 !important;
                                  margin: 0 !important;
                                "
                                role="presentation"
                              >
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="paragraphFormat"
                                  data-param1="H1"
                                  title="Heading 1"
                                  >Heading 1</a
                                >
                              </h1>
                            </li>
                            <li role="presentation">
                              <h2
                                style="
                                  padding: 0 !important;
                                  margin: 0 !important;
                                "
                                role="presentation"
                              >
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="paragraphFormat"
                                  data-param1="H2"
                                  title="Heading 2"
                                  >Heading 2</a
                                >
                              </h2>
                            </li>
                            <li role="presentation">
                              <h3
                                style="
                                  padding: 0 !important;
                                  margin: 0 !important;
                                "
                                role="presentation"
                              >
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="paragraphFormat"
                                  data-param1="H3"
                                  title="Heading 3"
                                  >Heading 3</a
                                >
                              </h3>
                            </li>
                            <li role="presentation">
                              <h4
                                style="
                                  padding: 0 !important;
                                  margin: 0 !important;
                                "
                                role="presentation"
                              >
                                <a
                                  class="fr-command"
                                  tabindex="-1"
                                  role="option"
                                  data-cmd="paragraphFormat"
                                  data-param1="H4"
                                  title="Heading 4"
                                  >Heading 4</a
                                >
                              </h4>
                            </li>
                            <li role="presentation">
                              <pre
                                style="
                                  padding: 0 !important;
                                  margin: 0 !important;
                                "
                                role="presentation"
                              ><a class="fr-command" tabindex="-1" role="option" data-cmd="paragraphFormat" data-param1="PRE" title="Code">Code</a></pre>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <button
                      id="quote-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-controls="dropdown-menu-quote-4"
                      aria-expanded="false"
                      aria-haspopup="true"
                      title="Quote"
                      class="fr-command fr-btn fr-dropdown"
                      data-cmd="quote"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.31788,5l.93817,1.3226A12.88271,12.88271,0,0,0,8.1653,9.40125a5.54242,5.54242,0,0,0-.998,3.07866v.33733q.36089-.04773.66067-.084a4.75723,4.75723,0,0,1,.56519-.03691,2.87044,2.87044,0,0,1,2.11693.8427,2.8416,2.8416,0,0,1,.8427,2.09274,3.37183,3.37183,0,0,1-.8898,2.453A3.143,3.143,0,0,1,8.10547,19,3.40532,3.40532,0,0,1,5.375,17.7245,4.91156,4.91156,0,0,1,4.30442,14.453,9.3672,9.3672,0,0,1,5.82051,9.32933,14.75716,14.75716,0,0,1,10.31788,5Zm8.39243,0,.9369,1.3226a12.88289,12.88289,0,0,0-3.09075,3.07865,5.54241,5.54241,0,0,0-.998,3.07866v.33733q.33606-.04773.63775-.084a4.91773,4.91773,0,0,1,.58938-.03691,2.8043,2.8043,0,0,1,2.1042.83,2.89952,2.89952,0,0,1,.80578,2.10547,3.42336,3.42336,0,0,1-.86561,2.453A3.06291,3.06291,0,0,1,16.49664,19,3.47924,3.47924,0,0,1,13.742,17.7245,4.846,4.846,0,0,1,12.64721,14.453,9.25867,9.25867,0,0,1,14.17476,9.3898,15.26076,15.26076,0,0,1,18.71031,5Z"
                        ></path></svg
                      ><span class="fr-sr-only">Quote</span>
                    </button>
                    <div
                      id="dropdown-menu-quote-4"
                      class="fr-dropdown-menu"
                      role="listbox"
                      aria-labelledby="quote-4"
                      aria-hidden="true"
                    >
                      <div class="fr-dropdown-wrapper" role="presentation">
                        <div class="fr-dropdown-content" role="presentation">
                          <ul class="fr-dropdown-list" role="presentation">
                            <li role="presentation">
                              <a
                                class="fr-command fr-active increase"
                                tabindex="-1"
                                role="option"
                                data-cmd="quote"
                                data-param1="increase"
                                title="Increase"
                                >Increase<span class="fr-shortcut"
                                  >Ctrl+'</span
                                ></a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command fr-active decrease"
                                tabindex="-1"
                                role="option"
                                data-cmd="quote"
                                data-param1="decrease"
                                title="Decrease"
                                >Decrease<span class="fr-shortcut"
                                  >Ctrl+Shift+'</span
                                ></a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <button
                      id="insertTable-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert Table"
                      class="fr-command fr-btn"
                      data-cmd="insertTable"
                      data-popup="true"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M9.5,13.5v-3  h5v3H9.5z M14.5,15v2.5h-5V15H14.5z M9.5,9V6.5h5V9H9.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M3.5,17  v-2H8v2.5H4C3.7,17.5,3.5,17.3,3.5,17z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M16,9V6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16z"
                        ></path></svg
                      ><span class="fr-sr-only">Insert Table</span>
                    </button>
                  </div>
                  <div
                    class="fr-more-toolbar"
                    data-name="moreRich-4"
                    style="padding-left: 614.266px"
                  >
                    <button
                      id="dropbox-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert from Dropbox"
                      class="fr-command fr-btn"
                      data-cmd="dropbox"
                    >
                      <i class="fab fa-dropbox"></i
                      ><span class="fr-sr-only"
                        >Insert from Dropbox</span
                      ></button
                    ><button
                      id="box-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert from box"
                      class="fr-command fr-btn"
                      data-cmd="box"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="48px"
                        height="25px"
                      >
                        <path
                          fill="#0288D1"
                          d="M25.639,17.927c-3.074,0-5.822,1.846-7.278,4.537c-1.293-2.691-4.042-4.537-7.278-4.537c-1.773,0-3.554,0.663-4.847,1.678v-7.567l0,0c0-0.845-0.813-1.69-1.618-1.69C3.649,10.347,3,11.021,3,12.037l0,0v14.47l0,0c0,4.538,3.716,8.415,8.083,8.415c3.074,0,5.822-1.861,7.278-4.553c1.456,2.691,4.042,4.553,7.278,4.553c4.529,0,8.083-3.877,8.083-8.415C33.722,21.787,30.168,17.927,25.639,17.927 M11.083,31.553c-2.749,0-4.847-2.353-4.847-5.046c0-2.858,2.261-5.058,4.847-5.058s4.854,2.367,4.854,5.058C16.1,29.2,13.832,31.553,11.083,31.553z M25.639,31.553c-2.749,0-4.854-2.353-4.854-5.046c0-2.858,2.269-5.058,4.854-5.058c2.749,0,4.847,2.367,4.847,5.058C30.485,29.2,28.225,31.553,25.639,31.553z"
                        ></path>
                        <path
                          fill="#0288D1"
                          d="M44.785,32.353l-4.251-5.892l4.251-5.89l0,0c0.494-0.677,0.33-1.859-0.328-2.354c-0.649-0.505-1.793-0.337-2.287,0.324l0,0l-3.594,5.061l-3.602-5.061l0,0c-0.486-0.661-1.637-0.829-2.286-0.324c-0.658,0.495-0.822,1.678-0.329,2.354l0,0l4.252,5.89l-4.252,5.892l0,0c-0.493,0.66-0.329,1.845,0.329,2.352c0.649,0.508,1.8,0.34,2.286-0.338l0,0l3.602-5.044l3.594,5.044l0,0c0.494,0.678,1.638,0.846,2.287,0.338C45.115,34.197,45.279,33.013,44.785,32.353L44.785,32.353"
                        ></path></svg
                      ><span class="fr-sr-only">Insert from box</span></button
                    ><button
                      id="OneDrive-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert from OneDrive"
                      class="fr-command fr-btn"
                      data-cmd="OneDrive"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        stroke-linejoin="round"
                        stroke-miterlimit="1.414"
                      >
                        <path
                          fill="#094AB2"
                          d="M3.28 11.72c-.333.203-.706.305-1.12.305-.613-.02-1.12-.23-1.525-.634C.23 10.99.02 10.48 0 9.87c.01-.575.194-1.063.553-1.462.36-.4.816-.632 1.372-.7-.02-.118-.028-.244-.028-.377.02-.76.28-1.39.78-1.88.502-.49 1.133-.75 1.894-.77.48 0 .91.11 1.29.34.32-.51.73-.93 1.24-1.24.52-.31 1.1-.47 1.74-.48.86.02 1.59.29 2.21.81.62.52 1.01 1.19 1.17 2.02h-.19c-.31 0-.58.04-.82.13-.32-.34-.69-.6-1.11-.78-.41-.18-.86-.26-1.34-.26-.44 0-.86.07-1.26.22s-.76.36-1.08.64c-.28.24-.51.51-.7.82-.19.31-.32.64-.39.99-.24.05-.47.12-.68.21-.34.16-.63.38-.86.67-.22.25-.39.54-.5.87-.11.33-.17.67-.17 1.03 0 .4.06.77.2 1.11zm11.232-2.497c1.05.26 1.545.88 1.483 1.854-.062.975-.63 1.524-1.704 1.647H5.8c-1.403-.185-2.092-.91-2.068-2.175.023-1.27.736-1.97 2.14-2.09.184-1.36.878-2.2 2.08-2.52 1.204-.33 2.228.04 3.075 1.12.29-.24.657-.34 1.1-.31.446.03.823.12 1.132.29.4.21.72.51.93.89.21.38.32.81.32 1.28z"
                          fill-rule="nonzero"
                        ></path></svg
                      ><span class="fr-sr-only"
                        >Insert from OneDrive</span
                      ></button
                    ><button
                      id="emoticons-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Emoticons"
                      class="fr-command fr-btn"
                      data-cmd="emoticons"
                      data-popup="true"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.991,3A9,9,0,1,0,21,12,8.99557,8.99557,0,0,0,11.991,3ZM12,19a7,7,0,1,1,7-7A6.99808,6.99808,0,0,1,12,19Zm3.105-5.2h1.503a4.94542,4.94542,0,0,1-9.216,0H8.895a3.57808,3.57808,0,0,0,6.21,0ZM7.5,9.75A1.35,1.35,0,1,1,8.85,11.1,1.35,1.35,0,0,1,7.5,9.75Zm6.3,0a1.35,1.35,0,1,1,1.35,1.35A1.35,1.35,0,0,1,13.8,9.75Z"
                        ></path></svg
                      ><span class="fr-sr-only">Emoticons</span>
                    </button>
                  </div>
                  <div class="fr-newline"></div>
                  <div
                    class="btn-group fr-btn-grp fr-float-left"
                    role="group"
                    aria-label="Button group with nested dropdown"
                  >
                    <button
                      style="
                        height: 31px;
                        padding-top: 5px;
                        margin-left: 7px;
                        margin-top: 9px;
                        border-right: 2px solid #0153c7 !important;
                      "
                      class="reply-send-mail-btn btn btn-xs btn-primary fr-bt"
                    >
                      Send
                    </button>
                    <div
                      class="btn-group"
                      role="group"
                      style="height: 31px; margin-top: 9px"
                    >
                      <button
                        id="sendMailMoreDrop"
                        style="border-right: 2px solid #0153c7 !important"
                        type="button"
                        class="btn btn-primary btn-xs dropdown-toggle px-2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></button>
                      <div
                        class="dropdown-menu sendMailDropdownMenu"
                        style="width: 30px !important"
                        aria-labelledby="sendMailMoreDrop"
                      >
                        <a
                          class="dropdown-item reply-send-mail-btn"
                          style="font-size: 14px"
                          href=""
                        >
                          Send and Close
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="fr-btn-grp fr-float-left">
                    <button
                      id="bold-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-pressed="false"
                      title="Bold (Ctrl+B)"
                      class="fr-command fr-btn"
                      data-cmd="bold"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.25,11.8h0A3.68,3.68,0,0,0,17,9a3.93,3.93,0,0,0-3.86-4H6.65V19h7a3.74,3.74,0,0,0,3.7-3.78V15.1A3.64,3.64,0,0,0,15.25,11.8ZM8.65,7h4.2a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61,2.23,2.23,0,0,1-.63.09H8.65Zm4.6,10H8.65V13h4.6a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61A2.23,2.23,0,0,1,13.25,17Z"
                        ></path></svg
                      ><span class="fr-sr-only">Bold</span></button
                    ><button
                      id="underline-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-pressed="false"
                      title="Underline (Ctrl+U)"
                      class="fr-command fr-btn"
                      data-cmd="underline"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19,20v2H5V20Zm-3-6.785a4,4,0,0,1-5.74,3.4A3.75,3.75,0,0,1,8,13.085V5.005H6v8.21a6,6,0,0,0,8,5.44,5.851,5.851,0,0,0,4-5.65v-8H16ZM16,5v0h2V5ZM8,5H6v0H8Z"
                        ></path></svg
                      ><span class="fr-sr-only">Underline</span></button
                    ><button
                      id="italic-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-pressed="false"
                      title="Italic (Ctrl+I)"
                      class="fr-command fr-btn"
                      data-cmd="italic"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.76,9h2l-2.2,10h-2Zm1.68-4a1,1,0,1,0,1,1,1,1,0,0,0-1-1Z"
                        ></path></svg
                      ><span class="fr-sr-only">Italic</span></button
                    ><button
                      id="moreText-4"
                      data-group-name="moreText-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="More Text"
                      class="fr-command fr-btn"
                      data-cmd="moreText"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.55,19h2l-5-14h-2l-5,14h2l1.4-4h5.1Zm-5.9-6,1.9-5.2,1.9,5.2Zm12.8,4.5a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,17.5Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,13.5Zm0-4A1.5,1.5,0,1,1,18.95,8,1.5,1.5,0,0,1,20.45,9.5Z"
                        ></path></svg
                      ><span class="fr-sr-only">More Text</span>
                    </button>
                  </div>
                  <div class="fr-btn-grp fr-float-left">
                    <button
                      id="moreParagraph-4"
                      data-group-name="moreParagraph-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="More Paragraph"
                      class="fr-command fr-btn"
                      data-cmd="moreParagraph"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.682,5a4.11,4.11,0,0,0-4.07,3.18,4,4,0,0,0,3.11,4.725h0l.027.005a3.766,3.766,0,0,0,.82.09v6h2V7h2V19h2V7h2V5ZM5.532,9a2,2,0,0,1,2-2v4A2,2,0,0,1,5.532,9Zm14.94,8.491a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,17.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,13.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,9.491Z"
                        ></path></svg
                      ><span class="fr-sr-only">More Paragraph</span>
                    </button>
                  </div>
                  <div class="fr-btn-grp fr-float-left">
                    <button
                      id="shareDraft-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Share"
                      class="fr-command fr-btn"
                      data-cmd="shareDraft"
                    >
                      <i class="fas fa-share" aria-hidden="true"></i
                      ><span class="fr-sr-only">Share</span></button
                    ><button
                      id="scheduleSend-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-controls="dropdown-menu-scheduleSend-4"
                      aria-expanded="false"
                      aria-haspopup="true"
                      title="Schedule Send"
                      class="fr-command fr-btn fr-dropdown"
                      data-cmd="scheduleSend"
                    >
                      <i class="fas fa-clock" aria-hidden="true"></i
                      ><span class="fr-sr-only">Schedule Send</span>
                    </button>
                    <div
                      id="dropdown-menu-scheduleSend-4"
                      class="fr-dropdown-menu"
                      role="listbox"
                      aria-labelledby="scheduleSend-4"
                      aria-hidden="true"
                    >
                      <div class="fr-dropdown-wrapper" role="presentation">
                        <div class="fr-dropdown-content" role="presentation">
                          <ul class="fr-dropdown-list" role="presentation">
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="scheduleSend"
                                data-param1="laterToday"
                                title="Later today in 3 hours"
                                >Later today in 3 hours</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="scheduleSend"
                                data-param1="tommorrow"
                                title="Tomorrow Wed 9 am"
                                >Tomorrow Wed 9 am</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="scheduleSend"
                                data-param1="nextMonday"
                                title="Next Monday 9am"
                                >Next Monday 9am</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="scheduleSend"
                                data-param1="oneWeek"
                                title="One Week Tue 2 pm"
                                >One Week Tue 2 pm</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="scheduleSend"
                                data-param1="oneMonth"
                                title="One Month"
                                >One Month</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="scheduleSend"
                                data-param1="custom"
                                title="Pick date &amp; Time"
                                >Pick date &amp; Time</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <button
                      id="savedReply-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert Saved Reply"
                      class="fr-command fr-btn"
                      data-cmd="savedReply"
                    >
                      <i class="fas fa-bookmark" aria-hidden="true"></i
                      ><span class="fr-sr-only"
                        >Insert Saved Reply</span
                      ></button
                    ><button
                      id="EasyCalendar-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-controls="dropdown-menu-EasyCalendar-4"
                      aria-expanded="false"
                      aria-haspopup="true"
                      title="EasyCalendar"
                      class="fr-command fr-btn fr-dropdown"
                      data-cmd="EasyCalendar"
                    >
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12pt"
                        height="12pt"
                        viewBox="0 0 200.000000 200.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                          fill="#000000"
                          stroke="none"
                        >
                          <path
                            d="M434 1980 c-194 -51 -338 -185 -402 -374 l-27 -81 0 -520 c0 -476 2 -525 18 -579 62 -199 204 -341 403 -403 54 -16 103 -18 579 -18 l520 0 80 27 c195 67 336 222 380 421 14 63 16 141 13 582 l-3 510 -26 67 c-71 182 -175 286 -358 357 l-66 26 -520 2 c-483 2 -525 1 -591 -17z m236 -390 c0 -109 2 -120 18 -120 29 0 42 21 42 67 l0 43 270 0 269 0 3 63 3 62 48 3 47 3 0 -120 c0 -99 3 -121 14 -121 21 0 46 40 46 72 0 26 1 27 32 16 17 -6 51 -30 74 -54 73 -73 75 -89 72 -561 -3 -398 -4 -409 -25 -449 -30 -57 -83 -100 -145 -119 -73 -21 -800 -22 -872 -1 -66 20 -110 57 -140 118 l-26 52 0 425 c0 394 2 429 19 466 23 50 74 99 124 120 l37 15 0 63 c0 35 3 67 7 70 3 4 24 7 45 7 l38 0 0 -120z"
                          ></path>
                          <path
                            d="M640 1312 c-33 -27 -39 -99 -10 -134 19 -24 29 -28 74 -28 70 0 86 18 86 93 0 46 -4 58 -22 71 -31 22 -100 20 -128 -2z"
                          ></path>
                          <path
                            d="M935 1305 c-33 -32 -35 -105 -5 -135 25 -25 105 -27 138 -4 31 21 32 114 2 144 -30 30 -103 28 -135 -5z"
                          ></path>
                          <path
                            d="M1230 1310 c-15 -15 -20 -33 -20 -70 0 -68 22 -90 90 -90 67 0 90 22 90 89 0 42 -4 53 -26 70 -36 28 -106 29 -134 1z"
                          ></path>
                          <path
                            d="M629 1003 c-8 -9 -14 -39 -14 -68 0 -71 14 -85 86 -85 74 0 89 14 89 85 0 71 -15 85 -89 85 -42 0 -62 -5 -72 -17z"
                          ></path>
                          <path
                            d="M926 998 c-9 -12 -16 -41 -16 -63 0 -65 20 -85 89 -85 74 0 91 17 91 87 0 67 -18 83 -93 83 -46 0 -58 -4 -71 -22z"
                          ></path>
                          <path
                            d="M634 699 c-29 -32 -26 -115 5 -140 29 -23 98 -25 129 -3 18 13 22 25 22 73 0 74 -17 91 -87 91 -38 0 -54 -5 -69 -21z"
                          ></path>
                          <path
                            d="M936 707 c-12 -9 -20 -31 -24 -65 -4 -44 -1 -54 21 -76 20 -20 36 -26 72 -26 62 0 85 24 85 90 0 67 -22 90 -88 90 -27 0 -56 -6 -66 -13z"
                          ></path>
                          <path
                            d="M1230 700 c-15 -15 -20 -33 -20 -70 0 -65 23 -90 84 -90 66 0 96 28 96 91 0 67 -23 89 -90 89 -37 0 -55 -5 -70 -20z"
                          ></path>
                        </g></svg
                      ><span class="fr-sr-only">EasyCalendar</span>
                    </button>
                    <div
                      id="dropdown-menu-EasyCalendar-4"
                      class="fr-dropdown-menu"
                      role="listbox"
                      aria-labelledby="EasyCalendar-4"
                      aria-hidden="true"
                    >
                      <div class="fr-dropdown-wrapper" role="presentation">
                        <div class="fr-dropdown-content" role="presentation">
                          <ul class="fr-dropdown-list" role="presentation">
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="EasyCalendar"
                                data-param1="Connect"
                                title="Connect EasyCalendar"
                                >Connect EasyCalendar</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <button
                      id="hcArticle-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert Help Center Article"
                      class="fr-command fr-btn"
                      data-cmd="hcArticle"
                    >
                      <i class="fas fa-book" aria-hidden="true"></i
                      ><span class="fr-sr-only"
                        >Insert Help Center Article</span
                      ></button
                    ><button
                      id="attach-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert Attachment"
                      class="fr-command fr-btn"
                      data-cmd="attach"
                    >
                      <i class="fas fa-paperclip" aria-hidden="true"></i
                      ><span class="fr-sr-only">Insert Attachment</span></button
                    ><button
                      id="insertImage-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert Image (Ctrl+P)"
                      class="fr-command fr-btn"
                      data-cmd="insertImage"
                      data-popup="true"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z"
                        ></path></svg
                      ><span class="fr-sr-only">Insert Image</span></button
                    ><button
                      id="insertLink-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert Link (Ctrl+K)"
                      class="fr-command fr-btn"
                      data-cmd="insertLink"
                      data-popup="true"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11,17H7A5,5,0,0,1,7,7h4V9H7a3,3,0,0,0,0,6h4ZM17,7H13V9h4a3,3,0,0,1,0,6H13v2h4A5,5,0,0,0,17,7Zm-1,4H8v2h8Z"
                        ></path></svg
                      ><span class="fr-sr-only">Insert Link</span></button
                    ><button
                      id="gdrive-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Insert from Google Drive"
                      class="fr-command fr-btn"
                      data-cmd="gdrive"
                    >
                      <i class="fab fa-google-drive"></i
                      ><span class="fr-sr-only"
                        >Insert from Google Drive</span
                      ></button
                    ><button
                      id="moreRich-4"
                      data-group-name="moreRich-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="More Rich"
                      class="fr-command fr-btn"
                      data-cmd="moreRich"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5,13h-6v6h-2V13h-6V11h6V5h2v6h6Zm5,4.5A1.5,1.5,0,1,1,20,16,1.5,1.5,0,0,1,21.5,17.5Zm0-4A1.5,1.5,0,1,1,20,12,1.5,1.5,0,0,1,21.5,13.5Zm0-4A1.5,1.5,0,1,1,20,8,1.5,1.5,0,0,1,21.5,9.5Z"
                        ></path></svg
                      ><span class="fr-sr-only">More Rich</span>
                    </button>
                  </div>
                  <div class="fr-btn-grp fr-float-left">
                    <button
                      id="moreBtn-4"
                      type="button"
                      tabindex="-1"
                      role="button"
                      aria-controls="dropdown-menu-moreBtn-4"
                      aria-expanded="false"
                      aria-haspopup="true"
                      title="More"
                      class="fr-command fr-btn fr-dropdown"
                      data-cmd="moreBtn"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5,17c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,16.2,13.5,17z M13.5,12c0,0.8-0.7,1.5-1.5,1.5 s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,11.2,13.5,12z M13.5,7c0,0.8-0.7,1.5-1.5,1.5S10.5,7.8,10.5,7s0.7-1.5,1.5-1.5 S13.5,6.2,13.5,7z"
                        ></path></svg
                      ><span class="fr-sr-only">More</span>
                    </button>
                    <div
                      id="dropdown-menu-moreBtn-4"
                      class="fr-dropdown-menu"
                      role="listbox"
                      aria-labelledby="moreBtn-4"
                      aria-hidden="true"
                    >
                      <div class="fr-dropdown-wrapper" role="presentation">
                        <div class="fr-dropdown-content" role="presentation">
                          <ul class="fr-dropdown-list" role="presentation">
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="moreBtn"
                                data-param1="saveCurrentFont"
                                title="Save current Font"
                                >Save current Font</a
                              >
                            </li>
                            <li role="presentation">
                              <a
                                class="fr-command"
                                tabindex="-1"
                                role="option"
                                data-cmd="moreBtn"
                                data-param1="resetToDefaults"
                                title="Reset to Default"
                                >Reset to Default</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <button
                      id="discardReplyDraft-4"
                      @click="cancelReply"
                      type="button"
                      tabindex="-1"
                      role="button"
                      title="Discard Draft"
                      class="fr-command fr-btn"
                      data-cmd="discardReplyDraft"
                    >
                      <svg
                        class="fr-svg"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z"
                        ></path></svg
                      ><span class="fr-sr-only">Discard Draft</span>
                    </button>
                  </div>
                </div>
              </div> -->
              <form class="form">
                  <froala :tag="'textarea'" :config="config" v-model="mail_body" name="mail_body"></froala>
                  <button @click.stop.prevent="sendMail" class="btnn btn btn-sm btn-primary fr-bt" type="submit">Send</button>
                  <!-- <button style="height: 31px;position:absolute;right:0px;padding-top: 5px;margin-right:30px;margin-top: 9px;z-index:999999" class="btn btn-sm btn-primary fr-float-right fr-bt" id="reply-push-btn">Send</button> -->
              </form>
            </div>
            <input
              type="file"
              style="display: none"
              name="files[]"
              class="reply-multiFiles"
              multiple=""
            />
          </div>
          <div class="replyViewOnly"></div>
          <div
            class="replyLockMessage align-items-center justify-content-center"
          >
            <div
              role="alert"
              class="alert alert-warning text-center rounded w-50"
            ></div>
          </div>
          <div class="reply-attachment-list"></div>
          <!-- <div class="replyPoppedOutWrapper tx-12">
            You're editing this draft somewhere else.
            <br />
            Open
            <span
              ><button class="px-0 btn-link btn popinReply">here</button></span
            >
          </div> -->
        </div>
      </div>
    </div>
</template>

<script>
import { bus } from "../../../main";
import FroalaEditor from 'froala-editor';
import VueTagsInput from '@vojtechlanka/vue-tags-input';
import axios from 'axios';
import _ from 'underscore'
export default {
    name: 'MailContentReply',
    components: {VueTagsInput, FroalaEditor},
    data() {
        const self = this;
        return {
            display: 'none',
            fromOptions: [
              {id: 1, name: "Masood", email: "vibhor@saaslabs.co"},
              {id: 2, name: "Vibhor Agrawal", email: "vibhor@helpwise.io"}
            ],
            fromSelected: {id: 1, name: "Masood", email: "vibhor@saaslabs.co"},
            tagTo: '',
            tagsTo: [],
            autocompleteItemsTo: [],
            tagCC: '',
            tagsCC: [],
            autocompleteItemsCC: [],
            tagBCC: '',
            tagsBCC: [],
            autocompleteItemsBCC: [],
            validation: [{
              classes: 'invalid-email',
              rule: tag => this.check(tag) 
            }],
            debounce: null,
            message: "New Message",
            subject: "",
            mail_body: "",
            noTo: false,
            toNotValid: false,
            ccNotValid: false,
            bccNotValid: false,
            isCC: false,
            isBCC: false,
            draftID: null,
            threadID: null,
            editorInstance: null,
            config: {
              events: {
                initialized: async function() {
                  var editor = this;
                  self.editorInstance = this;
                  console.log('initialized');
                },
              },
              enter: FroalaEditor.ENTER_DIV,
              placeholderText: "Type something",
              charCounterCount: false,
              toolbarBottom: true,
              height: '320px',
              toolbarButtons: [['bold', 'italic', 'underline', 'strikeThrough', 'insertHR'], ['undo', 'redo', 'selectAll']],
            },
        };
    },
    props: {
      thread: Object
    },
    watch: {
        'tagTo': 'initItemsTo',
        'tagCC': 'initItemsCC',
        'tagBCC': 'initItemsBCC',
        'tagsTo': 'saveDraft',
        'tagsCC': 'saveDraft',
        'tagsBCC': 'saveDraft',
        'fromSelected': 'saveDraft',
        mail_body: function () {
          var self = this;
          clearTimeout(this.myGreeting);
          this.myGreeting = setTimeout(this.saveDraft, 2000); 
        },
    },
    created() {
        bus.$on('replyy', (data) => {
            this.display = 'block';
        });
    },
    methods: {
        cancelReply() {
            this.display = 'none';
            this.isCC = false;
            this.isBCC = false;
            this.tagTo = '';
            this.tagCC = '';
            this.tagBCC = '';
            this.tagsTo = [];
            this.tagsCC = [];
            this.tagsBCC = [];
            this.autocompleteItemsTo = [];
            this.autocompleteItemsCC = [];
            this.autocompleteItemsBCC = [];
            this.toNotValid = false;
            this.ccNotValid = false;
            this.bccNotValid = false;
            this.subject = "";
            this.threadID = null;
            this.draftID = null;
            this.message = "New Message";
            this.mail_body = "";
            this.fromSelected = {id: 1, name: "Masood", email: "vibhor@saaslabs.co"};
        },
        myGreeting() {
          setTimeout(this.saveDraft, this.doneTypingInterval);
        },
        createBody(prop) {
          let from = {};
          from[this.fromSelected.email] = this.fromSelected.name;
          let to = {};
          let bcc = {};
          let cc = {};
          let files = [];
          for(let i = 0; i < this.tagsTo.length; i++) {
            if(this.tagsTo[i].name == undefined) {
              to[this.tagsTo[i].email] = this.tagsTo[i].email;
            } else {
              to[this.tagsTo[i].email] = this.tagsTo[i].name;
            }
          }
          for(let i = 0; i < this.tagsBCC.length; i++) {
            if(this.tagsBCC[i].name == undefined) {
              bcc[this.tagsBCC[i].email] = this.tagsBCC[i].email;
            } else {
              bcc[this.tagsBCC[i].email] = this.tagsBCC[i].name;
            }
          }
          for(let i = 0; i < this.tagsCC.length; i++) {
            if(this.tagsCC[i].name == undefined) {
              cc[this.tagsCC[i].email] = this.tagsCC[i].email;
            } else {
              cc[this.tagsCC[i].email] = this.tagsCC[i].name;
            }
          }
          let html = this.mail_body;
          var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
          html = html.replace(re1, ""); //执行替换成空字符
          let body;
          if(this.threadID == null) {
            body = {
              mailboxID: this.$route.params.mailboxId, 
              bcc, 
              cc, 
              files, 
              from, 
              subject: this.subject, 
              to,
            }
          } else {
            body = {
              mailboxID: this.$route.params.mailboxId, 
              bcc, 
              cc, 
              files, 
              from, 
              subject: this.subject, 
              to,
              threadID: this.threadID,
              draftID: this.draftID
            }
          }
          let text = html.replace(/(<([^>]+)>)/gi, "");
          console.log(text);
          html && (body.html = `<div class=\"hwEmailWrapper\" style=\"font-family:sans-serif;font-size:0.875rem;color:#001737\">${html}</div>`);
          text && (body.text = text);
          if(prop == "send") {
            body.archive = false;
          }
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: 'include'
          };
          console.log(requestOptions.body);
          return requestOptions;
        },
        saveDraft() {
          
          if(this.tagsTo.length > 0 || this.tagsCC.length > 0 || this.tagsBCC.length > 0 || this.subject || this.mail_body) {
            this.message = "Saving Draft"
            let requestOptions = this.createBody("draft");
            fetch(this.$apiBaseURL + "saveDraft.php", requestOptions)
          .then(async response => { 
              const data = await response.json();
              if(data.status !== "success") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.draftID = data.data.draftID;
              this.threadID = data.data.threadID;
              if(this.subject !== "") {
                this.message = this.subject;
              } else {
                this.message = "Draft Saved";
              }
            }).catch(error => {
            alert(error);
          })
          }
          
        },
        showCC() {
          this.isCC = true
        },
        showBCC() {
          this.isBCC = true
        },
        check(tag) {
          console.log(tag);
          if(tag.email == undefined) {
            return !(/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/).test(tag.text);
          } else {
            return !(/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/).test(tag.email);
          }
        },
        updateTo(newTags) {
          console.log(newTags);
          this.autocompleteItemsTo = [];
          for(let i = 0; i < newTags.length; i++) {
            if(newTags[i].email == undefined) {
              newTags[i].email = newTags[i].text;
            }
          }
          this.tagsTo = newTags;
          this.noTo = false;
          this.toNotValid = false;
          console.log(this.tagsTo);
        },
        updateCC(newTags) {
          this.autocompleteItemsCC = [];
          for(let i = 0; i < newTags.length; i++) {
            if(newTags[i].email == undefined) {
              newTags[i].email = newTags[i].text;
            }
          }
          this.tagsCC = newTags;
          this.ccNotValid = false;
          console.log(this.tagsCC);
        },
        updateBCC(newTags) {
          this.autocompleteItemsBCC = [];
          for(let i = 0; i < newTags.length; i++) {
            if(newTags[i].email == undefined) {
              newTags[i].email = newTags[i].text;
            }
          }
          this.tagsBCC = newTags;
          this.bccNotValid = false;
          console.log(this.tagsBCC);
        },
        initItemsTo() {
          if (this.tagTo.length < 2) return;
          const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagTo}`;
          console.log("starting");
          clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            axios.get(url, {withCredentials: true}).then(response => {
              console.log(response.data.data.contacts);
              this.autocompleteItemsTo = response.data.data.contacts.map(a => {
                let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`
                return { text: a.name + " (" + a.email + ")", id: a.id, email: a.email, name: a.name !== "" ? a.name : a.email, icon: icon };
              });
            }).catch(() => console.warn('Oh. Something went wrong'));
          }, 600);
        },
        initItemsCC() {
          if (this.tagCC.length < 2) return;
          const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagCC}`;
          console.log("starting");
          clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            axios.get(url, {withCredentials: true}).then(response => {
              console.log(response.data.data.contacts);
              this.autocompleteItemsCC = response.data.data.contacts.map(a => {
                let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`
                return { text: a.name + " " + a.email, id: a.id, email: a.email, name: a.name, icon: icon };
              });
            }).catch(() => console.warn('Oh. Something went wrong'));
          }, 600);
        },
        initItemsBCC() {
          if (this.tagBCC.length < 2) return;
          const url = `https://app.helpwise.io/api/contacts/autocomplete.php?q=${this.tagBCC}`;
          console.log("starting");
          clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            axios.get(url, {withCredentials: true}).then(response => {
              console.log(response.data.data.contacts);
              this.autocompleteItemsBCC = response.data.data.contacts.map(a => {
                let icon = `<div class="d-flex align-items-center justify-content-start">
                            <div class="avatar avatar-xs">
                                ${a.avatarTag}
                            </div>
                            <div class="ml-2">
                                <div style="font-weight:500">${a.name}</div>
                                <div>${a.email}</div>
                            </div>
                        </div>`
                return { text: a.name + " " + a.email, id: a.id, email: a.email, name: a.name, icon: icon };
              });
            }).catch(() => console.warn('Oh. Something went wrong'));
          }, 600);
        },
        sendMail() {
          console.log("sendin");
          if(this.tagsTo.length == 0) {
            this.noTo = true;
            return;
          }
          for(let i = 0; i < this.tagsTo.length; i++) {
            if(this.tagsTo[i].tiClasses.includes("ti-invalid")) {
              this.noTo = false;
              this.toNotValid = true;
              break;
            }
          }
          for(let i = 0; i < this.tagsCC.length; i++) {
            if(this.tagsCC[i].tiClasses.includes("ti-invalid")) {
              this.ccNotValid = true;
              break;
            }
          }
          for(let i = 0; i < this.tagsBCC.length; i++) {
            if(this.tagsBCC[i].tiClasses.includes("ti-invalid")) {
              this.bccNotValid = true;
              break;
            }
          }
          if(this.toNotValid || this.ccNotValid || this.bccNotValid) return;
          let requestOptions = this.createBody("send");
          console.log(requestOptions.body);
          fetch(this.$apiBaseURL + "sendMail.php", requestOptions)
          .then(async response => { 
              const data = await response.json();
              if(data.status !== "success") {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.closeCompose();
            }).catch(error => {
            alert(error);
          })
        }
    },
}
</script>

<style>

</style>