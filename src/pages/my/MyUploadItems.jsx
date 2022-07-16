import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { GridImage } from '../../components/GridItems/GridImage';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { ImageText } from '../../components/ImageText';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { ReactComponent as PlusButton } from '../../assets/Icons/plusButton.svg';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';
import { ReactComponent as BinderRed } from '../../assets/Icons/binderRed.svg';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';

export default function MyUploadItems() {
	const navigate = useNavigate();
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const onDetailItemClick = itemIdx => {
		navigate(`/item/detail/${itemIdx}`);
		// window.location.reload();
	};
	const { state } = useLocation();
	console.log(state);
	const [myUploadIsDibList, setMyUploadIsDibList] = useState([]);
	const [binderList, setBinderList] = useState([]);
	const getBinderList = async () => {
		const data = await customApiClient('get', '/binders');
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		setBinderList(data.result);
		console.log('바인더 리스트', data.result);
	};
	const [openState, setOpenState] = useState(false);
	const onCreateBinder = itemIdx => {
		navigate('/binder/add', {
			state: { item: itemIdx },
		});
	};
	const [selectedItemIdx, setSelectedItemIdx] = useState(0);

	const onAddBinderClick = (e, itemIdx) => {
		e.stopPropagation();
		getBinderList();
		setOpenState(true);
		setSelectedItemIdx(itemIdx);
		console.log(itemIdx);
		console.log('selectedItemIdx', selectedItemIdx);
		// setBottomMenuStatusState(true);
	};
	const getOpenStatus = input => {
		setOpenState(input);
	};
	// console.log('셀렉트아이템인덱스', selectedItemIdx);
	const onSelectBinder = binderIdx => {
		console.log('셀렉트 바인더', selectedItemIdx);

		for (var i = 0; i < binderList.length; i++) {
			if (binderList[i].binderIdx === binderIdx) {
				addToBinderAPI(selectedItemIdx, binderIdx, binderList[i].name);
			}
		}
	};
	const onDeleteBinderClick = (itemIdx, e) => {
		e.stopPropagation();
		DeleteFromBinderAPI(itemIdx);
	};

	async function addToBinderAPI(itemIdx, binderIdx, binderName) {
		const body = {
			itemIdx: itemIdx,
			binderIdx: binderIdx,
		};
		console.log(body);
		const Uri = '/dibs';
		const data = await customApiClient('post', Uri, body);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('latestIsBinderList', myUploadIsDibList);
		let tempLatest = myUploadIsDibList;
		for (var i = 0; i < myUploadIsDibList.length; i++) {
			if (state.uploadItemList[i]) {
				if (state.uploadItemList[i].itemIdx === selectedItemIdx) {
					tempLatest[i] = !tempLatest[i];
					setMyUploadIsDibList([...tempLatest]);
					console.log('clicked');
				}
			}
		}
		setOpenState(false);
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`아이템이 ${binderName} 바인더에 저장됐어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	}
	async function DeleteFromBinderAPI(itemIdx) {
		const Uri = `/dibs/${itemIdx}`;
		const data = await customApiClient('delete', Uri);
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			return;
		}
		console.log('바인더에서 삭제 data.isSuccess', data.isSuccess);
		console.log('latestIsBinderList', myUploadIsDibList);
		let tempLatest = myUploadIsDibList;
		for (var i = 0; i < myUploadIsDibList.length; i++) {
			if (state.uploadItemList[i]) {
				if (state.uploadItemList[i].itemIdx === itemIdx) {
					tempLatest[i] = !tempLatest[i];
					setMyUploadIsDibList([...tempLatest]);
					console.log('clicked');
				}
			}
		}
		setToastMessageBottomPosition('3.875rem');
		setToastMessageWrapStatus(true);
		setToastMessageStatus(true);
		setToastMessage(`아이템이 바인더에서 삭제됐어요`);
		setTimeout(() => {
			setToastMessageStatus(false);
		}, 2000);
		setTimeout(() => {
			setToastMessageWrapStatus(false);
		}, 2300);
	}
	useEffect(() => {
		setBottomNavStatus(false);
		var tmp = [];
		for (var i = 0; i < state.uploadItemList.length; i++) {
			if (state.uploadItemList[i].isDib === 'Y') {
				tmp.push(true);
			} else {
				tmp.push(false);
			}
		}
		setMyUploadIsDibList([...tmp]);
	}, []);

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					나의 아이템 업로드
				</MainText>
			</TopNav>
			<ContentWrap>
				{state.uploadCnt ? (
					<div>
						<div
							style={{
								margin: '1rem 0 0.8125rem',
								fontSize: '0.75rem',
								color: '#8d8d8d',
							}}
						>
							<span style={{ marginRight: '0.25rem' }}>전체</span>
							<span>{state.uploadCnt}</span>
						</div>
						<GridItemWrap>
							{state.uploadItemList.length > 0 &&
								state.uploadItemList.map((item, index) => (
									<GridItem
										key={item.itemIdx}
										onClick={() => onDetailItemClick(item.itemIdx)}
									>
										<GridImage src={item.itemImgUrl}>
											<ImageText>
												<SubText
													fontsize="0.8125rem"
													fontweight="bold"
													color="white"
												>
													{item.name}'s
												</SubText>
												{myUploadIsDibList[index] === true ? (
													<BinderRed
														onClick={e =>
															onDeleteBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												) : (
													<BinderWhite
														onClick={e =>
															onAddBinderClick(e, item.itemIdx)
														}
														style={{
															width: '1.5rem',
															height: '1.5rem',
														}}
													/>
												)}
											</ImageText>
										</GridImage>
										<SubText
											fontsize="1rem"
											fontweight="bold"
											margin="0 0 0.375rem 0 "
										>
											{item.brandKr}
										</SubText>
										<SubText
											style={{
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												width: '100%',
											}}
										>
											{item.itemName}
										</SubText>
									</GridItem>
								))}
						</GridItemWrap>
					</div>
				) : (
					<div>아직 본 아이템이 없어요!!</div>
				)}
			</ContentWrap>
			<BottomSlideMenu open={openState} getOpenStatus={getOpenStatus}>
				<RowWrap onClick={() => onCreateBinder(selectedItemIdx)}>
					<ImageWrap>
						<PlusButton></PlusButton>
					</ImageWrap>
					<SubText fontsize="1rem" margin="0.9375rem 0">
						바인더 만들기
					</SubText>
				</RowWrap>
				<HorizontalLine></HorizontalLine>
				{binderList.map(binder => (
					<RowWrap key={binder.name} onClick={() => onSelectBinder(binder.binderIdx)}>
						<ImageWrap></ImageWrap>
						<SubText fontsize="1rem" margin="0.9375rem 0">
							{binder.name}
						</SubText>
						<SubText fontweight="normal" fontsize="1rem" color="#8d8d8d">
							&nbsp;({binder.dibCount})
						</SubText>
					</RowWrap>
				))}
			</BottomSlideMenu>
		</MainContainer>
	);
}
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
