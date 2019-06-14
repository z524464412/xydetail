<template>
  <div id="productDetail">
      <!-- 顶部导航 -->
    <div class="topNav-container">
      <!-- <div class="topNav-item">
        <div class="topNav-item-name"></div>
        <i class="topNav-item-active-bottom-border"></i>
      </div> -->
      <div class="topNav-item" :key="index" v-for="(item,index) in tapList" @click="checkTap(item,index)">
          <div class="topNav-item-name">{{item.text}}</div>
          <i class="topNav-item-bottom-border" :class="{'topNav-item-active-bottom-border':item.show}"></i>
    	</div>
    </div>
    <div class="product-item" v-show="orderStatus == 1">
      <div class="product-title">
        材料简介
      </div>
      <div class="product-content" v-html="productContent">
      </div>
      <div class="product-scan">
        <img class="product-scan-img" src="@/assets/image/icon_qrcode.png" alt="">
        <span>
          长按扫码关注公众号<br/> 查看更多科普
        </span>
      </div>
    </div>
       <!-- 有害物质 -->
    <div class="product-harmful-container navBarBox" v-show="orderStatus == 2">
      <div class="flex-container gray product-harmful-header">
        <div class="flex-threeItem">有害物质</div>
        <div class="flex-twoItem">国家标准</div>
        <div class="flex-twoItem">检测结果</div>
        <div class="flex-item">合格</div>
      </div>
      <div v-for="(supplierRohs,index) in supplierRohsList" :key="index">
        <div class="flex-container gray product-harmful-body">
          <div
            class="flex-threeItem blue f13"
            @click="getHarmfulDetail(supplierRohs)"
          >{{supplierRohs.rohsName}}</div>
          <div class="flex-twoItem f13">{{supplierRohs.rohsVal}}</div>
          <div class="flex-twoItem f13">{{supplierRohs.testVal}}</div>
          <div class="flex-item">
            <img
              class="harmful-icon-checked"
              src="@/assets/image/icon_checked.png"
              alt
              v-if="supplierRohs.flag"
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 检测报告 -->
    <div class="testReport" v-show="orderStatus == 3">
      <div class="bold f17">
        <span class="gray">本报告由</span>
        <span class="gray">第三方检测机构</span>
        <span class="gray">独立上传</span>
      </div>

      <div
        class="testReport-item"
        v-for="(jiance,index) in detectionList"
        :key="index"
        @click="checkReport('report',jiance)"
      >
        <img class="testReport-icon" src="@/assets/image/icon_pdf.png" alt>
        {{jiance.name}}
      </div>
    </div>
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
let Base64 = require("js-base64").Base64;
import { Popup, Toast } from "mint-ui";
import qrcode from "@/assets/image/icon_qrcode.png";
import appcode from "@/assets/image/icon_qrcode2.jpg";
import {
  getPdfUrl,//获取pdf地址
  getSubInfo,//获取项目的详情
} from "@/server/getData";

export default {
  data(){
    return{
      query:'',
      tapList: [{
        show: true,
        text: '产品信息',
        status: '1'
      },{
        show: false,
        text: '有害物质检测',
        status: '2'
      },{
        show: false,
        text: '检测报告',
        status: '3'
      }],
      orderStatus:1,
      productContent:'',//文本内容
      supplierRohsList:"",//有害物质列表
      detectionList:'',//检测报告列表
    }
  },
  mounted(){
    this.query = this.$route.query;
    this.getSubInfoList();
  },
  methods:{
    // 切换导航
    checkTap(item,index){
    	var _this = this;
	    _this.tapList.map(function (item, i) {
	      _this.tapList[i].show = false;
	      if (i == index) {
	        _this.tapList[i].show = true;
	        _this.orderStatus = _this.tapList[i].status;
	      }
	    })
    },
    // 获取详情
    getSubInfoList(){
      let params = {};
      params['item.id'] = this.query['item.id'];
      params.skuId = this.query.skuId;
      //  params['item.id'] =18;
      // params.skuId = 174;
      getSubInfo(params).then(res=>{
        console.log(res);
        this.productContent = res.product.htmlContentPc;
        this.supplierRohsList = res.supplierRohsList;
        this.detectionList = res.jianCeArray;
      }).catch(err => {
        console.log(err);
      })
    },
    // 显示pdf
    showPdf(url) {
      let newUrl = url.split("com")[1];
      this.$router.push({ name: "pdf", query: { url: Base64.encode(newUrl) } });
    },
     /**
     * 显示模态框
     */
    openModal() {
      this.showmodelType = true;
      // zoomIn animate
      ModalHelper.afterOpen();
    },
    /**
     * 关闭模态框
     */
    closeModal() {
      this.showmodelType = false;
      ModalHelper.beforeClose();
      // this.checklogin();
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
      let reportUrl = report.url;
        let form = new FormData();
        form.append("ossFileKey", reportUrl);
        let param = new URLSearchParams(form);
        getPdfUrl(param).then(
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
            console.log(err);
          }
        );
      }
  }
}
</script>
<style lang="scss" scope>
@import "../../style/common";
@import "../../style/mixin";
  // 顶部导航
.topNav-container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: row wrap;
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
  z-index: 3;
  .topNav-item {
    position: relative;
    text-align: center;
    flex: 1;
    .topNav-item-name {
      height: 50px;
      line-height: 50px;
    }
    .topNav-item-active-bottom-border {
      position: absolute;
      bottom: 0;
      width: 31px;
      background: #0052cc;
      height: 3px;
      @include cl;
    }
  }
}
body,html{
  min-height: 100%;
  min-width: 100%;
  background: #fff;
}
#productDetail{
  padding-top: 50px;
  width: 100%;
  height: 100%;
}
.product-item{
  padding: 12px 15px;
  .product-title{
    font-size: 15px;
    color: #333;
  }
  .product-content{
    margin-top: 10px;
    color: #666;
    font-size: 14px;
    height: 300px;
    margin-bottom: 20px;
  }
  .product-scan{
    text-align: center;
    width: 100%;
    color: #999999;
    .product-scan-img{
      width: 75px;
      height: 76px;
      margin: 0 auto;
    }
  }
}
// 有害物质
.product-harmful-container {
  .product-harmful-title {
    margin: 12px 15px;
    color: #101d37;
  }
  .product-harmful-header {
    background: #f7f7f7;
    height: 35px;
    line-height: 35px;
    color: #9ba1aa;
  }
  .product-harmful-body {
    background: #fff;
    min-height: 42px;
    border-bottom: 1px solid #eeeeee;
    font-size: 13px;
    .harmful-icon-checked {
      width: 16px;
      height: 12px;
      display: block;
      margin: auto;
    }
    .flex-twoItem {
      color: #333;
    }
  }
  .product-harmful-morebtn {
    padding: 10px 15px;
    text-align: center;
    font-size: 13px;
  }
}
.flex-container {
  display: flex;
  position: relative;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  .flex-item {
    flex: 1;
    text-align: center;
  }
  .flex-threeItem {
    flex: 0 0 50%;
  }
  .flex-twoItem {
    flex: 2;
  }
}

// 检测报告
.testReport {
  margin: 20px 15px;
  background: #fff;
  font-size: 13px;
  span {
    font-size: 13px;
  }
  .testReport-item {
    margin: 15px 20px;
    position: relative;
    .testReport-icon {
      position: absolute;
      width: 14px;
      height: 17px;
      left: -20px;
      @include ct;
    }
  }
}



</style>