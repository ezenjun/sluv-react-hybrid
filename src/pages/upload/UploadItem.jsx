import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { InputSpeechBubbleWrap, SpeechBubbleInput, SpeechBubbleNoInput, SpeechBubbleTextArea } from '../../components/Bubbles/InputSpeechBubble';
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

export default function UploadItem() {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const selectedCeleb = useRecoilValue(UploadCelebState);
	const selectedMember = useRecoilValue(UploadMemberState);

	const [infoDialogStatus, setInfoDialogStatus] = useState(false);

	useEffect(() => {
		setBottomNavStatus(false);
		setCurrentPage(0);
	},[]);

	const onClickItemCatgeorySelect = () => {

	};
	const onClickItemBrandSelect = () => {

	};
	const onClickItemDateSelect = () => {

	};
	const onClickItemPriceSelect = () => {

	};

	const onClickUploadItem = () => {
		const body = {
			celebIdx: selectedCeleb.celebIdx,
			memberIdx: 1,
			parentCategory: '상의',
			subCategory: '반소매',
			brandIdx: 1,
			name: '어느브랜드의 어느옷',
			whenDiscovery: '2022-06-30',
			price: 1,
			content: '아 추가 정보에요~',
			sellerSite: 'https://sellerSite.test',
			itemUrlList: [
				{
					isRepresent: 1,
					itemImgUrl: 'https://test-image-01',
				},
				{
					isRepresent: 0,
					itemImgUrl: 'https://test-image-02',
				},
				{
					isRepresent: 0,
					itemImgUrl: 'https://test-image-03',
				},
			],
		};

	}

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
						<div className="rightText" onClick={onClickUploadItem}>
							등록
						</div>
					</TopNav>

					<TopRadiusContainer style={{ flex: '1', overflowY: 'scroll' }}>
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
						<InputSpeechBubbleWrap onClick={onClickItemCatgeorySelect} notEmpty={false}>
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
						<InputSpeechBubbleWrap notEmpty={false}>
							<SpeechBubbleInput
								notEmpty={false}
								type="text"
								placeholder="제품명을 정확하게 입력해주세요"
								value={''}
								onChange={undefined}
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
						<InputSpeechBubbleWrap notEmpty={false} style={{ height: '100px' }}>
							<SpeechBubbleTextArea
								notEmpty={false}
								type="text"
								placeholder="내용을 입력해 주세요(최대 1,000자)"
								value={''}
								onChange={undefined}
							/>
						</InputSpeechBubbleWrap>

						<SpeechBubbleWrap style={{ marginTop: '2.5rem' }}>
							<div>아이템 구매가 가능한 링크를 알려주세요</div>
						</SpeechBubbleWrap>
						<InputSpeechBubbleWrap notEmpty={false}>
							<SpeechBubbleInput
								notEmpty={false}
								type="text"
								placeholder="Ex) www.sluv.com"
								value={''}
								onChange={undefined}
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
							<UploadButtonWrap>
								<Plus style={{ width: '24px', height: '24px' }} />
							</UploadButtonWrap>
							<input type="file" accept="image/*" />
						</ImgUploadBubbleWrap>
					</TopRadiusContainer>
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




