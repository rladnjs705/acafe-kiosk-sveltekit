<script lang="ts">
  export let item:any;
  import { itemFormMode, itemFormValue, modalActiveItem, isAdmin, orders, auth, orderErrors, modalActiveOptionOrder, itemOption } from '$stores';
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
    $itemFormValue.displayYn = item.displayYn;
    $itemFormValue.itemOrder = item.itemOrder;
    

    let params = {
      itemId : item.itemId,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      categoryId: item.categoryId,
      itemImage: item.itemImage,
      displayYn: item.displayYn,
      itemOrder: item.itemOrder,
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
      //카테고리가 커피,티 인 경우
      if(item.categoryId === 1 || item.categoryId === 5){
        modalActiveOptionOrder.set(true);
        item.shot = 0;
        item.light = '200';
        item.coffeeType = '200';
        itemOption.set(item);
      } else{
        orderErrors.resetErrors();
        orders.incrementOrder(item, $auth);
      }
    }
  }

</script>
{#if !isMobile}
  <div class="col mb-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="card ct-shadow-sm menu-item-box" on:click={onClickMenu} >
      <div class="img-box" style="background-image: url({item.itemImage});"></div>
      <div class="card-body">
        <h6 class="card-title">{item.itemName}</h6>
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
        <h6 class="card-title">{item.itemName}</h6>
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