<script context="module">
	export async function load({ session }) {
		let { user } = session;
		console.log('current user', user);
		if (user != null) {
			return {
				status: 302,
				redirect: '/admin'
			};
		}

		return {
			status: 200
		};
	}
</script>

<svelte:head>
	<title>At a Glance</title>
</svelte:head>

<div class="text-accent-content">
	<h1 class="text-6xl font-normal leading-normal mt-0 mb-2 text-pink-800 text-center">
		Welcome to At A Glance 😁
	</h1>
	<p class="text-center text-base">
		This is a simple Svelte app that allows you to create and manage notes.
	</p>
	<p class="text-center text-base">
		The idea is to organize your thoughts in a grid that you can resize and regroup.
	</p>
	<p class="text-center text-base">You can create a new note, and then edit it later.</p>
	<p class="text-center text-base">
		You can also delete a note, and then you can create a new one.
	</p>
</div>

<style>
	div {
		height: 90vh;
	}
</style>
