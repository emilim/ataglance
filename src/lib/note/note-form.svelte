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
		description = document.getElementById('description').outerHTML;
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
					content.setAttribute('placeholder', 'Enter content.');
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
			const html = document.querySelector('html');
			html.style.overflow = 'hidden';

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

			var lastPos = posProp == 'pageX' ? md.touches[0].clientX : md.touches[0].clientY;
			function onTouchMove(mm) {
				var pos = posProp == 'pageX' ? mm.touches[0].clientX : mm.touches[0].clientY;
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
				const html = document.querySelector('html');
				html.style.overflow = 'auto';
				if (posProp === 'pageX') {
					r.style.cursor = 'ew-resize';
				} else {
					r.style.cursor = 'ns-resize';
				}
				window.removeEventListener('touchmove', onTouchMove);
				window.removeEventListener('touchend', onTouchUp);
			}
			window.addEventListener('touchmove', onTouchMove);
			window.addEventListener('touchend', onTouchUp);
		}

		function manageResize(md, sizeProp, posProp) {
			const html = document.querySelector('html');
			html.style.overflow = 'hidden';
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
				html.style.overflow = 'auto';
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
					// @ts-ignore
					target.style.cursor = 'col-resize';
					html.style.cursor = 'col-resize'; // avoid cursor's flickering
					manageResizeTouch(md, 'offsetWidth', 'pageX');
				} else if (v) {
					// @ts-ignore
					target.style.cursor = 'row-resize';
					html.style.cursor = 'row-resize'; // avoid cursor's flickering
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
		newFlex.style.flexDirection = 'column';
		var text = document.createElement('p');

		text.contentEditable = 'true';
		//text.innerHTML = 'New Group';
		text.setAttribute('data-placeholder', 'New group');
		//position text at the top center of the group
		text.style.top = '0';
		text.style.textAlign = 'center';

		newFlex.className = 'h';
		newFlex.style.flexGrow = '1';
		newFlex.style.border = '10px solid var(--back)';
		newFlex.style.borderRadius = '10px';
		newFlex.style.borderTop = '0';
		var newEvTarget = ev.cloneNode(true);
		newEvTarget.setAttribute('content', ev.cloneNode(true).children[0].value);
		newFlex.appendChild(text);
		newFlex.appendChild(newEvTarget);
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
	/*function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}*/
	function hexToHue(hex) {
		var r = parseInt(hex.substring(1, 3), 16) / 255;
		var g = parseInt(hex.substring(3, 5), 16) / 255;
		var b = parseInt(hex.substring(5, 7), 16) / 255;
		var max = Math.max(r, g, b);
		var min = Math.min(r, g, b);
		var h,
			s,
			l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return h;
	}
	function getRandomColor() {
		console.log(color);
		var h = hexToHue(color) * 360;
		console.log(h);
		//s between 10 and 30 and l between 60 and 90
		var s = Math.floor(Math.random() * 20) + 10;
		var l = Math.floor(Math.random() * 30) + 60;
		l /= 100;
		const a = (s * Math.min(l, 1 - l)) / 100;
		const f = (n) => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, '0'); // convert to Hex and prefix "0" if needed
		};
		return `#${f(0)}${f(8)}${f(4)}`;
	}
	let color = '#ff0000';
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
<p class="m-4 ml-6">Choose a base color: <input type="color" bind:value={color} /></p>

<div style="height: 100vh; width:100%;">
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
