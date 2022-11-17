import {
  h,
  defineComponent,
  Ref,
  PropType,
  onMounted,
  ref,
  watch,
  reactive,
  onUnmounted,
} from "vue";
const flags = reactive<Map<string | HTMLElement, Ref<boolean>>>(new Map());

const ShowOrHideProps = () => ({
  triggerEle: {
    type: [String, HTMLElement],
  },
  innerClickFn: {
    type: Function as PropType<(...args: any[]) => any>,
  },
  outsideClickFn: Function as PropType<(...args: any[]) => any>,
  self: Boolean,
  reverse: Boolean,
  outside: Boolean,
  triggerType: { type: String, default: "click" },
});

export default defineComponent({
  name: "ShowOrHide",
  props: ShowOrHideProps(),
  setup(props, { slots }) {
    const {
      triggerEle,
      innerClickFn,
      outsideClickFn,
      self,
      reverse,
      outside,
      triggerType,
    } = props;
    const flag = ref(false);
    flags.set(triggerEle, flag);
    onMounted(() => {
      const trigger: HTMLElement =
        typeof triggerEle === "string"
          ? document.querySelector
            ? document.querySelector(triggerEle)
            : null
          : triggerEle;
      let listener: (e: Event) => void;
      if (triggerType === "click") {
        listener = (e: Event) => {
          const inner = document.querySelector(".hide_when_click_outside");
          if (!inner?.contains(e.target as Node)) {
            outsideClickFn ? outsideClickFn(e, { flag }) : (flag.value = false);
            document.removeEventListener("click", listener);
          }
        };
      } else if (triggerType === "mouseenter") {
        listener = (e: Event) => {
          outsideClickFn ? outsideClickFn(e, { flag }) : (flag.value = false);
          trigger.removeEventListener("mouseleave", listener);
        };
      }
      trigger.addEventListener(
        triggerType as keyof HTMLElementEventMap,
        (e: Event) => {
          e.stopPropagation();
          !self
            ? innerClickFn
              ? handleSelfWrapper(
                  triggerEle,
                  innerClickFn
                )({ flag: flags.get(triggerEle) })
              : flag.value && reverse
              ? (flag.value = false)
              : (flag.value = true)
            : null;
        }
      );
      watch(
        () => flag.value,
        () => {
          if (flag.value && outside) {
            switch (triggerType) {
              case "click":
                document.addEventListener("click", listener);
                break;
              case "mouseenter":
                trigger.addEventListener("mouseleave", listener);
                break;
            }
          }
        }
      );
      onUnmounted(() => {
        flags.delete(triggerEle);
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

export const handleSelfWrapper = (
  triggerEle: string | HTMLElement,
  fn: (...args: any[]) => any
) => {
  return (...args: any[]) => {
    fn(...args, { flag: flags.get(triggerEle) });
  };
};
