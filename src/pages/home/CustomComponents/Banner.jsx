import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';

import { ReactComponent as SpeakerPhone } from '../../../assets/Icons/speakerphone.svg';
import { ReactComponent as BubbleHeart } from '../../../assets/Icons/bubbleHeart.svg';
export const BannerComponent = props => {
	const navigate = useNavigate();
	const onUploadQuestionClick = () => {
		navigate('/upload/question');
	};
	const [windowSize, setWindowSize] = useState(false);
	useEffect(() => {
		if (window.outerWidth <= 280) {
			setWindowSize(true);
		}
	}, []);

	return (
		<BannerWrap>
			<Banner backgroundcolor={props.color} onClick={onUploadQuestionClick}>
				{windowSize ? (
					<BannerText>
						<MainText
							fontsize="1rem"
							fontweight="600"
							color="#fff"
							style={{ lineHeight: '1.28', whiteSpace: 'nowrap' }}
						>
							나누자! 정보!
							<br />
							우리들만의 아지트에서!
						</MainText>
						<SubText
							fontsize="0.625rem"
							fontweight="normal"
							// margin="6px 0 0 0"
							color="rgba(255, 255, 255, 0.8)"
							style={{ whiteSpace: 'nowrap' }}
						>
							최애의 아이템 정보를 공유해 보아요!
						</SubText>
					</BannerText>
				) : (
					<BannerText>
						<MainText
							fontsize="1.0625rem"
							fontweight="600"
							color="#fff"
							style={{ lineHeight: '1.28', whiteSpace: 'nowrap' }}
						>
							나누자! 정보!
							<br />
							우리들만의 아지트에서!
						</MainText>
						<SubText
							fontweight="normal"
							// margin="6px 0 0 0"
							color="rgba(255, 255, 255, 0.8)"
							style={{ whiteSpace: 'nowrap' }}
						>
							최애의 아이템 정보를 공유해 보아요!
						</SubText>
					</BannerText>
				)}

				<BannerImg>
					{windowSize ? (
						<props.icon
							style={{
								marginTop: '0.625rem',
								width: '7.8125rem',
								height: '5.9375rem',
							}}
						/>
					) : (
						<props.icon
							style={{
								marginTop: '0.625rem',
								width: '7.8125rem',
								height: '5.9375rem',
							}}
						/>
					)}
				</BannerImg>
			</Banner>
		</BannerWrap>
	);
};

const BannerWrap = styled.div`
	margin-top: 2rem;
	padding: 0 1.25rem;
`;
const Banner = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	height: 6.625rem;
	border-radius: 1rem;
	background-color: ${props => props.backgroundcolor};
	/*  */
`;
const BannerText = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	padding: 1.25rem 0 1.25rem 1.625rem;
	flex-direction: column;
`;
const BannerImg = styled.div`
	display: flex;
	align-items: center;
	padding: ${props => props.padding || '0'};
	height: 100%;
	/* padding-top: 5px; */
`;
