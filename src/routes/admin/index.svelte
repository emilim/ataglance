<script context="module">
	import { deleteDoc, getDocs, query, where } from 'firebase/firestore/lite';
	import { noteCollection, noteDoc, auth } from '../../firebase';

	export async function load({ session }) {
		let { user } = session;
		console.log(user);
		if (user == null) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		const q = query(noteCollection, where('owner', '==', auth.currentUser.uid));
		const querySnapshot = await getDocs(q);
		let notes = [];
		querySnapshot.forEach((note) => {
			notes.push({ ...note.data(), id: note.id });
		});

		return {
			status: 200,
			props: {
				notes
			}
		};
	}
</script>

<script>
	import NoteCard from '../../lib/note/note-card.svelte';
	//Delete a note
	async function deleteNote(event) {
		await deleteDoc(noteDoc(event.detail.id));
	}

	export let notes;
</script>

<svelte:head>
	<title>At a Glance</title>
</svelte:head>

<div class="content text-primary-content">
	<div class="header text-accent-content">
		<h1 class="text-xl mb-6">My Notes</h1>
		<a href="/admin/create-note" class="btn btn-active btn-secondary">Create a new note</a>
	</div>
	<div class="flex w-full flex-wrap mt-4 mb-8 content-center">
		{#each notes as note}
			<NoteCard
				title={note.title}
				summary={note.summary}
				id={note.id}
				description={note.description}
				on:deleteNote={deleteNote}
			/>
		{:else}
			<div class="center">
				<h2 class="text-lg">You don't have any notes yet.</h2>
			</div>
		{/each}
	</div>
</div>

<style>
	:global(.description textarea, .description flex-resizer) {
		display: none;
	}
	.content {
		min-height: 90vh;
		padding: 1em;
		margin: 0 auto;
		max-width: 80%;
	}
</style>
