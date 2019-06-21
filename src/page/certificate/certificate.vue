<template>
    <div class="container">
      <div class="certification-box"
           v-for="certificates in certificatesList"
           @click="checkReport('report',certificates)">
        <div>
          <img style="width: 32px;" :src="certificates.certificateUrl" alt="">
          <p>{{certificates.certificateName}}</p>
        </div>
        <p>有效期至：{{formatDateTime(certificates.validityEnd)}}</p>
      </div>


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
  import {getCertificatesListByShuId} from "@/api/home"
  import qrcode from "@/assets/image/icon_qrcode.png";
  import appcode from "@/assets/image/icon_qrcode2.jpg";
  import {getPDFURL} from '@/utils/auth'
  let Base64 = require("js-base64").Base64;
  export default {
    name: "certificate",
    data(){
      return{
        skuId:"",
        certificatesList:[],      // 证书list
        showModelType: false, //是否显示模态框
        modelType: true,      //模态框类型(false为只显示二维码,true显示html内容)
        qrcode: "", //显示什么码
        titleInfo: "", //弹框文本显示值
        modelStatus:'default',//默认显示弹框
        platform: init_platform(), //浏览器平台
      }
    },
    created(){
      this.skuId = this.$route.query.skuId;
      this.getCertificatesList();
    },
    methods:{
      getCertificatesList(){
        let that = this;
        getCertificatesListByShuId(this.skuId)
          .then((res)=>{
            that.certificatesList = res.certificates;
          })
          .catch((err)=>{
            console.log(err)
          })
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
       * 查看检测报告
       */
      checkReport(type, report) {
        let _this = this;
        let reportUrl = report.url;
        let form = new FormData();
        form.append("ossFileKey", reportUrl);
        let param = new URLSearchParams(form);
        getPDFURL(param).then(
          res => {
            if (res && res.pdfUrl) {
              // window.location.href=res.pdfUrl;
              _this.showPdf(res.pdfUrl);
            } else {
              Toast({
                message: "pdf文件为空!",
                position: "middle",
                duration: 2000
              });
            }
          },
          err => {
            Toast({
              message: "获取pdf失败",
              position: "middle",
              duration: 2000
            });
          }
        );
        return
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
              let reportUrl = report.url;
              let form = new FormData();
              form.append("ossFileKey", reportUrl);
              let param = new URLSearchParams(form);
              getPDFURL(param).then(
                res => {
                  if (res && res.pdfUrl) {
                    // window.location.href=res.pdfUrl;
                    _this.showPdf(res.pdfUrl);
                  } else {
                    Toast({
                      message: "pdf文件为空!",
                      position: "middle",
                      duration: 2000
                    });
                  }
                },
                err => {
                  Toast({
                    message: "获取pdf失败",
                    position: "middle",
                    duration: 2000
                  });
                }
              );
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

      showPdf(url) {
        let newUrl = url.split("com")[1];
        this.$router.push({ name: "pdf", query: { url: Base64.encode(newUrl) } });
      },

      /**
       * 格式化时间戳
       */
      formatDateTime(date){
        return new Date(date).Format("yyyy.MM.dd")
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/common";
  @import "../../style/mixin";
  .container{
    background-color:rgba(243,245,249,1);
    padding: 15px;
  }
  .certification-box{
    display: flex;
    align-items: center;
    height:46px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(229,232,237,1);
    box-shadow:0px 1px 3px rgba(3,27,78,0.1);
    border-radius:4px;
    justify-content: space-between;
    padding: 0px 10px;
    margin-bottom: 10px;
  }
  .certification-box>p{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:17px;
    color:rgba(168,173,185,1);
  }
  .certification-box>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .certification-box>div>p{
    margin-left: 12px;
    font-size:15px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:21px;
    color:rgba(16,29,55,1);
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
