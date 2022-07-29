import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { MainContainer } from '../../components/containers/MainContainer';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { CoverImage } from './AddBinder';
import { ReactComponent as BinderAddPicture } from '../../assets/Icons/binderAddPicture.svg';
import { ReactComponent as BasicBinder } from '../../assets/Binder/BasicCover.svg';

import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';

import AWS from 'aws-sdk';
import { BINDER_COVER_IMAGE_S3_BUCKET, REGION } from '../../utils/s3Module';

AWS.config.update({
	region: REGION,
	accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});
export default function EditBinder() {
	const navigate = useNavigate();
	const location = useLocation();
	// 기존 바인더 정보
	let { binderIdx } = location.state;
	let { binderName } = location.state;
	let { binderImgUrl } = location.state;

	const [tmpBinderName, setTmpBinderName] = useState();
	const [tmpBinderImgUrl, setTmpBinderImgUrl] = useState();
	const [binderNameChanged, setBinderNameChanged] = useState(false);
	const [binderImgUrlChanged, setBinderImgUrlChanged] = useState(false);
	console.log('binderIdx', binderIdx, 'binderName', binderName, 'binderImgUrl', binderImgUrl);
	useEffect(() => {
		setBottomNavStatus(false);
		if (binderImgUrl) {
			// const imgEL = document.querySelector('.img__box');
			// imgEL.style.backgroundImage = `url(${binderImgUrl})`;
			setTmpBinderImgUrl(binderImgUrl);
		} else {
			setTmpBinderImgUrl('');
		}
		setTmpBinderName(binderName);
	}, []);

	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const coverImgInput = useRef();

	const [selectedFile, setSelectedFile] = useState('');

	const exitEdit = () => {
		navigate('/binder');
	};
	const onEditBinderFinish = () => {
		if (selectedFile) {
			s3ImgUpload(selectedFile);
		} else {
			editBinderApi(binderIdx);
		}
	};
	const [nameValid, setNameValid] = useState(true);
	const handleBinderName = e => {
		const regex = /^.{1,15}$/;
		setTmpBinderName(e.target.value);
		if (regex.test(e.target.value)) {
			setNameValid(true);
			if (e.target.value !== binderName) {
				setBinderNameChanged(true);
			} else {
				setBinderNameChanged(false);
			}
		} else {
			setNameValid(false);
		}
	};
	const editBinderApi = async (idx, editedimgUrl) => {
		let body = {};
		if (selectedFile) {
			// 사진을 다른 사진으로 변경한 경우
			// 바인더 이름도 변경한 경우
			if (binderNameChanged) {
				body = {
					coverImgUrl: editedimgUrl,
					name: tmpBinderName,
				};
				//body: url:새로운 사진 url, name:새로운 바인더 이름
			}
			// 바인더 이름은 변경하지 않은 경우
			else {
				body = {
					coverImgUrl: editedimgUrl,
					name: binderName,
				};
				//body: url:새로운 사진 url, name:기존 바인더 이름
			}
		} else {
			// 사진을 업로드하지 않은 경우

			// 사진을 변경하지 않은 경우
			if (!binderImgUrlChanged) {
				// 바인더 이름을 변경한 경우
				// body: url:기존 사진 url, name:새로운 바인더 이름
				body = {
					coverImgUrl: binderImgUrl,
					name: tmpBinderName,
				};
			} else {
				// 기본 커버로 설정한 경우
				if (binderNameChanged) {
					// 바인더 이름도 변경한 경우
					//body: url:null, name:새로운 바인더 이름
					body = {
						coverImgUrl: '',
						name: tmpBinderName,
					};
				} else {
					// 바인더 이름은 변경하지 않은 경우
					//body: url:null, name:기존 바인더 이름
					body = {
						coverImgUrl: '',
						name: binderName,
					};
				}
			}
		}
		const data = await customApiClient('patch', `/binders/${idx}`, body);

		if (!data) return;
		if (!data.isSuccess) {
			if (data.code === 3080) {
				setToastMessageBottomPosition('3.875rem');
				setToastMessageWrapStatus(true);
				setToastMessageStatus(true);
				setToastMessage(`이미 같은 이름의 바인더가 있어요`);
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
			setToastMessage(`바인더가 수정되었어요`);
			navigate('/binder');
			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
		}
	};
	// Bucket Init
	const myBucket = new AWS.S3({
		params: { Bucket: BINDER_COVER_IMAGE_S3_BUCKET },
		region: REGION,
	});

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
				let editedimgUrl =
					'https://' +
					evt.request.httpRequest.endpoint.host +
					evt.request.httpRequest.path;

				editBinderApi(binderIdx, editedimgUrl);
			})
			.send(err => {
				if (err) console.log(err);
			});
	};
	const onAddCoverImage = () => {
		setBottomMenuStatusState(true);
	};
	const onAlbumClick = e => {
		e.preventDefault();
		coverImgInput.current.click();
	};
	const onDefaultClick = () => {
		setBottomMenuStatusState(false);
		setTmpBinderImgUrl('');
		if (binderImgUrl !== '') {
			setBinderImgUrlChanged(true);
		}
		const imgEL = document.querySelector('.img__box');
		imgEL.style.backgroundImage = null;
	};
	const onChangeCoverImg = e => {
		const file = e.target.files[0];

		if (!file) return;

		setSelectedFile(file);
		const reader = new FileReader();
		reader.onload = () => setTmpBinderImgUrl(reader.result);
		reader.readAsDataURL(file);
		setBinderImgUrlChanged(true);
		setBottomMenuStatusState(false);
	};

	return (
		<MainContainer padding="0 0 0 0">
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={exitEdit} />
				<div className="centerText">바인더 수정하기</div>

				<div
					className="rightText"
					style={{
						color:
							nameValid && (binderNameChanged || binderImgUrlChanged)
								? '#262626'
								: '#b1b1b1',
					}}
					onClick={() =>
						nameValid &&
						(binderNameChanged || binderImgUrlChanged) &&
						onEditBinderFinish(binderIdx)
					}
				>
					완료
				</div>
			</TopNav>
			<FeedContainerEdit>
				{binderImgUrl ? ( // 기존 바인더가 이미지가 존재할 때
					<>
						{tmpBinderImgUrl ? ( // 다른 이미지로 변경
							<>
								<AddImage onClick={onAddCoverImage} src={tmpBinderImgUrl}>
									<PictureIconBackground>
										<BinderAddPicture
											style={{ width: '2rem', height: '2rem' }}
										></BinderAddPicture>
									</PictureIconBackground>
								</AddImage>

								<input
									type="file"
									accept="image/*"
									ref={coverImgInput}
									style={{ display: 'none' }}
									onChange={onChangeCoverImg}
								/>
							</>
						) : (
							// 기본 커버
							<>
								<BasicBinder
									onClick={onAddCoverImage}
									style={{ width: '10.125rem', height: '10.125rem' }}
								></BasicBinder>
								<input
									type="file"
									accept="image/*"
									ref={coverImgInput}
									style={{ display: 'none' }}
									onChange={onChangeCoverImg}
								/>
							</>
						)}
					</>
				) : (
					<>
						{tmpBinderImgUrl ? (
							<>
								<AddImage onClick={onAddCoverImage} src={tmpBinderImgUrl}>
									<PictureIconBackground>
										<BinderAddPicture
											style={{ width: '2rem', height: '2rem' }}
										></BinderAddPicture>
									</PictureIconBackground>
								</AddImage>

								<input
									type="file"
									accept="image/*"
									ref={coverImgInput}
									style={{ display: 'none' }}
									onChange={onChangeCoverImg}
								/>
							</>
						) : (
							<>
								<BasicBinder
									onClick={onAddCoverImage}
									style={{ width: '10.125rem', height: '10.125rem' }}
								></BasicBinder>
								<input
									type="file"
									accept="image/*"
									ref={coverImgInput}
									style={{ display: 'none' }}
									onChange={onChangeCoverImg}
								/>
							</>
						)}
					</>
				)}
				<BinderName
					placeholder={binderName}
					value={tmpBinderName}
					type="text"
					onChange={handleBinderName}
				/>
			</FeedContainerEdit>
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
	background-image: url(${props => props.src});
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
	background-color: #262626;
	opacity: 20%;
	margin-bottom: 0.375rem;
`;
