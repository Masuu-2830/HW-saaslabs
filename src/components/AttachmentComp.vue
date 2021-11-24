<template>
    <div class="attachmentContainer">
        <span
            class="d-flex justify-content-start attachment align-items-center rounded mt-1 mb-1 hwFileAttach"
            v-for="(attachment, id) in attachments"
            :key="attachment.id"
            :id="`attachment-${id}`"
        >
            <div class="progress" :class="{complete: attachment.isUploaded == true || attachment.isUploaded == undefined}" style="padding: 11px;background-color: #e2e2e2;" :style="attachment.progress == undefined ? 'width:100%' : 'width:'+attachment.progress+'%;'">
                <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span class="d-flex justify-content-between"  data-toggle="tooltip" :title="getFileNameAndSize(attachment.filename, attachment.filesize)" data-placement="top" style="width: 80%;margin-left: 5px;position:absolute;">
                <span v-html="getFileIcon(attachment.extension, attachment.filesize)"></span>
                <span style="overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:auto">
                    {{attachment.filename}}
                </span>
                
            </span>
            <span class="delete-comment-attachment" @click="deleteAttachment(attachment.id)" style="margin-left: 5px;margin-right: 5px;cursor:pointer;right: 0px;position:absolute;">
                <i class="far fa-times-circle"></i>
            </span>
        </span>
    </div>
</template>

<script>
    import { bus } from "../main"
    export default {
        props:["attachments"],
        methods:{
            humanFileSize: function(bytes, si) {
                var thresh = si ? 1000 : 1024;
                if (Math.abs(bytes) < thresh) {
                    return bytes + " B";
                }
                var units = si ? 
                    ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : 
                    ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
                var u = -1;
                do {
                    bytes /= thresh;
                    ++u;
                } while (Math.abs(bytes) >= thresh && u < units.length - 1);
                return bytes.toFixed(1) + " " + units[u];
            },
            getFileIcon(extension, size) {
                console.log(extension, size)
                let iconStyle = "";
                if (size) {
                    iconStyle = `style="height:${size}px;width:${size}px;"`;
                }

                let ext = extension.toString().toLowerCase();
                return `<span ${iconStyle} class="fiv-viv fiv-icon-blank fiv-icon-${ext}"></span>`;
            },
            deleteAttachment: function(id){
                console.log("delete Attachment", id);
                bus.$emit("deleteAttachmentUpload", id);
            },
            getFileNameAndSize: function(name, size){
                return `${name} (${this.humanFileSize(size)})`;
            }
        }
    }
</script>

<style scoped>
    .attachmentContainer{
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .progress.complete{
        background: rgba(0, 255, 0, 0.3) !important;
    }

    .hwFileAttach{
        width: 200px;
        border: 1px solid #e2e2e2;
        margin-left: 10px;
        position: relative;
    }
</style>