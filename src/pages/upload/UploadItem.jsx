import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
	InputSpeechBubbleWrap,
	SpeechBubbleInput,
	SpeechBubbleNoInput,
	SpeechBubbleTextArea,
} from '../../components/Bubbles/InputSpeechBubble';
import { ImgUploadBubbleWrap, SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { TopRadiusContainer } from '../../components/containers/TopRadiusContainer';
import { MainText } from '../../components/Texts/MainText';
import { BottomNavState } from '../../recoil/BottomNav';
import { ChooseCelebCurrentPageState } from '../../recoil/Celebrity';
import { CelebIndexState, UploadCelebState, UploadMemberState } from '../../recoil/Upload';
import SelectUploadCelebContainer from './SelectUploadCelebContainer';
import SelectUploadMemberContainer from './SelectUploadMemberContainer';
import { ReactComponent as InfoIcon } from '../../assets/Icons/binderHelp.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { ReactComponent as Plus } from '../../assets/Icons/img_upload_plus_icon.svg';
import { MiniInfoDialog, TopWrap } from '../binder/AddBinder';
import { SubText } from '../../components/Texts/SubText';
import AWS from 'aws-sdk';
import { REGION, ITEM_UPLOAD_S3_BUCKET } from '../../utils/s3Module';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { ItemFilter } from '../../components/Filters/ItemFilter';
import { filterList } from '../../components/containers/SearchBottomSlideMenu';
import SelectBrandDialog from './dialog/SelectBrandDialog';

export default function UploadItem() {
	const navigate = useNavigate();
	const imgInput = useRef();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const selectedCeleb = useRecoilValue(UploadCelebState);
	const selectedMember = useRecoilValue(UploadMemberState);
	const [ bottomMenuStatusState, setBottomMenuStatusState ] = useRecoilState(BottomMenuStatusState);

	const [infoDialogStatus, setInfoDialogStatus] = useState(false);
	const [selectedFileList, setSelectedFileList] = useState([]);
	const [imgUrlList, setImgUrlList] = useState([]);

	const [productName, setProductName] = useState('');
	const [isProductName, setIsProductName] = useState(false);
	const [place, setPlace] = useState('');
	const [isPlace, setIsPlace] = useState(false);
	const [extraInfo, setExtraInfo] = useState('');
	const [isExtraInfo, setIsExtraInfo] = useState(false);
	const [link, setLink] = useState('');
	const [isLink, setIsLink] = useState(false);

	const [popUpPageNum, setPopUpPageNum] = useState(0);

	AWS.config.update({
		region: REGION,
		accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
	})

	const myBucket = new AWS.S3({
		params: { Bucket: ITEM_UPLOAD_S3_BUCKET },
		region: REGION,
	});

	useEffect(() => {
		setBottomMenuStatusState(false);
		setBottomNavStatus(false);
		setCurrentPage(0);
	}, []);

	const onClickItemCategorySelect = () => {
		setPopUpPageNum(1);
		setBottomMenuStatusState(true);
	};
	const onClickItemBrandSelect = () => {
		setPopUpPageNum(2);
		setBottomMenuStatusState(true);
	};
	const onChangeProductName = (e) => {
		if (e.target.value) {
			setIsProductName(true);
		} else {
			setIsProductName(false);
		}
		setProductName(e.target.value);
	};
	const onChangePlace = (e) => {
		if (e.target.value) {
			setIsPlace(true);
		} else {
			setIsPlace(false);
		}
		setPlace(e.target.value);
	};
	const onChangeExtraInfo = (e) => {
		if (e.target.value) {
			setIsExtraInfo(true);
		} else {
			setIsExtraInfo(false);
		}
		setExtraInfo(e.target.value);
	}
	const onChangeLink = (e) => {
		if (e.target.value) {
			setIsLink(true);
		} else {
			setIsLink(false);
		}
		setLink(e.target.value);
	}

	const onClickItemDateSelect = () => {};
	const onClickItemPriceSelect = () => {
		setPopUpPageNum(4);
		setBottomMenuStatusState(true);
	};
	const onClickItemImgSelect = e => {
		e.preventDefault();
		imgInput.current.click();
	};
	const onChangeImg = (e) => {
		const files = e.target.files;
		console.log(files);
		setSelectedFileList(files);
	};

	const s3ImgUpload = (file) => {
		const params = {
			ACL: 'public-read',
			Body: file,
			Bucket: ITEM_UPLOAD_S3_BUCKET,
			Key: file.name,
			ContentType: 'image/jpeg',
		};

		myBucket
			.putObject(params)
			.on('httpUploadProgress', evt => {
				console.log(evt);
			})
			.on('complete', evt => {
				console.log(evt);
				const temp = [];
				// temp.push({ itemImgUrl: url });
				setImgUrlList(temp);
			})
			.send(err => {
				if (err) console.log(err);
			});
	}

	const onClickUploadItem = async (fileList) => {

		fileList.map((_file) => {
			s3ImgUpload(_file);
		})

		// const body = {
		// 	celebIdx: selectedCeleb.celebIdx,
		// 	memberIdx: 1,
		// 	parentCategory: '상의',
		// 	subCategory: '반소매',
		// 	brandIdx: 1,
		// 	name: '어느브랜드의 어느옷',
		// 	whenDiscovery: '2022-06-30',
		// 	price: 1,
		// 	content: '아 추가 정보에요~',
		// 	sellerSite: 'https://sellerSite.test',
		// 	itemUrlList: [
		// 		{
		// 			isRepresent: 1,
		// 			itemImgUrl: 'https://test-image-01',
		// 		},
		// 		{
		// 			isRepresent: 0,
		// 			itemImgUrl: 'https://test-image-02',
		// 		},
		// 		{
		// 			isRepresent: 0,
		// 			itemImgUrl: 'https://test-image-03',
		// 		},
		// 	],
		// };
	};

	return (
		<>
			{currentPage === 0 && <SelectUploadCelebContainer />}
			{currentPage === 1 && <SelectUploadMemberContainer />}
			{currentPage === 2 && (
				<MainContainer>
					<TopNav style={{ justifyContent: 'space-between' }}>
						<BackButton onClick={() => setCurrentPage(0)} />
						<MainText style={{ fontSize: '1.125rem' }} className="centerText">
							정보 공유하기
						</MainText>
						<div
							className="rightText"
							onClick={() => onClickUploadItem(selectedFileList)}
						>
							등록
						</div>
					</TopNav>

					<TopRadiusContainer
						backgroundColor="linear-gradient(to top, #ffecf0 0%, #f0fff4 102%)"
						style={{ flex: '1', overflowY: 'scroll' }}
					>
						<SpeechBubbleWrap>
							<div>
								{selectedCeleb && (
									<span className="highlight">{selectedCeleb.name}</span>
								)}
								{selectedMember && (
									<span className="highlight"> {selectedMember.name}</span>
								)}
								의
								<br />
								아이템 정보를 공유해 주실 거군요
							</div>
						</SpeechBubbleWrap>
						<NoTailBubbleWrap>
							<div>
								어떤 종류의 아이템 인가요?
								<span className="redStar">*</span>
							</div>
						</NoTailBubbleWrap>
						<InputSpeechBubbleWrap onClick={onClickItemCategorySelect} notEmpty={false}>
							<SpeechBubbleNoInput>아이템 종류를 선택해 주세요</SpeechBubbleNoInput>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>
								어떤 브랜드의 아이템 인가요?
								<span className="redStar">*</span>
							</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap onClick={onClickItemBrandSelect} notEmpty={false}>
							<SpeechBubbleNoInput>브랜드를 선택해 주세요</SpeechBubbleNoInput>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>
								제품명은 무엇인가요?
								<span className="redStar">*</span>
							</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap notEmpty={isProductName}>
							<SpeechBubbleInput
								notEmpty={isProductName}
								type="text"
								placeholder="제품명을 정확하게 입력해주세요"
								value={productName}
								onChange={onChangeProductName}
							/>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>
								언제 해당 아이템을 보셨나요?
								<span className="redStar">*</span>
							</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap onClick={onClickItemDateSelect} notEmpty={false}>
							<SpeechBubbleNoInput>날짜를 선택해 주세요</SpeechBubbleNoInput>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>
								어디서 해당 아이템을 보셨나요?<span className="redStar">*</span>
							</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap notEmpty={isPlace}>
							<SpeechBubbleInput
								notEmpty={isPlace}
								type="text"
								placeholder="Ex) VLive"
								value={place}
								onChange={onChangePlace}
							/>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>
								가격대가 궁금해요
								<span className="redStar">*</span>
							</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap onClick={onClickItemPriceSelect} notEmpty={false}>
							<SpeechBubbleNoInput>가격대를 선택해 주세요</SpeechBubbleNoInput>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>추가 정보를 자유롭게 이야기 해주세요</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap notEmpty={isExtraInfo} style={{ height: '100px' }}>
							<SpeechBubbleTextArea
								notEmpty={isExtraInfo}
								type="text"
								placeholder="내용을 입력해 주세요(최대 1,000자)"
								value={extraInfo}
								onChange={onChangeExtraInfo}
							/>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>아이템 구매가 가능한 링크를 알려주세요</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap notEmpty={isLink}>
							<SpeechBubbleInput
								notEmpty={isLink}
								type="text"
								placeholder="Ex) www.sluv.com"
								value={link}
								onChange={onChangeLink}
							/>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap
							style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center' }}
						>
							<div>이미지는 최대 5장까지 추가할 수 있어요</div>
							<InfoIcon
								onClick={() => setInfoDialogStatus(!infoDialogStatus)}
								style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }}
							/>
							<MiniInfoDialog
								style={{ top: '35px', right: '0' }}
								openStatus={infoDialogStatus}
							>
								<TopWrap>
									<SubText fontweight="bold" fontsize="0.875rem" color="#9E30F4">
										바인더 만들기
									</SubText>
									<Close
										onClick={() => setInfoDialogStatus(!infoDialogStatus)}
									></Close>
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
						</SpeechBubbleWrap>

						<ImgUploadBubbleWrap>
							<UploadButtonWrap onClick={e => onClickItemImgSelect(e)}>
								<Plus style={{ width: '24px', height: '24px' }} />
							</UploadButtonWrap>
							<input
								type="file"
								accept="image/*"
								ref={imgInput}
								style={{ display: 'none' }}
								onChange={onChangeImg}
								multiple
							/>
						</ImgUploadBubbleWrap>
					</TopRadiusContainer>

					{popUpPageNum === 1 && <BottomSlideMenu menu={'아이템 종류'}></BottomSlideMenu>}

					{popUpPageNum === 2 && (
						<BottomSlideMenu menu={'브랜드'}>
							<SelectBrandDialog />
						</BottomSlideMenu>
					)}

					{popUpPageNum === 4 && <BottomSlideMenu menu={'가격대'}></BottomSlideMenu>}
				</MainContainer>
			)}
		</>
	);
}

const NoTailBubbleWrap = styled.div`
	display: inline-block;
	background: ${props => props.backgroundColor || 'white'};
	position: relative;
	padding: 0.9375rem 1.25rem;
	margin-left: 0.5rem;
	margin-top: 0.75rem;
	border-radius: 13px;
	-moz-border-radius: 13px;
	-webkit-border-radius: 13px;
	border: none;
	font-size: 1rem;
	font-weight: 600;
	color: ${props => props.color || '#262626'};

	.redStar {
		color: #ff365f;
	}
`;

const UploadButtonWrap = styled.button`
	width: 5rem;
	height: 5rem;
	border-radius: 13px;
	border: solid 1px #94849d;
	display: flex;
	justify-content: center;
	align-items: center;
`;
