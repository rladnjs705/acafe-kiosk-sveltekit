<script lang="ts">
  import { modalActiveCategory } from '$stores';
  import { categoryList } from '$stores';
  
  categoryList.getCategoryList();
  $: data = $categoryList; 

  const onOpenModalActiveCateogry = () => modalActiveCategory.set(true);
</script>
<!-- category start -->
<div class="header-box-bottom">
  <ul class="d-flex justify-content-start">
    <li>
      <a href="#null" class="d-flex align-items-center" >모두보기</a>
    </li>
    {#if data}
      {#each data.list as category(category.categoryId)}
      <li>
        <a  href="#null" class="d-flex align-items-center ">{category.categoryName}</a>
      </li>  
      {/each}
      {:else}
        <p class="d-flex align-items-center">Loading</p>
    {/if}
    <li>
      <a href="#null" class="d-flex align-items-center add" on:click={onOpenModalActiveCateogry} >+관리</a>
    </li>                                                                                
  </ul>
</div>
<!-- category end --> 