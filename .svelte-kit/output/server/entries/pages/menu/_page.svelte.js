import { c as create_ssr_component, a as subscribe, v as validate_component, d as add_attribute, f as each, e as escape } from "../../../chunks/index2.js";
import { c as categoryList, m as modalActiveCategory, i as itemCategorySelected, A as ALL, a as itemSearch, b as itemPage, d as isAdmin, e as itemFormValue, f as itemList, g as itemPageLock, h as itemFormMode, j as modalActiveItem, k as ADD_MODE, E as EDIT_MODE, l as auth } from "../../../chunks/index3.js";
import "sweetalert2";
import "../../../chunks/validates.js";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { modalActive = false } = $$props;
  if ($$props.modalActive === void 0 && $$bindings.modalActive && modalActive !== void 0)
    $$bindings.modalActive(modalActive);
  return `${modalActive ? `<div class="${["modal-bg", modalActive === true ? "show" : ""].join(" ").trim()}"><div class="${["custom-modal", modalActive === true ? "show" : ""].join(" ").trim()}"><div class="${"modal-dialog"}"><div class="${"modal-content"}"><div class="${"modal-header"}">${slots["modal-title"] ? slots["modal-title"]({}) : ``}
            <button type="${"button"}" class="${"btn-close"}"></button></div>
          ${slots["modal-body"] ? slots["modal-body"]({}) : ``}
          ${slots["modal-footer"] ? slots["modal-footer"]({}) : ``}</div></div></div></div>` : ``}`;
});
const CategoryForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories;
  let $categoryList, $$unsubscribe_categoryList;
  let $modalActiveCategory, $$unsubscribe_modalActiveCategory;
  $$unsubscribe_categoryList = subscribe(categoryList, (value) => $categoryList = value);
  $$unsubscribe_modalActiveCategory = subscribe(modalActiveCategory, (value) => $modalActiveCategory = value);
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
  let $categoryList, $$unsubscribe_categoryList;
  let $itemCategorySelected, $$unsubscribe_itemCategorySelected;
  $$unsubscribe_categoryList = subscribe(categoryList, (value) => $categoryList = value);
  $$unsubscribe_itemCategorySelected = subscribe(itemCategorySelected, (value) => $itemCategorySelected = value);
  data = $categoryList;
  $$unsubscribe_categoryList();
  $$unsubscribe_itemCategorySelected();
  return `
<div class="${"header-box-bottom"}"><ul class="${"d-flex justify-content-start"}"><li>${$itemCategorySelected === ALL ? `<a href="${"#null"}" class="${["d-flex align-items-center", $itemCategorySelected === ALL ? "selected" : ""].join(" ").trim()}">모두보기</a>` : `<a href="${"#null"}" class="${"d-flex align-items-center"}">모두보기</a>`}</li>
    ${data ? `${each(data.list, (category) => {
    return `<li>${$itemCategorySelected === category.categoryId ? `<a href="${"#null"}" class="${[
      "d-flex align-items-center",
      $itemCategorySelected === category.categoryId ? "selected" : ""
    ].join(" ").trim()}">${escape(category.categoryName)}</a>` : `<a href="${"#null"}" class="${"d-flex align-items-center"}">${escape(category.categoryName)}</a>`}
      </li>`;
  })}` : `<p class="${"d-flex align-items-center"}">Loading</p>`}
    <li><a href="${"#null"}" class="${"d-flex align-items-center add"}">+관리</a></li></ul></div>
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
<div class="${"header-box-top d-flex "}"><h1>스마트 메뉴판</h1>
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
  let $$unsubscribe_isAdmin;
  let $$unsubscribe_itemFormValue;
  $$unsubscribe_isAdmin = subscribe(isAdmin, (value) => value);
  $$unsubscribe_itemFormValue = subscribe(itemFormValue, (value) => value);
  let { item } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$unsubscribe_isAdmin();
  $$unsubscribe_itemFormValue();
  return `<div class="${"col mb-2"}">
  <div class="${"card ct-shadow-sm menu-item-box"}"><div class="${"img-box"}" style="${"background-image: url(http://localhost:3000/" + escape(item.itemImage, true) + ");"}"></div>
    <div class="${"card-body"}"><h5 class="${"card-title"}">${escape(item.itemName)}</h5>
      <p class="${"card-text"}">${escape(item.itemPrice)} 원</p></div></div></div>`;
});
const ItemList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_itemCategorySelected;
  let $$unsubscribe_itemSearch;
  let $$unsubscribe_itemPage;
  let $itemList, $$unsubscribe_itemList;
  let $$unsubscribe_itemPageLock;
  $$unsubscribe_itemCategorySelected = subscribe(itemCategorySelected, (value) => value);
  $$unsubscribe_itemSearch = subscribe(itemSearch, (value) => value);
  $$unsubscribe_itemPage = subscribe(itemPage, (value) => value);
  $$unsubscribe_itemList = subscribe(itemList, (value) => $itemList = value);
  $$unsubscribe_itemPageLock = subscribe(itemPageLock, (value) => value);
  let component;
  let data;
  itemList.getItemList(0);
  data = $itemList;
  $$unsubscribe_itemCategorySelected();
  $$unsubscribe_itemSearch();
  $$unsubscribe_itemPage();
  $$unsubscribe_itemList();
  $$unsubscribe_itemPageLock();
  return `
<div class="${"row row-cols-4 g-4 pl-3 pr-3 pt-2 pb-4 list-bg-shadow"}"${add_attribute("this", component, 0)}><div class="${"col mb-2"}">
    <span class="${"btn-add-modal-show"}"><div class="${"card menu-add-box h-100 d-flex justify-content-center align-items-center"}"><i class="${"bx bx-plus bx-md"}"></i></div></span></div>                        
  ${data ? `${each(data.list, (item) => {
    return `${validate_component(Item, "Item").$$render($$result, { item }, {}, {})}`;
  })}` : `
      ${validate_component(ItemLoading, "ItemLoading").$$render($$result, {}, {}, {})}
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
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        if ($itemFormMode === ADD_MODE)
          itemFormValue.resetForm();
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
      <input type="${"text"}" class="${"form-control"}" id="${"recipient-name"}"${add_attribute("value", $itemFormValue.itemName, 0)}>
      </div>
    <div class="${"mb-3"}"><label for="${"menuCategory"}" class="${"col-form-label"}">메뉴 카테고리:</label>
      <select id="${"menuCategory"}" name="${"menuCategory"}" class="${"form-select"}"><option value="${""}">카테고리 선택</option>${each($categoryList.list, (category) => {
            return `<option${add_attribute("value", category.categoryId, 0)}>${escape(category.categoryName)}</option>`;
          })}</select></div>            
    <div class="${"mb-3"}"><label for="${"itemPrice"}" class="${"col-form-label"}">메뉴 가격:</label>
      <input type="${"text"}" class="${"form-control"}" id="${"itemPrice"}"${add_attribute("value", $itemFormValue.itemPrice, 0)}></div>
    <div class="${"mb-3"}"><label for="${"itemImage"}" class="${"col-form-label"}">메뉴 이미지:</label>
      <input type="${"file"}" class="${"form-control"}" id="${"itemImage"}"></div>
    <div class="${"mb-3"}"><img src="${"/images/food_img/KjdgrhOok.png"}" class="${"card-img-top"}" alt="${""}"></div></div>`;
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
  auth.createAuth();
  return `<main>
  <div class="${"content d-flex flex-column container-fluid"}"><div class="${"main-header-section d-flex flex-column "}">${validate_component(ItemSearch, "ItemSearch").$$render($$result, {}, {}, {})}
      ${validate_component(CategoryList, "CategoryList").$$render($$result, {}, {}, {})}
      ${validate_component(CategoryForm, "CategoryForm").$$render($$result, {}, {}, {})}
    </div>

    <div class="${"main-content-section simplebar"}">${validate_component(ItemList, "ItemList").$$render($$result, {}, {}, {})}
      ${validate_component(ItemForm, "ItemForm").$$render($$result, {}, {}, {})}
    </div></div>
</main>`;
});
const OrderList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<ul><li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li>
  <li class="${"d-flex p-4 align-items-center"}"><div class="${"order-title-box d-flex flex-column justify-content-between "}"><h4>마르게리타 피자!!!!!!!</h4>
      <p class="${"price-sum"}">12,000</p></div>
    <div class="${"order-btn-box d-flex justify-content-end "}"><button class="${"btn btn-ui mr-1"}"><i class="${"bx bx-plus"}"></i></button>
      <input type="${"text"}" class="${"form-control border-line"}">
      <button class="${"btn btn-ui ml-1"}"><i class="${"bx bx-minus"}"></i></button></div></li></ul>`;
});
const OrderBottom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"side-bottom-header d-flex align-items-center justify-content-center"}"><p><span class="${"total-count"}">50</span>개 
    <span class="${"total-price"}">232,000</span>원 선택
  </p></div>
<div class="${"side-bottom-button-box d-flex flex-column pl-4 pr-4 pb-4 "}"><button class="${"btn btn-primary h-100"}">주문하기</button></div>`;
});
const Aside = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<aside>
  <div class="${"side-header"}"><div class="${"title-box d-flex align-items-center justify-content-between pl-4 pr-4 pt-4"}"><h2>주문내용</h2>
      <span><a href="${"#null"}"><i class="${"bx bx-log-in"}"></i></a>
        <a href="${"#null"}"><i class="${"bx bxs-cog"}"></i></a></span></div>
    <div class="${"info-box d-flex justify-content-between align-items-center pl-4 pr-4"}"><p>상품 이름</p>
      <p>수량</p></div></div>
  <div class="${"side-content aside-box simplebar mt-auto"}">
      ${validate_component(OrderList, "OrderList").$$render($$result, {}, {}, {})}
    </div>
  <div class="${"side-bottom d-flex flex-column justify-content-center align-items-center"}">
      ${validate_component(OrderBottom, "OrderBottom").$$render($$result, {}, {}, {})}
    </div>
</aside>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Main, "MenuForm").$$render($$result, {}, {}, {})}
${validate_component(Aside, "MenuAside").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
