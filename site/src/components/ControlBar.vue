<template>
  <div class="control_bar">
    <!-- <template v-for="(line, index) in content" :key="index">
      <div>{{ line }}</div>
    </template> -->
    <pre class="hx-scroll lineNumbers">
        <code class="language-html" v-html="htmlContent"></code>
    </pre>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import Prism from 'prismjs'
const templateContent = ref(`
    <div><span class="btn" id="triggerEle">click me!</span></div>
    <transition>
      <ShowOrHide class="content" trigger-ele="#triggerEle" outside>
        <div>The element you want show/hide</div>
    </ShowOrHide>
    </transition>`)
const htmlContent = ref('')
onMounted(() => {
  htmlContent.value = Prism.highlight(
    templateContent.value,
    Prism.languages['html'],
    'html',
  )
  const result = htmlContent.value.match(
    /<span class="token attr-name">\w+<\/span>/gi,
  )

  result?.forEach((item) => {
    if (item.match(/outside|reverse/gi)) {
      htmlContent.value = htmlContent.value.replace(/out/g, '')
    }
  })
  console.log(htmlContent.value)
})
</script>
<style lang="less" scoped>
.control_bar {
  flex: 1;
}
</style>
