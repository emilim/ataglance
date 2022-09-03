<script>
	import { Form, Button } from 'carbon-components-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { ContextMenu, ContextMenuDivider, ContextMenuOption } from 'carbon-components-svelte';

	const dispatcher = createEventDispatcher();

	export let title, summary, description;

	function dispatchBlog() {
		title = document.getElementById('title').innerHTML;
		summary = document.getElementById('summary').innerHTML;
		description = document.getElementsByClassName('container')[0].outerHTML;
		dispatcher('sendNoteDetails', {
			title,
			summary,
			description
		});
		(title = ''), (summary = ''), (description = '');
	}

	onMount(() => {
		class FlexElement extends HTMLElement {
			constructor() {
				super();
				this.addEventListener('click', this.handleClick);
			}
			connectedCallback() {
				this.style.display = 'flex';
				this.style.alignItems = 'center';
				this.style.justifyContent = 'center';
				this.style.flex = this.style.flex || '1';
				this.innerHTML =
					this.innerHTML == '' ? "<p contenteditable='true'>Your Note</p>" : this.innerHTML;
				this.style.background = this.getAttribute('color') || getRandomColor();
			}
			handleClick(event) {
				//event.target.innerHTML = 'lol';
			}

			static get observedAttributes() {
				return ['color', 'flex', 'text'];
			}
		}
		customElements.get('flex-element') || customElements.define('flex-element', FlexElement);

		function manageResizeTouch(md, sizeProp, posProp) {
			var r = document.elementFromPoint(md.touches[0].clientX, md.touches[0].clientY);

			var prev = r.previousElementSibling;
			var next = r.nextElementSibling;
			if (!prev || !next) {
				return;
			}

			var prevSize = prev[sizeProp];
			var nextSize = next[sizeProp];
			var sumSize = prevSize + nextSize;
			var prevGrow = Number(prev.style.flexGrow);
			var nextGrow = Number(next.style.flexGrow);
			var sumGrow = prevGrow + nextGrow;
			var lastPos = posProp == 'clientX' ? md.touches[0].clientX : md.touches[0].clientY;

			function onTouchMove(mm) {
				var pos = posProp == 'clientX' ? md.touches[0].clientX : md.touches[0].clientY;
				var d = pos - lastPos;
				prevSize += d;
				nextSize -= d;
				if (prevSize < 0) {
					nextSize += prevSize;
					pos -= prevSize;
					prevSize = 0;
				}
				if (nextSize < 0) {
					prevSize += nextSize;
					pos += nextSize;
					nextSize = 0;
				}

				var prevGrowNew = sumGrow * (prevSize / sumSize);
				var nextGrowNew = sumGrow * (nextSize / sumSize);

				prev.style.flexGrow = prevGrowNew;
				next.style.flexGrow = nextGrowNew;

				lastPos = pos;
			}

			function onTouchUp(mu) {
				window.removeEventListener('touchmove', onTouchMove);
				window.removeEventListener('touchend', onTouchUp);
			}
			window.addEventListener('touchmove', onTouchMove);
			window.addEventListener('touchend', onTouchUp);
		}

		function manageResize(md, sizeProp, posProp) {
			var r = md.target;

			var prev = r.previousElementSibling;
			var next = r.nextElementSibling;
			if (!prev || !next) {
				return;
			}

			md.preventDefault();

			var prevSize = prev[sizeProp];
			var nextSize = next[sizeProp];
			var sumSize = prevSize + nextSize;
			var prevGrow = Number(prev.style.flexGrow);
			var nextGrow = Number(next.style.flexGrow);
			var sumGrow = prevGrow + nextGrow;
			var lastPos = md[posProp];

			function onMouseMove(mm) {
				mm.preventDefault();
				var pos = mm[posProp];
				var d = pos - lastPos;
				prevSize += d;
				nextSize -= d;
				if (prevSize < 0) {
					nextSize += prevSize;
					pos -= prevSize;
					prevSize = 0;
				}
				if (nextSize < 0) {
					prevSize += nextSize;
					pos += nextSize;
					nextSize = 0;
				}

				var prevGrowNew = sumGrow * (prevSize / sumSize);
				var nextGrowNew = sumGrow * (nextSize / sumSize);

				prev.style.flexGrow = prevGrowNew;
				next.style.flexGrow = nextGrowNew;

				lastPos = pos;
			}

			function onMouseUp(mu) {
				// Change cursor to signal a state's change: stop resizing.
				const html = document.querySelector('html');
				html.style.cursor = 'default';

				if (posProp === 'pageX') {
					r.style.cursor = 'ew-resize';
				} else {
					r.style.cursor = 'ns-resize';
				}
				window.removeEventListener('mousemove', onMouseMove);
				window.removeEventListener('mouseup', onMouseUp);
			}
			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('mouseup', onMouseUp);
		}

		function setupResizerEvents() {
			document.body.addEventListener('touchstart', function (md) {
				const html = document.querySelector('html');

				var target = document.elementFromPoint(md.touches[0].clientX, md.touches[0].clientY);
				// @ts-ignore
				if (target.nodeType !== 1 || target.tagName !== 'FLEX-RESIZER') {
					return;
				}
				// @ts-ignore
				var parent = target.parentNode;
				var h = parent.classList.contains('h');
				var v = parent.classList.contains('v');
				if (h && v) {
					return;
				} else if (h) {
					manageResizeTouch(md, 'offsetWidth', 'pageX');
				} else if (v) {
					manageResizeTouch(md, 'offsetHeight', 'pageY');
				}
			});
			document.body.addEventListener('mousedown', function (md) {
				// Used to avoid cursor's flickering
				const html = document.querySelector('html');

				var target = md.target;
				// @ts-ignore
				if (target.nodeType !== 1 || target.tagName !== 'FLEX-RESIZER') {
					return;
				}
				// @ts-ignore
				var parent = target.parentNode;
				var h = parent.classList.contains('h');
				var v = parent.classList.contains('v');
				if (h && v) {
					return;
				} else if (h) {
					// Change cursor to signal a state's change: begin resizing on H.
					// @ts-ignore
					target.style.cursor = 'col-resize';
					html.style.cursor = 'col-resize'; // avoid cursor's flickering

					// use offsetWidth versus scrollWidth (and clientWidth) to avoid splitter's jump on resize when a flex-item content overflow (overflow: auto).
					manageResize(md, 'offsetWidth', 'pageX');
				} else if (v) {
					// Change cursor to signal a state's change: begin resizing on V.
					// @ts-ignore
					target.style.cursor = 'row-resize';
					html.style.cursor = 'row-resize'; // avoid cursor's flickering

					manageResize(md, 'offsetHeight', 'pageY');
				}
			});
		}
		setupResizerEvents();
	});
	let ev, bar, wrapper, newItem;
	function setGlobalItem(item) {
		//ev = document.getElementById(item.detail.id);
		ev = item.detail;
		//bar = document.getElementsByTagName('flex-resizer')[0].cloneNode(true);
		bar = document.createElement('flex-resizer');
		wrapper =
			ev.parentNode.getAttribute('class') != null ? ev.parentNode.getAttribute('class')[0] : '';
		newItem = document.createElement('flex-element');
		newItem.setAttribute('color', getRandomColor());
		newItem.setAttribute('flex', '1');
		newItem.setAttribute('text', "<p contenteditable='true'>Your Note</p>");
	}
	function VerticalSplit() {
		if (wrapper == null) {
			ev.parentNode.setAttribute('class', 'h');
		}
		if (wrapper == 'h') {
			ev.parentNode.insertBefore(newItem, ev.nextSibling);
			ev.parentNode.insertBefore(bar, newItem);
		}
		if (wrapper == 'v') {
			var newFlex = document.createElement('flex');

			newFlex.className = 'h';
			var newEvTarget = ev.cloneNode(true);
			newEvTarget.setAttribute('text', ev.cloneNode(true).innerHTML);

			newFlex.appendChild(newEvTarget);
			newFlex.appendChild(bar);
			newFlex.appendChild(newItem);
			newFlex.style.flexGrow = '1';

			ev.parentNode.replaceChild(newFlex, ev);
		}
	}
	function HorizontalSplit() {
		if (wrapper == null) {
			ev.parentNode.setAttribute('class', 'v');
		}
		if (wrapper == 'v') {
			ev.parentNode.insertBefore(newItem, ev.nextSibling);
			ev.parentNode.insertBefore(bar, newItem);
		}
		if (wrapper == 'h') {
			var newFlex = document.createElement('flex');

			newFlex.className = 'v';
			var newEvTarget = ev.cloneNode(true);
			newEvTarget.setAttribute('text', ev.cloneNode(true).innerHTML);

			newFlex.appendChild(newEvTarget);
			newFlex.appendChild(bar);
			newFlex.appendChild(newItem);
			newFlex.style.flexGrow = '1';

			ev.parentNode.replaceChild(newFlex, ev);
		}
	}
	function Delete() {
		var next = ev.nextSibling == null ? '' : ev.nextSibling.nodeName;
		var prev = ev.previousSibling == null ? '' : ev.previousSibling.nodeName;
		if (next == 'FLEX-RESIZER' && prev == 'FLEX-RESIZER') {
			ev.nextSibling.remove();
		} else {
			if (next == 'FLEX-RESIZER') {
				ev.nextSibling.remove();
			}
			if (prev == 'FLEX-RESIZER') {
				ev.previousSibling.remove();
			}
		}
		ev.remove();
	}
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
</script>

<div class="headerr text-accent-content">
	<h1 data-placeholder="Your title" contenteditable="true" id="title" class="text-xl mx-2 my-2">
		{title}
	</h1>
	<p data-placeholder="Your summary" contenteditable="true" id="summary" class="text-sm mx-2 my-2">
		{summary}
	</p>
	<Form>
		<Button on:click={dispatchBlog} class="text-accent-content bg-accent mx-2 my-2">Submit</Button>
	</Form>
</div>

{@html description}

<ContextMenu on:open={(e) => setGlobalItem(e)} id="menu">
	<ContextMenuOption
		indented
		labelText="Vertical split"
		shortcutText="⌘V"
		on:click={VerticalSplit}
	/>
	<ContextMenuOption
		indented
		labelText="Horizontal split"
		shortcutText="⌘H"
		on:click={HorizontalSplit}
	/>
	<ContextMenuDivider />
	<ContextMenuOption indented kind="danger" labelText="Delete" on:click={Delete} />
</ContextMenu>

<style>
	:global(.headerr) {
		margin: 2em;
	}
	/*
	:global(.container) {
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: auto;
		border: 10px solid rgb(229, 229, 229);
		background-color: rgb(229, 229, 229);
		height: calc(100vh - 200px);
		border-radius: 10px;
	}*/
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
