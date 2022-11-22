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
  nextTick,
} from "vue";
const flags = reactive<Map<string | HTMLElement, Ref<boolean>>>(new Map());
const ShowOrHideProps = () => ({
  triggerEle: {
    type: [String, HTMLElement],
  },
  outsideFn: Function as PropType<(...args: any[]) => any>,
  selfControl: Boolean,
  reverse: Boolean,
  outside: Boolean,
  triggerType: { type: String, default: "click" },
});

export default defineComponent({
  name: "ShowOrHide",
  props: ShowOrHideProps(),
  setup(props, { slots }) {
    const flag = ref(false);
    flags.set(props.triggerEle, flag);
    const triggerListener = (e: Event) => {
      e.stopPropagation();
      props.selfControl
        ? null
        : flag.value && props.reverse
        ? (flag.value = false)
        : (flag.value = true);
    };
    onMounted(() => {
      const trigger: HTMLElement =
        typeof props.triggerEle === "string"
          ? document.querySelector
            ? document.querySelector(props.triggerEle)
            : null
          : props.triggerEle;

      let outsideListener: (e: Event) => void;
      if (props.triggerType === "click") {
        outsideListener = (e: Event) => {
          const inner = document.querySelector(".__show_or_hide_wrapper");
          if (!inner?.contains(e.target as Node)) {
            props.outsideFn
              ? props.outsideFn(e, { flag })
              : (flag.value = false);
            document.removeEventListener("click", outsideListener);
          }
        };
      } else if (props.triggerType === "mouseenter") {
        outsideListener = (e: Event) => {
          props.outsideFn ? props.outsideFn(e, { flag }) : (flag.value = false);
          trigger.removeEventListener("mouseleave", outsideListener);
        };
      }

      trigger.addEventListener(
        props.triggerType as keyof HTMLElementEventMap,
        triggerListener
      );
      watch(
        () => [flag.value, props.outside],
        () => {
          if (flag.value && props.outside) {
            nextTick(() => {
              switch (props.triggerType) {
                case "click":
                  document.addEventListener("click", outsideListener);
                  break;
                case "mouseenter":
                  trigger.addEventListener("mouseleave", outsideListener);
                  break;
              }
            });
          }
        }
      );
      onUnmounted(() => {
        flags.delete(props.triggerEle);
      });
    });

    return () => {
      const children = slots.default?.();
      return flag.value
        ? h("div", { class: "__show_or_hide_wrapper" }, [children])
        : null;
    };
  },
});

export const selfControlWrapper = (
  triggerEle: string | HTMLElement,
  fn: (...args: any[]) => any
) => {
  return (...args: any[]) => fn(...args, flags.get(triggerEle));
};

export const close = (triggerEle: string | HTMLElement) => {
  const flag = flags.get(triggerEle);
  flag.value = false;
};
