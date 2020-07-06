<template>
    <div class="content storeLists">
        <PageHeader headerTitle="门店列表"></PageHeader>
        <ul class="store_lists" v-for="(item,index) in storeList" :key="index">
            <li :class="{checked: selectedStore == item.storeCode}">
                <div class="left">
                    <h1>{{item.storeName}}<span class="red">支持上门</span></h1>
                    <h2>{{item.storeAddress}}</h2>
                    <h2>营业时间：{{item.businessHours}}</h2>
                    <!--<h2>交通指引：地铁三号线三河客运站</h2>-->
                    <div class="operate_box">
                        <a :href="'tel:' + item.phone"><img src="../../../assets/images/store_icon_phone.png">电话联系</a>
                        <button class="tag-read"
                                :data-clipboard-text="item.storeAddress"
                                @click="handleCopy()"><img src="../../../assets/images/store_icon_copy.png">复制地址</button>
                        <router-link :to="{name:'map',query:{storeLng: item.longitude,storeLat: item.latitude,storeName: item.storeName,storeAddress:item.storeAddress}}"><img src="../../../assets/images/store_icon_address.png">查看地图</router-link>
                    </div>
                </div>
                <!--<img class="check_btn" src="../../../assets/images/icon_unchecked.png">-->
                <i class="check_btn" @click="selectStore(item,item.storeCode)"></i>
            </li>
        </ul>
<!--        <ul class="store_lists">
            <li class="checked">
                <div class="left">
                    <h1>武汉前进五路店<span class="red">支持上门</span><span class="blue">离我最近</span></h1>
                    <h2>湖北省武汉市江汉区前进五路银海商务大厦一楼 苹果店</h2>
                    <h2>营业时间：9:00-20:00</h2>
                    <h2>交通指引：地铁三号线三河客运站</h2>
                    <div class="operate_box">
                        <a :href="'tel:' + 110"><img src="../../../assets/images/store_icon_phone.png">电话联系</a>
                        <button class="tag-read"
                                data-clipboard-text="湖北省武汉市江汉区前进五路银海商务大厦一楼"
                                @click="handleCopy()"><img src="../../../assets/images/store_icon_copy.png">复制地址</button>
                        <router-link to="/map"><img src="../../../assets/images/store_icon_address.png">查看地图</router-link>
                    </div>
                </div>
                &lt;!&ndash;<img class="check_btn" src="../../../assets/images/icon_checked.png">&ndash;&gt;
                <i class="check_btn"></i>
            </li>
            <li>
                <div class="left">
                    <h1>超人修  （北京朝阳维修店）</h1>
                    <h2>北京市北京市朝阳区建国路88号大望路SOHO现代城C座7层708室</h2>
                    <h2>营业时间：9:00-20:00</h2>
                    <h2>交通指引：地铁三号线三河客运站</h2>
                    <div class="operate_box">
                        <a :href="'tel:' + 110"><img src="../../../assets/images/store_icon_phone.png">电话联系</a>
                        <button class="tag-read"
                                data-clipboard-text="北京市北京市朝阳区建国路88号大望路SOHO现代城C座7层708室"
                                @click="handleCopy()"><img src="../../../assets/images/store_icon_copy.png">复制地址</button>
                        <router-link to="/map"><img src="../../../assets/images/store_icon_address.png">查看地图</router-link>
                    </div>
                </div>
                &lt;!&ndash;<img class="check_btn" src="../../../assets/images/icon_unchecked.png">&ndash;&gt;
                <i class="check_btn"></i>
            </li>
        </ul>-->
    </div>
</template>

<script>
    import PageHeader from '../../../components/PageHeader'
    import Clipboard from 'clipboard'
    export default {
        name: "StoreLists",
        components: {
            PageHeader
        },
        data(){
            return{
                storeList: [],//门店列表
                selectedStore: '',//选中的门店
            }
        },
        methods: {
            getStoreList(){//获取门店列表
                this.$axios.post("/api/brand/stores")
                    .then(res => {
                        this.storeList = res.data.data;
                        console.log(this.storeList);
                    })
            },
            selectStore(item,id){//选择门店
                this.selectedStore = id;
                //返回下单页
                let selectedStore = {
                    storeCode : id,
                    storeName: item.storeName
                };
                /*this.$router.replace({name:'perfectInfo',params:{
                        storeCode : id,
                        storeName: item.storeName
                    }});*/
                let storeInfo = {
                    storeCode : id,
                    storeName: item.storeName
                };
                sessionStorage.setItem('storeInfo', JSON.stringify(storeInfo));
                this.$router.go(-1);
            },
            handleCopy() {
                var clipboard = new Clipboard('.tag-read');
                clipboard.on('success', e => {
                    alert('内容已复制');
                    // 释放内存
                    clipboard.destroy()
                });
                clipboard.on('error', e => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制');
                    // 释放内存
                    clipboard.destroy()
                })
            }
        },
        created(){
            this.getStoreList();
        }
    }
</script>

<style scoped>
    .store_lists{

    }
    .store_lists li{
        width: 6.8rem;
        margin:0.133rem auto;
        display: flex;
        align-items: center;
        justify-content:space-between;
        box-sizing: border-box;
        padding: 0 0.386rem;
        background: #fff;
        border-radius: 0.067rem;
    }
    .store_lists .left{
        width: 5.3rem;
        min-height: 2.167rem;
        box-sizing: border-box;
        padding: 0.3rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .store_lists .left h1{
        font-size: 0.28rem;
        color: #424242;
        margin-bottom: 0.2rem;
    }
    .store_lists .left h1 span{
        font-size: 0.186rem;
        border-radius: 0.0267rem;
        margin-left: 0.067rem;
    }
    .store_lists .left h1 span.red{
        color: #ec5850;
        border: 0.0267rem solid #ec5850;
    }
    .store_lists .left h1 span.blue{
        color: #65b1f9;
        border: 0.0267rem solid #65b1f9;
    }
    .store_lists .left h2{
        font-size: 0.22rem;
        color: #9b9b9b;
    }
    .store_lists .left h3{
        font-size: 0.186rem;
        color: #d05951;
    }
    .operate_box{
        display: flex;
        align-items: center;
        margin-top:0.2rem;
    }
    .operate_box span,.operate_box a,.operate_box button{
        width: 1.65rem;
        height: 0.527rem;
        border-radius: 0.033rem;
        background: #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.22rem;
        color: #424242;
        margin-right: 0.12rem;
    }
    .operate_box img{
        width: 0.2267rem;
        height: 0.2667rem;
        margin-right: 0.13rem;
    }
</style>