<script lang="ts">
  import { orders, orderStream, orderErrors } from '$stores';
  import axios from 'axios';
  import { extractErrors, orderValidateSchema } from '$utils/validates';
  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';
  import Swal from 'sweetalert2';
  
  const notyf = new Notyf({
    duration: 5000,
    position: {
      x: 'right',
      y: 'top',
    }
  });

  let errors:any;

  $: errors = $orderErrors;
  const onSubmitAddOrder = async () => {
    try {
      //검증로직
      await orderValidateSchema.validate($orders, {abortEarly: false});
      onAddOrder();
    } catch (error) {
      orderErrors.set(extractErrors(error));
    }
  }

  const onAddOrder = async () => {
    try {
      //주문하기로직
      const response = await axios.post("/api/user/order/create", $orders);
      if(response.status == 200){
        orders.resetOrder();
        notyf.success(`주문이 완료 되었습니다.`);
        Swal.fire({
          icon: 'success',
          text: "대기번호 : " + response.data.data.order.orderNumber,
          timer: 15000, // 15초 후 자동으로 닫힘
          timerProgressBar: true, // 타이머 진행 바 보이기
//          showConfirmButton: false // 확인 버튼 숨기기
          customClass: {
              title: 'order-swal-title',
              htmlContainer: 'order-swal-html-container',
            },
        });
        orderStream.getOrderList();
      }
    } catch (error) {
      console.log(error)
    }
  }

</script>
<div class="side-bottom-header d-flex align-items-center justify-content-center">
  <p>
    <span class="total-count">{$orders.orderCount}</span>개 선택
    <!-- <span class="total-price">{$orders.orderPriceSum}</span>원 선택 -->
  </p>
</div>
{#if errors}
  <div class="side-bottom-header d-flex align-items-center justify-content-center">
    <p>
      <span class="invalid-feedback was-validated">{errors.orderCount}</span>
    </p>
  </div>
{/if}
<div class="side-bottom-button-box d-flex flex-column pl-4 pr-4 pb-4 " >
  <button class="btn btn-primary h-100" on:click={onSubmitAddOrder}>주문하기</button>
</div>