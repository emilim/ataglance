<script>
	import { Link } from 'carbon-components-svelte';
	import { getStores } from '$app/stores';
	import { signOut, sendSignInLinkToEmail, sendEmailVerification } from 'firebase/auth';
	import { auth, userDoc } from '../../firebase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let { session } = getStores();
	import { themeChange } from 'theme-change';
	import swal from 'sweetalert';

	onMount(() => {
		themeChange(false);
	});
	async function logOut() {
		await signOut(auth);
		await goto('/');
	}

	async function sendVerificationEmail() {
		await sendEmailVerification(auth.currentUser);
		swal('Verification Email Sent', 'Please check your email for a verification link', 'success');
	}
</script>

{#if $session['user'] != null}
	<div style="height: 100vh;" class="flex flex-col items-center justify-center">
		{#if !auth.currentUser.emailVerified}
			<button on:click={sendVerificationEmail} class="btn bg-primary text-white m-2"
				>Send verification email</button
			>
		{:else}
			<div class="text-accent-content"><p class="m-2 text-pure">Account verified</p></div>
		{/if}

		<button on:click={logOut} class="btn bg-error text-white">Log out</button>
	</div>
{:else}
	<div style="height: 100vh;" class="flex items-center justify-center">
		<a href="/" class="btn bg-primary text-white m-2">Go back to home</a>
		<p class="text-white m-2">Not authorized to view this page</p>
	</div>
{/if}
