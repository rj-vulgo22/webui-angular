import {
  useButton
} from "./chunk-DWDXV3HN.js";
import {
  useRenderElement
} from "./chunk-773V43GS.js";
import {
  require_react
} from "./chunk-CCM6V4RU.js";
import {
  __objRest,
  __toESM
} from "./chunk-KWSTWQNB.js";

// node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.7_react@19.2.7__react@19.2.7/node_modules/@base-ui/react/esm/button/Button.js
var React = __toESM(require_react(), 1);
var Button = React.forwardRef(function Button2(componentProps, forwardedRef) {
  const _a = componentProps, {
    render,
    className,
    disabled = false,
    focusableWhenDisabled = false,
    nativeButton = true,
    style
  } = _a, elementProps = __objRest(_a, [
    "render",
    "className",
    "disabled",
    "focusableWhenDisabled",
    "nativeButton",
    "style"
  ]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled,
    native: nativeButton
  });
  const state = {
    disabled
  };
  return useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [elementProps, getButtonProps]
  });
});
if (true) Button.displayName = "Button";
export {
  Button
};
//# sourceMappingURL=@base-ui_react_button.js.map
