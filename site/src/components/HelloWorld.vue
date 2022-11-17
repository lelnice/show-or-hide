<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <button id="triggerEle1">triggerEle1</button>
  <!-- <button id="triggerEle2">triggerEle2</button> -->
  <ShowOrHide
    class="target1"
    trigger-ele="#triggerEle1"
    outside
    triggerType="mouseenter"
  >
    <div>this is a test1</div>
  </ShowOrHide>
  <!-- <HideWhenClickOutside
    trigger-ele="#triggerEle2"
    outside
    triggerType="mouseenter"
  >
    <div>this is a test2</div>
  </HideWhenClickOutside> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ShowOrHide, handleSelfWrapper } from "show-or-hide";

defineProps({
  msg: String,
});

const count = ref(0);
const innerClickFn = ({ flag }) => {
  if (!flag.value) {
    setTimeout(() => {
      console.log("自己控制显示");
      flag.value = true;
    }, 1000);
  } else {
    console.log("自己控制关闭");
    flag.value = false;
  }
};
const handleClick = handleSelfWrapper("#triggerEle2", ({ flag }) => {
  flag.value = !flag.value;
});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
.target1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: skyblue;
}
</style>
