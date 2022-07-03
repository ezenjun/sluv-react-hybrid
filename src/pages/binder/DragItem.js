import React, { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DragItem = memo(({ id, onMoveItem, children }) => {
	const ref = useRef(null);

	const [{ isDragging }, connectDrag] = useDrag({
		item: { id },
		type: 'IMG',
		collect: monitor => {
			return {
				isDragging: monitor.isDragging(),
			};
		},
	});

	const [, connectDrop] = useDrop({
		accept: 'IMG',
		hover(hoveredOverItem) {
			if (hoveredOverItem.id !== id) {
				onMoveItem(hoveredOverItem.id, id);
			}
		},
	});

	connectDrag(ref);
	connectDrop(ref);

	const opacity = isDragging ? 0.5 : 1;
	const transition = isDragging ? '0.5s ease' : 0;
	const containerStyle = { opacity, transition };

	return React.Children.map(children, child =>
		React.cloneElement(child, {
			forwardedRef: ref,
			style: containerStyle,
		})
	);
});

export default DragItem;
