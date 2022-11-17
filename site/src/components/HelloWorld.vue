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
  <button class="triggerEle">triggerEle</button>
  <HideWhenClickOutside trigger-ele=".triggerEle" :hide-outside="false">
    <div>this is a test2</div>
  </HideWhenClickOutside>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { HideWhenClickOutside } from "hide-when-click-outside";

defineProps({
  msg: String,
});

const count = ref(0);
const innerClickFn = (changeFlag?) => {
  console.log(1111);
};
const innerClickFnWithArgs = (msg) => {
  console.log(msg);
};
const outClickFn = (e, { changeFlag }) => {
  console.log(222);
  changeFlag();
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
.triggerEle {
  background-color: skyblue;
}
</style>
