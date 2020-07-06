<template>
    <div class="content address">
        <PageHeader headerTitle="常用地址" :isBorderBottom='false' :isWhite='false'></PageHeader>
        <div class="address_box">
            <ul class="address_lists">
                <li v-for="(item,index) in addressList" :key="index">
                    <div class="address_list">
                        <div class="content_box">
                            <div class="address_info">
                                <p><big>{{item.consignee}}</big>{{item.contactPhone}}</p>
                                <p>{{item.wholeAddress}}</p>
                            </div>
                            <!--<img class="check_btn" src="../../assets/images/icon_checked.png">-->
                            <span :class="{checked:item.defaultt}" @click="defaultAddress(item)"><i class="check_btn"></i></span>
                        </div>
                        <div class="btn_box">
                            <router-link class="btn edit_btn" :to="{name:'myInfo',query:{addressId: item.id}}">编辑</router-link>
                            <span class="btn delete_btn" @click="deleteAddress(item.id)">删除</span>
                        </div>
                    </div>
                </li>
            </ul>
<!--            <ul class="address_lists">
                <li>
                    <div class="address_list">
                        <div class="content_box">
                            <div class="address_info">
                                <p><big>毛毛虫</big>15767202880</p>
                                <p>湖北省武汉市江汉区前进五路银海商务大厦一楼 苹果店 </p>
                            </div>
                            &lt;!&ndash;<img class="check_btn" src="../../assets/images/icon_checked.png">&ndash;&gt;
                            <i class="check_btn"></i>
                        </div>
                        <div class="btn_box">
                            <span class="edit_btn">编辑</span>
                            <span class="delete_btn">删除</span>
                        </div>
                    </div>
                </li>
            </ul>-->

            <div class="addAddress" :class="{noData: addressList.length <=0}">
                <ButtonBox @buttonClick="buttonClick" buttonName="增加新地址"></ButtonBox>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHeader from '../../components/PageHeader'
    import ButtonBox from '../../components/ButtonBox'
    export default {
        name: "MyAddress",
        components: {
            PageHeader,
            ButtonBox
        },
        data(){
          return {
              addressList: [],//地址列表
          }
        },
        computed: {
            userInfo(){
                return this.$store.getters.user
            }
        },
        methods: {
            getAddressList(){//获取地址列表
                this.$axios.post("/api/deliveryAddress/list",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                }).then(res => {
                    console.log(res);
                    this.addressList = res.data.data;

                    this.$nextTick(function(){//当dom发生变化，更新后执行的回调，v-for渲染已经完成
                        this.swiperInit();
                    })
                })
            },
            deleteAddress(id){//删除地址
                this.$axios.post("/api/deliveryAddress/delete",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    addressId : id
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){//删除成功
                        this.getAddressList();
                    }
                })
            },
            defaultAddress(item){//设置为默认地址
                console.log(this.fromPath);
                this.$axios.post("/api/deliveryAddress/setDefault",{
                    phone: this.userInfo.phone,
                    token: localStorage.userToken,
                    addressId : item.id,
                    isDefault : 1, //1默认,0非默认
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '1'){
                        this.getAddressList();
                        if(this.fromPath == 'perfectInfo'){
                            //返回下单页
                            this.$router.go(-1);
                        }
                    }
                })
            },
            swiperInit(){//左滑效果
                let expansion = null; //是否存在展开的contents
                let container = document.querySelectorAll('.address_list');//找到所有的左滑盒子
                //console.log(container);
                for (let index = 0; index < container.length; index++) {
                    let x, y, X, Y, swipeX, swipeY;
                    //监听左滑盒子的触摸事件
                    container[index].addEventListener('touchstart', function (event) {
                        event.stopPropagation();
                        //获取触摸点的坐标targetTouches[0].pageX,Y 
                        x = event.changedTouches[0].pageX;
                        y = event.changedTouches[0].pageY;
                        swipeX = true;
                        swipeY = true;
/*                        if (expansion) {
                            //判断是否展开，如果展开则收起
                            expansion.className = "swiperight";
                        }*/
                    });
                    //监听左滑盒子的屏幕上滑动事件 touchmove事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。
                    container[index].addEventListener('touchmove', function (event) {
                        X = event.changedTouches[0].pageX;
                        Y = event.changedTouches[0].pageY;
                        //console.log(X,Y);
                        //判断左右滑动
                        if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
                            // 阻止事件冒泡
                            event.stopPropagation();
                            if (X - x > 10){   //右滑
                                event.preventDefault();  // 取消事件的默认动作
                                this.className = "swiperight";
                            }
                            if (x - X > 10) {   //左滑
                                event.preventDefault();
                                this.className = "swipeleft";   //左滑展开
                                expansion = this;
                            }
                            swipeY = false;
                        }
                        // 上下滑动
                        if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
                            swipeX = false;
                        }
                    })
                }
            },
            buttonClick(){
                this.$router.push('/myInfo')
            }
        },
        created(){
            //防止页面刷新,vuex:store失效
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
            }
            // this.fromPath = this.$route.query.fromPath;
            // this.getAddressList();
        },
        mounted () {
            document.querySelector('html').style.height='100%';//setAttribute会覆盖原来的样式，font-size会没有
            document.querySelector('body').setAttribute('style', 'height:100%;background:#f3f3f3');
            document.querySelector('#app').setAttribute('style', 'height:100%;');
            //this.initFunc();
        },
        beforeDestroy () {
            document.querySelector('html').style.height='auto';
            document.querySelector('body').removeAttribute('style');
            document.querySelector('#app').removeAttribute('style');
        },
        activated(){
            this.fromPath = this.$route.query.fromPath;
            this.getAddressList();
        }
    }
</script>

<style scoped>
    .address{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .address_box{
        flex: 1;
        width: 6.9rem;
        padding: 0 0.3rem;
        position: relative;
        overflow-y: scroll;
    }
    .addAddress{
        position: fixed;
        bottom:0.878rem;
        left: 50%;
        -moz-transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .addAddress.noData{
        top: 50%;
    }
    .address_lists{
        width: 100%;
        margin-bottom: 2.586rem;
    }
    .address_lists li{
        width: 100%;
        height: 1.5rem;
        background: #fff;
        border-radius: 0.1rem;
        margin-bottom: 0.266rem;
        -moz-box-shadow:0px 0px 10px #F1F1F1;
        -webkit-box-shadow:0px 0px 10px #F1F1F1;
        box-shadow:0px 0px 10px #F1F1F1;
        overflow: hidden;
        position: relative;
    }
    .address_list{
        height: 1.5rem;
        -moz-transition:all 0.3s linear;
        -webkit-transition:all 0.3s linear;
        transition:all 0.3s linear;
    }
    .content_box{
        width: 100%;
        height: 1.5rem;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 0.379rem;
    }
    .address_info{
        flex: 1;
        min-height: 1rem;
        max-height: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .address_info p{
        color: #9b9b9b;
        font-size: 0.25rem;
        line-height: 0.26rem;
    }
    .address_info big{
        font-size: 0.28rem;
        color: #424242;
        margin-right: 0.2rem;
    }
    .btn_box{
        width: 1.9rem;
        height: 1.5rem;
        position: absolute;
        top: 0;
        right: -1.9rem;
        -moz-transition:all 0.3s linear;
        -webkit-transition:all 0.3s linear;
        transition:all 0.3s linear;
    }
    .btn_box .btn{
        width: 50%;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 0.24rem;
        color:#fff;
        text-align: center;
        display: block;
        float: left;
    }
    .btn_box .edit_btn{
        background: #fa766b;
    }
    .btn_box .delete_btn{
        background: #e5514a;
    }

    .swipeleft{
        -moz-transition:all 0.3s linear;-webkit-transition:all 0.3s linear;transition:all 0.3s linear;
        -moz-transform:translateX(-1.9rem);-webkit-transform:translateX(-1.9rem);transform:translateX(-1.9rem);
    }
    .swiperight{
        -moz-transition:all 0.3s linear;-webkit-transition:all 0.3s linear;transition:all 0.3s linear;
        -moz-transform:translateX(0%);-webkit-transform:translateX(0%);transform:translateX(0%);}
</style>