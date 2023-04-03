<script lang="ts">
  import Modal from "../common/modal.svelte";
  import { modalActiveItem, itemFormValue, itemFormMode, categoryList, itemList } from '$stores';
  import { extractErrors, itemValidateSchema } from '$utils/validates';
  import { ADD_MODE, EDIT_MODE } from "$utils/constans";
  import Swal from 'sweetalert2';
  import axios from 'axios';

  let errors:any = {};

  $: {
    if($itemFormMode === ADD_MODE) {
      itemFormValue.resetForm();
      errors = {};
    };

    if($itemFormMode === EDIT_MODE) errors = {};

    if(!$modalActiveItem){
      clearItemForm();
    }
  }

  const onAddItem = async () => {
    $itemFormValue.itemPrice = Number($itemFormValue.itemPrice);
    try {
      await itemValidateSchema.validate($itemFormValue, {abortEarly: false});
      const response = await axios.post("/api/admin/item/create", $itemFormValue);
      if(response.status == 200){
        clearItemForm();
        itemList.update(items => {
          if(items.list.length >= 10){
            items.list = [response.data.data.item, ...items.list.slice(0,-1)];
          }else{
            items.list = [response.data.data.item, ...items.list];
          }
          return items;
        });
        Swal.fire({
          icon: 'success',
          text: "제품이 추가되었습니다."
        });
      }else{
        Swal.fire({
          icon: 'error',
          text: response.data.resultMsg
        });
      }
    } catch (error) {
      errors = extractErrors(error);
    }
  }

  const onUpdateItem = async () => {
    $itemFormValue.itemPrice = Number($itemFormValue.itemPrice);
    const itemId = $itemFormValue.itemId;
    try {
      await itemValidateSchema.validate($itemFormValue, {abortEarly: false});
      const response = await axios.put("/api/admin/item/update", $itemFormValue);
      if(response.status == 200){
        clearItemForm();
        itemList.update(items => {
          const index = items.list.findIndex((i:any)=> i.itemId === itemId);
          items.list = [
            ...items.list.slice(0, index),
            response.data.data.item,
            ...items.list.slice(index+1)
          ]
          return items;
        })
        Swal.fire({
          icon: 'success',
          text: "제품이 수정되었습니다."
        });
      }else{
        Swal.fire({
          icon: 'error',
          text: response.data.resultMsg
        });
      }
      clearItemForm();
    } catch (error) {
      errors = extractErrors(error);
    }
  }

  const onDeleteItem = async () => {
    const result = await sweetConfirm('해당 제품을 삭제하겠습니까?');
    if(result.value) {
      const itemId = $itemFormValue.itemId;
      try {
        await itemValidateSchema.validate($itemFormValue, {abortEarly: false});
        const response = await axios.delete("/api/admin/item/delete/"+ itemId);
        if(response.status == 200){
          clearItemForm();  
          itemList.update(items => {
            items.list = items.list.filter((i:any)=> i.itemId !== itemId);
            return items;
          })
          Swal.fire({
            icon: 'success',
            text: "제품이 삭제되었습니다."
          });
        }else{
          Swal.fire({
            icon: 'error',
            text: response.data.resultMsg
          });
        }
      } catch (error) {
        errors = extractErrors(error);
      }
    }
  }

  const onUploadFile = async (e:any) => {
    const { files } = e.target;
    
    try {
      if(!files || files.length === 0){
        Swal.fire({
            icon: 'error',
            text: "선택된 파일이 없습니다."
          });
        return;
      }

      const file = files[0];

      // Check file extension
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        Swal.fire({
            icon: 'error',
            text: "이미지 파일만 업로드 가능합니다."
        });
        return;
      }

      // Check file size (in bytes)
      const allowedSize = 31457280; // 30MB
      if (file.size > allowedSize) {
        Swal.fire({
            icon: 'error',
            text: "파일 크기가 큽니다. 30Mb아래로 업로드 해주세요."
        });
        return;
      }

      const formData = new FormData();
      const upload = formData.append('file', files[0]);
      const response =  await axios.post('/api/admin/upload/files', formData, {
        headers: {
           'Content-Type': 'multipart/form-data'
         }
      });
      console.log(response);
      if(response.status == 200){
        $itemFormValue.itemImage = response.data.data.link;
        $itemFormValue.itemImage += "?format=webp&width=225&height=225";
        return upload;
      }

    } catch (error) {
      errors = extractErrors(error);
    }
  }

  const sweetConfirm = async (msg:string) => {
    return Swal.fire({
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    });
  }

  const clearItemForm = () => {
    errors = {};
    itemFormValue.resetForm();
    modalActiveItem.closeModal();
  }

  function handleSwitchChange(event:any) {
    $itemFormValue.displayYn = event.target.checked ? 'Y' : 'N';
  }


  //숫자만입력
  function handleInput(event:any) {
    $itemFormValue.itemOrder = event.target.value.replace(/\D/g,'');
  }

</script>

<Modal bind:modalActive={$modalActiveItem}>
  <!-- slot modal-header start -->
  <h4 slot="modal-title">메뉴 추가</h4>
  <!-- slot modal-header end -->

  <!-- slot modal-body start -->          
  <div class="modal-body" slot="modal-body">
    <div class="mb-3 ">
      <label for="recipient-name" class="col-form-label">메뉴 이름:</label>
      <input type="text" class="form-control" id="recipient-name" bind:value={$itemFormValue.itemName} class:inputError={errors.itemName}>
      {#if errors.itemName}
        <div class="invalid-feedback was-validated">{errors.itemName}</div>
      {/if}
    </div>
    <div class="mb-3">
      <label for="menuCategory" class="col-form-label">메뉴 카테고리:</label>
      <select id="menuCategory" name="menuCategory" class="form-select" bind:value={$itemFormValue.categoryId} class:inputError={errors.categoryId}>
        <option value="">카테고리 선택</option>
        {#each $categoryList.list as category(category.categoryId)}
          <option value={category.categoryId}>{category.categoryName}</option>
        {/each}
      </select>
      {#if errors.categoryId}
        <div class="invalid-feedback was-validated">{errors.categoryId}</div>
      {/if}
    </div>            
    <!-- <div class="mb-3">
      <label for="itemPrice" class="col-form-label">메뉴 가격:</label>
      <input type="text" class="form-control" id="itemPrice" bind:value={$itemFormValue.itemPrice} class:inputError={errors.itemPrice}>
      {#if errors.itemPrice}
        <div class="invalid-feedback was-validated">{errors.itemPrice}</div>
      {/if}
    </div> -->
    <!-- <div class="mb-3">
      <label for="itemPrice" class="col-form-label">메뉴 옵션:</label>
      <input type="text" class="form-control" id="itemPrice" bind:value={$itemFormValue.itemPrice} class:inputError={errors.itemPrice}>
      {#if errors.itemPrice}
        <div class="invalid-feedback was-validated">{errors.itemPrice}</div>
      {/if}
    </div> -->
    <div class="mb-3">
      <label for="itemOrder" class="col-form-label">메뉴 순서:</label>
      <input type="text" class="form-control" id="itemOrder" bind:value={$itemFormValue.itemOrder} on:input|preventDefault={handleInput} on:keydown={handleInput} class:inputError={errors.itemOrder} maxlength="3">
      {#if errors.itemOrder}
        <div class="invalid-feedback was-validated">{errors.itemOrder}</div>
      {/if}
    </div>
    <div class="mb-3">
      <label for="itemImage" class="col-form-label">메뉴 이미지:</label>
      <input type="file" class="form-control" id="itemImage" on:change={onUploadFile} class:inputError={errors.itemImage} accept="image/*">
      {#if errors.itemImage}
        <div class="invalid-feedback was-validated">{errors.itemImage}</div>
      {/if}
    </div>
    {#if $itemFormValue.itemImage}
      <div class="mb-3">
        <img src={$itemFormValue.itemImage} class="card-img-top" alt="">
      </div>              
      <!-- {:else}
        <div class="mb-3">
          <img src="/images/noImage.jpg" class="card-img-top" alt="">
        </div>  -->
    {/if}
    <div class="mb-3">
      <label class="col-form-label" for="displayYn">메뉴 노출여부:</label>
      <div class="form-check form-switch">
        <input class="form-check-input form-control" style="width:4em; height:1.8em" type="checkbox" id="displayYn" checked={$itemFormValue.displayYn === 'Y'} on:change={handleSwitchChange}>
      </div>
      {#if errors.displayYn}
        <div class="invalid-feedback was-validated">{errors.displayYn}</div>
      {/if}
    </div>
    
  </div>
  <!-- slot modal-body end -->      
  
  <!-- slot modal-footer start -->          
  <div class="modal-footer d-flex flex-column align-items-stretch" slot="modal-footer">
    {#if $itemFormMode == ADD_MODE}
      <button type="button" class="btn btn-primary pt-3 pb-3" on:click={onAddItem}>메뉴 추가</button>
    {:else if $itemFormMode == EDIT_MODE}
      <div class="row item-bottom">
        <div class="col">
          <button type="button" class="btn btn-primary pt-3 pb-3" on:click={onUpdateItem}>메뉴 수정</button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-danger pt-3 pb-3" on:click={onDeleteItem}>메뉴 삭제</button>
        </div>
      </div>
    {/if}
  </div>
  <!-- slot modal-footer end -->          
</Modal>