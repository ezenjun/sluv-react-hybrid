import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';

import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { PopUpModal } from '../../components/PopUpModal';

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

import { ReactComponent as BinderIcon } from '../../assets/Icons/binder40x40.svg';
import { ReactComponent as CheckEmpty } from '../../assets/Icons/checkEmpty.svg';
import { ReactComponent as CheckFull } from '../../assets/Icons/checkFull.svg';
import { ReactComponent as PlusButton } from '../../assets/Icons/plusButton.svg';
import { ReactComponent as MoveBinderGrey } from '../../assets/Icons/moveBinderGrey.svg';
import { ReactComponent as DeleteBinderGrey } from '../../assets/Icons/deleteBinderGrey.svg';
import { ReactComponent as MoveBinderWhite } from '../../assets/Icons/moveBinderWhite.svg';
import { ReactComponent as DeleteBinderWhite } from '../../assets/Icons/deleteBinderWhite.svg';

export default function BinderDetail() {
	const navigate = useNavigate();
	const [editStatus, setEditStatus] = useState(false);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	// const [selectedItemList, setSelectedItemList] = useState([]);
	const [selectedStatusList, setSelectedStatusList] = useState([]);

	const [selectedItemList, setSelectedItemList] = useState([]);
	const eachStatusClick = (index, itemIdx) => {
		console.log('index', index);
		let tempGroup = [];
		if (editStatus) {
			let newArr = selectedStatusList;
			if (selectedStatusList[index]) {
				newArr[index] = false;
				setSelectedStatusList(newArr);
				tempGroup = selectedItemList;
				setSelectedItemList(tempGroup.filter(item => item !== itemIdx));
				console.log(selectedStatusList[index]);
				console.log('selectedItemList', selectedItemList);
			} else {
				// 선택 안되어있을 때
				newArr[index] = true;
				setSelectedStatusList(newArr);

				setSelectedItemList([...selectedItemList, { itemIdx: itemIdx }]);
				console.log(selectedStatusList[index]);
				console.log('selectedItemList', selectedItemList);
			}
		}
	};

	const onMoveItem = () => {
		getBinderList();
		setBottomMenuStatusState(true);
	};
	const onCreateBinder = () => {
		navigate('../binder/add');
		setBottomMenuStatusState(false);
	};

	const onEdit = () => {
		setEditStatus(!editStatus);
	};

	const setPopUpModalStatusState = useSetRecoilState(PopUpModalState);
	const onDeleteItem = () => {
		setPopUpModalStatusState(true);
		setEditStatus(false);
	};

	const cancleDelete = () => {
		setPopUpModalStatusState(false);
		setBottomMenuStatusState(false);
	};

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);
	const params = useParams();
	const confirmDelete = () => {
		setPopUpModalStatusState(false);
		setBottomMenuStatusState(false);
		deleteDipList(params.idx);
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
	};
	const onChangeBinder = toidx => {
		MoveDipList(params.idx, toidx);

		setBottomMenuStatusState(false);
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setEditStatus(false);
		setToastMessage(`아이템이 '바인더이름' 바인더로 이동했어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	};
	const location = useLocation();
	const [binderName, setBinderName] = useState('');

	const [dipList, setDipList] = useState([]);

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
		console.log('SelectedStatusList', selectedStatusList);
	};

	const deleteDipList = async binderIdx => {
		const body = { itemIdxList: selectedItemList };
		const data = await customApiClient('patch', `/dibs/${binderIdx}`, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		getDipList(params.idx);
	};
	const MoveDipList = async (binderIdx, toIdx) => {
		const body = { itemIdxList: selectedItemList };
		const data = await customApiClient('patch', `/dibs/${binderIdx}/${toIdx}`, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		getDipList(binderIdx);
	};

	const [binderList, setBinderList] = useState([]);
	const getBinderList = async () => {
		const data = await customApiClient('get', '/binders');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setBinderList(data.result);
		console.log(binderList);
	};

	useEffect(() => {
		if (location.state) {
			console.log(location.state);
			setBinderName(location.state);
		}
		getDipList(params.idx);
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);
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
								<SubText color="#8d8d8d">{selectedItemList.length}개</SubText>
								<SubText color="#8d8d8d" onClick={onEdit}>
									취소
								</SubText>
							</>
						) : (
							<>
								<SubText color="#8d8d8d">{dipList.length}개 보관중</SubText>
								<SubText color="#8d8d8d" onClick={onEdit}>
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
						<BinderIcon style={{ width: '2.5rem', height: '2.5rem' }}></BinderIcon>
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
				<RowWrap onClick={onCreateBinder}>
					<ImageWrap>
						<PlusButton></PlusButton>
					</ImageWrap>

					<SubText fontsize="1rem" margin="0.9375rem 0">
						바인더 만들기
					</SubText>
				</RowWrap>
				<HorizontalLine></HorizontalLine>
				{binderList.map(binder => (
					<RowWrap key={binder.name} onClick={() => onChangeBinder(binder.binderIdx)}>
						<ImageWrap></ImageWrap>
						<SubText fontsize="1rem" margin="0.9375rem 0">
							{binder.name}
						</SubText>
						<SubText fontweight="normal" fontsize="1rem" color="#8d8d8d">
							{binder.dibCount}
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
					<Button backgroundColor="#c9c9c9" onClick={cancleDelete}>
						취소
					</Button>
					<Button backgroundColor="#9e30f4" onClick={confirmDelete}>
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
	align-items: center;
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
	width: 3.75rem;
	height: 3.75rem;
	align-items: center;
	justify-content: center;
	background-color: #f4f4f4;
	border-radius: 50%;
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
	grid-auto-rows: minmax(0, auto);
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;

	@media screen and (width: 280px) {
		/* gap: 0.5rem; */
		row-gap: 0.6875rem;
		column-gap: 0.5rem;
	}
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
	/* display: flex;
	justify-content: flex-start; */
	/* align-items: flex-end; */
	position: relative;
	border-radius: 1rem;
	background-color: blue;
	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${props => props.src});
	background-repeat: no-repeat;
	background-size: contain;
	margin-bottom: 0.5rem;
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	font-size: 0.8125rem;
	width: 6.5625rem;
	height: 6.5625rem;

	@media screen and (width: 360px) {
		width: 6.25rem;
		height: 6.25rem;
	}
	@media screen and (width: 320px) {
		width: 5.375rem;
		height: 5.375rem;
	}
	@media screen and (width: 280px) {
		width: 4.6875rem;
		height: 4.6875rem;
	}
`;
const ImageText = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	position: absolute;
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
