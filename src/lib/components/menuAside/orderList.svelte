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
              ( <span style="color:red;">HOT</span> )
            {:else if item.coffeeType === '200'}
              ( <span style="color:blue;">ICE</span> )
            {/if}
            {item.itemName} 
          </h4>
          <!-- <p class="price-sum">{item.itemPriceSum}</p> -->
            <div class="mt-2">
              {#if item.shot > 0}
                <p>- 샷 추가 : <span style="font-weight: 600;">{item.shot}</span></p>
              {/if}
            </div>
            <div class="my-2 mb-3">
              {#if item.light === '100'}
                <p style="color: gray; font-weight: 600;">- 농도 : 연하게</p>
              {:else if item.light === '300'}
                <p style="color: brown; font-weight: 600;">- 농도 : 진하게</p>
              {/if}
            </div>
            <!-- <p>가격(개당: {item.itemPrice})</p> -->
            <!-- <p>{item.itemPriceSum}</p> -->
        </div>
        <div class="order-btn-box d-flex justify-content-end ">
          <button class="btn btn-ui ml-1" on:click={() => onDecrementOrder(item)}><i class='bx bx-minus'></i></button>
          <input type="text" class="form-control border-line" bind:value={item.itemCount} maxlength="2" readonly>
          <button class="btn btn-ui mr-1" on:click={() => onIncrementOrder(item)}><i class='bx bx-plus' ></i></button>
        </div>
      </li>
    {/each}
</ul>