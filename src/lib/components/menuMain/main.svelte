<script lang="ts">
  import CategoryForm from './categoryForm.svelte';
  import CategoryList from './categoryList.svelte';
  import ItemSearch from './itemSearch.svelte';
  import ItemList from './itemList.svelte';
  import ItemForm from './itemForm.svelte';
  import { onMount } from 'svelte';

	let isMobile = false;

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
	})

	function checkMobile() {
 		isMobile = window.innerWidth < 600;
	}
</script>

<main style={isMobile ? "height:50vh" : ""}><!-- main start -->
  <div class={isMobile ? "content-m d-flex flex-column container-fluid" : "content d-flex flex-column container-fluid"}>
    <div class="main-header-section d-flex flex-column" style={isMobile ? "height:14vh" : ""}>
      <ItemSearch />
      <CategoryList/>
      <CategoryForm/>
    </div><!-- main-header-section -->

    <div class={isMobile ? "main-content-section-m simplebar" : "main-content-section simplebar"} style={isMobile ? "height:36vh" : ""}>
      <ItemList />
      <ItemForm />
    </div><!-- end main-content-section -->
  </div>
</main><!-- main end -->