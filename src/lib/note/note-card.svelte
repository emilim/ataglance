<script>
	import { goto } from '$app/navigation';

	import { createEventDispatcher } from 'svelte';

	export let title, summary, id, description;
	const dispatcher = createEventDispatcher();
	async function dispatchNoteDelete() {
		dispatcher('deleteNote', {
			id
		});
		await goto(`/admin`);
	}

	async function editNote() {
		await goto(`/admin/notes/update/${id}`);
	}

	var noInteracts = document.getElementsByClassName('disabled');
	[].map.call(noInteracts, function (elem) {
		elem.addEventListener(
			'keydown',
			function (e) {
				if (e.keyCode != 9) {
					e.returnValue = false;
					return false;
				}
			},
			true
		);
	});
</script>

<div class="card">
	<h1 class="text-xl m-1 font-bold">{@html title}</h1>
	<p class="text-xs mb-2 font-thin">{@html summary}</p>
	<div class="description disabled" style="height: 25vh;">
		{@html description}
	</div>
	<div class="button-set">
		<button class="edit bg-warning" on:click={editNote}>View and edit</button>
		<button class="delete" on:click={dispatchNoteDelete}>Delete</button>
	</div>
</div>

<style>
	.description {
		margin-bottom: 1em;
		width: 100%;
		height: 100%;
		overflow: visible;
		position: relative;
	}
	.card {
		max-width: 300px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		box-shadow: 0 8px 7px var(--back);
		padding: 1em;
		margin: 1em 2em;
		transition: all 200ms ease-in;
	}

	.card:hover {
		box-shadow: 0 4px 7px #f1f2f2;
	}

	.button-set {
		display: flex;
		flex-direction: row;
	}

	.button-set .edit {
		margin-right: 0.75em;
		padding: 0.35em 0.45em;
		border-radius: 3px;
		outline: none;
		border: none;
		color: white;
	}

	.button-set .delete {
		background-color: red;
		border-radius: 3px;
		padding: 0.35em 0.45em;
		outline: none;
		border: none;
		color: white;
	}
	:global(.header) {
		margin: 2em;
	}
	:global(.container) {
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: auto;
		border: 10px solid rgb(229, 229, 229);
		background-color: rgb(229, 229, 229);
		height: calc(100vh - 500px);
		border-radius: 10px;
	}
</style>
