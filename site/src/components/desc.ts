export const content = [
  { en: 'Basic Usage', zh: '基础应用' },
  { en: 'Additional Close Function' },
  {
    en: 'Although this component is out of box, you can add your own element, such as a close button, to hide the element you control.',
  },
  {
    en: "Import from 'show-or-hide'",
  },
  {
    en: "Then you can bind this function to 'click' event.",
  },
  {
    en: 'Try to use a close button here:',
  },
  {
    en: 'close button',
  },
]

export function createIterator(items: any[]) {
  let i = 0
  return {
    next: function () {
      const done = i >= items.length
      const value = !done ? items[i++] : undefined
      /* return {
        done: done,
        value: value,
      } */
      return value
    },
  }
}

export default createIterator(content)
