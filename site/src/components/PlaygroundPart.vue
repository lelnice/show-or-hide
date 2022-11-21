<template>
  <div class="playground_part">
    <div>
      <span class="btn" id="triggerEle">click me!</span>
    </div>
    <transition>
      <ShowOrHide
        class="content"
        trigger-ele="#triggerEle"
        :outside="props.outside"
        :reverse="props.reverse"
        :self-control="props.selfControl"
      >
        <p>The element you want to show/hide.</p>
        <p v-show="props.reverse">
          reverse is on, you can click button to hide this element.
        </p>
        <p v-show="props.outside">
          outside is on, you can click outside this element to hide it.
        </p>
        <div v-if="hasCloseBtn" class="close" @click="close('#triggerEle')">
          ×
        </div>
      </ShowOrHide>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ShowOrHide, close } from 'show-or-hide'
import { props, hasCloseBtn } from './common'
</script>
<style lang="less" scoped>
.playground_part {
  flex: 1;
  margin-right: 20px;
  & > div {
    display: flex;
    justify-content: center;
  }

  .content {
    flex-direction: column;
    justify-content: flex-start;
    font-size: 20px;
    color: #fff;
    height: 200px;
    background-color: var(--theme-color);
    margin-top: 20px;
    border-radius: 10px;
    padding: 10px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

@media screen and (max-width: 992px) {
  .playground_part {
    margin-right: 0;
    margin-bottom: 20px;
    .content {
      position: fixed;
      top: 100px;
      left: 50%;
      width: calc(100% - 50px);
      transform: translateX(-50%);
      font-size: 14px;
      z-index: 1;
      .close {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--theme-color);
        cursor: pointer;
        user-select: none;
        font-size: 20px;
      }
    }
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
      transform: translate(-50%, -10%);
    }
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}
</style>
