<script lang="ts">
  import axios from "axios";
  let orderList:any[];

  getOrdersStream();

  async function getOrdersStream() {
    await axios.get("/api/admin/orders/stream")
    .then(data => {
      orderList = data.data.data.list;
      getOrders();
    })
    .catch(error => {
      console.log(error);
    });
  }

  async function getOrders() {
    await axios.get("/api/admin/orders/subscribe")
    .then(data => {
      orderList = data.data;
      getOrders();
    })
    .catch(error => {
      console.log(error);
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

</script>
<!-- order results start -->
<ul>
  <!-- order one start -->
  {#if orderList }
    {#each orderList.reverse() as order}
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
                <li class="d-flex justify-content-between mt-2">
                  <p class:orderChecked={!order.orderState}>
                    {#if item.coffeeType === '100'}
                      ( <span style="color: red;">HOT</span> )
                    {:else if item.coffeeType === '200'}
                      ( <span style="color: blue;">ICE</span> )
                    {/if}
                    {item.itemName}
                  </p>
                  <p class:orderChecked={!order.orderState}><span style="font-weight: 600;">{item.itemCount}</span></p>
                </li>   
                <li>
                  <div class="mt-2">
                    {#if item.shot > 0}
                      <p>- 샷 추가 : <span style="font-weight: 600;">{item.shot}</span></p>
                    {/if}
                  </div>
                  <div class="my-2 mb-3">
                    {#if item.light === '100'}
                      <p style="color: gray; font-weight: 500;">- 농도 : 연하게</p>
                    {:else if item.light === '200'}
                      <!-- <p>- 농도 : 보통</p> -->
                    {:else if item.light === '300'}
                      <p style="color: brown; font-weight: 500;">- 농도 : 진하게</p>
                    {/if}
                  </div>
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