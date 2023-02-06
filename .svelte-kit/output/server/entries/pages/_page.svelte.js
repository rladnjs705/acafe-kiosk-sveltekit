import { c as create_ssr_component, v as validate_component } from "../../chunks/index2.js";
import { L as LoginForm } from "../../chunks/loginForm.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1sz2ka7_START -->${$$result.title = `<title>아카페</title>`, ""}<meta name="${"description"}" content="${"acafe demo app"}"><!-- HEAD_svelte-1sz2ka7_END -->`, ""}

${validate_component(LoginForm, "LoginForm").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
