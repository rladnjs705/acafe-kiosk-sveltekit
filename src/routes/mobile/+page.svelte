<script>
	import { Device } from '@capacitor/device';
	import LoginForm from '$mcomponents/auth/loginForm.svelte';
	const info = async () => {
		const deviceInfo = await Device.getInfo();
		const isPhone = deviceInfo.platform === 'android';
		console.log(deviceInfo)
		if(isPhone){
			console.log(deviceInfo.platform)
		}
	}
	info();
</script>

<svelte:head>
	<title>아카페</title>
	<meta name="description" content="acafe demo app" />
	<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1, user-scalable=yes,initial-scale=1.0" />
</svelte:head>

<LoginForm />
