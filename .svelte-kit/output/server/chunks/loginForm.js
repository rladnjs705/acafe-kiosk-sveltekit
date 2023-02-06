import { c as create_ssr_component } from "./index2.js";
import { d as derived, w as writable } from "./index.js";
import "./validates.js";
const ADMIN = "admin";
function setAuthToken() {
  const defaultValue = "";
  const isLoginToken = defaultValue;
  const { subscribe, update, set } = writable(isLoginToken);
  const saveAuthToken = ({ data: { loginWithPassword } }) => {
    try {
      set(loginWithPassword.authToken);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  const removeAuthToken = () => set("");
  const checkToken = () => {
    set("");
  };
  return {
    subscribe,
    saveAuthToken,
    removeAuthToken,
    checkToken
  };
}
function setAuth() {
  let initValues = {
    _id: "",
    email: "",
    role: ""
  };
  const { subscribe, set } = writable({ ...initValues });
  const createAuth = async () => {
    try {
      const loginUser = await getLoginUser.refetch();
      const _id = loginUser.data.me._id;
      const email = loginUser.data.me.emails[0].address;
      const role = loginUser.data.me.profile.role;
      set({ _id, email, role });
      return;
    } catch (error) {
      authToken.removeAuthToken();
      set({ ...initValues });
      return;
    }
  };
  const resetAuth = () => {
    authToken.removeAuthToken();
    set({ ...initValues });
    return;
  };
  return {
    subscribe,
    createAuth,
    resetAuth
  };
}
function setIsAdmin() {
  const checkRole = derived(auth, ($auth) => $auth.role === ADMIN ? true : false);
  return checkRole;
}
const authToken = setAuthToken();
const auth = setAuth();
setIsAdmin();
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section><div><div class="${"app d-flex container-fluid "}">
    <div class="${"row d-flex justify-content-center align-items-center content-auth"}"><div class="${"auth-box"}"><div class="${"card auth"}"><div class="${"card-header"}"><h4>로그인</h4></div>
      <form method="${"post"}" action="${"/user/login"}"><div class="${"card-body"}"><div class="${"mb-3 input-box"}"><label for="${"userEmail"}" class="${"form-label"}">아이디</label>
          <input id="${"userEmail"}" name="${"userEmail"}" type="${"email"}" class="${"form-control"}" placeholder="${"name@example.com"}" required></div>
        <div class="${"mb-3"}"><div class="${"d-flex justify-content-between"}"><label for="${"password"}" class="${"form-label"}">패스워드</label></div>
          <input id="${"password"}" name="${"password"}" type="${"password"}" class="${"form-control"}" placeholder="${"Password"}" required></div></div>
        <div class="${"card-bottom d-flex flex-column"}"><button class="${"btn btn-primary pt-3 pb-3 mb-3"}" type="${"button"}">로그인</button>
        
        <p class="${"align-self-end"}"><span><a href="${"/user/join"}">[회원가입]</a></span></p></div></form></div></div></div>
    </div></div></section>`;
});
export {
  LoginForm as L
};
