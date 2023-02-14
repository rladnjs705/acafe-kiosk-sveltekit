import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../../../chunks/index2.js";
import "../../../../chunks/validates.js";
import "sweetalert2";
const RegisterForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formValues = { email: "", pwd: "", pwdConfirm: "" };
  let errors = {};
  return `
<div class="${"row d-flex justify-content-center align-items-center content-auth"}"><div class="${"auth-box"}"><div class="${"card auth"}"><div class="${"card-header"}"><h4>회원가입</h4></div>
      <div class="${"card-body"}"><div class="${"mb-3"}"><label for="${"idTextInput"}" class="${"form-label"}">아이디</label>
          <input type="${"text"}" class="${["form-control", errors.email ? "inputError" : ""].join(" ").trim()}"${add_attribute("value", formValues.email, 0)}> 
          ${errors.email ? `<span class="${"invalid-feedback was-validated"}">${escape(errors.email)}</span>` : ``}</div>
        <div class="${"mb-3"}"><label for="${"pwdTextInput"}" class="${"form-label"}">패스워드</label>
          <input type="${"password"}" class="${["form-control", errors.pwd ? "inputError" : ""].join(" ").trim()}"${add_attribute("value", formValues.pwd, 0)}> 
          ${errors.pwd ? `<span class="${"invalid-feedback was-validated"}">${escape(errors.pwd)}</span>` : ``}</div>            
        <div class="${"mb-3"}"><label for="${"pwdTextInputAgain"}" class="${"form-label"}">패스워드 확인</label>
          <input type="${"password"}" class="${["form-control", errors.pwdConfirm ? "inputError" : ""].join(" ").trim()}"${add_attribute("value", formValues.pwdConfirm, 0)}> 
          ${errors.pwdConfirm ? `<span class="${"invalid-feedback was-validated"}">${escape(errors.pwdConfirm)}</span>` : ``}</div></div>
      <div class="${"card-bottom d-flex flex-column"}"><button class="${"btn btn-primary pt-3 pb-3 mb-3"}">가입하기</button>
        <p class="${"align-self-end"}">이미 회원가입되어 있습니다. <span><a href="${"/user/login"}">[로그인]</a></span></p></div></div></div></div>
`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(RegisterForm, "JoinForm").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
