<template>
    <div class="d-flex flex-column" style="background-color:#f4f4f4;padding-top:1px;width:100%;">
        <div id="comment-attachment-list" class="d-flex flex-wrap" style="max-width: 73%;"></div>
        <div class="comments-editor-wrapper card d-flex flex-row justify-content-start align-items-center pd-t-10 pd-b-10" style="border-left: none;border-radius: 0%;padding-right: 10px;background-color:#ffffff;" id="comments-editor-13627145">

            <div style="margin-left:10px;width:81%;">
                <div class="form-control" id="comment-inputbox" placeholder="Add your notes here..." contenteditable="true" onkeyup="auto_grow(this)" style="overflow: auto;padding: 2px;resize: none;font-size: 11pt;min-height: 50px;max-height:100px;background: rgb(254, 246, 216);color:#000000;" data-tribute="true"></div>
            </div>
            <div style="margin-left:5px;">
                <svg onclick="$('#comment-multiFiles').click()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48">
                    </path>
                </svg>
                <input type="file" style="display: none" name="files[]" id="comment-multiFiles" multiple="">
            </div>
            <div style="margin-left:5px;">
                <button type="button" id="comment-push-btn" class="btn btn-outline-primary" style="font-size: 13px;padding-top: 2px;padding-bottom:2px;border-radius: 0.25rem;">Add note</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MailContentAddNote'
}
</script>

<style>

</style>