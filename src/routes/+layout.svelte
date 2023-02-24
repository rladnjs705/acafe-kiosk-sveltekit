<script>
	import '$lib/styles/bootstrap/bootstrap.min.css';
	import '$lib/styles/boxicon/css/boxicons.min.css';
	import '$lib/styles/main.scss';

	let isMobile = false;

	checkMobile();
  	window.addEventListener('resize', checkMobile);

	function checkMobile() {
 		isMobile = window.innerWidth < 600;
	}

</script>
<svelte:head>
	<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1, user-scalable=yes,initial-scale=1.0" />
  	<title>아카페</title>
</svelte:head>

<body>
	{#if isMobile}
		<div class="app ">
			<slot />
		</div>
		{:else}
		<div class="app d-flex container-fluid ">
			<slot />
		</div>
	{/if}
</body>