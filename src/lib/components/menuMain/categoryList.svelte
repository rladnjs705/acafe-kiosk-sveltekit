<script lang="ts">
  export let data:any;
</script>
<!-- category start -->
<div class="header-box-bottom">
  <ul class="d-flex justify-content-start">
    <li>
      <a href="#null" class="d-flex align-items-center" >모두보기</a>
    </li>
    {#await data} 
      <p class="d-flex align-items-center">Loading</p>
    {:then data} 
        {#if data.list}
          {#each data.list as category(category.categoryId)}
          <li>
            <a  href="#null" class="d-flex align-items-center ">{category.categoryName}</a>
          </li>  
          {/each}
        {/if}
    {/await}
    <!-- {#if data}
        <li>{data.list[0].categoryName}</li>
    {/if} -->
    <!-- {#each categories.list as category}
      <li>
        {category}
        {category.categoryName}
      </li>
    {/each}
    {#if $categories.loading}
    <li>
      <p class="d-flex align-items-center">Loading</p>
    </li>
    {:else}
      {#each $categories.list as category (category.categoryId)}
        <li>
          <a  href="#null" class="d-flex align-items-center ">{category.categoryName}</a>
        </li>
      {/each}
    {/if} -->
    <li>
      <a href="#null" class="d-flex align-items-center selected" >피자</a>
    </li>      
    <li>
      <a href="#null" class="d-flex align-items-center" >음료</a>
    </li>      
    <li>
      <a href="#null" class="d-flex align-items-center add" >+관리</a>
    </li>                                                                                
  </ul>
</div>
<!-- category end --> 