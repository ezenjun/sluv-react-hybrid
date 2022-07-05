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
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { PopUpModal } from '../../components/PopUpModal';
import { ReactComponent as AddBinderButton } from '../../assets/Icons/addBinder.svg';
import { ReactComponent as EditBinder } from '../../assets/Icons/DotsThreeVertical.svg';
import { ReactComponent as BinderAddPicture } from '../../assets/Icons/binderAddPicture.svg';

import { SampleItems } from './sampleItems';

import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { PopUpModalState } from '../../recoil/PopUpModal';

export default function Binder() {
	const navigate = useNavigate();
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [binderCnt, setBinderCnt] = useState(2);
	const [currentPage, setCurrentPage] = useState('binder');

	const imageList = [
		{
			src: 'https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
			id: '1',
		},
		{
			src: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '2',
		},
		{
			src: 'https://images.pexels.com/photos/1405773/pexels-photo-1405773.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '3',
		},
		{
			src: 'https://images.pexels.com/photos/269318/pexels-photo-269318.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '4',
		},
		{
			src: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '5',
		},
		{
			src: 'https://images.pexels.com/photos/2575279/pexels-photo-2575279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '6',
		},
		{
			src: 'https://images.pexels.com/photos/1029609/pexels-photo-1029609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '7',
		},
		{
			src: 'https://images.pexels.com/photos/1122414/pexels-photo-1122414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '8',
		},
		{
			src: 'https://images.pexels.com/photos/2698761/pexels-photo-2698761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			id: '9',
		},
	];
	const onAddBinder = () => {
		navigate('./add');
	};
	const onPrimaryBinderClick = () => {
		navigate('./:1');
	};
	const exitEdit = () => {
		setCurrentPage('binder');
	};

	const clickNext = () => {
		setToastMessageBottomPosition('1.625rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage('이미 같은 이름의 바인더가 있어요');

		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	};
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const [isConfirm, setIsConfirm] = useState(false);
	const [binderName, setBinderName] = useState('');
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const setPopUpModalStatusState = useSetRecoilState(PopUpModalState);
	const onEditBinder = () => {
		setBottomMenuStatusState(true);
	};

	const onAlbumClick = () => {
		alert('앨범');
	};
	const onDefaultClick = () => {
		alert('기본 커버');
	};
	const editBinder = () => {
		// alert('수정');
		setCurrentPage('edit');
		setBottomMenuStatusState(false);
	};
	const deleteBinder = () => {
		// alert('삭제');
		setCurrentPage('delete');
		setPopUpModalStatusState(true);
	};
	const cancleDelete = () => {
		setPopUpModalStatusState(false);
		setCurrentPage('binder');
		setBottomMenuStatusState(false);
	};
	const confirmDelete = () => {
		setPopUpModalStatusState(false);
		setBottomMenuStatusState(false);
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`'갖고 싶다아' 바인더가 삭제되었어요`);
		setCurrentPage('binder');
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	};
	const onAddCoverImage = () => {
		setBottomMenuStatusState(true);
	};

	const handleBinderName = e => {
		setBinderName(e.target.value);
		const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]{1,5}$/; // 한글 영문 숫자 1글자 이상 regex
		if (regex.test(e.target.value)) {
			setBinderName(e.target.value);
			setIsConfirm(true);
			console.log(binderName);
		} else {
			setIsConfirm(false);
		}
	};

	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(true);
	}, []);

	return (
		<>
			{currentPage === 'binder' && (
				<MainContainer padding="0 0 3.125rem 0">
					<TopNav>
						<MainText style={{ fontSize: '1.125rem' }} className="centerText">
							바인더
						</MainText>
					</TopNav>
					<FeedContainer>
						<BinderTextWrap>
							<MainText fontsize="1.25rem">내바인더</MainText>
							<SubText color="#8d8d8d" onClick={onAddBinder}>
								바인더 추가
							</SubText>
						</BinderTextWrap>
						<GridItemWrap>
							{binderCnt > 0 ? (
								<>
									<GridItem onClick={onPrimaryBinderClick}>
										<GridImage
											backgroundColor="linear-gradient(180deg, #F0FFF4 -1.86%, #ECEEFF 100%);"
											marginbottom="0.6875rem"
										></GridImage>
										<SubText
											fontsize="1rem"
											fontweight="bold"
											margin="0 0 0.25rem 0 "
										>
											기본 바인더
										</SubText>
										<SubText fontsize="0.75rem">0개 보관중</SubText>
									</GridItem>
									{imageList.map(item => (
										<GridItem key={item.id}>
											<GridImage
												src={item.src}
												marginbottom="0.6875rem"
											></GridImage>
											<GridItemInfo>
												<SubText
													fontsize="1rem"
													fontweight="bold"
													margin="0 0 0.25rem 0 "
												>
													{item.id} 바인더
												</SubText>

												<EditBinder onClick={onEditBinder}></EditBinder>
											</GridItemInfo>
											<SubText fontsize="0.75rem">{item.id}개 보관중</SubText>
										</GridItem>
									))}
								</>
							) : (
								<>
									<GridItem>
										<GridImage
											backgroundColor="#f4f4f4"
											marginbottom="0.6875rem"
										></GridImage>
										<SubText
											fontsize="1rem"
											fontweight="bold"
											margin="0 0 0.25rem 0 "
										>
											기본 바인더
										</SubText>
										<SubText fontsize="0.75rem">0개 보관중</SubText>
									</GridItem>
									<GridItem onClick={onAddBinder}>
										<AddBinder
											backgroundColor="#fbf6ff"
											marginbottom="0.6875rem"
										>
											<AddBinderButton
												style={{ width: '1.875rem', height: '1.875rem' }}
											></AddBinderButton>
											<SubText
												fontsize="0.8125rem"
												margin="0.375rem 0 0.25rem 0"
											>
												나만의 바인더를
											</SubText>
											<SubText fontsize="0.8125rem">만들어봐요!</SubText>
										</AddBinder>
									</GridItem>
								</>
							)}
						</GridItemWrap>
						<BottomSlideMenu>
							<SubText fontsize="1rem" margin="0.9375rem 0" onClick={editBinder}>
								바인더 수정하기
							</SubText>
							<SubText fontsize="1rem" margin="0.9375rem 0" onClick={deleteBinder}>
								바인더 삭제하기
							</SubText>
						</BottomSlideMenu>
					</FeedContainer>
				</MainContainer>
			)}

			{currentPage === 'edit' && (
				<MainContainer padding="0 0 0 0">
					<TopNav style={{ justifyContent: 'space-between' }}>
						<BackButton onClick={exitEdit} />
						<div className="centerText">바인더 수정하기</div>

						<div
							className="rightText"
							style={{ color: isConfirm ? '#262626' : '#b1b1b1' }}
							onClick={clickNext}
						>
							완료
						</div>
					</TopNav>
					<FeedContainerEdit>
						<AddImage onClick={onAddCoverImage}>
							<PictureIconBackground>
								<BinderAddPicture
									style={{ width: '2rem', height: '2rem' }}
								></BinderAddPicture>
							</PictureIconBackground>

							<SubText fontweight="normal" color="#b1b1b1">
								커버 이미지 추가
							</SubText>
						</AddImage>
						<BinderName
							placeholder="내 바인더 이름"
							value={binderName}
							type="text"
							onChange={handleBinderName}
						/>
					</FeedContainerEdit>
					<BottomSlideMenu>
						<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onAlbumClick}>
							앨범에서 사진선택
						</SubText>
						<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onDefaultClick}>
							기본 커버 선택
						</SubText>
					</BottomSlideMenu>
				</MainContainer>
			)}
			{currentPage === 'delete' && (
				<PopUpModal closeButton={true}>
					<MainText fontsize="1.125rem" margin="0 0 0.75rem 0">
						선택하신 바인더를 <br />
						삭제하시나요?
					</MainText>
					<SubText fontsize="0.875rem" margin="0 0 2rem 0" color="#8d8d8d">
						선택하신 바인더 내의 아이템도
						<br />
						함께 삭제되어 복구하실 수 없어요
					</SubText>
					<ButtonWrap>
						<Button backgroundColor="#c9c9c9" onClick={cancleDelete}>
							취소
						</Button>
						<Button backgroundColor="#9e30f4" onClick={confirmDelete}>
							삭제
						</Button>
					</ButtonWrap>
				</PopUpModal>
			)}
		</>
	);
}
const FeedContainer = styled.div`
	height: 100vh;
	padding: 1.25rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const BinderTextWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 1rem;
	align-items: center;
`;
const AddBinder = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	text-align: center;
	background-color: #fbf6ff;
	color: #564b5c;
	@media screen and (width: 360px) {
		width: 9.5625rem;
		height: 9.5625rem;
	}
	@media screen and (width: 320px) {
		width: 8.4063rem;
		height: 8.4063rem;
	}
	@media screen and (width: 280px) {
		width: 8.125rem;
		height: 8.125rem;
	}
`;
const GridItemInfo = styled.div`
	display: flex;
	justify-content: space-between;
`;

const FeedContainerEdit = styled.div`
	height: 100vh;
	padding: 4.375rem 1.25rem 1.25rem 1.25rem;
	/* border: 1px solid black; */
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;

const AddImage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: #f6f6f6;
`;
const BinderName = styled.input`
	margin-top: 0.75rem;
	outline: none;
	border: none;
	font-family: Pretendard;
	font-size: 1.25rem;
	font-weight: normal;
	text-align: center;
	width: 9.375rem;
	color: #262626;
	text-decoration: none;
	::placeholder {
		color: #b1b1b1;
	}
	caret-color: #9e30f4;
`;
const PictureIconBackground = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3.125rem;
	height: 3.125rem;
	border-radius: 50%;
	background-color: #ebebeb;
	margin-bottom: 0.375rem;
`;

const TopWrap = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.75rem;
`;

const ButtonWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;
const Button = styled.div`
	background-color: ${props => props.backgroundColor};
	box-sizing: border-box;
	width: 8.9375rem;
	height: 3rem;
	padding: 15px 0;
	font-family: Pretendard;
	font-size: 1rem;
	font-weight: bold;
	border-radius: 1.9rem;
	color: #fff;
`;
