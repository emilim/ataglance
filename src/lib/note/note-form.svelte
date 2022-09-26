<script>
	import { Form, Button } from 'carbon-components-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { ContextMenu, ContextMenuDivider, ContextMenuOption } from 'carbon-components-svelte';
	import swal from 'sweetalert';
	//import swal from '@sweetalert/with-react'

	const dispatcher = createEventDispatcher();

	export let title, summary, description, messages;

	function dispatchBlog() {
		document.querySelectorAll('[id^="message"]').forEach((message) => {
			message.parentElement.setAttribute('content', message.value);
			console.log(message.parentElement);
		});
		title = document.getElementById('title').innerHTML;
		summary = document.getElementById('summary').innerHTML;
		description = document.getElementsByClassName('container')[0].outerHTML;
		messages = Array.from(document.querySelectorAll('[id^="message"]')).map((message) => {
			return {
				content: message.value
			};
		});

		//this.setAttribute('content', this.children[0].value);
		dispatcher('sendNoteDetails', {
			title,
			summary,
			description,
			messages
		});
		(title = ''), (summary = ''), (description = ''), (messages = '');
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
				this.style.background = this.getAttribute('color') || getRandomColor();

				if (!this.hasChildNodes()) {
					var content = document.createElement('textarea');
					content.setAttribute('id', 'message');
					content.style.textAlign = 'center';
					content.setAttribute('placeholder', 'Enter content');
					content.style.background = this.style.background;
					this.appendChild(content);
				} else {
					this.children[0].value = this.getAttribute('content');
				}
			}

			static get observedAttributes() {
				return ['color', 'flex', 'content'];
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
		ev = item.detail.parentElement;
		if (ev.nodeName == 'FLEX-ELEMENT') {
			//bar = document.getElementsByTagName('flex-resizer')[0].cloneNode(true);
			bar = document.createElement('flex-resizer');
			wrapper =
				ev.parentNode.getAttribute('class') != null ? ev.parentNode.getAttribute('class')[0] : '';
			newItem = document.createElement('flex-element');
			newItem.setAttribute('color', getRandomColor());
			newItem.setAttribute('flex', '1');
			newItem.setAttribute('content', '');
		} else {
			document.getElementById('menu').style.display = 'none';
		}
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
			newEvTarget.setAttribute('content', ev.cloneNode(true).children[0].value);

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
			newEvTarget.setAttribute('content', ev.cloneNode(true).children[0].value);

			newFlex.appendChild(newEvTarget);
			newFlex.appendChild(bar);
			newFlex.appendChild(newItem);
			newFlex.style.flexGrow = '1';

			ev.parentNode.replaceChild(newFlex, ev);
		}
	}
	function CreateGroup() {
		var newFlex = document.createElement('flex');
		newFlex.className = 'h';
		newFlex.style.flexGrow = '1';
		newFlex.style.border = '10px solid black';
		newFlex.style.borderRadius = '10px';
		newFlex.appendChild(newItem.cloneNode(true));
		ev.parentNode.replaceChild(newFlex, ev);
	}

	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	function rgbToHex(rgb) {
		rgb = rgb.replace('rgb(', '');
		rgb = rgb.replace(')', '');
		rgb = rgb.split(',');
		var r = parseInt(rgb[0]);
		var g = parseInt(rgb[1]);
		var b = parseInt(rgb[2]);
		return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	function Settings() {
		let color = rgbToHex(ev.style.backgroundColor);
		let color2 = rgbToHex(ev.children[0].style.color);
		var backgroundColor = document.createElement('input');
		var textColor = document.createElement('input');
		backgroundColor.setAttribute('type', 'color');
		textColor.setAttribute('type', 'color');
		console.log(color);
		backgroundColor.defaultValue = color;
		textColor.defaultValue = color2;
		//merge the two inputs into one
		var colorPicker = document.createElement('div');
		colorPicker.appendChild(backgroundColor);
		colorPicker.appendChild(textColor);
		swal({
			text: 'back | text',
			content: colorPicker,
			//value: settings.value,
			closeOnClickOutside: false
		}).then((value) => {
			ev.setAttribute('color', backgroundColor.value);
			ev.style.backgroundColor = backgroundColor.value;
			ev.children[0].style.backgroundColor = backgroundColor.value;

			ev.children[0].style.color = textColor.value;
		});
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

<div class="text-accent-content m-4">
	<h1
		data-placeholder="Your title"
		contenteditable="true"
		id="title"
		class="text-xl bg-base-300 m-2 text-center rounded-xl"
	>
		{@html title}
	</h1>
	<p
		data-placeholder="Your summary"
		contenteditable="true"
		id="summary"
		class="text-sm bg-base-300 m-2 text-center rounded-xl"
	>
		{@html summary}
	</p>
</div>
<div style="height: 100vh;">
	{@html description}
</div>
<Form>
	<center>
		<Button on:click={dispatchBlog} class="btn-primary m-4 text-center">Submit</Button>
	</center>
</Form>

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
	<ContextMenuOption indented labelText="Create group" shortcutText="⌘G" on:click={CreateGroup} />
	<ContextMenuOption indented labelText="Settings" shortcutText="⌘S" on:click={Settings} />
	<ContextMenuDivider />
	<ContextMenuOption indented kind="danger" labelText="Delete" on:click={Delete} />
</ContextMenu>

<style>
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
		padding: 10px;
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
		background-color: var(--back);
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
