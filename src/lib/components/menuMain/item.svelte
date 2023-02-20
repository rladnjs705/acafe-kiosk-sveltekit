<script lang="ts">
  export let item:any;
  import { itemFormMode, itemFormValue, modalActiveItem, isAdmin, orders } from '$stores';

  const openEditModeActiveItem = () => {
    $itemFormValue.itemId = item.itemId;
    $itemFormValue.itemName = item.itemName;
    $itemFormValue.itemPrice = item.itemPrice;
    $itemFormValue.categoryId = item.categoryId;
    $itemFormValue.itemImage = item.itemImage;
    

    let params = {
      itemId : item.itemId,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      categoryId: item.categoryId,
      itemImage: item.itemImage
    }
    itemFormValue.set(params);
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
  <div class="card ct-shadow-sm menu-item-box" on:click={openEditModeActiveItem} >
    <div class="img-box" style="background-image: url({item.itemImage});"></div>
    <div class="card-body">
      <h5 class="card-title">{item.itemName}</h5>
      <p class="card-text">{item.itemPrice} 원</p>
    </div>
  </div>
</div>