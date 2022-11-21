<template>
  <div class="playground_part">
    <div>
      <span class="btn" id="triggerEle">click me!</span>
    </div>
    <transition>
      <ShowOrHide class="content" trigger-ele="#triggerEle" outside reverse>
        <div>The element you want show/hide</div>
      </ShowOrHide>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ShowOrHide } from 'show-or-hide'
import { ref } from 'vue'
const reverse = ref(false)
</script>
<style lang="less" scoped>
.playground_part {
  flex: 1;
  & > div {
    display: flex;
    justify-content: center;
  }

  .content {
    align-items: center;
    font-size: 20px;
    color: #fff;
    height: 200px;
    background-color: var(--theme-color);
    margin-top: 20px;
    border-radius: 10px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}
</style>
