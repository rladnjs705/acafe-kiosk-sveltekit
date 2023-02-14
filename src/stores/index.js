// @ts-nocheck
import { writable, derived } from 'svelte/store';
import { ADD_MODE, EDIT_MODE, ALL, ADMIN } from '$utils/constans';
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
    itemId: '',
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
    pageNumber: 0
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
  const isLoginToken = browser ? window.localStorage.getItem('token') ?? defaultValue : defaultValue;
  
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
    const isToken = browser ? window.localStorage.getItem('token') ?? defaultValue : defaultValue;
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

  let data = { 
    params: {
      authToken : ''
    }
  }

  const { subscribe, set } = writable({...initValues});

  const createAuth = async () => {
    try {
      //const getLoginUser = query(GET_ME);
      //const loginUser = await getLoginUser.refetch();
      const defaultValue = '';
      const isLoginToken = browser ? window.localStorage.getItem('token') ?? defaultValue : defaultValue;
      data.params.authToken = isLoginToken;
      const response = await axios.get("/api/user/login/info",data);
      const userInfo = response.data.data;
      const _id = userInfo.id;
      const email = userInfo.email;
      const role = userInfo.role;

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
  // const initValues = {
  //   list: [{
  //     itemId : 0,
  //     itemName: '',
  //     itemPrice: 0,
  //     itemImage: '',
  //     categoryId: 0
  //   }]
  // }
    let params = {
      page: 0,
      size: 10,
      itemName:'',
      categoryId:0,
    }

  const { subscribe, update, set } = writable();

  const getItemList = async (pageNumber, name, categoryId) => {
    try {
      if(name != '' && name != null){
        params.itemName = name;
      } else{
        params.itemName = '';
      }

      if(pageNumber > 0){
        itemPageLock.set(true);
        params.page = pageNumber;
      }else{
        params.page = 0
      }

      if(categoryId > 0 && categoryId != null){
        params.categoryId = categoryId
      } else{
        params.categoryId = 0;
      }
      const response = await axios.get("/api/user/items", {params});
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