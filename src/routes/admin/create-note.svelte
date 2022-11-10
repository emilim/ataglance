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
<NoteForm
	on:sendNoteDetails={createNewNote}
	title={''}
	summary={''}
	description={'<div id="description" style="margin: 0 0 0 0; width:100%; height: 100%; border-radius: 10px; background-color: var(--back); border: 10px solid var(--back);"><flex style="height: 100%;" class="h"><flex-element color="rgb(231, 170, 170)" content="" flex=""><textarea id="message" placeholder="Enter content." style="background: rgb(231, 170, 170);"><span style="display: inline-block; vertical-align: middle; line-height: normal;">Ciao</span></textarea></flex-element></flex></div>'}
	messages={[]}
/>
