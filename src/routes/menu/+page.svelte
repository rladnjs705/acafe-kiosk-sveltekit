<script lang="ts">
    import MenuForm from '$components/menuMain/main.svelte';
    import MenuAside from '$components/menuAside/aside.svelte';
    import type { PageData } from './$types';

    export let data:PageData;
</script>
<MenuForm data={data}/>
<MenuAside/>