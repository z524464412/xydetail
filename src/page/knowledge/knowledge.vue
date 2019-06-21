<template>
  <div class="container">
    <div class="knowledge-box">
      <p v-for="(articlesItem,articlesIndex) in articlesList"
         @click="navTo(articlesItem)">
        {{articlesItem.title}}
      </p>
    </div>
  </div>
</template>

<script>
  import { getKnowledgeListBySkuId } from "@/api/home"
  export default {
    name: "knowledge",
    data(){
      return{
        skuId:"",
        articlesList:[]
      }
    },
    created(){
      this.skuId = this.$route.query.skuId;
      this.getKnowledgeList();
    },
    methods:{
      getKnowledgeList(){
        let that = this;
        getKnowledgeListBySkuId(this.skuId)
          .then((res)=>{
            that.articlesList = res.articles;
          })
          .catch((err)=>{
            console.log(err)
          })
      },

      /**
       * 跳转页面
       */
      navTo(item){
        let { showType,url,id } = item;
        if(showType === '0'){
          window.location.href = url;
        }else{
          this.$router.push({name:'productArticle',query:{id:id,showType:showType}});
        }
      },
    }
  }
</script>

<style scoped>
  .container{
    background:rgba(243,245,249,1);
  }
  .knowledge-box{
    background-color: #fff;
  }
  .knowledge-box p{
    padding: 11px 15px;
  }
  .knowledge-box p:nth-child(n+2){
    border-top: 1px solid #EEEEEE;
  }
</style>
