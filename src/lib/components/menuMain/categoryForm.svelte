<script lang="ts">
  import Modal from '../common/modal.svelte';
  import { modalActiveCategory, categoryList } from '$stores';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { categoryValidateSchema } from '$utils/validates';
  
  categoryList.getCategoryList();
  $: categories = $categoryList;

  let addValues = {
    categoryName: ''
  }

  let updateValues = {
    categoryId: '',
    categoryName: '',
  }

  const onAddCategory = async () => {
    try {
      const response = await axios.post("/api/admin/category/create", addValues);
      if(response.status == 200){
        clearCategoryForm();
        Swal.fire({
          icon: 'success',
          text: "카테고리가 생성되었습니다."
        });
      }else{
        Swal.fire({
          icon: 'error',
          text: response.data.resultMsg
        });
      }
      
    } catch(error) {
      clearCategoryForm();
      console.log(error)
      Swal.fire({
          icon: 'error',
          text: error.response.data.resultMsg
      });
    }
  }

  const onDeleteCategory = async(_id:any) => {
    const result = await sweetConfirm('해당 카테고리를 삭제하겠습니까?');
    if(result.value){
      try {
        const response = await axios.delete("/api/admin/category/delete/"+_id);
        console.log(response);
        if(response.status == 200){      
          clearCategoryForm();
          Swal.fire({
            icon: 'success',
            text: "카테고리가 삭제되었습니다."
          });
        }else{
          Swal.fire({
            icon: 'error',
            text: response.data.resultMsg
          });
        } 
      } catch (error) {
        clearCategoryForm();
        console.log(error)
        Swal.fire({
            icon: 'error',
            text: error.response.data.resultMsg
        });
      }
    }
  }

  const onEditMode = (category:any) => {
    updateValues.categoryId = category.categoryId;
    updateValues.categoryName = category.categoryName;
  }

  const onSubmitUpdateCategory = async () => {
    try {
      await categoryValidateSchema.validate(updateValues, {abortEarly: false});
      onUpdateCategory();
    }
    catch(error) {
      // alert(error.message);
      //notyf.error(error.message);
    }
  }

  const onUpdateCategory = async () => {
    try {
      try {
        const response = await axios.put("/api/admin/category/update", updateValues);
        console.log(response);
        if(response.status == 200){      
          clearCategoryForm();
        }else{
          Swal.fire({
            icon: 'error',
            text: response.data.resultMsg
          });
        } 
      } catch (error) {
        clearCategoryForm();
        console.log(error)
        Swal.fire({
            icon: 'error',
            text: error.response.data.resultMsg
        });
      }
    }
    catch(error) {
      console.log(`update category error: ${error.message}`)
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

  const clearCategoryForm = () => {
    categoryList.getCategoryList();
    addValues.categoryName = '';
    updateValues.categoryId = '';
    updateValues.categoryName = '';
  }


</script>
<Modal bind:modalActive={$modalActiveCategory}>
  <!-- slot modal-header start -->
  <h4 slot="modal-title">메뉴 추가</h4>
  <!-- slot modal-header end -->

  <!-- slot modal-body start -->
  <div class="modal-body" slot="modal-body">
    <h5 class="mb-3">카테고리 목록</h5>
    
    <ul class="category-list">
      {#if categories}
        {#each categories.list as category(category.categoryId)}
          {#if updateValues.categoryId !== category.categoryId}
            <li class="mb-3 d-flex justify-content-between">
              <p>{category.categoryName}</p>
              <div class="edit-box">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a href="#null" class="link"><i class='bx bxs-pencil' on:click={() => onEditMode(category)}></i></a>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a href="#null" class="link"><i class='bx bxs-trash' on:click={() => onDeleteCategory(category.categoryId)}></i></a>
              </div>              
            </li>
            {:else}
              <li class="mb-3 d-flex justify-content-between">
                <input type="text" class="form-control border-line" bind:value={updateValues.categoryName} on:focusout={onSubmitUpdateCategory}>
              </li>
          {/if}
        {/each}
        {:else}
        <li><p>Loading</p></li>
      {/if}           
    </ul>

  </div>
  <!-- slot modal-body end -->

  <!-- slot modal-footer start -->
  <div class="modal-footer d-flex flex-column align-items-stretch" slot="modal-footer">
    <div class="input-group">
      <input type="text" class="form-control border-line" bind:value={addValues.categoryName}>
      <button class="btn btn-primary" on:click={onAddCategory}>등록</button>
    </div>
  </div>     
  <!-- slot modal-footer end -->
</Modal>