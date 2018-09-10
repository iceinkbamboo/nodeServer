<template>
  <div class="index">
    <p>{{title}}</p>
    <shop-step v-bind:step="step"></shop-step>
    <el-row>
      <el-button @click="previous">上一步</el-button>
      <el-button @click="next">下一步</el-button>
    </el-row>
    <div :style="{color:fontColor}">颜色测试</div>
    <change-color v-on:changeColor="getColor"></change-color>
  </div>
</template>

<script>
import Vue from 'vue'
const axios = require('axios')
export default {
  name: 'index',
  data () {
    return {
      title: '首页',
      step: 0,
      fontColor: 'red'
    }
  },
  methods: {
    next: function () {
      this.step += 1
      axios.get('http://localhost:3000/user', {
        params: {
          type: 2
        }
      }).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
        // always executed
      })
    },
    previous: function () {
      this.step -= 1
      axios.get('http://localhost:3000/examid', {
      }).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
        // always executed
      })
    },
    getColor: function (color) {
      this.fontColor = color
      axios.post('http://localhost:3000/exam', {
        examid: '0001'
      }).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    }
  }
}
Vue.component('shop-step', {
  data: function () {
    return {
    }
  },
  props: ['step'],
  template: '<div class="step"><p>{{step}}</p></div>'
})
Vue.component('change-color', {
  data: function () {
    return {
      bgColor: '#cccccc'
    }
  },
  methods: {
    lookColor: function (e) {
      console.log(e.currentTarget.dataset.color)
      this.bgColor = e.currentTarget.dataset.color
    }
  },
  template: '<div>' +
              '<el-button :style="{color:bgColor}" color="red" @click="$emit(\'changeColor\',bgColor)">改变颜色</el-button>' +
              '<div>' +
                '<div class="colorDiv" data-color="red" style="background:red;width:20px;height:20px;float:left;marginRight:10px;" @click="lookColor"></div>' +
                '<div class="colorDiv" data-color="blue" style="background:blue;width:20px;height:20px;float:left;marginRight:10px;" @click="lookColor"></div>' +
                '<div class="colorDiv" data-color="green" style="background:green;width:20px;height:20px;float:left;marginRight:10px;" @click="lookColor"></div>' +
                '<div class="colorDiv" data-color="yellow" style="background:yellow;width:20px;height:20px;float:left;marginRight:10px;" @click="lookColor"></div>' +
                '<div class="colorDiv" data-color="#ff8800" style="background:#ff8800;width:20px;height:20px;float:left;marginRight:10px;" @click="lookColor"></div>' +
                '<div class="colorDiv" data-color="#565aaa" style="background:#565aaa;width:20px;height:20px;float:left;marginRight:10px;" @click="lookColor"></div>' +
                '<div class="colorDiv" data-color="#aa7889" style="background:#aa7889;width:20px;height:20px;float:left;marginRight:10px;" @click="lookColor"></div>' +
              '</div>' +
            '</div>'
})
</script>

<style scoped>
  .index{
    width: 100%;
    height: 50px;
  }
  .index p{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #dd6691;
  }
  .step{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #86cc22;
  }
</style>
