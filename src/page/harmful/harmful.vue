<template>
  <div class="container">
    <div class="nav">
      <div @click="active = 'harmful'" class="nav-left">
        <p>有害物质检测</p>
      </div>
      <div @click="active = 'test-report'" class="nav-right">
        <p>检测报告</p>
      </div>
      <div :class="{'achive' : true, 'left': active === 'harmful' ? false : true}"></div>
    </div>
    <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item id="harmful">
        <div class="from-header">
          <p>有害物质</p>
          <p>国家标准</p>
          <p>检测结果</p>
          <p>单位</p>
          <p>合格</p>
        </div>
        <div class="scroll-box">
          <div class="from-content" v-for="harmfulItem in harmfulList">
            <p>{{harmfulItem.name}}</p>
            <p>{{harmfulItem.rohsValGB}}</p>
            <p>{{harmfulItem.testVal}}</p>
            <p>{{harmfulItem.unit}}</p>
            <img style="width: 16px;height: 12px;margin-right: 3px;" src="../../../static/images/checked.png" alt="">
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="test-report">
        <div class="report-header">
          <p>本报告由</p><p @click="showInstitutions" style="color: #0052CC;padding: 0px 6px;">第三方检测机构</p><p>独立上传</p>
        </div>
        <div class="scroll-box">
          <div class="test-report-content" v-for="harmfulPDFItem in harmfulPDFList" @click="checkReport('report',harmfulPDFItem)">
            <img style="width: 12px;height: 17px;" src="../../../static/images/PDF.png" alt="">
            <p>{{harmfulPDFItem.name.substring(0,harmfulPDFItem.name.length - 4)}}</p>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>


    <!-- 弹框容器 -->

    <div class="model-container" id="modal" v-show="showModelType">
      <transition
        type="transition"
        name="fade"
        appear
        enter-active-class="animated fade fade-enter-active"
        leave-active-class="animated fade fade-leave-active"
        appear-active-class="animated fade"
      >
        <div
          class="model-body"
          :class="modelType?'model-htmlBox':'model-scan'"
          v-show="showModelType"
        >
          <div class="model-content">
            <div class="scan-box" v-if="!modelType">
              <img :src="qrcode" alt>
              <div class="model-content-title" v-html="titleInfo"></div>
            </div>
            <div class="html-box" v-else>
              <div v-show=" modelStatus== 'institutions'" class="line-wrap">
                <span class="line-wrap-title">循源联盟实验室</span>
                <p class="line-wrap-info">
                  循源联合国际权威第三方检测机构， <br/>为客户提供专业可靠的检测服务。 <br/>检测机构独立上传检测报告，杜绝随意篡改及假报告。
                </p>
                <div class="line-wrap-flex">
                  <div>
                    <img style="width:70px;height:15px; margin:0 auto;" src="@/assets/image/icon_company1.png" alt="">
                  </div>
                  <div>
                    <img style="width:85px;height:15px;margin:0 auto;" src="@/assets/image/icon_company2.png" alt="">
                  </div>
                  <div>
                    <img style="width:44px;height:21px;margin:0 auto;" src="@/assets/image/icon_company3.png" alt="">
                  </div>
                  <div>
                    <img style="width:36px;height:44px;margin:0 auto;" src="@/assets/image/icon_company4.png" alt="">
                  </div>
                  <div>
                    <img style="width:85px;height:30px;margin:0 auto;" src="@/assets/image/icon_company5.png" alt="">
                  </div>
                  <div>
                    <img style="width:85px;height:30px;margin:0 auto;" src="@/assets/image/icon_company6.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="model-close" @click="showModel(false)">
            <img src="@/assets/image/icon_close.png" alt>
          </div>
        </div>
      </transition>
    </div>

    <!-- 弹框容器 -->
  </div>
</template>

<script>
  var ModalHelper = (function(bodyCls) {
    var scrollTop;
    return {
      afterOpen: function() {
        scrollTop = document.scrollingElement.scrollTop;
        document.body.classList.add(bodyCls);
        document.body.style.top = -scrollTop + "px";
      },
      beforeClose: function() {
        document.body.classList.remove(bodyCls);
        // scrollTop lost after set position:fixed, restore it back.
        document.scrollingElement.scrollTop = scrollTop;
      }
    };
  })("modal-open");
  import {
    getStorage,
    init_platform
  } from "@/config/mUtils";
  import { Toast} from 'mint-ui';
  import { getHarmfulListByShuId} from "@/api/home"
  import {getPDFURL} from '@/utils/auth'
  import qrcode from "@/assets/image/icon_qrcode.png";
  import appcode from "@/assets/image/icon_qrcode2.jpg";
  let Base64 = require("js-base64").Base64;
  export default {
    name: "harmful",
    data(){
      return{
        skuId:"",
        active: 'harmful',
        harmfulList:[],       // 有害物质list
        harmfulPDFList:[],    // 有害物质PDF列表
        showModelType: false, //是否显示模态框
        modelType: true,      //模态框类型(false为只显示二维码,true显示html内容)
        qrcode: "", //显示什么码
        titleInfo: "", //弹框文本显示值
        modelStatus:'default',//默认显示弹框
        platform: init_platform(), //浏览器平台
      }
    },
    created() {
      document.title = "有害物质检测";
      this.skuId = this.$route.query.skuId;    // 获取参数
      this.getHarmfulList();
    },
    methods:{
      getHarmfulList(){
        let that = this,
          { skuId } = this;
        getHarmfulListByShuId(skuId)
          .then((res)=>{
            console.log(res);
            let { test,test_report } = res.harmful;
            that.harmfulList = test;
            that.harmfulPDFList = test_report;
          })
          .catch((err)=>{
            console.log(err);
          })
      },

      // 显示检测机构信息
      showInstitutions(){
        this.modelStatus = 'institutions';//显示机构样式
        this.modelType = true;
        this.openModal();
      },

      /**
       * 显示模态框
       */
      openModal() {
        this.showModelType = true;
        // zoomIn animate
        ModalHelper.afterOpen();
      },
      /**
       * 关闭模态框
       */
      closeModal() {
        this.showModelType = false;
        ModalHelper.beforeClose();
      },

      /**
       * 显示模态框并显示内容
       */
      showModel(type, item) {
        if (type) {
          this.openModal();
        } else {
          this.closeModal();
        }
      },

      /**
       * 查看检测报告
       */
      checkReport(type, report) {
        let _this = this;
        // _this.platform = 'wx';
        // _this.subscribe = 1;
        // console.log(_this.subscribe);
        // console.log(_this.platform);
        if (type == "report") {
          if (_this.platform == "wx") {
            // 只要本地有关注值就是已经关注
            let storageSubscribe = getStorage('subscribe');
            if(storageSubscribe && storageSubscribe == 1){
              _this.subscribe = 1;
            }
            // if(_this.checkOne){
            //   _this.checklogin();
            //   _this.checkOne = false;
            // }

            if (_this.subscribe != 1) {
              _this.titleInfo = "要查看检测报告<br/>请先长按关注公众号";
              _this.qrcode = qrcode;
              _this.modelType = false;
              _this.showModel(true);
              return;
            } else {
              _this.showPdf(report.url);
            }
          } else {
            this.titleInfo = "要查看检测报告<br/>请先关注公众号";
            this.qrcode = qrcode;
            this.modelType = false;
            this.showModel(true);
            return;
          }
        } else {
          this.titleInfo = "扫码进入小程序";
          this.qrcode = appcode;
          this.modelType = false;
          this.showModel(true);
        }
      },


      showPdf(url) {
        let newUrl = url.split("com")[1];
        this.$router.push({ name: "pdf", query: { url: Base64.encode(newUrl) } });
      },

    }

  }
</script>

<style scoped lang="scss">
  @import "../../style/common";
  @import "../../style/mixin";
  .container{
    background-color:rgba(243,245,249,1);
  }
  .nav{
    height: 44px;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    box-shadow:0px 0px 1px rgba(0,0,0,0.15);
  }
  .nav-left{
    position: absolute;
    left: 70px;
  }
  .nav-right{
    position: absolute;
    right: 70px;
  }
  .achive{
    width:23px;
    height:2px;
    background:rgba(0,82,204,1);
    position: absolute;
    bottom: 0px;
    left: 100px;
    -webkit-transition:left .4s ease-out;
  }
  .left{
    left: 299px;
    -webkit-transition:left .4s ease-out;
  }
  .from-header{
    height:35px;
    background:rgba(247,247,247,1);
    display: flex;
    align-items: center;
    padding: 0px 15px;
    justify-content: space-between;
  }
  .from-header p:nth-child(1){
    width: 143px;
  }
  .from-header p{
    font-size:13px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:18px;
    color:rgba(155,161,170,1);
  }
  .from-content{
    display: flex;
    align-items: center;
    padding: 10px 15px;
    justify-content: space-between;
    border-bottom:1px solid #EEEEEE;
    background-color: #fff;
  }
  .from-content>p:nth-child(1){
    width: 143px;
    font-size:15px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:21px;
    color:rgba(16,29,55,1);
  }
  .from-content>p:nth-child(2){
    color: #101D37;
    font-family:PingFang SC;
    font-weight:400;
    line-height:16px;
    font-size: 14px;
    width: 52px;
  }
  .from-content>p:nth-child(3){
    color: #101D37;
    font-family:PingFang SC;
    font-weight:400;
    line-height:16px;
    font-size: 14px;
    width: 52px;
  }
  .from-content>p:nth-child(4){
    color: #101D37;
    font-family:PingFang SC;
    font-weight:400;
    line-height:16px;
    font-size: 11px;
    width: 35px;
  }
  .report-header{
    height:35px;
    background:rgba(247,247,247,1);
    display: flex;
    align-items: center;
    padding: 0px 15px;
    font-size:13px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:18px;
    color:rgba(155,161,170,1);
  }
  .test-report-content{
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px 13px;
    border-bottom:1px solid rgba(238,238,238,1)
  }
  .test-report-content p {
    margin-left: 12px;
  }
  // 模态框
   .model-container {
       position: relative;
       position: fixed;
       box-sizing: border-box;
       left: 0;
       top: 0;
       width: 100%;
       height: 100vh;
       background: rgba(0, 0, 0, 0.5);
       z-index: 999;
       opacity: 1;
  .model-body {
    background: #fff;
    z-index: 1000;
    border-radius: 10px;
    min-width: 320px;
    min-height: 300px;
  // 内容只有关注公众号
    &.model-scan {
     @include center;
       padding: 10px 15px;
       width: 320px;
       height: 300px;
  .model-content {
    width: 100%;
    top: 52px;
  @include cl;
  .scan-box {
    width: 100%;
    height: 100%;
  }
  img {
    width: 128px;
    height: 128px;
    margin: 0 auto;
  }
  .model-content-title {
    margin-top: 15px;
    width: 100%;
    text-align: center;
    color: #101d37;
    font-size: 16px;
  @include cl;
  }
  }
  }
  // 显示html内容
    &.model-htmlBox {
       min-width: 90%;
       height: auto;
     @include center;
  .model-content {
    width: 100%;
  }
  // @include cl;
  // top: 75px;

  .html-title {
    font-size: 18px;
    color: #333;
    text-align: left;
    padding: 11px 15px;
  }
  .html-line {
    height: 2px;
    background: #ddd;
  }
  .html-content {
    padding: 11px 15px;
    max-height: 300px;
    overflow: auto;
  }
  .html-scan {
    margin: 20px auto;
    width: 100%;
    text-align: center;
  img {
    width: 75px;
    height: 75px;
    margin: 0 auto;
  }
  .model-content-title {
    color: #999;
    font-size: 12px;
  }
  }
  }
  }
  .model-close {
    position: absolute;
    bottom: -64px;
    left: 50%;
    display: block;
    transform: translateX(-50%);
    width: 34px;
    height: 34px;
  }
  body.modal-open {
    position: fixed;
    width: 100%;
  }
  }
  .line-wrap {
    position: absolute;
    top: 20px;
    left: 50%;
    width: 100%;
    margin-left: -50%;
    padding: 0 34px;
    /* 左外边距宽度的一半，50% */
    text-align: center;
  }
  .line-wrap-title{
    font-size: 17px;

    color: #0052CC;
  }
  .line-wrap-info{
    margin-top: 20px;
    color: #101D37;
  }
  /*伪元素实现*/
  .line-wrap-title:before {
    display: inline-block;
    position: relative;
    top: -7px;
    right: 20px;
    content: "";
    width: 50px;
    height: 0px;
    border: 1px solid #DBAD2C;
  }
  .line-wrap-title:after {
    display: inline-block;
    position: relative;
    top: -7px;
    left: 20px;
    content: "";
    width: 50px;
    height: 0px;
    border: 1px solid #DBAD2C;
  }
  .line-wrap-flex{
    display: flex;
    flex-flow: wrap row;
  div{
    margin-top: 20px;
    width: 33%;
    text-align: 33%;
  }
  }
  .scroll-box{
    overflow: auto;
    height: calc(100vh - 79px);
  }
</style>
