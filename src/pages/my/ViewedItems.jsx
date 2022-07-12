import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav';
import { GridImage } from '../../components/GridItems/GridImage';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { ImageText } from '../../components/ImageText';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';
import { BottomNavState } from '../../recoil/BottomNav';
import { customApiClient } from '../../utils/apiClient';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';

export default function ViewedItems() {

	const navigate = useNavigate();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	const [itemCount, setItemCount] = useState(0);
	const [itemList, setItemList] = useState([
		{
			itemIdx: 17,
			itemImgUrl: '이미지 3',
			name: '최우식',
			isDib: 'N',
			brandKr: '트리플에이',
			itemName: '나이키 반바지',
		},
		{
			itemIdx: 14,
			itemImgUrl: '이미지 1',
			name: '스트레이키즈',
			isDib: 'Y',
			brandKr: '에이리프',
			itemName: '자라 반바지',
		},
		{
			itemIdx: 10,
			itemImgUrl: '아이템 이미지 url',
			name: '스트레이키즈',
			isDib: 'Y',
			brandKr: '어콜드월',
			itemName: '테스트 아이템 2',
		},
	]);

	useEffect(() => {
		setBottomNavStatus(false);

		// getViewItems();
	}, []);

	const getViewItems = async () => {
		const data = await customApiClient('get', '/my-page/recents');

		if(!data) return;
		if(!data.isSuccess) return;

		setItemCount(data.result.recentItemCnt);
		setItemList(data.result.recentItemList);
		console.log(data.result);
	}

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					최근 본 아이템
				</MainText>
			</TopNav>
			<ContentWrap>
				{itemCount ? (
					<div>
						<div style={{ margin: '1rem 0 0.8125rem', fontSize: '0.75rem', color: '#8d8d8d' }}>
							<span style={{ marginRight: '0.25rem' }}>최근 본 아이템</span>
							<span>{itemCount}</span>
						</div>
						<GridItemWrap>
							{itemList.length > 0 &&
								itemList.map(item => (
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


