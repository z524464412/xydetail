// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-aspect-ratio-mini":{},
    "postcss-write-svg":{
    	utf8:false
    },
    "postcss-cssnext":{},
    "postcss-px-to-viewport":{
    	viewportWidth:414, //(Number) The width of the viewport.
    	viewportHeight:736,//(Number) The height of the viewport.
    	unitPrecision:3,//(Number) The decimal numbers to allow the REM units to grow to.
    	viewportUnit:'vw',//(String) 期望单位
    	selectorBlackList:['.ignore','hairlines'],//(array) 设置选择不转换的元素
    	minPixelValue:1,// (Number) 设置最小像素值替换。
    	mediaQuery:false// (Boolean) 允许在媒体查询中转换px。
    },
    "postcss-viewport-units":{},
    "cssnano":{
    	preset:"advanced",
    	autoprefixer:false,
    	"postcss-zindex":false
    }
    
  }
}
