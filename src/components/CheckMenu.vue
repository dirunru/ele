<template>
  <div class="check">
    <div class="tuijian">
      <h3> {{ stores.name }} </h3>
      <section>
        <ul>
          <li v-for="(store ,index) in stores.items">
            <img :src="store.image_path | imgPath" alt="">
            <h4>
              {{ store.name }}
            </h4>
            <p class="comment">
                <span>
                  月售{{ store.rating_count }}
                </span>
              <span> 好评率{{ store.rating }} </span>
            </p>
            <p class="price">
              <strong>￥{{ store.specfoods[0].original_price }} </strong>
              <span v-if="store.specfoods[0].stock === 0"> 已售完 </span>
              <i v-else class="fa fa-plus"></i>
            </p>
          </li>
        </ul>
      </section>
    </div>
    <div class="shops">
      <aside>
        <ul>
          <li v-for="(list, index) in lists" :class="{active:index === selectIndex}">
            <a href="" @click.prevent="setIndex(index)"> {{ list.name }} </a>
          </li>
        </ul>
      </aside>
      <div class="content" @scroll="rightScroll">
        <ul>
          <li v-for="(shops, index) in lists">
            <h5> {{ shops.name }}
              <small> {{ shops.description }}</small>
            </h5>
            <section v-for="(shop,ins) in shops.foods">
              <img :src="shop.image_path | imgPath" alt="">
              <div>
                <h4> {{ shop.name }} </h4>
                <p>
                  {{ shop.description }}
                </p>
                <p>
                  月售{{ shop.month_sales }}份 &nbsp; 好评率{{ shop.satisfy_rate }}%
                </p>
                <p class="price">
                  ￥{{ shop.specfoods[0].price }}
                  <i class="fa fa-plus"></i>
                </p>
              </div>
            </section>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        lists: this.list,
        stores: this.tuijian,
        selectIndex:0,
        //  设置默认的选项的索引值为第一个
        offsetTable:[]
      //  存储选项的滚动范围
      }
    },
    props: ['list', 'tuijian'],
    methods: {
      //将传递的索引值赋值给selectionindex
      setIndex:function (ins) {
        this.selectIndex = ins;
        // $('.content').scrollTop();滚动的量
        //offset 是当前标签相对于浏览器窗口的偏移量
        //scrolltop是当前标签的滚动偏移量 = 当前显示标签之上的显示标签的高度之和；
        // li的高度：下一个标签的offset - 他自己本身的offset
        // let scrollTop=$('.content').scrollTop();
        //左边的滚动
        let offsetTop = Math.floor($('.content').offset().top);
        // console.log(offsetTop);
        let lis = $('.content ul li');
        let liTop =lis[ins].offsetTop;
        // console.log(liTop);
        // $('.content').scrollTop(liTop - offsetTop);
        $('.content').animate({
          //li标签本身距离浏览器的高度减去content标签自身的
          scrollTop:liTop -offsetTop
        },300)
      },
      rightScroll:function () {
        // console.log($('.content').scrollTop());
        // 得到的选项的滚动范围
        //  倒着来进行判断范围
        for(var i = this.offsetTable.length - 1; i>=0 ;i--){
            if ($('.content').scrollTop() >= this.offsetTable[i]){
              // console.log(this.offsetTable[i]);
              this.selectIndex = i;
              break
            }
        }
      }
    },
    mounted(){
      this.offsetTable=[];
      let lis= $('.content ul li');
      let offsetTop= Math.floor($('.content').offset().top);
      for( var i=0;i< lis.length;i++){
        this.offsetTable.push(lis[i].offsetTop - offsetTop);
      //  0到1的高度，1和2的高度，1和2 和 3 的高度
      }
      // console.log(this.offsetTable);
    }
  }
</script>
<style scoped>
  .check {
    padding: 15px 10px;
  }

  .tuijian {
    /*padding-top:15px;*/
  }
  .tuijian h3 {
    font-size: 13px;
    text-align: left;
  }

  .tuijian section {
    width: 100%;
    overflow: scroll;
  }
  .tuijian ul {
    margin-top: 10px;
    width: 256vw;
  }
  .tuijian ul li {
    width: 32vw;
    float: left;
    padding: 0 5px;
  }

  .tuijian ul li img {
    width: 100%;
  }

  .tuijian ul li h4 {
    font-size: 12px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tuijian ul li p.comment {
    font-size: 10px;
    color: #888;
    text-align: left;
  }

  .tuijian ul li p.price {
    color: red;
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    margin-top: 8px;
  }
  .tuijian ul li p.price span {
    font-size: 12px;
    color: #888;
    float: right;
    margin-top: 3px;
  }
  .tuijian ul li p.price i {
    background: blue;
    color: #fff;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    float: right;
  }
  .shops {
    overflow: hidden;
    margin-top: 10px;
  }
  .shops aside {
    height: 115vw;
    overflow: scroll;
    float: left;
    width: 22vw;
  }
  .shops aside ul {
    font-size: 12px;
  }
  .shops aside ul li a {
    color: #666;
    background: #eee;
    display: block;
    padding: 10px 0;
  }
  .shops aside ul li.active a {
    background: orange;
  }
  .shops .content {
    width: 70vw;
    float: right;
    text-align: left;
    height: 115vw;
    overflow: scroll;
  }
  .content h5 {
    font-size: 12px;
    margin-bottom: 15px;
  }
  .content h5 small {
    color: #888;
    font-weight: normal;
    margin-left: 5px;
  }
  .content section {
    overflow: hidden;
  }
  .content section img {
    width: 30%;
    float: left;
  }
  .content section > div {
    float: right;
    width: 65%;
    margin-bottom: 15px;
  }

  .content section > div h4 {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }
  .content section > div p {
    color: #888;
    font-size: 10px;
    line-height: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }
  .content section > div p.price {
    font-size: 16px;
    color: red;
    margin-top: 15px;
    position: relative;
    line-height: 30px;
  }
  .content section > div p.price i {
    background: blue;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    right: 0;
    top: 3px;
  }
</style>
