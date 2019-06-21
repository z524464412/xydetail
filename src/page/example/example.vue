<template>
  <div class="container">
    <div class="case-presentation" v-for="(casesItem,casesIndex) in casesList" @click="casesTo(casesItem)">
      <img :src="casesItem.abb" alt="">
      <p>{{casesItem.title}}</p>
    </div>
  </div>
</template>

<script>
  import {getProductCasesBySkuId} from '@/api/home'
  export default {
    name: "example",
    data(){
      return{
        skuId:"",
        casesList:[], // 案例list
      }
    },
    created(){
      document.title = '案例展示';
      this.skuId = this.$route.query.skuId;    // 获取参数
      this.getProductCases();
    },
    methods:{
      getProductCases(){
        let that = this;
        getProductCasesBySkuId(this.skuId)
          .then((res)=>{
            that.casesList = res.cases;
          })
          .catch((err)=>{
            console.log(err);
          })
      },


      casesTo(item){
        if(item.showType === '0'){
          window.location.href = item.url
        }else{
          this.$router.push({name:'productArticle',query:{id:item.id,showType:'1'}});
        }
      }
    }
  }
</script>

<style scoped>
  .container{
    padding: 15px;
  }
  .container > div{
    margin-bottom: 15px;
  }
  .container > div:nth-child(2n){
    margin-left: 14px;
  }
  .case-presentation{
    position: relative;
    float: left;
  }
  .case-presentation img{
    height: 120px;
    width: 185px;
    border-radius: 5px;
  }
  .case-presentation p{
    font-size:16px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:22px;
    color:#fff;
    position: absolute;
    bottom: 10px;
    left: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 30px);
  }
</style>
