<template>
  <div class="all">
    <div>
      <!-- <img src="../../static/images/img-calculate@2x.png" alt /> -->
      <iframe
        class="iframe-box"
        id="mainContent"
        :src="iframeSrc"
      ></iframe>
      <div class="center-icon" @click="navRouter()">
        <img style="opacity: 0" src="../../static/images/img-calculate@2x.png" alt />
        <img src="../../static/images/btn-vr.png" alt />
      </div>
    </div>
    <div class="product-box">
      <div class="authentication-tag">
        <p>WELL铂金认证</p>
        <p>LEED铂金认证</p>
      </div>
      <div class="product-title">
        <div>
          <p>朗诗绿色中心</p>
          <p>Landsea Green Center Shanghai</p>
        </div>
        <div>
          <!--<img src="../../static/images/share@2x.png" alt="">-->
          <!--<p>分享</p>-->
        </div>
      </div>
      <div class="harmful-box">
        <div>
          <p>甲醛</p>
          <p>＜0.01mg/m³</p>
          <p>国标≤0.1mg/m³</p>
        </div>
        <div></div>
        <div>
          <p>VOC</p>
          <p>＜0.3mg/m³</p>
          <p>国标≤0.6mg/m³</p>
        </div>
      </div>
      <div class="technology-box" @click="showPdf()">
        <div>
          <img src="../../static/images/technology@2x.png" alt />
          <p>
            <span>14</span>大技术体系共
            <span>108</span>项建筑科技
          </p>
        </div>
        <img src="../../static/images/arrow-right.png" alt />
      </div>
      <div class="product-content">
        <div>
          <p>面积：</p>
          <p>5720㎡</p>
        </div>
        <div>
          <p>用途：</p>
          <p>办公</p>
        </div>
        <div>
          <p>认证：</p>
          <p>WELL铂金、LEED铂金、DGNB认证</p>
        </div>
        <div>
          <p>亮点：</p>
          <p>健康、舒适、节能、环保、智慧</p>
        </div>
        <div
          style="justify-content: space-between;align-items: center;"
          @click="navTo('https://router.map.qq.com/short?l=a6891c6a8e1e89606a852b0385309ab8')"
        >
          <div>
            <p>地址：</p>
            <p style="color:#1B55ABFF;">上海市长宁区临虹路280弄-5号</p>
          </div>
          <img style="width: 9px;height: 15px;" src="../../static/images/arrow-right.png" alt />
        </div>
      </div>
    </div>
    <div class="healthy-home" @click="navToArticle('productArticle','about','31','1')">
      <img src="../../static/images/xunyuan-icon.png" alt />
      <div class="healthy-home-line"></div>
      <p>健康家居 ‧ 有源可循</p>
      <i class="mint-toast-icon mintui mintui-back"></i>
    </div>
  </div>
</template>

<script>
// let  krpano =  require("@/utils/krpano") ;
export default {
  name: "",
  data(){
    return{
      iframeSrc:"https://ilandhouse.oss-cn-shanghai.aliyuncs.com/VRProject/朗诗绿色中心/VR%E6%9C%97%E8%AF%97%E7%BB%BF%E8%89%B2%E4%B8%AD%E5%BF%83/index.html?new="+Math.random()
    }
  },
  mounted() {
    
  },
  methods: {
    //初始化
    initKrpano() {},
    navTo(url) {
      window.open(url);
    },
    navRouter() {
      this.$router.push({ name: "vr" });
    },

    /**
     * 跳转页面
     */
    navToArticle(name, type, index, showType, url) {
      let { skuId } = this;
      switch (type) {
        case "name":
          this.$router.push({ name: name, query: { skuId: skuId } });
          break;
        case "video":
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

    showPdf() {
      window.open(
        "https://xy.materialcircle.com/viewFileOss.htm?ossFileKey=2cc2dfa0f4324f498867664cb6aa1e68.pdf&ossFileAuthType=prv"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../static/style.css";
.all {
  background-color: #fff;
  p {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Segoe UI", "Helvetica Neue", "PingFang SC", "Noto Sans",
      "Noto Sans CJK SC", "Microsoft YaHei", 微软雅黑, sans-serif;
  }
}
#mainContent {
  width: 100%;
  height: 280px;
}
.center-icon {
  height: 280px;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.3;
  }
  > img:nth-child(2) {
    position: absolute;
    width: 70px;
    animation: scaleDraw 5s ease-in-out infinite;
  }
}
@keyframes scaleDraw {
  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
}
.product-box {
  padding: 20px;
  margin-bottom: 50px;
}
.authentication-tag {
  display: flex;
  p {
    width: 96px;
    height: 18px;
    background: rgba(252, 219, 143, 1);
    opacity: 1;
    border-radius: 2px;
    margin: 0px;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    color: rgba(168, 103, 0, 1);
  }
  p:nth-child(1) {
    margin-right: 18px;
  }
}
.product-title {
  display: flex;
  justify-content: space-between;
  margin: 8px 0px 23px;
  > div:nth-child(1) {
    p:nth-child(1) {
      font-size: 24px;
      font-weight: 600;
      line-height: 29px;
      color: rgba(16, 29, 55, 1);
    }
    p:nth-child(2) {
      font-size: 14px;
      font-family: Helvetica;
      font-weight: 400;
      line-height: 16px;
      color: rgba(177, 177, 177, 1);
    }
  }
  > div:nth-child(2) {
    align-items: center;
    display: flex;
    flex-direction: column;
    img {
      width: 17px;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 29px;
      color: rgba(37, 56, 88, 1);
    }
  }
}
.harmful-box {
  display: flex;
  div:nth-child(1),
  div:nth-child(3) {
    width: calc(50% - 1px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > p:nth-child(1) {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: rgba(37, 56, 88, 1);
    }
    > p:nth-child(2) {
      font-size: 20px;
      font-weight: bold;
      line-height: 22px;
      color: rgba(0, 82, 204, 1);
    }
    > p:nth-child(3) {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 17px;
      color: rgba(122, 130, 143, 1);
    }
  }
  > div:nth-child(2) {
    height: 70px;
    border: 1px solid rgba(221, 221, 221, 1);
  }
  > div:nth-child(3) {
    padding-left: 40px;
  }
}
.technology-box {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    p {
      line-height: 16px;
      margin-left: 10px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(16, 29, 55, 1);
      span {
        color: #0052ccff;
        font-size: 16px;
      }
    }
  }
  img:nth-child(1) {
    width: 25px;
  }
  img:nth-child(2) {
    width: 9px;
    height: 15px;
  }
}
.product-content {
  margin-top: 21px;
  div {
    display: flex;
    p:nth-child(1) {
      font-size: 16px;
      font-weight: 400;
      line-height: 31px;
      color: rgba(155, 161, 170, 1);
      width: 60px;
    }
    p:nth-child(2) {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 31px;
      color: rgba(16, 29, 55, 1);
    }
  }
}
.healthy-home {
  position: fixed;
  bottom: 0px;
  width: 100%;
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
</style>
