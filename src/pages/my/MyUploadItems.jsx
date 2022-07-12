import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer';
import { TopNav } from '../../components/containers/TopNav';
import { GridImage } from '../../components/GridItems/GridImage';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { ImageText } from '../../components/ImageText';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';

export default function MyUploadItems() {
	const navigate = useNavigate();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	const { state } = useLocation();
	console.log(state);

	useEffect(() => {
		setBottomNavStatus(false);

	},[]);

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					나의 아이템 업로드
				</MainText>
			</TopNav>
			<ContentWrap>
				{state.uploadCnt ? (
					<div>
						<div
							style={{
								margin: '1rem 0 0.8125rem',
								fontSize: '0.75rem',
								color: '#8d8d8d',
							}}
						>
							<span style={{ marginRight: '0.25rem' }}>전체</span>
							<span>{state.uploadCnt}</span>
						</div>
						<GridItemWrap>
							{state.uploadItemList.length > 0 &&
								state.uploadItemList.map(item => (
									<GridItem key={item.itemIdx}>
										<GridImage>
											<ImageText>
												<SubText
													fontsize="0.8125rem"
													fontweight="bold"
													color="white"
												>
													{item.name}'s
												</SubText>
												<BinderWhite
													style={{
														width: '1.375rem',
														height: '1.375rem',
													}}
												/>
											</ImageText>
										</GridImage>
										<SubText
											fontsize="1rem"
											fontweight="bold"
											margin="0 0 0.375rem 0 "
										>
											{item.brandKr}
										</SubText>
										<SubText
											style={{
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												width: '100%',
											}}
										>
											{item.itemName}
										</SubText>
									</GridItem>
								))}
						</GridItemWrap>
					</div>
				) : (
					<div>아직 본 아이템이 없어요!!</div>
				)}
			</ContentWrap>
		</MainContainer>
	);
}
