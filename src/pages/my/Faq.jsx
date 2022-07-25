import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { BottomNavState } from '../../recoil/BottomNav';
import { ReactComponent as IconFaq } from '../../assets/Icons/icon_faq.svg';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';


export default function Faq() {
	const navigate = useNavigate();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	const [firstFaqStatus, setFirstFaqStatus] = useState(false);
	const [secondFaqStatus, setSecondFaqStatus] = useState(false);
	const [thirdFaqStatus, setThirdFaqStatus] = useState(false);

	useEffect(() => {
		setBottomNavStatus(false);
	}, []);

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					문의하기
				</MainText>
			</TopNav>

			<ContentWrap
				style={{
					flex: '1',
					paddingTop: '1.625rem',
					color: '#262626',
				}}
			>
				<div
					onClick={() => setFirstFaqStatus(!firstFaqStatus)}
					style={{ display: 'flex', borderBottom: '1px solid #f4f4f4' }}
				>
					<IconFaq
						style={{ width: '1.125rem', height: '1.125rem', marginRight: '0.5rem' }}
					/>
					<div>
						<div style={{ fontSize: '1rem', fontWeight: '600' }}>
							스럽과 제휴를 맺고 싶어요. 비즈니스 문의는 어디로 보내면 되나요?
						</div>
						<Fade collapse when={firstFaqStatus} duration={500}>
							<div style={{ fontSize: '0.875rem', marginTop: '1.25rem' }}>
								광고 및 제휴와 관련된 비즈니스 문의는 celebit.sluv@gmail.com 으로 연락해주세요.
							</div>
						</Fade>
					</div>
				</div>

				<div
					onClick={() => setSecondFaqStatus(!secondFaqStatus)}
					style={{
						display: 'flex',
						borderBottom: '1px solid #f4f4f4',
						marginTop: '1.3125rem',
					}}
				>
					<IconFaq
						style={{ width: '1.125rem', height: '1.125rem', marginRight: '0.5rem' }}
					/>
					<div>
						<div style={{ fontSize: '1rem', fontWeight: '600' }}>
							등록했던 게시글이 삭제될 수 있나요?
						</div>
						<Fade collapse when={secondFaqStatus} duration={500}>
							<div style={{ fontSize: '0.875rem', marginTop: '1.25rem' }}>
								스럽 회원에게 신고를 5회 이상 당한 게시물은 기준에 따라 판단 후 노출
								중단/삭제 처리를 합니다.
							</div>
						</Fade>
					</div>
				</div>

				<div
					onClick={() => setThirdFaqStatus(!thirdFaqStatus)}
					style={{
						display: 'flex',
						borderBottom: '1px solid #f4f4f4',
						marginTop: '1.3125rem',
					}}
				>
					<IconFaq
						style={{ width: '1.125rem', height: '1.125rem', marginRight: '0.5rem' }}
					/>
					<div>
						<div style={{ fontSize: '1rem', fontWeight: '600' }}>
							인기 업로더의 기준은 무엇인가요?
						</div>
						<Fade collapse when={thirdFaqStatus} duration={500}>
							<div style={{ fontSize: '0.875rem', marginTop: '1.25rem' }}>
								스럽에서는 많은 손민수템 게시글 공유와 해당 게시물의 조회수에 따라
								인기 업로더로 추천하고 있습니다.
							</div>
						</Fade>
					</div>
				</div>
			</ContentWrap>

			<a
				href="https://open.kakao.com/o/s1IQ8upe"
				style={{ textDecoration: 'none', padding: '0 1.25rem' }}
			>
				<PurpleButton style={{ fontSize: '1rem' }} marginBottom="1.625rem">
					1 : 1 문의하기
				</PurpleButton>
			</a>
		</MainContainer>
	);
}

