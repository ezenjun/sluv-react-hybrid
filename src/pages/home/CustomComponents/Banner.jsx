import React from 'react';
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

	return (
		<BannerWrap>
			<Banner backgroundcolor={props.color} onClick={onUploadQuestionClick}>
				<BannerText>
					<MainText
						fontsize="1.0625rem"
						fontweight="600"
						color="#fff"
						style={{ lineHeight: '1.28' }}
					>
						오늘 셀럽이 착용한
					</MainText>
					<MainText
						fontsize="1.0625rem"
						fontweight="600"
						color="#fff"
						style={{ lineHeight: '1.28' }}
					>
						저 아이템 정보가 궁금해!
					</MainText>
					<SubText
						fontweight="normal"
						// margin="6px 0 0 0"
						color="rgba(255, 255, 255, 0.8)"
					>
						아이템 정보를 마구마구 물어보세요
					</SubText>
				</BannerText>
				<BannerImg>
					<props.icon style={{ width: '7.8125rem', height: '5.9375rem' }} />
				</BannerImg>
			</Banner>
		</BannerWrap>
	);
};

const BannerWrap = styled.div`
	margin-top: 32px;
	padding: 0 20px;
`;
const Banner = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	height: 6.625rem;
	border-radius: 16px;
	background-color: ${props => props.backgroundcolor};
	/*  */
`;
const BannerText = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	padding: 20px 0 20px 26px;
	flex-direction: column;
`;
const BannerImg = styled.div`
	display: flex;
	align-items: center;
	padding: ${props => props.padding || '0'};
	height: 100%;
	/* padding-top: 5px; */
`;
