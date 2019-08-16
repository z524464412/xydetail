<template>
  <div style="position: relative">
    <iframe class="iframe-box" id="mainContent" src="https://ilandhouse.oss-cn-shanghai.aliyuncs.com/VRProject/朗诗绿色中心/VR%E6%9C%97%E8%AF%97%E7%BB%BF%E8%89%B2%E4%B8%AD%E5%BF%83/index.html"></iframe>
    <div class="material-science" @click="showPdf()">
      <div></div>
      <div>
        <div>
          <p>室内空气质量</p>
          <i class="mint-toast-icon mintui mintui-back"></i>
        </div>
        <p>甲醛＜0.01mg/m³</p>
        <p>VOC＜0.3mg/m³</p>
      </div>
    </div>
    <div class="material-detailed" @click="showDialog = true">
      <img src="../../static/images/icon-checklist@2x.png" alt="">
      <p>材料清单</p>
    </div>
    <div id="dialog" class="material-dialog animated fadeIn" v-if="showDialog">
      <div class="click-box" @click="addClass()"></div>
      <div class="material-box">
        <p class="material-title">所有材料</p>
        <div class="material-list">
          <div class="material-item" @click="navTo(item.projectProductItem.productSkuId)" v-for="item in productItemList">
            <div>
              <img v-if="item.productPictureList && item.productPictureList.length > 0" :src="item.productPictureList[0].url" alt="">
              <img v-else src="" alt="">
              <div>
                <!--<p>{{item.productPictureList}}</p>-->
                <p>{{item.projectProductItem.productName}}</p>
                <p>{{item.projectProductItem.productSkuSpec}}</p>
                <p v-if="(item.proHazardAssessmentList && item.proHazardAssessmentList.length > 0) && (item.proHazardAssessmentList[0].harmfulLable == 'Red' || item.proHazardAssessmentList[0].harmfulLable == 'RedDG')" class="red" >AVOID</p>
                <p v-else-if="(item.proHazardAssessmentList && item.proHazardAssessmentList.length > 0) && (item.proHazardAssessmentList[0].harmfulLable == 'Yellow' || item.proHazardAssessmentList[0].harmfulLable == 'YellowDG')" class="yellow" >CAUTION</p>
                <p v-else-if="(item.proHazardAssessmentList && item.proHazardAssessmentList.length > 0) && item.proHazardAssessmentList[0].harmfulLable == 'Green'" class="green" >GOOD</p>
                <p v-else></p>
              </div>
            </div>
            <i class="mint-toast-icon mintui mintui-back"></i>
          </div>
        </div>
      </div>
    </div>
    <!--<img v-if="openIframe" @click="openIframe = ''" style="position: absolute;width: 30px;height: 30px;top: 3.5%;right: 2.5%;z-index: 99;" src="../../static/images/close@2x.png" alt="">-->
    <!--<iframe v-if="openIframe" class="open-iframe" id="iframeDialog" :src="openIframe"></iframe>-->
  </div>
</template>

<script>
  import {
    getProjectProductItemByPage} from "@/api/home";
  export default {
    name: "",
    data(){
      return{
        showDialog:false,
        productItemList:[],
        openIframe:'',
      }
    },
    created(){
      this.getProjectProductItemByPage(317);
    },
    methods:{
      addClass(){
        document.getElementById('dialog').className = 'material-dialog animated fadeOut';
        setTimeout(()=>{
          this.showDialog = false
        },1000)
      },
      getProjectProductItemByPage(projectId){
        let that = this;
        getProjectProductItemByPage(projectId).then((data)=>{
          that.productItemList = data.product;
        }).catch(err=>console.log(err));
      },

      navTo(skuId){
        // let url;
        switch (window.host){
          case 'testweb.materialcircle.com':window.location.href = "https://test.materialcircle.com/appview/index.html?skuId=" + skuId + "#/sweepCode";break;
          case 'xy.materialcircle.com':window.location.href = "https://xy.materialcircle.com/appview/index.html?skuId=" + skuId + "#/sweepCode";break;
          default: window.location.href = location.origin + location.pathname + "?skuId=" + skuId + "#/sweepCode";break;
        }
        // this.openIframe = url;
      },

      showPdf() {
        window.open('https://ilandhouse.oss-cn-shanghai.aliyuncs.com/97195cf161834e129b4e274f06e7c00d.pdf');
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../static/animate.css";
  .iframe-box{
    width: 100%;
    height: 100vh;
  }
  .open-iframe{
    position: absolute;
    width: 95%;
    height: 95vh;
    top: 2.5%;
    left: 2.5%;
  }
  .material-science{
      width:180px;
      height:110px;
      position: absolute;
      top: 20px;
      >div:nth-child(1){
        width:180px;
        height:110px;
        background:linear-gradient(270deg,rgba(0,177,233,0.1) 0%,rgba(0,144,254,1) 100%);
        opacity:0.5;
      }
      >div{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        padding:16px 20px;
        >div:nth-child(1){
          display: flex;
          align-items: center;
          p{
            font-size:18px;
            font-weight:bold;
            line-height:25px;
            color:rgba(255,255,255,1);
          }
          i{
            transform: rotate(180deg);
            color: #fff;
            margin-left: 5px;
          }
        }
        p{
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:20px;
          color:rgba(255,255,255,1);
          opacity:0.8;
        }
        p:nth-child(2){
          margin: 10px 0px 3px;
        }
      }
  }
  .material-detailed{
    width:70px;
    height:70px;
    background:rgba(0,0,0,0.6);
    border-radius:50%;
    position: absolute;
    bottom: 80px;
    right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: 21px;
    }
    p{
      margin: 0px;
      font-size:11px;
      font-weight:400;
      line-height:25px;
      color:rgba(255,255,255,1);
    }
  }
  .material-dialog{
    position: absolute;
    height: 100vh;
    width: 100%;
    left: 0px;
    top: 0px;
    padding-top: 33%;
    display: flex;
    justify-content: center;
    .click-box{
      height: 100%;
      width: 100%;
      z-index: 1;
    }
    .material-box{
      width:360px;
      height:60%;
      background:rgba(0,0,0,0.8);
      border-radius:4px;
      z-index: 889;
      position: absolute;
      p{
        font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Segoe UI", "Helvetica Neue", "PingFang SC", "Noto Sans", "Noto Sans CJK SC", "Microsoft YaHei", 微软雅黑, sans-serif;
      }
      .material-title{
        font-size:18px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:25px;
        color:rgba(255,255,255,1);
        position: relative;
        text-align: center;
        margin: 15px 0px;
      }
      .material-title:before{
        content: "";
        width: 30px;
        height: 1px;
        background-color: #fff;
        position: absolute;
        left: 70px;
        top: 10px;
      }
      .material-title:after{
        content: "";
        width: 30px;
        height: 1px;
        background-color: #fff;
        position: absolute;
        right: 70px;
        top: 10px;
      }
      .material-list{
        overflow: auto;
        height: 368px;
      }
      .material-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0px 15px;
        margin-bottom:20px;
        >div{
          display: flex;
          img{
            width: 70px;
            height: 70px;
          }
          >div{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left:15px;
            p:nth-child(1){
              font-size:15px;
              font-weight:bold;
              line-height:21px;
              color:rgba(255,255,255,1);
            }
            p:nth-child(2){
              font-size:12px;
              font-weight:400;
              line-height:17px;
              color:rgba(255,255,255,1);
              opacity:0.7;
            }
            p:nth-child(3){
              width: 70px;
              height:18px;
              opacity:1;
              border-radius:2px;
              font-size:12px;
              font-weight:400;
              line-height:20px;
              color:rgba(255,255,255,1);
              padding: 0px 5px;
              text-align: center;
            }
          }

        }
        i{
          transform: rotate(180deg);
          color: #fff;
        }

      }
      .material-item:last-child{
        margin-bottom: 0px;
      }
    }
  }
  .yellow{
    background-color:#FFAB00;
  }
  .red{
    background-color:#FF5630;
  }
  .green{
    background-color:#00AF65;
  }
</style>
