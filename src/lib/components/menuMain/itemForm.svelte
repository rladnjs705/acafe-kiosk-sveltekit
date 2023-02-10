<script>
  import Modal from "../common/modal.svelte";
  import { modalActiveItem, itemFormValue, categoryList } from '$stores';
  import { itemValidateSchema } from '$utils/validates';
  import Swal from 'sweetalert2';
  import axios from 'axios';

  categoryList.getCategoryList();

  const onAddItem = async () => {
    $itemFormValue.itemPrice = Number($itemFormValue.itemPrice);
    try {
      await itemValidateSchema.validate($itemFormValue, {abortEarly: false});
      console.log($itemFormValue);
      try {
        const response = await axios.post("/api/admin/item/create", $itemFormValue);
        if(response.status == 200){
          clearItemForm();
          Swal.fire({
            icon: 'success',
            text: "메뉴가 추가되었습니다."
          });
        }else{
          Swal.fire({
            icon: 'error',
            text: response.data.resultMsg
          });
        }
      } catch(error) {
        clearItemForm();
        console.log(error)
        Swal.fire({
            icon: 'error',
            text: error.response.data.resultMsg
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clearItemForm = () => {
    itemFormValue.resetForm();
    modalActiveItem.closeModal();
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
      <input type="text" class="form-control" id="recipient-name" bind:value={$itemFormValue.itemName}>
      <!-- <div class="invalid-feedback was-validated">이름을 입력해 주세요.</div> -->
    </div>
    <div class="mb-3">
      <label for="recipient-name" class="col-form-label">메뉴 카테고리:</label>
      <select name="menu-cateogry-select" class="form-select" bind:value={$itemFormValue.categoryId}>
        <option value=''>카테고리 선택</option>
        {#each $categoryList.list as category(category.categoryId)}
          <option value={category.categoryId}>{category.categoryName}</option>
        {/each}
      </select>
    </div>            
    <div class="mb-3">
      <label for="message-text" class="col-form-label">메뉴 가격:</label>
      <input type="text" class="form-control" id="recipient-name" bind:value={$itemFormValue.itemPrice}>
    </div>
    <div class="mb-3">
      <label for="message-text" class="col-form-label">메뉴 이미지:</label>
      <input type="file" class="form-control" id="recipient-name" bind:value={$itemFormValue.itemImage}>
    </div>
    <div class="mb-3">
      <img src="/images/food_img/KjdgrhOok.png" class="card-img-top" alt="">
    </div>              
  </div>
  <!-- slot modal-body end -->      
  
  <!-- slot modal-footer start -->          
  <div class="modal-footer d-flex flex-column align-items-stretch" slot="modal-footer">
    <button type="button" class="btn btn-primary pt-3 pb-3" on:click={onAddItem}>메뉴 추가</button>
  </div>
  <!-- slot modal-footer end -->          
</Modal>