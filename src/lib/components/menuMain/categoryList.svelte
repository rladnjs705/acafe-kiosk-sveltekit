<script lang="ts">
  import { modalActiveCategory, categoryList, itemCategorySelected, itemList, itemPageLock, isAdmin, itemMainLoading } from '$stores';
  import { ALL } from '$utils/constans';
  import { onMount } from "svelte";

  let isMobile = false;

  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  })

  function checkMobile() {
    isMobile = window.innerWidth < 600;
  }

  $: data = $categoryList; 

  const onOpenModalActiveCateogry = () => modalActiveCategory.set(true);
  const onSelectCategory = (_id:any) => {
    if(!$itemMainLoading){
        itemCategorySelected.selectCategory(_id);
        itemList.getItemList(0, '', _id);
        itemPageLock.set(false);
        itemMainLoading.set(false);
      }
    };
</script>
{#if !isMobile}
<div class="header-box-bottom">
  <ul class="d-flex justify-content-start">
    <li>
      {#if $itemCategorySelected === ALL}
        <a href="#null" class="d-flex align-items-center" class:selected={$itemCategorySelected===ALL} >모두보기</a>
      {:else}
        <a href="#null" class="d-flex align-items-center" class:disableClick={$itemMainLoading} on:click={() => onSelectCategory(ALL)} >모두보기</a>
      {/if}
    </li>
    {#if data}
      {#each data.list as category(category.categoryId)}
      <li>
        {#if $itemCategorySelected===category.categoryId}
          <a  href="#null" class="d-flex align-items-center" class:selected={$itemCategorySelected===category.categoryId}>{category.categoryName}</a>
        {:else}
          <a  href="#null" class="d-flex align-items-center" class:disableClick={$itemMainLoading} on:click={() => onSelectCategory(category.categoryId)}>{category.categoryName}</a>
        {/if}
      </li>  
      {/each}
      {:else}
        <p class="d-flex align-items-center">Loading</p>
    {/if}

    {#if $isAdmin}
      <li>
        <a href="#null" class="d-flex align-items-center add" on:click={onOpenModalActiveCateogry} >+관리</a>
      </li>         
    {/if}                                                                       
  </ul>
</div>
  {:else}
<div class="header-box-bottom mobile">
  <ul class="d-flex justify-content-start">
    <li>
      {#if $itemCategorySelected === ALL}
        <a href="#null" class="d-flex align-items-center" class:selected={$itemCategorySelected===ALL} >모두보기</a>
      {:else}
        <a href="#null" class="d-flex align-items-center" class:disableClick={$itemMainLoading} on:click={() => onSelectCategory(ALL)} >모두보기</a>
      {/if}
    </li>
    {#if data}
      {#each data.list as category(category.categoryId)}
      <li>
        {#if $itemCategorySelected===category.categoryId}
          <a  href="#null" class="d-flex align-items-center" class:selected={$itemCategorySelected===category.categoryId}>{category.categoryName}</a>
        {:else}
          <a  href="#null" class="d-flex align-items-center" class:disableClick={$itemMainLoading} on:click={() => onSelectCategory(category.categoryId)}>{category.categoryName}</a>
        {/if}
      </li>  
      {/each}
      {:else}
        <p class="d-flex align-items-center">Loading</p>
    {/if}

    {#if $isAdmin}
      <li>
        <a href="#null" class="d-flex align-items-center add" on:click={onOpenModalActiveCateogry} >+관리</a>
      </li>         
    {/if}                                                                       
  </ul>
</div>
{/if}

<style lang="scss">
  .main-header-section .mobile ul li a {
      height: 50px;
      padding: 0 10px;
      font-size: 1rem;
      text-decoration: none;
      color: #222222;
  }
</style>