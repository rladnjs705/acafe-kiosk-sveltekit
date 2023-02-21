<script>
  import OrderList from './orderList.svelte';
  import OrderBottom from './orderBottom.svelte';
  import OrderResultList from './orderResultList.svelte';
  import { authToken, auth, isAdmin } from '$stores';
  import { goto } from '$app/navigation';

  const onLogout = async () => {
    try {
      authToken.removeAuthToken();
    } catch (error) {
      console.log(error);
    }
  }

  const goLogin = () => goto('/user/login');
</script>
<aside> <!-- aside start-->
  <div class="side-header">
    <div class="title-box d-flex align-items-center justify-content-between pl-4 pr-4 pt-4">
      <h2>주문내용</h2>
      <span>
        {#if $authToken}
          <a href="#null" on:click={onLogout} ><i class='bx bx-log-out'></i></a>
          {#if $isAdmin}
            <a href="/users"><i class='bx bxs-cog'></i></a>
          {/if}
        {:else}
          <a href="#null" on:click={goLogin} ><i class='bx bx-log-in'></i></a>
        {/if}
      </span>
    </div>
    <div class="info-box d-flex justify-content-between align-items-center pl-4 pr-4">
      {#if $authToken}
        <p>{$auth.email} 로그인중</p>
      {:else}
        <p>상품 이름</p>
      {/if}
      <p>수량</p>
    </div>
  </div>
  <div class="side-content aside-box simplebar mt-auto">
    <!-- orderList start-->
      {#if $isAdmin}
        <OrderResultList />
      {:else}
        <OrderList />
      {/if}
    <!-- orderList end-->
  </div>
  <div class="side-bottom d-flex flex-column justify-content-center align-items-center">
    <!-- order bottom start -->
      {#if !$authToken}
        <OrderBottom />
      {/if}
    <!-- order bottom end -->
  </div>
</aside><!-- end aside -->    