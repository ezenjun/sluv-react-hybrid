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
import { ReactComponent as NoUploadItemIcon } from '../../assets/Icons/icon_no_upload_item.svg';
import { ReactComponent as PinkBinder } from '../../assets/Binder/PinkBinder.svg';
import { ReactComponent as YellowBinder } from '../../assets/Binder/YellowBinder.svg';
import { ReactComponent as GreenBinder } from '../../assets/Binder/GreenBinder.svg';
import { ReactComponent as BlueBinder } from '../../assets/Binder/BlueBinder.svg';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import Loading from '../../components/Loading';
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
		// setBottomMenuStatusState(true);
	};
	const getOpenStatus = input => {
		setOpenState(input);
	};
	// console.log('셀렉트아이템인덱스', selectedItemIdx);
	const onSelectBinder = binderIdx => {
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
		let tempLatest = myUploadIsDibList;
		for (var i = 0; i < myUploadIsDibList.length; i++) {
			if (state.uploadItemList[i]) {
				if (state.uploadItemList[i].itemIdx === selectedItemIdx) {
					tempLatest[i] = !tempLatest[i];
					setMyUploadIsDibList([...tempLatest]);
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
		let tempLatest = myUploadIsDibList;
		for (var i = 0; i < myUploadIsDibList.length; i++) {
			if (state.uploadItemList[i]) {
				if (state.uploadItemList[i].itemIdx === itemIdx) {
					tempLatest[i] = !tempLatest[i];
					setMyUploadIsDibList([...tempLatest]);
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
			{state.uploadItemList.length <= 0 ? (
				<div style={{ height: '5rem' }}>
					<Loading></Loading>
				</div>
			) : (
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
						<NoUploadItemWrap>
							<NoUploadItemIcon style={{ width: '3.75rem', height: '3.75rem' }} />
							<SubText fontsize="1rem" fontweight="bold" margin="1rem 0 0.4375rem 0">
								업로드한 아이템이 없어요
							</SubText>
							<SubText
								fontsize="0.875rem"
								fontweight="400"
								color="#8D8D8D"
								style={{ textAlign: 'center' }}
							>
								좋아하는 셀럽의 아이템 정보를
								<br />
								업로드하고 공유해보아요
							</SubText>
							<Chip onClick={() => navigate('/upload/item')}>
								아이템 업로드 하러가기
							</Chip>
						</NoUploadItemWrap>
					)}
				</ContentWrap>
			)}

			<BottomSlideMenu open={openState} getOpenStatus={getOpenStatus}>
				<RowWrap
					style={{ marginBottom: '0' }}
					onClick={() => onCreateBinder(selectedItemIdx)}
				>
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
				<BinderOverflow>
					{binderList.map(binder => (
						<RowWrap key={binder.name} onClick={() => onSelectBinder(binder.binderIdx)}>
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
				</BinderOverflow>
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
	background: url(${props => props.src});
	background-position: 50%;
	background-size: cover;
	background-color: #f6f6f6;
	border-radius: 0.8125rem;
	margin-right: 1.25rem;
`;

export const NoUploadItemWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 11.25rem;
`;

const Chip = styled.div`
	display: inline-block;
	box-sizing: border-box;
	padding: 0.625rem 1.625rem;
	border-radius: 1.9rem;
	background-color: #fbf6ff;
	color: #9e30f4;
	font-size: 0.875rem;
	font-weight: 600;
	margin-top: 1.25rem;
`;
const BinderOverflow = styled.div`
	max-height: 24.6875rem;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
