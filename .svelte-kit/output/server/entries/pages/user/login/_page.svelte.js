import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index2.js";
import { L as LoginForm } from "../../../../chunks/loginForm.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(LoginForm, "LoginForm").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
