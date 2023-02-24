import { c as create_ssr_component, a as subscribe, v as validate_component, d as add_attribute, f as each, e as escape, h as is_promise, n as noop } from "../../../chunks/index2.js";
import { c as categoryList, m as modalActiveCategory, i as itemMainLoading, a as itemCategorySelected, b as isAdmin, A as ALL, d as itemSearch, e as itemPage, f as auth, g as itemFormValue, h as itemList, j as itemPageLock, k as itemFormMode, l as modalActiveItem, n as ADD_MODE, E as EDIT_MODE, o as orders, p as orderErrors, q as authToken } from "../../../chunks/index3.js";
import "sweetalert2";
import "../../../chunks/validates.js";
import { Notyf } from "notyf";
import axios from "axios";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { modalActive = false } = $$props;
  if ($$props.modalActive === void 0 && $$bindings.modalActive && modalActive !== void 0)
    $$bindings.modalActive(modalActive);
  return `${modalActive ? `<div class="${["modal-bg", modalActive === true ? "show" : ""].join(" ").trim()}"><div class="${["custom-modal", modalActive === true ? "show" : ""].join(" ").trim()}"><div class="${"modal-dialog"}"><div class="${"modal-content"}"><div class="${"modal-header"}">${slots["modal-title"] ? slots["modal-title"]({}) : ``}
            <button type="${"button"}" class="${"btn-close"}"></button></div>
          ${slots["modal-body"] ? slots["modal-body"]({}) : ``}
          ${slots["modal-footer"] ? slots["modal-footer"]({}) : ``}</div></div></div></div>` : ``}`;
});
const notyf_min = "";
const CategoryForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories;
  let $categoryList, $$unsubscribe_categoryList;
  let $modalActiveCategory, $$unsubscribe_modalActiveCategory;
  $$unsubscribe_categoryList = subscribe(categoryList, (value) => $categoryList = value);
  $$unsubscribe_modalActiveCategory = subscribe(modalActiveCategory, (value) => $modalActiveCategory = value);
  new Notyf({
    duration: 3e3,
    position: { x: "right", y: "top" }
  });
  categoryList.getCategoryList();
  let addValues = { categoryName: "" };
  let updateValues = { categoryId: "", categoryName: "" };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    categories = $categoryList;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { modalActive: $modalActiveCategory },
      {
        modalActive: ($$value) => {
          $modalActiveCategory = $$value;
          $$settled = false;
        }
      },
      {
        "modal-footer": () => {
          return `<div class="${"modal-footer d-flex flex-column align-items-stretch"}" slot="${"modal-footer"}"><div class="${"input-group"}"><input type="${"text"}" class="${"form-control border-line"}"${add_attribute("value", addValues.categoryName, 0)}>
      <button class="${"btn btn-primary"}">등록</button></div></div>`;
        },
        "modal-body": () => {
          return `<div class="${"modal-body"}" slot="${"modal-body"}"><h5 class="${"mb-3"}">카테고리 목록</h5>
    
    <ul class="${"category-list"}">${categories ? `${each(categories.list, (category) => {
            return `${updateValues.categoryId !== category.categoryId ? `<li class="${"mb-3 d-flex justify-content-between"}"><p>${escape(category.categoryName)}</p>
              <div class="${"edit-box"}">
                <a href="${"#null"}" class="${"link"}"><i class="${"bx bxs-pencil"}"></i></a>
                
                <a href="${"#null"}" class="${"link"}"><i class="${"bx bxs-trash"}"></i></a></div>              
            </li>` : `<li class="${"mb-3 d-flex justify-content-between"}"><input type="${"text"}" class="${"form-control border-line"}"${add_attribute("value", updateValues.categoryName, 0)}>
              </li>`}`;
          })}` : `<li><p>Loading</p></li>`}</ul></div>`;
        },
        "modal-title": () => {
          return `<h4 slot="${"modal-title"}">메뉴 추가</h4>`;
        },
        default: () => {
          return `
  
  

  
  
  

  
       
  `;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_categoryList();
  $$unsubscribe_modalActiveCategory();
  return $$rendered;
});
const CategoryList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data;
  let $itemMainLoading, $$unsubscribe_itemMainLoading;
  let $categoryList, $$unsubscribe_categoryList;
  let $itemCategorySelected, $$unsubscribe_itemCategorySelected;
  let $isAdmin, $$unsubscribe_isAdmin;
  $$unsubscribe_itemMainLoading = subscribe(itemMainLoading, (value) => $itemMainLoading = value);
  $$unsubscribe_categoryList = subscribe(categoryList, (value) => $categoryList = value);
  $$unsubscribe_itemCategorySelected = subscribe(itemCategorySelected, (value) => $itemCategorySelected = value);
  $$unsubscribe_isAdmin = subscribe(isAdmin, (value) => $isAdmin = value);
  data = $categoryList;
  $$unsubscribe_itemMainLoading();
  $$unsubscribe_categoryList();
  $$unsubscribe_itemCategorySelected();
  $$unsubscribe_isAdmin();
  return `
<div class="${"header-box-bottom"}"><ul class="${"d-flex justify-content-start"}"><li>${$itemCategorySelected === ALL ? `<a href="${"#null"}" class="${["d-flex align-items-center", $itemCategorySelected === ALL ? "selected" : ""].join(" ").trim()}">모두보기</a>` : `<a href="${"#null"}" class="${["d-flex align-items-center", $itemMainLoading ? "disableClick" : ""].join(" ").trim()}">모두보기</a>`}</li>
    ${data ? `${each(data.list, (category) => {
    return `<li>${$itemCategorySelected === category.categoryId ? `<a href="${"#null"}" class="${[
      "d-flex align-items-center",
      $itemCategorySelected === category.categoryId ? "selected" : ""
    ].join(" ").trim()}">${escape(category.categoryName)}</a>` : `<a href="${"#null"}" class="${["d-flex align-items-center", $itemMainLoading ? "disableClick" : ""].join(" ").trim()}">${escape(category.categoryName)}</a>`}
      </li>`;
  })}` : `<p class="${"d-flex align-items-center"}">Loading</p>`}

    ${$isAdmin ? `<li><a href="${"#null"}" class="${"d-flex align-items-center add"}">+관리</a></li>` : ``}</ul></div>
`;
});
const ItemSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_itemSearch;
  let $$unsubscribe_itemPage;
  $$unsubscribe_itemSearch = subscribe(itemSearch, (value) => value);
  $$unsubscribe_itemPage = subscribe(itemPage, (value) => value);
  let itemSearchForm;
  $$unsubscribe_itemSearch();
  $$unsubscribe_itemPage();
  return `
<div class="${"header-box-top d-flex "}"><h1>아카페</h1>
  <input type="${"text"}" class="${"form-control txt-search-menu border-line"}" placeholder="${"원하는 메뉴 이름을 입력해주세요."}"${add_attribute("value", itemSearchForm, 0)}></div>
`;
});
const ItemLoading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `
<div class="${"col-12 loading-box"}"><div class="${"circles"}"><i></i>
    <i></i>
    <i></i></div>
  <p>Loading...</p></div>
`;
});
const Item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_auth;
  let $$unsubscribe_isAdmin;
  let $$unsubscribe_itemFormValue;
  $$unsubscribe_auth = subscribe(auth, (value) => value);
  $$unsubscribe_isAdmin = subscribe(isAdmin, (value) => value);
  $$unsubscribe_itemFormValue = subscribe(itemFormValue, (value) => value);
  let { item } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$unsubscribe_auth();
  $$unsubscribe_isAdmin();
  $$unsubscribe_itemFormValue();
  return `<div class="${"col mb-2"}">
  <div class="${"card ct-shadow-sm menu-item-box"}"><div class="${"img-box"}" style="${"background-image: url(" + escape(item.itemImage, true) + ");"}"></div>
    <div class="${"card-body"}"><h5 class="${"card-title"}">${escape(item.itemName)}</h5>
      </div></div></div>`;
});
const ItemList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_itemCategorySelected;
  let $$unsubscribe_itemSearch;
  let $$unsubscribe_itemPage;
  let $itemList, $$unsubscribe_itemList;
  let $$unsubscribe_itemPageLock;
  let $isAdmin, $$unsubscribe_isAdmin;
  let $itemMainLoading, $$unsubscribe_itemMainLoading;
  $$unsubscribe_itemCategorySelected = subscribe(itemCategorySelected, (value) => value);
  $$unsubscribe_itemSearch = subscribe(itemSearch, (value) => value);
  $$unsubscribe_itemPage = subscribe(itemPage, (value) => value);
  $$unsubscribe_itemList = subscribe(itemList, (value) => $itemList = value);
  $$unsubscribe_itemPageLock = subscribe(itemPageLock, (value) => value);
  $$unsubscribe_isAdmin = subscribe(isAdmin, (value) => $isAdmin = value);
  $$unsubscribe_itemMainLoading = subscribe(itemMainLoading, (value) => $itemMainLoading = value);
  let component;
  let data;
  itemList.getItemList(0);
  data = $itemList;
  {
    {
      itemMainLoading.set(false);
    }
  }
  $$unsubscribe_itemCategorySelected();
  $$unsubscribe_itemSearch();
  $$unsubscribe_itemPage();
  $$unsubscribe_itemList();
  $$unsubscribe_itemPageLock();
  $$unsubscribe_isAdmin();
  $$unsubscribe_itemMainLoading();
  return `
<div class="${"row row-cols-4 g-4 pl-3 pr-3 pt-2 pb-4 list-bg-shadow"}"${add_attribute("this", component, 0)}>${$isAdmin ? `<div class="${"col mb-2"}">
    <span class="${"btn-add-modal-show"}"><div class="${"card menu-add-box h-100 d-flex justify-content-center align-items-center"}"><i class="${"bx bx-plus bx-md"}"></i></div></span></div>` : ``}                
  ${data ? `${each(data.list, (item) => {
    return `${validate_component(Item, "Item").$$render($$result, { item }, {}, {})}`;
  })}` : `${$itemMainLoading ? `
        ${validate_component(ItemLoading, "ItemLoading").$$render($$result, {}, {}, {})}` : ``}
      `}</div>
`;
});
const ItemForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $itemFormValue, $$unsubscribe_itemFormValue;
  let $itemFormMode, $$unsubscribe_itemFormMode;
  let $modalActiveItem, $$unsubscribe_modalActiveItem;
  let $categoryList, $$unsubscribe_categoryList;
  $$unsubscribe_itemFormValue = subscribe(itemFormValue, (value) => $itemFormValue = value);
  $$unsubscribe_itemFormMode = subscribe(itemFormMode, (value) => $itemFormMode = value);
  $$unsubscribe_modalActiveItem = subscribe(modalActiveItem, (value) => $modalActiveItem = value);
  $$unsubscribe_categoryList = subscribe(categoryList, (value) => $categoryList = value);
  let errors = {};
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        if ($itemFormMode === ADD_MODE) {
          itemFormValue.resetForm();
          errors = {};
        }
        if ($itemFormMode === EDIT_MODE)
          errors = {};
      }
    }
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { modalActive: $modalActiveItem },
      {
        modalActive: ($$value) => {
          $modalActiveItem = $$value;
          $$settled = false;
        }
      },
      {
        "modal-footer": () => {
          return `<div class="${"modal-footer d-flex flex-column align-items-stretch"}" slot="${"modal-footer"}">${$itemFormMode == ADD_MODE ? `<button type="${"button"}" class="${"btn btn-primary pt-3 pb-3"}">메뉴 추가</button>` : `${$itemFormMode == EDIT_MODE ? `<div class="${"row item-bottom"}"><div class="${"col"}"><button type="${"button"}" class="${"btn btn-primary pt-3 pb-3"}">메뉴 수정</button></div>
        <div class="${"col"}"><button type="${"button"}" class="${"btn btn-danger pt-3 pb-3"}">메뉴 삭제</button></div></div>` : ``}`}</div>`;
        },
        "modal-body": () => {
          return `<div class="${"modal-body"}" slot="${"modal-body"}"><div class="${"mb-3 "}"><label for="${"recipient-name"}" class="${"col-form-label"}">메뉴 이름:</label>
      <input type="${"text"}" class="${["form-control", errors.itemName ? "inputError" : ""].join(" ").trim()}" id="${"recipient-name"}"${add_attribute("value", $itemFormValue.itemName, 0)}>
      ${errors.itemName ? `<div class="${"invalid-feedback was-validated"}">${escape(errors.itemName)}</div>` : ``}</div>
    <div class="${"mb-3"}"><label for="${"menuCategory"}" class="${"col-form-label"}">메뉴 카테고리:</label>
      <select id="${"menuCategory"}" name="${"menuCategory"}" class="${["form-select", errors.categoryId ? "inputError" : ""].join(" ").trim()}"><option value="${""}">카테고리 선택</option>${each($categoryList.list, (category) => {
            return `<option${add_attribute("value", category.categoryId, 0)}>${escape(category.categoryName)}</option>`;
          })}</select>
      ${errors.categoryId ? `<div class="${"invalid-feedback was-validated"}">${escape(errors.categoryId)}</div>` : ``}</div>            
    <div class="${"mb-3"}"><label for="${"itemPrice"}" class="${"col-form-label"}">메뉴 가격:</label>
      <input type="${"text"}" class="${["form-control", errors.itemPrice ? "inputError" : ""].join(" ").trim()}" id="${"itemPrice"}"${add_attribute("value", $itemFormValue.itemPrice, 0)}>
      ${errors.itemPrice ? `<div class="${"invalid-feedback was-validated"}">${escape(errors.itemPrice)}</div>` : ``}</div>
    <div class="${"mb-3"}"><label for="${"itemImage"}" class="${"col-form-label"}">메뉴 이미지:</label>
      <input type="${"file"}" class="${["form-control", errors.itemImage ? "inputError" : ""].join(" ").trim()}" id="${"itemImage"}">
      ${errors.itemImage ? `<div class="${"invalid-feedback was-validated"}">${escape(errors.itemImage)}</div>` : ``}</div>
    ${$itemFormValue.itemImage ? `<div class="${"mb-3"}"><img${add_attribute("src", $itemFormValue.itemImage, 0)} class="${"card-img-top"}" alt="${""}"></div>              
      ` : ``}</div>`;
        },
        "modal-title": () => {
          return `<h4 slot="${"modal-title"}">메뉴 추가</h4>`;
        },
        default: () => {
          return `
  
  

            
  
        
  
            
  
  `;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_itemFormValue();
  $$unsubscribe_itemFormMode();
  $$unsubscribe_modalActiveItem();
  $$unsubscribe_categoryList();
  return $$rendered;
});
const Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>
  <div${add_attribute(
    "class",
    "content d-flex flex-column container-fluid",
    0
  )}><div class="${"main-header-section d-flex flex-column "}">${validate_component(ItemSearch, "ItemSearch").$$render($$result, {}, {}, {})}
      ${validate_component(CategoryList, "CategoryList").$$render($$result, {}, {}, {})}
      ${validate_component(CategoryForm, "CategoryForm").$$render($$result, {}, {}, {})}
    </div>

    <div class="${"main-content-section simplebar"}">${validate_component(ItemList, "ItemList").$$render($$result, {}, {}, {})}
      ${validate_component(ItemForm, "ItemForm").$$render($$result, {}, {}, {})}
    </div></div>
</main>`;
});
const OrderList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let orderList;
  let $$unsubscribe_auth;
  let $orders, $$unsubscribe_orders;
  $$unsubscribe_auth = subscribe(auth, (value) => value);
  $$unsubscribe_orders = subscribe(orders, (value) => $orders = value);
  orderList = $orders.orderItems;
  $$unsubscribe_auth();
  $$unsubscribe_orders();
  return `<ul>${each(orderList, (item) => {
    return `<li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>${escape(item.itemName)}</h4>
        </div>
      <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
        <input type="${"text"}" class="${"form-control border-line"}"${add_attribute("value", item.itemCount, 0)}>
        <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div>
    </li>`;
  })}</ul>`;
});
const OrderBottom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $orders, $$unsubscribe_orders;
  let $orderErrors, $$unsubscribe_orderErrors;
  $$unsubscribe_orders = subscribe(orders, (value) => $orders = value);
  $$unsubscribe_orderErrors = subscribe(orderErrors, (value) => $orderErrors = value);
  new Notyf({
    duration: 3e3,
    position: { x: "right", y: "top" }
  });
  let errors;
  errors = $orderErrors;
  $$unsubscribe_orders();
  $$unsubscribe_orderErrors();
  return `<div class="${"side-bottom-header d-flex align-items-center justify-content-center"}"><p><span class="${"total-count"}">${escape($orders.orderCount)}</span>개 선택
    </p></div>
${errors ? `<div class="${"side-bottom-header d-flex align-items-center justify-content-center"}"><p><span class="${"invalid-feedback was-validated"}">${escape(errors.orderCount)}</span></p></div>` : ``}
<div class="${"side-bottom-button-box d-flex flex-column pl-4 pr-4 pb-4 "}"><button class="${"btn btn-primary h-100"}">주문하기</button></div>`;
});
const orderResultList_svelte_svelte_type_style_lang = "";
const css = {
  code: ".orderChecked.svelte-1a1tfha{text-decoration-line:line-through underLine}.btnOrderCheck.svelte-1a1tfha{cursor:pointer}",
  map: null
};
const OrderResultList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let orderList;
  getOrders();
  async function getOrders() {
    await axios.get("/api/admin/orders/subscribe").then((data) => {
      orderList = data.data;
      setTimeout(getOrders, 2e3);
    }).catch((error) => {
      console.log(error);
      setTimeout(getOrders, 5e3);
    });
  }
  $$result.css.add(css);
  return `
<ul>
  ${orderList ? `${each(orderList, (order) => {
    return `<li class="${"d-flex flex-column p-4 order-result-list "}"><div class="${"d-flex justify-content-between "}"><ul class="${"order-inner-list"}"><li class="${"d-flex justify-content-between date"}"><p class="${["svelte-1a1tfha", !order.orderState ? "orderChecked" : ""].join(" ").trim()}">${escape(order.createDate)}</p>
              <p class="${["svelte-1a1tfha", !order.orderState ? "orderChecked" : ""].join(" ").trim()}">${escape(order.orderNumber)}</p>
              
              <p class="${"btnOrderCheck svelte-1a1tfha"}">확인</p></li>        
            ${order.item ? `${each(order.item, (item) => {
      return `<li class="${"d-flex justify-content-between "}"><p class="${["svelte-1a1tfha", !order.orderState ? "orderChecked" : ""].join(" ").trim()}">${escape(item.itemName)}</p>
                  <p class="${["svelte-1a1tfha", !order.orderState ? "orderChecked" : ""].join(" ").trim()}">${escape(item.itemCount)}</p></li>   
                <li class="${"d-flex justify-content-between "}">
                  
                </li>`;
    })}` : ``}
            <li class="${"d-flex justify-content-between total "}"><p class="${["svelte-1a1tfha", !order.orderState ? "orderChecked" : ""].join(" ").trim()}">개수합계</p>
              <p class="${["svelte-1a1tfha", !order.orderState ? "orderChecked" : ""].join(" ").trim()}">${escape(order.orderCount)}</p></li>                   
            
          </ul></div>
      </li>`;
  })}
  ` : `<li class="${"d-flex flex-column p-4 order-result-list"}"><p>Loading...</p></li>`}</ul> 
`;
});
const Aside = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authToken, $$unsubscribe_authToken;
  let $isAdmin, $$unsubscribe_isAdmin;
  let $auth, $$unsubscribe_auth;
  $$unsubscribe_authToken = subscribe(authToken, (value) => $authToken = value);
  $$unsubscribe_isAdmin = subscribe(isAdmin, (value) => $isAdmin = value);
  $$unsubscribe_auth = subscribe(auth, (value) => $auth = value);
  $$unsubscribe_authToken();
  $$unsubscribe_isAdmin();
  $$unsubscribe_auth();
  return `<aside>
  <div class="${"side-header"}"><div class="${"title-box d-flex align-items-center justify-content-between pl-4 pr-4 pt-4"}"><h2>주문내용</h2>
      <span>${$authToken ? `<a href="${"#null"}"><i class="${"bx bx-log-out"}"></i></a>
          ${$isAdmin ? `<a href="${"/users"}"><i class="${"bx bxs-cog"}"></i></a>` : ``}` : `<a href="${"#null"}"><i class="${"bx bx-log-in"}"></i></a>`}</span></div>
    <div class="${"info-box d-flex justify-content-between align-items-center pl-4 pr-4"}">${$authToken ? `<p>${escape($auth.email)} 로그인중</p>` : `<p>상품 이름</p>`}
      <p>수량</p></div></div>
  <div${add_attribute(
    "class",
    $isAdmin ? "side-content-admin aside-box simplebar mt-auto" : "side-content aside-box simplebar mt-auto",
    0
  )}>
      ${$isAdmin ? `${validate_component(OrderResultList, "OrderResultList").$$render($$result, {}, {}, {})}` : `${validate_component(OrderList, "OrderList").$$render($$result, {}, {}, {})}`}
    </div>
  <div${add_attribute(
    "class",
    $isAdmin ? "side-bottom-admin d-flex flex-column justify-content-center align-items-center" : "side-bottom d-flex flex-column justify-content-center align-items-center",
    0
  )}>
      ${!$isAdmin ? `${validate_component(OrderBottom, "OrderBottom").$$render($$result, {}, {}, {})}` : ``}
    </div>
</aside>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authToken, $$unsubscribe_authToken;
  $$unsubscribe_authToken = subscribe(authToken, (value) => $authToken = value);
  const initAuth = async () => {
    if ($authToken) {
      await auth.createAuth();
    }
    return;
  };
  {
    {
      if ($authToken) {
        auth.createAuth();
      } else {
        auth.resetAuth();
      }
    }
  }
  $$unsubscribe_authToken();
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(initAuth2) {
      return `
    ${validate_component(Main, "MenuForm").$$render($$result, {}, {}, {})}
    ${validate_component(Aside, "MenuAside").$$render($$result, {}, {}, {})}
`;
    }();
  }(initAuth())}`;
});
export {
  Page as default
};
