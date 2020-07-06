<template>
    <div class="content benefit">
        <div class="layer_wrap">
            <div class="my_head"><img src="../../assets/images/head_default.png"></div>
            <p>157****880</p>
            <div class="layer_benefit">
                <div class="img_benefit" ref="benefit_type">
                    <p> 我从超人修领到1张优惠券，<br/>接受光明的邀请，领劵体验</p>
                </div>
                <div class="coupon_layer"  ref="use_coupon">
                    <div class="header">
                        <p>优惠劵说明</p>
                        <i @click="closeLayer()"></i>
                    </div>
                    <div class="content">
                        <p>1.每个订单只能使用一张优惠劵，无法与其他优惠劵或者优惠活动同时使用。</p>
                        <p>2.优惠劵不设找零，不折线，仅限使用一次。</p>
                        <p>3.如使用后发生退款，优惠劵不作为退款款项。</p>
                        <p>4.优惠劵仅限在超人修微信公众号下单使用。</p>
                        <p>5.本活动最终解释权归超人修所以。</p>
                    </div>
                </div>
                <img class="img_border" src="../../assets/images/benefit_bg4.png">
            </div>
        </div>
        <p class="coupon_rule" @click="lookRule">优惠券使用规则</p>
        <ButtonBox buttonName="马上领取" @buttonClick="buttonClick"></ButtonBox>
    </div>
</template>

<script>
    import ButtonBox from '../../components/ButtonBox'
    export default {
        name: "Benefit",
        components: {
            ButtonBox
        },
        methods:{
            buttonClick(){
                console.log('领取成功')
            },
            lookRule(){
                this.$refs.use_coupon.style.display="block";
                this.$refs.benefit_type.style.display="none";
            },
            closeLayer(){
                this.$refs.benefit_type.style.display="block";
                this.$refs.use_coupon.style.display="none";
            }
        },
        mounted () {
            document.querySelector('body').setAttribute('style', 'background:#fff');
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style');
        },
    }
</script>

<style scoped>
.layer_wrap{
    width: 7.5rem;
    height: 10.55rem;
    background: url(../../assets/images/benefit_bg3.png) no-repeat top center;
    background-size: 100% 100%;
    position: relative;
}
.layer_benefit{
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 1.93rem;
}
.img_benefit{
     width: 5.14rem;
    height: 5.33rem;
    background: url(../../assets/images/benefit_￥50.png) no-repeat;
    background-size: 100% 100%;
     margin: 0 auto;
    position: relative;
 }
.img_benefit >p{
    font-size: 0.2rem;
    color: #be2738;
    font-weight: bold;
    margin-top: 1rem;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 1.03rem;
    left:0;
}
.layer_benefit .img_border{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
}
.my_head{
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    border: 0.03rem solid #fff;
    overflow: hidden;
    position: absolute;
    left: 50%;
    bottom: 8.5rem;
    transform: translateX(-50%);
}
.my_head img{
    width: 100%;
    height: 100%;
}
.layer_wrap >p{
    width: 100%;
    font-size: 0.33rem;
    color: #fff;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 7.65rem;
}
.benefit .coupon_rule{
    font-size: 0.186rem;
    color: #e9574f;
    text-align: center;
    margin: 0.23rem 0;
}


.coupon_layer{
    display: none;
    width: 6.8rem;
    margin: 0 auto;
}
.coupon_layer .content,.coupon_list .content{
    text-align: left;
    margin-bottom: 0.6rem;
}
</style>