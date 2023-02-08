<script lang="ts">

  import CategoryForm from './categoryForm.svelte';
  import CategoryList from './categoryList.svelte';
  import ItemSearch from './itemSearch.svelte';
  import ItemList from './itemList.svelte';
  import ItemForm from './itemForm.svelte';
    import type { PageData } from '../../../routes/$types';

  export let data:PageData;
</script>

<main><!-- main start -->
  <div class="content d-flex flex-column container-fluid">
    <div class="main-header-section d-flex flex-column ">
      <ItemSearch />
      <CategoryList data={data} />
      <!-- <CategoryForm /> -->
    </div><!-- main-header-section -->

    <div class="main-content-section simplebar">
      <ItemList />
      <!-- <ItemForm /> -->
    </div><!-- end main-content-section -->
  </div>
</main><!-- main end -->