<template>
  <div id="scrollBox" class="container">
    <!--轮播图-->
    <div class="swiper-container" style="height: 310px;">
      <img v-if="VRurl" class="vr" src="../../static/images/vr.png" alt />
      <div class="swiper-wrapper">
        <div
          v-for="(bannerItem,bannerIndex) in bannerList"
          class="swiper-slide"
          style="position: relative;"
        >
          <img style="height: 100%;" :src="bannerItem.url" alt />
          <img class="product-logo" :src="supplier.logoUrl" alt />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--轮播图-->
    <!--健康家居 ‧ 有源可循-->
    <div class="healthy-home" @click="navTo('productArticle','about','31','1')">
      <img src="../../static/images/xunyuan-icon.png" alt />
      <div class="healthy-home-line"></div>
      <p>健康家居 ‧ 有源可循</p>
      <i class="mint-toast-icon mintui mintui-back"></i>
    </div>
    <!--健康家居 ‧ 有源可循-->
    <!--认证图标-->
    <div class="authentication-icon-box">
      <div v-for="item in authenticationList">
        <img style="width: 34px;pointer-events: none;" :src="item.src" alt />
        <p>{{item.name}}</p>
      </div>
    </div>
    <!--认证图标-->
    <!--健康危害评价-->
    <div
      v-if="isExposure == 2 || isExposure == 3"
      id="healthy"
      class="module-box"
      style="margin-top: 8px;"
    >
      <div class="title-box">
        <div class="title-left">
          <img style="width: 18px;height: 16px;" src="../../static/images/heart.png" alt />
          <p>健康危害评价</p>
        </div>
        <div class="title-right" @click="navTo('productArticle','about','32','1')">
          <img
            style="width: 14px;height: 14px;margin-right: 5px;"
            src="../../static/images/tip.png"
            alt
          />
          <p>了解如何评价</p>
        </div>
      </div>
      <div class="no-data" v-if="productInfo.grade === 'White' || productInfo.grade === 'NA'">
        <img style="width: 105px;height: 100px;" src="../../static/images/no-data.png" alt />
        <p>本产品不参与健康评价</p>
      </div>
      <div v-else>
        <div class="healthy-content">
          <div style="height: 120px;display: flex;flex-direction: column;justify-content: center;">
            <p v-if="productInfo.grade === 'Green'">健康安全的材料，可以放心使用</p>
            <p
              v-else-if="productInfo.grade === 'Yellow' || productInfo.grade === 'YellowDG'"
            >可使用，建议更环保的替代材料</p>
            <p
              v-else-if="productInfo.grade === 'Red' || productInfo.grade === 'RedDG'"
            >在选材时应尽量避免该类材料</p>
            <div class="healthy-report" @click="checkReport('report',healthAssessment,'健康危害评价')">
              <p>查看健康危害评价报告</p>
              <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
            </div>
          </div>
          <img v-if="productInfo.grade === 'Green'" src="../../static/images/good.png" alt />
          <img
            v-else-if="productInfo.grade === 'Yellow' || productInfo.grade === 'YellowDG'"
            src="../../static/images/caution.png"
            alt
          />
          <img
            v-else-if="productInfo.grade === 'Red' || productInfo.grade === 'RedDG'"
            src="../../static/images/avoid.png"
            alt
          />
        </div>
        <div class="healthy-notes">
          <li>• 绿色：健康安全的材料，可以放心使用；</li>
          <li>• 黄色：可使用，建议更环保的替代材料；</li>
          <li>• 红色：在选材时应尽量避免该类材料；</li>
        </div>
      </div>
    </div>
    <!--健康危害评价-->
    <!--有害物质检测-->
    <div id="harmful" class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 18px;height: 18px;" src="../../static/images/harmful.png" alt />
          <p>有害物质检测</p>
        </div>
        <div class="title-right" @click="navTo('harmful','name')">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
      <div class="content">
        <div class="from-header">
          <p>有害物质</p>
          <p>单位</p>
          <p>国家标准</p>
          <p>检测结果</p>
          <p>合格</p>
        </div>
        <div
          class="from-content"
          v-for="(harmfulItem,harmfulIndex) in harmfulList"
          v-if="harmfulIndex < toShow && harmfulItem.testVal"
        >
          <p>{{harmfulItem.rohsName}}</p>
          <p v-html="harmfulItem.unit"></p>
          <p>{{harmfulItem.rohsValGB}}</p>
          <p>{{harmfulItem.testVal}}</p>
          <img
            style="width: 16px;height: 12px;margin-right: 3px;"
            src="../../static/images/checked.png"
            alt
          />
        </div>
        <div class="test-report-box">
          <div class="test-report-title">
            <div></div>
            <p>第三方检测机构出具的检测报告</p>
          </div>
          <div
            class="test-report-content"
            v-for="(harmfulPDFItem,harmfulPDFIndex) in harmfulPDFList"
            v-if="harmfulPDFIndex < toShow"
            @click="checkReport('report',harmfulPDFItem,'有害物质检测')"
          >
            <img style="width: 12px;height: 17px;" src="../../static/images/PDF.png" alt />
            <p>{{harmfulPDFItem.name.substring(0,harmfulPDFItem.name.length - 4)}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--有害物质检测-->
    <!--认证证书-->
    <div id="authentication" class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 16px;height: 20px;" src="../../static/images/certificate.png" alt />
          <p>认证证书</p>
        </div>
        <div class="title-right" @click="navTo('certificate','name')">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
      <div class="certificate-certification">
        <div
          class="certification-box"
          v-for="(certificatesItem,certificatesIndex) in certificatesList"
          v-if="certificatesIndex < toShow"
          @click="checkReport('report',certificatesItem,'认证证书')"
        >
          <div>
            <img style="width: 32px;" :src="certificatesItem.certificateUrl" alt />
            <p>{{certificatesItem.certificateName}}</p>
          </div>
          <p>有效期至：{{formatDateTime(certificatesItem.validityEnd)}}</p>
        </div>
      </div>
    </div>
    <!--认证证书-->
    <!--为什么喜欢-->
    <div id="like" class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 18px;height: 18px;" src="../../static/images/like.png" alt />
          <p>为什么喜欢</p>
        </div>
        <div class="title-right" @click="navTo('productArticle','about',skuId,'-1')">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
      <div class="why-to-like-box">
        <p class="why-to-like" v-html="like"></p>
      </div>
    </div>
    <!--为什么喜欢-->
    <!--产品信息-->
    <div id="product" class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 18px;height: 18px;" src="../../static/images/info.png" alt />
          <p>产品信息</p>
        </div>
        <div class="title-right" @click="showProduct()">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
      <div class="product-info-box">
        <div class="product-attribute">
          <p>名称:</p>
          <p>{{productInfo.name}}</p>
        </div>
        <div class="product-attribute">
          <p>型号:</p>
          <p>{{productInfo.model}}</p>
        </div>
        <div class="product-attribute">
          <p>规格:</p>
          <p>{{productInfo.spec}}</p>
        </div>
        <div class="product-attribute">
          <p>品牌:</p>
          <p>{{productInfo.brandName}}</p>
        </div>
        <div class="product-attribute">
          <p>所属类别:</p>
          <p>{{productInfo.categoryName}}</p>
        </div>
        <div style="display: flex;">
          <p class="product-model-text product-model-title">生产工厂:</p>
          <div style="width: calc(100% - 90px);">
            <p
              class="product-model-text product-model-content"
              v-for="factoryItem in productInfo.factory"
            >{{factoryItem.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <!--相关视频-->
    <div id="video" class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 21px;height: 16px;" src="../../static/images/video.png" alt />
          <p>相关视频</p>
        </div>
        <div class="title-right" @click="navTo('video','name')">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
      <div class="relevant-video-box">
        <div
          class="relevant-video"
          v-for="(videoItem,videoIndex) in videoList"
          @click="navTo('video','video',videoIndex)"
        >
          <img class="video-play-icon" src="../../static/images/btn-play.png" alt />
          <img class="video-background-img" :src="videoItem.abb" alt />
          <p>{{videoItem.title}}</p>
        </div>
      </div>
    </div>
    <!--相关视频-->
    <!--案例展示-->
    <div id="case" class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 15px;height: 18px;" src="../../static/images/cases.png" alt />
          <p>案例展示</p>
        </div>
        <div class="title-right" @click="navTo('example','name')">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
      <div class="case-presentation-box">
        <div
          class="case-presentation"
          v-for="(casesItem,casesIndex) in casesList"
          @click="casesTo(casesItem)"
        >
          <img :src="casesItem.abb" alt />
          <p>{{casesItem.title}}</p>
          <div></div>
        </div>
      </div>
    </div>
    <!--案例展示-->
    <!--广告位（一张图）-->
    <img class="botton-banner" src="../../static/images/botton-banner.png" alt />
    <!--广告位（一张图）-->
    <!--科普知识-->
    <div id="knowledge" class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 15px;height: 18px;" src="../../static/images/article.png" alt />
          <p>科普知识</p>
        </div>
        <div class="title-right" @click="navTo('knowledge','name')">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
      <div class="knowledge-box">
        <p
          v-for="(articlesItem,articlesIndex) in articlesList"
          v-if="articlesIndex < toShow"
          @click="navTo('productArticle','about',articlesItem.id,articlesItem.showType,articlesItem.url)"
        >{{articlesItem.title}}</p>
      </div>
    </div>
    <!--科普知识-->
    <!--点击进入公众号-->
    <div
      class="module-box"
      style="min-height: auto;margin-bottom: 20px;"
      @click="checkReport('wxapp','','科普知识')"
    >
      <div class="title-box">
        <div class="title-left">
          <img style="width: 24px;height: 24px;" src="../../static/images/user.png" alt />
          <div class="user-number" style="margin-left: 11px;">
            <p>你当前是第 {{browserCount}} 位扫码查验者</p>
            <p>扫码关注公众号了解更多</p>
          </div>
        </div>
        <div class="title-right">
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
    </div>
    <!--点击进入公众号-->
    <!--产品信息弹窗-->
    <div @touchmove.prevent>
      <mt-popup v-model="popupVisible" class="product-popup" lockScroll="true" position="bottom">
        <div class="model-product-info">
          <p>产品信息</p>
          <img
            style="width: 14px;"
            @click="popupVisible = false"
            src="../../static/images/close.png"
            alt
          />
        </div>
        <div class="popup-product-info-box">
          <div class="product-attribute">
            <p>名称:</p>
            <p>{{productInfo.name}}</p>
          </div>
          <div class="product-attribute">
            <p>型号:</p>
            <p>{{productInfo.model}}</p>
          </div>
          <div class="product-attribute">
            <p>规格:</p>
            <p>{{productInfo.spec}}</p>
          </div>
          <div class="product-attribute">
            <p>品牌:</p>
            <p>{{productInfo.brandName}}</p>
          </div>
          <div class="product-attribute">
            <p>所属类别:</p>
            <p>{{productInfo.categoryName}}</p>
          </div>
          <div style="display: flex;">
            <p class="product-model-text product-model-title">生产工厂:</p>
            <div style="width: calc(100% - 90px);">
              <p
                class="product-model-text product-model-content"
                v-for="factoryItem in productInfo.factory"
              >{{factoryItem.name}}</p>
            </div>
          </div>
          <div class="product-attribute">
            <p>产品描述:</p>
            <p class="product-attribute-content" v-html="productInfo.desc"></p>
          </div>
          <div style="display: flex;">
            <p class="product-model-text product-model-title">原材料组成：</p>
            <div
              class="product-attribute-content"
              style="width: calc(100% - 90px);"
              v-if="healthAssessment.type === '2'"
            >
              <p
                class="product-model-text product-model-content"
                v-for="(model) in healthAssessment.modelList"
              >{{model.chemistryMatter}}</p>
            </div>
            <div class="product-attribute-content" style="width: calc(100% - 90px);" v-else>
              <p
                class="product-model-text product-model-content"
                style="color: #0052CCFF"
                v-for="(model) in healthAssessment.modelList"
                @click="toProduct(model.id)"
              >{{model.chemistryMatter}}</p>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
    <!--产品信息弹窗-->

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
              <img :src="qrcode" alt />
              <div class="model-content-title" v-html="titleInfo"></div>
            </div>
            <div class="html-box" v-else>
              <div v-show="modelStatus == 'default'">
                <div class="html-title">{{htmlTitle||''}}</div>
                <div class="html-line"></div>
                <!--<div class="html-content" v-html="htmlcontent"></div>-->
                <div class="html-scan">
                  <img src="@/assets/image/icon_qrcode.png" alt />
                  <div class="model-content-title">
                    长按扫码关注公众
                    <br />查看更多科普
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="model-close" @click="showModel(false)">
            <img src="@/assets/image/icon_close.png" alt />
          </div>
        </div>
      </transition>
    </div>

    <!-- 弹框容器 -->

    <!--顶部导航栏-->
    <div class="navigation-bar" v-if="showNavigation">
      <div id="navigation" style="height: 44px;">
        <div
          v-for="(navigation,index) in navigationList"
          @click="navigationIndex = index"
          v-anchor="modelList(index)"
        >
          <p>{{navigation.name}}</p>
          <div v-if="navigationIndex === index" class="navigation-bar-selected"></div>
        </div>
      </div>
      <div @click="showIcon()">
        <img style="width: 16px;height: 16px;" src="../../static/images/application.png" alt />
      </div>
    </div>
    <div class="navigation-icon-box" v-if="showNavigationIcon">
      <div
        v-for="(navigation,index) in navigationList"
        class="navigation-box"
        v-anchor="modelList(index)"
      >
        <div v-if="index === 0" class="navigation-icon">
          <img style="width: 20px;" :src="navigation.img" alt />
        </div>
        <div v-if="index === 1" class="navigation-icon">
          <img style="width: 20px;" :src="navigation.img" alt />
        </div>
        <div v-if="index === 2" class="navigation-icon">
          <img style="width: 20px;" :src="navigation.img" alt />
        </div>
        <div v-if="index === 3" class="navigation-icon">
          <img style="width: 20px;" :src="navigation.img" alt />
        </div>
        <div v-if="index === 4" class="navigation-icon">
          <img style="width: 20px;" :src="navigation.img" alt />
        </div>
        <div v-if="index === 5" class="navigation-icon">
          <img style="width: 20px;" :src="navigation.img" alt />
        </div>
        <div v-if="index === 6" class="navigation-icon">
          <img style="width: 20px;" :src="navigation.img" alt />
        </div>
        <div v-if="index === 7" class="navigation-icon" style="padding: 15px">
          <img style="width: 20px;" :src="navigation.img" alt />
        </div>
        <p>{{navigation.name}}</p>
      </div>
    </div>
    <div class="mask" v-if="showNavigationIcon" @click="showIcon()"></div>
    <!--顶部导航栏-->
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
import { mapMutations } from "vuex";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import {
  getProductBySkuId,
  getwxcode,
  getProductInfoBySkuId,
  getMakeupsBySkuId,
  getSkuIdByCode
} from "@/api/home";
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
  animate,
  init_platform //判断什么设备
} from "@/config/mUtils";
import { Toast } from "mint-ui";
import { getPDFURL } from "@/utils/auth";
import qrcode from "@/assets/image/icon_qrcode.png";
import appcode from "@/assets/image/icon_qrcode2.jpg";
let Base64 = require("js-base64").Base64;

export default {
  name: "sweepCode",
  data() {
    return {
      bannerList: [], // banner轮播图
      authenticationList: [
        {
          src: require("../../static/images/rating.png"),
          name: "健康评级"
        },
        {
          src: require("../../static/images/source.png"),
          name: "防伪溯源"
        },
        {
          src: require("../../static/images/verify.png"),
          name: "原材料校验"
        },
        {
          src: require("../../static/images/report.png"),
          name: "检测报告"
        }
      ], // 认证图标list
      popupVisible: false, // 产品弹窗是否显示
      skuId: "", //二维码的code
      tokencode: "",
      toShow: 2, // 最多显示
      harmfulList: [], // 有害物质列表
      harmfulPDFList: [], // 有害物质PDF列表
      certificatesList: [], // 证书
      casesList: [], // 案例list
      videoList: [], // 视频list
      productInfo: {
        health_assessment: {}
      }, // 产品信息
      articlesList: [], // 文章list
      like: "", // 为什么喜欢
      platform: init_platform(), //浏览器平台
      showModelType: false, //是否显示模态框
      modelType: true, //模态框类型(false为只显示二维码,true显示html内容)
      qrcode: "", //显示什么码
      titleInfo: "", //弹框文本显示值
      modelStatus: "default", //默认显示弹框
      htmlTitle: "", //html头部显示文本
      healthAssessment: {}, // 健康危害
      isExposure: "", // 不披露
      supplier: {}, //
      browserCount: 0, // 浏览次数
      navigationList: [
        {
          name: "健康危害评价",
          img: require("../../static/images/heart@2x.png")
        },
        {
          name: "有害物质检测",
          img: require("../../static/images/harmful@2x.png")
        },
        {
          name: "认证证书",
          img: require("../../static/images/certificate@2x.png")
        },
        {
          name: "为什么喜欢",
          img: require("../../static/images/like@2x.png")
        },
        {
          name: "产品信息",
          img: require("../../static/images/info@2x.png")
        },
        {
          name: "相关视频",
          img: require("../../static/images/video@2x.png")
        },
        {
          name: "案例",
          img: require("../../static/images/cases@2x.png")
        },
        {
          name: "科普知识",
          img: require("../../static/images/article@2x.png")
        }
      ],
      navigationIndex: 0,
      showNavigation: false, // 显示导航栏
      showNavigationIcon: false, // 显示导航栏图标
      VRurl: ""
    };
  },
  created() {
    document
      .querySelector("html")
      .setAttribute(
        "style",
        "background-color:#f3f5f9;background:#f3f5f9;scroll-behavior: smooth;"
      );
  },
  mounted() {
    let _this = this;
    let code = getQueryStringByName("c");
    let shuId = getQueryStringByName("skuId");
    let id = getQueryStringByName("id");
    if (code) {
      getSkuIdByCode(code)
        .then(res => {
          _this.skuId = res.skuId;
          //获取code详情
          this.getCodeDetail();
          //获取产品详情
          this.getProductInfo();
        })
        .catch(err => console.log(err));
    } else if (shuId) {
      _this.skuId = shuId;
      //获取code详情
      this.getCodeDetail();
      //获取产品详情
      this.getProductInfo();
    } else {
      this.skuId = id;
      //获取code详情
      this.getCodeDetail();
      //获取产品详情
      this.getProductInfo();
    }
    this.tokencode = getQueryStringByName("code");
    console.log("this.tokencode", this.tokencode);
    if (this.tokencode) {
      getwxcode(this.tokencode).then(
        res => {
          console.log("resdata", res);
          if (res && res.baseUserInfo) {
            if (res.baseUserInfo.subscribe == 1) {
              _this.subscribe = 1;
              let stateObj = {};
              let title = "修改地址";
              let newUrl;
              if (code) {
                newUrl = location.pathname + "?c=" + code;
              } else {
                newUrl = location.pathname + "?skuId=" + shuId;
              }
              history.pushState(stateObj, title, newUrl);
              _this.logined();
            } else {
              _this.subscribe = 0;
              let stateObj = {};
              let title = "修改地址";
              let newUrl;
              if (code) {
                newUrl = location.pathname + "?c=" + code;
              } else {
                newUrl = location.pathname + "?skuId=" + shuId;
              }
              history.pushState(stateObj, title, newUrl);
              removeStorage("subscribe");
            }
          }
        },
        err => {}
      );
    } else {
      _this.checklogin();
    }
    if ($(window).scrollTop() > 388) {
      this.showNavigation = true;
    } else {
      this.showNavigation = false;
    }
    this.scrollChange();
    var vibibleState = "";
    var visibleChange = "";

    if (typeof document.visibilityState != "undefined") {
      visibleChange = "visibilitychange";
      vibibleState = "visibilityState";
    } else if (typeof document.webkitVisibilityState != "undefined") {
      visibleChange = "webkitvisibilitychange";
      vibibleState = "webkitVisibilityState";
    }
    if (visibleChange) {
      document.addEventListener(visibleChange, function(e) {
        if (document[vibibleState] == "visible") {
          _this.checklogin();
        }
      });
    }
    if (getStorage("scrollTop")) {
      document.documentElement.scrollTop = getStorage("scrollTop");
      setStorage("scrollTop", "");
    }
  },
  components: {},
  computed: {
    subscribe: {
      get() {
        return this.$store.state.subscribeType;
      },
      set(val) {
        this.$store.state.subscribeType = val;
      }
    }
  },
  methods: {
    ...mapMutations(["CHANGE_SUBSCRIBE"]),
    showProduct() {
      this.popupVisible = !this.popupVisible;
      console.log("埋点产品信息");
      _czc.push(["_trackEvent", "产品信息", "查看更多", "产品展示页获取"]);
    },
    modelList(index) {
      let that = this;
      let list = [
        "healthy",
        "harmful",
        "authentication",
        "like",
        "product",
        "video",
        "case",
        "knowledge"
      ];
      if (that.isExposure !== 2 || that.isExposure !== 3) {
        list.shift();
      }
      return list[index];
    },

    logined() {
      this.CHANGE_SUBSCRIBE(1);
    },

    /**
     * 初始化轮播图
     */
    intSwpier() {
      setTimeout(() => {
        new Swiper(".swiper-container", {
          direction: "horizontal",
          loop: false,
          autoplay: true,
          initialSlide: 0,
          pagination: {
            el: ".swiper-pagination",
            type: "fraction"
          }
        });
      }, 100);
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
     * 获取code详情
     */
    getCodeDetail() {
      let params = {};
      let that = this;
      getProductBySkuId(this.skuId)
        .then(res => {
          let {
            pictures,
            item_to_show,
            harmful,
            certificates,
            cases,
            videos,
            articles,
            description,
            features,
            health_assessment,
            browserCount,
            supplier
          } = res.products;
          let healthAssessment = {};
          that.browserCount = browserCount || 1; // 扫码次数
          that.bannerList = pictures; // banner轮播图
          that.toShow = item_to_show; // 最多显示
          that.harmfulList = harmful.test || []; // 有害物质列表
          that.harmfulPDFList = harmful.test_report || []; // 有害物质PDF列表
          that.certificatesList = certificates; // 证书
          that.casesList = cases; // 案例list
          that.videoList = videos; // 视频list
          that.articlesList = articles; // 文章list
          that.supplier = supplier;
          that.isExposure = health_assessment.isExposure;
          if (
            health_assessment.isExposure !== 2 ||
            health_assessment.isExposure !== 3
          ) {
            that.navigationList.shift();
          }
          //type:1-定制家具，2-标准品
          if (health_assessment.type === "2") {
            healthAssessment = {
              modelList: health_assessment.health_assessment.chemistryMatter,
              url:
                health_assessment.reports.length > 0 &&
                health_assessment.reports[0].url,
              type: health_assessment.type
            };
          } else {
            healthAssessment = {
              modelList:
                health_assessment.health_assessment.chemistryMatterArray[0]
                  .childArray,
              url:
                health_assessment.reports.length > 0 &&
                health_assessment.reports[0].url,
              type: health_assessment.type
            };
          }
          that.healthAssessment = healthAssessment;
          // 初始化轮播图
          this.intSwpier();
          features &&
            (that.like = escape2Html(features).replace(/<img\b[^>]*>/g, "")); // 将img标签去掉
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     *  获取产品详情
     */
    getProductInfo() {
      let that = this;
      getProductInfoBySkuId(this.skuId)
        .then(res => {
          document.title = res.name;
          that.productInfo = res;
          res.desc &&
            (that.productInfo.desc = escape2Html(res.desc).replace(
              /<[^>]+>/g,
              ""
            ));
        })
        .catch(err => console.log(err));
    },

    /**
     * 跳转页面
     */
    navTo(name, type, index, showType, url) {
      if(index != 12 && index != 13){
        console.log('埋点科普知识');
        _czc.push(["_trackEvent", "科普知识", "查看文章", "产品展示页获取"]);
      }
      this.recordScroll();
      let { skuId } = this;
      switch (type) {
        case "name":
          this.$router.push({ name: name, query: { skuId: skuId } });
          break;
        case "video":
          console.log('埋点视频');
          _czc.push(["_trackEvent", "视频", "查看视频", "产品展示页获取"]);
          this.$router.push({
            name: name,
            query: { skuId: skuId, videoIndex: index }
          });
          break;
        case "about":
          if (showType === "0") {
            window.location.href = url;
          } else {
            this.$router.push({
              name: name,
              query: { id: index, showType: showType }
            });
          }
          break;
      }
    },

    casesTo(item) {
      console.log('埋点案例');
      _czc.push(["_trackEvent", "案例", "查看案例", "产品展示页获取"]);
      this.recordScroll();
      if (item.showType === "0") {
        window.location.href = item.url;
      } else {
        this.$router.push({
          name: "productArticle",
          query: { id: item.id, showType: "1" }
        });
      }
    },

    /**
     * 查看检测报告
     */
    checkReport(type, report,clickName) {
      let _this = this;
      // _this.platform = 'wx';
      // _this.subscribe = 1;
      // console.log(_this.subscribe);
      // console.log(_this.platform);
      if (type == "report") {
        if (_this.platform == "wx") {
          // 只要本地有关注值就是已经关注
          let storageSubscribe = getStorage("subscribe");
          if (storageSubscribe && storageSubscribe == 1) {
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
            if (clickName == "认证证书") {
              console.log('埋点认证证书');
               _czc.push(["_trackEvent",'认证证书','查看评价报告','产品详情页获取']);
            } else if (clickName == "有害物质检测") {
              console.log('埋点有害物质检测');
               _czc.push(["_trackEvent",'有害物质检测','查看检测报告','产品详情页获取']);
            } else if (clickName == "健康危害评价") {
              console.log('埋点健康危害评价');
               _czc.push(["_trackEvent",'健康危害评价','查看评价报告','产品详情页获取']);
            }
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
        this.titleInfo = "扫码进入公众号";
        this.qrcode = qrcode;
        this.modelType = false;
        this.showModel(true);
      }
    },

    /**
     * 显示模态框并显示内容
     */
    showModel(type, item) {
      if (type) {
        document
          .querySelector("html")
          .setAttribute(
            "style",
            "background-color:#f3f5f9;background:#f3f5f9;padding-bottom:20px;"
          );
        this.openModal();
      } else {
        this.closeModal();
        document
          .querySelector("html")
          .setAttribute(
            "style",
            "background-color:#f3f5f9;background:#f3f5f9;padding-bottom:20px;scroll-behavior: smooth;"
          );
      }
    },

    /**
     * 格式化时间戳
     */
    formatDateTime(date) {
      return date.substring(0, 10).replace(new RegExp("-", "g"), ".");
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

    showPdf(url) {
      this.recordScroll();
      console.log("url", url);
      let newUrl = url.split("com")[1];
      this.$router.push({ name: "pdf", query: { url: Base64.encode(newUrl) } });
    },

    changeColor(color) {
      let backgroundColor;
      switch (color) {
        case "Green":
          backgroundColor = "#00AF65";
          break;
        case "Yellow":
          backgroundColor = "#FFAB00";
          break;
        case "Red":
          backgroundColor = "#FF5630";
          break;
      }
      return "background-color:" + backgroundColor;
    },

    // 显示子材料列表
    showChildProduct(item, index, arr) {
      // console.log(item,index,arr);
      if (item) {
        item.isActive = !item.isActive;
      }
      this.$set(arr, index, item);
    },

    toProduct(id) {
      this.recordScroll();
      let { search, origin, hash, pathname } = window.location;
      let searchList = search.split("&");
      searchList[0] = "?id=" + id;
      window.location.href = origin + pathname + searchList.join("&") + hash;
    },

    /**
     * 滚动条监听
     */
    scrollChange() {
      let that = this;
      let { navigationList } = this;
      $(window).scroll(function() {
        let isShowNav, index, healthyTop;
        if (that.isExposure == 2 || that.isExposure == 3) {
          healthyTop = document.getElementById("healthy").offsetTop;
        }
        let harmfulTop = document.getElementById("harmful").offsetTop,
          authenticationTop = document.getElementById("authentication")
            .offsetTop,
          likeTop = document.getElementById("like").offsetTop,
          productTop = document.getElementById("product").offsetTop,
          videoTop = document.getElementById("video").offsetTop,
          caseTop = document.getElementById("case").offsetTop,
          knowledgeTop = document.getElementById("knowledge").offsetTop;
        if (that.isExposure == 2 || that.isExposure == 3) {
          if ($(window).scrollTop() > healthyTop - 60) {
            isShowNav = true;
          } else {
            isShowNav = false;
          }
        } else {
          if ($(window).scrollTop() > harmfulTop - 60) {
            isShowNav = true;
          } else {
            isShowNav = false;
          }
        }

        if (that.showNavigation != isShowNav) {
          that.showNavigation = isShowNav;
          console.log("isShowNav", that.showNavigation);
        }
        if (that.isExposure == 2 || that.isExposure == 3) {
          if ($(window).scrollTop() < harmfulTop - 60) {
            index = 0;
          } else if (
            $(window).scrollTop() >= harmfulTop - 60 &&
            $(window).scrollTop() < authenticationTop - 60
          ) {
            index = 1;
          } else if (
            $(window).scrollTop() >= authenticationTop - 60 &&
            $(window).scrollTop() < likeTop - 60
          ) {
            index = 2;
          } else if (
            $(window).scrollTop() >= likeTop - 60 &&
            $(window).scrollTop() < productTop - 60
          ) {
            index = 3;
          } else if (
            $(window).scrollTop() >= productTop - 60 &&
            $(window).scrollTop() < videoTop - 60
          ) {
            index = 4;
          } else if (
            $(window).scrollTop() >= videoTop - 60 &&
            $(window).scrollTop() < caseTop - 60
          ) {
            index = 5;
          } else if (
            $(window).scrollTop() >= caseTop - 60 &&
            $(window).scrollTop() < knowledgeTop - 60
          ) {
            index = 6;
          } else if ($(window).scrollTop() >= knowledgeTop - 60) {
            index = 7;
          }
        } else {
          if ($(window).scrollTop() < authenticationTop - 60) {
            index = 0;
          } else if (
            $(window).scrollTop() >= authenticationTop - 60 &&
            $(window).scrollTop() < likeTop - 60
          ) {
            index = 1;
          } else if (
            $(window).scrollTop() >= likeTop - 60 &&
            $(window).scrollTop() < productTop - 60
          ) {
            index = 2;
          } else if (
            $(window).scrollTop() >= productTop - 60 &&
            $(window).scrollTop() < videoTop - 60
          ) {
            index = 3;
          } else if (
            $(window).scrollTop() >= videoTop - 60 &&
            $(window).scrollTop() < caseTop - 60
          ) {
            index = 4;
          } else if (
            $(window).scrollTop() >= caseTop - 60 &&
            $(window).scrollTop() < knowledgeTop - 60
          ) {
            index = 5;
          } else if ($(window).scrollTop() >= knowledgeTop - 60) {
            index = 6;
          }
        }

        if (that.navigationIndex != index) {
          that.navigationIndex = index;
          if (index > 2) {
            document.getElementById("navigation").scrollTo(80 * index, 0);
          } else {
            document.getElementById("navigation").scrollTo(0, 0);
          }
        }
      });
    },

    showIcon() {
      if (this.showNavigationIcon) {
        this.showNavigationIcon = false;
        document.body.style.overflow = "auto";
      } else {
        this.showNavigationIcon = true;
        document.body.style.overflow = "hidden";
      }
    },
    recordScroll() {
      setStorage("scrollTop", $(window).scrollTop());
    }
  },

  destroyed() {
    document
      .querySelector("html")
      .setAttribute("style", "background-color:#f3f5f9;background:#f3f5f9;");
  }
};
</script>

<style scoped  lang="scss">
@import "../style/common";
@import "../style/mixin";
.container {
  background-color: #ecf1fb;
  overflow-y: scroll;
}
.swiper-pagination {
  width: auto;
  left: calc(50% - 22px);
  background-color: #00000050;
  padding: 5px 10px 4px;
  border-radius: 4vw;
  color: #fff;
}
.healthy-home {
  display: flex;
  height: 50px;
  align-items: center;
  background: linear-gradient(
    270deg,
    rgba(9, 163, 252, 1) 0%,
    rgba(0, 82, 204, 1) 100%
  );
}
.healthy-home img {
  width: 91px;
  margin-left: 15px;
}
.healthy-home p {
  width: 172px;
  height: 25px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 300;
  line-height: 6.4vw;
  color: rgba(255, 255, 255, 1);
}
.healthy-home i {
  transform: rotate(180deg);
  color: #fff;
  position: absolute;
  right: 15px;
}
.healthy-home-line {
  height: 17px;
  width: 1px;
  background-color: #fff;
  margin-left: 20px;
  margin-right: 15px;
}
.authentication-icon-box {
  height: 80px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0px 27px;
  align-items: center;
}
.authentication-icon-box img {
  margin: 0px auto 6px;
}
.authentication-icon-box p {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(66, 82, 110, 1);
}
.module-box {
  margin: 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
}
.title-box {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
.title-left {
  display: flex;
  align-items: center;
}
.title-left p {
  width: 120px;
  height: 28px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 28px;
  color: rgba(16, 29, 55, 1);
  margin-left: 8px;
}
.title-right {
  display: flex;
  align-items: center;
}
.title-right p {
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(172, 180, 198, 1);
}
.botton-banner {
  width: calc(100% - 16px);
  margin: 0 auto 8px;
}
.from-header {
  height: 35px;
  background: rgba(247, 247, 247, 1);
  display: flex;
  align-items: center;
  padding: 0px 15px;
  justify-content: space-between;
}
.from-header p:nth-child(1) {
  width: 143px;
}
.from-header p {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 18px;
  color: rgba(155, 161, 170, 1);
}
.from-content {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
}
.from-content > p:nth-child(1) {
  width: 143px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 21px;
  color: rgba(16, 29, 55, 1);
}
.from-content > p:nth-child(2) {
  color: #101d37;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 16px;
  font-size: 14px;
  width: 52px;
}
.from-content > p:nth-child(3) {
  color: #101d37;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 16px;
  font-size: 14px;
  width: 52px;
}
.from-content > p:nth-child(4) {
  color: #101d37;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 16px;
  font-size: 11px;
  width: 35px;
}
.test-report-box {
  padding: 15px 10px 20px;
}
.test-report-title {
  display: flex;
}
.test-report-title > div {
  width: 0px;
  height: 0px;
  border: 5px solid #acb4c6;
  border-left-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
  margin-top: 5px;
}
.test-report-title > p {
  height: 17px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: rgba(168, 173, 185, 1);
  margin-left: 6px;
}
.test-report-content {
  display: flex;
  align-items: center;
  padding-top: 15px;
}
.test-report-content p {
  margin-left: 12px;
}
.certificate-certification {
  padding: 0px 15px 10px;
}
.certification-box {
  display: flex;
  align-items: center;
  height: 46px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 232, 237, 1);
  box-shadow: 0px 1px 3px rgba(3, 27, 78, 0.1);
  border-radius: 4px;
  justify-content: space-between;
  padding: 0px 10px;
  margin-bottom: 10px;
}
.certification-box > p {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: rgba(168, 173, 185, 1);
}
.certification-box > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.certification-box > div > p {
  margin-left: 12px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 21px;
  color: rgba(16, 29, 55, 1);
}
.product-info-box {
  padding: 10px 15px 20px;
}
.product-attribute {
  display: flex;
}
.product-attribute p {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  border: 0px;
}
.product-attribute p:nth-child(1) {
  color: #9ba1aa;
  width: 90px;
}
.product-attribute p:nth-child(2) {
  color: #101d37;
  width: calc(100% - 90px);
}
.product-attribute-content {
  height: 117px;
  overflow: auto;
}
.product-model-text {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  border: 0px;
}
.product-model-title {
  color: #9ba1aa;
  width: 90px;
  border-top: 0px !important;
}
.product-model-content {
  color: #101d37;
  border-top: 0px !important;
}
.product-popup {
  height: 450px;
  border-radius: 10px 10px 0px 0px;
}
.model-product-info {
  height: 44px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  border-radius: 10px 10px 0px 0px;
}
.model-product-info p {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 25px;
  color: rgba(16, 29, 55, 1);
}
.popup-product-info-box {
  padding: 10px 15px 10px;
  overflow-y: scroll;
}
.relevant-video-box {
  display: flex;
  overflow-x: scroll;
  width: calc(100% - 30px);
  padding: 0px 0px 10px;
  margin: 0px auto;
}
.relevant-video-box > div:nth-child(1) {
  margin-left: 0px;
}
.relevant-video {
  margin-left: 10px;
  position: relative;
}
.relevant-video > .video-background-img {
  width: 140px;
  height: 80px;
}
.relevant-video > .video-play-icon {
  position: absolute;
  width: 24px;
  height: 30px;
  left: calc(50% - 12px);
  top: 31px;
}
.relevant-video p {
  margin: 5px 0px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: rgba(16, 29, 55, 1);
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  width: 140px;
  text-overflow: ellipsis;
}
.case-presentation-box {
  padding: 0px 15px 20px;
  display: flex;
}
.case-presentation {
  position: relative;
  margin-right: 7px;
}
.case-presentation img {
  width: 118px;
  height: 80px;
  border-radius: 4px;
}
.case-presentation div {
  height: 27px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #000;
  opacity: 0.4;
}
.case-presentation p {
  position: absolute;
  bottom: 4px;
  left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 10px);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  z-index: 99;
}
.knowledge-box {
  padding: 0px 0px 10px;
}
.knowledge-box p {
  padding: 11px 15px;
}
.knowledge-box p:nth-child(n + 2) {
  border-top: 1px solid #eeeeee;
}
.user-number p {
  width: auto;
  font-weight: 400;
  font-family: PingFang SC;
  height: auto;
}
.user-number p:nth-child(1) {
  font-size: 15px;
  line-height: 21px;
  color: rgba(16, 29, 55, 1);
}
.user-number p:nth-child(2) {
  font-size: 12px;
  line-height: 17px;
  color: rgba(172, 180, 198, 1);
}
.vr {
  position: absolute;
  bottom: 0px;
  z-index: 111;
  width: 50px;
  height: 40px;
  right: 0px;
}
.product-logo {
  position: absolute;
  top: 10px;
  z-index: 111;
  width: 20%;
  left: 10px;
}
.healthy-content {
  display: flex;
  justify-content: space-between;
  padding: 0px 15px 0px;
}
.healthy-content > img {
  width: 120px;
  height: 120px;
}
.healthy-content > div > p {
  height: 21px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 16px;
  color: rgba(0, 82, 204, 1);
}
.healthy-report {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.healthy-report > p {
  margin-right: 4px;
  color: #42526e;
}
.healthy-notes {
  padding: 20px 15px 15px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: rgba(168, 173, 185, 1);
}
.why-to-like-box {
  height: 185px;
  overflow: hidden;
  padding: 0px 15px 15px;
}
.why-to-like {
  height: 170px;
  overflow: hidden;
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
.product-info-item {
  position: relative;
  padding: 10px 15px 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.product-info-child-box {
  width: 100%;
}
.product-info-child-box span {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 21px;
  color: rgba(16, 29, 55, 1);
}
.product-info-item-icon {
  display: inline-block;
  width: 20px;
  position: relative;
  height: 20px;
  top: 6px;
}
.product-info-checked {
  width: 15px;
  height: 17px;
}
.navigation-bar {
  background-color: #fff;
  position: fixed;
  top: 0px;
  width: 100%;
  height: 44px;
  display: flex;
  z-index: 999;
  border-bottom: 1px solid #eee;
}
.navigation-bar > div:nth-child(1) {
  width: calc(100% - 44px);
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
}
.navigation-bar > div:nth-child(2) {
  width: 44px;
  height: 100%;
  padding: 13px 13px 15px 15px;
  box-shadow: -2px 0px 2px rgba(0, 0, 0, 0.1);
}
.navigation-bar p {
  white-space: nowrap;
  padding: 11px 15px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 21px;
  color: rgba(51, 51, 51, 1);
}
.navigation-bar-selected {
  width: 31px;
  height: 2px;
  background: rgba(0, 82, 204, 1);
  margin: 0px auto;
}
.navigation-icon-box {
  background-color: #fff;
  position: fixed;
  top: 44px;
  width: 100%;
  height: 210px;
  padding: 22px 25px;
  z-index: 99;
}
.navigation-icon {
  width: 50px;
  height: 50px;
  border: 1px solid #eeeeeeff;
  border-radius: 25px;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navigation-box {
  float: left;
  width: 76px;
  text-align: center;
}
.navigation-box p {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 30px;
  color: rgba(66, 82, 110, 1);
  white-space: nowrap;
}
.navigation-icon-box div:nth-child(2) {
  margin: 0px 20px;
}
.navigation-icon-box div:nth-child(3) {
  margin-right: 20px;
}
.navigation-icon-box div:nth-child(6) {
  margin: 16px 20px 0px;
}
.navigation-icon-box div:nth-child(7) {
  margin-right: 20px;
  margin-top: 16px;
}
.navigation-icon-box div:nth-child(5) {
  margin-top: 16px;
}
.navigation-icon-box div:nth-child(8) {
  margin-top: 16px;
}
.mask {
  height: 100vh;
  width: 100%;
  background-color: #000;
  z-index: 80;
  position: fixed;
  top: 0px;
  opacity: 0.7;
  left: 0px;
}
.no-data {
  text-align: center;
  padding: 10px 0px 30px;
}
.no-data img {
  margin: 0px auto;
}
.no-data p {
  padding-top: 10px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #acb4c6;
}
</style>
