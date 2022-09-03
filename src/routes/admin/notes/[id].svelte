<script context="module">
	import { getDoc } from 'firebase/firestore/lite';
	import { noteDoc } from '../../../firebase';

	export async function load({ params }) {
		const docSnap = await getDoc(noteDoc(params.id));
		if (!docSnap.exists()) {
			return {
				status: 404,
				props: {
					note: null
				}
			};
		} else {
			return {
				status: 200,
				props: {
					note: { ...docSnap.data(), id: docSnap.id }
				}
			};
		}
	}
</script>

<script>
	export let note;
</script>

<svelte:head>
	<title>{note.title ? note.title : 'notegy'}</title>
</svelte:head>

<div class="container-note-detail">
	{#if note == null}
		<div class="center">
			<h2>note does not exist or has been deleted</h2>
		</div>
	{:else}
		<div>
			<h2 contenteditable="true">
				{note.title}
			</h2>
			<p contenteditable="true">{note.summary}</p>
			<p class="description">{note.description}</p>
		</div>
		{@html note.description}
	{/if}Î
</div>

<style>
	.container-note-detail {
		margin: 0 auto;
		width: 90%;
		padding: 2em 0;
		height: 80vh !important;
	}

	.center {
		display: grid;
		place-content: center;
	}

	.description {
		margin-top: 20px;
	}
</style>
