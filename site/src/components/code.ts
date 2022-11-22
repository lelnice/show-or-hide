import { ref } from 'vue'

export const basicContent = ref(
  `
<div>
<span class="btn" id="triggerEle">
  click me!
</span>
</div>
<transition>
<ShowOrHide class="content" trigger-ele="#triggerEle" outside reverse>
    <div>The element you want show/hide</div>
</ShowOrHide>
</transition>`,
)

export const buttonHtml = ref(
  `
<div class="close" @click="close('#triggerEle')">×</div>`,
)

export const buttonImport = ref(
  `
import { close } from 'show-or-hide'`,
)
export const wrapperHtml = ref(`
<span class="btn" id="triggerEle" @click="handleSelf('param1', 'param2')">click me!</span>
<ShowOrHide trigger-ele="#triggerEle" self-control>
    ...
</ShowOrHide>`)
export const wrapperImport = ref(
  `
import { selfControlWrapper } from 'show-or-hide'
const handleSelf = selfControlWrapper('#triggerEle', (param1, param2, flag) => {
    alert(\`It's to \${flag.value ? 'hide' : 'show'}.\\nparam1:\${param1}, param2:\${param2}\`,)
    flag.value = !flag.value
})`,
)

export const typeHtml = ref(
  `
<ShowOrHide trigger-ele="#triggerEle" trigger-type="mouseenter">
    ...
</ShowOrHide>`,
)
