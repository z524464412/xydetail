<template>
  <div class="container">
    <div class="logo-vertical" v-if="id === '31'">
      <img src="../../../static/images/logo-vertical.png" alt="">
      <p>健康家居 ‧ 有源可循</p>
    </div>
    <div class="top-box">
      <div></div>
      <img :src="article.abb" alt="">
    </div>
    <p class="article" v-html="article.content">
    </p>
  </div>
</template>

<script>
  import {getArticleById,getProductBySkuId} from '@/api/home'
  import {
    escape2Html,
  } from "@/config/mUtils";
  export default {
    name: "productArticle",
    data(){
      return{
        id:"",
        article:{},
      }
    },
    created(){
      let {id,showType } = this.$route.query;
      this.id = id;
      if(showType === '-1'){
        this.getCodeDetail();
      }else if(showType === '1'){
        this.getArticle();
      }
    },
    mounted(){
    },
    methods:{
      getArticle(){
        let that = this;
        getArticleById(this.id).then((res)=>{
          that.article = res;
          that.article.content = escape2Html(res.content);
        }).catch(err=>console.log(err))
      },

      /**
       * 获取code详情
       */
      getCodeDetail() {
        let params = {};
        let that = this;
        getProductBySkuId(this.id)
          .then(res => {
            let { pictures,features} = res.products;
            that.article = {
              'abb':pictures[0].url,
              'content':escape2Html(features)
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    mounted(){
    }
  }
</script>

<style scoped>
  .container{
    position: relative;
    background-color: #0052CC;
    padding-bottom: 20px;
    min-height: 100vh;
  }
  .article{
    margin-top: -147px;
    background-color: #fff;
    width: calc(100% - 30px);
    margin-left: 15px;
    padding: 12px;
    border-radius: 8px;
    position: relative;
    z-index: 99;
  }
  .top-box{
    position: relative;
    height: 295px;
  }
  .top-box div{
    height: 295px;
    /*! autoprefixer: off */
    background: linear-gradient(top,rgba(255,255,255,0) 0%,rgba(0,82,204,1) 100%);
    background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,82,204,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0)), color-stop(100%,rgba(0,82,204,1)));
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(0,82,204,1) 100%);
    background: -o-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(0,82,204,1) 100%);
    background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(0,82,204,1) 100%);
    /* autoprefixer: on */
    position: relative;
    top: 0px;
    height: 295px;
    z-index: 99;
  }
  .top-box img{
    height: 295px;
    position: absolute;
    top: 0px;
    z-index: 0;
  }
  .logo-vertical{
    position: absolute;
    z-index: 101;
    height: 150px;
    padding-top: 20px;
    width: 100%;
  }
  .logo-vertical img{
    width: 77px;
    height: 73px;
    margin: 0px auto;
  }
  .logo-vertical p{
    height: 29px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 30px;
    color: rgba(255,255,255,1);
    text-align: center;
    margin-top: 8px;
  }
</style>
