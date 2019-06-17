<template>
  <div class="container">
    <!--轮播图-->
    <div class="swiper-container" style="height: 310px;">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in imgList"  class="swiper-slide">
          <img style="height: 100%;" :src="item.src" alt="">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--轮播图-->
    <!--健康家居 ‧ 有源可循-->
    <div class="healthy-home">
      <img src="../../static/images/xunyuan-icon.png" alt="">
      <div class="healthy-home-line"></div>
      <p>健康家居 ‧ 有源可循</p>
      <i class="mint-toast-icon mintui mintui-back"></i>
    </div>
    <!--健康家居 ‧ 有源可循-->
    <!--认证图标-->
    <div class="authentication-icon-box">
      <div v-for="item in authenticationList">
        <img style="width: 34px;pointer-events: none;" :src="item.src" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
    <!--认证图标-->
    <!--健康危害评价-->
    <div class="module-box" style="margin-top: 8px;">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 18px;height: 16px;" src="../../static/images/heart.png" alt="">
          <p>健康危害评价</p>
        </div>
        <div class="title-right">
          <img style="width: 14px;height: 14px;margin-right: 5px;" src="../../static/images/tip.png" alt="">
          <p>了解如何评价</p>
        </div>
      </div>
    </div>
    <!--健康危害评价-->
    <!--有害物质检测-->
    <div class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 18px;height: 18px;" src="../../static/images/harmful.png" alt="">
          <p>有害物质检测</p>
        </div>
        <div class="title-right">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt="">
        </div>
      </div>
      <div class="content">
        <div class="from-header">
          <p>有害物质</p>
          <p>国家标准</p>
          <p>检测结果</p>
          <p>合格</p>
        </div>
        <div class="from-content">
          <p>甲醛</p>
          <div class="content-value">
            <p>≤0.3</p>
            <p>mg/L</p>
          </div>
          <div class="content-value">
            <p>0.25</p>
            <p>mg/L</p>
          </div>
          <img style="width: 16px;height: 12px;" src="../../static/images/checked.png" alt="">
        </div>
        <div class="test-report-box">
          <div class="test-report-title">
            <div></div>
            <p>第三方检测机构出具的检测报告</p>
          </div>
          <div class="test-report-content">
            <img style="width: 12px;height: 17px;" src="../../static/images/PDF.png" alt="">
            <p>xxx成板检测报告</p>
          </div>
          <div class="test-report-content">
            <img style="width: 12px;height: 17px;" src="../../static/images/PDF.png" alt="">
            <p>xxx成板检测报告</p>
          </div>
        </div>
      </div>
    </div>
    <!--有害物质检测-->
    <!--认证证书-->
    <div class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 16px;height: 20px;" src="../../static/images/certificate.png" alt="">
          <p>认证证书</p>
        </div>
        <div class="title-right">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt="">
        </div>
      </div>
      <div class="certificate-certification">
        <div class="certification-box">
          <div>
            <img style="width: 32px;" src="../../static/images/certification-icon.png" alt="">
            <p>证书名称十环</p>
          </div>
          <p>有效期至：2019.5.30</p>
        </div>
        <div class="certification-box">
          <div>
            <img style="width: 32px;" src="../../static/images/certification-icon.png" alt="">
            <p>证书名称十环</p>
          </div>
          <p>有效期至：2019.5.30</p>
        </div>
      </div>
    </div>
    <!--认证证书-->
    <!--为什么喜欢-->
    <div class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 18px;height: 18px;" src="../../static/images/like.png" alt="">
          <p>为什么喜欢</p>
        </div>
        <div class="title-right">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt="">
        </div>
      </div>
    </div>
    <!--为什么喜欢-->
    <!--产品信息-->
    <div class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 18px;height: 18px;" src="../../static/images/info.png" alt="">
          <p>产品信息</p>
        </div>
        <div class="title-right" @click="popupVisible = !popupVisible">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt="">
        </div>
      </div>
      <div class="product-info-box">
        <div class="product-attribute">
          <p>型号:</p>
          <p></p>
        </div>
        <div class="product-attribute">
          <p>规格:</p>
          <p></p>
        </div>
        <div class="product-attribute">
          <p>品牌:</p>
          <p></p>
        </div>
        <div class="product-attribute">
          <p>所属类别:</p>
          <p></p>
        </div>
        <div class="product-attribute">
          <p>生产工厂:</p>
          <p></p>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <!--相关视频-->
    <div class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 21px;height: 16px;" src="../../static/images/video.png" alt="">
          <p>相关视频</p>
        </div>
        <div class="title-right">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt="">
        </div>
      </div>
      <div class="relevant-video-box">
        <div class="relevant-video" style="margin-left: 0px;">
          <img class="video-play-icon" src="../../static/images/btn-play.png" alt="">
          <img class="video-background-img" src="../../static/images/top-banner.png" alt="">
          <p>视频名称01</p>
        </div>
        <div class="relevant-video">
          <img class="video-play-icon" src="../../static/images/btn-play.png" alt="">
          <img class="video-background-img" src="../../static/images/top-banner.png" alt="">
          <p>视频名称01</p>
        </div>
        <div class="relevant-video">
          <img class="video-play-icon" src="../../static/images/btn-play.png" alt="">
          <img class="video-background-img" src="../../static/images/top-banner.png" alt="">
          <p>视频名称01</p>
        </div>
        <div class="relevant-video">
          <img class="video-play-icon" src="../../static/images/btn-play.png" alt="">
          <img class="video-background-img" src="../../static/images/top-banner.png" alt="">
          <p>视频名称01</p>
        </div>
      </div>
    </div>
    <!--相关视频-->
    <!--案例展示-->
    <div class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 15px;height: 18px;" src="../../static/images/cases.png" alt="">
          <p>案例展示</p>
        </div>
        <div class="title-right">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt="">
        </div>
      </div>
      <div class="case-presentation-box">
        <div class="case-presentation">
          <img src="../../static/images/contemporary-kitchen.png" alt="">
          <p>案例展示展示案例案例展示展示案例</p>
        </div>
        <div class="case-presentation">
          <img src="../../static/images/contemporary-kitchen.png" alt="">
          <p>案例展示展示案例案例展示展示案例</p>
        </div>
        <div class="case-presentation">
          <img src="../../static/images/contemporary-kitchen.png" alt="">
          <p>案例展示展示案例案例展示展示案例</p>
        </div>
      </div>
    </div>
    <!--案例展示-->
    <!--广告位（一张图）-->
    <img class="botton-banner" src="../../static/images/botton-banner.png" alt="">
    <!--广告位（一张图）-->
    <!--科普知识-->
    <div class="module-box">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 15px;height: 18px;" src="../../static/images/article.png" alt="">
          <p>科普知识</p>
        </div>
        <div class="title-right">
          <p style="margin-right: 5px;">查看更多</p>
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt="">
        </div>
      </div>
      <div class="knowledge-box">
        <p>
          文章标题01
        </p>
        <p>
          文章标题01
        </p>
        <p>
          文章标题01
        </p>
      </div>
    </div>
    <!--科普知识-->
    <!--点击进入公众号-->
    <div class="module-box" style="min-height: auto;">
      <div class="title-box">
        <div class="title-left">
          <img style="width: 24px;height: 24px;" src="../../static/images/user.png" alt="">
          <div class="user-number" style="margin-left: 11px;">
            <p>你当前是第 85 位扫码查验者</p>
            <p>点击进入循源公众号了解更多</p>
          </div>
        </div>
        <div class="title-right">
          <img style="width: 6px;height: 10px;" src="../../static/images/arrow-right.png" alt="">
        </div>
      </div>
    </div>
    <!--点击进入公众号-->
    <!--产品信息弹窗-->
    <div @touchmove.prevent>
      <mt-popup
        v-model="popupVisible"
        class="product-popup"
        lockScroll="true"
        position="bottom">
        <div class="model-product-info">
          <p>产品信息</p>
          <img style="width: 14px;" @click="popupVisible = false" src="../../static/images/close.png" alt="">
        </div>
        <div class="popup-product-info-box">
          <div class="product-attribute">
            <p>型号:</p>
            <p></p>
          </div>
          <div class="product-attribute">
            <p>规格:</p>
            <p></p>
          </div>
          <div class="product-attribute">
            <p>品牌:</p>
            <p></p>
          </div>
          <div class="product-attribute">
            <p>所属类别:</p>
            <p></p>
          </div>
          <div class="product-attribute">
            <p>生产工厂:</p>
            <p></p>
          </div>
          <div class="product-attribute">
            <p>产品描述:</p>
            <p>禾香板是以农作物秸秆碎料为主要原料，施加MDI胶及功能性添加剂，经高温高压制作而成，它不仅平整光滑、结构均匀对称、板面坚实，具有尺寸稳定性好、强度高、环保、阻燃和耐候性好等特点。</p>
          </div>
        </div>
      </mt-popup>
    </div>
    <!--产品信息弹窗-->
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    name: "sweepCode",
    data(){
      return{
        imgList:[
          {src:require("../../static/images/top-banner.png")},
          {src:require("../../static/images/top-banner.png")},
          {src:require("../../static/images/top-banner.png")},
          {src:require("../../static/images/top-banner.png")},
        ],
        authenticationList:[
          {
            src:require("../../static/images/rating.png"),
            name:"健康评级",
          },
          {
            src:require("../../static/images/source.png"),
            name:"防伪溯源",
          },
          {
            src:require("../../static/images/verify.png"),
            name:"原材料校验",
          },
          {
            src:require("../../static/images/report.png"),
            name:"检测报告",
          },
        ],                        // 认证图标list
        popupVisible:false,                              // 产品弹窗是否显示
      }
    },
    created() {
      // 初始化轮播图
      this.intSwpier();
    },
    mounted(){

    },
    methods: {
      /**
       * 初始化轮播图
       */
      intSwpier(){
        setTimeout(()=>{
          new Swiper('.swiper-container',{
            direction:"horizontal",
            loop: false,
            autoplay:true,
            initialSlide:0,
            pagination: {
              el: '.swiper-pagination',
              type:"fraction",
            },
          });
        },100)
      }
    }
  }
</script>

<style scoped>
  .container{
    background-color: #ECF1FB;
  }
  .swiper-pagination{
    width: auto;
    left: calc(50% - 22px);
    background-color: #00000050;
    padding: 5px 10px 4px;
    border-radius: 11px;
    color: #fff;
  }
  .healthy-home{
    display: flex;
    height:50px;
    align-items: center;
    background:linear-gradient(270deg,rgba(9,163,252,1) 0%,rgba(0,82,204,1) 100%);
  }
  .healthy-home img{
    width: 91px;
    margin-left: 15px;
  }
  .healthy-home p {
    width:172px;
    height:25px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:300;
    line-height: 6.4vw;
    color:rgba(255,255,255,1);
  }
  .healthy-home i {
    transform: rotate(180deg);
    color: #fff;
    position: absolute;
    right: 15px;
  }
  .healthy-home-line{
    height: 17px;
    width: 1px;
    background-color: #fff;
    margin-left: 20px;
    margin-right: 15px;
  }
  .authentication-icon-box{
    height:80px;
    background:#fff;
    display: flex;
    justify-content: space-between;
    padding: 0px 27px;
    align-items: center;
  }
  .authentication-icon-box img{
    margin: 0px auto 6px;
  }
  .authentication-icon-box p{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(66,82,110,1);
  }
  .module-box{
    margin: 0px 8px 8px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px rgba(0,82,204,0.15);
    border-radius:12px;
    min-height:158px;
  }
  .title-box{
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }
  .title-left{
    display: flex;
    align-items: center;
  }
  .title-left p{
    width:120px;
    height:28px;
    font-size:20px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:28px;
    color:rgba(16,29,55,1);
    margin-left: 8px;
  }
  .title-right{
    display: flex;
    align-items: center;
  }
  .title-right p{
    font-size:13px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(172,180,198,1);
  }
  .botton-banner{
    width: calc(100% - 16px);
    margin: 0 auto 8px;
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
    height:35px;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    justify-content: space-between;
    border-bottom:1px solid #EEEEEE;
  }
  .from-content>p:nth-child(1){
    width: 143px;
    height:21px;
    font-size:15px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:21px;
    color:rgba(16,29,55,1);
  }
  .content-value{
    display: flex;
    color: #101D37;
    font-family:PingFang SC;
    font-weight:400;
    line-height:16px;
  }
  .content-value p:nth-child(1){
    font-size: 14px;
  }
  .content-value p:nth-child(2){
    font-size: 11px;
  }
  .test-report-box{
    padding: 15px 10px 20px;
  }
  .test-report-title{
    display: flex;
  }
  .test-report-title>div{
    width: 0px;
    height: 0px;
    border: 5px solid #ACB4C6;
    border-left-color: #fff;
    border-right-color: #fff;
    border-bottom-color: #fff;
    margin-top: 5px;
  }
  .test-report-title>p{
    height: 17px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 17px;
    color: rgba(168,173,185,1);
    margin-left: 6px;
  }
  .test-report-content{
    display: flex;
    align-items: center;
    padding-top: 15px;
  }
  .test-report-content p {
    margin-left: 12px;
  }
  .certificate-certification{
    padding: 0px 15px 10px;
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
  .product-info-box{
    padding: 10px 15px 20px;
  }
  .product-attribute{
    display: flex;
  }
  .product-attribute p{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:24px;
    border: 0px;
  }
  .product-attribute p:nth-child(1){
    color:#9BA1AA;
    width: 90px;
  }
  .product-attribute p:nth-child(2){
    color:#101D37;
    width: calc(100% - 90px);
  }
  .product-popup{
    height: 325px;
    border-radius: 10px 10px 0px 0px;
  }
  .model-product-info{
    height: 44px;
    background-color: #F7F7F7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    border-radius: 10px 10px 0px 0px;
  }
  .model-product-info p{
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:25px;
    color:rgba(16,29,55,1);
  }
  .popup-product-info-box{
    padding: 10px 15px 10px;
    hidden:auto;
    height: 281px;
  }
  .relevant-video-box{
    display: flex;
    overflow-x: scroll;
    width: calc(100% - 30px);
    padding: 0px 0px 10px;
    margin: 0px auto;
  }
  .relevant-video{
    margin-left: 10px;
    position: relative;
  }
  .relevant-video > .video-background-img{
    width: 140px;
    height: 80px;
  }
  .relevant-video > .video-play-icon{
    position: absolute;
    width: 12px;
    height: 15px;
    left: calc(50% - 6px);
    top:38.5px;
  }
  .relevant-video p{
    margin: 5px 0px;
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:20px;
    color:rgba(16,29,55,1);
    height:20px;
  }
  .case-presentation-box{
    padding: 0px 15px 20px;
    display: flex;
    justify-content: space-between;
  }
  .case-presentation{
    position: relative;
  }
  .case-presentation img{
    width: 118px;
    height: 80px;
    border-radius: 4px;
  }
  .case-presentation p{
    position: absolute;
    bottom: 4px;
    left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 10px);
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:20px;
    color:rgba(255,255,255,1);
  }
  .knowledge-box{
    padding: 0px 0px 10px;
  }
  .knowledge-box p{
    padding: 11px 15px;
  }
  .knowledge-box p:nth-child(n+2){
    border-top: 1px solid #EEEEEE;
  }
  .user-number p{
    width: auto;
    font-weight:400;
    font-family:PingFang SC;
    height: auto;
  }
  .user-number p:nth-child(1){
    font-size:15px;
    line-height:21px;
    color:rgba(16,29,55,1);
  }
  .user-number p:nth-child(2){
    font-size:12px;
    line-height:17px;
    color:rgba(172,180,198,1);
  }
</style>
