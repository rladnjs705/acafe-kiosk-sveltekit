import { B as BROWSER, d as derived, w as writable } from "./index.js";
import axios from "axios";
const browser = BROWSER;
const ALL = 0;
const ADMIN = "admin";
const ADD_MODE = "add_mode";
const EDIT_MODE = "edit_mode";
function setModalActiveItem() {
  const { subscribe, set } = writable(false);
  const openModal = () => set(true);
  const closeModal = () => set(false);
  return {
    subscribe,
    set,
    openModal,
    closeModal
  };
}
function setItemFormValue() {
  const initValues = {
    itemId: "",
    itemName: "",
    categoryId: 0,
    itemPrice: 0,
    itemImage: ""
  };
  const { subscribe, set } = writable({ ...initValues });
  const resetForm = () => set({ ...initValues });
  return {
    subscribe,
    set,
    resetForm
  };
}
function setItemPage() {
  const initValues = {
    pageNumber: 0
  };
  const { subscribe, set, update } = writable({ ...initValues });
  const nextPage = () => {
    update(
      (data) => {
        data.pageNumber = data.pageNumber + 1;
        itemPageLock.set(true);
        itemPageLoading.set(true);
        return data;
      }
    );
  };
  const resetPage = () => {
    itemPageLock.set(true);
    set({ ...initValues });
  };
  return {
    subscribe,
    nextPage,
    resetPage
  };
}
function setItemFormMode() {
  const { subscribe, set } = writable("");
  const onAddMode = () => set(ADD_MODE);
  const onEditMode = () => set(EDIT_MODE);
  return {
    subscribe,
    onAddMode,
    onEditMode
  };
}
function setItemCategorySelected() {
  const { subscribe, set } = writable(ALL);
  const selectCategory = (_id) => {
    set(_id);
    itemPage.resetPage();
    itemMainLoading.set(true);
  };
  return {
    subscribe,
    selectCategory
  };
}
function setAuthToken() {
  const defaultValue = "";
  const isLoginToken = defaultValue;
  const { subscribe, update, set } = writable(isLoginToken);
  const saveAuthToken = (data) => {
    try {
      localStorage.setItem("token", data.token);
      set(data.token);
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
  let data = {
    params: {
      authToken: ""
    }
  };
  const { subscribe, set } = writable({ ...initValues });
  const createAuth = async () => {
    try {
      const defaultValue = "";
      const isLoginToken = browser ? window.localStorage.getItem("token") ?? defaultValue : defaultValue;
      data.params.authToken = isLoginToken;
      const response = await axios.get("/api/user/login/info", data);
      const userInfo = response.data.data;
      const _id = userInfo.id;
      const email = userInfo.email;
      const role = userInfo.role;
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
function setCategoryList() {
  const { subscribe, update, set } = writable();
  const getCategoryList = async () => {
    try {
      const response = await axios.get("/api/user/categories");
      set(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    subscribe,
    getCategoryList,
    update
  };
}
function setItemList() {
  let params = {
    page: 0,
    size: 10,
    itemName: "",
    categoryId: 0
  };
  const { subscribe, update, set } = writable();
  const getItemList = async (pageNumber, name, categoryId) => {
    try {
      if (name != "" && name != null) {
        params.itemName = name;
      } else {
        params.itemName = "";
      }
      if (pageNumber > 0) {
        itemPageLock.set(true);
        params.page = pageNumber;
      } else {
        params.page = 0;
      }
      if (categoryId > 0 && categoryId != null) {
        params.categoryId = categoryId;
      } else {
        params.categoryId = 0;
      }
      const response = await axios.get("/api/user/items", { params });
      set(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    subscribe,
    getItemList,
    update
  };
}
const modalActiveCategory = writable(false);
const modalActiveItem = setModalActiveItem();
const itemFormValue = setItemFormValue();
const itemPage = setItemPage();
const itemPageLock = writable(false);
const itemFormMode = setItemFormMode();
const itemCategorySelected = setItemCategorySelected();
const itemSearch = writable("");
const authToken = setAuthToken();
const auth = setAuth();
const isAdmin = setIsAdmin();
const itemMainLoading = writable(false);
const itemPageLoading = writable(false);
const categoryList = setCategoryList();
const itemList = setItemList();
export {
  ALL as A,
  EDIT_MODE as E,
  itemSearch as a,
  itemPage as b,
  categoryList as c,
  isAdmin as d,
  itemFormValue as e,
  itemList as f,
  itemPageLock as g,
  itemFormMode as h,
  itemCategorySelected as i,
  modalActiveItem as j,
  ADD_MODE as k,
  auth as l,
  modalActiveCategory as m
};
