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
	};
	const onDefaultClick = () => {
		alert('기본 커버');
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
		const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]{1,15}$/; // 한글 영문 숫자 1글자 이상 regex
		if (regex.test(e.target.value)) {
			setBinderName(e.target.value);
			setIsConfirm(true);
			console.log(binderName);
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
				console.log('3080', data.message);
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
			}
			return;
		} else {
			// navigate('/binder');
			const to = data.result.addedBinder;
			if (location.state) {
				const body = { itemIdxList: location.state.selectedList };
				const data = await customApiClient(
					'patch',
					`/dibs/${location.state.fromBinderIdx}/${to}`,
					body
				);
				if (!data) return;
				if (!data.isSuccess) {
					console.log(data.message);
					console.log(data.code);
					return;
				} else {
					setBottomMenuStatusState(false);
					setToastMessageBottomPosition('3.875rem');
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
			} else {
				navigate(-1);
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
			<TopNav style={{ justifyContent: 'space-between', zIndex: '10001' }}>
				<BackButton onClick={() => navigate(-1)} />
				<div className="centerText">
					바인더 만들기
					<BinderHelp style={{ margin: '0 0.25rem' }} onClick={onClickHelp}></BinderHelp>
					<MiniInfoDialog
						style={{ top: '1.875rem', left: '-4.375rem' }}
						openStatus={binderHelpStatus}
					>
						<TopWrap>
							<SubText fontweight="bold" fontsize="0.875rem" color="#9E30F4">
								바인더 만들기
							</SubText>
							<Close onClick={onClickHelp}></Close>
						</TopWrap>
						<SubText
							fontsize="0.875rem"
							color="#564B5C"
							style={{ whiteSpace: 'normal' }}
						>
							바인더 이름은 15자 이내로 입력해 주세요! <br />
							이름과 커버 이미지는 언제 든지 수정이 가능해요
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
							<PictureIconBackground>
								<BinderAddPicture
									style={{ width: '2rem', height: '2rem' }}
								></BinderAddPicture>
							</PictureIconBackground>

							<SubText fontweight="normal" color="#b1b1b1">
								커버 이미지 추가
							</SubText>
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
				/>
			</FeedContainer>
			<BottomSlideMenu>
				<div style={{ padding: '0.9375rem 0' }}>
					<SubText fontsize="1rem" onClick={onAlbumClick}>
						앨범에서 사진선택
					</SubText>
				</div>
				<div style={{ padding: '0.9375rem 0' }}>
					<SubText fontsize="1rem" margin="0.9375rem 0" onClick={onDefaultClick}>
						기본 커버 선택
					</SubText>
				</div>
			</BottomSlideMenu>
		</MainContainer>
	);
}

const FeedContainer = styled.div`
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
	/* position: relative; */
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 10.125rem;
	height: 10.125rem;
	border-radius: 1rem;
	background-color: #f6f6f6;
`;

const CoverImage = styled.div`
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
export const MiniInfoDialog = styled.div`
	display: ${props => (props.openStatus ? 'block' : 'none')};
	position: absolute;
	text-align: start;
	z-index: 10000;

	margin-top: 0.4063rem;
	width: 14.9375rem;
	padding: 1rem;
	border-radius: 0.8125rem;
	border: solid 1px #9e30f4;
	background-color: #fbf6ff;
	word-break: keep-all;
`;
export const TopWrap = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.75rem;
`;
