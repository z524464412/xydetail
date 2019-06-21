<template>
  <div class="container">
    <div class="video-box" v-for="(videoItem,videoIndex) in videoList">
      <div style="height: 215px;">
        <video :id="videoIndex" :src="videoItem.url" :poster="videoItem.abb" controls="controls">
          您的浏览器不支持 video 标签。
        </video>
      </div>
      <p>{{videoItem.title}}</p>
    </div>
  </div>
</template>

<script>
  import {getProductVideoBySkuId } from "@/api/home"
  export default {
    name: "videoList",
    data(){
      return{
        skuId:"",
        videoIndex:"",
        videoList:[],     // 视频list
      }
    },
    created(){
      document.title = "产品视频";
      let { skuId, videoIndex} = this.$route.query;
      this.skuId = skuId;    // 获取参数
      this.videoIndex = videoIndex;    // 获取参数
      this.getProductVideoList();
    },
    methods:{
      getProductVideoList(){
        let that = this;
        getProductVideoBySkuId(this.skuId)
          .then((res)=>{
            that.videoList = res.videos;
          })
          .catch((err)=>{
            console.log(err);
          })
      }
    },
    mounted(){
    },
    updated(){
      if(this.videoIndex !== ""){
        setTimeout(()=>{
          let videoDom = document.getElementById(this.videoIndex);
          videoDom.play()
        },2000)
      }
    }

  }
</script>

<style scoped>
  .container{
    padding: 15px;
  }
  .video-box div{
    border-radius: 8px;
    overflow: hidden;
  }
  .video-box video{
    width: 100%;
    height: 100%;
  }
  .video-box p{
    font-size:20px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:28px;
    color:rgba(66,82,110,1);
    margin: 10px 0px;
  }
</style>
