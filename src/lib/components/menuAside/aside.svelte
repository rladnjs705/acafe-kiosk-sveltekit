<script lang="ts">
  import OrderList from './orderList.svelte';
  import OrderBottom from './orderBottom.svelte';
  import OrderResultList from './orderResultList.svelte';
  import OrderOption from './orderOption.svelte';
  import { authToken, auth, isAdmin, orders, itemCategorySelected } from '$stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

	let isMobile = false;

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
	})

	function checkMobile() {
 		isMobile = window.innerWidth < 600;
	}

  const onLogout = async () => {
    try {
      auth.resetAuth();
      orders.resetOrder();
      itemCategorySelected.resetCategory();
      goto("/")
    } catch (error) {
      console.log(error);
    }
  }

  const goLogin = () => goto('/user/login');
</script>
<aside style={isMobile ? "width:100%;height:50vh" : ""}> <!-- aside start-->
  <div class="side-header" style={isMobile ? "height:8vh" : ""}>
    <div class="title-box d-flex align-items-center justify-content-between pl-4 pr-4 pt-4">
      {#if isMobile}
        <h4>주문내용</h4>
        <div class="info-box d-flex justify-content-between align-items-center pl-4 pr-4">
          <h6>{$auth.nickName} 로그인중</h6>
        </div>
        {:else}
        <h2>주문내용</h2>
      {/if}
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
    {#if !isMobile}
    <div class="info-box d-flex justify-content-between align-items-center pl-4 pr-4">
      {#if $authToken}
        <p>상품 이름</p>
        <p>{$auth.nickName} 로그인중</p>
      {/if}
    </div>
    {/if}
  </div>
  <div class={$isAdmin ? isMobile ? "side-content-admin-m aside-box simplebar mt-auto" : "side-content-admin aside-box simplebar mt-auto" : isMobile ? "side-content-m aside-box simplebar mt-auto" : "side-content aside-box simplebar mt-auto"}>
    <!-- orderList start-->
      {#if $isAdmin}
        <OrderResultList />
      {:else}
        <OrderList/>
      {/if}
    <!-- orderList end-->
  </div>
  <div class={$isAdmin ? "side-bottom-admin d-flex flex-column justify-content-center align-items-center" : "side-bottom d-flex flex-column justify-content-center align-items-center"}>
    <!-- order bottom start -->
      {#if !$isAdmin}
        <OrderBottom />
      {/if}
    <!-- order bottom end -->
  </div>
</aside><!-- end aside -->    

<OrderOption />