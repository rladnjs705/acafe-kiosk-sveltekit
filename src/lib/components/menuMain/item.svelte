<script lang="ts">
  export let item:any;
  import { itemFormMode, itemFormValue, modalActiveItem, isAdmin, orders, auth, orderErrors } from '$stores';
  import { onMount } from "svelte";

  let isMobile = false;

  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  })

  function checkMobile() {
    isMobile = window.innerWidth < 600;
  }

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
      orderErrors.resetErrors();
      orders.incrementOrder(item, $auth);
    }
  }

</script>
{#if !isMobile}
  <div class="col mb-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="card ct-shadow-sm menu-item-box" on:click={onClickMenu} >
      <div class="img-box" style="background-image: url({item.itemImage});"></div>
      <div class="card-body">
        <h5 class="card-title">{item.itemName}</h5>
        <!-- <p class="card-text">{item.itemPrice} 원</p> -->
      </div>
    </div>
  </div>
  {:else}
  <div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="card ct-shadow-sm menu-item-box" on:click={onClickMenu} >
      <div class="img-box" style="background-image: url({item.itemImage});"></div>
      <div class="card-body">
        <h6>{item.itemName}</h6>
        <!-- <p class="card-text">{item.itemPrice} 원</p> -->
      </div>
    </div>
  </div>
{/if}

<style>
  .card-body { 
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>