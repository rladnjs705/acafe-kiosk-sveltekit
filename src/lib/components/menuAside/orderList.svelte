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
    {#each orderList as item }
      <li class="d-flex p-4 align-items-center">
        <div class="order-title-box d-flex flex-column justify-content-between ">
          <h4>
            {#if item.coffeeType === '100'}
              ( HOT )
            {:else if item.coffeeType === '200'}
              ( ICE )
            {/if}
            {item.itemName} 
          </h4>
          <!-- <p class="price-sum">{item.itemPriceSum}</p> -->
          {#if item.shot > 0}
            <p>- 샷 추가 : {item.shot}</p>
          {/if}
          {#if item.light === '100'}
              <p>- 농도 : 연하게</p>
          {:else if item.light === '200'}
              <p>- 농도 : 보통</p>
          {:else if item.light === '300'}
              <p>- 농도 : 진하게</p>
          {/if}
        </div>
        <div class="order-btn-box d-flex justify-content-end ">
          <button class="btn btn-ui ml-1" on:click={() => onDecrementOrder(item)}><i class='bx bx-minus'></i></button>
          <input type="text" class="form-control border-line" bind:value={item.itemCount} maxlength="2" readonly>
          <button class="btn btn-ui mr-1" on:click={() => onIncrementOrder(item)}><i class='bx bx-plus' ></i></button>
        </div>
      </li>
    {/each}
</ul>