<script>
	import SignIn from '../../lib/auth/sign_in_form.svelte';
	import {
		getAuth,
		signInWithPopup,
		GoogleAuthProvider,
		signInWithEmailAndPassword
	} from 'firebase/auth';
	import { auth, userDoc } from '../../firebase';
	import { goto } from '$app/navigation';
	import { setDoc } from 'firebase/firestore/lite';
	import swal from 'sweetalert';
	export let errors;

	async function signIn(event) {
		/*
		try {
			const auth = getAuth();
			let user = await signInWithEmailAndPassword(auth, event.detail.email, event.detail.password);
			console.log(user);
			await setDoc(userDoc(auth.currentUser.uid), {
				username: user.user.displayName,
				email: user.user.email
			});
			swal('Success', 'You have successfully logged in', 'success');
			await goto('/admin');
		} catch (error) {
			swal('Error', error.message, 'error');
			console.log('error signin in', error);
		}
		*/
		const auth = getAuth();
		signInWithEmailAndPassword(auth, event.detail.email, event.detail.password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				await setDoc(userDoc(auth.currentUser.uid), {
					username: user.displayName,
					email: user.email
				});
				swal('Success', 'You have successfully logged in', 'success');
				await goto('/admin');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				swal('Error', errorMessage, 'error');
			});
	}

	function googleLogin() {
		try {
			const provider = new GoogleAuthProvider();

			const auth = getAuth();
			signInWithPopup(auth, provider)
				.then(async (result) => {
					// This gives you a Google Access Token. You can use it to access the Google API.
					const credential = GoogleAuthProvider.credentialFromResult(result);
					const token = credential.accessToken;
					// The signed-in user info.
					const user = result.user;

					await setDoc(userDoc(auth.currentUser.uid), {
						username: user.displayName,
						email: user.email
					});
					await goto('/admin');
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.customData.email;
					// The AuthCredential type that was used.
					const credential = GoogleAuthProvider.credentialFromError(error);
				});
		} catch (e) {
			console.log(e);
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="text-accent-content">
	<div class="headerr">
		<h4>Login</h4>
	</div>

	<div class="signin-form">
		{#if errors}
			<div class="notification-block">
				<p>{errors}</p>
			</div>
		{/if}

		<SignIn on:login={signIn} />
		<p class="text-center text-xs">
			You need to manually go back to the home after sending the form
		</p>
		or
		<button class="btn btn-primary" on:click={googleLogin}>Sign In with google</button>
		<div>
			Don't have an account? <a href="/auth/register" class="link link-secondary">Sign up</a>
		</div>
	</div>
</div>

<style>
	.headerr {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.headerr h4 {
		font-weight: 600;
		font-size: 3rem;
	}

	.signin-form {
		min-height: 80vh;
		display: grid;
		place-items: center;
	}

	.notification-block {
		min-width: 20vw;
		padding: 1.2em 0.75em;
		border-radius: 5px;
		background-color: #fe634e;
	}

	.notification-block p {
		color: white;
	}
</style>
