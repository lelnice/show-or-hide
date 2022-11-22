<template>
  <div class="header">
    <div class="logo">Show or Hide Playground</div>
    <div class="wrapper">
      <div class="desc">
        <div>
          A vue3-based component, which ficilitate the control of showing/hiding
          element
        </div>
        <div>
          A vue3-based component, which ficilitate the control of showing/hiding
          element
        </div>
      </div>
    </div>
  </div>
  <div class="content">
    <PlaygroundPart></PlaygroundPart>
    <ControlBar></ControlBar>
  </div>
</template>
<script setup lang="ts">
import PlaygroundPart from '@/components/PlaygroundPart.vue'
import ControlBar from '@/components/ControlBar.vue'
</script>
<style lang="less" scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #ffa631;
  z-index: 1;
  overflow: hidden;
  .logo {
    font-weight: 700;
    font-size: 20px;
    white-space: nowrap;
  }
  .wrapper {
    flex: 1;
    min-width: 600px;
    height: 100%;
    overflow: hidden;
    margin-left: 10px;
  }
  .desc {
    width: 200%;
    height: 100%;
    position: relative;
    font-size: 16px;
    vertical-align: baseline;
    white-space: nowrap;

    & > div {
      position: absolute;
      top: calc(50% + 2px);
      transform: translateY(-50%);
    }
    & > div:first-child {
      left: 0;
      width: 50%;
    }
    & > div:last-child {
      width: 50%;
      left: 50%;
    }
  }
}
.content {
  display: flex;
  padding: 50px;
}
@media screen and (max-width: 992px) {
  .header {
    .logo {
      font-size: 18px;
    }
    .desc {
      animation: scroll 10s linear infinite;
      @keyframes scroll {
        0% {
        }
        100% {
          transform: translateX(-50%);
        }
      }
    }
  }
  .content {
    flex-direction: column;
    padding: 10px;
  }
}
</style>
