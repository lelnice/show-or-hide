<template>
  <div class="control_bar">
    <div class="part">
      <h2>Basic Usage</h2>
      <p>
        The only required property is trigger-ele. It could be a class name, an
        id, or a HTMLElement, which represents the trigger element, such as a
        button.
      </p>
      <p>
        You can click label(<span class="clickable_desc">outside</span>,
        <span class="clickable_desc">reverse</span>) below to see how it works.
      </p>
      <pre class="hx-scroll lineNumbers code_wrapper">
        <code v-html="basicContent"></code>
    </pre>
      <p v-show="props.reverse">
        reverse is on, you can click button to hide the element.
      </p>
      <p v-show="props.outside">
        outside is on, you can click outside of the element to hide it.
      </p>
    </div>
    <div class="part">
      <h2>Additional Close Function</h2>
      <p>
        Although this component is out of box, you can add your own element,
        such as a close button, to hide the element you control.
      </p>
      <p>Import from 'show-or-hide'</p>
      <pre class="lineNumbers code_wrapper">
        <code class="language-ts">{{buttonImport}}</code>
      </pre>
      <p>Then you can bind this function to 'click' event.</p>
      <pre class="lineNumbers code_wrapper">
        <code class="language-html">{{buttonHtml}}</code>
      </pre>
      <p>
        Try to use a close button here:
        <button
          class="toggle"
          :class="{ checked: hasCloseBtn }"
          :aria-checked="hasCloseBtn"
          @click="hasCloseBtn = !hasCloseBtn"
        ></button
        >close button
      </p>
    </div>
    <div class="part">
      <h2>Self-Control and Pass Parameters</h2>
      <p>
        How to do when you want to pass some parameters or do some other
        operations like settimeout?
      </p>
      <p>
        You can import <code>selfControlWrapper</code> function to achive this.
        Don't forget to set self-control to true.
      </p>
      <p>Note that property reverse will not work in this mode.</p>
      self control:<button
        class="toggle"
        :class="{ checked: props.selfControl }"
        @click="props.selfControl = !props.selfControl"
      ></button>
      <pre class="lineNumbers code_wrapper">
        <code class="language-html">{{wrapperHtml}}</code>
      </pre>
      <pre class="lineNumbers code_wrapper">
        <code class="language-ts">{{wrapperImport}}</code>
      </pre>
    </div>
    <div class="part">
      <h2>Trigger Type</h2>
      <p>
        The component supports 'click' and 'mouseenter' listener. The default
        value is 'click'.
      </p>
      <pre class="lineNumbers code_wrapper">
        <code class="language-html">{{typeHtml}}</code>
      </pre>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted } from 'vue'
import { props, hasCloseBtn } from './common'
import {
  basicContent,
  buttonHtml,
  buttonImport,
  wrapperHtml,
  wrapperImport,
  typeHtml,
} from './code'
import Prism from 'prismjs'
basicContent.value = highlight(basicContent.value, 'html')

const parseProps = () => {
  const result = basicContent.value.match(
    /<span class="token attr-name">\w+<\/span>/gi,
  )
  result?.forEach((item) => {
    const field = item.match(/outside|reverse/gi)
    if (field) {
      basicContent.value = basicContent.value.replace(
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
.clickable_desc,
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
    top: 2px;
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
