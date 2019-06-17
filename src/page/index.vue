<template>
  <div id="scan-container" :class="{noScroll: isShowPopup}">
    <!-- 头部logo和背景 -->
    <div class="scan-header-container">
      <div class="scan-bg-box">
        <img src="@/assets/image/bg.png">
      </div>
      <div class="scan-info-container">
        <div class="scan-logo-box">
          <img src="@/assets/image/logo.png">
        </div>
        <div class="scan-info-box">
          <div class="scan-info-title">健康家居 有源可循</div>
          <div class="scan-info-body">
            <div class="info-body-box">
              <img src="@/assets/image/icon_book.png" class="info-body-img">
              专业解读
            </div>
            <div class="info-body-box">
              <img src="@/assets/image/icon_check.png" class="info-body-img checkImg">
              多重校验
            </div>
            <div class="info-body-box">
              <img src="@/assets/image/icon_roots.png" class="info-body-img rootsImg">
              防伪溯源
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 材料 -->
    <div class="product-info-container navBarBox" data-index="0">
      <div class="product-info-title">{{productObj && productObj.productSku && productObj.productSku.skuName}}</div>
      <div class="product-info-body">
        <!-- <div class="product-info-item">
          <div class="product-info-item-title">规格型号</div>
          <div
            class="product-info-item-type"
          >{{productObj && productObj.productSku && productObj.productSku.skuCode}}</div>
        </div> -->
        <div class="product-info-item">
          <div class="product-info-item-title">生产厂家</div>
          <div class="product-info-item-type">{{productObj && productObj.productSku && productObj.productSku.factoryName}}</div>
        </div>
        <!-- <div class="product-info-item">
          <div class="product-info-item-title">生产日期/批次</div>
          <div class="product-info-item-type">{{bantchDate}}</div>
        </div> -->
      </div>
      <!-- 定制材料子材料 -->
      <!-- <div
        class="child-productList"
        v-if="projectProductItemList && projectProductItemList.length>0"
      >
        <div class="border-bottom"></div>
        <div class="product-info-item">
          <div class="product-info-name f17 bold">产品注册</div>
          <div class="product-info-check f17 bold">
            第三方校验
          </div>
        </div>
        <div
          class="product-info-item"
          v-for="(productItem,index) in showChildProductList"
          :key="index"
        >
          <div class="f14 blue" @click="getProductDetail(productItem)">{{productItem.productName}}</div>
          <div>
            <img
              class="product-info-checked"
              ref="button"
              src="@/assets/image/icon_verify.png"
              @click="showProjectCheckDetail(productItem)"
            >
           <img class="product-info-checked" ref="button" src="@/assets/image/icon_verify.png" alt
            >
          </div>
        </div>

        <div class="product-info-item gray">
          <div
            class="product-info-more-btn"
            @click="showAllList('showProductItemMore')"
            v-if="projectProductItemList && projectProductItemList.length>2"
          >{{showProductItemMore?'点击展开更多':'点击收起'}}</div>
        </div>
      </div> -->

      <!-- 无加载更多子产品 -->

      <div
        class="child-productList"
        v-if="proTemplateArr"
      >
        <div class="border-bottom"></div>
        <div class="product-info-item">
          <div class="product-info-name f17 bold">产品组成</div>
          <div class="product-info-check f17 bold">
            第三方校验
            <!-- <img src="@/assets/image/icon_question.png" alt> -->
          </div>
        </div>
        <div
          class="product-info-item"
          v-for="(productItem,index) in proTemplateArr"
          :key="index"
        >
          <div class="product-info-child-box"  >
            <span @click="showChildProduct(productItem,index,proTemplateArr)">{{productItem.templateName}}</span>
              <img
                class="product-info-item-icon"
                ref="button"
                v-show="productItem.isActive"
                src="@/assets/image/icon_roundreduce.png"
                @click="showChildProduct(productItem,index,proTemplateArr)"
              >
              <img
                class="product-info-item-icon"
                ref="button"
                v-show="!productItem.isActive"
                src="@/assets/image/icon_roundadd.png"
                @click="showChildProduct(productItem,index,proTemplateArr)"
              >
              <collapse>
              <div v-show="productItem.isActive">
                  <div v-for="(product,productindex) in productItem.proComponentItems"
                  :key="productindex"
                  class="pro-child-item product-info-item"
                   >
                  <div class="f14 blue" @click="getProductDetail(product)">
                    {{product.childProductSkuName}}
                  </div>
                  <div>
                    <img
                    class="product-info-checked"
                    ref="button"
                    src="@/assets/image/icon_verify.png"
                    @click="showProjectCheckDetail(product)"
                  >
                  </div>
                </div>
              </div>

              </collapse>

          </div>
          <div>
            <!-- -->
          </div>
        </div>
      </div>


    </div>

    <!-- 有害物质 -->
    <div class="product-harmful-container navBarBox" data-index="1">
      <div class="product-harmful-title f17 bold">有害物质检测</div>
      <div class="flex-container gray product-harmful-header">
        <div class="flex-threeItem">有害物质</div>
        <div class="flex-twoItem">国家标准</div>
        <div class="flex-twoItem">检测结果</div>
        <div class="flex-item">合格</div>
      </div>
      <div v-for="(supplierRohs,index) in showRohsList" :key="index">
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
      <div
        class="product-harmful-morebtn gray"
        @click="showAllList('showRohsMore')"
        v-if="supplierRohsList && supplierRohsList.length>2"
      >
        <span>{{showRohsMore?'点击展开更多':'点击收起'}}</span>
      </div>
    </div>
    <!-- 检测报告 -->
    <div class="testReport">
      <div class="bold f17">
        检测报告
        <span class="gray">本报告由</span>
        <span @click="showInstitutions()">第三方检测机构</span>
        <span class="gray">独立上传</span>
      </div>
      <div
        class="testReport-item"
        v-for="(jiance,index) in showDetectionList"
        :key="index"
        @click="checkReport('report',jiance)"
      >
        <img class="testReport-icon" src="@/assets/image/icon_pdf.png" alt>
        {{jiance.name}}
      </div>
      <div
        class="testReport-item"
        @click="showAllList('showDetectionListMore')"
        v-if="detectionList && detectionList.length>2"
      >
        <div class="tc gray">
          <span>{{showDetectionListMore?'点击展开更多':'点击收起'}}</span>
        </div>
      </div>
    </div>
    <!-- 抽检记录 -->
    <!-- <div class="sampling-report-container">
      <div class="bold f17">
        抽检记录
        <img class="sampling-report-icon" src="@/assets/image/icon_question.png">
      </div>
      <div class="sampling-report-item" v-for="(proInspection,index) in proInspectionList" :key="index">
        {{proInspection.inspetionDate}}，由
        <span class="blue">{{proInspection.inspectionCompanyName}}检测机构</span>抽检通过；
      </div>
    </div>-->
    <!-- 溯源记录 -->
    <!-- <div class="traceability-records-container navBarBox" data-index="2">
      <div class="bold f17">溯源记录</div>
      <div class="traceability-records-listBox">
        <div class="traceability-records-item" v-if="factoryObj">
          <div class="traceability-records-icon">
            <img src="@/assets/image/icon_check_circle.png" alt>
          </div>
          <div class="traceability-records-content">
            <div class="traceability-records-content-item f14">生产工厂【{{factoryObj.companyName}}】</div>
            <div class="traceability-records-content-item grayTime">{{factoryObj.createDate}}</div>
          </div>
        </div>
        <div class="traceability-records-item" v-if="supplierObj">
          <div class="traceability-records-icon">
            <img src="@/assets/image/icon_check_circle.png" alt>
          </div>
          <div class="traceability-records-content">
            <div class="traceability-records-content-item f14">经销商商【{{supplierObj.companyName}}】</div>
            <div class="traceability-records-content-item grayTime">{{supplierObj.createDate}}</div>
          </div>
        </div>
        <div class="traceability-records-item">
          <div class="traceability-records-lastIcon"></div>
          <div class="traceability-records-lastcontent f14">您当前是第{{codeScanNominiCount}}个扫码查验者</div>
        </div>
      </div>
    </div> -->
    <!-- 跳转小程序 -->
    <!-- <div class="gowxbox-container" @click="checkReport('wxapp')">
      <div class="gowxbox-icon">
        <img src="@/assets/image/icon_tip.png" alt>
      </div>
      <div class="gowxbox-title">如果您购买了此产品，请登录小程序查验防伪码</div>
      <div class="gowxbox-arrow">
        <img src="@/assets/image/icon_arrow.png" alt>
      </div>
    </div>-->

    <!-- 顶部导航 -->
    <div class="topNav-container" v-if="showNav">
      <div class="topNav-item">
        <div class="topNav-item-name">产品信息</div>
        <i class="topNav-item-active-bottom-border"></i>
      </div>
      <div class="topNav-item">
        <div class="topNav-item-name">有害物质检测</div>
        <i class="topNav-item-bottom-border"></i>
      </div>
      <div class="topNav-item">
        <div class="topNav-item-name">溯源记录</div>
        <i class="topNav-item-bottom-border"></i>
      </div>
    </div>
    <!-- 弹框容器 -->

    <div class="model-container" id="modal" v-show="showmodelType">
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
          v-show="showmodelType"
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
                  </div>
              </div>
              <div v-show="modelStatus == 'record'">
                <div class="traceability-records-container navBarBox" data-index="2">
                  <div class="bold f17">交易信息校验</div>
                  <div class="gray">只显示近期材料流转记录</div>
                  <div class="traceability-records-listBox">
                    <div class="traceability-records-item" v-for="(scanList,index) in newScanList" :key="index">
                      <div class="traceability-records-icon">
                        <img src="@/assets/image/icon_check_circle.png" alt>
                      </div>
                      <div class="traceability-records-content">
                        <div class="traceability-records-content-item f14">{{scanList.companyName}}【{{scanList.actionContent}}】</div>
                        <div class="traceability-records-content-item grayTime">{{scanList.createDate}}</div>
                      </div>
                    </div>
                    <!-- <div class="traceability-records-item">
                      <div class="traceability-records-lastIcon"></div>
                      <div class="traceability-records-lastcontent f14">您当前是第{{codeScanNominiCount}}个扫码查验者</div>
                    </div> -->
                  </div>
                </div>
              </div>
              <div v-show="modelStatus == 'default'">
                <div class="html-title">{{htmlTitle||''}}</div>
                <div class="html-line"></div>
                <div class="html-content" v-html="htmlcontent"></div>
                <div class="html-scan">
                  <img src="@/assets/image/icon_qrcode.png" alt>
                  <div class="model-content-title">
                    长按扫码关注公众
                    <br>查看更多科普
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

    <mt-popup
      class="mt-pop"
      v-model="showToast"
      popup-transition="popup-fade"
      modal:false
      :style="{ top: buttonBottom + 10 + 'px' }"
    >
      <div class="Toast-box">{{ToastContent}}</div>
    </mt-popup>
    <!-- <span  @click="showPdf('https://xunyuan.materialcircle.com/viewFileOss.htm?ossFileKey=78d0ed36cb4348f98a74cb49858319ac.pdf&ossFileAuthType=prv')"> 123123123</span> -->
    <!-- <span @click="logined()">
      登录
    </span> -->
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
import collapse from "@/components/common/collapse.js";
import {
  setStorage,
  getStorage,
  getMonth,
  removeStorage,
  getNowDay,
  arrReduce,
  getQueryByName,
  getQueryStringByName,
  escape2Html,
  init_platform //判断什么设备
} from "@/config/mUtils";
import {
  getCodeInfo,
  getPdfUrl,
  getProduct,
  getHarmful,
  getwxcode, //获取用户是否关注
  getSubScanInfo,//获取扫码记录
} from "@/server/getData";
import {mapState, mapMutations} from 'vuex'
// import share from 'social-share.js'
import { Popup, Toast } from "mint-ui";
import qrcode from "@/assets/image/icon_qrcode.png";
import appcode from "@/assets/image/icon_qrcode2.jpg";
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      modelStatus:'default',//默认显示弹框
      isActive:false,
      code: "", //二维码的code
      showNav: false, //显示导航
      productObj: {}, //整体obj
      supplierRohsList: [], //所有有害物质列表
      showRohsMore: true, //显示展示更多文案
      projectProductItem: '', //当前产品的信息
      productItemList: [], //子产品列表
      projectProductItemList: "", //
      showProductItemMore: true, //显示展示更多文案
      detectionList: [], //检测报告列表
      showDetectionListMore: true, //检测报告更多
      isShowPopup: false, //是否显示蒙层
      scanList: [], //扫码记录
      newScanList: [], //扫码记录
      proInspectionList: [], //抽检记录
      bantchDate: "", //批次时间
      modelType: true, //模态框类型(false为只显示二维码,true显示html内容)
      htmlTitle: "", //html头部显示文本
      htmlcontent: "", //显示材料和有害物质详情
      showToast: false,
      buttonBottom: 0, //toast显示位置
      ToastContent: "",
      factoryObj: "", //工厂名字
      supplierObj: "", //经销商名字
      scanManSize: [], //扫码人员
      qrcode: "", //显示什么码
      titleInfo: "", //弹框文本显示值
      showmodelType: false, //是否显示模态框
      // subscribe: 0, //是否已关注
      platform: "", //浏览器平台
      tokencode: "", //用户token
      codeScanNominiCount: 0, //扫码人员次数
      pdfUrl: "",
      checkOne: true, //只执行一次
      htmlContentType:'recordList',//弹框内容显示类型 1.'recordList:校验交易记录' 2.'reportCompanyDetail:检测机构'

      proTemplateArr:'',//子组件模板数组
    };
  },
  created(){

  },
  mounted() {
    // 添加监听关闭窗口事件
    let storageSubscribe =   getStorage('subscribe');
    let _this = this;
    this.platform = init_platform();
    console.log(this.platform);
    let code = getQueryStringByName("c");
    if (code) {
      code = code.split("/")[0];
    }
    this.tokencode = getQueryStringByName("code");
    if (this.tokencode) {
      let param = {};
      param.code = this.tokencode;
      getwxcode(param).then(
        res => {
          console.log('resdata',res);
          if (res && res.baseUserInfo && res.baseUserInfo.subscribe == 1) {
            _this.subscribe = 1;
             let stateObj = {};
            let title = "修改地址";
            let newUrl = location.pathname + "?c=" + code+'#/index';
            history.pushState(stateObj, title, newUrl);
            _this.logined();
          } else {
            _this.subscribe = 0;
            let stateObj = {};
            let title = "修改地址";
            let newUrl = location.pathname + "?c=" + code;
            history.pushState(stateObj, title, newUrl);
          }
        },
        err => {}
      );
    }else{
      _this.checklogin();
    }

    this.code = code;
    this.scrollChange();
    //获取code详情
    this.getCodeDetail();
    // var vibibleState = "";
    // var visibleChange = "";

    // if (typeof document.visibilityState != "undefined") {
    //   visibleChange = "visibilitychange";
    //   vibibleState = "visibilityState";
    // } else if (typeof document.webkitVisibilityState != "undefined") {
    //   visibleChange = "webkitvisibilitychange";
    //   vibibleState = "webkitVisibilityState";
    // }
    // if (visibleChange) {
    //   document.addEventListener(visibleChange, function(e) {
    //     if (document[vibibleState] == "visible") {
    //         _this.checklogin()
    //     }
    //   });
    // }
  },

  components:{
    collapse
  },
  computed: {
    subscribe:{
      get(){
        return this.$store.state.subscribeType
      },
      set(val){
        this.$store.state.subscribeType = val
      }
    },
    /**
     * 有害物质显示列表
     */
    showRohsList: {
      get: function() {
        if (this.showRohsMore) {
          if (this.supplierRohsList.length < 2) {
            return this.supplierRohsList;
          }
          let newArr = [];
          for (let i = 0; i < 2; i++) {
            let item = this.supplierRohsList[i];
            newArr.push(item);
          }
          return newArr;
        } else {
          return this.supplierRohsList;
        }
      },
      set: function(val) {
        this.showRohsList = val;
      }
    },
    /**
     * 产品组成
     */
    showChildProductList: {
      get: function() {
        if (this.showProductItemMore) {
          if (this.projectProductItemList.length < 2) {
            return this.projectProductItemList;
          }
          let newArr = [];
          for (let i = 0; i < 2; i++) {
            let item = this.projectProductItemList[i];
            newArr.push(item);
          }
          return newArr;
        } else {
          return this.projectProductItemList;
        }
      },
      set: function(val) {
        this.showChildProductList = val;
      }
    },
    /**
     * 检测报告
     */
    showDetectionList: {
      get: function() {
        if (this.showDetectionListMore) {
          if (this.detectionList.length < 2) {
            return this.detectionList;
          }
          let newArr = [];
          for (let i = 0; i < 2; i++) {
            let item = this.detectionList[i];
            newArr.push(item);
          }
          return newArr;
        } else {
          return this.detectionList;
        }
      },
      set: function(val) {
        this.showDetectionList = val;
      }
    }
  },
  watch: {
    isShowPopup(newVal, oldVal) {
      if (newVal == true) {
        let cssStr = "overflow-y: hidden; height: 100%;";
        document.getElementsByTagName("html")[0].style.cssText = cssStr;
        document.body.style.cssText = cssStr;
      } else {
        let cssStr = "overflow-y: auto; height: auto;";
        document.getElementsByTagName("html")[0].style.cssText = cssStr;
        document.body.style.cssText = cssStr;
      }
      // 下面需要这两行代码，兼容不同浏览器
      document.body.scrollTop = this.pageScrollYoffset;
      window.scroll(0, this.pageScrollYoffset);
    }
  },
  // 注销事件
  destroyed() {
    // 移除监听窗口关闭事件
    removeStorage('subscribe');
  //  window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  methods: {
    pushHistory () {
      let state = {
        title: 'myCenter',
        url: '__SELF__'
      }
      window.history.pushState(state, state.title, state.url)
    },
    // 显示子材料列表
    showChildProduct(item, index, arr){
      // console.log(item,index,arr);
       if (item) {
          item.isActive = !item.isActive;
        }
        this.$set(arr, index, item)
    },
    // 显示检测机构信息
    showInstitutions(){
      this.modelStatus = 'institutions';//显示机构样式
      this.modelType = true;
      this.openModal();
    },
    // 显示交易信息校验
    showProjectCheckDetail(project){
      this.modelStatus = 'record';//显示子产品扫码记录
      this.getSubScanInfoList(project)
    },
    // 获取产品详情
    getSubScanInfoList(project){
      let params = {};
      params.componentId=project.componentId;
      params.childProductSkuID =project.childProductSkuID;
      // params['item.id'] = project
      // params.skuId =174;
      getSubScanInfo(params).then(res=>{
        this.newScanList = res.scanList;
        this.modelType = true;
        this.openModal();
      }).catch(err=>{
        // console.log(err)
      })
    },
    // 退出清除关注状态
    beforeunloadHandler (e) {
      // removeStorage('subscribe');
    },
    logined(){
      this.CHANGE_SUBSCRIBE(1);
    },
    ...mapMutations([
      'CHANGE_SUBSCRIBE'
    ]),
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
    },
    /**
     *
     */
    handleClick(el, productItem) {
      this.buttonBottom = el.srcElement.getBoundingClientRect().top - 60;
      this.ToastContent = productItem.validationCompany;
      if (this.ToastContent) {
        this.showToast = true;
      }
    },
    // 微信打开授权登录
    checklogin() {
      let _this = this;
      if (_this.platform == "wx") {
        let appId = "wxc6b8bf1e61218101";
        let url =
          "http://" +
          window.location.hostname +
          window.location.pathname +
          window.location.search;
        let svc =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          appId +
          "&redirect_uri=" +
          encodeURIComponent(url) +
          "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        // let svc = '';
        // svc='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc6b8bf1e61218101&redirect_uri=https%3a%2f%2fxunyuan.materialcircle.com%2fcode.htm%3fc%3d00000000007&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'

        window.location.href = svc;
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

    /**
     * 获取产品列表
     *
     */
    getProductDetail(product) {
      // console.log(product);
      let _this = this;
      let params = {};
      params["item.id"] = product.id;
      params.skuId = product.childProductSkuID;
      _this.$router.push({ name: "productDetail", query: params});



      // _this.$router.push({url})
      // return new Promise((resovle, reject) => {
      //   getProduct(params).then(
      //     res => {
      //       if (res.product) {
      //         _this.htmlTitle = res.product.name;
      //         if (res.product.htmlContentPc) {
      //           _this.htmlcontent = escape2Html(res.product.htmlContentPc);
      //         }
      //         _this.showModel(true);
      //       } else {
      //       }
      //       resovle(res);
      //     },
      //     err => {
      //       reject(error);
      //       console.log(err);
      //     }
      //   );
      // });
    },
    /**
     * 获取有害物质详情
     */
    getHarmfulDetail(supplierRohs) {
      this.modelType = true;
      let _this = this;
      return new Promise((resovle, reject) => {
        let params = {};
        params["item.id"] = supplierRohs.proHarmfulId;
        console.log(supplierRohs);
        getHarmful(params).then(
          res => {
            if (res.proHarmful) {
              _this.htmlTitle = res.proHarmful.name;
              if (res.proHarmful.description) {
                _this.htmlcontent = escape2Html(res.proHarmful.description);
              }
              _this.showModel(true);
            } else {
              Toast({
                message: "没有有害物质详情!",
                position: "middle",
                duration: 2000
              });
            }
            resovle(res);
          },
          err => {
            Toast({
              message: "获取有害物质详情报错!",
              position: "middle",
              duration: 2000
            });
            reject(error);
            console.log(err);
          }
        );
      });
    },
    /**
     * 获取code详情
     */
    getCodeDetail() {
      let params = {};
      let _this = this;
      params["item.code"] = this.code;
      getCodeInfo(params)
        .then(res => {
          console.log(res);
          // 批次时间
          if (res.bantchDate) {
            _this.bantchDate = res.bantchDate.substring(0, 10);
          } else {
            _this.bantchDate = "无";
          }
          // 扫码次数
          if (res.codeScanNominiCount) {
            _this.codeScanNominiCount = res.codeScanNominiCount;
          } else {
            _this.codeScanNominiCount = 0;
          }

          // _this.projectProductItem = res.projectProductItem; //当前产品的信息
          _this.projectProductItem = res.product; //当前产品的信息
          _this.supplierRohsList = res.supplierRohsList; //有害物质检测列表
          _this.projectProductItemList = res.projectProductItemList; //子产品列表
          let templateArr = [];
          let childComponent = [];
          let proComponentList =  res.proComponentExtJson;

          if(res && res.proCustomizeTemplate && res.proCustomizeTemplate[0] && res.proComponentList){
            // res.proCustomizeTemplate[0].componentNames = '门扇框架,门芯板,门套';//测试数据
            templateArr = res.proCustomizeTemplate[0].componentNames.split(',');//模板组成
            let templateObj = {};
            for(let proTemplateArr of templateArr){
            templateObj[proTemplateArr] = (templateObj[proTemplateArr] || {});
            let templateAll=[];
             for(let proComponent of proComponentList){
               childComponent = proComponent.comName;//模板组成
              //  console.log(childComponent);
                for(let component of childComponent){
                  // console.log('proTemplateArr',proTemplateArr,'component',component,'proComponent',proComponent)
                  if(proTemplateArr == component){
                    templateAll.push(proComponent);
                    templateObj[proTemplateArr].proComponentItems = templateAll;
                    templateObj[proTemplateArr].isActive = false;
                    templateObj[proTemplateArr].templateName = proTemplateArr;

                  }
                }
              }
            }
            _this.proTemplateArr = templateObj;
            // console.log(_this.proTemplateArr)
          }


          _this.detectionList = res.jianCeList; //检测报告列表
          _this.proInspectionList = res.proInspectionList; //抽检记录
          _this.scanList = res.projectProductScanList; //扫码记录
          if (res.projectProductScanList) {
            _this.scanManSize = arrReduce(res.projectProductScanList, "name");
            for (const key in _this.scanManSize) {
              if (_this.scanManSize.hasOwnProperty(key)) {
                if (
                  _this.scanManSize[key].type == 6 ||
                  _this.scanManSize[key].type == 8 ||
                  _this.scanManSize[key].type == 9
                ) {
                  _this.factoryObj = _this.scanManSize[key];
                } else if (_this.scanManSize[key].type == 7) {
                  _this.supplierObj = _this.scanManSize[key];
                }
              }
            }
          }
          _this.productObj = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 展示所有列表
     */
    showAllList(type) {
      this[type] = !this[type];
      // this.showRohsMore = !this.showRohsMore
    },
    /**
     * 滚动条监听
     */
    scrollChange() {
      let _this = this;
      $(window).scroll(function() {
        _this.showToast = false;
        if ($(window).scrollTop() > 80) {
          _this.showNav = true;
        } else {
          _this.showNav = false;
        }
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        var _line = parseInt($(window).height());
        var top = $(window).scrollTop();
        var currentId = ""; //滚动条现在所在位置的item id
        var items = $(".navBarBox");
        $(".topNav-item i")
          .eq(0)
          .addClass("topNav-item-active-bottom-border");
        items.each(function() {
          var _target = parseInt($(this).offset().top - $(window).scrollTop());
          if (_target <= 0) {
            var _i = $(this).attr("data-index");
            $(".topNav-item i").removeClass("topNav-item-active-bottom-border");
            $(".topNav-item i")
              .eq(_i)
              .addClass("topNav-item-active-bottom-border");
          }
          //如果到达页面底部，给左侧导航最后一个加active
          else if (
            $(document).height() ==
            $(window).scrollTop() + $(window).height()
          ) {
            $(".topNav-item i").removeClass("topNav-item-active-bottom-border");
            $(".topNav-item i")
              .eq(2)
              .addClass("topNav-item-active-bottom-border");
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/common";
@import "../style/mixin";
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
#scan-container {
  background: #fff;
}
// 头部
.scan-header-container {
  position: relative;
  .scan-bg-box {
    position: absolute;
    width: 100%;
    z-index: 1;
  }
  .scan-info-container {
    position: relative;
    z-index: 2;
    display: flex;
    padding: 25px 5px 25px 15px;
    .scan-logo-box {
      width: 95px;
    }
    .scan-info-box {
      display: flex;
      flex-flow: column wrap;
      margin: 10px 0px 10px 15px;
      .scan-info-title {
        font-weight: bold;
        color: #fff;
        font-size: 21px;
        letter-spacing: 3px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
      }
      .scan-info-body {
        display: flex;
        flex-flow: row wrap;
        .info-body-box {
          position: relative;
          padding: 0 15px 0 15px;
          font-size: 14px;
          color: #fff;
          .info-body-img {
            position: absolute;
            top: 4px;
            left: 0px;
            width: 11px;
            height: 14px;
          }
          .checkImg {
            width: 13px;
            height: 14px;
          }
          .rootsImg {
            width: 15px;
            height: 13px;
          }
        }
      }
    }
  }
}
// 材料
.product-info-container {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 15px;
  padding: 17px 15px;
  .product-info-title {
    font-size: 20px;
    font-weight: 800;
    color: rgba(16, 29, 55, 1);
    padding-bottom: 5px;
  }

  .product-info-item {
    position: relative;
    padding: 5px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    .product-info-item-title {
      color: #9ba1aa;
      font-size: 13px;
    }
    .product-info-child-box{
      width: 100%;
    }
    .product-info-item-type {
      color: #101d37;
      font-size: 13px;
    }
    .product-info-item-icon{
      display: inline-block;
      width: 20px;
      position: relative;
      height: 20px;
      top: 6px;

    }
  }
  .border-bottom {
    height: 1px;
    background: #eee;
    margin: 15px 0;
  }
  .product-info-check {
    // padding-right: 20px;
    position: relative;
    img {
      width: 14px;
      height: 14px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .product-info-checked {
    width: 15px;
    height: 17px;
  }
  .product-info-more-btn {
    position: relative;
    @include center;
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

// 抽检报告
.sampling-report-container {
  padding: 10px 15px 18px 15px;
  background: #fff;
  position: relative;
  .sampling-report-icon {
    display: inline;
    width: 14px;
    height: 14px;
  }
  .sampling-report-item {
    margin: 15px 0;
  }
}
// 溯源记录
.traceability-records-container {
  padding: 20px 15px;
  background: #fff;
  border-top: 10px solid #f7f7f7;
  .traceability-records-listBox {
    margin-top: 15px;
    margin-left: 8px;
    .traceability-records-item {
      position: relative;
      border-left: 2px dotted #dddddd;
      &:not(:last-child) {
        padding-bottom: 10px;
      }
      line-height: 21px;
      .traceability-records-icon {
        width: 15px;
        height: 15px;
        position: absolute;
        left: -7.5px;
        top: 2px;
      }
      .traceability-records-content {
        padding-left: 14px;
        color: #101d37;
        display: flex;
        flex-flow: column nowrap;
        height: 50px;
        justify-content: space-between;
      }
      .traceability-records-lastIcon {
        width: 15px;
        height: 15px;
        position: absolute;
        left: -7.5px;
        bottom: 0;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(5, 180, 52, 1);
        border-radius: 50%;
        opacity: 1;
      }
      .traceability-records-lastcontent {
        padding-left: 14px;
        color: #101d37;
      }
    }
  }
}
// 跳转小程序
.gowxbox-container {
  border-top: 10px solid #f2f2f2;
  border-bottom: 57px solid #f2f2f2;
  background: #fff;
  line-height: 60px;
  position: relative;
  .gowxbox-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 20px;
    @include ct;
  }
  .gowxbox-title {
    margin-left: 53px;
    color: #333;
    font-size: 15px;
  }
  .gowxbox-arrow {
    width: 7px;
    height: 12px;
    position: absolute;
    right: 16px;
    @include ct;
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
.Toast-box {
  position: absolute;
  top: 0px;
  color: #fff;
  min-width: 50px;
  max-width: 150px;
  background: rgba(0, 0, 0, 0.8);
  right: 0;
  margin-right: 10px;
  border-radius: 5px;
  z-index: 9999;
  padding: 10px 6px 10px 5px;
  word-break: break-all;
  &:before {
    position: absolute;
    content: "";
    bottom: -9px;
    right: 30px;
    transform: translateX(50%);
    border-top: 10px solid rgba(0, 0, 0, 0.8);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
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
</style>
