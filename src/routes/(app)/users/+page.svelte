<script lang="ts">
	import Users from '$components/auth/userList.svelte';
    import { isAdmin } from '$stores';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    
    
    $: if(browser) {
        console.log($isAdmin);
        if(!$isAdmin){
            goto("/")
        }
    }
</script>
{#if $isAdmin}
    <Users/>
{/if}