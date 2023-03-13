<script lang="ts">
  import { auth, orders } from "$stores";

  $:orderList = $orders.orderItems;

  const onIncrementOrder = (item:any) => {
    orders.incrementOrder(item, $auth);
  }

  const onDecrementOrder = (item:any) => {
    orders.decrementOrder(item);
  }
</script>
<ul>
  {#each orderList as item (item.itemId) }
    <li class="d-flex p-4 align-items-center">
      <div class="order-title-box d-flex flex-column justify-content-between ">
        <h4>{item.itemName}</h4>
        <!-- <p class="price-sum">{item.itemPriceSum}</p> -->
      </div>
      <div class="order-btn-box d-flex justify-content-end ">
        <button class="btn btn-ui ml-1" on:click={() => onDecrementOrder(item)}><i class='bx bx-minus'></i></button>
        <input type="text" class="form-control border-line" bind:value={item.itemCount} maxlength="2" readonly>
        <button class="btn btn-ui mr-1" on:click={() => onIncrementOrder(item)}><i class='bx bx-plus' ></i></button>
      </div>
    </li>
  {/each}
</ul>