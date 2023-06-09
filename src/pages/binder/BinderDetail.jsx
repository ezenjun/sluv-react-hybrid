import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';

import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { PopUpModal } from '../../components/PopUp/PopUpModal';

import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { PopUpModalState } from '../../recoil/PopUpModal';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { customApiClient } from '../../utils/apiClient';

import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { MainContainer } from '../../components/containers/MainContainer';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridImage } from '../../components/GridItems/GridImage';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';

import { ReactComponent as BinderEmpty } from '../../assets/Icons/BinderEmpty.svg';
import { ReactComponent as CheckEmpty } from '../../assets/Icons/checkEmpty.svg';
import { ReactComponent as CheckFull } from '../../assets/Icons/checkFull.svg';
import { ReactComponent as PlusButton } from '../../assets/Icons/plusButton.svg';
import { ReactComponent as MoveBinderGrey } from '../../assets/Icons/moveBinderGrey.svg';
import { ReactComponent as DeleteBinderGrey } from '../../assets/Icons/deleteBinderGrey.svg';
import { ReactComponent as MoveBinderWhite } from '../../assets/Icons/moveBinderWhite.svg';
import { ReactComponent as DeleteBinderWhite } from '../../assets/Icons/deleteBinderWhite.svg';
import { ReactComponent as PinkBinder } from '../../assets/Binder/PinkBinder.svg';
import { ReactComponent as YellowBinder } from '../../assets/Binder/YellowBinder.svg';
import { ReactComponent as GreenBinder } from '../../assets/Binder/GreenBinder.svg';
import { ReactComponent as BlueBinder } from '../../assets/Binder/BlueBinder.svg';

export default function BinderDetail() {
	const navigate = useNavigate();
	const params = useParams();
	const location = useLocation();

	const [binderName, setBinderName] = useState('');
	const [dipList, setDipList] = useState([]);
	const [editStatus, setEditStatus] = useState(false);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);

	const [selectedStatusList, setSelectedStatusList] = useState([]);
	const [selectedItemList, setSelectedItemList] = useState([]);

	const setPopUpModalStatusState = useSetRecoilState(PopUpModalState);
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const [binderList, setBinderList] = useState([]);
	const getBinderList = async () => {
		const data = await customApiClient('get', '/binders');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setBinderList(data.result);
	};

	useEffect(() => {
		if (location.state) {
			setBinderName(location.state);
		}
		getDipList(params.idx);
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);

	const eachStatusClick = (index, itemIdx) => {
		if (editStatus) {
			if (selectedStatusList[index]) {
				//선택되어있을 때
				setSelectedItemList(selectedItemList.filter(item => item.itemIdx !== itemIdx));
			} else {
				// 선택 안되어있을 때
				setSelectedItemList([...selectedItemList, { itemIdx: itemIdx }]);
			}
			let temp = selectedStatusList;
			temp[index] = !temp[index];
			setSelectedStatusList(temp);
		} else {
			navigate(`/item/detail/${itemIdx}`);
		}
	};

	//바인더 상세 편집버튼 클릭
	const onEdit = () => {
		setEditStatus(!editStatus);
		setSelectedItemList([]);
		let temp;
		(temp = []).length = selectedStatusList.length;
		temp.fill(false);
		setSelectedStatusList([...temp]);
	};
	// 아이템 선택 후 이동 버튼
	const onMoveItem = () => {
		getBinderList();
		setBottomMenuStatusState(true);
	};
	// 아이템 선택 후 새로운 바인더 생성 후 새 바인더로 이동
	const onCreateBinder = () => {
		navigate('../binder/add', {
			state: { fromBinderIdx: params.idx, selectedList: selectedItemList },
		});
		setBottomMenuStatusState(false);
	};
	// 아이템 선택 후 하단 삭제 버튼
	const onDeleteItem = () => {
		setPopUpModalStatusState(true);
		setEditStatus(false);
	};
	// 아이템 삭제 선택 후 팹업 모달에서 삭제 취소
	const onCancleDelete = () => {
		setPopUpModalStatusState(false);
		setBottomMenuStatusState(false);
	};
	// 아이템 삭제 선택 후 팹업 모달에서 삭제 확인
	const onConfirmDelete = () => {
		setPopUpModalStatusState(false);
		setBottomMenuStatusState(false);
		deleteDipList(params.idx);
	};
	// 바인더 내 찜 목록
	const getDipList = async binderIdx => {
		const data = await customApiClient('get', `/dibs/${binderIdx}`);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setDipList(data.result);
		let temp;
		(temp = []).length = data.result.length;
		temp.fill(false);
		setSelectedStatusList(temp);
	};
	// 바인더 내 선택 찜 삭제
	const deleteDipList = async binderIdx => {
		const body = { itemIdxList: selectedItemList };
		const data = await customApiClient('patch', `/dibs/${binderIdx}`, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage('아이템이 삭제되었어요');
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
		getDipList(params.idx);
	};
	// 바인더 내 선택 찜 타 바인더로 이동
	const onChangeBinder = toidx => {
		MoveDipList(params.idx, toidx);
	};
	const MoveDipList = async (binderIdx, toIdx) => {
		const body = { itemIdxList: selectedItemList };
		const binderIndex = binderList.findIndex(binder => binder.binderIdx === toIdx);
		const name = binderList[binderIndex].name;
		const data = await customApiClient('patch', `/dibs/${binderIdx}/${toIdx}`, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		} else {
			setBottomMenuStatusState(false);
			setToastMessageBottomPosition('3.875rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setEditStatus(false);
			setToastMessage(`아이템이 ${name} 바인더로 이동했어요`);
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
			getDipList(binderIdx);
		}
	};

	return (
		<MainContainer padding="0 0 0 0">
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
				<div className="centerText">{binderName}</div>
			</TopNav>
			{dipList.length > 0 ? (
				<FeedContainer>
					<BinderTextWrap>
						{editStatus ? (
							<>
								{selectedItemList.length > 0 ? (
									<SubText
										color="#8d8d8d"
										fontsize="0.875rem"
										fontweight="normal"
									>
										{selectedItemList.length}개
									</SubText>
								) : (
									<SubText
										color="#8d8d8d"
										fontsize="0.875rem"
										fontweight="normal"
									>
										아이템 선택
									</SubText>
								)}

								<SubText
									color="#8d8d8d"
									fontsize="0.875rem"
									fontweight="normal"
									onClick={onEdit}
								>
									취소
								</SubText>
							</>
						) : (
							<>
								<SubText color="#8d8d8d" fontsize="0.875rem" fontweight="normal">
									{dipList.length}개 보관중
								</SubText>
								<SubText
									color="#8d8d8d"
									fontsize="0.875rem"
									fontweight="normal"
									onClick={onEdit}
								>
									편집
								</SubText>
							</>
						)}
					</BinderTextWrap>
					<ItemWrap>
						{dipList.map((dip, index) => (
							<Item
								key={dip.itemIdx}
								onClick={() => eachStatusClick(index, dip.itemIdx)}
							>
								<Image src={dip.itemImgUrl}>
									<CheckIconWrap showStatus={editStatus}>
										{selectedStatusList[index] ? (
											<CheckFull
												style={{ width: '1.5rem', height: '1.5rem' }}
											></CheckFull>
										) : (
											<CheckEmpty
												style={{ width: '1.5rem', height: '1.5rem' }}
											></CheckEmpty>
										)}
									</CheckIconWrap>

									<ImageText>
										<SubText fontweight="bold" color="white">
											{dip.name}'s
										</SubText>
									</ImageText>
								</Image>
								<SubText
									fontsize="0.875rem"
									fontweight="bold"
									margin="0 0 0.125rem 0 "
								>
									{dip.brandKr}
								</SubText>
								<SubText
									fontweight="normal"
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',

										overflow: 'hidden',
										width: '100%',
									}}
								>
									{dip.itemName}
								</SubText>
							</Item>
						))}
					</ItemWrap>
				</FeedContainer>
			) : (
				<NoItemContainer>
					<IconWrap>
						<BinderEmpty style={{ width: '3.75rem', height: '3.75rem' }}></BinderEmpty>
					</IconWrap>
					<SubText fontsize="1rem" fontweight="bold" margin="1rem 0 0.75rem 0">
						바인더가 비어있어요
					</SubText>
					<SubText
						fontsize="0.875rem"
						fontweight="normal"
						margin="0 0 0.125rem 0"
						color="#8d8d8d"
					>
						좋아하는 셀럽의 아이템을
					</SubText>
					<SubText fontsize="0.875rem" fontweight="normal" color="#8d8d8d">
						저장하여 나만의 바인더를 만들어봐요
					</SubText>
				</NoItemContainer>
			)}
			{editStatus ? (
				<EditBottomNav>
					{selectedItemList.length > 0 ? (
						<>
							<BottomButton onClick={onMoveItem}>
								<MoveBinderWhite></MoveBinderWhite>
								<SubText margin="0.125rem" fontsize="0.625rem" color="white">
									바인더 이동
								</SubText>
							</BottomButton>
							<BottomButton onClick={onDeleteItem}>
								<DeleteBinderWhite></DeleteBinderWhite>
								<SubText margin="0.125rem" fontsize="0.625rem" color="white">
									아이템 삭제
								</SubText>
							</BottomButton>
						</>
					) : (
						<>
							<BottomButton>
								<MoveBinderGrey></MoveBinderGrey>
								<SubText
									margin="0.125rem"
									fontsize="0.625rem"
									color="#f4f4f4"
									style={{ opacity: '0.5' }}
								>
									바인더 이동
								</SubText>
							</BottomButton>
							<BottomButton>
								<DeleteBinderGrey></DeleteBinderGrey>
								<SubText
									margin="0.125rem"
									fontsize="0.625rem"
									color="#f4f4f4"
									style={{ opacity: '0.5' }}
								>
									아이템 삭제
								</SubText>
							</BottomButton>
						</>
					)}
				</EditBottomNav>
			) : (
				<></>
			)}
			<BottomSlideMenu>
				<RowWrap style={{ marginBottom: '0' }} onClick={onCreateBinder}>
					<ImageWrap>
						<PlusButton></PlusButton>
					</ImageWrap>
					<SubText fontsize="1rem" margin="0.9375rem 0">
						바인더 만들기
					</SubText>
				</RowWrap>
				<HorizontalLine
					style={{ marginLeft: '1.25rem', marginRight: '1.25rem' }}
				></HorizontalLine>

				{binderList.map(binder => (
					<RowWrap key={binder.name} onClick={() => onChangeBinder(binder.binderIdx)}>
						{binder.coverImgUrl ? (
							<ImageWrap src={binder.coverImgUrl}></ImageWrap>
						) : (
							<>
								{!binder.isBasic ? (
									<PinkBinder
										style={{
											width: '3.75rem',
											height: '3.75rem',
											marginRight: '1.25rem',
											borderRadius: '1rem',
										}}
									></PinkBinder>
								) : (
									<>
										{binder.binderIdx % 3 === 0 ? (
											<YellowBinder
												style={{
													width: '3.75rem',
													height: '3.75rem',
													marginRight: '1.25rem',
													borderRadius: '1rem',
												}}
											></YellowBinder>
										) : (
											<>
												{binder.binderIdx % 3 === 1 ? (
													<GreenBinder
														style={{
															width: '3.75rem',
															height: '3.75rem',
															marginRight: '1.25rem',
															borderRadius: '1rem',
														}}
													></GreenBinder>
												) : (
													<BlueBinder
														style={{
															width: '3.75rem',
															height: '3.75rem',
															marginRight: '1.25rem',
															borderRadius: '1rem',
														}}
													></BlueBinder>
												)}
											</>
										)}
									</>
								)}
							</>
						)}

						<SubText fontsize="1rem" margin="0.9375rem 0">
							{binder.name}
						</SubText>
						<SubText fontweight="normal" fontsize="1rem" color="#8d8d8d">
							&nbsp;({binder.dibCount})
						</SubText>
					</RowWrap>
				))}
			</BottomSlideMenu>
			<PopUpModal closeButton={true}>
				<MainText fontsize="1.125rem" margin="0 0 0.75rem 0">
					선택하신 아이템을 <br />
					삭제하시나요?
				</MainText>
				<SubText fontsize="0.875rem" margin="0 0 2rem 0" color="#8d8d8d">
					선택하신 아이템은 바인더 내에서
					<br />
					삭제되어 복구하실 수 없어요
				</SubText>
				<ButtonWrap>
					<Button backgroundColor="#c9c9c9" onClick={onCancleDelete}>
						취소
					</Button>
					<Button backgroundColor="#9e30f4" onClick={onConfirmDelete}>
						삭제
					</Button>
				</ButtonWrap>
			</PopUpModal>
		</MainContainer>
	);
}

const FeedContainer = styled.div`
	height: 100vh;
	padding: 1.25rem 1.25rem 0 1.25rem;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const NoItemContainer = styled.div`
	height: 100%;
	padding: 11.25rem 1.25rem 1.25rem 1.25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;
const IconWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
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
	width: 100%;
	justify-items: center;
	flex-grow: none;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: minmax(0, auto);
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;

	/* @media screen and (width: 280px) {
		gap: 0.5rem;
		row-gap: 0.6875rem;
		column-gap: 0.5rem;
	} */
	/* white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis; */
`;
const Item = styled.div`
	display: flex;

	flex-direction: column;
	box-sizing: border-box;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const Image = styled.div`
	position: relative;
	border-radius: 1rem;
	background-color: ${props => props.backgroundColor || '#f6f6f6'};
	background-position: 50%;
	background-size: cover;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	margin-bottom: 0.5rem;

	font-size: 0.8125rem;
	width: 100%;
	:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`;
const ImageText = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	left: 0.625rem;
	bottom: 0.5rem;
`;
const CheckIconWrap = styled.div`
	display: ${props => (props.showStatus ? 'block' : 'none')};
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	width: 1.5rem;
	height: 1.5rem;
	/* background-color: red; */
`;
const EditBottomNav = styled.div`
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 3.125rem;
	background-color: #9e30f4;
`;
const BottomButton = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50%;
`;
const RowWrap = styled.div`
	display: flex;
	width: 100%;
	padding: 0 1.25rem;
	margin-bottom: 1rem;
	box-sizing: border-box;
	text-align: center;
	align-items: center;
`;
const ImageWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.75rem;
	height: 3.75rem;
	background: url(${props => props.src});
	background-position: 50%;
	background-size: cover;
	background-color: #f6f6f6;
	border-radius: 0.8125rem;
	margin-right: 1.25rem;
`;
const ButtonWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;
const Button = styled.div`
	background-color: ${props => props.backgroundColor};
	box-sizing: border-box;
	width: 47%;
	height: 3rem;
	padding: 0.9375rem 0;
	font-family: Pretendard;
	font-size: 1rem;
	font-weight: bold;
	border-radius: 1.9rem;
	color: #fff;
`;
