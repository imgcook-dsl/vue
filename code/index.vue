<template>
  <div class="box">
    <div
      @click="onClick_1"
      :data-url="item.url"
      :key="item.index"
      v-for="(item, index) in data"
    >
      <div class="bd">
        <img class="layer" :src="constants.image1" />
        <img class="bg" :src="item.coverImage" />
        <div class="wrap">
          <img class="riverdinwei" :src="constants.image2" />
          <span class="distance">距离500m</span>
        </div>
      </div>
      <div class="main">
        <span class="title">{{ item.title }}</span>
      </div>
      <div class="ft">
        <div class="block">
          <img class="xianjin" :src="constants.image3" />
          <span class="fashionHome">{{ item.user.userName }}</span>
        </div>
        <div class="group" v-if="isReadCountShow(item.readCount)">
          <img class="favorite" :src="constants.image4" />
          <span class="num">{{ item.readCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fetch } from 'whatwg-fetch';
import jsonp from 'fetch-jsonp';
export default {
  data() {
    return {
      data: [
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
          'https://img.alicdn.com/tfs/TB1bLoWoYH1gK0jSZFwXXc7aXXa-684-684.png',
        image2:
          'https://img.alicdn.com/tfs/TB1mtZRoVT7gK0jSZFpXXaTkpXa-28-36.png',
        image3:
          'https://img.alicdn.com/tfs/TB1OvsYoW61gK0jSZFlXXXDKFXa-60-60.png',
        image4:
          'https://img.alicdn.com/tfs/TB1arwYo7T2gK0jSZFkXXcIQFXa-46-44.png'
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
        headers: '{"Content-Type":"json"}'
      })
        .then(response => response.json())
        .then((data, error) => {
          console.log('fetch example: ', data, error);
          return data;
        })
        .catch(e => {
          console.log('error', e);
        });
    },
    jsonp_example() {
      jsonp('https://assets.airbnb.com/frontend/search_results.js', {
        jsonpCallbackFunction: 'search_results',
        body: {}
      })
        .then(response => response.json())
        .then((data, error) => {
          console.log('jsonp example: ', data, error);
          return data;
        })
        .catch(e => {
          console.log('error', e);
        });
    },
    onClick_1(e) {
      window.open(this.item.url, '_blank');
    }
  },
  created() {
    this.fetch_example();
    this.jsonp_example();
  },
  updated() {}
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
  position: relative;
  align-items: center;
  flex-direction: row;
  margin-top: 2.4vw;
  margin-left: 2.4vw;
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
  height: 2.93vw;
  font-weight: 400;
  font-size: 2.4vw;
  color: #ffffff;
  line-height: 2.93vw;
  white-space: nowrap;
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
  font-weight: 400;
  font-size: 4vw;
  color: #333333;
  line-height: 5.87vw;
  overflow: hidden;
  text-overflow: ellipsis;
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
  height: 3.73vw;
  font-weight: 300;
  font-size: 3.2vw;
  color: #666666;
  line-height: 3.73vw;
  white-space: nowrap;
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
  height: 3.47vw;
  font-weight: 400;
  font-size: 2.93vw;
  color: #999999;
  line-height: 3.47vw;
  white-space: nowrap;
}
</style>
