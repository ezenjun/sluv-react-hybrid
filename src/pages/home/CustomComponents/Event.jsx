import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { ReactComponent as FirstEvent } from '../../../assets/Event/FirstEvent.svg';
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
				<div>
					<FirstEvent style={{ height: '100%', width: '100%' }}></FirstEvent>
				</div>
			</Slider>
		</EventContainer>
	);
}

const EventContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 100%;
	box-sizing: border-box;

	/* overflow-x: scroll; */
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
