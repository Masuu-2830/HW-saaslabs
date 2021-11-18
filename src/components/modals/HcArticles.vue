<template>
    <b-modal class="modal" id="helpcenterArticlesModal" hide-footer>
        <template #modal-title class="modal-header">
            <h5 class="modal-title">Articles</h5>
            <!-- <b-button @click="closeModal" class="close"><span aria-hidden="true">&times;</span></b-button> -->
        </template>
        <div class="modal-body">
            <div class="input-group">
                <input type="text" class="form-control form-control-sm" @keyup.enter="fetchDataForHC" v-model="hcSearchQuery" placeholder="Seach Articles..">
            </div>
            <div id="articlesList" class="bd mg-t-20" style="overflow-y:auto;max-height:40vh">
                <div
                    v-for="article in articles"
                    :key="article.id"
                    :id="'article-'+article.id" 
                    class="hw_article" 
                    @click="insertArticleInEditor(article)"
                >
                    <div class="tx-16 tx-bold">
                      {{article.title}}
                    </div>
                    <div class="tx-14 tx-color-02" v-if="article.description">
                        {{article.description}}
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import {bus} from "../../main";
    export default {
        data(){
            return{
                articles: [],
                hcSearchQuery: ""
            }
        },
        methods: {
            closeModal(){
                this.$bvModal.hide('helpcenterArticlesModal');
            },
            showModal(){
                this.$bvModal.show('helpcenterArticlesModal');
            },
            fetchDataForHC(){

                let getBody = `mailboxId=${this.$route.params.mailboxId}`;
                if(this.hcSearchQuery.trim().length > 0){
                    getBody += `&query=${this.hcSearchQuery.trim()}`;
                }
                fetch(
                    `https://app.helpwise.io/api/helpcenter/articles/search_V2.php?${getBody}`,{credentials: "include"}
                ).then(response => response.json())
                .then(response => {
                    // console.log(response);
                    this.articles = response.data;
                })
            },
            insertArticleInEditor(article){
                console.log(article);
                bus.$emit("modal.hcArticleInsert.click", article);
                this.closeModal();
            }
        },
        created(){
            this.fetchDataForHC();
        },
        computed: {
            articlesData: function(){
                console.log(this.articles.length);
                if(this.articles.length == 0){
                    this.fetchDataForHC();
                }
                return this.articles;
            }
        }
    }
</script>

<style scoped>
    .hw_article{
        cursor: pointer;
        padding: 10px 20px;
        border-bottom: 1px solid rgba(72, 94, 144, 0.16);
        border-left: 2px solid white;
    }
    .hw_article:last-child{
       border-bottom: none;
    }

    .hw_article:hover{
        border-left: 2px solid blue;
    }
</style>