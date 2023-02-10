// @ts-nocheck
import { writable, derived } from 'svelte/store';
import { ADD_MODE, EDIT_MODE, ALL, ADMIN } from '../utils/constans';
import { browser } from '$app/environment';
import axios from 'axios';

function setModalActiveItem() {
  const { subscribe, set } = writable(false);

  const openModal = () => set(true);
  const closeModal = () => set(false);

  return {
    subscribe,
    set,
    openModal,
    closeModal,
  }
}

function setItemFormValue() {
  const initValues = {
    _id: '',
    itemName: '',
    categoryId: 0,
    itemPrice: 0,
    itemImage: '',
  }

  const { subscribe, set } = writable({...initValues});

  const resetForm = () => set({...initValues});

  return {
    subscribe,
    set,
    resetForm,
  }
}

function setItemPage() {
  const initValues = {
    pageNumber: 1
  }

  const { subscribe, set, update } = writable({...initValues});

  const nextPage = () => {
    update(
      data => {
        data.pageNumber = data.pageNumber + 1;
        itemPageLock.set(true);
        itemPageLoading.set(true);
        return data;
      }
    )
  }

  const resetPage = () => {
    itemPageLock.set(true);
    set({...initValues});
  }

  return {
    subscribe,
    nextPage, 
    resetPage,
  }
}

function setItemFormMode() {
  const { subscribe, set } = writable('');

  const onAddMode = () => set(ADD_MODE);
  const onEditMode = () => set(EDIT_MODE);

  return {
    subscribe,
    onAddMode,
    onEditMode,
  }
}

function setItemCategorySelected() {
  const { subscribe, set } = writable(ALL);

  const selectCategory = (_id) => {
    set(_id)
    itemPage.resetPage();
    itemMainLoading.set(true);
  }

  return {
    subscribe,
    selectCategory,
  }
}

function setAuthToken() {
  const defaultValue = '';
  const isLoginToken = browser ? window.localStorage.getItem('loginToken') ?? defaultValue : defaultValue;
  
  const { subscribe, update, set } = writable(isLoginToken);

  const saveAuthToken = (data) => {
    try {
      localStorage.setItem('token', data.token);
      set(data.token);
      return true;
    }
    catch(error) {
      console.log(error);
    }
  }

  const removeAuthToken = () => set('');

  const checkToken = () => {
    const defaultValue = '';
    const isToken = browser ? window.localStorage.getItem('loginToken') ?? defaultValue : defaultValue;
    if(!isToken) set('');
  }

  return {
    subscribe,
    saveAuthToken,
    removeAuthToken,
    checkToken,
  }
}

function setAuth() {
  let initValues = {
    _id: '',
    email: '',
    role: '',
  }

  const { subscribe, set } = writable({...initValues});

  const createAuth = async () => {
    try {
      //const getLoginUser = query(GET_ME);
      const loginUser = await getLoginUser.refetch();

      const _id = loginUser.data.me._id;
      const email = loginUser.data.me.emails[0].address;
      const role = loginUser.data.me.profile.role;

      set({_id, email, role});
      return;
    }
    catch(error) {
      authToken.removeAuthToken();
      set({...initValues});
      return;
    }
  }

  const resetAuth = () => {
    authToken.removeAuthToken();
    set({...initValues});
    return;
  }

  return {
    subscribe,
    createAuth,
    resetAuth,
  }
}

function setIsAdmin() {
  const checkRole = derived(auth, $auth => $auth.role === ADMIN ? true : false);
  return checkRole;
}

function setOrders() {
  const initValues = {
    orderPriceSum: 0,
    orderCount: 0,
    orderItems: []
  }

  const { subscribe, update, set } = writable({...initValues});

  const resetOrder = () => set({...initValues});

  const incrementOrder = (getOrder) => {
    update(
      datas => {
        let orderPriceSum = datas.orderPriceSum;
        let orderCount = datas.orderCount;
        let orderItems = datas.orderItems;

        const duplicateCheckOrderItem = orderItems.find(item => item._id === getOrder._id);

        if(duplicateCheckOrderItem) {
          orderItems = orderItems.map(item => {
            if(item._id === getOrder._id) {
              item.itemPriceSum = item.itemPriceSum + getOrder.itemPrice;
              item.itemCount = item.itemCount + 1;
            }
            return item;
          });
        }
        else {
          const newOrder = {
            _id: getOrder._id,
            itemName: getOrder.itemName,
            itemPrice: getOrder.itemPrice,
            itemPriceSum: getOrder.itemPrice,
            itemCount: 1,
          }
          orderItems = [...orderItems, newOrder];
        }

        orderPriceSum = orderPriceSum + getOrder.itemPrice;
        orderCount = orderCount + 1;

        datas.orderPriceSum = orderPriceSum;
        datas.orderCount = orderCount;
        datas.orderItems = orderItems;

        return datas;
      }
    )
  }

  const decrementOrder = (getOrder) => {
    update(
      datas => {
        let orderPriceSum = datas.orderPriceSum;
        let orderCount = datas.orderCount;
        let orderItems = datas.orderItems;

        orderItems = orderItems.map(item => {
          if(item._id === getOrder._id) {
            item.itemPriceSum = item.itemPriceSum - getOrder.itemPrice;
            item.itemCount = item.itemCount - 1;
          }
          return item;
        })
        .filter(item => item.itemCount !== 0);

        orderPriceSum = orderPriceSum - getOrder.itemPrice;
        orderCount = orderCount - 1;

        datas.orderPriceSum = orderPriceSum;
        datas.orderCount = orderCount;
        datas.orderItems = orderItems;

        return datas;
      }
    )
  }

  return {
    subscribe,
    resetOrder,
    incrementOrder,
    decrementOrder,
  }
}

function setCategoryList () {
  const initValues = {
    list: [{
      categoryId: '',
      categoryName: ''
    }]
  }

  const { subscribe, update, set } = writable();

  const getCategoryList = async () => {
    try {
      const response = await axios.get("/api/user/categories");
      set(response.data.data);
    } catch (error) {
      console.log(error);
    } 
  }
  return {
    subscribe,
    getCategoryList,
    update
  }
}

function setItemList () {
  const initValues = {
    list: [{
      itemId : 0,
      itemName: '',
      itemPrice: 0,
      itemImage: '',
      categoryId: 0
    }]
  }

  const { subscribe, update, set } = writable();

  const getItemList = async () => {
    try {
      let params = {
        page: 0,
        size: 15
      }
      const response = await axios.get("/api/user/items",params);
      set(response.data.data);
    } catch (error) {
      console.log(error);
    } 
  }
  return {
    subscribe,
    getItemList,
    update
  }
}

export const modalActiveCategory = writable(false);
export const modalActiveItem = setModalActiveItem();
export const itemFormValue = setItemFormValue();
export const itemPage = setItemPage();
export const itemPageLock = writable(false);
export const itemFormMode = setItemFormMode();
export const itemCategorySelected = setItemCategorySelected();
export const itemSearch = writable('');
export const authToken = setAuthToken();
export const auth = setAuth();
export const isAdmin = setIsAdmin();
export const orders = setOrders();
export const modalActiveComplateOrder = writable(false);
export const itemMainLoading = writable(false);
export const itemPageLoading = writable(false);
export const categoryList = setCategoryList();
export const itemList = setItemList();