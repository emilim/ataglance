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
	<div class="header">
		<h2 class="text-xl">My Notes</h2>
	</div>
	<div class="notes">
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
	.content {
		min-height: 90vh;
		padding: 1em;
		margin: 0 auto;
		max-width: 80%;
	}

	.header {
		padding: 1em 2em;
	}

	.header h2 {
		font-weight: 700;
	}

	.notes {
		display: flex;
		flex-wrap: wrap;
	}
</style>
