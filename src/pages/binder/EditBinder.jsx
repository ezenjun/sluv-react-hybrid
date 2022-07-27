import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { customApiClient } from '../../utils/apiClient';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { MainContainer } from '../../components/containers/MainContainer';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { FeedContainerEdit } from './index';
import { CoverImage } from './AddBinder';
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
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const setBottomMenuStatusState = useSetRecoilState(BottomMenuStatusState);
	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const coverImgInput = useRef();

	const [editedCoverImgUrl, setEditedCoverImgUrl] = useState('');
	const [selectedFile, setSelectedFile] = useState('');

	const exitEdit = () => {
		navigate('/binder');
	};
	const onEditBinderFinish = () => {
		if (selectedFile) {
			s3ImgUpload(selectedFile);
		} else {
			// editBinderApi(editBinderIdx);
		}
	};
	const editBinderApi = async idx => {
		// console.log('patch API 호출 전 마지막 데이터 확인' + binderName);
		// console.log('patch API 호출 전 마지막 데이터 확인' + editedCoverImgUrl);
		let body = {};
		// if (selectedFile !== currentBinderImgUrl) {
		// 	// 사진을 다른 사진으로 변경한 경우
		// 	// 바인더 이름도 변경한 경우
		// 	if (checkBinderNameChange) {
		// 		body = {
		// 			coverImgUrl: editedCoverImgUrl,
		// 			name: binderName,
		// 		};
		// 		//body: url:새로운 사진 url, name:새로운 바인더 이름
		// 	}
		// 	// 바인더 이름은 변경하지 않은 경우
		// 	else {
		// 		body = {
		// 			coverImgUrl: editedCoverImgUrl,
		// 			name: binderName,
		// 		};
		// 		//body: url:새로운 사진 url, name:기존 바인더 이름
		// 	}
		// } else {
		// 	// 사진을 업로드하지 않은 경우

		// 	// 사진을 변경하지 않은 경우
		// 	if (currentBinderImgUrl) {
		// 		// 바인더 이름을 변경한 경우
		// 		// body: url:기존 사진 url, name:새로운 바인더 이름
		// 		body = {
		// 			coverImgUrl: currentBinderImgUrl,
		// 			name: binderName,
		// 		};
		// 	} else {
		// 		// 기본 커버로 설정한 경우
		// 		if (checkBinderNameChange) {
		// 			// 바인더 이름도 변경한 경우
		// 			//body: url:null, name:새로운 바인더 이름
		// 			body = {
		// 				coverImgUrl: '',
		// 				name: binderName,
		// 			};
		// 		} else {
		// 			// 바인더 이름은 변경하지 않은 경우
		// 			//body: url:null, name:기존 바인더 이름
		// 			body = {
		// 				coverImgUrl: '',
		// 				name: binderName,
		// 			};
		// 		}
		// 	}
		// }
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
				setEditedCoverImgUrl(
					'https://' +
						evt.request.httpRequest.endpoint.host +
						evt.request.httpRequest.path
				);
				// setIsUploadSuccess(true);
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
		// setCurrentBinderImgUrl('');
		// setSelectedFile('');
		const imgEL = document.querySelector('.img__box');
		imgEL.style.backgroundImage = null;
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

	useEffect(() => {
		setBottomNavStatus(false);
	}, []);
	return (
		<MainContainer padding="0 0 0 0">
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={exitEdit} />
				<div className="centerText">바인더 수정하기</div>

				<div
					className="rightText"
					// style={{ color: isConfirm ? '#262626' : '#b1b1b1' }}
					// onClick={() => onEditBinderFinish(editBinderIdx)}
				>
					완료
				</div>
			</TopNav>
			<FeedContainerEdit>
				<AddImage onClick={onAddCoverImage}>
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
				// placeholder={binderList[binderEachIndexinList].name}
				// value={binderName}
				// type="text"
				// onChange={handleBinderName}
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
