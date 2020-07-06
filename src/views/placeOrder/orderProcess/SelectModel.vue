<template>
    <div class="content">
        <PageHeader headerTitle="机型选择"></PageHeader>
        <div class="selectModel">
            <div class="scroll_left" ref="scrollLeft">
                <ul>
                    <li v-for="(item,index) in brands" :key="index"
                        @click="getModel(item.id)"
                        :class="{active: activeId == item.id}"
                    >{{item.brandName}}</li>
                </ul>
            </div>
            <div class="scroll_right" ref="scrollRight">
                <ul>
                    <li v-for="(item,index) in brandModels" :key="index">
                        <router-link :to="{name:'selectFault',query:{brandModelId:item.brandModelId,brandModelName:item.brandModelName}}"
                        >{{item.brandModelName}}
                            <span class="arrow">
                                <i class="fa fa-angle-right"></i>
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import PageHeader from '../../../components/PageHeader'
    export default {
        name: "SelectModel",
        data(){
            return{
                scrollL : null,
                scrollR : null,

                brands: [],//手机品牌
                brandModels: [],//品牌型号
                activeId: '',//选中品牌id
            }
        },
        components: {
            PageHeader
        },
        methods: {
            initScroll(){
                this.scrollL = new BScroll(this.$refs.scrollLeft,{
                    scrollY: true,
                    click: true
                });
                this.scrollR = new BScroll(this.$refs.scrollRight,{
                    scrollY: true,
                    click: true
                });
            },
            refreshScroll(){
                this.scrollL.refresh();
                this.scrollR.refresh()
            },
            getBrand(){//获取品牌
                this.$axios.post("/api/brand/list")
                    .then(res => {
                        this.brands = res.data.data.brands;
                        console.log(this.brands);

                        //默认第一项选中
                        this.activeId = this.brands[0].id;
                        this.brandModels = this.getModel(this.activeId);
                    })
            },
            getModel(id){//根据品牌id获取所有的机型
                //选中样式
                this.activeId = id;
                //请求接口
                this.$axios.post("/api/brand/"+id)
                    .then(res => {
                        this.brandModels = res.data.data.length > 0 ? res.data.data[0].list : [];
                        console.log(this.brandModels);
                    })
            }
        },
        created(){
            this.getBrand();
        },
        mounted () {
            document.querySelector('html').style.height='100%';//setAttribute会覆盖原来的样式，font-size会没有
            document.querySelector('body').setAttribute('style', 'height:100%;background:#f3f3f3');
            document.querySelector('#app').setAttribute('style', 'height:100%;');

            if(!this.scrollL || !this.scrollR){
                this.initScroll()
            }else{
                this.refreshScroll()
            }
        },
        beforeDestroy () {
            document.querySelector('html').style.height='auto';
            document.querySelector('body').removeAttribute('style');
            document.querySelector('#app').removeAttribute('style');
        }
    }
</script>

<style scoped>
    .content{
        height: 100%;
        overflow: hidden;
    }
    .selectModel{
        /*height: 100%;*/
        position: absolute;
        top:0.9367rem;
        bottom:0;
/*        left:0;
        right: 0;*/
        overflow: hidden;
        display: flex;
    }
    .scroll_left{
        width: 1.64rem;
        background: #f2f1f2;
        height: 100%;
    }
    .scroll_left li{
        width: 100%;
        height: 0.92rem;
        line-height: 0.92rem;
        font-size: 0.24rem;
        color: #8b8b8b;
        text-align: center;
        position: relative;
    }
    .scroll_left li.active{
        font-size: 0.28rem;
        color: #474747;
        background: #fff;
    }
    .scroll_left li.active:before{
        content: '';
        width: 0.08rem;
        height: 0.28rem;
        background: #ce5249;
        position: absolute;
        left:0;
        top:0.32rem;
        display: block;
    }
    .scroll_right{
        width: 5.86rem;
        background: #fff;
    }
    .scroll_right li{
        width: 5.2rem;
        box-sizing: border-box;
        margin: 0 0.33rem;
        font-size: 0.24rem;
        color: #424242;
        border-bottom: 0.02rem solid #f2f1f2;
        /*    display: flex;
            align-items: center;
            justify-content: space-between;*/
    }
    .scroll_right li a{
        width:100%;
        height: 1.28rem;
        color: #424242;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>