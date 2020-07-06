<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--引用全局组件-->
    <Login></Login>
  </div>
</template>

<style>
  .distpicker-address-wrapper{
    width: 100%;
    background: #fff;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left:0;
  }
  .address-container {
    height: 300px;
    overflow-y: auto;
  }

  /*公共样式*/
  .content{width:7.5rem;height:auto;margin:0 auto;font-size:0;overflow: hidden;}
  /*.arrow_right{
      width: 0.11rem;
      margin-left: 0.1rem;
  }
  .arrow_down{
      width: 0.18rem;
      margin-left: 0.1rem;
  }*/
  .arrow{
    margin-left: 0.1rem;
  }
  .arrow .fa{
    font-size: 0.31rem;
    color: #7f7f7f;
  }
/*  .check_btn{
    width: 0.247rem;
    height: 0.247rem;
    margin-left: 0.25rem;
  }*/
  .check_btn{
    width: 0.247rem;
    height: 0.247rem;
    margin-left: 0.25rem;
    background-image: url("./assets/images/icon_unchecked.png");
    background-size: cover;
    display: inline-block;
  }
  .checked .check_btn{
    background-image: url("./assets/images/icon_checked.png");
  }


  .btn_all{
    width: 6.8rem;
    margin: 0 auto;
    display: block;
  }
  .btn_all img{
    width: 100%;
  }


/*  .coupon_layer{
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%,-50%);
  }*/
  .coupon_layer>div,.coupon_list li>div{
    width: 6.8rem;
    box-sizing: border-box;
    padding: 0 0.33rem;
    border-radius: 0.133rem;
    background: #fff;
  }
  .coupon_layer .header,.coupon_list .header{
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.266rem;
    color: #4b4b4b;
    -moz-box-shadow:0px -5px 10px #EEEEEE;
    -webkit-box-shadow:0px -5px 10px #EEEEEE;
    box-shadow:0px -5px 10px #EEEEEE;
  }
  .coupon_layer .header i{
    width: 0.226rem;
    height: 0.226rem;
    display: block;
    background: url("./assets/images/icon_fork.png") no-repeat;
    background-size: 100% 100%;
  }
  .coupon_layer .content,.coupon_list .content{
    font-size: 0.25rem;
    color: #afaeae;
    line-height: 0.4rem;
    padding: 0.33rem;
    margin-top: 0.033rem;
    -moz-box-shadow:0px 5px 10px #EEEEEE;
    -webkit-box-shadow:0px 5px 10px #EEEEEE;
    box-shadow:0px 5px 10px #EEEEEE;
  }

  /*登录、注册、找回密码*/
  .login{
    height: 100%;
    position: relative;
  }
  .login_box{
    width: 6.16rem;
    padding: 0 0.67rem;
    position: absolute;
    left:0;
    top: 0.91rem;
    bottom: 0;
    overflow: hidden;
    background: #fff;
  }
  .login_box h1{
    font-size: 0.4rem;
    color: #f03d37;
    margin-top: 0.9rem;
  }
  .login_box h2{
    font-size: 0.26rem;
    color: #636363;
    margin: 0.3rem 0 1.2rem 0;
  }
  .login_box .agreement,
  .order_oneClick .agreement{
    font-size: 0.22rem;
    color: #b5b5b5;
    margin: 0.56rem 0 0.22rem 0;
  }
  .order_oneClick .agreement{
    margin-top: 0;
  }
  .login_box .agreement a,
  .order_oneClick .agreement a{
    color: #e8554d;
  }
  .linkBtn_box{
    margin-top: 0.22rem;
    display: flex;
    scroll-snap-align: center;
    justify-content: space-between;
  }
  .linkBtn_box a{
    font-size: 0.24rem;
    color: #e55049;
    text-decoration: underline;
  }

  /*协议*/
  .agreement_box{
    width: 6.9rem;
    padding: 0 0.3rem;
  }
  .agreement_box h1{
    color: #4b4b4b;
    font-size: 0.3rem;
    line-height: 0.9rem;
  }
  .agreement_box h2{
    color: #393939;
    font-size: 0.23rem;
    line-height: 0.45rem;
  }
  .agreement_box p{
    color: #838383;
    font-size: 0.2rem;
    line-height: 0.44rem;
  }
</style>
