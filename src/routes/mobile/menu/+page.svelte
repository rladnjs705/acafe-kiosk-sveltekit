<script lang="ts">
    import MenuForm from '$mcomponents/menuMain/main.svelte';
    import MenuAside from '$mcomponents/menuAside/aside.svelte';
    import { authToken, auth } from '$stores';
    import { onMount } from 'svelte';

    $: {
        if($authToken){
            auth.createAuth();
        } else {
            auth.resetAuth();
        }
    }

    const initAuth = async () => {
        if($authToken) {
            await auth.createAuth();
        }
        return;
    }
    let isMobile = false;

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
	})

	function checkMobile() {
 		isMobile = window.innerWidth < 600;
	}
</script>
<svelte:head>
	{#if isMobile}
		<meta name="viewport" content="width=device-width, maximum-scale=5.0, minimum-scale=0.1, user-scalable=yes,initial-scale=0.7" />
		{:else}
		<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1, user-scalable=yes,initial-scale=1.0" />
	{/if}
  	<title>아카페</title>
</svelte:head>
{#await initAuth() then initAuth}
    <MenuForm/>
    <MenuAside/>
{/await}