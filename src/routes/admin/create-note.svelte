<script>
	import { goto } from '$app/navigation';

	import { addDoc, serverTimestamp } from 'firebase/firestore/lite';

	import { auth, noteCollection } from '../../firebase';
	import NoteForm from '../../lib/note/note-form.svelte';

	async function createNewNote(event) {
		await addDoc(noteCollection, {
			...event.detail,
			owner: auth.currentUser.uid,
			timestamp: serverTimestamp()
		});
		await goto('/admin');
	}
</script>

<svelte:head>
	<title>Create Note</title>
</svelte:head>
<br />
<div style="height: calc(100vh - 200px);">
	<NoteForm
		on:sendNoteDetails={createNewNote}
		title={''}
		summary={''}
		description={'<div class="container" style="height: 100%; border-radius: 10px; background-color: rgb(229, 229, 229); border: 10px solid rgb(229, 229, 229);"><flex style="height: 100%;" class="h"><flex-element color="rgb(199, 100, 39)" text="" flex="" /></flex></div>'}
	/>
</div>
