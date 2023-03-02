<script lang="ts">
	import '$lib/styles/bootstrap/bootstrap.min.css';
	import '$lib/styles/boxicon/css/boxicons.min.css';
	import '$lib/styles/main.scss';
    import { onMount } from 'svelte';
	import debounce from 'lodash/debounce';

	let isMobile = false;
	const handleResize = debounce(() => {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, 500);

	onMount(() => {
		checkMobile();
		handleResize();
		window.addEventListener('resize', checkMobile);
		window.addEventListener('resize', handleResize);
	})

	function checkMobile() {
 		isMobile = window.innerWidth < 600;
	}

</script>
<svelte:head>
	{#if isMobile}
		<meta name="viewport" content="width=device-width, maximum-scale=5.0, minimum-scale=0.1, user-scalable=no,initial-scale=0.7" />
		{:else}
		<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1, user-scalable=no,initial-scale=1.0" />
	{/if}
  	<title>아카페</title>
</svelte:head>

<body>
	{#if isMobile}
		<div class="app">
			<slot />
		</div>
		{:else}
		<div class="app d-flex container-fluid ">
			<slot />
		</div>
	{/if}
</body>