<template>
    <div class="comments">
      <!--评分-->
      <div class="comments_score">
        <p>
          {{(datas.rating.overall_score).toFixed(1)}}
        </p>
        <p>
          <small>商家评分</small>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i v-if="datas.rating.overall_score.toFixed(0)>=5" class="fa fa-star"></i>
        </p>
        <p>
          <small>味道</small>
          <span>{{datas.rating.food_score.toFixed(1)}}</span>
        </p>
        <p>
          <small>包装</small>
          <span>{{datas.rating.package_score.toFixed(1)}}</span>
        </p>
        <p>
          <small>配送</small>
          <span>{{datas.rating.rider_score.toFixed(1)}}</span>
        </p>
      </div>
      <!--分类-->
      <div class="tags">
        <ul class="tags_list">
          <li v-for="(tag,index) in datas.tags">
            {{tag.name}}
            <template v-if="tag.count">
              {{tag.count}}
            </template>
          </li>
        </ul>
      </div>
      <!--评论内容-->
      <div class="content">
        <ul>
          <li v-for="(comment,index) in datas.comments">
            {{comment.tags}}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        data: function () {
            return {
              datas:[],
            }
        },
        mounted:function(){
          //https://h5.ele.me/pizza/ugc/restaurants/161168904/batch_comments?has_content=true&offset=0&limit=20
          axios.get('/h5/pizza/ugc/restaurants/161168904/batch_comments', {
            params:{
              has_content:true,
              offset:0,
              limit:20
            }
          }).then( (val) =>{
            console.log(val.data);
            this.datas = val.data;
          }).catch( (err) => {
            console.log(err);
          })
        }
    }


</script>

<style scoped>
  .comments .comments_score{
    width: 100%;
    height: 15vh;
    border-bottom:solid 10px rgba(80, 192, 192, 0.3);
  }
  .comments .comments_score p{
    width:15vw;
    display: inline-block;
  }
  .comments .comments_score p small{
    display: block;
    font-size: 11px;
    color: rgba(64, 64, 64, 1);
    margin-bottom:5px;
  }
  .comments .comments_score p span{
    font-size: 25px;
    width: 100%;
    display: block;
  }
  .comments .comments_score p:nth-of-type(1){
    font-size: 35px;
    color:orangered;
    line-height:15vh;
  }
  .comments .comments_score p:nth-of-type(2){
    width:15vh;
  }
  .comments .comments_score p:nth-of-type(2) i{
    font-size: 12px;
    color:orange ;
  }
  .comments .comments_score p:nth-of-type(5){
    border-left:1px solid #8a8a8a;
    margin-left:10px;
  }
  .comments .tags .tags_list {
    display: flex;
    border-bottom:solid 1px #eee;
  }
  .comments .tags .tags_list li{
    width: 15vw;
    height: 5vh;
    line-height:5vh;
    margin:10px 5px;
    border-radius:5px;
    font-size: 12px;
  }
  .comments .tags .tags_list li:nth-of-type(1){
    background: #46b0eb;
  }
  .comments .tags .tags_list li:nth-of-type(2){
    background: skyblue;
  }
  .comments .tags .tags_list li:nth-of-type(3){
    background: rgba(119, 204, 242, 0.22);
  }
  .comments .tags .tags_list li:nth-of-type(4){
    background: skyblue;
  }

</style>
