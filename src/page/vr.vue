<template>
  <div style="position: relative">
    <iframe class="iframe-box" id="mainContent" src="https://ilandhouse.oss-cn-shanghai.aliyuncs.com/VRProject/LGC/index.html"></iframe>
    <div class="material-science">
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
          <div class="material-item" v-for="n in 9">
            <div>
              <img src="../../static/images/hexiangban-1@2x.png" alt="">
              <div>
                <p>三棵树美净丽墙面漆</p>
                <p>5L/内墙乳胶漆</p>
                <p>CAUTION</p>
              </div>
            </div>
            <i class="mint-toast-icon mintui mintui-back"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        showDialog:false,
      }
    },
    methods:{
      addClass(){
        document.getElementById('dialog').className = 'material-dialog animated fadeOut';
        setTimeout(()=>{
          this.showDialog = false
        },1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../static/animate.css";
  .iframe-box{
    width: 100%;
    height: 100vh;
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
    right: 0px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    .click-box{
      height: 100%;
      width: 100%;
      z-index: 1;
    }
    .material-box{
      width:324px;
      height:440px;
      background:rgba(0,0,0,0.8);
      border-radius:4px;
      z-index: 889;
      position: absolute;
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
        margin-bottom:10px;
        >div{
          display: flex;
          img{
            width: 70px;
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
              background:rgba(255,171,0,1);
              opacity:1;
              border-radius:2px;
              font-size:12px;
              font-weight:400;
              line-height:20px;
              color:rgba(255,255,255,1);
              padding: 0px 5px;
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
</style>
