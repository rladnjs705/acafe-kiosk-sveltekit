<script lang="ts">
    import MenuForm from '$components/menuMain/main.svelte';
    import MenuAside from '$components/menuAside/aside.svelte';
    import { authToken, auth } from '$stores';

    $: {
        console.log($authToken)
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
</script>
{#await initAuth() then initAuth}
    <MenuForm/>
    <MenuAside/>
{/await}