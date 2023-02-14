import { c as create_ssr_component, d as add_attribute, e as escape } from "./index2.js";
import "./index3.js";
import "./validates.js";
import "sweetalert2";
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formValues = { userEmail: "", password: "" };
  let errors = {};
  return `<section><div><div class="${"app d-flex container-fluid "}">
    <div class="${"row d-flex justify-content-center align-items-center content-auth"}"><div class="${"auth-box"}"><div class="${"card auth"}"><div class="${"card-header"}"><h4>로그인</h4></div>
        <div class="${"card-body"}"><div class="${"mb-3 input-box"}"><label for="${"userEmail"}" class="${"form-label"}">아이디</label>
          <input id="${"userEmail"}" name="${"userEmail"}" type="${"email"}" class="${["form-control", errors.userEmail ? "inputError" : ""].join(" ").trim()}" placeholder="${"name@example.com"}" required${add_attribute("value", formValues.userEmail, 0)}>
          ${errors.userEmail ? `<span class="${"invalid-feedback was-validated"}">${escape(errors.userEmail)}</span>` : ``}</div>
        <div class="${"mb-3"}"><div class="${"d-flex justify-content-between"}"><label for="${"password"}" class="${"form-label"}">패스워드</label></div>
          <input id="${"password"}" name="${"password"}" type="${"password"}" class="${["form-control", errors.userEmail ? "inputError" : ""].join(" ").trim()}" placeholder="${"Password"}" required${add_attribute("value", formValues.password, 0)}>
          ${errors.password ? `<span class="${"invalid-feedback was-validated"}">${escape(errors.password)}</span>` : ``}</div></div>
        <div class="${"card-bottom d-flex flex-column"}"><button class="${"btn btn-primary pt-3 pb-3 mb-3"}" type="${"button"}">로그인</button>
        
        <p class="${"align-self-end"}"><span><a href="${"/user/join"}">[회원가입]</a></span></p></div></div></div></div>
    </div></div></section>`;
});
export {
  LoginForm as L
};
