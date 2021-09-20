<template>
  <div class="d-flex flex-column editor_container" id="threadEditorContainer">
    <!-- <div
      id="threadEditor"
      class="mg-b-10 mg-x-20 fr-box fr-basic fr-bottom reply-mode"
      role="application"
      style="z-index: 1000; box-shadow: none"
    >
      <div
        class="fr-wrapper show-placeholder"
        dir="auto"
        style="
          max-height: 290px;
          overflow: auto;
          border: 1px solid rgb(204, 204, 204);
          margin-top: 10px;
          background-color: rgb(255, 255, 255);
        "
      >
        <ul
          class="nav nav-line flex-row mg-l-20 mg-b-10"
          role="tablist"
          style="
            margin-top: 5px;
            margin-bottom: 5px;
            border-bottom: none !important;
          "
          id="tabsInThreadEditor"
        >
          <li class="nav-item">
            <a
              class="nav-link active reply-tab"
              data-toggle="tab"
              href="#reply-editor-tab"
              role="tab"
              aria-controls="reply-editor-tab"
              aria-selected="false"
              >Reply</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link notes-tab"
              data-toggle="tab"
              href="#notes-editor-tab"
              role="tab"
              aria-controls="notes-editor-tab"
              aria-selected="true"
              >Note</a
            >
          </li>
        </ul>
        <div
          class="fr-element fr-view"
          dir="auto"
          contenteditable="true"
          aria-disabled="false"
          style="min-height: 100px"
          spellcheck="true"
        >
          <br />
        </div>
        <span
          class="fr-placeholder"
          style="
            font-size: 14px;
            line-height: 22.4px;
            padding-top: 20px;
            padding-left: 20px;
            margin-left: 0px;
            padding-right: 20px;
            margin-right: 0px;
            text-align: left;
            margin-top: 47px;
          "
          >Type your Reply here.. You can also use # to insert Saved
          Replies</span
        >
        <div class="row w-100 mx-0" id="reply-attachment-list"></div>
        <div class="row w-100 mx-0 d-none" id="note-attachment-list"></div>
      </div>
      <div class="fr-btn-grp">
        <button
          style="
            height: 31px;
            position: absolute;
            right: 0px;
            padding-top: 5px;
            margin-right: 30px;
            margin-top: 9px;
            z-index: 999999;
          "
          class="btn btn-sm btn-primary fr-float-right fr-bt d-none"
          id="note-push-btn"
        >
          Add Note
        </button>
      </div>
      <div class="fr-btn-grp">
        <button
          style="
            height: 31px;
            position: absolute;
            right: 0px;
            padding-top: 5px;
            margin-right: 30px;
            margin-top: 9px;
            z-index: 999999;
          "
          class="btn btn-sm btn-primary fr-float-right fr-bt"
          id="reply-push-btn"
        >
          Send
        </button>
      </div>
      <div
        class="fr-toolbar fr-desktop fr-bottom fr-basic fr-sticky-off"
        style="
          z-index: 1001;
          background-color: rgb(255, 255, 255);
          border: 1px solid rgb(204, 204, 204);
          bottom: 0px;
        "
        data-sticky-offset="true"
        data-top="auto"
        data-bottom="0px"
      >
        <div
          class="fr-more-toolbar"
          data-name="moreText-1"
          style="padding-left: 36px"
        >
          <button
            id="textColor-1"
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
            id="fontFamily-1"
            type="button"
            tabindex="-1"
            role="button"
            aria-controls="dropdown-menu-fontFamily-1"
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
            id="dropdown-menu-fontFamily-1"
            class="fr-dropdown-menu"
            role="listbox"
            aria-labelledby="fontFamily-1"
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
                      style="font-family: Arial, Helvetica, sans-serif"
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
                      style="font-family: Impact, Charcoal, sans-serif"
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
                      data-param1="Times New Roman,Times,serif,-webkit-standard"
                      style="
                        font-family: Times New Roman, Times, serif,
                          -webkit-standard;
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
                </ul>
              </div>
            </div>
          </div>
          <button
            id="backgroundColor-1"
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
            id="fontSize-1"
            type="button"
            tabindex="-1"
            role="button"
            aria-controls="dropdown-menu-fontSize-1"
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
            id="dropdown-menu-fontSize-1"
            class="fr-dropdown-menu"
            role="listbox"
            aria-labelledby="fontSize-1"
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
        </div>
        <div
          class="fr-more-toolbar"
          data-name="moreParagraph-1"
          style="padding-left: 59px"
        >
          <button
            id="alignRight-1"
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
            id="alignJustify-1"
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
              id="formatOL-1"
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
              id="formatOLOptions-1"
              type="button"
              tabindex="-1"
              role="button"
              aria-controls="dropdown-menu-formatOLOptions-1"
              aria-expanded="false"
              aria-haspopup="true"
              title="Ordered List"
              class="fr-command fr-btn fr-dropdown fr-options"
              data-cmd="formatOLOptions"
            ></button>
            <div
              id="dropdown-menu-formatOLOptions-1"
              class="fr-dropdown-menu"
              role="listbox"
              aria-labelledby="formatOLOptions-1"
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
              id="formatUL-1"
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
              id="formatULOptions-1"
              type="button"
              tabindex="-1"
              role="button"
              aria-controls="dropdown-menu-formatULOptions-1"
              aria-expanded="false"
              aria-haspopup="true"
              title="Unordered List"
              class="fr-command fr-btn fr-dropdown fr-options"
              data-cmd="formatULOptions"
            ></button>
            <div
              id="dropdown-menu-formatULOptions-1"
              class="fr-dropdown-menu"
              role="listbox"
              aria-labelledby="formatULOptions-1"
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
            id="paragraphFormat-1"
            type="button"
            tabindex="-1"
            role="button"
            aria-controls="dropdown-menu-paragraphFormat-1"
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
            id="dropdown-menu-paragraphFormat-1"
            class="fr-dropdown-menu"
            role="listbox"
            aria-labelledby="paragraphFormat-1"
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
                        border: 0 !important;
                        background-color: transparent !important;
                        font-size: 15px;
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
                        border: 0 !important;
                        background-color: transparent !important;
                        font-weight: bold !important;
                        font-size: 2em !important;
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
                        border: 0 !important;
                        background-color: transparent !important;
                        font-weight: bold !important;
                        font-size: 1.5em !important;
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
                        border: 0 !important;
                        background-color: transparent !important;
                        font-weight: bold !important;
                        font-size: 1.17em !important;
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
                        border: 0 !important;
                        background-color: transparent !important;
                        font-weight: bold !important;
                        font-size: 15px !important;
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
                        border: 0 !important;
                        background-color: transparent !important;
                        font-size: 15px;
                      "
                      role="presentation"
                    ><a class="fr-command" tabindex="-1" role="option" data-cmd="paragraphFormat" data-param1="PRE" title="Code">Code</a></pre>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button
            id="quote-1"
            type="button"
            tabindex="-1"
            role="button"
            aria-controls="dropdown-menu-quote-1"
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
            id="dropdown-menu-quote-1"
            class="fr-dropdown-menu"
            role="listbox"
            aria-labelledby="quote-1"
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
                      >Increase<span class="fr-shortcut">Ctrl+'</span></a
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
                      >Decrease<span class="fr-shortcut">Ctrl+Shift+'</span></a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button
            id="insertTable-1"
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
        <div class="fr-more-toolbar" data-name="moreRich-1"></div>
        <div class="fr-newline"></div>
        <div class="fr-btn-grp fr-float-left">
          <button
            id="bold-1"
            type="button"
            tabindex="-1"
            role="button"
            aria-pressed="false"
            class="fr-command fr-btn"
            data-cmd="bold"
            data-title="Bold (Ctrl+B)"
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
            id="underline-1"
            type="button"
            tabindex="-1"
            role="button"
            aria-pressed="false"
            class="fr-command fr-btn"
            data-cmd="underline"
            data-title="Underline (Ctrl+U)"
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
            id="italic-1"
            type="button"
            tabindex="-1"
            role="button"
            aria-pressed="false"
            class="fr-command fr-btn"
            data-cmd="italic"
            data-title="Italic (Ctrl+I)"
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
            id="moreText-1"
            data-group-name="moreText-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="moreText"
            data-title="More Text"
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
            id="alignLeft-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="alignLeft"
            data-title="Align Left"
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
            id="alignCenter-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="alignCenter"
            data-title="Align Center"
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
            id="moreParagraph-1"
            data-group-name="moreParagraph-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="moreParagraph"
            data-title="More Paragraph"
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
            id="attachThreadEditor-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="attachThreadEditor"
            data-title="Insert Attachment"
          >
            <i class="fas fa-paperclip" aria-hidden="true"></i
            ><span class="fr-sr-only">Insert Attachment</span></button
          ><button
            id="insertImage-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="insertImage"
            data-popup="true"
            data-title="Insert Image (Ctrl+P)"
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
            id="insertLink-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="insertLink"
            data-popup="true"
            data-title="Insert Link (Ctrl+K)"
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
            id="savedReply-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="savedReply"
            data-title="Insert Saved Reply"
          >
            <i class="fas fa-bookmark" aria-hidden="true"></i
            ><span class="fr-sr-only">Insert Saved Reply</span></button
          ><button
            id="hcArticle-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="hcArticle"
            data-title="Insert Help Center Article"
          >
            <i class="fas fa-book" aria-hidden="true"></i
            ><span class="fr-sr-only">Insert Help Center Article</span></button
          ><button
            id="emoticons-1"
            type="button"
            tabindex="-1"
            role="button"
            class="fr-command fr-btn"
            data-cmd="emoticons"
            data-popup="true"
            data-title="Emoticons"
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
      </div>
      <div class="fr-sticky-dummy" style="height: 46px"></div>
    </div> -->
    <div style="padding: 10px 20px;background-color: white;">
        <ul class="nav nav-tabs" style="cursor: pointer">
        <li class="nav-item">
            <a href="#" class="nav-link" @click="advanceTab(1)" :class="{'active': current == 'reply'}">
            Reply
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" @click="advanceTab(2)" :class="{'active': current == 'note'}">
            Note
            </a>
        </li>
        </ul>
        <div class="tab-content border-0">
        <div class="tab-form">
            <div class="from-group">
            <form class="form">
                    <froala :tag="'textarea'" :config="config"></froala>
                    <button class="btnn btn btn-sm btn-primary fr-bt" type="submit">Send</button>
                    <!-- <button style="height: 31px;position:absolute;right:0px;padding-top: 5px;margin-right:30px;margin-top: 9px;z-index:999999" class="btn btn-sm btn-primary fr-float-right fr-bt" id="reply-push-btn">Send</button> -->
            </form>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import FroalaEditor from 'froala-editor';
// import VueTribute from "vue-tribute";
import Tribute from "tributejs";

FroalaEditor.DefineIcon('my_dropdown', {NAME: 'cog', SVG_KEY: 'cogs'});
FroalaEditor.RegisterCommand('my_dropdown', {
    title: 'Advanced options',
    type: 'dropdown',
    focus: false,
    undo: false,
    refreshAfterCallback: true,
    options: {
      'v1': 'Option 1',
      'v2': 'Option 2'
    },
    callback: function (cmd, val) {
      this.html.insert(val);
    },
    refreshOnShow: function ($btn, $dropdown) {
      console.log ('do refresh when show');
    }
  });
FroalaEditor.DefineIcon('clear', {NAME: 'remove', SVG_KEY: 'remove'});
FroalaEditor.RegisterCommand('clear', {
    title: 'Clear HTML',
    focus: false,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      this.html.set('');
      this.events.focus();
    }
  });

FroalaEditor.DefineIcon('insert', {NAME: 'plus',  SVG_KEY: 'add'});
FroalaEditor.RegisterCommand('insert', {
    title: 'Insert HTML',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      this.html.insert('Regards');
    }
  });
export default {
  name: "ChatContentReply",
  components: {
    // VueTribute,
    FroalaEditor
  },
  data() {
    const self = this;
    // console.log(self.callApi());
    return {
    //   message: '',
      current: 'reply',
    //   messages: [],
      editorInstance: null,
      config: {
        events: {
          initialized: async function() {
            var editor = this;
            self.editorInstance = this;
            let tribute1 = await self.callApi();
            tribute1.attach(editor.el);

            editor.events.on('keydown', function(e) {
              if (e.which == FroalaEditor.KEYCODE.ENTER && tribute1.isActive) {
                return false;
              }
            }, true);
            console.log('initialized');
          },
          focus: async function() {
            var editor = this;
            console.log("cre")
            let tribute1 = await self.callApi();
            let tribute2 = await self.callApi1();
            if(self.current == 'note') {
              tribute1.detach(editor.el);
              tribute2.attach(editor.el);
              console.log('Attaching 2');

              editor.events.on('keydown', function(e) {
                if (e.which == FroalaEditor.KEYCODE.ENTER && tribute2.isActive) {
                  return false;
                }
              }, true);
            } else {
              tribute2.detach(editor.el)
              tribute1.attach(editor.el);
              console.log('Attaching 1');

              editor.events.on('keydown', function(e) {
                if (e.which == FroalaEditor.KEYCODE.ENTER && tribute1.isActive) {
                  return false;
                }
              }, true);
            }
          }
        },
        placeholderText: "Edit Your Reply Here!",
        charCounterCount: false,
        toolbarBottom: true,
        height: '150px',
        toolbarButtons: [['bold', 'italic', 'underline', 'strikeThrough', 'insertHR'], ['my_dropdown', 'clear', 'insert'], ['undo', 'redo', 'selectAll']],
      },
    };
  },
  methods: {
    async callApi() {
        console.log("calling api 1");
        const response = await fetch(this.$apiBaseURL + "get-teammates.php?mailboxID=" + this.$route.params.mailboxId, {credentials: 'include'});
        const data = await response.json();
        console.log(data);
        return this.createTribute(data);
    },
    async callApi1() {
      console.log("calling api 2");
      const response = await fetch(this.$apiBaseURL + "get-teammates.php?mailboxID=" + this.$route.params.mailboxId, {credentials: 'include'});
      const data = await response.json();
      console.log(data);
      return this.createTribute1(data.data.teammates);
    },
    createTribute(data) {
      console.log("creating tribute 1");
    //   console.log(this.editorInstance);
        var tribute = new Tribute({
          trigger: '#',
          values: data,
          lookup: 'username',
          fillAttr: 'firstname',
          selectTemplate: function(item) {
            return `<span contenteditable="false" class="mention-h fr-deletable fr-tribute">#` + item.original.firstname + "</span>"
          },
          noMatchTemplate: function () {
            return '<span style:"visibility: hidden;"></span>';
          },
        });
        console.log(tribute);
      return tribute;
    },
    createTribute1(data) {
      console.log("creating tribute 2");
        var tribute = new Tribute({
          collection: [
            {
              trigger: '@',
              values: [
                        { key: 'masood', value: 'Masood' },
                        { key: 'kunal', value: 'Kunal Kumar' },
                        { key: 'gatti', value: 'Gatti Ramya' },
                        { key: 'mayank', value: 'Mayank Banga' },
                        { key: 'ayush', value: 'Ayush Rastogi' },
                        { key: 'vibhor', value: 'Vibhor Agarwal' }
                      ],
              selectTemplate: function(item) {
                return `<span contenteditable="false" class="mention fr-deletable fr-tribute">@` +
                        item.original.value +
                        "</span>"
              },
              noMatchTemplate: function () {
                return '<span style:"visibility: hidden;"></span>';
              }
            },
            {
              trigger: '#',
              values: data,
              lookup: 'username',
              fillAttr: 'firstname',
              selectTemplate: function(item) {
                return `<span contenteditable="false" class="mention-h fr-deletable fr-tribute">#` + item.original.firstname + "</span>"
              },
              noMatchTemplate: function () {
                return '<span style:"visibility: hidden;"></span>';
              }
            }
          ]
        });
      return tribute;
    },
      advanceTab(props) {
      if(props == 1) {
        this.current = 'reply';
      } else {
        this.current = 'note';
      }
      console.log(this.current);
    }
  }
};
</script>

<style>
.form {
  bottom: 0%;
}

.mention {
  color: #009be5 !important;
  background-color: #dbf2ff !important;
  padding: 0 4px;
}

.mention-h {
  color: blue !important;
  background-color: #dbf2ff !important;
  padding: 0 4px;
}
.btnn {
  font-size: 14px;
  color: white;
  /* padding: 7px; */
  width: 70px;
  border-radius: 5px;
  cursor: pointer;

  float: right;
  bottom: 17px;
  position: absolute;
  right: 100px;
}

.active {
    color: blue;
}

</style>