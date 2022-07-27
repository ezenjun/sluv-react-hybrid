import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { BottomNavState, UploadPopupState } from '../../recoil/BottomNav';
import { ChooseCelebCurrentPageState } from '../../recoil/Celebrity';
import { CelebIndexState, UploadCelebState, UploadMemberState } from '../../recoil/Upload';
import SelectUploadCelebContainer from './SelectUploadCelebContainer';
import SelectUploadMemberContainer from './SelectUploadMemberContainer';
import { ReactComponent as InfoIcon } from '../../assets/Icons/binderHelp.svg';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { ReactComponent as Plus } from '../../assets/Icons/img_upload_plus_icon.svg';
import { ReactComponent as ImgDelete } from '../../assets/Icons/icon_preview_img_delete.svg';
import PopupBackgroundGradient from '../../assets/Containers/popup_background_gradient.svg';
import { MiniInfoDialog, TopWrap } from '../binder/AddBinder';
import { SubText } from '../../components/Texts/SubText';
import AWS from 'aws-sdk';
import { REGION, ITEM_UPLOAD_S3_BUCKET } from '../../utils/s3Module';
import { BottomSlideMenu } from '../../components/containers/BottomSlideMenu';
import { BottomMenuStatusState } from '../../recoil/BottomSlideMenu';
import { ButtonWrap, filterList } from '../../components/containers/SearchBottomSlideMenu';
import SelectBrandDialog from './dialog/SelectBrandDialog';
import SelectItemCategoryDialog from './dialog/SelectItemCategoryDialog';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { PriceFilter } from '../../components/Filters/PriceFilter';
import { DatePicker } from 'antd-mobile';
import { customApiClient } from '../../utils/apiClient';
import {
	ToastMessageBottomPositionState,
	ToastMessageState,
	ToastMessageStatusState,
	ToastMessageWrapStatusState,
} from '../../recoil/ToastMessage';
import { ModalWrap, WholePage } from '../../components/PopUp/PopUpModal';

export default function UploadItem() {
	const navigate = useNavigate();
	const imgInput = useRef();
	const { state } = useLocation();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [selectedCeleb, setSelectedCeleb] = useRecoilState(UploadCelebState);
	const [selectedMember, setSelectedMember] = useRecoilState(UploadMemberState);
	const [bottomMenuStatusState, setBottomMenuStatusState] = useRecoilState(BottomMenuStatusState);
	const [uploadPopupStatus, setUploadPopupStatus] = useRecoilState(UploadPopupState);

	const setToastMessageBottomPosition = useSetRecoilState(ToastMessageBottomPositionState);
	const setToastMessageWrapStatus = useSetRecoilState(ToastMessageWrapStatusState);
	const setToastMessageStatus = useSetRecoilState(ToastMessageStatusState);
	const setToastMessage = useSetRecoilState(ToastMessageState);

	const [infoDialogStatus, setInfoDialogStatus] = useState(false);
	const [selectedFileList, setSelectedFileList] = useState([]);
	const [imgUrlList, setImgUrlList] = useState([]);
	const [previewImgUrlList, setPreviewImgUrlList] = useState([]);
	const [isImgUploadComplete, setIsImgUploadComplete] = useState(false);
	const [checkedElement, setCheckedElement] = useState(0);

	const [productName, setProductName] = useState('');
	const [isProductName, setIsProductName] = useState(false);
	const [place, setPlace] = useState('');
	const [isPlace, setIsPlace] = useState(false);
	const [extraInfo, setExtraInfo] = useState('');
	const [isExtraInfo, setIsExtraInfo] = useState(false);
	const [link, setLink] = useState('');
	const [isLink, setIsLink] = useState(false);
	const [brand, setBrand] = useState('');
	const [brandObj, setBrandObj] = useState({});
	const [isBrand, setIsBrand] = useState(false);
	const [category, setCategory] = useState('');
	const [isCategory, setIsCategory] = useState(false);
	const [price, setPrice] = useState('');
	const [isPrice, setIsPrice] = useState(false);
	const [date, setDate] = useState('');
	const [isDate, setIsDate] = useState(false);
	const [isUploadConfirm, setIsUploadConfirm] = useState(false);

	const [selectedItemMainFilter, setSelectedItemMainFilter] = useState(0);
	const [selectedItemSubFilter, setSelectedItemSubFilter] = useState(0);
	const [selectedPriceMainFilter, setSelectedPriceMainFilter] = useState(null);
	const [selectedPriceMainFilterIdx, setSelectedPriceMainFilterIdx] = useState(0);
	const [visible, setVisible] = useState(false);

	const [popUpPageNum, setPopUpPageNum] = useState(0);
	const [confirmPopupStatus, setConfirmPopupStatus] = useState(false);

	const now = new Date();

	const labelRenderer = useCallback((type, data) => {
		switch (type) {
			case 'year':
				return data + '년';
			case 'month':
				return data + '월';
			case 'day':
				return data + '일';
			case 'hour':
				return data + '时';
			case 'minute':
				return data + '分';
			case 'second':
				return data + '秒';
			default:
				return data;
		}
	}, []);

	AWS.config.update({
		region: REGION,
		accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
	});

	const myBucket = new AWS.S3({
		params: { Bucket: ITEM_UPLOAD_S3_BUCKET },
		region: REGION,
	});

	useEffect(() => {
		if(state) {
			console.log(state);
			setSelectedCeleb({
				celebIdx: state.celebIdx,
				name: state.celebName,
			});
			setSelectedMember({
				memberIdx: state.memberIdx,
				name: state.memberName,
			});
			setSelectedItemMainFilter(state.parentCategory);
			setSelectedItemSubFilter(state.subCategory);
			setCategory(state.parentCategory + ' > ' + state.subCategory);
			setIsCategory(true);
			setBrand(state.brandKr);
			setBrandObj({ brandIdx : state.brandIdx});
			setIsBrand(true);
			setProductName(state.itemName);
			setIsProductName(true);
			setDate(state.whenDiscovery);
			setIsDate(true);
			setPlace(state.whereDiscovery);
			setIsPlace(true);
			setPrice(state.price);
			setIsPrice(true);
			setSelectedPriceMainFilterIdx(state.priceNumber);
			setExtraInfo(state.content);
			setIsExtraInfo(state.content ? true : false);
			setLink(state.sellerSite);
			setIsLink(state.sellerSite ? true : false);

			setCurrentPage(2);
		} else {
			setCurrentPage(0);
		}

		setBottomMenuStatusState(false);
		setBottomNavStatus(false);
		setIsImgUploadComplete(false);
		
	}, []);

	useEffect(() => {
		console.log('상위 카테고리 : ', selectedItemMainFilter);
		console.log('하위 카테고리 : ', selectedItemSubFilter);
		console.log('브랜드', brandObj.brandIdx);
		console.log('제품명', productName);
		console.log('날짜', date);
		console.log('장소', place);
		console.log('가격', selectedPriceMainFilterIdx);
		console.log('이미지미리보기리스트', previewImgUrlList);

		if (
			selectedItemMainFilter &&
			selectedItemSubFilter &&
			brandObj.brandIdx &&
			productName &&
			date &&
			place &&
			selectedPriceMainFilterIdx &&
			previewImgUrlList.length > 0
		) {
			setIsUploadConfirm(true);
		} else {
			setIsUploadConfirm(false);
		}
	}, [
		selectedItemMainFilter,
		selectedItemSubFilter,
		brandObj,
		productName,
		date,
		place,
		selectedPriceMainFilterIdx,
		previewImgUrlList,
	]);

	useEffect(() => {
		isImgUploadComplete && onPostUpload();
	}, [isImgUploadComplete]);

	const onClickItemCategorySelect = () => {
		setPopUpPageNum(1);
		setBottomMenuStatusState(true);
	};
	const onClickItemBrandSelect = () => {
		setPopUpPageNum(2);
		setBottomMenuStatusState(true);
	};

	const getSelectedItemMainFilter = input => setSelectedItemMainFilter(input);
	const getSelectedItemSubFilter = input => setSelectedItemSubFilter(input);
	const getSelectedPriceMainFilter = input => setSelectedPriceMainFilter(input);
	const getSelectedPriceMainFilterIdx = input => setSelectedPriceMainFilterIdx(input);

	const onChangeProductName = e => {
		setProductName(e.target.value);
		if (e.target.value) {
			setIsProductName(true);
		} else {
			setIsProductName(false);
		}
	};
	const onChangePlace = e => {
		if (e.target.value) {
			setIsPlace(true);
		} else {
			setIsPlace(false);
		}
		setPlace(e.target.value);
	};
	const onChangeExtraInfo = e => {
		if (e.target.value) {
			setIsExtraInfo(true);
		} else {
			setIsExtraInfo(false);
		}
		setExtraInfo(e.target.value);
	};
	const onChangeLink = e => {
		if (e.target.value) {
			setIsLink(true);
		} else {
			setIsLink(false);
		}
		setLink(e.target.value);
	};

	const onClickItemDateSelect = () => {
		setPopUpPageNum(3);
		setVisible(true);
	};
	const onConfirmDatePick = val => {
		const dd = String(val.getDate()).padStart(2, '0');
		const mm = String(val.getMonth() + 1).padStart(2, '0');
		const yyyy = val.getFullYear();
		console.log(yyyy + '-' + mm + '-' + dd);
		setDate(yyyy + '-' + mm + '-' + dd);
		setIsDate(true);
		setVisible(false);
	};
	const onClickItemPriceSelect = () => {
		setPopUpPageNum(4);
		setBottomMenuStatusState(true);
	};
	const onClickSetPriceBtn = () => {
		if (selectedPriceMainFilter) {
			setPrice(selectedPriceMainFilter);
			setIsPrice(true);
		} else {
			setPrice('');
			setIsPrice(false);
		}
		setBottomMenuStatusState(false);
	};
	const onClickItemImgSelect = e => {
		e.preventDefault();
		imgInput.current.click();
	};
	const onChangeImg = e => {
		const fileArr = e.target.files;
		setSelectedFileList(pre => [...pre, fileArr]);
		console.log(fileArr);

		let fileURLs = [];

		let file;
		let filesLength = fileArr.length > 5 ? 5 : fileArr.length;

		for (let i = 0; i < filesLength; i++) {
			file = fileArr[i];

			let reader = new FileReader();
			reader.onload = () => {
				fileURLs[i] = reader.result;
				setPreviewImgUrlList(pre => [...pre, fileURLs[i] ]);
			};
			reader.readAsDataURL(file);
		}
	};

	const s3ImgUpload = (file, index, length) => {
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
				let temp = [];
				temp = imgUrlList;
				if (index == checkedElement) {
					temp.push({
						isRepresent: 1,
						itemImgUrl:
							'https://' +
							evt.request.httpRequest.endpoint.host +
							evt.request.httpRequest.path,
					});
				} else {
					temp.push({
						isRepresent: 0,
						itemImgUrl:
							'https://' +
							evt.request.httpRequest.endpoint.host +
							evt.request.httpRequest.path,
					});
				}
				setImgUrlList(temp);

				if (index === length) {
					setIsImgUploadComplete(true);
				}
			})
			.send(err => {
				if (err) console.log(err);
			});
	};

	const onClickUploadItem = async fileList => {
		const arr = Array.from(fileList);
		arr.map((_file, index) => {
			s3ImgUpload(_file, index, arr.length - 1);
		});
	};

	const onPostUpload = async () => {
		let body = {};
		if(state) {
			body = {
				celebIdx: selectedCeleb.celebIdx,
				memberIdx: selectedMember.memberIdx,
				parentCategory: selectedItemMainFilter,
				subCategory: selectedItemSubFilter ? selectedItemSubFilter : '기타',
				brandIdx: brandObj.brandIdx,
				name: productName,
				whenDiscovery: date,
				whereDiscovery: place,
				price: selectedPriceMainFilterIdx,
				content: extraInfo,
				sellerSite: link,
				itemImgUrlList: imgUrlList,
			};

		} else {
			body = {
				celebIdx: selectedCeleb.celebIdx,
				memberIdx: selectedMember.memberIdx,
				parentCategory: filterList[selectedItemMainFilter - 1].name,
				subCategory: selectedItemSubFilter ? selectedItemSubFilter : '기타',
				brandIdx: brandObj.brandIdx,
				name: productName,
				whenDiscovery: date,
				whereDiscovery: place,
				price: selectedPriceMainFilterIdx,
				content: extraInfo,
				sellerSite: link,
				itemImgUrlList: imgUrlList,
			};
		}
		

		console.log('넘아가는 데이터', body);
		let data = {};
		if(state) {
			data = await customApiClient('patch', `/items/${state.itemIdx}`, body);
		} else {
			data = await customApiClient('post', '/items', body);
		}
		
		console.log(data);
		if (!data) return;

		console.log('아이템 업로드 완료');
		if(state) {
			setToastMessageBottomPosition('1.625rem');
			setToastMessage('게시글이 수정되었어요');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);

			setTimeout(() => {
				setToastMessageStatus(false);
				navigate(-1);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
		} else {
			setConfirmPopupStatus(true);
		}
	};

	const onClickUploadBtnStart = () => {
		if (isUploadConfirm) {
			onClickUploadItem(selectedFileList);
		} else {
			setToastMessageBottomPosition('1.625rem');
			setToastMessage('필수정보를 모두 입력해주세요');
			setToastMessageWrapStatus(true);
			setToastMessageStatus(true);

			setTimeout(() => {
				setToastMessageStatus(false);
			}, 2000);
			setTimeout(() => {
				setToastMessageWrapStatus(false);
			}, 2300);
		}
	};

	const onClickPreviewImg = index => {
		console.log(index);
	};
	const onClickPreviewImgDelete = index => {
		setCheckedElement(0);
		let temp = [];
		temp = previewImgUrlList;
		temp.splice(index, 1);
		setPreviewImgUrlList([...temp]);
	};
	const onChangeRadioButton = e => {
		console.log(e.target.value);
		setCheckedElement(e.target.value);
	};

	const onClickYes = () => {
		setConfirmPopupStatus(false);
		setUploadPopupStatus(false);
		navigate('/home');
	};

	const onClickBackButton = () => {
		setSelectedFileList([]);
		setPreviewImgUrlList([]);

		if(selectedMember.memberIdx) {
			setCurrentPage(1);
		} else {
			setCurrentPage(0);
		}
		

	};

	return (
		<>
			{currentPage === 0 && <SelectUploadCelebContainer />}
			{currentPage === 1 && <SelectUploadMemberContainer />}
			{currentPage === 2 && (
				<MainContainer>
					<TopNav style={{ justifyContent: 'space-between' }}>
						<BackButton onClick={onClickBackButton} />
						<MainText style={{ fontSize: '1.125rem' }} className="centerText">
							정보 공유하기
						</MainText>
						<div className="rightText">
							<UploadBtn status={isUploadConfirm} onClick={onClickUploadBtnStart}>
								등록
							</UploadBtn>
						</div>
					</TopNav>

					<TopRadiusContainer
						backgroundColor="linear-gradient(to top, #ffecf0 0%, #f0fff4 102%)"
						style={{
							flex: '1',
							overflowY: 'scroll',
							padding: '1.625rem 1.25rem 2.5rem',
						}}
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
						<InputSpeechBubbleWrap
							onClick={onClickItemCategorySelect}
							notEmpty={isCategory}
						>
							<SpeechBubbleInput
								placeholder="아이템 종류를 선택해 주세요"
								type="text"
								value={category}
								notEmpty={isCategory}
								readOnly
							/>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>
								어떤 브랜드의 아이템 인가요?
								<span className="redStar">*</span>
							</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap onClick={onClickItemBrandSelect} notEmpty={isBrand}>
							<SpeechBubbleInput
								placeholder="브랜드를 선택해 주세요"
								type="text"
								value={brand}
								notEmpty={isBrand}
								readOnly
							/>
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
						<InputSpeechBubbleWrap onClick={onClickItemDateSelect} notEmpty={isDate}>
							<SpeechBubbleInput
								notEmpty={isDate}
								type="text"
								placeholder="날짜를 선택해주세요"
								value={date}
								readOnly
							/>
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
						<InputSpeechBubbleWrap onClick={onClickItemPriceSelect} notEmpty={isPrice}>
							<SpeechBubbleInput
								placeholder="가격대를 선택해 주세요"
								type="text"
								value={price}
								notEmpty={isPrice}
								readOnly
							/>
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
							<div>
								이미지는 최대 5장까지 추가할 수 있어요
								<span className="redStar">*</span>
							</div>
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
										대표 이미지 지정 방법
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
									가장 마음에 드는 이미지를 클릭하면 대표 이미지로 지정할 수
									있어요!
								</SubText>
							</MiniInfoDialog>
						</SpeechBubbleWrap>

						<ImgUploadBubbleWrap>
							<UploadButtonWrap onClick={e => onClickItemImgSelect(e)}>
								<Plus style={{ width: '1.5rem', height: '1.5rem' }} />
							</UploadButtonWrap>
							{previewImgUrlList.length > 0 &&
								previewImgUrlList.map((img, index) => (
									<PreviewImgWrap
										onClick={() => onClickPreviewImg(index)}
										key={index}
									>
										<img
											className="previewImg"
											src={img}
											alt="미리보기 이미지"
										/>
										{checkedElement == index && (
											<RepresentDiv>대표</RepresentDiv>
										)}

										<ImgDelete
											onClick={() => onClickPreviewImgDelete(index)}
											style={{
												width: '1.5rem',
												height: '1.5rem',
												position: 'absolute',
												top: '-0.5rem',
												right: '-0.5rem',
											}}
										/>
										<input
											type="radio"
											value={index}
											style={{ display: 'none' }}
											checked={checkedElement == index}
											onChange={onChangeRadioButton}
										/>
									</PreviewImgWrap>
								))}
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

					{popUpPageNum === 1 && (
						<SelectItemCategoryDialog
							selectedMainFilter={selectedItemMainFilter}
							selectedSubFilter={selectedItemSubFilter}
							getSelectedMainFilter={getSelectedItemMainFilter}
							getSelectedSubFilter={getSelectedItemSubFilter}
							setCategory={setCategory}
							setIsCategory={setIsCategory}
						/>
					)}

					{popUpPageNum === 2 && (
						<BottomSlideMenu menu={'브랜드'}>
							<SelectBrandDialog
								setBrandObj={setBrandObj}
								setFlag={setIsBrand}
								setBrand={setBrand}
							/>
						</BottomSlideMenu>
					)}

					{popUpPageNum === 3 && (
						<DatePicker
							title=""
							visible={visible}
							onClose={() => {
								setVisible(false);
							}}
							defaultValue={now}
							max={now}
							onConfirm={val => onConfirmDatePick(val)}
							renderLabel={labelRenderer}
						/>
					)}

					{popUpPageNum === 4 && (
						<BottomSlideMenu menu={'가격대'}>
							<PriceFilter
								selectedMainFilter={selectedPriceMainFilter}
								getSelectedMainFilter={getSelectedPriceMainFilter}
								getSelectedPriceFilterIdx={getSelectedPriceMainFilterIdx}
							></PriceFilter>
							<ButtonWrap>
								<PurpleButton
									onClick={onClickSetPriceBtn}
									style={{ fontSize: '1rem' }}
									marginBottom="0"
								>
									선택 완료
								</PurpleButton>
							</ButtonWrap>
						</BottomSlideMenu>
					)}

					<WholePage openStatus={confirmPopupStatus}>
						<ModalWrap>
							<img
								src={PopupBackgroundGradient}
								alt=""
								style={{
									position: 'absolute',
									height: '100%',
									top: '0',
									zIndex: '0',
								}}
							/>
							<div
								style={{
									zIndex: '1',
								}}
							>
								<div
									style={{
										marginTop: '1.5rem',
										fontSize: '1.125rem',
										fontWeight: 'bold',
										color: '#262626',
									}}
								>
									아이템이 등록되었어요
								</div>
								<div
									style={{
										fontSize: '0.875rem',
										color: '#8d8d8d',
										margin: '0.75rem 0 2rem',
										lineHeight: '1.36',
									}}
								>
									등록해주셔서 감사해요!
									<br />
									기다리고 있던 정보였어요
								</div>
								<PurpleButton onClick={onClickYes} marginBottom="0">
									확인
								</PurpleButton>
							</div>
						</ModalWrap>
					</WholePage>
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
	flex-shrink: 0;
`;

const PreviewImgWrap = styled.label`
	width: 5rem;
	height: 5rem;
	border-radius: 13px;
	border: solid 1px #94849d;
	position: relative;
	margin-right: 0.5rem;
	flex-shrink: 0;

	/* position: absolute;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover; */

	.previewImg {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 13px;
	}
`;

const UploadBtn = styled.span`
	color: ${props => (props.status ? '#262626' : '#b1b1b1')};
`;

const RepresentDiv = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 1.375rem;
	border-radius: 0 0 13px 13px;
	background-color: rgba(86, 75, 92, 0.7);
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.75rem;
`;
