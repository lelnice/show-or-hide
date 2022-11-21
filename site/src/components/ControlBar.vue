<template>
  <div class="control_bar">
    <div class="part">
      <h2>Basic Usage</h2>
      <pre class="hx-scroll lineNumbers code_wrapper">
        <code v-html="htmlContent"></code>
    </pre>
      <p v-show="props.reverse">
        reverse is on, you can click button to hide this element.
      </p>
      <p v-show="props.outside">
        outside is on, you can click outside this element to hide it.
      </p>
    </div>
    <div class="part">
      <h2>Additional close function</h2>
      <p>
        Although this component is out of box, you can add your own element,
        such as a close button, to hide the element you control.
      </p>
      <div class="toggles">
        <button
          class="toggle"
          :class="{ checked: hasCloseBtn }"
          :aria-checked="hasCloseBtn"
          @click="hasCloseBtn = !hasCloseBtn"
        ></button
        >close button
      </div>
      <pre class="hx-scroll lineNumbers code_wrapper">
        <code v-html="highlight(closeBtnContent,'html')"></code>
    </pre>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { props, hasCloseBtn } from './common'
import Prism from 'prismjs'
const htmlContent = ref(`
<div>
  <span class="btn" id="triggerEle">
    click me!
  </span>
</div>
<transition>
  <ShowOrHide class="content" trigger-ele="#triggerEle" outside reverse>
      <div>The element you want show/hide</div>
  </ShowOrHide>
  <div class="close" @click="close('#triggerEle')">×</div>
</transition>`)
htmlContent.value = highlight(htmlContent.value, 'html')
const closeBtnContent = ref(
  `
  <div class="close" @click="close('#triggerEle')">×</div>`,
)

watch(
  () => hasCloseBtn.value,
  (val) => {
    console.log(val)
  },
)

const parseProps = () => {
  const result = htmlContent.value.match(
    /<span class="token attr-name">\w+<\/span>/gi,
  )
  result?.forEach((item) => {
    const field = item.match(/outside|reverse/gi)
    if (field) {
      htmlContent.value = htmlContent.value.replace(
        item,
        `<span class='clickable'>${field}</span>`,
      )
    }
  })
  nextTick(() => {
    const clickableItems = document.querySelectorAll('.clickable')
    clickableItems.forEach((item) => {
      if (!item.textContent) return
      const field = item.textContent as keyof typeof props
      item.addEventListener('click', () => {
        props[field] = !props[field]
        item.classList.toggle('active')
      })
    })
  })
}
function highlight(code: string, lang: string) {
  return Prism.highlight(code, Prism.languages[lang], lang)
}
onMounted(() => {
  parseProps()
})
</script>
<style lang="less" scoped>
.control_bar {
  flex: 1;
}
.part {
  margin-bottom: 20px;
}
.code_wrapper {
  background-color: #f6f8fa;
  white-space: pre-wrap;
}
:deep(.clickable) {
  background-color: #969696;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  padding: 3px 5px;
  transition: background 0.5s;
  &.active {
    background-color: #0f8282;
    color: #fff;
  }
}
.toggles {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.toggle {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  min-width: 44px;
  height: 22px;
  line-height: 22px;
  vertical-align: middle;
  background-color: #00000040;
  border: 0;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.36s;
  user-select: none;
  &::after {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 18px;
    cursor: pointer;
    transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    content: '';
  }
  &.checked {
    background-color: var(--theme-color);
    &::after {
      transform: translate(-100%);
      left: 100%;
      margin-left: -1px;
    }
  }
}
</style>
