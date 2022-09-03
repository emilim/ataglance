<script context="module">
	import { getDoc, setDoc } from 'firebase/firestore/lite';
	import { noteDoc } from '../../../../firebase';

	export async function load({ params }) {
		const docSnap = await getDoc(noteDoc(params.id));
		if (!docSnap.exists()) {
			return {
				status: 404,
				redirect: '/admin'
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
	import { goto } from '$app/navigation';

	import NoteForm from '../../../../lib/note/note-form.svelte';
	export let note;

	async function updateNoteDetails(event) {
		await setDoc(noteDoc(note.id), event.detail, { merge: true });
		await goto('/admin');
	}
</script>

<svelte:head>
	<title>Update note</title>
</svelte:head>
<br />
<div style="height: calc(100vh - 200px);">
	<NoteForm
		on:sendNoteDetails={updateNoteDetails}
		title={note.title}
		summary={note.summary}
		description={note.description}
	/>
</div>
