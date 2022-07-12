import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { MainContainer } from '../../components/containers/MainContainer';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridImage } from '../../components/GridItems/GridImage';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { PopUpModal } from '../../components/PopUp/PopUpModal';
import { ReactComponent as AddBinderButton } from '../../assets/Icons/addBinder.svg';
import { ReactComponent as EditBinder } from '../../assets/Icons/DotsThreeVertical.svg';
import { ReactComponent as BinderAddPicture } from '../../assets/Icons/binderAddPicture.svg';
import { ReactComponent as IconUploadItem } from '../../assets/Icons/bottom_nav_upload_item.svg';
import { ReactComponent as IconUploadQuestion } from '../../assets/Icons/bottom_nav_upload_question.svg';
import { customApiClient } from '../../utils/apiClient';
import { SampleItems } from './sampleItems';

import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { PopUpModalState } from '../../recoil/PopUpModal';
import { UploadPopup, UploadPopupWrap } from '../home';
import { CoverImage } from './AddBinder';

import AWS from 'aws-sdk';
import { BINDER_COVER_IMAGE_S3_BUCKET, REGION } from '../../utils/s3Module';

AWS.config.update({
	region: REGION,
	accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export default function Binder() {
	// Bucket Init
	const myBucket = new AWS.S3({
		params: { Bucket: BINDER_COVER_IMAGE_S3_BUCKET },
		region: REGION,
	});

	// Hooks
	const navigate = useNavigate();
	const coverImgInput = useRef();

	// Global State
	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const uploadPopupStatus = useRecoilValue(UploadPopupState);

	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const setPopUpModalStatusState = useSetRecoilState(PopUpModalState);

	// Local State
	const [currentPage, setCurrentPage] = useState('binder');

	const [isConfirm, setIsConfirm] = useState(false);
	const [binderName, setBinderName] = useState('');
	const [editedCoverImgUrl, setEditedCoverImgUrl] = useState('');
	const [isUploadSuccess, setIsUploadSuccess] = useState(false);
	const [selectedFile, setSelectedFile] = useState('');

	const [editBinderIdx, setEditBinderIdx] = useState(null);
	const [binderEachIndexinList, setBinderEachIndexinList] = useState(null);

	// UseEffect
	useEffect(() => {
		// 하단바 띄워주기
		getBinderList();
		setBottomNavStatus(true);
		console.log(binderList);
	}, []);

	useEffect(() => {
		if (binderName && editedCoverImgUrl && isConfirm && isUploadSuccess) {
			editBinderApi(editBinderIdx);
		}
	}, [binderName, editedCoverImgUrl, isConfirm, isUploadSuccess]);
	
	// Function
	const onAddBinder = () => {
		navigate('./add');
	};

	const onEachBinderClick = (idx, name) => {
		navigate(`./${idx}`, { state: name });
	};
	const exitEdit = () => {
		setCurrentPage('binder');
	};
	const onEditBinder = (binderIdx, listIdx) => {
		setBottomMenuStatusState(true);
		setEditBinderIdx(binderIdx);
		setBinderEachIndexinList(listIdx);
		setBinderName('');
	};

	const onAlbumClick = e => {
		e.preventDefault();
		coverImgInput.current.click();
	};
	const onDefaultClick = () => {
		alert('기본 커버');
	};
	const editBinder = () => {
		setCurrentPage('edit');
		setBottomMenuStatusState(false);
		setIsUploadSuccess(false);
	};
	const deleteBinder = () => {
		setCurrentPage('delete');
		setPopUpModalStatusState(true);
	};
	const cancleDelete = () => {
		setPopUpModalStatusState(false);
		setCurrentPage('binder');
		setBottomMenuStatusState(false);
	};
	const confirmDelete = () => {
		getBinderList();
		deleteBInderAPI(editBinderIdx);
	};
	const onEditBinderFinish = () => {
		if (selectedFile) {
			s3ImgUpload(selectedFile);
		} else {
			editBinderApi(editBinderIdx);
		}
	};
	const onAddCoverImage = () => {
		setBottomMenuStatusState(true);
	};

	const handleBinderName = e => {
		setBinderName(e.target.value);
		const regex = /^.{1,20}$/;
		if (regex.test(e.target.value)) {
			setBinderName(e.target.value);
			setIsConfirm(true);
			console.log(binderName);
		} else {
			setIsConfirm(false);
		}
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
		console.log(data.result);
	};
	const deleteBInderAPI = async idx => {
		const data = await customApiClient('patch', `/binders/${idx}/status`);
		const binderIndex = binderList.findIndex(binder => binder.binderIdx === idx);
		const name = binderList[binderIndex].name;
		if (!data) return;
		if (!data.isSuccess) {
			console.log(data.message);
			if (data.code) return;
		} else {
			setPopUpModalStatusState(false);
			setBottomMenuStatusState(false);
			setToastMessageBottomPosition('3.875rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage(`${name} 바인더가 삭제되었어요`);
			getBinderList();
			setCurrentPage('binder');
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
		}
	};

	const s3ImgUpload = file => {
		const params = {
			ACL: 'public-read',
			Body: file,
			Bucket: BINDER_COVER_IMAGE_S3_BUCKET,
			Key: file.name,
			ContentType: 'image/jpeg',
		};
		myBucket
			.putObject(params)
			.on('httpUploadProgress', evt => {
				console.log(evt);
			})
			.on('complete', evt => {
				console.log(
					'https://' +
						evt.request.httpRequest.endpoint.host +
						evt.request.httpRequest.path
				);
				setEditedCoverImgUrl(
					'https://' +
						evt.request.httpRequest.endpoint.host +
						evt.request.httpRequest.path
				);
				setIsUploadSuccess(true);
			})
			.send(err => {
				if (err) console.log(err);
			});
	};

	const editBinderApi = async idx => {
		console.log('patch API 호출 전 마지막 데이터 확인' + binderName);
		console.log('patch API 호출 전 마지막 데이터 확인' + editedCoverImgUrl);
		let body = {};
		if (isUploadSuccess) {
			body = {
				coverImgUrl: editedCoverImgUrl,
				name: binderName,
			};
		} else {
			body = { name: binderName };
		}
		console.log(idx);
		const data = await customApiClient('patch', `/binders/${idx}`, body);
		console.log(data);

		if (!data) return;
		if (!data.isSuccess) {
			if (data.code === 3080) {
				setToastMessageBottomPosition('3.875rem');
				setToastMessageWrapStatus(true);
				setToastMessageStatus(true);
				setToastMessage(`이미 같은 이름의 바인더가 있어요`);
				setCurrentPage('edit');
				setTimeout(() => {
					setToastMessageStatus(false);
				}, 2000);
				setTimeout(() => {
					setToastMessageWrapStatus(false);
				}, 2300);
			}
			return;
		} else {
			setToastMessageBottomPosition('3.875rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage(`바인더 이름이 변경되었어요`);
			setCurrentPage('edit');
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
			setCurrentPage('binder');
			getBinderList();
		}
	};

	const onChangeCoverImg = e => {
		const file = e.target.files[0];

		if (!file) return;

		setSelectedFile(file);

		const imgEL = document.querySelector('.img__box');
		const reader = new FileReader();
		reader.onload = () => (imgEL.style.backgroundImage = `url(${reader.result})`);
		reader.readAsDataURL(file);

		setBottomMenuStatusState(false);
	};

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
							{binderList.length > 1 ? ( // 생성 바인더 존재하는 경우
								<>
									{binderList.map((item, index) => (
										<>
											{item.isBasic === 0 ? ( // 기본 바인더
												<GridItem key={item.binderIdx}>
													<GridImage
														backgroundColor="linear-gradient(180deg, #F0FFF4 -1.86%, #ECEEFF 100%);"
														marginbottom="0.6875rem"
														onClick={() =>
															onEachBinderClick(
																item.binderIdx,
																item.name
															)
														}
													></GridImage>
													<SubText
														fontsize="1rem"
														fontweight="bold"
														margin="0 0 0.25rem 0 "
													>
														{item.name}
													</SubText>
													<SubText fontsize="0.75rem">
														{item.dibCount} 개 보관중
													</SubText>
												</GridItem>
											) : (
												//생성 바인더들
												<GridItem key={item.binderIdx}>
													<GridImage
														src={item.coverImgUrl}
														marginbottom="0.6875rem"
														onClick={() =>
															onEachBinderClick(
																item.binderIdx,
																item.name
															)
														}
													></GridImage>
													<GridItemInfo>
														<SubText
															fontsize="1rem"
															fontweight="bold"
															margin="0 0.125rem 0.25rem 0 "
															style={{ whiteSpace: 'normal' }}
														>
															{item.name}
														</SubText>

														<EditBinder
															onClick={() =>
																onEditBinder(item.binderIdx, index)
															}
														></EditBinder>
													</GridItemInfo>
													<SubText fontsize="0.75rem">
														{item.dibCount}개 보관중
													</SubText>
												</GridItem>
											)}
										</>
									))}
								</>
							) : (
								// 기본 바인더만 존재할때
								<>
									{binderList.map(item => (
										<>
											<GridItem key={item.binderIdx}>
												<GridImage
													backgroundColor="#f4f4f4"
													marginbottom="0.6875rem"
													onClick={() =>
														onEachBinderClick(item.binderIdx, item.name)
													}
												></GridImage>
												<SubText
													fontsize="1rem"
													fontweight="bold"
													margin="0 0 0.25rem 0 "
												>
													{item.name}
												</SubText>
												<SubText fontsize="0.75rem">
													{item.dibCount}개 보관중
												</SubText>
											</GridItem>
											<GridItem onClick={onAddBinder}>
												<AddBinder
													backgroundColor="#fbf6ff"
													marginbottom="0.6875rem"
												>
													<AddBinderButton
														style={{
															width: '1.875rem',
															height: '1.875rem',
														}}
													></AddBinderButton>
													<SubText
														fontsize="0.8125rem"
														margin="0.375rem 0 0.25rem 0"
													>
														나만의 바인더를
													</SubText>
													<SubText fontsize="0.8125rem">
														만들어봐요!
													</SubText>
												</AddBinder>
											</GridItem>
										</>
									))}
								</>
							)}
						</GridItemWrap>
						<BottomSlideMenu>
							<SubText
								fontsize="1rem"
								margin="0.9375rem 0"
								onClick={() => editBinder(editBinderIdx)}
							>
								바인더 수정하기
							</SubText>
							<SubText
								fontsize="1rem"
								margin="0.9375rem 0"
								onClick={() => deleteBinder(editBinderIdx)}
							>
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
							onClick={() => onEditBinderFinish(editBinderIdx)}
						>
							완료
						</div>
					</TopNav>
					<FeedContainerEdit>
						<AddImage
							onClick={onAddCoverImage}
							src={binderList[binderEachIndexinList].coverImgUrl}
						>
							<CoverImage className="img__box" />
						</AddImage>
						<input
							type="file"
							accept="image/*"
							ref={coverImgInput}
							style={{ display: 'none' }}
							onChange={onChangeCoverImg}
						/>
						<BinderName
							placeholder={binderList[binderEachIndexinList].name}
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
				<PopUpModal closeButton={true} closeFunction={cancleDelete}>
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

			{/* 업로드 팝업 모달 */}
			<UploadPopupWrap openStatus={uploadPopupStatus}>
				<UploadPopup>
					<div onClick={() => navigate('/upload/item')} className="uploadPopupBtn topBtn">
						<IconUploadItem
							style={{
								width: '1.125rem',
								height: '1.125rem',
								marginRight: '0.5rem',
							}}
						/>
						<span>정보 공유하기</span>
					</div>
					<div
						onClick={() => navigate('/upload/question')}
						className="uploadPopupBtn bottomBtn"
					>
						<IconUploadQuestion
							style={{
								width: '1.125rem',
								height: '1.125rem',
								marginRight: '0.5rem',
							}}
						/>
						<span>질문 올리기</span>
					</div>
					<div
						style={{
							width: '20px',
							height: '20px',
							backgroundColor: '#9e30f4',
							position: 'absolute',
							left: '50%',
							transform: 'translate(-50%,0)',
							bottom: '-10px',
							borderRadius: '50%',
						}}
					></div>
				</UploadPopup>
			</UploadPopupWrap>
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
	/* background-color: #f6f6f6; */
	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
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
	background-color: grey;
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
	width: 47%;
	height: 3rem;
	padding: 0.9375rem 0;
	font-family: Pretendard;
	font-size: 1rem;
	font-weight: bold;
	border-radius: 1.9rem;
	color: #fff;
`;
