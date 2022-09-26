<script>
	import SignUp from '../../lib/auth/sign_up_form.svelte';
	import {
		createUserWithEmailAndPassword,
		updateProfile,
		sendEmailVerification,
		getAuth
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { auth, userDoc } from '../../firebase';
	import { setDoc } from 'firebase/firestore/lite';
	import swal from 'sweetalert';

	let errors;

	async function signUp(event) {
		/*
		try {
			let user = await createUserWithEmailAndPassword(
				auth,
				event.detail.email,
				event.detail.password
			);
			await sendEmailVerification(user.user);
			await updateProfile(user.user, { displayName: event.detail.username });
			await setDoc(userDoc(auth.currentUser.uid), {
				username: user.user.displayName,
				email: user.user.email
			});
			await goto('/admin');
		} catch (e) {
			console.log('error from creating user', e);
		}	
		*/
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, event.detail.email, event.detail.password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				await setDoc(userDoc(auth.currentUser.uid), {
					username: user.displayName,
					email: user.email
				});
				swal('Account created', 'Please check your email for a verification link', 'success');
				await goto('/admin', { replaceState: true });
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
				swal('Error', errorMessage, 'error');
			});
	}
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="text-accent-content">
	<div class="headerr">
		<h4>Sign Up</h4>
	</div>
	<div class="form-container">
		{#if errors}
			{#each errors as error, i (i)}
				<div class="notification-block">
					<p>{error}</p>
				</div>
			{/each}
		{/if}
		<SignUp on:signup={signUp} />
		<div>
			Already have an account? <a href="/auth/login" class="link link-secondary">Sign In</a>
		</div>
	</div>
</div>

<style>
	.headerr {
		width: 100vw;
		padding: 2em 0;
		min-height: 20vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.headerr h4 {
		font-weight: 600;
		font-size: 3rem;
	}
	.form-container {
		min-height: 80vh;
		display: grid;
		place-content: center;
	}

	.form-container div:last-of-type {
		padding: 2em 0;
		text-align: center;
	}

	.notification-block {
		min-width: 10vw;
		padding: 1.2em 0.75em;
		border-radius: 5px;
		background-color: #fe634e;
		margin-bottom: 1.25em;
	}

	.notification-block p {
		color: white;
	}
</style>
