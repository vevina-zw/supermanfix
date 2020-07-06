<template>
    <div class="content">
        <PageHeader headerTitle="会员规则" :isBorderBottom='false'></PageHeader>
        <div class="agreement_box">
            <h2>什么是超人修会员？</h2>
            <p>在超人修网站注册/下单维修的用户，将自动成为超人修的会员，超人修会员有区分等级，会员等级越高，享受的会员权益越丰富，修手机折扣也越高。</p>
            <h2>什么是会员成长值？</h2>
            <p>会员成长值是用户在平台完成维修订单后对应消费金额所累积的虚拟数值，不可折现或兑换。成长值一经产生始终有效，不清零。会员成长值是会员等级判定的重要标准。</p>
            <h2>如何获取会员成长值？</h2>
            <p>每实际消费金额1元=1点成长值（单笔订单最多获得400个成长值）。会员推荐一个新用户注册维修首单完成后，推荐人获得200个成长值；若被推荐者非新用户，推荐人获得50个成长值。</p>
            <h2>会员等级规则</h2>
            <p>
                V1会员：0≤会员成长值＜700；<br/>
                V2会员：700≤会员成长值＜1500；<br/>
                V3会员：1500≤会员成长值＜3000；<br/>
                V4会员：3000≤会员成长值＜4000；<br/>
                V5会员：4000≤会员成长值＜5000；<br/>
                V6会员：5000≤会员成长值；
            </p>
            <h2>不同等级有何特权？</h2>
            <p>请返回上一页，点击 【我的特权-全部特权】查看</p>
        </div>
    </div>
</template>

<script>
    import PageHeader from '../../../components/PageHeader'
    export default {
        name: "AboutRights",
        components: {
            PageHeader
        },
    }
</script>

<style scoped>

</style>