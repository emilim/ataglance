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

<div class="card bg-secondary">
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
		box-shadow: 0 8px 7px #f1f2f2;
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
	:global(flex-element) {
		border-radius: 10px;
	}
	:global(flex) {
		display: flex;
		overflow: hidden;
	}
	:global(flex.h) {
		flex-direction: row;
	}

	:global(flex.v) {
		flex-direction: column;
	}

	:global(flex-item) {
		/* display: flex; */
		/* position: relative; */
		/* overflow: hidden; */
		overflow: auto;
	}

	:global(flex > flex-resizer) {
		flex: 0 0 10px;
		/* background: white; */
		background-color: rgb(229, 229, 229);
		background-repeat: no-repeat;
		background-position: center;
	}

	:global(flex.h > flex-resizer) {
		cursor: ew-resize;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='30'><path d='M2 0 v30 M5 0 v30 M8 0 v30' fill='none' stroke='black'/></svg>");
	}

	:global(flex.v > flex-resizer) {
		cursor: ns-resize;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='10'><path d='M0 2 h30 M0 5 h30 M0 8 h30' fill='none' stroke='black'/></svg>");
	}
</style>
