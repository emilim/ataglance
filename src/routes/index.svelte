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
	<h1 class="text-4xl font-normal leading-normal text-base-content text-center pt-6">
		A new intuitive way to manage your life
	</h1>
	<h1 class="text-5xl font-normal leading-normal text-pure text-center mt-2">AT A GLANCE</h1>
	<h1 class="text-xl font-normal leading-normal text-base-content text-center pt-2">
		What makes At a Glance different?
	</h1>
	<p class="text-center text-secondary mx-6">
		An app where you can keep track of the importance that each goal has on your life.
	</p>

	<h1 class="text-xl font-normal leading-normal text-pure text-center m-2 mt-10 pt-10">
		Sign in to the web app here:
	</h1>
	<div class="flex justify-center">
		<div class="flex flex-row m-5">
			<a href="/auth/login" class="btn btn-primary btn-lg mx-2">Sign in</a>
			<a href="/auth/register" class="btn btn-primary btn-lg mx-2">Sign up</a>
		</div>
	</div>
</div>
