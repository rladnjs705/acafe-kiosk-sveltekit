<script lang="ts">
  import { itemSearch, itemPage, itemList, itemPageLock, itemMainLoading } from "$stores";
  import { onMount } from "svelte";

  let isMobile = false;

  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  })

  function checkMobile() {
    isMobile = window.innerWidth < 600;
  }

  let itemSearchForm:any;

  const onSearch = (e:any) => {
    const keyCode = e.keyCode;

    if(keyCode === 13) {
      itemMainLoading.set(true);
      itemSearch.set(itemSearchForm);
      itemList.getItemList($itemPage, $itemSearch);
      itemPage.resetPage();
      itemPageLock.set(false);
    }
  }
</script>
<!-- search start-->
{#if !isMobile}
  <div class="header-box-top d-flex " >
    <h1>아카페</h1>
    <input type="text" class="form-control txt-search-menu border-line" placeholder="원하는 메뉴 이름을 입력해주세요." bind:value={itemSearchForm} on:keydown={onSearch}>
  </div>
  {:else}
  <div class="header-box-top d-flex mobile-header-box-top" >
    <h1>아카페</h1>
    <input type="text" class="form-control txt-search-menu border-line" placeholder="원하는 메뉴 이름을 입력해주세요." bind:value={itemSearchForm} on:keydown={onSearch}>
  </div>
{/if}
<!-- search end-->

<style lang="scss">
  .mobile-header-box-top {
      height: 7vh;
      padding-top: 20px;
      padding-left: 15px;
      /* padding-right: 30px; */
      padding-bottom: 0;
      align-items: center;
  }

  .mobile-header-box-top .form-control {
      margin-left: 5px;
  }
</style>