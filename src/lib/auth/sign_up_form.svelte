<script>
	import { Form, TextInput, PasswordInput } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	let username, email, password;

	function signup() {
		dispatch('signup', {
			username,
			email,
			password
		});
	}
</script>

<div class="form text-accent-content">
	<Form>
		<TextInput
			bind:value={username}
			labelText="Username"
			placeholder="Enter your username"
			name="username"
			class="text-pure bg-accent"
		/>
		<div class="space" />
		<TextInput
			bind:value={email}
			labelText="Email address"
			placeholder="Enter your email"
			type="email"
			name="email"
		/>
		<div class="space" />
		<PasswordInput
			bind:value={password}
			tooltipAlignment="start"
			tooltipPosition="left"
			labelText="Password"
			placeholder="Enter password"
			name="password"
		/>
		<div class="space" />
		<button class="btn btn-outline btn-primary" on:click={signup}>Sign Up</button>
	</Form>
</div>

<style>
	.form {
		width: 400px;
	}
	.form .space {
		margin: 0.6em 0;
	}
</style>
