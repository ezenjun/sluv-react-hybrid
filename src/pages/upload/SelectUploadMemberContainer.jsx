import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav'
import { MainText } from '../../components/Texts/MainText';
import { ReactComponent as Close } from '../../assets/Icons/CloseX.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ChooseCelebCurrentPageState } from '../../recoil/Celebrity';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { UploadCelebState, UploadMemberState } from '../../recoil/Upload';
import { BottomWrap, CelebLeftBottom, CelebLeftTop, CelebNextLeftBottom, CelebNextLeftTop, CelebNextRightBottom, CelebNextRightTop, CelebRightBottom, CelebRightTop, Image, MembersContainer, RepeatWrap, TextWrap } from '../signup/SelectCeleb';
import { SubText } from '../../components/Texts/SubText';
import { SpeechBubbleWrap } from '../../components/Bubbles/SpeechBubble';
import { UploadPopupState } from '../../recoil/BottomNav';

export default function SelectUploadMemberContainer() {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useRecoilState(ChooseCelebCurrentPageState);
	const selectedCeleb = useRecoilValue(UploadCelebState);
	const setSelectedMember = useSetRecoilState(UploadMemberState);
	const setUploadPopupStatus = useSetRecoilState(UploadPopupState);

	const onSelectMember = (member, e) => {
		setSelectedMember(member);
		setCurrentPage(2);
	}
	const onClickClose = () => {
		setUploadPopupStatus(false);
		navigate(-1);
	};

	return (
		<MainContainer>
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => setCurrentPage(0)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					정보 공유하기
				</MainText>
				<Close onClick={onClickClose} style={{ width: '24px', height: '24px' }} />
			</TopNav>

			<ContentWrap padding="0">
				<TextWrap>
					<MainText fontsize="1.5rem" margin="1.625rem 0 0.5rem 0">
						누구의 아이템 정보를
						<br />
						공유하실건가요?
					</MainText>
					<SubText
						color="#8d8d8d"
						fontsize="0.875rem"
						fontweight="regular"
						margin="0 0 1.25rem 0"
					>
						한 번에 한 명의 멤버 정보만 공유할 수 있어요!
					</SubText>
				</TextWrap>

				<BottomWrap>
					<SpeechBubbleWrap
						backgroundColor="#9e30f4"
						color="white"
						borderRight="8px solid #9e30f4"
					>
						<div>{selectedCeleb.name}</div>
					</SpeechBubbleWrap>
				</BottomWrap>

				<MembersContainer>
					{(function () {
						if (Object.keys(selectedCeleb).length !== 0 ) {
							let renderList = [];
							for (let i = 0; i < selectedCeleb.memberList.length; i += 8) {
								renderList.push(
									<RepeatWrap>
										{selectedCeleb.memberList
											.slice(i, i + 8)
											.map((member, index) => (
												<>
													{index % 8 === 0 && (
														<CelebLeftTop
															key={member.memberIdx}
															onClick={e => onSelectMember(member, e)}
														>
															<Image size="9.25rem">
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div className="dim"></div>
																<div
																	style={{
																		zIndex: '100',
																		marginBottom: '0.75rem',
																		fontSize: '1rem',
																		fontWeight: 'bold',
																	}}
																	className="memberName"
																>
																	{member.name}
																</div>
															</Image>
														</CelebLeftTop>
													)}
													{index % 8 === 1 && (
														<CelebRightTop
															key={member.memberIdx}
															onClick={e => onSelectMember(member, e)}
														>
															<Image size="9.25rem">
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div
																	style={{
																		zIndex: '100',
																		marginBottom: '0.75rem',
																		fontSize: '1rem',
																		fontWeight: 'bold',
																	}}
																	className="memberName"
																>
																	{member.name}
																</div>
															</Image>
														</CelebRightTop>
													)}
													{index % 8 === 2 && (
														<CelebLeftBottom
															key={member.memberIdx}
															onClick={e => onSelectMember(member, e)}
														>
															<Image size="9.25rem">
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div
																	style={{
																		zIndex: '100',
																		marginBottom: '0.75rem',
																		fontSize: '1rem',
																		fontWeight: 'bold',
																	}}
																	className="memberName"
																>
																	{member.name}
																</div>
															</Image>
														</CelebLeftBottom>
													)}
													{index % 8 === 3 && (
														<CelebRightBottom
															key={member.memberIdx}
															onClick={e => onSelectMember(member, e)}
														>
															<Image size="9.25rem">
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div
																	style={{
																		zIndex: '100',
																		marginBottom: '0.75rem',
																		fontSize: '1rem',
																		fontWeight: 'bold',
																	}}
																	className="memberName"
																>
																	{member.name}
																</div>
															</Image>
														</CelebRightBottom>
													)}
													{index % 8 === 4 && (
														<CelebNextLeftBottom
															key={member.memberIdx}
															onClick={e => onSelectMember(member, e)}
														>
															<Image size="9.25rem">
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div
																	style={{
																		zIndex: '100',
																		marginBottom: '0.75rem',
																		fontSize: '1rem',
																		fontWeight: 'bold',
																	}}
																	className="memberName"
																>
																	{member.name}
																</div>
															</Image>
														</CelebNextLeftBottom>
													)}
													{index % 8 === 5 && (
														<CelebNextLeftTop
															key={member.memberIdx}
															onClick={e => onSelectMember(member, e)}
														>
															<Image size="9.25rem">
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div
																	style={{
																		zIndex: '100',
																		marginBottom: '0.75rem',
																		fontSize: '1rem',
																		fontWeight: 'bold',
																	}}
																	className="memberName"
																>
																	{member.name}
																</div>
															</Image>
														</CelebNextLeftTop>
													)}
													{index % 8 === 6 && (
														<CelebNextRightTop
															key={member.memberIdx}
															onClick={e => onSelectMember(member, e)}
														>
															<Image size="9.25rem">
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div
																	style={{
																		zIndex: '100',
																		marginBottom: '0.75rem',
																		fontSize: '1rem',
																		fontWeight: 'bold',
																	}}
																	className="memberName"
																>
																	{member.name}
																</div>
															</Image>
														</CelebNextRightTop>
													)}
													{index % 8 === 7 && (
														<CelebNextRightBottom
															key={member.memberIdx}
															onClick={e => onSelectMember(member, e)}
														>
															<Image size="9.25rem">
																<img
																	className="celebImg"
																	src={member.memberImgUrl}
																	alt="셀럽이미지"
																/>
																<div
																	style={{
																		zIndex: '100',
																		marginBottom: '0.75rem',
																		fontSize: '1rem',
																		fontWeight: 'bold',
																	}}
																	className="memberName"
																>
																	{member.name}
																</div>
															</Image>
														</CelebNextRightBottom>
													)}
												</>
											))}
									</RepeatWrap>
								);
							}
							return renderList;
						}

					})()}
				</MembersContainer>
			</ContentWrap>
		</MainContainer>
	);
}
