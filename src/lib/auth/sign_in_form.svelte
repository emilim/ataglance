<script>
	import { Form, TextInput, PasswordInput } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	let email, password;
	const dispatcher = createEventDispatcher();

	function login() {
		dispatcher('login', {
			email,
			password
		});
	}
</script>

<div class="form-container">
	<Form>
		<TextInput
			bind:value={email}
			type="email"
			labelText="Email"
			placeholder="Enter your email"
			name="email"
		/>
		<div class="space" />
		<PasswordInput
			labelText="Password"
			bind:value={password}
			placeholder="Enter password"
			tooltipAlignment="start"
			tooltipPosition="left"
			name="password"
		/>
		<div class="space" />
		<button class="btn btn-outline btn-primary" on:click={login}>Sign in</button>
	</Form>
</div>

<style>
	.form-container {
		width: 30%;
	}

	.form-container .space {
		margin: 20px 0;
	}
</style>
