<template>
    <div class="map">
        <div class="map_container" id="container"></div>
        <div class="map_control">
            <div class="map_info">
                <h1>{{storeName}}</h1>
                <p>{{storeAddress}}</p>
            </div>
            <div class="map_nav">
                <img @click="showSheet" src="../../../assets/images/map_nav_icon.png">
            </div>
        </div>

        <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script>
    export default {
        name: "Map",
        data(){
            return{
                storeLng: '',//店铺经度
                storeLat: '',//店铺纬度
                storeName: '武汉前进五路店',//店铺位置名
                storeAddress: '湖北省武汉市江汉区前进五路银海商务大厦一楼 苹果店',//店铺地址详情说明
                locationLng: '',//当前定位经度
                locationLat: '',//当前定位纬度
                locationName: '',//当前定位位置名
                actions: [
                    {name: '腾讯地图',method: this.TXMap},
                    {name: '百度地图',method: this.BDMap},
                    {name: '高德地图',method: this.GDMap}
                ],//选择弹窗内容
                sheetVisible: false,//选择弹窗内容是否显示
                ua: '',//浏览器信息
            }
        },
        methods: {
            showSheet(){
                this.sheetVisible = true;
            },
            TXMap(){
                console.log('打开腾讯地图');
                let url='';
                /*                if (this.ua.android) {
                                    // 腾讯地图uri api
                                    url = "qqmap://map/marker?marker=coord:" + this.storeLat + "," + this.storeLng + ";title:" + this.address + "&referer=xlwx";
                                }else if(this.ua.iOS){
                                    // 腾讯地图uri api
                                    url = "qqmap://map/marker?marker=coord:" + this.storeLat + "," + this.storeLng + ";title:" + this.address + "&referer=xlwx";
                                }*/

                url = "https://apis.map.qq.com/uri/v1/routeplan?type=drive&from="+this.locationName+"&fromcoord="+this.locationLat+","+this.locationLng+"&to="+this.storeName+"&tocoord="+this.storeLat+","+this.storeLng+"&policy=1&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77";
                window.location.href = url;
            },
            BDMap(){
                console.log('打开百度地图');
                let url='';
                /*                if (this.ua.android) {
                                    // 百度地图uri api
                                    url = "baidumap://map/direction?origin=name:"+this.locationName+"|latlng:"+this.locationLat+","+this.locationLng+"&destination=name:"+this.storeName+"|latlng:" + this.storeLat + "," + this.storeLng + "&mode=transit&sy=3&index=0&target=1&src=andr.baidu.openAPIdemo";
                                }else if(this.ua.iOS){
                                    // 百度地图uri api
                                    url = "baidumap://map/direction?origin=name:"+this.locationName+"|latlng:"+ this.locationLat +","+ this.locationLng +"&destination=name:"+this.storeName+"|latlng:" + this.storeLat + "," + this.storeLng + "&mode=driving&src=ios.baidu.openAPIdemo"
                                }*/
                url= "http://api.map.baidu.com/direction?origin=latlng:"+this.locationLat+","+this.locationLng+"|name:"+this.locationName+"&destination=name:"+this.storeName+"|latlng:" + this.storeLat + "," + this.storeLng + "&mode=driving&region=西安&output=html&src=webapp.baidu.openAPIdemo";
                window.location.href = url;
            },
            GDMap(){
                console.log('打开高德地图');
                let url='';
                /*                if (this.ua.android) {
                                    // 高德地图uri api
                                    url = "androidamap://navi?sourceApplication=xlwx&poiname=" + this.address + "&lat=" + this.storeLat + "&lon=" + this.storeLng + "&dev=1&style=2";
                                }else if(this.ua.iOS){
                                    // 高德地图uri api
                                    url = "iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat="+this.locationLat+"&slon="+this.locationLng+"&sname="+this.locationName+"&did=BGVIS2&dlat="+this.storeLat+"&dlon="+this.storeLng+"&dname="+this.storeName+"&dev=0&t=0";
                                }*/
                url = "https://uri.amap.com/navigation?from="+this.locationLng+","+this.locationLat+","+this.locationName+"&to="+ this.storeLng+","+this.storeLat+","+this.storeName+"&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0";
                window.location.href = url;
            },
            browserInfo(){
                var browser = {
                    ua : function() {
                        var u = navigator.userAgent;
                        var isChrome = u.match(/Chrome\/([\d.]+)/)
                            || u.match(/CriOS\/([\d.]+)/);
                        var isAndroid = u.match(/(Android);?[\s\/]+([\d.]+)?/);
                        var iosVersion = function() {
                            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                                return [ parseInt(v[1], 10), parseInt(v[2], 10),
                                    parseInt(v[3] || 0, 10) ];
                            }
                        }();
                        var chromeVersion = function() {
                            var chrome = navigator.userAgent.match(/Chrome\/(\d+)\./);
                            if (chrome) {
                                return parseInt(chrome[1], 10);
                            }
                        }();
                        var ios9 = iosVersion && iosVersion[0] >= 9;
                        var chrome18 = isChrome && isAndroid && chromeVersion
                            && chromeVersion > 18;
                        return { // 移动终端浏览器版本信息
                            trident : u.indexOf('Trident') > -1, // IE内核
                            presto : u.indexOf('Presto') > -1, // opera内核
                            webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                            gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
                            mobile : !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
                            iOS : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                            android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
                            iPhone : u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
                            iPad : u.indexOf('iPad') > -1, // 是否iPad
                            webApp : u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
                            weChat : u.indexOf('MicroMessenger') > -1,
                            UC : u.indexOf('UCBrowser') > -1,
                            u3 : u.indexOf('U3') > -1,
                            chrome : u.indexOf('Chrome') > -1,
                            windowsPhone : u.indexOf("Windows Phone") > -1,
                            samsung : u.indexOf("Samsung") > -1,
                            QQ : (u.match(/\sQQ/i) != null ? u.match(/\sQQ/i).toLowerCase() == " qq"
                                : false),
                            isChrome : isChrome,
                            isAndroid : isAndroid,
                            iosVersion : iosVersion,
                            chromeVersion : chromeVersion,
                            ios9 : ios9,
                            chrome18 : chrome18
                        };
                    }()
                };
                this.ua = browser.ua;
            },
            buildMap(){
                let longitude = this.storeLng,
                    latitude = this.storeLat;

                //1.实例化地图
                let map = new AMap.Map('container',{
                    zoom:12,//级别
                    center: [longitude, latitude],//中心点坐标
                });

                //2.点标记
                // 创建一个 Marker 实例：
                var marker = new AMap.Marker({
                    position: new AMap.LngLat(longitude, latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: '北京'
                });
                // 将创建的点标记添加到已有的地图实例：
                map.add(marker);
                // 移除已创建的 marker
                //map.remove(marker);

                //3.地图控件
                // 同时引入工具条插件，比例尺插件和鹰眼插件
                AMap.plugin([
                    'AMap.ToolBar',
                    'AMap.Scale',
                    // 'AMap.OverView',
                    //'AMap.MapType',
                    //'AMap.Geolocation',
                ], function(){
                    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                    map.addControl(new AMap.ToolBar());

                    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                    map.addControl(new AMap.Scale());

                    // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
                    //map.addControl(new AMap.OverView({isOpen:true}));

                    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                    //map.addControl(new AMap.MapType());

                    // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                    //map.addControl(new AMap.Geolocation());
                });
            },
            getLocation(){
                let _this = this;
                AMap.plugin('AMap.Geolocation', function() {
                    var geolocation = new AMap.Geolocation({
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy: true,
                        // 设置定位超时时间，默认：无穷大
                        timeout: 10000,
                        /*                        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                                                buttonOffset: new AMap.Pixel(10, 20),
                                                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                                                zoomToAccuracy: true,
                                                //  定位按钮的排放位置,  RB表示右下
                                                buttonPosition: 'RB'*/
                    });

                    geolocation.getCurrentPosition()
                    AMap.event.addListener(geolocation, 'complete', onComplete)
                    AMap.event.addListener(geolocation, 'error', onError)

                    function onComplete (data) {
                        // data是具体的定位信息
                        console.log(data);
                        _this.locationLng = data.position.lng;
                        _this.locationLat = data.position.lat;
                        _this.locationName = data.addressComponent.building;
                    }

                    function onError (data) {
                        // 定位出错
                        console.log(data);
                        _this.getCityLocation();
                    }
                })
            },
            getCityLocation(){
                let _this = this;
                //非精准定位
                //如果不需要获取精确的位置，只需要城市级别的定位信息，推荐使用AMap.CitySearch插件，AMap.CitySearch插件获取所在城市相比通过浏览器定位的方式也更快捷。
                AMap.plugin('AMap.CitySearch', function () {
                    var citySearch = new AMap.CitySearch()
                    citySearch.getLocalCity(function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            // 查询成功，result即为当前所在城市信息
                            console.log(result);
                            _this.getLngLatLocation(result);
                        }
                    })
                })
            },
            getLngLatLocation(res){
                let _this = this;
                //逆向地理编码方法
                //获取坐标对应的地址信息
                AMap.plugin('AMap.Geocoder', function() {
                    var geocoder = new AMap.Geocoder({
                        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                        city: res.adcode
                    })

                    //var lnglat = [116.396574, 39.992706]
                    var lnglat = res.rectangle.split(";")[0].split(",");
                    console.log(lnglat);
                    _this.locationLat = lnglat[0];
                    _this.locationLng = lnglat[1];

                    geocoder.getAddress(lnglat, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            // result为对应的地理位置详细信息
                            console.log(result)
                            _this.locationName = result.regeocode.formattedAddress;
                        }
                    })
                })
            }
        },
        mounted () {
            document.querySelector('html').style.height='100%';//setAttribute会覆盖原来的样式，font-size会没有
            document.querySelector('body').setAttribute('style', 'height:100%;');
            document.querySelector('#app').setAttribute('style', 'height:100%;');

            this.storeLng = this.$route.query.storeLng;
            this.storeLat = this.$route.query.storeLat;
            this.storeName = this.$route.query.storeName;
            this.storeAddress = this.$route.query.storeAddress;
            this.buildMap();
            this.getLocation();
            //this.browserInfo();
        },
        beforeDestroy () {
            document.querySelector('html').style.height='auto';
            document.querySelector('body').removeAttribute('style');
            document.querySelector('#app').removeAttribute('style');
        },
    }
</script>

<style scoped>
    .map{
        width: 7.5rem;
        margin: 0 auto;
        height: 100%;
        position: relative;
    }
    .map_container{
        width: 100%;
        position: absolute;
        left:0;
        top:0;
        bottom: 1.5rem;
    }
    .map_control{
        width: 100%;
        height: 1.5rem;
        box-sizing: border-box;
        padding: 0 0.3rem;
        background: #fff;
        border-top: 0.02rem solid #ececec;
        position: absolute;
        left:0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .map_info{
        flex: 1;
    }
    .map_info h1{
        font-size: 0.28rem;
        color: #424242;
    }
    .map_info p{
        font-size: 0.22rem;
        color: #9b9b9b;
    }
    .map_nav{
        width: 0.9rem;
        height: 0.9rem;
        font-size: 0;
        margin-left:0.3rem;
    }
    .map_nav img{
        width: 100%;
        height: 100%;
    }
</style>