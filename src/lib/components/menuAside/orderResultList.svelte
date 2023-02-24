<script lang="ts">
  import axios from "axios";
  import { onDestroy } from "svelte";
  let orderList:any[];
  let timeoutId:NodeJS.Timeout;

  getOrders();

  async function getOrders() {
    await axios.get("/api/admin/orders/subscribe")
    .then(data => {
      orderList = data.data;
      timeoutId = setTimeout(getOrders, 2000);
    })
    .catch(error => {
      console.log(error);
      timeoutId = setTimeout(getOrders, 5000);
    });
  }

  const onCheckOrder = async (orderId:any, orderState:any) => {
    const values = {
      orderId : orderId,
      orderState : orderState
    }

    try {
      await axios.post("/api/admin/order/check",values);
      orderList = orderList.filter((order) => order.orderId !== orderId);

    } catch (error){
      console.log(error);
    }
  }

  onDestroy(() => {
    clearTimeout(timeoutId);
  });



</script>
<!-- order results start -->
<ul>
  <!-- order one start -->
  {#if orderList}
    {#each orderList as order}
      <li class="d-flex  flex-column p-4 order-result-list ">
        <div class="d-flex justify-content-between ">
          <ul class="order-inner-list">
            <li class="d-flex justify-content-between date">
              <p class:orderChecked={!order.orderState}>{order.createDate}</p>
              <p class:orderChecked={!order.orderState}>번호:{order.orderNumber}</p>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <p class="btnOrderCheck" on:click={() => onCheckOrder(order.orderId, order.orderState)}>확인</p>
            </li>        
            {#if order.item}
              {#each order.item as item}
                <li class="d-flex justify-content-between ">
                  <p class:orderChecked={!order.orderState}>{item.itemName}</p>
                  <p class:orderChecked={!order.orderState}>{item.itemCount}</p>
                </li>   
                <li class="d-flex justify-content-between ">
                  <!-- <p>가격(개당: {item.itemPrice})</p> -->
                  <!-- <p>{item.itemPriceSum}</p> -->
                </li>                   
              {/each}
            {/if}
            <li class="d-flex justify-content-between total ">
              <p class:orderChecked={!order.orderState}>개수합계</p>
              <p class:orderChecked={!order.orderState}>{order.orderCount}</p>
            </li>                   
            <!-- <li class="d-flex justify-content-between total ">
              <p>가격합계</p>
              <p>{order.orderPriceSum}</p>
            </li>                                  -->
          </ul>
        </div>
      </li>
    {/each}
  <!-- order one end -->                                                                                     
    {:else}
    <li class="d-flex  flex-column p-4 order-result-list"><p>Loading...</p></li>
  {/if}
</ul> 
<!-- order results end-->

<style>
  .orderChecked {
    text-decoration-line: line-through underLine;
  }
  .btnOrderCheck {
    cursor: pointer;
  }
</style>