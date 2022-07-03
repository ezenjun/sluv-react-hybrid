import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { MainContainer } from '../../components/containers/MainContainer';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridImage } from '../../components/GridItems/GridImage';
import img from './img.png';
export default function BinderDetail() {
	const navigate = useNavigate();
	const [isConfirm, setIsConfirm] = useState(false);

	const [binderName, setBinderName] = useState('');
	const clickNext = () => {};
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);
	return (
		<MainContainer padding="0 0 0 0">
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
				<div className="centerText">기본 바인더</div>
			</TopNav>
			<FeedContainer>
				<BinderTextWrap>
					<SubText color="#8d8d8d">5개 보관중</SubText>
					<SubText color="#8d8d8d">편집</SubText>
				</BinderTextWrap>
				<ItemWrap>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									리노's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									현진's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									아이엔's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
					<Item>
						<Image>
							<ImageText>
								<SubText fontsize="0.8125rem" fontweight="bold" color="white">
									필릭스's
								</SubText>
							</ImageText>
						</Image>
						<SubText fontsize="1rem" fontweight="bold" margin="0 0 0.375rem 0 ">
							마하그리드
						</SubText>
						<SubText fontsize="0.8125rem" width="6.5625rem">
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
						</SubText>
					</Item>
				</ItemWrap>
			</FeedContainer>
		</MainContainer>
	);
}
const FeedContainer = styled.div`
	height: 100vh;
	padding: 1.25rem 1.25rem 1.25rem;
	border: 1px solid black;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const BinderTextWrap = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 1rem;
`;
const ItemWrap = styled.div`
	display: grid;
	justify-items: center;
	flex-grow: none;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: minmax();
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;
`;
const Item = styled.div`
	display: flex;
	flex-direction: column;
`;
const Image = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	width: 6.5625rem;
	height: 6.5625rem;
	border-radius: 1rem;
	background-color: white;
	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${img});
	background-repeat: no-repeat;
	background-size: contain;
	margin-bottom: 1rem;
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	font-size: 0.8125rem;
	@media screen and (width: 360px) {
		width: 9.5625rem;
		height: 9.5625rem;
	}
	@media screen and (width: 320px) {
		width: 9.375rem;
		height: 9.375rem;
	}
	@media screen and (width: 280px) {
		width: 8.125rem;
		height: 8.125rem;
	}
`;
const ImageText = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;
