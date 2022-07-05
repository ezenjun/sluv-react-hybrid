import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNavState } from '../../recoil/BottomNav';
import { useSetRecoilState } from 'recoil';
import { TopNav } from '../../components/containers/TopNav';
import { BackButton } from '../../components/Buttons/BackButton';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { MainContainer } from '../../components/containers/MainContainer';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridImage } from '../../components/GridItems/GridImage';
import { ReactComponent as BinderIcon } from '../../assets/Icons/binder40x40.svg';
import { ReactComponent as CheckEmpty } from '../../assets/Icons/checkEmpty.svg';
import { ReactComponent as CheckFull } from '../../assets/Icons/checkFull.svg';

import { ReactComponent as MoveBinderGrey } from '../../assets/Icons/moveBinderGrey.svg';
import { ReactComponent as DeleteBinderGrey } from '../../assets/Icons/deleteBinderGrey.svg';
import { ReactComponent as MoveBinderWhite } from '../../assets/Icons/moveBinderWhite.svg';
import { ReactComponent as DeleteBinderWhite } from '../../assets/Icons/deleteBinderWhite.svg';

import img from './img.png';

export default function BinderDetail() {
	const navigate = useNavigate();
	const [isConfirm, setIsConfirm] = useState(false);
	const [itemList, setItemList] = useState([]);
	const [editStatus, setEditStatus] = useState(false);
	const setBottomNavStatus = useSetRecoilState(BottomNavState);
	const [eachStatus, setEachStatus] = useState(false);
	const [selected, setSelected] = useState(0);
	const onEdit = () => {
		setEditStatus(!editStatus);
	};
	const onSelect = () => {
		setEachStatus(!eachStatus);
	};
	useEffect(() => {
		// 하단바 띄워주기
		setBottomNavStatus(false);
	}, []);
	const cnt = 2;
	return (
		<MainContainer padding="0 0 0 0">
			<TopNav style={{ justifyContent: 'space-between' }}>
				<BackButton onClick={() => navigate(-1)} />
				<div className="centerText">기본 바인더</div>
			</TopNav>
			{cnt > 0 ? (
				<FeedContainer>
					<BinderTextWrap>
						{editStatus ? (
							<>
								<SubText color="#8d8d8d">{selected}개 보관중</SubText>
								<SubText color="#8d8d8d" onClick={onEdit}>
									취소
								</SubText>
							</>
						) : (
							<>
								<SubText color="#8d8d8d">5개 보관중</SubText>
								<SubText color="#8d8d8d" onClick={onEdit}>
									편집
								</SubText>
							</>
						)}
					</BinderTextWrap>
					<ItemWrap>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
						<Item onClick={onSelect}>
							<Image>
								<CheckIconWrap showStatus={editStatus}>
									{eachStatus ? (
										<CheckFull
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckFull>
									) : (
										<CheckEmpty
											style={{ width: '1.5rem', height: '1.5rem' }}
										></CheckEmpty>
									)}
								</CheckIconWrap>

								<ImageText>
									<SubText fontweight="bold" color="white">
										리노's
									</SubText>
								</ImageText>
							</Image>
							<SubText fontsize="14px" fontweight="bold" margin="0 0 0.125rem 0 ">
								마하그리드
							</SubText>
							<SubText
								fontweight="normal"
								style={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',

									overflow: 'hidden',
									width: '100%',
								}}
							>
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
								Rugby Polo Ls TEE BLUE Rugby Polo Ls TEE BLUE
							</SubText>
						</Item>
					</ItemWrap>
				</FeedContainer>
			) : (
				<NoItemContainer>
					<IconWrap>
						<BinderIcon style={{ width: '2.5rem', height: '2.5rem' }}></BinderIcon>
					</IconWrap>
					<SubText fontsize="1rem" fontweight="bold" margin="1rem 0 0.75rem 0">
						바인더가 비어있어요
					</SubText>
					<SubText
						fontsize="0.875rem"
						fontweight="normal"
						margin="0 0 0.125rem 0"
						color="#8d8d8d"
					>
						좋아하는 셀럽의 아이템을
					</SubText>
					<SubText fontsize="0.875rem" fontweight="normal" color="#8d8d8d">
						저장하여 나만의 바인더를 만들어봐요
					</SubText>
				</NoItemContainer>
			)}
			{editStatus ? (
				<EditBottomNav>
					{selected === 0 ? (
						<>
							<Button>
								<MoveBinderGrey></MoveBinderGrey>
								<SubText margin="0.125rem" fontsize="0.625rem" color="#f4f4f4">
									바인더 이동
								</SubText>
							</Button>
							<Button>
								<DeleteBinderGrey></DeleteBinderGrey>
								<SubText margin="0.125rem" fontsize="0.625rem" color="#f4f4f4">
									아이템 삭제
								</SubText>
							</Button>
						</>
					) : (
						<>
							<Button>
								<MoveBinderWhite></MoveBinderWhite>
								<SubText margin="0.125rem" fontsize="0.625rem" color="white">
									바인더 이동
								</SubText>
							</Button>
							<Button>
								<DeleteBinderWhite></DeleteBinderWhite>
								<SubText margin="0.125rem" fontsize="0.625rem" color="white">
									아이템 삭제
								</SubText>
							</Button>
						</>
					)}
				</EditBottomNav>
			) : (
				<></>
			)}
		</MainContainer>
	);
}

const FeedContainer = styled.div`
	height: 100vh;
	padding: 1.25rem 1.25rem 1.25rem;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;
	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;
const NoItemContainer = styled.div`
	height: 100%;
	padding: 11.25rem 1.25rem 1.25rem 1.25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;
const IconWrap = styled.div`
	display: flex;
	width: 3.75rem;
	height: 3.75rem;
	align-items: center;
	justify-content: center;
	background-color: #f4f4f4;
	border-radius: 50%;
`;
const BinderTextWrap = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 1rem;
`;
const ItemWrap = styled.div`
	display: grid;
	justify-items: center;
	flex-grow: none;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: minmax(0, auto);
	row-gap: 0.6875rem;
	column-gap: 0.6875rem;

	@media screen and (width: 280px) {
		/* gap: 0.5rem; */
		row-gap: 0.6875rem;
		column-gap: 0.5rem;
	}
	/* white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis; */
`;
const Item = styled.div`
	display: flex;

	flex-direction: column;
	box-sizing: border-box;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const Image = styled.div`
	/* display: flex;
	justify-content: flex-start; */
	/* align-items: flex-end; */
	position: relative;
	border-radius: 1rem;
	background-color: white;
	background-image: linear-gradient(
			to top,
			#000 0%,
			rgba(60, 60, 60, 0.77) 0%,
			rgba(0, 0, 0, 0) 34%
		),
		url(${img});
	background-repeat: no-repeat;
	background-size: contain;
	margin-bottom: 0.5rem;
	box-sizing: border-box;
	padding: 0.5rem 0.75rem;
	font-size: 0.8125rem;
	width: 6.5625rem;
	height: 6.5625rem;

	@media screen and (width: 360px) {
		width: 6.25rem;
		height: 6.25rem;
	}
	@media screen and (width: 320px) {
		width: 5.375rem;
		height: 5.375rem;
	}
	@media screen and (width: 280px) {
		width: 75px;
		height: 75px;
	}
`;
const ImageText = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	bottom: 0.5rem;
`;
const CheckIconWrap = styled.div`
	display: ${props => (props.showStatus ? 'block' : 'none')};
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	width: 1.5rem;
	height: 1.5rem;
	/* background-color: red; */
`;
const EditBottomNav = styled.div`
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 3.125rem;
	background-color: #9e30f4;
`;
const Button = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50%;
`;
