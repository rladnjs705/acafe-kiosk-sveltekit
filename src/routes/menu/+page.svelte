<script lang="ts">
    import MenuForm from '$components/menuMain/main.svelte';
    import MenuAside from '$components/menuAside/aside.svelte';
    import { categoryList } from '$stores';
    categoryList.getCategoryList();
</script>
<MenuForm/>
<MenuAside/>