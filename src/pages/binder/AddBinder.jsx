import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { SubText } from '../../components/Texts/SubText';
import { customApiClient } from '../../utils/apiClient';

import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';

import { ReactComponent as BasicCover } from '../../assets/Binder/BasicCover.svg';
import { ReactComponent as BinderHelp } from '../../assets/Icons/binderHelp.svg';
import { ReactComponent as BinderAddPicture } from '../../assets/Icons/binderAddPicture.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import AWS from 'aws-sdk';
import { BINDER_COVER_IMAGE_S3_BUCKET, REGION } from '../../utils/s3Module';

AWS.config.update({
	region: REGION,
	accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export default function AddBinder() {
	const navigate = useNavigate();
	const location = useLocation();
	const coverImgInput = useRef();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [binderHelpStatus, setBinderHelpStatus] = useState(false);

	const [binderName, setBinderName] = useState('');
	const [isConfirm, setIsConfirm] = useState(false);
	const [selectedFile, setSelectedFile] = useState('');
	const [coverImgUrl, setCoverImgUrl] = useState('');

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);

	console.log(location);

	useEffect(() => {
		if (binderName && coverImgUrl && isConfirm) {
			onPostBinder();
		}
	}, [binderName, coverImgUrl, isConfirm]);

	const myBucket = new AWS.S3({
		params: { Bucket: BINDER_COVER_IMAGE_S3_BUCKET },
		region: REGION,
	});

	const onAlbumClick = e => {
		e.preventDefault();
		coverImgInput.current.click();
		setIsBasicCover(false);
	};
	const [isBasicCover, setIsBasicCover] = useState(false);
	const onDefaultClick = () => {
		setBottomMenuStatusState(false);
		setIsBasicCover(true);
		setSelectedFile('');
		const imgEL = document.querySelector('.img__box');
		imgEL.style.backgroundImage = null;
	};
	const onClickHelp = () => setBinderHelpStatus(!binderHelpStatus);
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

	const handleBinderName = e => {
		const { value, maxLength } = e.target;
		setBinderName(value.slice(0, maxLength));
		const regex = /^.{1,15}$/;
		if (regex.test(e.target.value)) {
			setBinderName(e.target.value);
			setIsConfirm(true);
		} else {
			setIsConfirm(false);
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
				setCoverImgUrl(
					'https://' +
						evt.request.httpRequest.endpoint.host +
						evt.request.httpRequest.path
				);
			})
			.send(err => {
				if (err) console.log(err);
			});
	};

	const onPostBinder = async () => {
		let body = {};
		if (coverImgUrl) {
			body = {
				isBasic: 1,
				name: binderName,
				coverImgUrl: coverImgUrl,
			};
		} else {
			body = {
				isBasic: 1,
				name: binderName,
			};
		}
		const data = await customApiClient('post', '/binders', body);

		if (!data.isSuccess) {
			console.log(data.message);
			if (data.code === 3080) {
				setToastMessageBottomPosition('3.75rem');
				setToastMessageWrapStatus(true);
				setToastMessageStatus(true);
				setToastMessage('이미 같은 이름의 바인더가 있어요');
				setTimeout(() => {
					setToastMessageStatus(false);
				}, 2000);
				setTimeout(() => {
					setToastMessageWrapStatus(false);
				}, 2300);
			}
			return;
		} else {
			const to = data.result.addedBinder;
			console.log();
			if (location.state) {
				// 바인더 생성 후 아이템 저장
				if (location.state.fromBinderIdx) {
					const body = { itemIdxList: location.state.selectedList };
					const data = await customApiClient(
						'patch',
						`/dibs/${location.state.fromBinderIdx}/${to}`,
						body
					);
					if (!data) return;
					if (!data.isSuccess) {
						setBottomMenuStatusState(false);
						setToastMessageBottomPosition('5rem');
						setToastMessageWrapStatus(true);
						setToastMessageStatus(true);
						setToastMessage(`오류가 발생했어요. 다시한번 시도해주세요`);
						setTimeout(() => {
							setToastMessageStatus(false);
						}, 2000);
						setTimeout(() => {
							setToastMessageWrapStatus(false);
						}, 2300);
						return;
					} else {
						setBottomMenuStatusState(false);
						setToastMessageBottomPosition('5rem');
						setToastMessageWrapStatus(true);
						setToastMessageStatus(true);
						setToastMessage(`아이템이 ${binderName} 바인더로 이동했어요`);
						setTimeout(() => {
							setToastMessageStatus(false);
						}, 2000);
						setTimeout(() => {
							setToastMessageWrapStatus(false);
						}, 2300);
						navigate(-1);
					}
				}
				if (location.state.item) {
					const body = {
						itemIdx: location.state.item,
						binderIdx: to,
					};
					const Uri = '/dibs';
					const data = await customApiClient('post', Uri, body);
					if (!data) return;
					if (!data.isSuccess) {
						return;
					}
					setBottomMenuStatusState(false);
					setToastMessageBottomPosition('5rem');
					setToastMessageWrapStatus(true);
					setToastMessageStatus(true);
					setToastMessage(`아이템이 생성된 바인더로 이동했어요`);
					setTimeout(() => {
						setToastMessageStatus(false);
					}, 2000);
					setTimeout(() => {
						setToastMessageWrapStatus(false);
					}, 2300);
					navigate(-1);
				}
			} else {
				navigate('/binder');
				setToastMessageBottomPosition('4.125rem');
				setToastMessageWrapStatus(true);
				setToastMessageStatus(true);
				setToastMessage(`${binderName} 바인더가 생성되었어요`);
				setTimeout(() => {
					setToastMessageStatus(false);
				}, 2000);
				setTimeout(() => {
					setToastMessageWrapStatus(false);
				}, 2300);
			}
		}
	};

	const onMakeBinder = async () => {
		// 이미지 업로드
		if (selectedFile) {
			s3ImgUpload(selectedFile);
		} else {
			onPostBinder();
		}
	};

	const onAddCoverImage = () => {
		setBottomMenuStatusState(true);
	};

	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);

	return (
		<MainContainer padding="0 0 0 0">
			<TopNav
				style={{ justifyContent: 'space-between', position: 'relative', zIndex: '100' }}
			>
				<BackButton onClick={() => navigate(-1)} />
				<div className="centerText">
					바인더 만들기
					<BinderHelp
						style={{ margin: '0 0.25rem', zIndex: '0', position: 'relative' }}
						onClick={onClickHelp}
					></BinderHelp>
					<MiniInfoDialog
						style={{ top: '1.875rem', left: '-50%', zIndex: '1' }}
						openStatus={binderHelpStatus}
					>
						<TopWrap>
							<SubText fontsize="14px" fontweight="600" color="#9E30F4">
								바인더 만들기
							</SubText>
							<Close
								style={{ width: '1rem', height: '1rem' }}
								onClick={onClickHelp}
							></Close>
						</TopWrap>
						<SubText
							fontsize="14px"
							fontweight="normal"
							color="#564B5C"
							margin="0"
							style={{ whiteSpace: 'normal', lineHeight: '1.125rem' }}
						>
							바인더 이름은 15자 이내로 입력이 가능하고, 이름과 커버는 언제든지 수정
							할 수 있어요. 기본 커버의 컬러는 랜덤으로 들어가요!
						</SubText>
					</MiniInfoDialog>
				</div>

				<div
					className="rightText"
					style={{ color: isConfirm ? '#262626' : '#b1b1b1' }}
					onClick={onMakeBinder}
					disabled={!isConfirm}
				>
					완료
				</div>
			</TopNav>
			<FeedContainer>
				<AddImage onClick={onAddCoverImage}>
					{!selectedFile && (
						<>
							{!isBasicCover ? (
								<>
									<PictureIconBackground>
										<BinderAddPicture
											style={{ width: '2rem', height: '2rem' }}
										></BinderAddPicture>
									</PictureIconBackground>

									<SubText fontweight="normal" color="#b1b1b1">
										커버 이미지 추가
									</SubText>
								</>
							) : (
								<BasicCover
									style={{ width: '10.125rem', height: '10.125rem' }}
								></BasicCover>
							)}
						</>
					)}
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
					placeholder="내 바인더 이름"
					value={binderName}
					type="text"
					onChange={handleBinderName}
					maxLength="15"
				/>
			</FeedContainer>
			<BottomSlideMenu>
				<SubText fontsize="1rem" margin="0 0 0.9375rem 0" onClick={onAlbumClick}>
					앨범에서 사진 선택
				</SubText>
				<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onDefaultClick}>
					기본 커버 선택
				</SubText>
			</BottomSlideMenu>
		</MainContainer>
	);
}

const FeedContainer = styled.div`
	height: 100vh;
	padding: 4.375rem 1.25rem 1.25rem 1.25rem;
	/* border: 1px solid black; */
	/* overflow-y: scroll; */
	display: flex;
	flex-direction: column;
	align-items: center;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const AddImage = styled.div`
	display: flex;
	/* position: relative; */
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: #f6f6f6;
`;

export const CoverImage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
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
export const PictureIconBackground = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3.125rem;
	height: 3.125rem;
	border-radius: 50%;
	background-color: #ebebeb;
	margin-bottom: 0.375rem;
`;
export const MiniInfoDialog = styled.div`
	display: ${props => (props.openStatus ? 'flex' : 'none')};
	flex-direction: column;
	position: absolute;
	text-align: start;
	z-index: 20;
	box-sizing: border-box;
	margin-top: 0.4063rem;
	width: 15rem;
	padding: 0.9375rem 0.75rem 0.9375rem 0.9375rem;
	border-radius: 0.8125rem;
	border: solid 1px #9e30f4;
	background-color: #fbf6ff;
	word-break: keep-all;
`;
export const TopWrap = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	margin-bottom: 10px;
`;
