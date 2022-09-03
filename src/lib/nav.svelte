<script>
	import { Link } from 'carbon-components-svelte';
	import { getStores } from '$app/stores';
	import { signOut } from 'firebase/auth';
	import { auth } from '../firebase';
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

<div class="navbar bg-base-300 text-accent-content">
	<div class="flex-1">
		<div class="avatar">
			<div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
				<img src="/ataglance.ico" alt="icon" />
			</div>
		</div>
		{#if $session['user'] != null}
			<a href="/admin" class="btn btn-ghost normal-case text-xl ml-2">Let's Create</a>
		{:else}
			<a href="/" class="btn btn-ghost normal-case text-xl ml-2">At a Glance</a>
		{/if}
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal p-0">
			{#if $session['user'] != null}
				<!--
				<li>
					<a href="/admin/create-note">Create a new note</a>
				</li>
				<li>
					<button on:click={logOut} class="bg-error">Log out</button>
				</li>
			-->
				<div class="dropdown">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h7"
							/></svg
						>
					</label>
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a href="/admin/create-note">Create a new note</a>
						</li>
						<li>
							<button on:click={logOut} class="bg-error">Log out</button>
						</li>
					</ul>
				</div>
			{:else}
				<!--
				<li>
					<a href="/auth/login">Login</a>
				</li>
				<li>
					<a href="/auth/register">Sign up</a>
				</li>
			-->
				<div class="dropdown">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h7"
							/></svg
						>
					</label>
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li><a href="/auth/login">Login</a></li>
						<li><a href="/auth/register">Sign up</a></li>
					</ul>
				</div>
			{/if}

			<li class="bg-transparent text-base-100">
				<select
					data-choose-theme
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option value="retro">Default</option>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</li>
		</ul>
	</div>
</div>
