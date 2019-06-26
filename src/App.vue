<template>
  <div>
    <transition name="router-fade" mode="out-in">
		<keep-alive>
		    <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
	</transition>
	<transition name="router-fade" mode="out-in">
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return{

  	}
  },
  created(){
    let that = this
    window.addEventListener('popstate', function () {
      that.$router.back(-2);
    })
  },
  mounted(){

  },
  destroyed() {

  },
  methods: {
  }
}
</script>

<style lang="scss">
	@import './style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .15s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
