import { reactive, ref } from 'vue'

export const props = reactive({
  reverse: false,
  outside: false,
  selfControl: false,
})

export const hasCloseBtn = ref(false)
