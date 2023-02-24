import { c as create_ssr_component, a as subscribe, f as each, e as escape, v as validate_component } from "../../../chunks/index2.js";
import { f as auth, r as ADMIN, b as isAdmin } from "../../../chunks/index3.js";
const UserList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data;
  let $auth, $$unsubscribe_auth;
  $$unsubscribe_auth = subscribe(auth, (value) => $auth = value);
  let users;
  const verifyChecked = (role) => {
    if (role === ADMIN) {
      return true;
    } else {
      return false;
    }
  };
  const verifyUser = (userId) => {
    if ($auth._id === userId) {
      return true;
    }
  };
  data = users;
  $$unsubscribe_auth();
  return `
<div class="${"row d-flex justify-content-center align-items-center content-auth"}"><div class="${"auth-box"}"><div class="${"card auth"}"><div class="${"card-header"}"><h4>로그인</h4></div>
      <div class="${"card-body"}"><table class="${"table user-table "}"><thead><tr><td>이메일</td>
              <td class="${"text-center"}">관리권한</td>
              <td class="${"text-center"}">관리수정</td></tr></thead>
          <tbody>${data ? `${each(data.list, (user) => {
    return `<tr><td>${escape(user.email)}</td>
                <td class="${"text-center"}">${escape(user.role)}</td>
                <td class="${"text-center"}"><input type="${"checkbox"}" ${verifyUser(user.id) ? "disabled" : ""} ${verifyChecked(user.role) ? "checked" : ""}></td>
              </tr>`;
  })}` : `<tr><td colspan="${"3"}"><p>Loading</p></td></tr>`}</tbody></table></div>
      <div class="${"card-bottom d-flex flex-column"}"><button class="${"btn btn-primary pt-3 pb-3 mb-3"}">확인</button></div></div></div></div>
`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isAdmin, $$unsubscribe_isAdmin;
  $$unsubscribe_isAdmin = subscribe(isAdmin, (value) => $isAdmin = value);
  $$unsubscribe_isAdmin();
  return `${$isAdmin ? `${validate_component(UserList, "Users").$$render($$result, {}, {}, {})}` : ``}`;
});
export {
  Page as default
};
