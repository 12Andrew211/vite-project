export type State = 'movable' | 'static';
export class MovableElment {
	private element: HTMLElement | null = null;
	private offset: {
		x: number;
		y: number;
	} = {
		x: 0,
		y: 0
	};
	private $state: State = 'static';

	constructor(element: HTMLElement | null) {
		if (element) {
			this.element = element;
		}
	}

	set state(value: State) {
		console.log(this.$state);
		this.$state = value;
		console.log(this.$state);
	}

	get state() {
		return this.$state;
	}

	private handleMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		if (this.element) {
			this.element.style.position = 'absolute';
			this.offset = {
				x: event.offsetX,
				y: event.offsetY
			};
			document.addEventListener('pointermove', this.handleMouseMove);
		}
	};

	private handleMouseMove = (event: MouseEvent) => {
		event.preventDefault();
		if (
			window.innerHeight < event.clientY ||
			window.innerWidth < event.clientX ||
			event.clientX < 0 ||
			event.clientY < 0
		) {
			document.removeEventListener('pointermove', this.handleMouseMove);
			return;
		}
		if (this.element) {
			const { right, left, bottom, top, width, height } =
				this.element.getBoundingClientRect();

			let x: number =
				right > window.innerWidth
					? window.innerWidth - width
					: left < 0
					? 0
					: event.clientX - this.offset.x;
			let y: number =
				bottom > window.innerHeight
					? window.innerHeight - height
					: top < 0
					? 0
					: event.clientY - this.offset.y;

			this.element!.style.left = x + 'px';
			this.element!.style.top = y + 'px';
		}
	};

	private handleMouseUp = (event: MouseEvent) => {
		event.preventDefault();
		if (this.element) {
			document.removeEventListener('pointermove', this.handleMouseMove);
		}
	};

	initMovable = () => {
		if (this.element) {
			this.element.addEventListener('pointerdown', this.handleMouseDown);
			document.addEventListener('pointerup', this.handleMouseUp);
		}
		this.state = 'movable';
	};

	clearEventListener = () => {
		if (this.element) {
			document.removeEventListener('pointermove', this.handleMouseMove);
			document.removeEventListener('pointerup', this.handleMouseUp);
			this.element.removeEventListener('pointerdown', this.handleMouseUp);
		}
		this.state = 'static';
	};
}
