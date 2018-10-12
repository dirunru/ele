<template>
  <div class="kindList">
    <ul>
      <li v-for="(kindList,index) in kindLists" v-if="index<10">
        <img :src="kindList.image_hash | imgPath" alt="" >
        <span>
          {{kindList.name}}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: "KindList",
    data(){
      return{
        kindLists:[],
      }
    },
    mounted() {
      //https://h5.ele.me/restapi/shopping/openapi/entries?latitude=34.728288&longitude=113.751266&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template&terminal=h5
      axios.get('/h5/restapi/shopping/openapi/entries',{
        params:{
          latitude:34.728288,
          longitude:113.751266,
          templates:['main_template','favourable_template','svip_template'],
        }
      }).then((val)=>{
        // console.log(val.data);
        this.kindLists = val.data[0].entries;
      }).catch((err)=> {
        console.log(err);
      });
    }
  }
</script>

<style scoped>
  .kindList{
    margin-top: 10px;
    width: 100%;
    margin-bottom: 30px;
  }
  .kindList ul {
    width: 100%;
    height: 140px;
  }
  .kindList ul li{
    float: left;
    width: 20%;
  }
  .kindList ul li img{
    width: 60px;
    height: 60px;
  }
  .kindList ul li span{
    display:block;
    font-size: 11px;
  }
</style>
