<template>
    <div class="content orderOneCheck">
        <PageTheme imgTitle="upgrade" title="内存升级">
            <div class="upgrade_box">
                <img src="../../assets/images/upgrade_content.png">
                <div class="agreement_box">
                    <h1>常见问题</h1>
                    <h2>1.哪些手机型号可以扩容？</h2>
                    <p>超人修目前支持扩容的型号为iPhone6/6Plus/6s/6sPlus/7/7Plus，安卓手机不支持内存升级。iPhone 5s以下机型以及iPad因为机身内部结构的原因，升级容易出现风险，不建议做扩容。</p>
                    <h2>2.扩容有风险么？</h2>
                    <p>只要手机正常，扩容就没有风险，但是如果手机有过重摔、进水、机身变形、主板维修的情况就会有风险。</p>
                    <h2>3.有人说扩容后的手机就不能更新系统了，是真的么？</h2>
                    <p>扩容服务从15年直到现在3年多，一直可以正常更新系统不影响。</p>
                    <h2>4.扩容后我手机里的资料还在么？</h2>
                    <p>扩容后您手机里的资料全部没有了，您可以通过itunes或者爱思助手把您觉得重要的资料备份，扩容后同步下来即可。由于资料设计个人隐私，超人修不提供代备份的服务，可以教您怎么备份，实际操作还是需要您亲自来，具体备份方法您可在超人修官方微信公众号回复“备份”两字自动获取，或者免费咨询我们的24小时客服热线4008678597</p>
                    <h2>5.扩容后功能稳定吗？我的手机会不会变慢变卡？</h2>
                    <p>扩容只是把您手机的储存空间加大，所以扩容后功能全部都稳定的，更换硬盘本身不会导致您的手机变慢变卡。但是扩容后手机需要更新到最新的苹果系统，如果您之前用的是比较老的苹果系统，更新后会觉得卡。</p>
                    <h2>6.扩容使用的硬盘是正品么？是新的么？我原来的会不会还给我。</h2>
                    <p>超人修使用的是全新正品硬盘，坚决不使用重复利用的硬盘，扩容完成后，您原来的硬盘会一并还给您。</p>
                    <h2>7.扩容可以上门么？还是要我自己去店里？</h2>
                    <p>由于扩容需要使用大型精密仪器无法搬运上门的原因，无法上门现场扩容，建议您自行到我们店里扩容，或者我们上门取送。</p>
                    <h2>8.扩容需要多长时间？</h2>
                    <p>若果自己到我们服务的线下网点的话，1个小时左右就好；如果我们取回的话，24小时内送回。</p>
                    <h2>9.支持扩容的门店地址是？</h2>
                    <p>拱墅区丰登街373-1号</p>
                    <p>滨江区春晓路515号斯利美甜品店北侧</p>
                </div>
                <ButtonBox buttonName="预约扩容" @buttonClick="buttonClick"></ButtonBox>
            </div>
        </PageTheme>
    </div>
</template>

<script>
    import ButtonBox from '../../components/ButtonBox'
    import PageTheme from '../../components/PageTheme'
    export default {
        name: "Upgrade",
        components: {
            ButtonBox,
            PageTheme
        },
        methods: {
            buttonClick(){
                this.$router.push('/orderUpgrade')
            }
        }
    }
</script>

<style scoped>
    .orderOneCheck{
        background: #f3f3f3;
    }
    .upgrade_box{
        width: 7.02rem;
        margin: 0.65rem auto 0 auto;
    }
    .upgrade_box img{
        width: 100%;
    }
    .button_box{
        width: 6.8rem;
        margin: 0.4rem auto;
    }
</style>