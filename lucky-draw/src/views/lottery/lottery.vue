<template>
  <div class="lottery-wrap">
    <lotteryStarfield/>
    <header class="lottery-header">
      <span>{{ headerTitle }}</span>
    </header>
    <div class="lottery-content">
      <div class="left-section">
        <lotteryAction/>
        <Prize/>
      </div>
      <div class="center-section">
        <Lottery3d/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lottery-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.lottery-header {
  flex: none;
  height: 80px;
  width: 100%;
  background-color: hsla(0,0%,100%,.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightseagreen;
  font-size: 26px;
  font-weight: bold;
  font-family: "Times New Roman";
  //position: fixed;
}

.lottery-content {
  flex: 1;
  display: flex;
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
}

.center-section {
  flex: 1; /* Fill remaining space in the container */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Lottery3d from './lottery-3d.vue';
import Prize from './lottery-prize.vue';
import LotteryMusic from './lottery-music.vue';
import lotteryStarfield from './lottery-starfield.vue';
import lotteryConfig from './lottery-config.js';
import lotteryAction from "@/views/lottery/lottery-action.vue";

@Component({
  components: {
    lotteryAction,
    Lottery3d, Prize, lotteryStarfield
  }
})
export default class Lottery extends Vue {
  headerTitle = lotteryConfig.headerTitle;
}
</script>
