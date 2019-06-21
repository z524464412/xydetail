import { MessageBox} from 'mint-ui';
import { Indicator} from 'mint-ui';
/**
 * 请求错误处理
 */
export const catchError = function(error){
    if(error){
        MessageBox('服务端异常，请联系技术支持');
        Indicator.close();
    }
    if (error.response) {
    switch (error.response.status) {
      case 400:
        MessageBox('请求参数异常')
        break;
      case 403:
        MessageBox('无访问权限，请联系企业管理员');
        break;
      default:
        MessageBox('服务端异常，请联系技术支持');
    }
  }
  return Promise.reject(error);
}
/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr];
    }else{
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height;
	let setTop;
	let paddingBottom;
	let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',() => {
       loadMore();
    }, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
	element.addEventListener('touchstart',() => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element,'paddingBottom');
        marginBottom = getStyle(element,'marginBottom');
    },{passive: true})

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove',() => {
       loadMore();
    },{passive: true})

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend',() => {
       	oldScrollTop = document.body.scrollTop;
       	moveEnd();
    },{passive: true})

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
            	cancelAnimationFrame(requestFram);
            	//为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
            	height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    }else if(duration instanceof String){
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") {
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        }else{
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr])*rootSize);
        }else{
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch(mode){
                case 'ease-out':
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration*20/400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch(mode){
                case 'ease-out':
                    status = iCurrent != target[attr];
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr];
            }

            if (status) {
                flag = false;
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                }else{
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}

/**

*分享朋友，朋友圈

*@param {title, desc, link, icon} title 分享标题，desc 分享描述，link 分享链接，icon 分享图标

*/
let shareOpt = {
  title:'',
  desc:'',
  link:'',
  icon:''
}

export {shareOpt}
//初始化微信

export function wxReady(){
//初始化微信设置
    wx.ready(function(){
      wx.onMenuShareTimeline({
        title: shareOpt.title, // 分享标题
        link: shareOpt.link, // 分享链接
        imgUrl: shareOpt.icon, // 分享图标
        success: function () {
          _czc.push(['_trackEvent', '邀请好友', '分享', '分享朋友圈']);
        },
        cancel: function () {
          _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享朋友圈']);
        }
      });
      wx.onMenuShareAppMessage({
        title: shareOpt.title, // 分享标题
        desc: shareOpt.desc, // 分享描述
        link: shareOpt.link, // 分享链接
        imgUrl: shareOpt.icon, // 分享图标
        success: function () {
          _czc.push(['_trackEvent', '邀请好友', '分享', '分享微信好友']);
        },
        cancel: function () {
          _czc.push(['_trackEvent', '邀请好友', '分享', '取消分享微信好友']);
            }
          });
        })
}
//获取本日日期
export function getNowDay(){
    let day2 = new Date();
    day2.setTime(day2.getTime());
    let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
    return s2
}
//获取昨天日期
export function beforeDay(){
  var day1 = new Date();
  day1.setTime(day1.getTime()-24*60*60*1000);
  var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
  return s1;
}
//获取明天日期
export function getNextDay(){
  var day3 = new Date();
  day3.setTime(day3.getTime()+24*60*60*1000);
  var s3 = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
  return s3;
}
//获取当月日期
export function getMonth(Fn) {
    // 获取当前月的第一天
    let start = new Date();
    start.setDate(1);
    // 获取当前月的最后一天
    let date = new Date();
    let currentMonth = date.getMonth();
    let nextMonth = ++currentMonth;
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    let oneDay = 1000 * 60 * 60 * 24;
    let end = new Date(nextMonthFirstDay - oneDay);
    let startDate = transferDate(start); // 日期变换
    let endDate = transferDate(end); // 日期变换
    return startDate + '~' + endDate;
}
//获取当前年
export function getNowYear(){
    var myDate = new Date();
    myDate.getYear(); //获取当前年份(2位)
    let y = myDate.getFullYear();
    let startDate = '01-01'
    let endDate = '12-31'
    return y+'-'+startDate+'~'+y+'-'+endDate;
}

//获取周日期格式
export function getWeek(Fn) {
    //按周日为一周的最后一天计算
    let date = new Date();
    //今天是这周的第几天
    let today = date.getDay();
    //上周日距离今天的天数（负数表示）
    let stepSunDay = -today + 1;
    // 如果今天是周日
    if (today == 0) {

        stepSunDay = -7;
    }
    // 周一距离今天的天数（负数表示）
    let stepMonday = 7 - today;
    let time = date.getTime();
    let monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
    let sunday = new Date(time + stepMonday * 24 * 3600 * 1000);
    //本周一的日期 （起始日期）
    let startDate = transferDate(monday); // 日期变换
    //本周日的日期 （结束日期）
    let endDate = transferDate(sunday); // 日期变换
    return startDate + '~' + endDate;
}
//改变时间格式
export function getTaskTime(strDate) {
  var date = new Date(strDate);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  // var str = y+"-"+m+"-"+d+" "+h+":"+minute;
  var str = y+"-"+m+"-"+d;
  return str;
}
function transferDate(date) {
        // 年
    let year = date.getFullYear();
    // 月
    let month = date.getMonth() + 1;
    // 日
    let day = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    let dateString = year + '-' + month + '-' + day;
    return dateString;
}
/*
*图片压缩

*@param {input_file, func}

*/
export function yasuo(input_file, func) {
  console.log(input_file)
  console.log(func)
    lrz(input_file)
    .then(function (results) {
        // 处理成功会执行
        console.log(results)
      func(results);
    })
    .catch(function (err) {
      console.error(err);
        // 处理失败会执行
    })
    .always(function () {
       console.log('压缩结束');
        // 不管是成功失败，都会执行
    });
  // lrz(input_file, {
  //   width: 750,
  //   before: function() {
  //     console.log('压缩开始');
  //   },
  //   fail: function(err) {
  //     console.error(err);
  //   },
  //   always: function() {
  //     console.log('压缩结束');
  //   },
  //   done: function(results) {
  //     console.log(results)
  //     func(results.base64);
  //   }
  // });
}

//
export function convertBase64UrlToBlob(urlData) {
  // //去掉url的头，并转换为byte
  // var bytes = window.atob(urlData.split(',')[1]);
  // //处理异常,将ascii码小于0的转换为大于0
  // var ab = new ArrayBuffer(bytes.length);
  // var ia = new Uint8Array(ab);
  // for (var i = 0; i < bytes.length; i++) {
  //   ia[i] = bytes.charCodeAt(i);
  // }
  // return new Blob([ab], {
  //   type: 'image/png'
  // });
}
//获取所有的name
export function getNameDta(arr){
  var result = new Array();
  for (var i in arr) {
    if (arr[i].name != '') {
      let aa = {};
      aa.name =arr[i].name
      aa.id = arr[i].id;
      result.push(aa);
    }
  }
  return result;
};

//获取url中hash中的name
export function getQueryByName(name){
  let result = location.hash.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
      return "";
  }
  return result[1];
}
export function  getQueryStringByName(name){
  let result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
      return "";
  }
  return result[1];
}

/**
 * 数组去重`
 * arr(需要去重的数组)
 * key(以什么值去重)
 */

 export const arrReduce = (arr,key)=>{
  var result = [];
  var obj ={};
  for (const i in arr) {
    if (arr.hasOwnProperty(i)) {
      if(!obj[arr[i][key]]){
        result.push(arr[i])
        obj[arr[i][key]] =true;
      }
    }
  }
  return result
 }

/**
 * 标签的反转义
 */
 export const  escape2Html = (str)=> {
  var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){
    return arrEntities[t];
  });
}


/**
 * 判断浏览器环境
 */
  export  const init_platform  = ()=> {
    const userAgent = navigator.userAgent.toLowerCase();
    let platform='';
    if((userAgent.match(/MicroMessenger/i) == "micromessenger")) {
      platform='wx';//是微信浏览器
    }else{
      platform = 'order'
    }
    return platform
  }


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
