<template>
  <div class="box">
    <div @click="handleClick_1" v-for="(item, index) in loopData" :key="index">
      <div class="bd">
        <img class="layer" :src="constants.image1" />
        <img class="bg" :src="constants.image2" />
        <div class="wrap">
          <img class="riverdinwei" :src="constants.image3" />
          <span class="distance">距离500m</span>
        </div>
      </div>
      <div class="main">
        <span class="title">{{ item.title }}</span>
      </div>
      <div class="ft">
        <div class="block">
          <img class="xianjin" :src="item.user.userImage" />
          <span class="fashionHome">{{ item.user.userName }}</span>
        </div>
        <div class="group">
          <img class="favorite" :src="constants.image4" />
          <span class="num">{{ item.readCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fetch } from 'whatwg-fetch';
export default {
  data() {
    return {
      stateData: 'test',
      loopData: [
        {
          title: '小户型卫浴怎样才能装得高大上？',
          coverImage:
            'https://img.alicdn.com/tfs/TB1Txq6o7T2gK0jSZFkXXcIQFXa-684-684.png',
          readCount: 200,
          user: {
            userImage:
              'https://img.alicdn.com/tfs/TB1DWe6oYj1gK0jSZFOXXc7GpXa-60-60.png',
            userName: '时尚家居'
          },
          url: 'https://www.imgcook.com'
        },
        {
          title: '拥有超多功能的40平米简约小公寓了解一下',
          coverImage:
            'https://img.alicdn.com/tfs/TB1XRQTo7P2gK0jSZPxXXacQpXa-684-648.png',
          readCount: 500,
          user: {
            userImage:
              'https://img.alicdn.com/tfs/TB1DWe6oYj1gK0jSZFOXXc7GpXa-60-60.png',
            userName: '花花设计工作'
          },
          url: 'https://www.imgcook.com/docs'
        }
      ],
      constants: {
        image1:
          'https://img.alicdn.com/tfs/TB1DDx_rQL0gK0jSZFxXXXWHVXa-684-684.png',
        image2:
          'https://img.alicdn.com/tfs/TB10TB_rQL0gK0jSZFxXXXWHVXa-684-684.png',
        image3:
          'https://img.alicdn.com/tfs/TB1UoB9rQL0gK0jSZFAXXcA9pXa-28-36.png',
        image4:
          'https://img.alicdn.com/tfs/TB1pxuarHj1gK0jSZFuXXcrHpXa-46-44.png'
      }
    };
  },
  methods: {
    isReadCountShow(readCount) {
      return readCount > 300;
    },
    fetch_example() {
      fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'GET',
        body: {}
      })
        .then(response => response.json())
        .then((data, error) => {
          console.log(dataHandler);
          return data;
        })
        .catch(e => {
          console.log('error', e);
        });
    },
    dataHandler(dataMap) {
      console.log('dataHandler 11');
      return dataMap;
    },
    handleClick_1(e) {
      window.open(this.item.url);
    }
  },
  created() {
    console.log('constructor');
    this.fetch_example();
    this.dataHandler();
  },
  beforeUpdate() {
    console.log('getDerivedStateFromProps');
    console.log(props);
    console.log(state);
  }
};
</script>
<style src="./index.css" />
