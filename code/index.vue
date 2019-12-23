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
<style scoped>
.box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  height: 71.2vw;
}

.bd {
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: row;
  opacity: 1;
  width: 45.6vw;
  height: 45.6vw;
}

.layer {
  position: absolute;
  top: 0vw;
  left: 0vw;
  width: 45.6vw;
  height: 45.6vw;
  overflow: hidden;
}

.bg {
  position: absolute;
  top: 0vw;
  left: 0vw;
  opacity: 1;
  width: 45.6vw;
  height: 45.6vw;
}

.wrap {
  box-sizing: border-box;
  display: flex;
  position: absolute;
  top: 2.4vw;
  left: 2.4vw;
  align-items: center;
  flex-direction: row;
  border-radius: 2vw;
  background-color: rgba(0, 0, 0, 0.4);
  padding-right: 1.2vw;
  padding-left: 1.33vw;
  height: 4vw;
}

.riverdinwei {
  opacity: 1;
  width: 1.87vw;
  height: 2.4vw;
}

.distance {
  margin-left: 0.53vw;
  width: 11.2vw;
  height: 2.93vw;
  line-height: 2.93vw;
  white-space: nowrap;
  color: #ffffff;
  font-size: 2.4vw;
  font-weight: 400;
}

.main {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
  background-color: #ffffff;
  width: 45.6vw;
  height: 15.2vw;
}

.title {
  margin-top: 2.93vw;
  width: 40vw;
  height: 11.73vw;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 5.87vw;
  color: #333333;
  font-size: 4vw;
  font-weight: 400;
}

.ft {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-left-radius: 1.6vw;
  border-bottom-right-radius: 1.6vw;
  background-color: #ffffff;
  padding-right: 2.27vw;
  padding-left: 2.4vw;
  width: 45.6vw;
  height: 10.4vw;
  overflow: hidden;
}

.block {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 4vw;
}

.xianjin {
  width: 4vw;
  height: 4vw;
}

.fashionHome {
  margin-left: 0.8vw;
  line-height: 3.73vw;
  white-space: nowrap;
  color: #666666;
  font-size: 3.2vw;
  font-weight: 300;
}

.group {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 4vw;
}

.favorite {
  width: 2.93vw;
  height: 2.93vw;
}

.num {
  margin-left: 0.67vw;
  line-height: 3.47vw;
  white-space: nowrap;
  color: #999999;
  font-size: 2.93vw;
  font-weight: 400;
}
</style>
