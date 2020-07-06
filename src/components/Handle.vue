<template>
    <div class="handle_box">
        <div class="amount_box">
            <h1>维修参考价 : <span>{{amountDesc}}</span> <small>{{discountDesc}}</small></h1>
            <h2>维修成功后支付，实际以检测为准</h2>
        </div>
        <!--<router-link class="next_btn" :to="nextPath">{{btnText}}</router-link>-->
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Handle",
        props: {
            amountDesc: String,
            discountDesc: String,
            /*btnText: String,
            nextPath: String*/
        }
    }
</script>

<style scoped>
    .handle_box{
        width: 7.5rem;
        height: 1.16rem;
        background: #fff;
        position: fixed;
        left: 50%;
        bottom: 0;
        margin-left:-3.75rem;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: space-between;
        -moz-box-shadow:0px -5px 10px #F1F1F1;
        -webkit-box-shadow:0px -5px 10px #F1F1F1;
        box-shadow:0px -5px 10px #F1F1F1;
    }
    .handle_box .next_btn{
        width: 2.02rem;
        height: 1.16rem;
        background: url(../assets/images/text_bg2.png) no-repeat;
        background-size: 100% 100%;
        line-height: 1.16rem;
        text-align: center;
        font-size: 0.3rem;
        color: #fffdfd;
    }
    .handle_box .amount_box{
        flex:1;
        height: 100%;
        box-sizing: border-box;
        padding: 0.15rem 0 0.15rem  0.35rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .handle_box .amount_box h1{
        font-size: 0.267rem;
        color: #444;
    }
    .handle_box .amount_box h1 span{
        width: 0.23rem;
        color: #e55049;
    }
    .handle_box .amount_box h1 small{
        font-size: 0.2rem;
        color: #686868;
    }
    .handle_box .amount_box h2{
        font-size: 0.22rem;
        color: #a2a2a2;
    }
</style>