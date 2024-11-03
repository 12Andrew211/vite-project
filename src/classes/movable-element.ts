export type State = 'movable' | 'static';
type Offset = {
	x: number;
	y: number;
};
export class MovableElment {
	private element: HTMLElement | null = null;
	private offset: Offset = {
		x: 0,
		y: 0
	};
	private $state: State = 'static';
	private handler: ((element: typeof this.element, XY: Offset) => void) | null = null;

	constructor(element: HTMLElement | null) {
		if (element) {
			this.element = element;
		}
	}

	set state(value: State) {
		this.$state = value;
	}

	get state() {
		return this.$state;
	}

	private handleMouseDown = (event: PointerEvent) => {
		event.stopPropagation();
		event.preventDefault();
		if (this.element) {
			this.element.style.position = 'absolute';
			this.offset = {
				x: event.offsetX,
				y: event.offsetY
			};
			document.addEventListener('pointermove', this.handleMouseMove);
			document.addEventListener('pointerup', this.handleMouseUp);
		}
	};

	private handleMouseMove = (event: PointerEvent) => {
		event.stopPropagation();
		event.preventDefault();
		if (this.element) {
			this.element!.style.left = event.clientX - this.offset.x + 'px';
			this.element!.style.top = event.clientY - this.offset.y + 'px';
		}
	};

	private handleMouseUp = (event: PointerEvent) => {
		event.stopPropagation();
		event.preventDefault();
		if (this.element) {
			this.element.style.position = '';
			this.element.style.left = '';
			this.element.style.top = '';
			this.handler?.(this.element, {
				x: event.clientX,
				y: event.clientY
			});
			document.removeEventListener('pointermove', this.handleMouseMove);
		}
	};

	initMovable = (handler?: typeof this.handler) => {
		this.handler = handler ?? null;
		if (this.element) {
			this.element.classList.add('not-touch-action');
			this.element.addEventListener('pointerdown', this.handleMouseDown);
		}
		this.state = 'movable';
	};

	clearEventListener = () => {
		if (this.element) {
			this.element.classList.remove('not-touch-action');
			document.removeEventListener('pointermove', this.handleMouseMove);
			document.removeEventListener('pointerup', this.handleMouseUp);
			this.element.removeEventListener('pointerdown', this.handleMouseDown);
		}
		this.state = 'static';
	};
}
