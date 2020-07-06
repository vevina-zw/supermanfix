<template>
    <div class="content">
        <PageHeader headerTitle="邀请有奖" :isBorderBottom='false'></PageHeader>
        <img class="banner" src="../../assets/images/invite_banner.png">
        <div class="invite_box">
            <div class="my_head"><img src="../../assets/images/head_default.png"></div>
            <h1>157****880</h1>
            <p>送给好友20元优惠劵，当他首次下单成功完成维续，您将获得10元优惠劵奖励。当ta第二次及艺术成功下单并成功完成维修，您将获得5元优惠劵奖励。</p>
            <div class="button_box">
                <p>邀请好友</p>
                <p>面对面扫码</p>
            </div>
            <span>优惠券使用规则</span>
            1127 750
            28 ?
        </div>
    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    export default {
        name: "Invite",
        components: {
            PageHeader
        },
        mounted () {
            document.querySelector('body').setAttribute('style', 'background:#fff;');
        },
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        }
    }
</script>

<style scoped>
.banner{
    width: 7rem;
    padding: 0 0.25rem;
}
.invite_box{
    width: 6.9rem;
    padding: 0 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.my_head{
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    border: 0.03rem solid #fff;
    overflow: hidden;
    margin-top: 0.34rem;
}
.my_head img{
    width: 100%;
    height: 100%;
}
.invite_box h1{
    width: 100%;
    font-size: 0.33rem;
    color: #5c5c5c;
    text-align: center;
    font-weight: normal;
    line-height: 0.6788rem;
}
.invite_box >p{
    width: 4.46rem;
    color: #a5a5a5;
    font-size: 0.233rem;
    line-height: 0.426rem;
    margin-top: 0.38rem;
}
.invite_box >span{
    color: #e9574f;
    font-size: 0.1863rem;
    margin-top: 0.48rem;
}
.button_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top:1.34rem;
}
.button_box p{
    width: 3.274rem;
    height: 0.83rem;
    background: url(../../assets/images/btn_bg2.png) no-repeat;
    background-size: 100% 100%;
    font-size: 0.27rem;
    color: #fff;
    line-height: 0.833rem;
    text-align: center;
}
</style>