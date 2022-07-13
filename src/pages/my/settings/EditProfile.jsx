import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackButton } from '../../../components/Buttons/BackButton';
import { ContentWrap } from '../../../components/containers/ContentWrap';
import { MainContainer } from '../../../components/containers/MainContainer'
import { TopNav } from '../../../components/containers/TopNav'
import { Input } from '../../../components/Input';
import { MainText } from '../../../components/Texts/MainText';
import { SubText } from '../../../components/Texts/SubText';
import { ReactComponent as Delete } from '../../../assets/Icons/delete_input.svg';
import { ReactComponent as Check } from '../../../assets/Icons/check_validation.svg';
import { ReactComponent as UserBasicProfileImg } from '../../../assets/Icons/user_basic_profile_img.svg';
import { PurpleButton } from '../../../components/Buttons/PurpleButton';
import { useEffect } from 'react';
import AWS from 'aws-sdk';
import { REGION, USER_PROFILE_IMAGE_S3_BUCKET } from '../../../utils/s3Module';
import { customApiClient } from '../../../utils/apiClient';
import { useSetRecoilState } from 'recoil';
import { ToastMessageBottomPositionState, ToastMessageState, ToastMessageStatusState, ToastMessageWrapStatusState } from '../../../recoil/ToastMessage';

AWS.config.update({
	region: REGION,
	accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export default function EditProfile() {
	const navigate = useNavigate();
	const { state } = useLocation();
	console.log(state);
	const profileImgInput = useRef();

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const [nickname, setNickname] = useState('');
	const [profileImgUrl, setProfileImgUrl] = useState('');
	const [newProfileImgUrl, setNewProfileImgUrl] = useState('');
	const [nicknameValid, setNicknameValid] = useState(false);
	const [selectedFile, setSelectedFile] = useState('');

	useEffect(() => {
		setNickname(state.nickName);
		setProfileImgUrl(state.url);
		setNewProfileImgUrl('');
		setNicknameValid(true);

	},[]);

	useEffect(() => {
		if(nickname && newProfileImgUrl) {
			patchUserProfile();
		}
	}, [nickname, newProfileImgUrl]);

	const myBucket = new AWS.S3({
		params: { Bucket: USER_PROFILE_IMAGE_S3_BUCKET },
		region: REGION,
	});

	const onChangeProfileImg = e => {
		const file = e.target.files[0];
		console.log(file);
		if (!file) return;

		setSelectedFile(file);

		const imgEL = document.querySelector('.img__box');
		const reader = new FileReader();
		reader.onload = () => (imgEL.style.backgroundImage = `url(${reader.result})`);
		reader.readAsDataURL(file);
	};


	const onClickProfileChange = (e) => {
		e.preventDefault();
		profileImgInput.current.click();
	}

	const handleNickname = e => {
		setNickname(e.target.value);
		const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/; // 한글 영문 숫자 1글자 이상 regex
		if (regex.test(e.target.value)) {
			setNicknameValid(true);
		} else {
			setNicknameValid(false);
		}
	};

	const s3ImgUpload = file => {
		const params = {
			ACL: 'public-read',
			Body: file,
			Bucket: USER_PROFILE_IMAGE_S3_BUCKET,
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
				setNewProfileImgUrl(
					'https://' +
						evt.request.httpRequest.endpoint.host +
						evt.request.httpRequest.path
				);
			})
			.send(err => {
				if (err) console.log(err);
			});
	};

	const nicknameInputReset = () => {
		setNickname('');
	};

	const patchUserProfile = async () => {
		const body = {
			nickName: nickname,
			profileImgUrl: newProfileImgUrl ? newProfileImgUrl : null,
		};
		console.log(body);
		const data = await customApiClient('patch', '/users/profiles', body);
		console.log(data);
		if(!data) return;
		if(!data.isSuccess) return;

		console.log(data);

		navigate(-1);
	}

	const getCheckNickname = async () => {
		const data = await customApiClient('get', `/users/profiles/nickname-check?nickname=${nickname}`);
		console.log(data);
		if(!data) return;

		if (data.isSuccess) {
			if (selectedFile) {
				s3ImgUpload(selectedFile);
			} else {
				patchUserProfile();
			}
			
		} else if (data.code === 3002) {
			setNicknameValid(false);

			setToastMessageBottomPosition('5.125rem');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);
			setToastMessage('이미 존재하는 닉네임이에요');

			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
		}
	}


	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					프로필 수정
				</MainText>
			</TopNav>
			<ContentWrap style={{ flex: '1' }}>
				<ProfileImgWrap>
					<div
						onClick={onClickProfileChange}
						style={{
							width: '6.25rem',
							height: '100%',
							borderRadius: '50%',
							position: 'relative',
						}}
					>
						{profileImgUrl ? (
							<img
								className="userProfileImg"
								src={profileImgUrl}
								alt="유저 프로필 이미지"
							></img>
						) : (
							<UserBasicProfileImg className="userProfileImg" />
						)}
						<ProfileCoverImage className="img__box userProfileImg" />
					</div>
					<input
						type="file"
						accept="image/*"
						ref={profileImgInput}
						style={{ display: 'none' }}
						onChange={onChangeProfileImg}
					/>
				</ProfileImgWrap>
				<FormWrap style={{ marginTop: '2.5rem' }}>
					<SubText margin="0 0 0.5rem 0">닉네임</SubText>
					<InputWrap valid={nicknameValid} value={nickname}>
						<Input
							value={nickname}
							onChange={handleNickname}
							type="text"
							placeholder="언제든지 수정이 가능해요"
						/>
						{nicknameValid && (
							<IconWrap>
								<Check />
							</IconWrap>
						)}
						{nickname.length !== 0 && !nicknameValid && (
							<IconWrap onClick={nicknameInputReset}>
								<Delete />
							</IconWrap>
						)}
					</InputWrap>
					<ErrorMessage>
						{!nicknameValid && nickname.length !== 0 && (
							<SubText color="#ef0000" fontweight="normal">
								올바른 닉네임을 입력해주세요
							</SubText>
						)}
					</ErrorMessage>
				</FormWrap>
			</ContentWrap>
			<div style={{ margin: '0 1.25rem' }}>
				<PurpleButton onClick={getCheckNickname} style={{ fontSize: '1rem' }}>
					수정 완료
				</PurpleButton>
			</div>
		</MainContainer>
	);
}

const FormWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.625rem;
`;

const InputWrap = styled.div`
	${props =>
		props.valid || props.value.length === 0
			? 'border: 1px solid #e2e0e0;'
			: 'border: 1px solid #ef0000'};
	display: flex;
	align-items: center;
	border-radius: 0.5rem;
	padding: 1rem;
	:focus {
		border: 1px solid #9e30f4;
	}
	&:focus-within {
		border: 1px solid #9e30f4;
	}
`;

const ErrorMessage = styled.div`
	display: flex;
	margin-top: 0.5rem;
`;

const ProfileImgWrap = styled.div`
	margin-top: 2.5rem; 
	height: 6.25rem;
	display: flex; 
	justify-content: center;

	.userProfileImg {
		width: 100%;
		height: 100%;
		position: absolute;
		border-radius: 50%;
	}
`;

const ProfileCoverImage = styled.div`
	position: absolute;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
	width: 100%;
	height: 100%;
	border-radius: 50%;
`;

const IconWrap = styled.div.attrs(props => ({
	className: props.className,
}))`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${props => props.margin || '0'};
	${props =>
		props.button
			? `&:hover {
			cursor: pointer;
		}`
			: ''};
`;



