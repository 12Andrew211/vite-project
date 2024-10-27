import { MovableElment, type State } from './classes/movable-element';
import './style.css';

const movableElement = new MovableElment(document.getElementById('movable'));

document.getElementById('toggleButton')?.addEventListener('click', () => {
	const handler: Record<State, () => void> = {
		movable: movableElement.clearEventListener,
		static: () =>
			movableElement.initMovable((elem, { x, y }) => {
				const zones = document.querySelectorAll('.zone');
				const currentZone = Array.from(zones).find((zone) => {
					const { right, bottom, top, left } = zone.getBoundingClientRect();
					return x < right && x > left && y > top && y < bottom;
				});
				if (currentZone) {
					elem && currentZone.appendChild(elem);
				}
			})
	};
	handler[movableElement.state]();

	// switch (movableElement.state) {
	// 	case 'movable':
	// 		movableElement.clearEventListener();
	// 		break;
	// 	case 'static':
	// 		movableElement.initMovable();
	// 		break;
	// }

	// if (movableElement.state === 'movable') {
	// 	movableElement.clearEventListener();
	// } else {
	// 	movableElement.initMovable();
	// }
});
