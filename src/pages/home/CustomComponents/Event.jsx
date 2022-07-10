import React from 'react';
import styled from 'styled-components';
function EventComponent() {
	return (
		<EventContainer>
			<Events>이벤트 배너</Events>
			<Events bg="red">이벤트 배너</Events>
			<Events>이벤트 배너</Events>
			<Events bg="red">이벤트 배너</Events>
		</EventContainer>
	);
}

const EventContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 100%;
	box-sizing: border-box;
	height: 400px;
	overflow-x: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const Events = styled.div`
	height: 400px;
	width: 100%;
	box-sizing: border-box;
	background-color: ${props => props.bg || 'pink'};
`;

export default EventComponent;
