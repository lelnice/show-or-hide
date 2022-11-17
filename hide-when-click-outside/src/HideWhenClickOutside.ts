import {
  h,
  computed,
  defineComponent,
  Ref,
  PropType,
  onMounted,
  ref,
} from "vue";

const hideWhenClickOutsideProps = () => ({
  triggerEle: {
    type: [String, HTMLElement],
  },
  innerClickFn: {
    type: Function as PropType<(...args: any[]) => any>,
  },
  outsideClickFn: Function as PropType<(...args: any[]) => any>,
  reverse: { type: Boolean, default: true },
  hideOutside: Boolean,
});

export default defineComponent({
  name: "HideWhenClickOutside",
  props: hideWhenClickOutsideProps(),
  setup(props, { slots, attrs }) {
    const { triggerEle, innerClickFn, outsideClickFn, reverse, hideOutside } =
      props;
    const flag = ref(false);
    const changeFlag = () => {
      flag.value = reverse ? !flag.value : true;
    };
    onMounted(() => {
      console.log(attrs);

      const trigger: HTMLElement =
        typeof triggerEle === "string"
          ? document.querySelector
            ? document.querySelector(triggerEle)
            : null
          : triggerEle;
      trigger.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        innerClickFn ? innerClickFn(changeFlag) : changeFlag();
        if (flag.value && hideOutside) {
          const listener = (e: MouseEvent) => {
            const inner = document.querySelector(".hide_when_click_outside");
            if (!inner?.contains(e.target as Node)) {
              outsideClickFn
                ? outsideClickFn(e, { changeFlag })
                : (flag.value = false);
              document.removeEventListener("click", listener);
            }
          };
          document.addEventListener("click", listener);
        }
      });
    });

    return () => {
      const children = slots.default?.();
      return flag.value
        ? h("div", { class: "hide_when_click_outside" }, [children])
        : null;
    };
  },
});
