<script>
	import { Link } from 'carbon-components-svelte';
	import { getStores } from '$app/stores';
	import { signOut } from 'firebase/auth';
	import { auth } from '../../firebase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let { session } = getStores();
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
	async function logOut() {
		await signOut(auth);
		await goto('/');
	}
</script>

{#if $session['user'] != null}
	<div style="height: 100vh;" class="flex items-center justify-center">
		<button on:click={logOut} class="btn bg-error text-white">Log out</button>
	</div>
{:else}
	<div style="height: 100vh;" class="flex items-center justify-center">
		<a href="/" class="btn bg-primary text-white m-2">Go back to home</a>
		<p class="text-white m-2">Not authorized to view this page</p>
	</div>
{/if}
