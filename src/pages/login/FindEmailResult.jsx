import React, { useState, useEffect, useRef } from 'react';
import { Link, useRoutes, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { TopNav } from '../../components/TopNav';
import { PurpleButton } from '../../components/PurpleButton';
import { ReactComponent as LeftArrow } from '../../assets/Icons/left_arrow.svg';
import { ReactComponent as Delete } from '../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../assets/Icons/check_validation.svg';

export default function FindEmailResult() {
	return (
		<MainContainer>
			<TopNav>
				<StyledLink to="/find/email">
					<BackButton>
						<LeftArrow />
					</BackButton>
				</StyledLink>
			</TopNav>
			<ContentWrap>
				<TopWrap>
					<PageLabel>
						<MainText>
							입력하신 번호로 <br />
							찾은 계정 정보에요.
						</MainText>
						<SubText margin="12px 0" color="#8d8d8d">
							개인정보 보호를 위해 뒷자리는 ***로 표시할게요.
						</SubText>
					</PageLabel>
					<SubText margin="12px 0">
						개인정보 보호를 위해 뒷자리는 ***로 표시할게요.
					</SubText>
				</TopWrap>
				<BottomWrap>
					<PurpleButton>로그인으로 돌아가기 </PurpleButton>
				</BottomWrap>
			</ContentWrap>
		</MainContainer>
	);
}

const MainContainer = styled.div`
	display: flex;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
	border: 1px solid black;
	background-color: ${palette.white.primary};
`;
const BackButton = styled.div`
	border: none;
	background-color: transparent;
	padding: none;
	margin: none;
	&:hover {
		cursor: pointer;
	}
`;

const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	height: 100%;
	justify-content: space-between;
`;
const TopWrap = styled.div`
	display: flex;
	flex-direction: column;
`;
const BottomWrap = styled.div``;
const PageLabel = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 26px;
`;
const MainText = styled.span`
	font-size: 24px;
	font-weight: bold;
	color: #262626;
`;
const SubText = styled.span`
	font-family: Pretendard;
	font-size: ${props => props.fontsize || '12px'};
	font-weight: ${props => props.fontweight || '600'};
	color: ${props => props.color || 'black'};
	margin: ${props => props.margin || '0'};
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${props => props.color || 'black'};
	font-family: Pretendard;
	font-size: ${props => props.fontsize || '12px'};
	font-weight: ${props => props.fontweight || 'normal'};
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;
