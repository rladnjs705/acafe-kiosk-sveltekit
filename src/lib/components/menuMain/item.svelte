<script lang="ts">
  export let item:any;
  import { itemFormMode, itemFormValue, modalActiveItem, isAdmin, orders } from '$stores';

  const openEditModeActiveItem = () => {
    $itemFormValue._id = item._id;
    $itemFormValue.itemName = item.itemName;
    $itemFormValue.itemPrice = item.itemPrice;
    $itemFormValue.categoryId = item.itemCategoryId;
    $itemFormValue.itemImage = item.itemImage;

    itemFormMode.onEditMode();
    modalActiveItem.openModal();
  }

  const onClickMenu = () => {
    if($isAdmin) {
      openEditModeActiveItem();
    }
    else {
      orders.incrementOrder(item);
    }
  }

</script>
<div class="col mb-2">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="card ct-shadow-sm menu-item-box" on:click={onClickMenu} >
    <div class="img-box" style="background-image: url(http://localhost:3000/{item.itemImage});"></div>
    <div class="card-body">
      <h5 class="card-title">{item.itemName}</h5>
      <p class="card-text">{item.itemPrice} 원</p>
    </div>
  </div>
</div>