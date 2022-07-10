import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
export function EventComponent() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'linear',
		arrows: true,
	};

	return (
		<EventContainer>
			<Slider {...settings}>
				<Events>이벤트 배너</Events>
				<Events bg="red">이벤트 배너</Events>
				<Events>이벤트 배너</Events>
				<Events bg="red">이벤트 배너</Events>
			</Slider>
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
