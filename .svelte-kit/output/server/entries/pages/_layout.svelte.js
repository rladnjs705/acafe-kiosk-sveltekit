import { c as create_ssr_component } from "../../chunks/index2.js";
const bootstrap_min = "";
const boxicons_min = "";
const main = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-wret2p_START -->${`<meta name="${"viewport"}" content="${"width=device-width, maximum-scale=1.0, minimum-scale=1, user-scalable=yes,initial-scale=1.0"}">`}${$$result.title = `<title>아카페</title>`, ""}<!-- HEAD_svelte-wret2p_END -->`, ""}

<body>${`<div class="${"app d-flex container-fluid "}">${slots.default ? slots.default({}) : ``}</div>`}</body>`;
});
export {
  Layout as default
};
