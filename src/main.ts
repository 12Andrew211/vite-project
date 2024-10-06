import './style.css'

const getMovableElement = (element: HTMLElement) => {
  element.style.position = 'absolute';
  element.addEventListener('mousedown', handleMouseDown);
  document.body.addEventListener('mouseup', handleMouseUp)
};

const handleMouseDown = (event: MouseEvent) => {
  console.log(event);
  event.target?.addEventListener('mousemove', handleMouseMove);
};

const handleMouseMove = (event: Event) => {
  console.log(event);
};

const handleMouseUp = (event: MouseEvent) => {
  document.body .removeEventListener('mousemove', handleMouseMove);
  console.log(event);
}

getMovableElement(document.getElementById('movable')!);